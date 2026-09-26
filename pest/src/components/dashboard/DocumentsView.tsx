import React from 'react';
import { MOCK_DOCUMENTS } from '../../data/mockData';
import { FileText, Download, CheckCircle2 } from 'lucide-react';

export const DocumentsView: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-8 pb-16">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Documents &amp; Certificates
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Official PDF product instructions, delivery receipts, observation reports, and quotations.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {MOCK_DOCUMENTS.map((doc) => (
          <div key={doc.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-slate-900 text-sm truncate">{doc.title}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                  <span className="font-semibold text-slate-600">{doc.category}</span>
                  <span>•</span>
                  <span>{doc.format} ({doc.size})</span>
                  <span>•</span>
                  <span>{doc.date}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert(`Downloading ${doc.title}...`)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
