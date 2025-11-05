import React from 'react';
import { Rocket } from 'lucide-react';

export default function HeaderBar() {
  return (
    <header className="w-full sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rocket className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-800">Open BI Studio</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="hidden sm:inline">A free, lightweight Power BI-style dashboard</span>
        </div>
      </div>
    </header>
  );
}
