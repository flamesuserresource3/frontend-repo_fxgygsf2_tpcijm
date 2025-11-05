import React, { useMemo, useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';

function summarize(rows) {
  if (!rows || rows.length === 0) return 'No data loaded. Upload a CSV to get insights.';
  const keys = Object.keys(rows[0] || {});
  const numeric = keys.filter((k) => typeof rows[0][k] === 'number');
  if (numeric.length === 0) return 'Data loaded, but no numeric columns detected.';
  const lines = [];
  for (const k of numeric) {
    const vals = rows.map((r) => Number(r[k]) || 0);
    const n = vals.length;
    const sum = vals.reduce((a, b) => a + b, 0);
    const avg = sum / Math.max(n, 1);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    lines.push(`• ${k}: min ${min.toFixed(2)}, avg ${avg.toFixed(2)}, max ${max.toFixed(2)}`);
  }
  return [
    `Found ${rows.length} rows and ${numeric.length} numeric column(s).`,
    ...lines,
    'Suggested visuals: bar chart for distributions, line chart for trends.'
  ].join('\n');
}

export default function AIAssistant({ rows }) {
  const [prompt, setPrompt] = useState('Summarize the dataset and suggest visuals.');
  const [output, setOutput] = useState('');

  const quickSummary = useMemo(() => summarize(rows), [rows]);

  const handleGenerate = () => {
    // Mocked AI generation using local summary + prompt cue
    const base = summarize(rows);
    const result = `${base}\n\nPrompt: ${prompt}\nAction: Generated locally without external APIs to keep it free and private.`;
    setOutput(result);
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm" id="assistant">
      <div className="flex items-center gap-2 mb-2">
        <Bot className="w-4 h-4 text-purple-600" />
        <h2 className="text-base font-semibold text-gray-800">AI Assistant</h2>
      </div>
      <p className="text-xs text-gray-500 mb-3">Lightweight, on-device style insights. No API keys required.</p>
      <div className="grid gap-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="w-full rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-sm"
        />
        <div className="flex items-center gap-2">
          <button onClick={handleGenerate} className="inline-flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-3 py-2 rounded-md">
            <Sparkles className="w-4 h-4" />
            Generate Insights
          </button>
          <button onClick={() => setOutput(quickSummary)} className="text-sm text-gray-600 hover:text-gray-900 underline">
            Quick summary
          </button>
        </div>
        <pre className="whitespace-pre-wrap text-sm bg-gray-50 border border-gray-200 rounded-md p-3 min-h-[120px]">{output || quickSummary}</pre>
      </div>
    </div>
  );
}
