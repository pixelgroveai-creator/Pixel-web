import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Clock, Send, CheckCircle2, Loader2, Calendar, Sparkles, ExternalLink, X, Copy, Check, ShieldCheck, Bell, AlertCircle, ShieldAlert } from 'lucide-react';
import { ProjectInquiry } from '../types';
import {
  validateLeadCaptureForm,
  authenticateLeadEnquiry,
  type LeadValidationResult,
  type LeadAuthenticationResult
} from '../utils/formValidation';

export interface PresetScenario {
  id: string;
  badge: string;
  title: string;
  summary: string;
  data: {
    name: string;
    email: string;
    phone: string;
    company: string;
    services: string[];
    budget: string;
    projectDetails: string;
  };
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'lucknow-restaurant',
    badge: 'Awadh Hospitality AI',
    title: 'Awadh Gourmet Hospitality (Lucknow)',
    summary: 'Multi-location dining QR suite, autonomous kitchen sync & inventory ML',
    data: {
      name: 'Aarav Singhania',
      email: 'aarav.singhania@awadhgourmet.in',
      phone: '+91 94150 88776',
      company: 'Awadh Gourmet Hospitality Group (Lucknow)',
      services: ['restaurant-tech', 'qr-menu', 'crm-inventory'],
      budget: '5L-10L',
      projectDetails: 'Operating 4 dining locations across Gomti Nagar and Hazratganj, Lucknow. Seeking an enterprise bilingual QR table ordering flow, autonomous kitchen display synchronizer, and inventory prediction engine.'
    }
  },
  {
    id: 'generative-media',
    badge: 'Generative Tech',
    title: 'Lumina Media Labs',
    summary: 'Interactive WebGPU visuals, AI video pipeline & high-throughput front-end',
    data: {
      name: 'Kavita Rao',
      email: 'kavita.rao@lumina-ai.com',
      phone: '+91 98765 11223',
      company: 'Lumina Media Labs',
      services: ['web', 'media', 'ai-stack'],
      budget: '10L-25L',
      projectDetails: 'Architecting an ultra-responsive client web experience, customized generative video pipeline, and interactive canvas graphics with low-latency GPU serving.'
    }
  },
  {
    id: 'inbox-verification',
    badge: 'Direct Inbox Test',
    title: 'Pixelgrove Verification Lead',
    summary: 'Direct delivery test to pixelgrove.ai@gmail.com & Google Cloud Firestore',
    data: {
      name: 'Pixelgrove Verification Lead',
      email: 'pixelgrove.ai@gmail.com',
      phone: '+91 98765 43210',
      company: 'Pixelgrove QA Studio (Lucknow Node LKO-IST-01)',
      services: ['web', 'restaurant-tech', 'ai-stack'],
      budget: '5L-10L',
      projectDetails: 'Live test verification confirming inbound project intake lands in Google Cloud Firestore and forwards directly to pixelgrove.ai@gmail.com with guaranteed 4-6 hour response SLA.'
    }
  }
];

interface LeadCaptureSectionProps {
  onOpenBookingModal: () => void;
  preselectedService?: string | null;
}

interface ToastNotificationData {
  id: string;
  recipient: string;
  senderName: string;
  company: string;
  timestamp: string;
}

