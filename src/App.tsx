/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';

const variations = [
  {
    folder: 'variation-1-blueprint-grid',
    name: '1. Blueprint Grid',
    desc: 'Technical, tabular, hard-lined.'
  },
  {
    folder: 'variation-2-high-vis-dispatch',
    name: '2. High-Vis Dispatch',
    desc: 'Action-oriented, bold contrast.'
  },
  {
    folder: 'variation-3-executive-dossier',
    name: '3. Executive Dossier',
    desc: 'Clean, corporate, editorial whitespace.'
  }
];

const templates = [
  { file: '01-daily-site-report.html', name: 'Daily Site Report' },
  { file: '02-weekly-project-summary.html', name: 'Weekly Project Summary' },
  { file: '03-weekly-business-review.html', name: 'Weekly Business Review' },
  { file: '04-monthly-operations-overview.html', name: 'Monthly Operations Overview' }
];

export default function App() {
  const [selectedVar, setSelectedVar] = useState(variations[0]);
  const [selectedTemp, setSelectedTemp] = useState(templates[0]);

  const iframeSrc = `/${selectedVar.folder}/${selectedTemp.file}`;

  return (
    <div className="flex h-screen w-full bg-[#f6f3ec] text-[#1a1a1a] font-sans">
      {/* Sidebar */}
      <div className="w-80 border-r border-[#cfc9bd] flex flex-col h-full overflow-y-auto">
        <div className="p-6 border-b-2 border-[#1a1a1a]">
          <h1 className="font-serif text-2xl font-bold tracking-tight">Sunbelt Sports</h1>
          <p className="font-mono text-xs text-[#6b6b66] mt-1 tracking-wider uppercase">Email System Gallery</p>
        </div>

        <div className="p-6">
          <h2 className="text-xs font-bold text-[#6b6b66] uppercase tracking-wider mb-4">Select Variation</h2>
          <div className="space-y-3">
            {variations.map(v => (
              <button
                key={v.folder}
                onClick={() => setSelectedVar(v)}
                className={`w-full text-left p-3 border text-sm transition-colors ${
                  selectedVar.folder === v.folder 
                    ? 'border-[#1a1a1a] bg-[#ebe7db] font-semibold' 
                    : 'border-transparent hover:border-[#cfc9bd]'
                }`}
              >
                <div className="text-sm">{v.name}</div>
                <div className="text-[10px] text-[#6b6b66] mt-1 font-mono">{v.desc}</div>
              </button>
            ))}
          </div>

          <h2 className="text-xs font-bold text-[#6b6b66] uppercase tracking-wider mb-4 mt-8">Select Template</h2>
          <div className="space-y-2">
            {templates.map(t => (
              <button
                key={t.file}
                onClick={() => setSelectedTemp(t)}
                className={`w-full flex items-center justify-between p-2 border-b transition-colors ${
                  selectedTemp.file === t.file 
                    ? 'border-[#1a1a1a] text-[#1a1a1a] font-semibold' 
                    : 'border-[#cfc9bd] text-[#6b6b66] hover:text-[#1a1a1a]'
                }`}
              >
                <span className="text-sm">{t.name}</span>
                <span className="font-mono text-[10px]">HTML</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-[#ebe7db]">
        <div className="p-4 border-b border-[#cfc9bd] bg-[#f6f3ec] flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold uppercase text-[#1a1a1a]">Previewing:</span>
            <span className="font-mono text-xs text-[#6b6b66] bg-[#ebe7db] px-2 py-1 rounded">
              /{selectedVar.folder}/{selectedTemp.file}
            </span>
          </div>
          <a base href={iframeSrc} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-wider text-[#0BBE63] hover:text-[#1a1a1a] transition-colors border border-[#0BBE63] hover:border-[#1a1a1a] px-3 py-1 rounded-sm">
            Open Raw HTML
          </a>
        </div>
        
        <div className="flex-1 overflow-hidden p-8 flex justify-center items-start">
          <div className="w-[640px] h-[800px] max-h-full bg-white shadow-xl ring-1 ring-[#1a1a1a]/10 overflow-hidden flex flex-col rounded-md resize-x min-w-[320px]">
             <div className="bg-[#f1ede1] border-b border-[#cfc9bd] px-4 py-2 flex items-center space-x-2">
               <div className="w-3 h-3 rounded-full border border-[#cfc9bd]"></div>
               <div className="w-3 h-3 rounded-full border border-[#cfc9bd]"></div>
               <div className="w-3 h-3 rounded-full border border-[#cfc9bd]"></div>
             </div>
             <iframe 
                src={iframeSrc} 
                className="w-full flex-1 border-none bg-[#f6f3ec]"
                title="Email Preview"
             />
          </div>
        </div>
      </div>
    </div>
  );
}
