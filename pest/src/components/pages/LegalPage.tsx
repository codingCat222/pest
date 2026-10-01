import React, { useState } from 'react';
import { NavigationPage } from '../../types';
import { TERMS, TERMS_INTRO, PRIVACY, PRIVACY_INTRO, PRIVACY_NOTICE, LAST_UPDATED, LegalSection } from '../../data/LegalContent';

const LegalBlock: React.FC<{ sec: LegalSection }> = ({ sec }) => (
  <section className="space-y-2">
    <h2 className="font-bold text-slate-900 text-base">{sec.heading}</h2>
    {sec.paras?.map((p, i) => <p key={i}>{p}</p>)}
    {sec.bullets && (
      <ul className="list-disc pl-5 space-y-1">
        {sec.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    )}
  </section>
);

interface LegalPageProps {
  initialSection: 'terms' | 'privacy' | 'cookies';
  onNavigate: (page: NavigationPage) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialSection, onNavigate }) => {
  const [section, setSection] = useState<'terms' | 'privacy' | 'cookies'>(initialSection);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">

        <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
          <button
            onClick={() => setSection('terms')}
            className={`pb-3 transition-colors ${section === 'terms' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
          >
            Terms &amp; Conditions
          </button>
          <button
            onClick={() => setSection('privacy')}
            className={`pb-3 transition-colors ${section === 'privacy' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setSection('cookies')}
            className={`pb-3 transition-colors ${section === 'cookies' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
          >
            Cookie Policy
          </button>
        </div>

        {section === 'terms' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Terms &amp; Conditions</h1>
              <p className="text-xs text-slate-400 mt-1">Last updated: {LAST_UPDATED}</p>
            </div>
            <p>{TERMS_INTRO}</p>
            {TERMS.map((sec) => <LegalBlock key={sec.heading} sec={sec} />)}
          </div>
        )}

        {section === 'privacy' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
              <p className="text-xs text-slate-400 mt-1">Last updated: {LAST_UPDATED} · UK GDPR &amp; Data Protection Act 2018</p>
            </div>
            <p>{PRIVACY_INTRO}</p>
            {PRIVACY.map((sec) => <LegalBlock key={sec.heading} sec={sec} />)}

            <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h2 className="font-bold text-slate-900 text-base">{PRIVACY_NOTICE.title}</h2>
              <p>{PRIVACY_NOTICE.intro}</p>
              <ul className="list-disc pl-5 space-y-1.5">
                {PRIVACY_NOTICE.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          </div>
        )}

        {section === 'cookies' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
            <div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                PAGE 18 — COOKIE POLICY
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
                Cookie &amp; Tracking Policy
              </h1>
              <p className="text-xs text-slate-400 mt-1">Version 1.0</p>
            </div>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-base">1. Essential Cookies</h2>
              <p>
                Necessary for the operation of your customer dashboard, login sessions, and secure checkout navigation. These cannot be disabled.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-base">2. Analytics Cookies</h2>
              <p>
                Help us understand how homeowners navigate from the eligibility quiz to product delivery and monitoring, allowing us to streamline customer service.
              </p>
            </section>
          </div>
        )}

      </div>
    </div>
  );
};