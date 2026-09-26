import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { NavigationPage } from '../../types';

interface ContactPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [caseNum, setCaseNum] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 sm:py-20 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        <div className="mb-14">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
            Send an enquiry
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-xl">
            Tell us what you have in mind.
          </h1>
          <p className="mt-5 text-slate-500 text-base sm:text-lg max-w-md leading-relaxed">
            The more context you provide, the better we can understand your request.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6">

          {/* Get in touch panel */}
          <div className="bg-slate-50 rounded-3xl p-8 flex flex-col">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
              Get in touch
            </div>

            <div className="space-y-0 divide-y divide-slate-200">
              <div className="flex items-center gap-4 pb-5">
                <div className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  <Phone className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                    Call us
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    0800 048 7291
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 py-5">
                <div className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  <Mail className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                    Email
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    support@freepestproducts.co.uk
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-5">
                <div className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  <MapPin className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                    Opening hours
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    Mon–Fri, 8am–7pm
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <p className="text-xs text-slate-400">
                We typically respond within 1–2 business hours.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">Existing customer?</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Report activity or check delivery status straight from your dashboard.
              </p>
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Go to my dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Form panel */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                <h3 className="text-xl font-bold text-slate-900">Message received</h3>
                <p className="text-sm text-slate-500 max-w-xs">
                  Thank you. Our customer care team will respond within 2 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-blue-600 font-semibold underline underline-offset-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      Full name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Samuel"
                      className="w-full text-sm px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      Case / order number
                    </label>
                    <input
                      type="text"
                      value={caseNum}
                      onChange={(e) => setCaseNum(e.target.value)}
                      placeholder="FPP-84920"
                      className="w-full text-sm px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    Your message
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you today?"
                    className="w-full text-sm px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Send message</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};