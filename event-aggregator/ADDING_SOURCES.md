# 📚 Pridávanie Nových Zdrojov Dát

Tento návod vás prevedie procesom pridania nového zdroja podujatí do aplikácie.

## 🎯 Prehľad

Aplikácia je navrhnutá tak, aby bolo jednoduché pridať nové zdroje dát. Stačí vytvoriť novú scraping funkciu a pridať ju do agregátora.

## 📋 Kontrolný Zoznam

Pred pridaním nového zdroja overte:

- [ ] Web má verejne dostupný kalendár podujatí
- [ ] Dáta sú legálne scrapovateľné (skontrolujte Terms of Service)
- [ ] Web nemá API (API je vždy lepšia voľba než scraping)
- [ ] Poznáte štruktúru HTML (použite DevTools)

## 🔍 Krok 1: Analýza Zdroja

### 1.1 Otvorte Zdrojový Web

Prejdite na stránku s kalendárom podujatí.

### 1.2 Analyzujte HTML Štruktúru

Otvorte Developer Tools (F12) a preskúmajte:

- Ako sú podujatia organizované (tabuľka, zoznam, karty)?
- Aké CSS triedy/ID používajú?
- Kde sú uložené dáta (dátum, názov, miesto)?

**Príklad:**

```html
<div class="event-card">
  <h3 class="event-title">Folklórny festival</h3>
  <span class="event-date">15.03.2026</span>
  <span class="event-location">Bratislava</span>
  <span class="event-time">18:00</span>
</div>
```

### 1.3 Skontrolujte robots.txt

```
https://example.sk/robots.txt
```

Overte, že scraping je povolený.

## 🛠️ Krok 2: Vytvorenie Scraper Funkcie

### 2.1 Otvorte `lib/scraper.ts`

### 2.2 Vytvorte Novú Funkciu

Použijte tento template:

```typescript
/**
 * Scrape events from YourSource.sk
 */
export async function scrapeYourSourceEvents(): Promise<Event[]> {
  const config: ScraperConfig = {
    url: 'https://yoursource.sk/calendar',
    name: 'YourSource.sk',
    userAgent: DEFAULT_USER_AGENT,
    delayMs: DEFAULT_DELAY_MS,
  };

  console.log(`🔍 Scraping events from ${config.name}...`);

  try {
    // Rešpektujte rate limiting
    await delay(config.delayMs || DEFAULT_DELAY_MS);

    // Fetch HTML
    const response = await fetch(config.url, {
      headers: {
        'User-Agent': config.userAgent || DEFAULT_USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'sk,en;q=0.9',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const events: Event[] = [];
    const currentYear = new Date().getFullYear();

    // Parse events - PRISPÔSOBTE PODĽA ŠTRUKTÚRY WEBU
    $('.event-card').each((index, element) => {
      try {
        const $event = $(element);
        
        // Extract data
        const title = $event.find('.event-title').text().trim();
        const dateText = $event.find('.event-date').text().trim();
        const location = $event.find('.event-location').text().trim();
        const time = $event.find('.event-time').text().trim() || undefined;

        // Parse date (adjust format as needed)
        const dateMatch = dateText.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})?/);
        
        if (dateMatch && title && location) {
          const day = parseInt(dateMatch[1], 10);
          const month = parseInt(dateMatch[2], 10);
          const year = dateMatch[3] ? parseInt(dateMatch[3], 10) : currentYear;

          const dateObject = new Date(year, month - 1, day);
          const isoDate = dateObject.toISOString().split('T')[0];

          const event: Event = {
            id: `yoursource-${isoDate}-${index}`,
            title,
            date: isoDate,
            time,
            location,
            source: config.url,
            sourceWebsite: config.name,
            month,
            year,
            dateObject,
          };

          events.push(event);
        }
      } catch (error) {
        console.error(`Error parsing event ${index}:`, error);
      }
    });

    console.log(`✅ Successfully scraped ${events.length} events from ${config.name}`);
    return events;

  } catch (error) {
    console.error(`❌ Error scraping ${config.name}:`, error);
    return [];
  }
}
```

## 🔗 Krok 3: Pridanie do Agregátora

V súbore `lib/scraper.ts`, nájdite funkciu `aggregateEvents()` a pridajte váš nový zdroj:

```typescript
export async function aggregateEvents(): Promise<Event[]> {
  const allEvents: Event[] = [];

  // Existujúce zdroje
  const afusEvents = await scrapeAfusEvents();
  allEvents.push(...afusEvents);

  // VÁŠ NOVÝ ZDROJ
  const yourSourceEvents = await scrapeYourSourceEvents();
  allEvents.push(...yourSourceEvents);

  // Zoradiť chronologicky
  const sortedEvents = sortEventsByDate(allEvents);

  return sortedEvents;
}
```

