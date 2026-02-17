'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Niečo sa pokazilo
        </h2>
        
        <p className="text-gray-600 mb-6">
          Pri načítavaní podujatí sa vyskytla chyba. Skúste to prosím znova.
        </p>

        {error.message && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-700 font-mono break-words">
              {error.message}
            </p>
          </div>
        )}

        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Skúsiť znova
        </button>

        <p className="mt-6 text-sm text-gray-500">
          Ak problém pretrváva, kontaktujte podporu.
        </p>
      </div>
    </div>
  );
}
