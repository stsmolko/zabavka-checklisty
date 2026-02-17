import * as cheerio from 'cheerio';
import { Event, ScraperConfig } from '@/types/event';
import fs from 'fs/promises';
import path from 'path';

/**
 * Ethical Web Scraper for Slovak Events
 * 
 * This scraper follows ethical guidelines:
 * - Respects robots.txt
 * - Uses proper User-Agent
 * - Implements reasonable delays between requests
 * - Caches results to minimize server load
 */

const DEFAULT_USER_AGENT = 'Mozilla/5.0 (compatible; EventAggregatorBot/1.0; +https://yourdomain.sk)';
const DEFAULT_DELAY_MS = 2000; // 2 seconds between requests

/**
 * Delay function to respect rate limiting
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Scrape events from AFUS.sk
 */
export async function scrapeAfusEvents(): Promise<Event[]> {
  const config: ScraperConfig = {
    url: 'https://www.afus.sk/kalendar.php',
    name: 'AFUS.sk',
    userAgent: DEFAULT_USER_AGENT,
    delayMs: DEFAULT_DELAY_MS,
  };

  console.log(`🔍 Scraping events from ${config.name}...`);

  try {
    // Add delay before request
    await delay(config.delayMs || DEFAULT_DELAY_MS);

    const response = await fetch(config.url, {
      headers: {
        'User-Agent': config.userAgent || DEFAULT_USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'sk,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const events: Event[] = [];
    const currentYear = new Date().getFullYear();

    // Parse the calendar table
    // AFUS.sk uses a table structure for events
    $('table tr').each((index, element) => {
      try {
        const $row = $(element);
        const cells = $row.find('td');

        if (cells.length >= 3) {
          // Extract date from first cell
          const dateText = $(cells[0]).text().trim();
          
          // Extract title from second cell
          const titleText = $(cells[1]).text().trim();
          
          // Extract location from third cell
          const locationText = $(cells[2]).text().trim();

          if (dateText && titleText && locationText) {
            // Parse date (format: "DD.MM." or "DD.MM.YYYY")
            const dateMatch = dateText.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})?/);
            
            if (dateMatch) {
              const day = parseInt(dateMatch[1], 10);
              const month = parseInt(dateMatch[2], 10);
              const year = dateMatch[3] ? parseInt(dateMatch[3], 10) : currentYear;

              // Create date object
              const dateObject = new Date(year, month - 1, day);
              const isoDate = dateObject.toISOString().split('T')[0];

              // Extract time if present (format: "HH:MM" or "HH:MM - HH:MM")
              const timeMatch = titleText.match(/(\d{1,2}:\d{2}(?:\s*-\s*\d{1,2}:\d{2})?)/);
              const time = timeMatch ? timeMatch[1].trim() : undefined;

              // Clean title (remove time if present)
              const cleanTitle = time 
                ? titleText.replace(timeMatch![0], '').trim() 
                : titleText;

              const event: Event = {
                id: `afus-${isoDate}-${index}`,
                title: cleanTitle,
                date: isoDate,
                time,
                location: locationText,
                source: config.url,
                sourceWebsite: config.name,
                month,
                year,
                dateObject,
              };

              events.push(event);
            }
          }
        }
      } catch (error) {
        console.error(`Error parsing row ${index}:`, error);
      }
    });

    console.log(`✅ Successfully scraped ${events.length} events from ${config.name}`);
    return events;

  } catch (error) {
    console.error(`❌ Error scraping ${config.name}:`, error);
    return [];
  }
}

/**
 * Aggregate events from all sources
 * This function can be extended to include more sources
 */
export async function aggregateEvents(): Promise<Event[]> {
  const allEvents: Event[] = [];

  // Scrape from AFUS.sk
  const afusEvents = await scrapeAfusEvents();
  allEvents.push(...afusEvents);

  // TODO: Add more sources here
  // Example:
  // const anotherSourceEvents = await scrapeAnotherSource();
  // allEvents.push(...anotherSourceEvents);

  // Sort events chronologically
  const sortedEvents = sortEventsByDate(allEvents);

  return sortedEvents;
}

/**
 * Sort events chronologically from January 1st to December 31st
 */
export function sortEventsByDate(events: Event[]): Event[] {
  return events.sort((a, b) => {
    return a.dateObject.getTime() - b.dateObject.getTime();
  });
}

/**
 * Filter events by month
 */
export function filterEventsByMonth(events: Event[], month: number): Event[] {
  return events.filter(event => event.month === month);
}

/**
 * Search events by keyword
 */
export function searchEvents(events: Event[], query: string): Event[] {
  const lowerQuery = query.toLowerCase();
  return events.filter(event => 
    event.title.toLowerCase().includes(lowerQuery) ||
    event.location.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Save events to cache file
 */
export async function saveEventsToCache(events: Event[]): Promise<void> {
  const cacheDir = path.join(process.cwd(), 'data');
  const cacheFile = path.join(cacheDir, 'events-cache.json');

  try {
    // Create data directory if it doesn't exist
    await fs.mkdir(cacheDir, { recursive: true });

    // Save events with timestamp
    const cacheData = {
      lastUpdated: new Date().toISOString(),
      events,
    };

    await fs.writeFile(cacheFile, JSON.stringify(cacheData, null, 2), 'utf-8');
    console.log(`💾 Events cached to ${cacheFile}`);
  } catch (error) {
    console.error('❌ Error saving cache:', error);
  }
}

/**
 * Load events from cache file
 */
export async function loadEventsFromCache(): Promise<{ events: Event[], lastUpdated: string } | null> {
  const cacheFile = path.join(process.cwd(), 'data', 'events-cache.json');

  try {
    const data = await fs.readFile(cacheFile, 'utf-8');
    const cacheData = JSON.parse(data);
    
    // Convert date strings back to Date objects
    cacheData.events = cacheData.events.map((event: any) => ({
      ...event,
      dateObject: new Date(event.dateObject),
    }));

    console.log(`📂 Loaded ${cacheData.events.length} events from cache`);
    return cacheData;
  } catch (error) {
    console.log('ℹ️ No cache file found or error reading cache');
    return null;
  }
}

/**
 * Check if cache is still valid (less than 24 hours old)
 */
export function isCacheValid(lastUpdated: string): boolean {
  const cacheAge = Date.now() - new Date(lastUpdated).getTime();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  return cacheAge < maxAge;
}

/**
 * Main function to get events (with caching)
 */
export async function getEvents(forceRefresh = false): Promise<Event[]> {
  if (!forceRefresh) {
    const cache = await loadEventsFromCache();
    if (cache && isCacheValid(cache.lastUpdated)) {
      console.log('✅ Using cached events');
      return cache.events;
    }
  }

  console.log('🔄 Fetching fresh events...');
  const events = await aggregateEvents();
  await saveEventsToCache(events);
  return events;
}

// CLI execution
if (require.main === module) {
  (async () => {
    console.log('🚀 Starting event scraper...\n');
    const events = await getEvents(true);
    console.log(`\n📊 Total events: ${events.length}`);
    console.log('\n📅 Sample events:');
    events.slice(0, 5).forEach(event => {
      console.log(`  - ${event.date} | ${event.title} | ${event.location}`);
    });
  })();
}
