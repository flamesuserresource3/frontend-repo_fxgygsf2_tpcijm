import React, { useMemo } from 'react';

function findNumericColumns(rows) {
  if (!rows || rows.length === 0) return [];
  const sample = rows[0];
  return Object.keys(sample).filter((k) => typeof sample[k] === 'number');
}

function BarChart({ data, height = 180 }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const barWidth = Math.max(8, Math.floor(300 / Math.max(data.length, 1)));
  return (
    <svg viewBox={`0 0 ${data.length * (barWidth + 8)} ${height}`} className="w-full h-48">
      {data.map((d, i) => {
        const h = (d.value / max) * (height - 24);
        return (
          <g key={i} transform={`translate(${i * (barWidth + 8)}, ${height - h - 20})`}>
            <rect width={barWidth} height={h} rx="4" className="fill-blue-500" />
            <text x={barWidth / 2} y={h + 14} textAnchor="middle" className="fill-gray-500 text-[10px]">
              {String(d.label).slice(0, 6)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function LineChart({ data, height = 180 }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const width = Math.max(320, data.length * 20);
  const points = data.map((d, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * (width - 20) + 10;
    const y = height - 20 - (d.value / max) * (height - 30);
    return `${x},${y}`;
  });
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48">
      <polyline points={points.join(' ')} className="fill-none stroke-emerald-500" strokeWidth="2" />
      {data.map((d, i) => {
        const x = (i / Math.max(data.length - 1, 1)) * (width - 20) + 10;
        const y = height - 20 - (d.value / max) * (height - 30);
        return <circle key={i} cx={x} cy={y} r="3" className="fill-emerald-500" />;
      })}
    </svg>
  );
}

export default function ChartsPanel({ rows }) {
  const numericCols = useMemo(() => findNumericColumns(rows), [rows]);
  const firstNum = numericCols[0];

  const barData = useMemo(() => {
    if (!rows || rows.length === 0 || !firstNum) return [];
    // Use index as label
    return rows.slice(0, 20).map((r, i) => ({ label: i + 1, value: Number(r[firstNum]) || 0 }));
  }, [rows, firstNum]);

  const lineData = barData;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm" id="charts">
        <h2 className="text-base font-semibold text-gray-800 mb-2">Bar Chart</h2>
        {barData.length ? (
          <BarChart data={barData} />
        ) : (
          <p className="text-sm text-gray-500">Upload a CSV with at least one numeric column to see a bar chart.</p>
        )}
      </div>
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-base font-semibold text-gray-800 mb-2">Line Chart</h2>
        {lineData.length ? (
          <LineChart data={lineData} />
        ) : (
          <p className="text-sm text-gray-500">A simple trend line will appear here once data is available.</p>
        )}
      </div>
    </div>
  );
}
