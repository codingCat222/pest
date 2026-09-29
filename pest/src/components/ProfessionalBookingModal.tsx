import React, { useState } from 'react';
import { CaseRecord } from '../types';
import { Calendar, Clock, CheckCircle2, X, ArrowRight, ShieldCheck, MapPin, CreditCard, Lock } from 'lucide-react';

interface ProfessionalBookingModalProps {
  currentCase: CaseRecord;
  onClose: () => void;
  onBookingConfirmed: (date: string, time: string) => void;
}

export const ProfessionalBookingModal: React.FC<ProfessionalBookingModalProps> = ({
  currentCase,
  onClose,
  onBookingConfirmed
}) => {
  const dates = [
    { label: 'Tomorrow', date: 'Sat 26 Sept' },
    { label: 'Sunday', date: 'Sun 27 Sept' },
    { label: 'Monday', date: 'Mon 28 Sept' },
    { label: 'Tuesday', date: 'Tue 29 Sept' },
    { label: 'Wednesday', date: 'Wed 30 Sept' }
  ];

  const slots = [
    '08:30 AM – 10:30 AM',
    '11:00 AM – 01:00 PM',
    '02:00 PM – 04:00 PM',
    '05:00 PM – 07:00 PM'
  ];

  const [selectedDate, setSelectedDate] = useState(dates[0].date);
  const [selectedSlot, setSelectedSlot] = useState(slots[1]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onBookingConfirmed(selectedDate, selectedSlot);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-6 overflow-hidden border border-slate-200 shadow-2xl">

        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-sm tracking-tight">PAGE 14 — PROFESSIONAL SERVICE BOOKING</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Still Seeing Activity?
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Professional Inspection &amp; Treatment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              You've completed your initial treatment and are still seeing signs of activity. The next step is professional help. Choose a convenient appointment time and we'll arrange your professional visit.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-950 text-sm">Your Visit Includes:</span>
              <span className="text-xl font-black text-blue-900">£95.99</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Property inspection &amp; entry search</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>High Strength professional bait</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Powerful ultrasonic inspection camera</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Heat Steamer (for stubborn bedbugs)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Golf size proofing materials</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Review of previous treatment</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select Appointment Date
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {dates.map((d) => (
                <button
                  type="button"
                  key={d.date}
                  onClick={() => setSelectedDate(d.date)}
                  className={`p-3 rounded-xl text-center border text-xs transition-all ${selectedDate === d.date
                      ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  <div className="text-[10px] opacity-75">{d.label}</div>
                  <div className="font-semibold text-xs mt-0.5">{d.date}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select Arrival Window
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {slots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-xl text-left border text-xs flex items-center justify-between transition-all ${selectedSlot === slot
                      ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{slot}</span>
                  </span>
                  {selectedSlot === slot && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
            <div className="text-slate-400 font-bold uppercase text-[10px]">Property Location</div>
            <div className="font-semibold text-slate-800">{currentCase.customerName} — {currentCase.propertyAddress}, {currentCase.postcode}</div>
            <div className="text-slate-500">Contact: {currentCase.customerPhone}</div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              {isSubmitting ? (
                <span>Confirming appointment...</span>
              ) : (
                <>
                  <span>CONFIRM APPOINTMENT &amp; PAY £95.99</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};