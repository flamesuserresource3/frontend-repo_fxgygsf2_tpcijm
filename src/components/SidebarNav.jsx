import React from 'react';
import { Home, BarChart2, Database, Bot, Settings } from 'lucide-react';

const sections = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'data', label: 'Data', icon: Database },
  { id: 'charts', label: 'Charts', icon: BarChart2 },
  { id: 'assistant', label: 'AI Assistant', icon: Bot },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function SidebarNav() {
  const handleNav = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside className="h-full w-full lg:w-64 bg-white/70 backdrop-blur border-r border-gray-200 p-4 flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto">
      {sections.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => handleNav(id)}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 whitespace-nowrap"
          aria-label={label}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden lg:inline">{label}</span>
        </button>
      ))}
    </aside>
  );
}
