import React, { useState } from 'react';
import { X, Calendar, Clock, Video, CheckCircle2, Globe, Sparkles, AlertCircle } from 'lucide-react';
import { validateEmailAddress, isPlaceholderOrVague } from '../utils/formValidation';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('16:30 IST');
  const [callTopic, setCallTopic] = useState('Full-Stack Web & Lucknow Restaurant AI Stack');
  const [clientName, setClientName] = useState('Aarav Singhania');
  const [clientEmail, setClientEmail] = useState('pixelgrove.ai@gmail.com');
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [autoFilledNotice, setAutoFilledNotice] = useState(false);

  if (!isOpen) return null;

  const handleFillOnYourOwn = () => {
    setClientName('Aarav Singhania');
    setClientEmail('pixelgrove.ai@gmail.com');
    setCallTopic('Full-Stack Web & Lucknow Restaurant AI Stack');
    setSelectedDate('Tomorrow');
    setSelectedTime('16:30 IST');
    setValidationError(null);
    setAutoFilledNotice(true);
    setTimeout(() => setAutoFilledNotice(false), 3000);
  };

  const dates = [
    { label: 'Today', sub: 'Urgent' },
    { label: 'Tomorrow', sub: 'Recommended' },
    { label: 'Thursday', sub: 'Open' },
    { label: 'Friday', sub: 'Open' }
  ];

  const timeSlots = [
    '14:00 IST (08:30 GMT)',
    '15:30 IST (10:00 GMT)',
    '16:30 IST (11:00 GMT)',
    '18:00 IST (12:30 GMT)',
    '19:30 IST (14:00 GMT / 10:00 AM EST)',
    '21:00 IST (15:30 GMT / 11:30 AM EST)'
  ];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // 1. Email check (mandatory, non-negotiable)
    const emailCheck = validateEmailAddress(clientEmail);
    if (!emailCheck.isValid) {
      setValidationError('A valid email address is required. Please enter a complete email address so we can contact you.');
      return;
    }

    // 2. Name check
    const rawName = (clientName || '').trim();
    if (!rawName || rawName.length < 2 || isPlaceholderOrVague(rawName)) {
      setValidationError('Some details are incomplete. Please fill in all required fields before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          selectedDate,
          selectedTime,
          callTopic
        })
      });

      if (res.ok) {
        const data = await res.json();
        setBookingId(data?.booking?.id || `MEET-${Date.now().toString().slice(-6)}`);
        setIsBooked(true);
      } else {
        const errData = await res.json().catch(() => ({}));
        setValidationError(errData?.error || 'Some details are incomplete. Please fill in all required fields before submitting.');
      }
    } catch {
      setValidationError('Some details are incomplete. Please fill in all required fields before submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div
        className="relative w-full max-w-lg bg-[#1d2025] border border-[#4cd7f6]/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#282a30]/80 border-b border-[#464554]/30">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-pulse" />
            <h3 className="font-semibold text-base text-[#e2e2ea]">
              Book Free Strategy Call (15-Min)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#908fa0] hover:text-white hover:bg-[#37393f] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {!isBooked ? (
          <form onSubmit={handleBooking} className="p-6 space-y-5 text-sm">
            {/* Host info and Quick Fill */}
            <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#0c0e13]/60 border border-[#464554]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8083ff]/20 text-[#c0c1ff] flex items-center justify-center font-bold">
                  VG
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-[#e2e2ea] block">
                    Vinayak Grover (Founder and CEO of pixelgrove.ai)
                  </span>
                  <span className="text-[#908fa0]">
                    15-Min Technical Scope &amp; Sprint Fit • Google Meet
                  </span>
                </div>
              </div>

              <button
                type="button"
                id="booking-fill-on-your-own-btn"
                onClick={handleFillOnYourOwn}
                className="px-2.5 py-1.5 rounded-lg bg-[#4cd7f6]/15 hover:bg-[#4cd7f6]/25 border border-[#4cd7f6]/40 text-[#4cd7f6] text-[11px] font-semibold flex items-center gap-1.5 transition-all active:scale-95 shrink-0 cursor-pointer"
                title="Auto-fill booking form on your own"
              >
                <Sparkles size={12} />
                <span>⚡ Fill on your own</span>
              </button>
            </div>

            {autoFilledNotice && (
              <div className="p-2.5 rounded-lg bg-[#00885d]/20 border border-[#4edea3]/40 text-[#4edea3] text-xs flex items-center justify-between animate-in fade-in duration-150">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={13} />
                  Meeting details auto-filled!
                </span>
                <span className="text-[10px] opacity-80">Ready to confirm</span>
              </div>
            )}

            {/* Validation Error Banner */}
            {validationError && (
              <div
                id="booking-validation-error-banner"
                className="p-3 rounded-xl bg-[#93000a]/25 border border-[#ffb4ab]/50 flex items-start gap-2.5 text-xs text-[#ffb4ab] animate-in fade-in duration-150"
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-[#ffb4ab]" />
                <span className="leading-relaxed font-medium">{validationError}</span>
              </div>
            )}

            {/* Date Selector */}
            <div>
              <label className="block text-xs font-mono text-[#c7c4d7] mb-2 flex items-center gap-1.5">
                <Calendar size={14} className="text-[#4cd7f6]" /> Select Day:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {dates.map((d) => (
                  <button
                    type="button"
                    key={d.label}
                    onClick={() => setSelectedDate(d.label)}
                    className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                      selectedDate === d.label
                        ? 'bg-[#8083ff]/20 border-[#c0c1ff] text-[#c0c1ff] font-semibold shadow-[0_0_12px_rgba(192,193,255,0.25)]'
                        : 'bg-[#191c21]/80 border-[#464554]/20 text-[#908fa0] hover:bg-[#282a30]'
                    }`}
                  >
                    <span className="block text-xs font-medium">{d.label}</span>
                    <span className="block text-[10px] opacity-75">{d.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-xs font-mono text-[#c7c4d7] mb-2 flex items-center gap-1.5">
                <Clock size={14} className="text-[#4edea3]" /> Select Slot (IST / GMT / EST):
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
                {timeSlots.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`p-2 rounded-lg border text-left cursor-pointer transition-all text-xs font-mono truncate ${
                      selectedTime === t
                        ? 'bg-[#00885d]/30 border-[#4edea3] text-[#4edea3] font-semibold'
                        : 'bg-[#191c21]/80 border-[#464554]/20 text-[#908fa0] hover:bg-[#282a30]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#c7c4d7] mb-1 flex items-center justify-between">
                  <span>Your Name <span className="text-[#ffb4ab]">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  placeholder="e.g. Maya Chen"
                  className={`w-full px-3 py-2 rounded-lg text-[#e2e2ea] border outline-none text-xs transition-colors ${
                    validationError && (!clientName.trim() || clientName.trim().length < 2)
                      ? 'bg-[#93000a]/20 border-[#ffb4ab]'
                      : 'bg-[#191c21] border-[#464554]/30 focus:border-[#4cd7f6]'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs text-[#c7c4d7] mb-1 flex items-center justify-between">
                  <span>Email for Calendar Invite <span className="text-[#ffb4ab]">*</span></span>
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => {
                    setClientEmail(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  placeholder="maya@company.com"
                  className={`w-full px-3 py-2 rounded-lg text-[#e2e2ea] border outline-none text-xs transition-colors ${
                    validationError && (!validateEmailAddress(clientEmail).isValid)
                      ? 'bg-[#93000a]/20 border-[#ffb4ab]'
                      : 'bg-[#191c21] border-[#464554]/30 focus:border-[#4cd7f6]'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#8083ff] text-[#0d0096] font-bold text-sm hover:bg-[#c0c1ff] transition-all shadow-[0_0_20px_rgba(128,131,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Video size={16} />
              Confirm 15-Min Strategy Meeting
            </button>
          </form>
        ) : (
          /* Confirmation View */
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#00885d]/20 text-[#4edea3] flex items-center justify-center mx-auto border border-[#4edea3]/40 shadow-[0_0_20px_rgba(78,222,163,0.3)]">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="text-xl font-bold text-[#e2e2ea]">Meeting Confirmed!</h4>
            <p className="text-xs text-[#c7c4d7] max-w-sm mx-auto leading-relaxed">
              We have generated a Google Meet calendar invitation for{' '}
              <strong className="text-[#c0c1ff]">{clientName}</strong> ({clientEmail}) on{' '}
              <span className="text-[#4edea3] font-semibold">{selectedDate} at {selectedTime}</span>.
            </p>
            <div className="p-3 rounded-lg bg-[#0c0e13] border border-[#464554]/30 text-xs font-mono text-left space-y-1">
              <div className="text-[#c0c1ff]">REF_ID: {bookingId || 'MEET-DIRECT'}</div>
              <div className="text-[#908fa0]">LOCATION: Google Meet (calendar invite dispatched)</div>
              <div className="text-[#4cd7f6]">HOST: Vinayak Grover (Founder and CEO of pixelgrove.ai)</div>
              <div className="text-[#4edea3]">NOTIFIED: pixelgrove.ai@gmail.com</div>
            </div>
            <button
              onClick={() => {
                setIsBooked(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-lg bg-[#282a30] text-[#e2e2ea] hover:bg-[#37393f] text-xs font-semibold"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
