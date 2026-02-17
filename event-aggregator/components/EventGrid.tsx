'use client';

import { Event } from '@/types/event';
import EventCard from './EventCard';
import { Calendar } from 'lucide-react';

interface EventGridProps {
  events: Event[];
  loading?: boolean;
}

export default function EventGrid({ events, loading }: EventGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 animate-pulse"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="bg-gray-200 w-full sm:w-[120px] h-32 sm:h-auto" />
              <div className="flex-1 p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
          <Calendar className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Žiadne podujatia
        </h3>
        <p className="text-gray-600">
          Pre zadané kritériá sme nenašli žiadne podujatia.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
