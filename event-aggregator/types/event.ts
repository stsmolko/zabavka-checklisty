export interface Event {
  id: string;
  title: string;
  date: string; // ISO format YYYY-MM-DD
  time?: string; // HH:MM format or time range
  location: string;
  source: string; // URL of the source
  sourceWebsite: string; // Name of the source website
  month: number; // 1-12
  year: number;
  dateObject: Date;
}

export interface ScraperConfig {
  url: string;
  name: string;
  userAgent?: string;
  delayMs?: number;
}
