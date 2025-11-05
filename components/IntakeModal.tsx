import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IntakeFormData, PlanTier } from '../types';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import Card from './ui/Card';
import Field from './ui/Field';
import SelectField from './ui/SelectField';
import { PLANS, ALL_SERVICES, CALENDLY_URL, INTAKE_ENDPOINT } from '../constants';

interface IntakeModalProps {
  open: boolean;
  onClose: () => void;
  defaultPlan?: PlanTier;
}

const IntakeModal: React.FC<IntakeModalProps> = ({ open, onClose, defaultPlan }) => {
  useLockBodyScroll(open);
  const [data, setData] = useState<IntakeFormData>({
    name: "", company: "", email: "", phone: "",
    selectedPlan: defaultPlan, services: [], notes: "", consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setData((d) => ({ ...d, name: "", company: "", email: "", phone: "", notes: "", services: [], consent: false, selectedPlan: defaultPlan }));
      setIsSubmitting(false);
    }
  }, [open, defaultPlan]);

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      onClose();
    }
  }, [isSubmitting, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  const toggleService = (svc: string) => {
    setData((d) => ({
      ...d,
      services: d.services.includes(svc)
        ? d.services.filter((s) => s !== svc)
        : [...d.services, svc],
    }));
  };

  const isValid = data.name.trim() && data.email.trim() && data.phone.trim() && data.selectedPlan && data.consent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    const payload = { ...data, submittedAt: new Date().toISOString() };

    try {
      if (INTAKE_ENDPOINT) {
        await fetch(INTAKE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          mode: 'no-cors' // Common for Google Apps Script webhooks
        });
      }
      console.log("📝 VCA Intake Payload:", payload); // Log regardless
      window.dispatchEvent(new CustomEvent("vca:navigate", { detail: "thankyou" }));
      onClose();
    } catch (err) {
      alert("Submission failed. Please try again or book a call directly.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog" aria-modal="true" ref={dialogRef}
      className="fixed inset-0 bg-[#0B1B3B]/70 flex items-center justify-center p-4 z-[9999] transition-opacity duration-300 animate-[fadeIn_0.3s_ease-out]"
      onMouseDown={(e) => { if (e.target === dialogRef.current) handleClose(); }}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <Card className="w-full max-w-4xl p-0 overflow-hidden animate-[slideUp_0.4s_ease-out]">
        <style>{`@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
        <div className="bg-[#0B1B3B] text-white p-4 sm:p-5 flex justify-between items-center">
          <div>
            <h2 className="font-extrabold tracking-wide text-lg">VCA – Intake Form</h2>
            <p className="opacity-85 text-sm">Tell us about your goals. We’ll reach out right away.</p>
          </div>
          <button
            aria-label="Close" onClick={handleClose}
            className="bg-transparent border border-white/25 text-white rounded-lg p-1.5 hover:bg-white/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Full Name" required value={data.name} onChange={(v) => setData((d) => ({ ...d, name: v }))} placeholder="Your name" />
              <Field label="Company" value={data.company} onChange={(v) => setData((d) => ({ ...d, company: v }))} placeholder="Your organization" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Email" type="email" required value={data.email} onChange={(v) => setData((d) => ({ ...d, email: v }))} placeholder="you@company.com" />
              <Field label="Phone" type="tel" required value={data.phone} onChange={(v) => setData((d) => ({ ...d, phone: v }))} placeholder="(555) 123-4567" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField label="Selected Plan" options={PLANS.map((p) => p.id)} value={data.selectedPlan || ""} onChange={(v) => setData((d) => ({ ...d, selectedPlan: v as PlanTier }))} placeholder="Choose a plan" required />
              <div>
                <label className="block font-bold text-[#0B1B3B] mb-1.5 text-sm">Services of Interest</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto border border-[#E6E8EF] rounded-lg p-3 bg-[#F7F8FC]">
                  {ALL_SERVICES.map((svc) => (
                    <label key={svc} className="flex items-center gap-2 text-sm text-[#0B1B3B] cursor-pointer">
                      <input type="checkbox" checked={data.services.includes(svc)} onChange={() => toggleService(svc)} className="h-4 w-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]" />
                      {svc}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="block font-bold text-[#0B1B3B] mb-1.5 text-sm">Notes <span className="font-normal text-[#5F6B85]">(optional)</span></label>
              <textarea value={data.notes || ""} onChange={(e) => setData((d) => ({ ...d, notes: e.target.value }))} placeholder="Goals, timeline, current challenges…" rows={3} className="w-full border border-[#E6E8EF] rounded-lg p-3 text-[#0B1B3B] bg-white placeholder-[#9fa7bc] focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-shadow resize-vertical" />
            </div>
            <label className="flex items-center gap-2.5 text-[#0B1B3B] text-sm">
              <input type="checkbox" checked={data.consent} onChange={(e) => setData((d) => ({ ...d, consent: e.target.checked }))} className="h-4 w-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]" />
              I consent to be contacted about my inquiry.
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              <button type="submit" disabled={!isValid || isSubmitting} className="bg-[#D4AF37] text-[#0B1B3B] border-2 border-[#D4AF37] rounded-lg px-5 py-2.5 font-bold transition-all hover:scale-105 disabled:bg-[#dfd2a8] disabled:border-[#dfd2a8] disabled:cursor-not-allowed disabled:scale-100">
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="bg-white border-2 border-[#D4AF37] text-[#0B1B3B] rounded-lg px-5 py-2.5 font-bold no-underline transition-transform hover:scale-105">
                Book a Call Instead
              </a>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default IntakeModal;
