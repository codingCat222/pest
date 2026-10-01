import React from 'react';
import { PRIVACY_NOTICE, COMPANY } from '../data/LegalContent';

export const PrivacyNoticeShort: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 leading-relaxed ${className}`}>
        <p>
            We (<strong>{COMPANY}</strong>) use the information you give us to assess eligibility, supply products, arrange
            delivery and professional visits, take payment and manage your account. Read our{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-purple underline">
                Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-purple underline">
                Terms &amp; Conditions
            </a>
            .
        </p>
        <details className="mt-2">
            <summary className="cursor-pointer font-semibold text-slate-700">{PRIVACY_NOTICE.title}</summary>
            <ul className="mt-2 list-disc pl-5 space-y-1">
                {PRIVACY_NOTICE.points.map((p) => (
                    <li key={p}>{p}</li>
                ))}
            </ul>
        </details>
    </div>
);
