import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
          <Search className="w-10 h-10 text-blue-600" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Stránka nenájdená
        </h2>
        
        <p className="text-gray-600 mb-8">
          Ľutujeme, ale stránka ktorú hľadáte neexistuje alebo bola presunutá.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
        >
          <Home className="w-5 h-5" />
          Späť na hlavnú stránku
        </Link>
      </div>
    </div>
  );
}
