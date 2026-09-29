import React, { useState } from 'react';
import { NavigationPage } from '../../types';

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
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                PAGE 16 — TERMS &amp; CONDITIONS
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
                Terms &amp; Conditions of Service
              </h1>
              <p className="text-xs text-slate-400 mt-1">Last revised: September 2026</p>
            </div>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-base">1. Definitions &amp; Platform Operation</h2>
              <p>
                "Free Pest Products" refers to the pest management operating service provided by Free Pest Products UK Ltd. "Customer" refers to any property owner, tenant, or managing agent claiming products or commissioning professional services.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-base">2. Eligibility &amp; Free Product Allocation</h2>
              <p>
                Selected pest-control products are provided at £0.00 product charge to eligible UK households strictly limited to one initial kit per address within a 6-month period. Customer agrees to cover the stated courier delivery charge (£4.95 standard Royal Mail tracked).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-base">3. Safe Use &amp; Compliance</h2>
              <p>
                Products must be used strictly in accordance with their enclosed labels and instructions. Tamper-resistant bait stations must remain closed and placed only in safe locations away from children, pets, and non-target species.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-base">4. £95.99 Professional Service Terms</h2>
              <p>
                The £95.99 Professional Inspection &amp; Treatment covers an onsite assessment by a certified pest control technician, ultrasonic camera survey, placement of high-strength commercial bait, and minor golf-sized hole proofing where applicable. If structural proofing is required, an itemised quotation will be provided without obligation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-base">5. Governing Law</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of England and Wales.
              </p>
            </section>
          </div>
        )}

        {section === 'privacy' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
            <div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                PAGE 17 — PRIVACY POLICY
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
                Privacy &amp; Data Protection
              </h1>
              <p className="text-xs text-slate-400 mt-1">GDPR &amp; UK Data Protection Act 2018 Compliant</p>
            </div>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-base">1. Personal Information Collected</h2>
              <p>
                We collect your name, delivery address, contact email, telephone number, pest observation details, and property type to fulfill orders and assign local technicians.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-base">2. Payment Security</h2>
              <p>
                All delivery and appointment payments are processed via PCI-DSS Level 1 compliant processors. We never store raw credit card numbers on our servers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-base">3. Customer Rights</h2>
              <p>
                Under UK GDPR, you have the right to request access to your personal data, rectify inaccuracies, or request erasure of your account details upon case completion.
              </p>
            </section>
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