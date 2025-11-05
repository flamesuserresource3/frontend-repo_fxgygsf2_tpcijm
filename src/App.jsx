import React, { useMemo, useState } from 'react';
import SidebarNav from './components/SidebarNav.jsx';
import HeaderBar from './components/HeaderBar.jsx';
import DataUploader from './components/DataUploader.jsx';
import ChartsPanel from './components/ChartsPanel.jsx';
import AIAssistant from './components/AIAssistant.jsx';

function StatCard({ title, value, hint }) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="text-xs uppercase tracking-wide text-gray-500">{title}</div>
      <div className="text-2xl font-semibold text-gray-800 mt-1">{value}</div>
      {hint && <div className="text-xs text-gray-500 mt-1">{hint}</div>}
    </div>
  );
}

export default function App() {
  const [rows, setRows] = useState([]);

  const columns = useMemo(() => {
    if (!rows || rows.length === 0) return [];
    return Object.keys(rows[0]);
  }, [rows]);

  const numericCols = useMemo(() => {
    return columns.filter((c) => typeof (rows[0] || {})[c] === 'number');
  }, [columns, rows]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-gray-800">
      <HeaderBar />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[16rem_1fr] gap-4 p-4">
        <div className="hidden lg:block" aria-label="Sidebar">
          <SidebarNav />
        </div>

        <main className="space-y-6">
          <section id="dashboard" className="grid md:grid-cols-4 gap-4">
            <StatCard title="Rows" value={rows.length} hint="Total records loaded" />
            <StatCard title="Columns" value={columns.length} hint="Detected fields" />
            <StatCard title="Numeric" value={numericCols.length} hint="Quantitative fields" />
            <StatCard title="Status" value={rows.length ? 'Ready' : 'Waiting'} hint={rows.length ? 'Data loaded' : 'Upload CSV to begin'} />
          </section>

          <section id="data" className="grid md:grid-cols-2 gap-4">
            <DataUploader onData={setRows} />
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm overflow-auto">
              <h2 className="text-base font-semibold text-gray-800 mb-2">Preview</h2>
              {rows.length ? (
                <div className="max-h-64 overflow-auto border border-gray-100 rounded-md">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        {columns.map((c) => (
                          <th key={c} className="text-left font-medium text-gray-600 px-3 py-2 border-b">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.slice(0, 12).map((r, i) => (
                        <tr key={i} className="odd:bg-white even:bg-gray-50">
                          {columns.map((c) => (
                            <td key={c} className="px-3 py-2 border-b text-gray-700">{String(r[c])}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No data yet. Upload a CSV file to preview it here.</p>
              )}
            </div>
          </section>

          <section id="charts">
            <ChartsPanel rows={rows} />
          </section>

          <section>
            <AIAssistant rows={rows} />
          </section>

          <section id="settings" className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 mb-2">Settings</h2>
            <p className="text-sm text-gray-500">This demo keeps everything on the client for privacy and zero cost. Use the side navigation to jump between sections.</p>
          </section>
        </main>
      </div>

      <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur shadow-lg border border-gray-200 rounded-full px-3 py-2 flex gap-2">
        {[
          { id: 'dashboard', label: 'Home' },
          { id: 'data', label: 'Data' },
          { id: 'charts', label: 'Charts' },
          { id: 'assistant', label: 'AI' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm px-3 py-1.5 rounded-full hover:bg-gray-100"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