## 🧪 Krok 4: Testovanie

### 4.1 Manuálny Test

```bash
npm run scrape
```

Skontrolujte:
- ✅ Počet načítaných podujatí
- ✅ Formát dát (dátum, čas, názov, miesto)
- ✅ Žiadne chyby v console

### 4.2 Test v Aplikácii

```bash
npm run dev
```

Otvorte `http://localhost:3000` a overte:
- ✅ Podujatia sa zobrazujú správne
- ✅ Filtrovanie funguje
- ✅ Vyhľadávanie funguje
- ✅ Karty vyzerajú dobre

## 📝 Krok 5: Dokumentácia

Aktualizujte `README.md`:

```markdown
### Aktuálne Zdroje:
- **AFUS.sk** - Asociácia Folklórnych Umeleckých Súborov
- **YourSource.sk** - Popis zdroja
```

## 🎨 Špeciálne Prípady

### Dynamický Obsah (JavaScript)

Ak web používa JavaScript pre načítanie obsahu, použite Puppeteer namiesto Cheerio:

```bash
npm install puppeteer
```

```typescript
import puppeteer from 'puppeteer';

export async function scrapeDynamicSite(): Promise<Event[]> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://example.sk/events', {
    waitUntil: 'networkidle2',
  });

  const events = await page.evaluate(() => {
    // Extract data from page
    const eventElements = document.querySelectorAll('.event-card');
    return Array.from(eventElements).map(el => ({
      title: el.querySelector('.title')?.textContent || '',
      // ... more fields
    }));
  });

  await browser.close();
  return events;
}
```

### API Endpoint

Ak web má API, použite ho namiesto scrapingu:

```typescript
export async function fetchFromAPI(): Promise<Event[]> {
  const response = await fetch('https://api.example.sk/events');
  const data = await response.json();
  
  return data.events.map((item: any) => ({
    id: `api-${item.id}`,
    title: item.name,
    date: item.date,
    // ... map other fields
  }));
}
```

### Paginácia

Ak má web viacero stránok:

```typescript
export async function scrapeMultiplePages(): Promise<Event[]> {
  const allEvents: Event[] = [];
  const maxPages = 5;

  for (let page = 1; page <= maxPages; page++) {
    await delay(2000); // Rate limiting
    
    const url = `https://example.sk/events?page=${page}`;
    const events = await scrapePage(url);
    
    if (events.length === 0) break; // No more events
    
    allEvents.push(...events);
  }

  return allEvents;
}
```

## ⚠️ Dôležité Upozornenia

### Etické Pravidlá

1. **Rešpektujte robots.txt**
2. **Používajte rozumné intervaly** (min. 2 sekundy)
3. **Identifikujte sa** (User-Agent)
4. **Cachujte dáta** (nescrapujte pri každom requeste)
5. **Kontrolujte Terms of Service**

### Error Handling

Vždy obaľte scraping do try-catch:

```typescript
try {
  // scraping logic
} catch (error) {
  console.error(`Error scraping:`, error);
  return []; // Return empty array, not throw
}
```

### Validácia Dát

Vždy validujte extrahované dáta:

```typescript
if (dateMatch && title && location) {
  // Only add valid events
  events.push(event);
}
```

## 🐛 Debugging Tips

### Console Logging

```typescript
console.log('HTML snippet:', html.substring(0, 500));
console.log('Found elements:', $('.event-card').length);
console.log('Parsed event:', { title, date, location });
```

### Save HTML for Inspection

```typescript
import fs from 'fs/promises';
await fs.writeFile('debug.html', html, 'utf-8');
```

### Test Selectors in Browser

V DevTools console:

```javascript
document.querySelectorAll('.event-card').length
document.querySelector('.event-title').textContent
```

## 📞 Potrebujete Pomoc?

Ak narazíte na problém:

1. Skontrolujte HTML štruktúru webu
2. Overte, že selektory sú správne
3. Testujte s malým množstvom dát
4. Použite console.log pre debugging

## ✅ Checklist pred Commit

- [ ] Funkcia je otestovaná a funguje
- [ ] Error handling je implementovaný
- [ ] Rate limiting je rešpektovaný
- [ ] Dáta sú správne formátované
- [ ] Dokumentácia je aktualizovaná
- [ ] Žiadne hardcoded hodnoty
- [ ] Console logy sú informatívne

---

**Úspešné pridanie nového zdroja! 🎉**