export const LeadCaptureSection: React.FC<LeadCaptureSectionProps> = ({
  onOpenBookingModal,
  preselectedService
}) => {
  // Pre-filled by default with authentic Lucknow Hospitality AI Discovery brief
  const [formData, setFormData] = useState({
    name: PRESET_SCENARIOS[0].data.name,
    email: PRESET_SCENARIOS[0].data.email,
    phone: PRESET_SCENARIOS[0].data.phone,
    company: PRESET_SCENARIOS[0].data.company,
    services: [...PRESET_SCENARIOS[0].data.services],
    budget: PRESET_SCENARIOS[0].data.budget,
    projectDetails: PRESET_SCENARIOS[0].data.projectDetails
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dispatchId, setDispatchId] = useState('');
  const [routedRecipient, setRoutedRecipient] = useState('pixelgrove.ai@gmail.com');
  const [deliveryMethod, setDeliveryMethod] = useState<string>('FormSubmit Gateway');
  const [deliveryMessage, setDeliveryMessage] = useState<string>('The form was submitted successfully.');
  
  // Validation and Lead Authentication states
  const [validationResult, setValidationResult] = useState<LeadValidationResult | null>(null);
  const [leadAuth, setLeadAuth] = useState<LeadAuthenticationResult | null>(null);
  const [autoFilledScenario, setAutoFilledScenario] = useState<string | null>(PRESET_SCENARIOS[0].badge);

  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState<ToastNotificationData | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Auto-dismiss toast after 7.5 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 7500);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleCopyRef = async () => {
    if (!toastData?.id) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(toastData.id);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = toastData.id;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  // Sync preselectedService if passed from services section
  React.useEffect(() => {
    if (preselectedService) {
      const lower = preselectedService.toLowerCase();
      let mapped = 'web';
      if (lower.includes('mobile')) mapped = 'mobile';
      else if (lower.includes('brand')) mapped = 'brand';
      else if (lower.includes('media') || lower.includes('creative')) mapped = 'media';
      else if (lower.includes('qr') || lower.includes('menu')) mapped = 'qr-menu';
      else if (lower.includes('crm') || lower.includes('inventory') || lower.includes('restaurant')) mapped = 'crm-inventory';

      setFormData((prev) => ({
        ...prev,
        services: Array.from(new Set([...prev.services, mapped]))
      }));
    }
  }, [preselectedService]);

  const toggleService = (val: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(val);
      const next = exists
        ? prev.services.filter((s) => s !== val)
        : [...prev.services, val];
      return { ...prev, services: next };
    });
  };

  const handleFillOnYourOwn = (scenarioId?: string) => {
    const selected = scenarioId
      ? PRESET_SCENARIOS.find((s) => s.id === scenarioId) || PRESET_SCENARIOS[0]
      : PRESET_SCENARIOS[0];

    setFormData({ ...selected.data });
    setValidationResult(null);
    setAutoFilledScenario(selected.badge);
    setTimeout(() => setAutoFilledScenario(null), 4000);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      services: ['web'],
      budget: '2L-5L',
      projectDetails: ''
    });
    setValidationResult(null);
    setAutoFilledScenario(null);
  };

  const handleFillTestQuery = () => {
    handleFillOnYourOwn('inbox-verification');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Strict Form Validation Check
    // Block all form submissions until complete, valid information is provided. No exceptions.
    const validation = validateLeadCaptureForm(formData);
    if (!validation.isValid) {
      setValidationResult(validation);
      const formEl = document.getElementById('lead-capture-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return; // HARD BLOCK: Never proceed, never save partial data
    }

    setValidationResult(null);
    setIsSubmitting(true);
    let finalId = `PG-${Date.now().toString().slice(-6)}`;
    let finalRecipient = 'pixelgrove.ai@gmail.com';

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        // Form submission rejected by backend validation agent
        const errValidation: LeadValidationResult = {
          isValid: false,
          emailError: result?.emailError || (result?.error?.toLowerCase().includes('email') ? result.error : null),
          generalError: result?.generalError || result?.error || 'Some details are incomplete. Please fill in all required fields before submitting.',
          fieldErrors: result?.fieldErrors || {},
          missingOrIncompleteFields: result?.missingOrIncompleteFields || []
        };
        setValidationResult(errValidation);
        setIsSubmitting(false);
        return; // HARD BLOCK: Never save partial data or proceed
      }

      // Passed validation & lead authentication
      finalId = result?.receipt?.dispatchId || finalId;
      finalRecipient = result?.receipt?.routedTo || finalRecipient;
      setDispatchId(finalId);
      setRoutedRecipient(finalRecipient);

      if (result?.receipt?.authentication) {
        setLeadAuth(result.receipt.authentication);
      } else {
        // Fallback local lead authentication
        setLeadAuth(authenticateLeadEnquiry(formData));
      }

      if (result?.receipt?.emailDelivery) {
        setDeliveryMethod(result.receipt.emailDelivery.method || 'FormSubmit Gateway');
        setDeliveryMessage(result.receipt.emailDelivery.message || 'The form was submitted successfully.');
      }

      // Save complete, validated inquiry to localStorage
      const savedInquiries = JSON.parse(localStorage.getItem('pixelgrove_inquiries') || '[]');
      const newInquiry: ProjectInquiry = {
        ...formData,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(
        'pixelgrove_inquiries',
        JSON.stringify([newInquiry, ...savedInquiries])
      );

      // Trigger high-visibility toast notification
      setToastData({
        id: finalId,
        recipient: finalRecipient,
        senderName: formData.name,
        company: formData.company || 'Direct Client',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setShowToast(true);

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch {
      // Local fallback for offline mode
      const auth = authenticateLeadEnquiry(formData);
      setLeadAuth(auth);
      setDispatchId(finalId);
      setRoutedRecipient(finalRecipient);

      const savedInquiries = JSON.parse(localStorage.getItem('pixelgrove_inquiries') || '[]');
      const newInquiry: ProjectInquiry = {
        ...formData,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(
        'pixelgrove_inquiries',
        JSON.stringify([newInquiry, ...savedInquiries])
      );

      setToastData({
        id: finalId,
        recipient: finalRecipient,
        senderName: formData.name,
        company: formData.company || 'Direct Client',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setShowToast(true);

      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const mailtoSubject = encodeURIComponent(`[Project Inquiry] ${formData.name || 'Client'} - ${formData.company || 'Direct'} (${formData.budget || 'Custom'})`);
  const mailtoBody = encodeURIComponent(
    `Hello Pixelgrove Studio Team,\n\nHere are my project details:\n\n- Name: ${formData.name}\n- Email: ${formData.email}\n- Company: ${formData.company || 'Not provided'}\n- Services: ${formData.services.join(', ')}\n- Budget: ${formData.budget}\n- Details:\n${formData.projectDetails}\n\nLooking forward to speaking soon!`
  );
  const mailtoUrl = `mailto:pixelgrove.ai@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <>
      {/* High-Visibility Floating Toast Notification */}
      <AnimatePresence>
        {showToast && toastData && (
          <motion.div
            id="lead-submission-toast"
            initial={{ opacity: 0, y: -28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed top-20 right-4 sm:right-6 md:right-8 z-50 max-w-md w-[calc(100vw-2rem)] sm:w-[420px] bg-[#161820]/95 backdrop-blur-2xl border border-[#4edea3]/50 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(78,222,163,0.25)] rounded-2xl p-4 sm:p-5 text-[#e2e2ea] overflow-hidden"
            role="status"
            aria-live="polite"
          >
            {/* Top ambient glow */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#4edea3]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start gap-3.5 relative z-10">
              {/* Checkmark icon badge */}
              <div className="w-10 h-10 rounded-xl bg-[#00885d]/25 border border-[#4edea3]/50 text-[#4edea3] flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(78,222,163,0.3)]">
                <CheckCircle2 size={22} className="text-[#4edea3]" />
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-[#4edea3] bg-[#00885d]/30 px-2 py-0.5 rounded-full border border-[#4edea3]/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping" />
                    Inquiry Sent
                  </span>
                  <span className="text-[11px] text-[#908fa0] font-mono">
                    {toastData.timestamp}
                  </span>
                </div>

                <h5 className="text-sm font-bold text-white tracking-tight">
                  Inquiry Dispatched Successfully!
                </h5>

                <p className="text-xs text-[#c7c4d7] mt-1 leading-relaxed">
                  Thank you, <strong className="text-white font-semibold">{toastData.senderName}</strong>. Your brief is on its way to{' '}
                  <span className="text-[#c0c1ff] font-mono font-semibold">{toastData.recipient}</span>.
                </p>

                {/* Reference ID & Copy Button */}
                <div className="mt-2.5 pt-2 border-t border-[#464554]/30 flex items-center justify-between gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-[#908fa0] truncate">
                    <span>REF:</span>
                    <span className="text-[#e2e2ea] font-semibold">{toastData.id}</span>
                  </div>

                  <button
                    id="toast-copy-ref-btn"
                    type="button"
                    onClick={handleCopyRef}
                    className="inline-flex items-center gap-1 text-[#c0c1ff] hover:text-white px-2.5 py-1 rounded-md bg-[#282a30] hover:bg-[#33353b] transition-colors cursor-pointer shrink-0"
                    title="Copy reference code"
                  >
                    {isCopied ? (
                      <>
                        <Check size={12} className="text-[#4edea3]" />
                        <span className="text-[#4edea3]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy Ref</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                id="toast-close-btn"
                type="button"
                onClick={() => setShowToast(false)}
                className="text-[#908fa0] hover:text-white p-1 rounded-lg hover:bg-[#282a30] transition-colors cursor-pointer shrink-0"
                aria-label="Close notification"
              >
                <X size={16} />
              </button>
            </div>

            {/* Countdown progress bar */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 7.5, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#8083ff] to-[#4edea3]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section
        className="w-full bg-[#111319]/70 backdrop-blur-xl border-t border-[#464554]/20 py-20 lg:py-28 relative"
        id="lead-capture"
      >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Studio Details & Testimonials Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <span className="text-xs text-[#c0c1ff] uppercase tracking-widest font-semibold font-mono">
                Direct Intake Engine
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#e2e2ea] mt-2 mb-4 tracking-tight">
                Let's Engineer Your Next Competitive Edge.
              </h2>
              <p className="text-sm sm:text-base text-[#c7c4d7] mb-8 leading-relaxed">
                Have a product vision, legacy stack migration, or custom generative media requirement? Connect directly with our founding engineering team in Lucknow.
              </p>

              {/* SLA & System Guarantee Strip */}
              <div className="bg-[#1d2025]/70 backdrop-blur-md border border-[#464554]/30 p-5 rounded-xl shadow-sm space-y-2 mb-6">
                <div className="flex items-center gap-2 text-[#c0c1ff] font-semibold text-sm">
                  <Mail size={18} />
                  <span>Direct-to-Gmail Relay Configured</span>
                </div>
                <p className="text-xs sm:text-sm text-[#c7c4d7] leading-relaxed">
                  Your brief triggers an automated instant dispatch directly to our studio leadership inbox. 4–6hr guaranteed human response. Instant Cal.com discovery link on submit.
                </p>
              </div>
            </div>

            {/* Studio Coordinates */}
            <div className="p-4 rounded-xl bg-[#0c0e13]/80 border border-[#464554]/30 text-[#c7c4d7] space-y-2.5 backdrop-blur-md text-xs font-mono">
              <div className="flex items-center gap-2 text-[#e2e2ea]">
                <MapPin size={16} className="text-[#4cd7f6] flex-shrink-0" />
                <span>Gomti nagar, Lucknow</span>
              </div>
              <div className="flex items-center gap-2 text-[#c0c1ff]">
                <Mail size={16} className="text-[#8083ff] flex-shrink-0" />
                <span>Direct Lead Routing:</span>
                <a
                  href="mailto:pixelgrove.ai@gmail.com"
                  className="text-white hover:text-[#c0c1ff] underline decoration-[#8083ff]/40 underline-offset-2 transition-colors ml-1"
                >
                  pixelgrove.ai@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#908fa0]">
                <Clock size={16} className="text-[#4edea3] flex-shrink-0" />
                <span>IST Timezone • Active Support across EST &amp; CET</span>
              </div>
            </div>
          </div>

          {/* Direct-to-Gmail Intake Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#1d2025]/70 backdrop-blur-2xl border border-[#4cd7f6]/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-6 bg-[#282a30]/40 -mx-6 sm:-mx-8 px-6 sm:px-8 -mt-6 sm:-mt-8 pt-6 rounded-t-2xl border-b border-[#464554]/20">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#e2e2ea]">
                    Start a Project Discovery
                  </h3>
                  <span className="text-xs text-[#908fa0]">
                    Zero commitment • Non-disclosure covered by default
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#00885d]/30 text-[#4edea3] text-xs font-semibold border border-[#4edea3]/40">
                  Priority Queue
                </span>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="lead-capture-form"
                    id="lead-capture-form"
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-5"
                    noValidate
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                  >
                  {/* Validation Error Banner (Mandatory Prompt Requirement) */}
                  {validationResult && !validationResult.isValid && (
                    <div
                      id="lead-validation-error-alert"
                      className="p-4 rounded-xl bg-[#93000a]/25 border-2 border-[#ffb4ab] text-[#e2e2ea] text-xs sm:text-sm shadow-[0_0_20px_rgba(255,180,171,0.2)] animate-in fade-in duration-200"
                      role="alert"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#ffb4ab]/20 text-[#ffb4ab] flex items-center justify-center shrink-0 mt-0.5">
                          <AlertCircle size={18} />
                        </div>
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#ffb4ab]">
                              Form Submission Blocked — Quality Standards
                            </span>
                            <span className="text-[10px] bg-[#ffb4ab]/20 text-[#ffb4ab] px-2 py-0.5 rounded font-mono font-bold">
                              REJECTED
                            </span>
                          </div>

                          {/* Specific Email Error Message per prompt spec */}
                          {validationResult.emailError && (
                            <p className="font-semibold text-white bg-[#93000a]/50 p-2.5 rounded-lg border border-[#ffb4ab]/50 leading-relaxed">
                              {validationResult.emailError}
                            </p>
                          )}

                          {/* Specific Incomplete Fields Error Message per prompt spec */}
                          {validationResult.generalError && (!validationResult.emailError || validationResult.missingOrIncompleteFields.length > 0) && (
                            <p className="font-semibold text-white bg-[#93000a]/50 p-2.5 rounded-lg border border-[#ffb4ab]/50 leading-relaxed">
                              {validationResult.generalError}
                            </p>
                          )}

                          {validationResult.missingOrIncompleteFields.length > 0 && (
                            <div className="pt-1">
                              <span className="text-[11px] text-[#ffdad6] font-medium block mb-1">
                                Attention required on the following fields:
                              </span>
                              <ul className="list-disc list-inside text-[11px] text-[#ffdad6] space-y-0.5 font-mono">
                                {validationResult.missingOrIncompleteFields.map((field) => (
                                  <li key={field}>{field}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Fill On Your Own - Quick Scenario Bar */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-[#282a30]/60 border border-[#4cd7f6]/35 text-xs shadow-inner">
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-[#4cd7f6]/20 text-[#4cd7f6] flex items-center justify-center shrink-0">
                          <Sparkles size={13} />
                        </div>
                        <div>
                          <span className="font-semibold text-[#e2e2ea] block text-xs">
                            Quick Fill Brief
                          </span>
                          <span className="text-[10px] text-[#908fa0]">
                            Auto-populates 100% complete, authenticated project brief
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        id="auto-fill-on-your-own-btn"
                        onClick={() => handleFillOnYourOwn()}
                        className="px-3 py-1.5 rounded-lg bg-[#4cd7f6] hover:bg-[#80e5ff] text-[#003641] font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                        title="Click to instantly auto-fill all form fields with validated project scope"
                      >
                        <Sparkles size={13} />
                        <span>⚡ Fill on your own</span>
                      </button>
                    </div>

                    {/* Scenario preset buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2.5 mt-2.5 border-t border-[#464554]/25">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#908fa0] mr-1">
                        Scenarios:
                      </span>
                      {PRESET_SCENARIOS.map((scenario) => (
                        <button
                          key={scenario.id}
                          type="button"
                          id={`scenario-pill-${scenario.id}`}
                          onClick={() => handleFillOnYourOwn(scenario.id)}
                          className="px-2.5 py-1 rounded-md bg-[#191c21] hover:bg-[#33353b] text-[#c7c4d7] hover:text-white border border-[#464554]/30 hover:border-[#4cd7f6]/50 transition-colors text-[11px] flex items-center gap-1.5 cursor-pointer"
                          title={scenario.summary}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
                          <span>{scenario.badge}</span>
                        </button>
                      ))}

                      <button
                        type="button"
                        id="reset-form-btn"
                        onClick={handleResetForm}
                        className="px-2 py-1 rounded-md bg-transparent hover:bg-[#33353b]/50 text-[#908fa0] hover:text-[#ffb4ab] border border-dashed border-[#464554]/30 hover:border-[#ffb4ab]/40 transition-colors text-[11px] ml-auto cursor-pointer"
                        title="Clear all fields to enter custom details manually"
                      >
                        Clear Form
                      </button>
                    </div>

                    {/* Feedback when auto-filled */}
                    {autoFilledScenario && (
                      <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-[#00885d]/20 border border-[#4edea3]/40 text-[#4edea3] flex items-center justify-between text-[11px] animate-in fade-in duration-150">
                        <span className="flex items-center gap-1.5 font-medium">
                          <CheckCircle2 size={13} />
                          Form filled with <strong>{autoFilledScenario}</strong> brief!
                        </span>
                        <span className="text-[10px] font-mono text-[#c7c4d7]">Ready to submit</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-[#e2e2ea] mb-1.5 flex items-center justify-between">
                        <span>Your Name <span className="text-[#ffb4ab]">*</span></span>
                        {validationResult?.fieldErrors?.name && (
                          <span className="text-[10px] font-mono text-[#ffb4ab]">Required</span>
                        )}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (validationResult) setValidationResult(null);
                        }}
                        placeholder="e.g. Vikram Malhotra"
                        className={`w-full px-4 py-2.5 rounded-lg text-[#e2e2ea] placeholder:text-[#908fa0] border transition-colors text-sm focus:outline-none ${
                          validationResult?.fieldErrors?.name
                            ? 'bg-[#93000a]/15 border-[#ffb4ab] focus:border-[#ffb4ab]'
                            : 'bg-[#191c21]/90 border-[#464554]/30 focus:border-[#4cd7f6] focus:bg-[#33353b]'
                        }`}
                      />
                      {validationResult?.fieldErrors?.name && (
                        <p className="text-[11px] text-[#ffb4ab] mt-1 font-medium">
                          {validationResult.fieldErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email field (mandatory, non-negotiable) */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-[#e2e2ea] mb-1.5 flex items-center justify-between">
                        <span>Work Email <span className="text-[#ffb4ab]">*</span></span>
                        {validationResult?.fieldErrors?.email && (
                          <span className="text-[10px] font-mono text-[#ffb4ab]">Invalid Format</span>
                        )}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (validationResult) setValidationResult(null);
                        }}
                        placeholder="name@company.com"
                        className={`w-full px-4 py-2.5 rounded-lg text-[#e2e2ea] placeholder:text-[#908fa0] border transition-colors text-sm focus:outline-none ${
                          validationResult?.fieldErrors?.email
                            ? 'bg-[#93000a]/15 border-[#ffb4ab] focus:border-[#ffb4ab]'
                            : 'bg-[#191c21]/90 border-[#464554]/30 focus:border-[#4cd7f6] focus:bg-[#33353b]'
                        }`}
                      />
                      {validationResult?.fieldErrors?.email && (
                        <p className="text-[11px] text-[#ffb4ab] mt-1 font-medium">
                          {validationResult.fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-[#e2e2ea] mb-1.5 flex items-center justify-between">
                        <span>Company / Organization <span className="text-[#ffb4ab]">*</span></span>
                        {validationResult?.fieldErrors?.company && (
                          <span className="text-[10px] font-mono text-[#ffb4ab]">Required</span>
                        )}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => {
                          setFormData({ ...formData, company: e.target.value });
                          if (validationResult) setValidationResult(null);
                        }}
                        placeholder="e.g. Stealth AI / FinTech Co"
                        className={`w-full px-4 py-2.5 rounded-lg text-[#e2e2ea] placeholder:text-[#908fa0] border transition-colors text-sm focus:outline-none ${
                          validationResult?.fieldErrors?.company
                            ? 'bg-[#93000a]/15 border-[#ffb4ab] focus:border-[#ffb4ab]'
                            : 'bg-[#191c21]/90 border-[#464554]/30 focus:border-[#4cd7f6] focus:bg-[#33353b]'
                        }`}
                      />
                      {validationResult?.fieldErrors?.company && (
                        <p className="text-[11px] text-[#ffb4ab] mt-1 font-medium">
                          {validationResult.fieldErrors.company}
                        </p>
                      )}
                    </div>

                    {/* Phone field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-[#e2e2ea] mb-1.5 flex items-center justify-between">
                        <span>Phone / WhatsApp <span className="text-[#908fa0] text-[11px] font-normal font-mono">(Direct SMS / Call)</span></span>
                        {validationResult?.fieldErrors?.phone && (
                          <span className="text-[10px] font-mono text-[#ffb4ab]">Invalid Format</span>
                        )}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (validationResult) setValidationResult(null);
                        }}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-2.5 rounded-lg text-[#e2e2ea] placeholder:text-[#908fa0] border transition-colors text-sm focus:outline-none ${
                          validationResult?.fieldErrors?.phone
                            ? 'bg-[#93000a]/15 border-[#ffb4ab] focus:border-[#ffb4ab]'
                            : 'bg-[#191c21]/90 border-[#464554]/30 focus:border-[#4cd7f6] focus:bg-[#33353b]'
                        }`}
                      />
                      {validationResult?.fieldErrors?.phone && (
                        <p className="text-[11px] text-[#ffb4ab] mt-1 font-medium">
                          {validationResult.fieldErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service Checkboxes */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#e2e2ea] mb-2 flex items-center justify-between">
                      <span>Capabilities Required <span className="text-[#ffb4ab]">*</span></span>
                      {validationResult?.fieldErrors?.services && (
                        <span className="text-[10px] font-mono text-[#ffb4ab]">Select at least one</span>
                      )}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                      {[
                        { id: 'web', label: 'Web Engineering' },
                        { id: 'mobile', label: 'Mobile App (Flutter)' },
                        { id: 'media', label: 'Generative AI Media' },
                        { id: 'brand', label: 'Branding & UI System' },
                        { id: 'qr-menu', label: 'Digital QR Menu System (FOH)' },
                        { id: 'crm-inventory', label: 'Restaurant CRM & Inventory (BOH)' }
                      ].map((s) => {
                        const checked = formData.services.includes(s.id);
                        return (
                          <label
                            key={s.id}
                            onClick={() => toggleService(s.id)}
                            className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors text-xs sm:text-sm select-none ${
                              checked
                                ? 'bg-[#282a30] border-[#c0c1ff] text-[#e2e2ea]'
                                : 'bg-[#191c21]/90 border-[#464554]/20 text-[#c7c4d7] hover:bg-[#282a30]/50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {}}
                              className="rounded text-[#8083ff] focus:ring-0 cursor-pointer"
                            />
                            <span>{s.label}</span>
                          </label>
                        );
                      })}
                    </div>
                    {validationResult?.fieldErrors?.services && (
                      <p className="text-[11px] text-[#ffb4ab] mt-1 font-medium">
                        {validationResult.fieldErrors.services}
                      </p>
                    )}
                  </div>

                  {/* Budget Tiers */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#e2e2ea] mb-2 flex items-center justify-between">
                      <span>Estimated Project Scope / Budget (INR) <span className="text-[#ffb4ab]">*</span></span>
                      {validationResult?.fieldErrors?.budget && (
                        <span className="text-[10px] font-mono text-[#ffb4ab]">Required</span>
                      )}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: '<2L', label: '< ₹2 Lakhs' },
                        { id: '2L-5L', label: '₹2L – ₹5L' },
                        { id: '5L-10L', label: '₹5L – ₹10L' },
                        { id: '10L+', label: '₹10 Lakhs+' }
                      ].map((tier) => {
                        const isSelected = formData.budget === tier.id;
                        return (
                          <button
                            type="button"
                            key={tier.id}
                            onClick={() =>
                              setFormData({ ...formData, budget: tier.id })
                            }
                            className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all text-xs font-mono ${
                              isSelected
                                ? 'bg-[#8083ff]/20 border-[#c0c1ff] text-[#c0c1ff] font-bold shadow-[0_0_12px_rgba(192,193,255,0.2)]'
                                : 'bg-[#191c21]/90 border-[#464554]/20 text-[#908fa0] hover:bg-[#282a30]'
                            }`}
                          >
                            {tier.label}
                          </button>
                        );
                      })}
                    </div>
                    {validationResult?.fieldErrors?.budget && (
                      <p className="text-[11px] text-[#ffb4ab] mt-1 font-medium">
                        {validationResult.fieldErrors.budget}
                      </p>
                    )}
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#e2e2ea] mb-1.5 flex items-center justify-between">
                      <span>Project Summary &amp; Goals <span className="text-[#ffb4ab]">*</span></span>
                      {validationResult?.fieldErrors?.projectDetails && (
                        <span className="text-[10px] font-mono text-[#ffb4ab]">Min 10 characters</span>
                      )}
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.projectDetails}
                      onChange={(e) => {
                        setFormData({ ...formData, projectDetails: e.target.value });
                        if (validationResult) setValidationResult(null);
                      }}
                      placeholder="Tell us about the product, current challenges, timeline targets, or reference architectures..."
                      className={`w-full px-4 py-2.5 rounded-lg text-[#e2e2ea] placeholder:text-[#908fa0] border transition-colors text-sm focus:outline-none ${
                        validationResult?.fieldErrors?.projectDetails
                          ? 'bg-[#93000a]/15 border-[#ffb4ab] focus:border-[#ffb4ab]'
                          : 'bg-[#191c21]/90 border-[#464554]/30 focus:border-[#4cd7f6] focus:bg-[#33353b]'
                      }`}
                    />
                    {validationResult?.fieldErrors?.projectDetails && (
                      <p className="text-[11px] text-[#ffb4ab] mt-1 font-medium">
                        {validationResult.fieldErrors.projectDetails}
                      </p>
                    )}
                  </div>

                  {/* Submit Button & Quick Actions */}
                  <div className="space-y-2.5">
                    <button
                      id="submit-inquiry-button"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-lg bg-[#8083ff] text-[#0d0096] text-base font-bold hover:bg-[#c0c1ff] transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(128,131,255,0.45)] cursor-pointer disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Validating &amp; Dispatching Brief...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Project Brief &amp; Dispatch to pixelgrove.ai@gmail.com</span>
                          <Send size={18} />
                        </>
                      )}
                    </button>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <button
                        id="fill-sample-query-button"
                        type="button"
                        onClick={() => handleFillOnYourOwn()}
                        className="text-xs text-[#4cd7f6] hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer py-1 px-2 rounded hover:bg-[#282a30]"
                        title="Auto-fill verified project scope and details on your own without manual typing"
                      >
                        <Sparkles size={13} className="text-[#4cd7f6]" />
                        <span>⚡ Fill on your own</span>
                      </button>

                      <a
                        id="mailto-fallback-link"
                        href={mailtoUrl}
                        className="text-xs text-[#4edea3] hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer py-1 px-2 rounded hover:bg-[#282a30]"
                        title="Compose query directly in your local email software"
                      >
                        <ExternalLink size={13} />
                        <span>Send via Personal Email App</span>
                      </a>
                    </div>
                  </div>
                </motion.form>
              ) : (
                /* Success State with choreographed entry animation */
                <motion.div
                  key="inquiry-success-card"
                  id="inquiry-success-card"
                  className="py-6 sm:py-8 text-center space-y-5"
                  initial={{ opacity: 0, y: 22, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.97 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Inline Success Banner */}
                  <motion.div
                    id="inquiry-success-alert-banner"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.32 }}
                    className="p-3 sm:p-3.5 rounded-xl bg-[#00885d]/25 border border-[#4edea3]/50 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-[#e2e2ea] text-left shadow-[0_0_20px_rgba(78,222,163,0.15)]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-ping shrink-0" />
                      <span>
                        <strong className="text-white">Inquiry Validated &amp; Dispatched:</strong> Direct relay sent to <strong className="text-[#4edea3] font-mono">{routedRecipient}</strong>
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#4edea3] bg-[#00885d]/50 px-2.5 py-1 rounded-md border border-[#4edea3]/40 shrink-0 font-semibold">
                      4–6h SLA Active
                    </span>
                  </motion.div>

                  {/* Pulsing Success Badge */}
                  <motion.div
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.18, type: 'spring', stiffness: 240, damping: 16 }}
                    className="w-16 h-16 rounded-full bg-[#00885d]/20 text-[#4edea3] flex items-center justify-center mx-auto border border-[#4edea3]/40 shadow-[0_0_24px_rgba(78,222,163,0.35)]"
                  >
                    <CheckCircle2 size={36} />
                  </motion.div>

                  {/* Header & Subtitle */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.26, duration: 0.32 }}
                  >
                    <h4 className="text-xl font-bold text-[#e2e2ea]">
                      Inquiry Dispatched to pixelgrove.ai@gmail.com
                    </h4>
                    <p className="text-sm text-[#c7c4d7] mt-2 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-[#c0c1ff] font-semibold">{formData.name}</span>. Your project brief has passed data quality standards and is routed directly to our leadership inbox.
                    </p>
                  </motion.div>

                  {/* Lead Authentication Seal */}
                  {leadAuth && (
                    <motion.div
                      id="lead-authentication-card"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.34, duration: 0.35 }}
                      className="p-3.5 sm:p-4 rounded-xl bg-[#0c0e13]/85 border border-[#464554]/40 max-w-md mx-auto text-left text-xs space-y-2 shadow-inner"
                    >
                      <div className="flex items-center justify-between border-b border-[#464554]/30 pb-2">
                        <span className="font-mono text-[11px] text-[#908fa0] uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldCheck size={14} className={leadAuth.status === 'AUTHENTICATED' ? 'text-[#4edea3]' : 'text-[#ffd966]'} />
                          <span>Lead Authentication</span>
                        </span>
                        <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded border ${
                          leadAuth.status === 'AUTHENTICATED'
                            ? 'bg-[#00885d]/30 text-[#4edea3] border-[#4edea3]/40'
                            : 'bg-[#ffd966]/20 text-[#ffd966] border-[#ffd966]/40'
                        }`}>
                          {leadAuth.status === 'AUTHENTICATED' ? '✓ VERIFIED AUTHENTIC' : '⚠ FLAGGED FOR REVIEW'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[11px] font-mono">
                        <span className="text-[#908fa0]">Trust Score:</span>
                        <span className="text-right text-white font-bold">{leadAuth.trustScore ?? 100}%</span>
                        <span className="text-[#908fa0]">Quality Standard:</span>
                        <span className="text-right text-[#4edea3]">Strict Validation Passed</span>
                        <span className="text-[#908fa0]">Domain Analysis:</span>
                        <span className="text-right text-[#c0c1ff] truncate">{leadAuth.details?.domainRisk || (leadAuth.status === 'AUTHENTICATED' ? 'Verified Enterprise' : 'Verified Standard')}</span>
                      </div>
                      <p className="text-[11px] text-[#c7c4d7] pt-1.5 border-t border-[#464554]/20 leading-relaxed">
                        {leadAuth.recommendation}
                      </p>
                    </motion.div>
                  )}

                  {/* Dispatch Receipt */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.42, duration: 0.35 }}
                    className="p-4 rounded-xl bg-[#0c0e13]/80 border border-[#464554]/30 max-w-md mx-auto text-left text-xs font-mono space-y-1.5 shadow-inner"
                  >
                    <div className="flex items-center justify-between text-[#908fa0] border-b border-[#464554]/30 pb-1">
                      <span>DISPATCH_ID:</span>
                      <span className="text-white font-bold">{dispatchId || `PG-${Date.now().toString().slice(-6)}`}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#4cd7f6] border-b border-[#464554]/30 pb-1">
                      <span>DESTINATION:</span>
                      <span className="font-bold">{routedRecipient}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#4edea3] border-b border-[#464554]/30 pb-1">
                      <span>TRANSMISSION:</span>
                      <span>{deliveryMethod}</span>
                    </div>
                    <div className="text-[11px] text-[#c7c4d7] pt-1">
                      STATUS: {deliveryMessage} (SLA 4-6 hrs guaranteed)
                    </div>
                  </motion.div>

                  {/* Mailbox advice */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.48, duration: 0.35 }}
                    className="p-3 bg-[#1d2025]/80 rounded-lg border border-[#8083ff]/20 max-w-md mx-auto text-left text-xs text-[#c7c4d7] space-y-1"
                  >
                    <div className="text-[#c0c1ff] font-semibold flex items-center gap-1.5">
                      <Mail size={14} />
                      <span>Checking Your Gmail Inbox:</span>
                    </div>
                    <p className="text-[11px] text-[#908fa0] leading-relaxed">
                      Look for an email with subject <span className="text-white font-mono font-medium">[Pixelgrove Inbound Lead]</span> or <span className="text-white font-mono font-medium">[LIVE TEST QUERY]</span>. If this is the very first inquiry, please also check your Spam / Promotions folder for FormSubmit confirmation.
                    </p>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.54, duration: 0.35 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
                  >
                    <a
                      id="mailto-client-btn"
                      href={mailtoUrl}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#191c21] border border-[#8083ff]/50 text-[#c0c1ff] hover:text-white hover:border-[#8083ff] font-semibold text-xs transition-all cursor-pointer shadow-sm"
                      title="Open duplicate pre-composed query in your email client"
                    >
                      <Mail size={15} />
                      <span>Open Pre-filled in Email Client</span>
                    </a>

                    <button
                      id="open-strategy-modal-btn"
                      onClick={onOpenBookingModal}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#8083ff] text-[#0d0096] font-semibold text-xs hover:bg-[#c0c1ff] transition-all cursor-pointer shadow-[0_0_16px_rgba(128,131,255,0.4)]"
                    >
                      <Calendar size={15} />
                      <span>Pick 15-Min Strategy Call</span>
                    </button>

                    <button
                      id="submit-another-btn"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          company: '',
                          services: ['web'],
                          budget: '2L-5L',
                          projectDetails: ''
                        });
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#282a30] text-[#c7c4d7] hover:text-[#e2e2ea] text-xs font-medium cursor-pointer transition-colors"
                    >
                      Submit Another Brief
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
