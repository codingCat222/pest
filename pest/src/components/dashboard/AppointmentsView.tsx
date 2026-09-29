import React, { useMemo, useState } from 'react';
import { CaseRecord } from '../../types';
import { AppointmentsService } from '../../services/appointments';
import { CasesService } from '../../services/cases';
import { apiErrorMessage } from '../../services/format';
import { Calendar, Clock, MapPin, User, CheckCircle2, AlertCircle, Wrench, X } from 'lucide-react';

interface AppointmentsViewProps {
  activeCase: CaseRecord;
  onOpenBookingModal: () => void;
  onUpdateCase: (updated: CaseRecord) => void;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({
  activeCase,
  onOpenBookingModal,
  onUpdateCase
}) => {
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dateOptions = useMemo(() => {
    const out: { label: string; iso: string }[] = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      out.push({ iso, label: d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }) });
    }
    return out;
  }, []);

  const [rescheduleDate, setRescheduleDate] = useState(dateOptions[0].iso);
  const [rescheduleSlot, setRescheduleSlot] = useState('02:00 PM – 04:00 PM');

  const refreshCase = async () => {
    const fresh = await CasesService.getById(activeCase.id);
    onUpdateCase(fresh);
  };

  const handleConfirmReschedule = async () => {
    if (!activeCase.appointmentId) return;
    setErrorMessage(null);
    setIsSaving(true);
    try {
      await AppointmentsService.reschedule(activeCase.appointmentId, rescheduleDate, rescheduleSlot);
      await refreshCase();
      setShowRescheduleModal(false);
    } catch (err) {
      setErrorMessage(apiErrorMessage(err, 'Unable to reschedule. Please try again.'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelAppointment = async () => {
    if (!activeCase.appointmentId) return;
    if (!confirm('Are you sure you want to cancel this inspection appointment? You can book again at any time.')) return;
    setErrorMessage(null);
    setIsSaving(true);
    try {
      await AppointmentsService.cancel(activeCase.appointmentId);
      await refreshCase();
    } catch (err) {
      setErrorMessage(apiErrorMessage(err, 'Unable to cancel. Please try again.'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 pb-16">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Appointments
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Professional inspection and treatment appointments for {activeCase.propertyName}.
          </p>
        </div>

        {!activeCase.appointmentDate && (
          <button
            type="button"
            onClick={onOpenBookingModal}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer self-start sm:self-auto"
          >
            Book Visit (£95.99)
          </button>
        )}
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">{errorMessage}</div>
      )}

      {activeCase.appointmentDate ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                Upcoming Appointment
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Professional Rodent Inspection &amp; Treatment
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Confirmed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>{activeCase.appointmentDate}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{activeCase.appointmentTime || 'Time to be confirmed'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{activeCase.propertyAddress}, {activeCase.postcode}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <User className="w-4 h-4 text-slate-600" />
                <span>Technician: {activeCase.technicianName || 'To be assigned'}</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                BPCA / RSPH Level 2 Certified Pest Management Professional equipped with ultrasonic optical camera, heat steaming system, and high-potency formulations.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowRescheduleModal(true)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
            >
              Reschedule
            </button>
            <button
              type="button"
              onClick={handleCancelAppointment}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-red-50 hover:text-red-700 text-slate-600 font-semibold text-xs transition-colors cursor-pointer"
            >
              Cancel Appointment
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/90 text-center space-y-4 shadow-xs">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">No Upcoming Appointments</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            You are currently on Day {activeCase.monitoringDay} of 7. If activity persists after product deployment, our £95.99 fixed-fee professional inspection is available.
          </p>
          <button
            type="button"
            onClick={onOpenBookingModal}
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Book Professional Inspection (£95.99)
          </button>
        </div>
      )}

      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Reschedule Visit</h3>
              <button
                type="button"
                onClick={() => setShowRescheduleModal(false)}
                className="text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">New Date</label>
                <select
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                >
                  {dateOptions.map((d) => (
                    <option key={d.iso} value={d.iso}>{d.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Arrival Window</label>
                <select
                  value={rescheduleSlot}
                  onChange={(e) => setRescheduleSlot(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                >
                  <option value="08:30 AM – 10:30 AM">08:30 AM – 10:30 AM</option>
                  <option value="11:00 AM – 01:00 PM">11:00 AM – 01:00 PM</option>
                  <option value="02:00 PM – 04:00 PM">02:00 PM – 04:00 PM</option>
                  <option value="05:00 PM – 07:00 PM">05:00 PM – 07:00 PM</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowRescheduleModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReschedule}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Confirm New Date
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};