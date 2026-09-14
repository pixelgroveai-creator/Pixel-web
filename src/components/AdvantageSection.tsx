import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export const AdvantageSection: React.FC = () => {
  return (
    <section className="w-full bg-transparent py-20 lg:py-28" id="advantage">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs text-[#c0c1ff] uppercase tracking-widest font-semibold font-mono">
            Paradigm Shift
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e2e2ea] mt-2 tracking-tight">
            Why Modern High-Growth Teams Pick pixelgrove.ai
          </h2>
          <p className="text-sm sm:text-base text-[#c7c4d7] mt-3 leading-relaxed">
            Traditional digital agencies are bogged down with bloated headcount and manual billing cycles. We run lean, AI-augmented engineering squads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Legacy Agency Column */}
          <div className="bg-[#191c21]/70 backdrop-blur-xl border border-[#464554]/30 p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 bg-[#0c0e13]/50 -mx-6 sm:-mx-8 px-6 sm:px-8 -mt-6 sm:-mt-8 pt-6 rounded-t-2xl border-b border-[#464554]/20">
                <span className="text-base sm:text-lg text-[#908fa0] font-semibold">
                  Traditional Agencies
                </span>
                <span className="px-2.5 py-1 rounded bg-[#93000a] text-[#ffdad6] text-xs font-semibold">
                  Slow &amp; Outdated
                </span>
              </div>

              <div className="space-y-6 text-[#c7c4d7]">
                <div className="flex items-start gap-3.5">
                  <X size={20} className="text-[#ffb4ab] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#e2e2ea] font-semibold block text-sm sm:text-base">
                      8–16 Weeks Initial Delivery:
                    </strong>
                    <p className="text-xs sm:text-sm text-[#908fa0] mt-1">
                      Layered account executives, slow handoffs, and endless scope meetings before code is committed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <X size={20} className="text-[#ffb4ab] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#e2e2ea] font-semibold block text-sm sm:text-base">
                      Heavy Media Production Retainers:
                    </strong>
                    <p className="text-xs sm:text-sm text-[#908fa0] mt-1">
                      Thousands spent on photographer equipment, manual shoots, and studio rentals for simple variants.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <X size={20} className="text-[#ffb4ab] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#e2e2ea] font-semibold block text-sm sm:text-base">
                      Fragmented Vendors:
                    </strong>
                    <p className="text-xs sm:text-sm text-[#908fa0] mt-1">
                      Dev studio for app, design shop for Figma, media house for visuals. Zero technical cohesion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <X size={20} className="text-[#ffb4ab] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#e2e2ea] font-semibold block text-sm sm:text-base">
                      Rigid Milestone Billing:
                    </strong>
                    <p className="text-xs sm:text-sm text-[#908fa0] mt-1">
                      Change requests penalized with heavy fees and sluggish turnaround time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 bg-[#0c0e13]/40 rounded-xl p-3 text-center font-mono text-xs text-[#908fa0] border border-[#464554]/20">
              RESULT: High Burn, Delayed ROI, Outdated Output
            </div>
          </div>

          {/* pixelgrove.ai Squads Column */}
          <div className="bg-[#1d2025]/70 backdrop-blur-xl border border-[#4cd7f6]/30 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 bg-[#8083ff]/20 rounded-full blur-3xl" />

            <div>
              <div className="flex items-center justify-between mb-8 pb-4 bg-[#282a30]/60 -mx-6 sm:-mx-8 px-6 sm:px-8 -mt-6 sm:-mt-8 pt-6 rounded-t-2xl border-b border-[#464554]/30">
                <span className="text-base sm:text-lg text-[#c0c1ff] font-bold">
                  pixelgrove.ai Squads
                </span>
                <span className="px-2.5 py-1 rounded bg-[#00885d] text-[#000703] text-xs font-semibold">
                  2-4 Wk Sprints
                </span>
              </div>

              <div className="space-y-6 text-[#e2e2ea]">
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 size={20} className="text-[#4edea3] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#e2e2ea] font-semibold block text-sm sm:text-base">
                      2–4 Week Full Deployments:
                    </strong>
                    <p className="text-xs sm:text-sm text-[#c7c4d7] mt-1">
                      Generative prototyping, real-time code scaffolds, and dedicated tech leads driving daily velocity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <CheckCircle2 size={20} className="text-[#4edea3] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#e2e2ea] font-semibold block text-sm sm:text-base">
                      AI Creative Engine (70% Cost Slash):
                    </strong>
                    <p className="text-xs sm:text-sm text-[#c7c4d7] mt-1">
                      Custom SDXL LoRAs and ComfyUI pipelines output unlimited localized creative with zero physical shoots.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <CheckCircle2 size={20} className="text-[#4edea3] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#e2e2ea] font-semibold block text-sm sm:text-base">
                      Single Unified Studio Partner:
                    </strong>
                    <p className="text-xs sm:text-sm text-[#c7c4d7] mt-1">
                      Full-stack web, Flutter mobile, brand tokens, and automated marketing media orchestrated under one roof.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <CheckCircle2 size={20} className="text-[#4edea3] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#e2e2ea] font-semibold block text-sm sm:text-base">
                      Direct Tech Access &amp; Slack/Teams Channel:
                    </strong>
                    <p className="text-xs sm:text-sm text-[#c7c4d7] mt-1">
                      Direct line to senior developers and AI researchers with 4-hour guaranteed SLA.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 bg-[#00885d]/20 rounded-xl p-3 text-center font-mono text-xs text-[#4edea3] font-semibold border border-[#4edea3]/30">
              RESULT: 3.2x Velocity, Instant Market Traction, Zero Bloat
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
