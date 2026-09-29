import React, { useEffect, useState } from 'react';
import { DocumentsService } from '../../services/documents';
import { apiErrorMessage } from '../../services/format';
import { DocumentItem } from '../../types';
import { FileText, Download, CheckCircle2 } from 'lucide-react';

export const DocumentsView: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    DocumentsService.list()
      .then((data) => { if (!cancelled) setDocuments(data); })
      .catch((err) => { if (!cancelled) setError(apiErrorMessage(err, 'Unable to load your documents.')); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

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
        {loading && <div className="p-8 text-center text-xs text-slate-500">Loading your documents...</div>}
        {!loading && error && <div className="p-8 text-center text-xs font-semibold text-red-600">{error}</div>}
        {!loading && !error && documents.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-500">No documents yet. Receipts, instructions and reports will appear here.</div>
        )}
        {documents.map((doc) => (
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
                  <span>{doc.format}{doc.size ? ` (${doc.size})` : ''}</span>
                  <span>•</span>
                  <span>{doc.date}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => doc.fileUrl && window.open(doc.fileUrl, '_blank', 'noopener,noreferrer')}
              disabled={!doc.fileUrl}
              title={doc.fileUrl ? undefined : 'File not available yet'}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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