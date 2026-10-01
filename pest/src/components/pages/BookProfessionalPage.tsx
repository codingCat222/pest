import React, { useMemo, useState } from 'react';
import { CaseRecord } from '../../types';
import { CheckCircle2, Clock, ArrowLeft, ArrowRight, MapPin, CalendarCheck } from 'lucide-react';
import { PrivacyNoticeShort } from '../PrivacyNoticeShort';

interface BookProfessionalPageProps {
    currentCase: CaseRecord;
    onBookingConfirmed: (date: string, time: string, isoDate: string) => Promise<void>;
    onBack: () => void;
    onGoToDashboard: () => void;
}

const SLOTS = [
    '08:30 AM – 10:30 AM',
    '11:00 AM – 01:00 PM',
    '02:00 PM – 04:00 PM',
    '05:00 PM – 07:00 PM',
];

const INCLUDES = [
    'Property inspection & entry search',
    'High Strength professional bait',
    'Powerful ultrasonic inspection camera',
    'Heat Steamer (for stubborn bedbugs)',
    'Golf-ball-size hole proofing materials',
    'Review of previous treatment',
];

function buildDates() {
    const out: { label: string; date: string; iso: string }[] = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        out.push({
            iso,
            label: i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-GB', { weekday: 'long' }),
            date: d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }),
        });
    }
    return out;
}

export const BookProfessionalPage: React.FC<BookProfessionalPageProps> = ({
    currentCase,
    onBookingConfirmed,
    onBack,
    onGoToDashboard,
}) => {
    const dates = useMemo(buildDates, []);
    const [selectedDate, setSelectedDate] = useState(dates[0].date);
    const [selectedSlot, setSelectedSlot] = useState(SLOTS[1]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            const iso = dates.find((d) => d.date === selectedDate)?.iso ?? dates[0].iso;
            await onBookingConfirmed(selectedDate, selectedSlot, iso);
            setConfirmed(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err: any) {
            setError(err?.response?.data?.error || 'Unable to book your appointment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (confirmed) {
        return (
            <div className="min-h-[70vh] bg-white flex items-center justify-center px-4 py-16">
                <div className="max-w-md w-full text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto">
                        <CalendarCheck className="w-8 h-8 text-brand-green" />
                    </div>
                    <h1 className="text-3xl font-black text-brand-purple tracking-tight">You're booked in</h1>
                    <p className="text-brand-purple/75">
                        A certified technician will visit on <strong>{selectedDate}</strong>, between <strong>{selectedSlot}</strong>.
                    </p>
                    <div className="bg-white rounded-2xl shadow-md p-5 text-left text-sm space-y-1">
                        <div className="text-[11px] font-bold uppercase tracking-wide text-brand-purple/50">Visit address</div>
                        <div className="font-semibold text-brand-purple">
                            {currentCase.propertyAddress}, {currentCase.postcode}
                        </div>
                        <div className="text-brand-purple/70">Reference: {currentCase.referenceNumber}</div>
                    </div>
                    <button
                        type="button"
                        onClick={onGoToDashboard}
                        className="w-full py-4 rounded-full bg-brand-green hover:bg-brand-green-dark text-white font-extrabold text-sm transition-all cursor-pointer"
                    >
                        GO TO MY DASHBOARD
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white py-10 sm:py-14">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-purple/60 hover:text-brand-purple mb-6 cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <div className="text-xs font-bold text-brand-green uppercase tracking-widest">
                    Still seeing activity?
                </div>
                <h1 className="mt-2 text-3xl sm:text-4xl font-black text-brand-purple tracking-tight">
                    Professional Inspection &amp; Treatment
                </h1>
                <p className="mt-3 text-brand-purple/75 leading-relaxed">
                    You've completed your initial treatment and are still seeing signs of activity. Choose a convenient appointment time and we'll arrange your professional visit.
                </p>

                <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                    <div className="rounded-2xl shadow-md p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-brand-purple">Your visit includes</span>
                            <span className="text-2xl font-black text-brand-purple">£95.99</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-brand-purple/80">
                            {INCLUDES.map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-wide text-brand-purple/60 mb-3">
                            Select appointment date
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {dates.map((d) => (
                                <button
                                    type="button"
                                    key={d.date}
                                    onClick={() => setSelectedDate(d.date)}
                                    className={`p-3 rounded-xl text-center border text-sm transition-all cursor-pointer ${selectedDate === d.date
                                        ? 'bg-brand-green text-white border-brand-green font-bold shadow-sm'
                                        : 'bg-white text-brand-purple border-brand-purple/15 hover:bg-brand-purple/5'
                                        }`}
                                >
                                    <div className="text-[11px] opacity-80">{d.label}</div>
                                    <div className="font-semibold mt-0.5">{d.date}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-wide text-brand-purple/60 mb-3">
                            Select arrival window
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {SLOTS.map((slot) => (
                                <button
                                    type="button"
                                    key={slot}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`p-3.5 rounded-xl text-left border text-sm flex items-center justify-between transition-all cursor-pointer ${selectedSlot === slot
                                        ? 'border-brand-green bg-brand-green/5 text-brand-purple font-bold'
                                        : 'bg-white border-brand-purple/15 text-brand-purple/80 hover:bg-brand-purple/5'
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-brand-purple/40" />
                                        {slot}
                                    </span>
                                    {selectedSlot === slot && <CheckCircle2 className="w-4 h-4 text-brand-green" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl shadow-sm border border-brand-purple/10 p-4 flex items-start gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-brand-green mt-0.5 shrink-0" />
                        <div>
                            <div className="text-[11px] font-bold uppercase tracking-wide text-brand-purple/50">Property location</div>
                            <div className="font-semibold text-brand-purple">
                                {currentCase.customerName} — {currentCase.propertyAddress}, {currentCase.postcode}
                            </div>
                            <div className="text-brand-purple/60">Contact: {currentCase.customerPhone}</div>
                        </div>
                    </div>

                    {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
                    <PrivacyNoticeShort />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-full bg-brand-green hover:bg-brand-green-dark disabled:opacity-60 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                    >
                        {isSubmitting ? (
                            <span>Confirming appointment...</span>
                        ) : (
                            <>
                                <span>CONFIRM APPOINTMENT</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                    <p className="text-xs text-center text-brand-purple/50">
                        Payment is taken on the next step once online payments are switched on.
                    </p>
                </form>
            </div>
        </div>
    );
};