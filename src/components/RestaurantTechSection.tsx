import React, { useState } from 'react';
import {
  QrCode,
  Boxes,
  RefreshCw,
  TrendingUp,
  Users,
  CheckCircle2,
  Utensils,
  Wine,
  Zap,
  Beer,
  Building2,
  Sparkles,
  Calendar,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Sliders,
  ShieldCheck,
  Smartphone,
  Layers
} from 'lucide-react';
import {
  RESTAURANT_SERVICES,
  CONNECTED_LOOP_STEPS,
  INDUSTRY_PLAYBOOKS,
  OBJECTION_HANDLERS,
  SIMULATED_OPERATOR_CHATS
} from '../restaurantData';

interface RestaurantTechSectionProps {
  onBookCallClick: () => void;
  onSelectService: (serviceTitle: string) => void;
}

export const RestaurantTechSection: React.FC<RestaurantTechSectionProps> = ({
  onBookCallClick,
  onSelectService
}) => {
  // Active industry playbook tab
  const [activePlaybook, setActivePlaybook] = useState<string>('fine-dining');

  // Simulated AI Chat state
  const [selectedChatIndex, setSelectedChatIndex] = useState<number>(0);
  const [customQuery, setCustomQuery] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<
    Array<{ sender: 'operator' | 'agent'; text: string; label?: string }>
  >([
    {
      sender: 'operator',
      label: SIMULATED_OPERATOR_CHATS[0].label,
      text: SIMULATED_OPERATOR_CHATS[0].operatorQuery
    },
    {
      sender: 'agent',
      text: SIMULATED_OPERATOR_CHATS[0].agentResponse
    }
  ]);

  // Objection accordion state
  const [expandedObjection, setExpandedObjection] = useState<number | null>(0);

  const handleSelectScenario = (index: number) => {
    setSelectedChatIndex(index);
    const scenario = SIMULATED_OPERATOR_CHATS[index];
    setChatHistory([
      {
        sender: 'operator',
        label: scenario.label,
        text: scenario.operatorQuery
      },
      {
        sender: 'agent',
        text: scenario.agentResponse
      }
    ]);
  };

  const handleCustomQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    const lower = customQuery.toLowerCase();
    let reply = '';

    if (lower.includes('cost') || lower.includes('price') || lower.includes('expensive')) {
      reply =
        'Every rupee on your P&L has to pull its weight. Our model is built so the system self-funds within 60 days: eliminating recurring printing saves ₹12,000–₹28,000/month right away, while catching just 2–3% of unrecorded inventory shrinkage saves ₹15,000–₹50,000+/month on an average food spend. Would it help to run a 3-minute ROI review based on your seat count?';
    } else if (lower.includes('pos') || lower.includes('toast') || lower.includes('square') || lower.includes('clover')) {
      reply =
        'We integrate directly with Toast, Square, Clover, and Micros via two-way API synchronization. Your front-of-house staff rings up orders on your existing POS terminals as usual, while our system runs silently in the background depleting raw recipes and keeping table QR menus synced in real time.';
    } else if (lower.includes('cheap') || lower.includes('paper') || lower.includes('fine dining') || lower.includes('physical')) {
      reply =
        'Hospitality is deeply tactile, and physical touchpoints matter for your dining room ambiance. You never have to compromise: fine dining venues keep their bespoke leather dinner menus, and use discrete brushed-metal or walnut NFC/QR tokens specifically for live wine cellars, daily tasting specials, and cocktails. That protects your aesthetic while ending costly reprint cycles.';
    } else {
      reply =
        'That is an operational priority we see across modern restaurant groups. Our integrated platform bridges front-of-house guest ordering with back-of-house ingredient par levels so your kitchen and floor operate in total harmony. I can show you a live 10-minute sandbox tailored to your floor plan—would you have 15 minutes this week before dinner service?';
    }

    setChatHistory((prev) => [
      ...prev,
      { sender: 'operator', text: customQuery },
      { sender: 'agent', text: reply }
    ]);
    setCustomQuery('');
  };

  const currentPlaybookData =
    INDUSTRY_PLAYBOOKS.find((p) => p.id === activePlaybook) || INDUSTRY_PLAYBOOKS[0];

  const getPlaybookIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wine':
        return <Wine className="w-5 h-5 text-[#c0c1ff]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#4cd7f6]" />;
      case 'Beer':
        return <Beer className="w-5 h-5 text-[#4edea3]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#8083ff]" />;
      default:
        return <Utensils className="w-5 h-5 text-[#c0c1ff]" />;
    }
  };

  return (
    <section className="w-full bg-transparent py-20 lg:py-28" id="restaurant-solutions">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03b5d3]/15 border border-[#4cd7f6]/30 text-xs font-semibold text-[#4cd7f6] mb-3">
            <Sparkles size={13} className="text-[#4cd7f6]" />
            <span>Hospitality Intelligence Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e2e2ea] tracking-tight">
            Bridging Front-of-House Experience with Back-of-House Precision
          </h2>
          <p className="text-sm sm:text-base text-[#c7c4d7] mt-4 leading-relaxed">
            Eliminate fragmented software. We connect live digital table menus with automated recipe-level inventory tracking and guest CRM to create a self-synchronizing operational engine.
          </p>
        </div>

        {/* The Two Core Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {RESTAURANT_SERVICES.map((srv, idx) => {
            const isFoh = srv.tier === 'FOH';
            const accentColor = isFoh ? '#4cd7f6' : '#4edea3';
            const accentBorder = isFoh ? 'border-[#4cd7f6]/40' : 'border-[#4edea3]/40';
            const glowClass = isFoh
              ? 'hover:shadow-[0_0_35px_rgba(76,215,246,0.15)]'
              : 'hover:shadow-[0_0_35px_rgba(78,222,163,0.15)]';

            return (
              <div
                key={srv.id}
                className={`bg-[#1d2025]/75 backdrop-blur-xl border border-[#464554]/35 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${accentBorder} ${glowClass}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="px-3 py-1 rounded-md text-xs font-mono font-semibold"
                      style={{
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                        border: `1px solid ${accentColor}30`
                      }}
                    >
                      {srv.badge}
                    </span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${accentColor}15` }}
                    >
                      {isFoh ? (
                        <QrCode className="w-5 h-5" style={{ color: accentColor }} />
                      ) : (
                        <Boxes className="w-5 h-5" style={{ color: accentColor }} />
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#e2e2ea] mb-2">{srv.title}</h3>
                  <p className="text-sm text-[#c7c4d7] mb-6 leading-relaxed">{srv.subtitle}</p>

                  {/* Core Capabilities */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#908fa0]">
                      Key System Capabilities
                    </h4>
                    {srv.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#e2e2ea]">
                        <CheckCircle2
                          size={16}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: accentColor }}
                        />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pain Points Solved */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-[#464554]/25">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#908fa0]">
                      Direct Margin &amp; Floor Impact
                    </h4>
                    {srv.painPoints.map((pp, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-[#c7c4d7]">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: accentColor }} />
                        <span>{pp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Metric & Action */}
                <div className="pt-6 border-t border-[#464554]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="w-full sm:w-auto">
                    <span className="text-[11px] font-mono text-[#908fa0] block">OPERATIONAL YIELD</span>
                    <span className="text-xs sm:text-sm font-semibold text-[#e2e2ea]">
                      {srv.metrics}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectService(srv.title)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                    style={{
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                      border: `1px solid ${accentColor}40`
                    }}
                  >
                    <span>Deploy {isFoh ? 'QR Menu' : 'Inventory CRM'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Connected Loop (Integrated Synergy) */}
        <div className="bg-[#191c21]/80 backdrop-blur-xl border border-[#8083ff]/30 rounded-2xl p-6 sm:p-10 mb-16 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#464554]/30">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#8083ff] font-semibold mb-1">
                <RefreshCw size={13} className="animate-spin" style={{ animationDuration: '6s' }} />
                <span>INTEGRATED PLATFORM SYNERGY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#e2e2ea]">
                The Connected Loop: Why 1 + 1 = 3
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#c7c4d7] max-w-md">
              Standalone tools create operational silos. By pairing Front-of-House QR interactions with Back-of-House recipe tracking, your restaurant operates as an intelligent closed loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONNECTED_LOOP_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="p-5 rounded-xl bg-[#0c0e13]/70 border border-[#464554]/30 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-mono font-bold text-[#8083ff]">{step.step}</span>
                    <span className="w-2 h-2 rounded-full bg-[#4edea3]" />
                  </div>
                  <h4 className="text-base font-semibold text-[#e2e2ea] mb-2">{step.title}</h4>
                  <p className="text-xs text-[#c7c4d7] leading-relaxed mb-4">{step.description}</p>
                </div>
                <div className="pt-3 border-t border-[#464554]/20 text-[11px] font-mono text-[#4cd7f6]">
                  {step.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tailored Industry Playbooks */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs text-[#c0c1ff] uppercase tracking-widest font-semibold font-mono">
              Tailored Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#e2e2ea] mt-2">
              Engineered for Your Specific Concept Type
            </h3>
            <p className="text-xs sm:text-sm text-[#c7c4d7] mt-2">
              Whether you oversee Michelin-starred cellars or high-volume fast casual lunch rushes, the system adapts to your floor dynamics.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {INDUSTRY_PLAYBOOKS.map((p) => {
              const isActive = activePlaybook === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePlaybook(p.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#8083ff] text-[#0d0096] shadow-[0_0_18px_rgba(128,131,255,0.4)]'
                      : 'bg-[#191c21]/80 text-[#c7c4d7] hover:bg-[#282a30] hover:text-[#e2e2ea] border border-[#464554]/30'
                  }`}
                >
                  {getPlaybookIcon(p.icon)}
                  <span>{p.segment}</span>
                </button>
              );
            })}
          </div>

          {/* Active Playbook Detail Card */}
          <div className="bg-[#1d2025]/70 backdrop-blur-xl border border-[#464554]/35 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono text-[#8083ff] uppercase tracking-wider">
                    PRIMARY OPERATIONAL PAIN POINT
                  </span>
                  <p className="text-sm font-medium text-[#e2e2ea] mt-1">
                    {currentPlaybookData.primaryPainPoint}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-mono text-[#4cd7f6] uppercase tracking-wider">
                    RECOMMENDED DEPLOYMENT ANGLE
                  </span>
                  <p className="text-sm font-semibold text-[#e2e2ea] mt-1">
                    {currentPlaybookData.suggestedLeadAngle}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[#0c0e13]/60 border border-[#464554]/20">
                  <span className="text-[11px] font-mono text-[#4edea3] block uppercase tracking-wider">
                    TARGET OUTCOME METRIC
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#e2e2ea]">
                    {currentPlaybookData.keyMetric}
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#0c0e13]/70 border border-[#464554]/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-xs text-[#c0c1ff] font-mono font-semibold">
                    <Smartphone size={15} />
                    <span>REAL-WORLD FLOOR IMPLEMENTATION</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#c7c4d7] leading-relaxed mb-4">
                    "{currentPlaybookData.scenario}"
                  </p>
                </div>
                <button
                  onClick={onBookCallClick}
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#8083ff]/20 text-[#c0c1ff] hover:bg-[#8083ff] hover:text-[#0d0096] text-xs font-semibold border border-[#8083ff]/40 transition-all cursor-pointer"
                >
                  <Calendar size={14} />
                  <span>Book Concept-Specific Walkthrough</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Architecture & Operational Readiness Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Architecture & SLA Guarantees */}
          <div className="lg:col-span-6 bg-[#191c21]/80 backdrop-blur-xl border border-[#464554]/35 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#4edea3] font-semibold mb-2">
                <ShieldCheck size={14} />
                <span>ENTERPRISE PRODUCTION STANDARDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#e2e2ea] mb-2">
                Mission-Critical Hospitality Architecture
              </h3>
              <p className="text-xs sm:text-sm text-[#c7c4d7] mb-6">
                Engineered for zero-downtime dinner rushes, edge-speed QR loading, and absolute customer data sovereignty.
              </p>

              {/* Guarantees Matrix */}
              <div className="space-y-3.5 mb-6">
                <div className="p-3.5 rounded-xl bg-[#0c0e13]/70 border border-[#464554]/30 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#8083ff]/15 text-[#c0c1ff] mt-0.5 flex-shrink-0">
                    <Zap size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#e2e2ea]">Sub-120ms Edge QR Loading</h4>
                    <p className="text-xs text-[#c7c4d7] mt-0.5 leading-relaxed">
                      Instantaneous menu access via global edge CDN caching, even on congested multi-guest cellular and indoor Wi-Fi networks.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0c0e13]/70 border border-[#464554]/30 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#4edea3]/15 text-[#4edea3] mt-0.5 flex-shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#e2e2ea]">Offline-First Local POS Resiliency</h4>
                    <p className="text-xs text-[#c7c4d7] mt-0.5 leading-relaxed">
                      Automatic local caching ensures tables, orders, and KDS routing continue unhindered if restaurant internet connectivity drops.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0c0e13]/70 border border-[#464554]/30 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#4cd7f6]/15 text-[#4cd7f6] mt-0.5 flex-shrink-0">
                    <Layers size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#e2e2ea]">100% Code &amp; Data Ownership</h4>
                    <p className="text-xs text-[#c7c4d7] mt-0.5 leading-relaxed">
                      Zero vendor lock-in. Full access to database schemas, guest CRM histories, and direct POS integrations without proprietary platform tax.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Review CTA Banner */}
            <div className="p-4 rounded-xl bg-[#8083ff]/15 border border-[#8083ff]/35 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#c0c1ff] uppercase block">
                  TECHNICAL READINESS AUDIT
                </span>
                <span className="text-base sm:text-lg font-bold text-[#e2e2ea]">
                  99.99% Guaranteed SLA
                </span>
              </div>
              <button
                onClick={onBookCallClick}
                className="px-4 py-2 rounded-lg bg-[#8083ff] text-[#0d0096] text-xs font-semibold hover:bg-[#c0c1ff] transition-all cursor-pointer shadow-[0_0_12px_rgba(128,131,255,0.3)]"
              >
                Schedule Technical Review
              </button>
            </div>
          </div>

          {/* Objection Matrix */}
          <div className="lg:col-span-6 bg-[#191c21]/80 backdrop-blur-xl border border-[#464554]/35 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#c0c1ff] font-semibold mb-2">
                <ShieldCheck size={14} />
                <span>TRANSPARENT ADVISORY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#e2e2ea] mb-2">
                Operator Objection Handling Matrix
              </h3>
              <p className="text-xs sm:text-sm text-[#c7c4d7] mb-6">
                Common concerns restaurant owners raise, answered directly with operational facts.
              </p>

              <div className="space-y-3">
                {OBJECTION_HANDLERS.map((item, idx) => {
                  const isOpen = expandedObjection === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-[#464554]/30 bg-[#0c0e13]/50 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setExpandedObjection(isOpen ? null : idx)}
                        className="w-full p-3.5 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#e2e2ea] hover:bg-[#282a30]/50 cursor-pointer"
                      >
                        <span className="pr-2">"{item.objection}"</span>
                        {isOpen ? (
                          <ChevronUp size={16} className="text-[#8083ff] flex-shrink-0" />
                        ) : (
                          <ChevronDown size={16} className="text-[#908fa0] flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-3.5 pt-0 text-xs text-[#c7c4d7] leading-relaxed border-t border-[#464554]/20 bg-[#0c0e13]/80">
                          <span className="text-[10px] font-mono text-[#4cd7f6] block mb-1">
                            CATEGORY: {item.category}
                          </span>
                          <p>{item.response}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-[#464554]/30 text-xs text-[#908fa0] flex items-center justify-between">
              <span>Have a specific tech stack question?</span>
              <button
                onClick={() => {
                  const el = document.getElementById('lead-capture');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#4cd7f6] font-semibold hover:underline cursor-pointer"
              >
                Inquire Directly &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Live In-App AI Advisor Sandbox */}
        <div className="bg-[#1d2025]/90 backdrop-blur-2xl border border-[#4cd7f6]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#464554]/30">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#4cd7f6] font-semibold mb-1">
                <MessageSquare size={14} />
                <span>SYSTEM PROMPT IN ACTION • INTERACTIVE SALES AGENT SIMULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#e2e2ea]">
                Test the Restaurant Tech Solutions Advisor
              </h3>
            </div>
            <span className="text-xs text-[#908fa0]">
              Demonstrating consultative empathy, POS knowledge &amp; dynamic objection handling.
            </span>
          </div>

          {/* Scenario Selector Pills */}
          <div className="mb-4">
            <span className="text-xs font-mono text-[#908fa0] block mb-2">
              SELECT A PROSPECT PERSONA OR OBJECTION SCENARIO:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {SIMULATED_OPERATOR_CHATS.map((chat, cIdx) => (
                <button
                  key={chat.id}
                  onClick={() => handleSelectScenario(cIdx)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    selectedChatIndex === cIdx
                      ? 'bg-[#4cd7f6]/20 border-[#4cd7f6] text-[#4cd7f6] font-semibold'
                      : 'bg-[#0c0e13]/60 border-[#464554]/30 text-[#c7c4d7] hover:bg-[#282a30]'
                  }`}
                >
                  <span className="line-clamp-2">{chat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Stream Window */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#0c0e13]/90 border border-[#464554]/30 space-y-4 max-h-80 overflow-y-auto font-sans mb-4">
            {chatHistory.map((msg, mIdx) => (
              <div
                key={mIdx}
                className={`flex flex-col ${
                  msg.sender === 'operator' ? 'items-end' : 'items-start'
                }`}
              >
                <span className="text-[10px] font-mono text-[#908fa0] mb-1">
                  {msg.sender === 'operator' ? 'RESTAURANT OPERATOR / GM' : 'AI SOLUTIONS ADVISOR'}
                </span>
                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'operator'
                      ? 'bg-[#282a30] text-[#e2e2ea] border border-[#464554]/40'
                      : 'bg-[#8083ff]/15 border border-[#8083ff]/35 text-[#e2e2ea]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Question Input */}
          <form onSubmit={handleCustomQuestionSubmit} className="flex gap-2">
            <input
              type="text"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Ask an objection (e.g. 'What if we already use Toast?', 'Can we do contactless wine menus?')"
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#0c0e13] border border-[#464554]/40 text-xs sm:text-sm text-[#e2e2ea] placeholder-[#908fa0] focus:border-[#4cd7f6] outline-none transition-all"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-[#4cd7f6] text-[#00424e] font-semibold text-xs sm:text-sm hover:bg-[#03b5d3] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Test Response</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Bottom Pivot Action */}
          <div className="mt-4 pt-4 border-t border-[#464554]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-[#c7c4d7]">
              Ready to see the actual live menus and inventory tables for your venue?
            </span>
            <button
              onClick={onBookCallClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8083ff] text-[#0d0096] font-semibold hover:bg-[#c0c1ff] transition-all cursor-pointer shadow-[0_0_15px_rgba(128,131,255,0.4)]"
            >
              <Calendar size={14} />
              <span>Book 15-Min Live Sandbox Demo</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
