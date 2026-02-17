'use client';

import { Event } from '@/types/event';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import { formatDateShort, getDayOfWeek } from '@/lib/utils';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const dayOfWeek = getDayOfWeek(event.date);
  const [year, month, day] = event.date.split('-');

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row">
        {/* Date Badge - Prominent Visual Element */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 flex flex-col items-center justify-center min-w-[140px] sm:min-w-[120px]">
          <div className="text-sm font-medium uppercase tracking-wider opacity-90">
            {event.month}. mesiac
          </div>
          <div className="text-5xl font-bold my-2">
            {day}
          </div>
          <div className="text-sm font-medium uppercase tracking-wide opacity-90">
            {dayOfWeek}
          </div>
        </div>

        {/* Event Details */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full justify-between">
            {/* Title */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {event.title}
              </h3>

              {/* Meta Information */}
              <div className="space-y-2">
                {/* Location */}
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" />
                  <span className="text-sm font-medium">{event.location}</span>
                </div>

                {/* Time */}
                {event.time && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 flex-shrink-0 text-blue-500" />
                    <span className="text-sm font-medium">{event.time}</span>
                  </div>
                )}

                {/* Full Date */}
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5 flex-shrink-0 text-blue-500" />
                  <span className="text-sm">{formatDateShort(event.date)}</span>
                </div>
              </div>
            </div>

            {/* Source Link */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a
                href={event.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium group/link"
              >
                <span>Viac info na {event.sourceWebsite}</span>
                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
