'use client';

import { useEffect, useState, useCallback } from 'react';
import { Event } from '@/types/event';
import EventGrid from '@/components/EventGrid';
import FilterBar from '@/components/FilterBar';
import { Calendar, Sparkles, TrendingUp } from 'lucide-react';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState({ total: 0, upcoming: 0 });

  // Fetch events from API
  const fetchEvents = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      const url = forceRefresh ? '/api/events?refresh=true' : '/api/events';
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        // Convert date strings back to Date objects
        const eventsWithDates = data.events.map((event: any) => ({
          ...event,
          dateObject: new Date(event.dateObject),
        }));
        
        setEvents(eventsWithDates);
        setFilteredEvents(eventsWithDates);
        
        // Calculate stats
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const upcoming = eventsWithDates.filter((e: Event) => e.dateObject >= today);
        setStats({
          total: eventsWithDates.length,
          upcoming: upcoming.length,
        });
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Apply filters
  useEffect(() => {
    let filtered = [...events];

    // Apply month filter
    if (selectedMonth) {
      filtered = filtered.filter(event => event.month === selectedMonth);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }

    setFilteredEvents(filtered);
  }, [events, selectedMonth, searchQuery]);

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchEvents(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Podujatia na Slovensku
                </h1>
              </div>
              <p className="text-gray-600 text-lg">
                Objavte najlepšie akcie, festivaly a udalosti vo vašom okolí
              </p>
            </div>

            {/* Stats */}
            {!loading && (
              <div className="flex gap-4">
                <div className="bg-blue-50 rounded-xl px-6 py-3 border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Celkom</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">
                    {stats.total}
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl px-6 py-3 border border-green-100">
                  <div className="flex items-center gap-2 text-green-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">Nadchádzajúce</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">
                    {stats.upcoming}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <FilterBar
          onSearchChange={setSearchQuery}
          onMonthChange={setSelectedMonth}
          onRefresh={handleRefresh}
          searchQuery={searchQuery}
          selectedMonth={selectedMonth}
          isRefreshing={isRefreshing}
        />

        {/* Results Count */}
        {!loading && (
          <div className="mb-6">
            <p className="text-gray-600 text-lg">
              Zobrazených <span className="font-bold text-gray-900">{filteredEvents.length}</span> podujatí
              {selectedMonth && ' v tomto mesiaci'}
              {searchQuery && ' podľa vyhľadávania'}
            </p>
          </div>
        )}

        {/* Event Grid */}
        <EventGrid events={filteredEvents} loading={loading} />

        {/* No Results Message */}
        {!loading && filteredEvents.length === 0 && (searchQuery || selectedMonth) && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Skúste zmeniť filtre alebo vyhľadávací dotaz.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              Agregátor podujatí na Slovensku
            </p>
            <p className="text-sm text-gray-500">
              Dáta sa automaticky aktualizujú každých 24 hodín
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Zdroje: AFUS.sk
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
