'use client';

import { Search, Calendar, X, RefreshCw } from 'lucide-react';
import { getAllMonths } from '@/lib/utils';
import { useState } from 'react';

interface FilterBarProps {
  onSearchChange: (query: string) => void;
  onMonthChange: (month: number | null) => void;
  onRefresh: () => void;
  searchQuery: string;
  selectedMonth: number | null;
  isRefreshing?: boolean;
}

export default function FilterBar({
  onSearchChange,
  onMonthChange,
  onRefresh,
  searchQuery,
  selectedMonth,
  isRefreshing = false,
}: FilterBarProps) {
  const months = getAllMonths();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setLocalSearch('');
    onSearchChange('');
  };

  const clearMonth = () => {
    onMonthChange(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Hľadať podujatie alebo miesto..."
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
          />
          {localSearch && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Month Filter */}
        <div className="relative min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={selectedMonth || ''}
            onChange={(e) => onMonthChange(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none text-gray-900 bg-white cursor-pointer"
          >
            <option value="">Všetky mesiace</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
          {selectedMonth && (
            <button
              onClick={clearMonth}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 min-w-[140px]"
        >
          <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Načítavam...' : 'Obnoviť'}</span>
        </button>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || selectedMonth) && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Aktívne filtre:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                Hľadanie: "{searchQuery}"
              </span>
            )}
            {selectedMonth && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                {months.find(m => m.value === selectedMonth)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
