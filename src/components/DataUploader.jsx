import React from 'react';

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const headers = lines[0].split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cells = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        cells.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
    cells.push(current);
    const obj = {};
    headers.forEach((h, idx) => {
      const raw = (cells[idx] ?? '').trim();
      const asNum = Number(raw);
      obj[h] = raw !== '' && !Number.isNaN(asNum) && /^(?:-?\d+(?:\.\d+)?)$/.test(raw) ? asNum : raw;
    });
    return obj;
  });
}

export default function DataUploader({ onData }) {
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const rows = parseCSV(text);
    onData(rows);
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-base font-semibold text-gray-800 mb-2">Upload CSV</h2>
      <p className="text-sm text-gray-500 mb-3">Drop a CSV file to populate your dashboard.</p>
      <input
        type="file"
        accept=".csv,text/csv"
        onChange={handleFile}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
}
