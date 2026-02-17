import { Event } from '@/types/event';
import { format, parseISO } from 'date-fns';
import { sk } from './date-fns-locale';

/**
 * Format date to Slovak locale
 */
export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'd. MMMM yyyy', { locale: sk });
  } catch (error) {
    return dateString;
  }
}

/**
 * Format date to short format (DD.MM.YYYY)
 */
export function formatDateShort(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd.MM.yyyy');
  } catch (error) {
    return dateString;
  }
}

/**
 * Get day of week in Slovak
 */
export function getDayOfWeek(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'EEEE', { locale: sk });
  } catch (error) {
    return '';
  }
}

/**
 * Get month name in Slovak
 */
export function getMonthName(month: number): string {
  const months = [
    'Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún',
    'Júl', 'August', 'September', 'Október', 'November', 'December'
  ];
  return months[month - 1] || '';
}

/**
 * Get all months for filter
 */
export function getAllMonths(): { value: number; label: string }[] {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: getMonthName(i + 1),
  }));
}

/**
 * Group events by month
 */
export function groupEventsByMonth(events: Event[]): Map<number, Event[]> {
  const grouped = new Map<number, Event[]>();
  
  events.forEach(event => {
    const month = event.month;
    if (!grouped.has(month)) {
      grouped.set(month, []);
    }
    grouped.get(month)!.push(event);
  });

  return grouped;
}

/**
 * Get upcoming events (from today)
 */
export function getUpcomingEvents(events: Event[]): Event[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return events.filter(event => event.dateObject >= today);
}

/**
 * Get past events
 */
export function getPastEvents(events: Event[]): Event[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return events.filter(event => event.dateObject < today);
}

/**
 * Normalize string for search (remove diacritics, lowercase)
 */
export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Search events with normalized strings
 */
export function searchEventsNormalized(events: Event[], query: string): Event[] {
  const normalizedQuery = normalizeString(query);
  
  return events.filter(event => {
    const normalizedTitle = normalizeString(event.title);
    const normalizedLocation = normalizeString(event.location);
    
    return normalizedTitle.includes(normalizedQuery) || 
           normalizedLocation.includes(normalizedQuery);
  });
}

/**
 * Get event statistics
 */
export function getEventStats(events: Event[]): {
  total: number;
  upcoming: number;
  past: number;
  byMonth: Record<number, number>;
} {
  const upcoming = getUpcomingEvents(events);
  const past = getPastEvents(events);
  
  const byMonth: Record<number, number> = {};
  events.forEach(event => {
    byMonth[event.month] = (byMonth[event.month] || 0) + 1;
  });

  return {
    total: events.length,
    upcoming: upcoming.length,
    past: past.length,
    byMonth,
  };
}
