import { NextResponse } from 'next/server';
import { getEvents, filterEventsByMonth, searchEvents } from '@/lib/scraper';

export const dynamic = 'force-dynamic';

/**
 * GET /api/events
 * Query params:
 * - month: Filter by month (1-12)
 * - search: Search query
 * - refresh: Force refresh cache (true/false)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const monthParam = searchParams.get('month');
    const searchQuery = searchParams.get('search');
    const refreshParam = searchParams.get('refresh');

    const forceRefresh = refreshParam === 'true';

    // Get all events (with caching)
    let events = await getEvents(forceRefresh);

    // Apply month filter if provided
    if (monthParam) {
      const month = parseInt(monthParam, 10);
      if (month >= 1 && month <= 12) {
        events = filterEventsByMonth(events, month);
      }
    }

    // Apply search filter if provided
    if (searchQuery && searchQuery.trim()) {
      events = searchEvents(events, searchQuery.trim());
    }

    return NextResponse.json({
      success: true,
      count: events.length,
      events,
    });

  } catch (error) {
    console.error('Error in /api/events:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch events',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
