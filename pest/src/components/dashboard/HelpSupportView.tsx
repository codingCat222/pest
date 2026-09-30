import React, { useState } from 'react';
import { Phone, Mail, Clock, MessageSquare, Check, ShieldCheck } from 'lucide-react';
import { CaseRecord } from '../../types';

interface HelpSupportViewProps {
  activeCase: CaseRecord | null;
}

export const HelpSupportView: React.FC<HelpSupportViewProps> = ({ activeCase }) => {
  const [ticketSent, setTicketSent] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSent(true);
    setTimeout(() => {
      setSubject('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="max-w-4xl space-y-8 pb-16">

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Help &amp; Customer Support
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {activeCase ? `Direct assistance for your active case #${activeCase.referenceNumber} at ${activeCase.propertyAddress}.` : 'Get in touch with our team about your account or order.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone Support</div>
          <div className="text-sm font-bold text-slate-900">0800 048 7291</div>
          <div className="text-[11px] text-slate-500">Freephone UK • 8am – 7pm daily</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Assistance</div>
          <div className="text-sm font-bold text-slate-900">support@freepestproducts.co.uk</div>
          <div className="text-[11px] text-slate-500">Typical response under 2 hours</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Emergency Dispatch</div>
          <div className="text-sm font-bold text-slate-900">24/7 Rapid Triage</div>
          <div className="text-[11px] text-slate-500">For active commercial infestations</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
        <h2 className="text-lg font-bold text-slate-900">
          Send a Support Ticket
        </h2>

        {ticketSent ? (
          <div className="p-6 rounded-xl bg-emerald-50 text-center space-y-2 border border-emerald-200">
            <Check className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-slate-900 text-sm">Ticket Submitted</h3>
            <p className="text-xs text-slate-600">
              Reference #{activeCase ? `${activeCase.referenceNumber}-SPT` : 'SPT'} generated. Our technical desk will contact you shortly.
            </p>
            <button
              type="button"
              onClick={() => setTicketSent(false)}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              Submit another query
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Question regarding station placement under kitchen units"
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Message</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe what you are observing or what you need help with..."
                className="w-full p-3 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Submit Ticket
            </button>
          </form>
        )}
      </div>

    </div>
  );
};