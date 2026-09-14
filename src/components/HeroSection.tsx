import React, { useState, useEffect } from 'react';
import {
  Calendar,
  ArrowDown,
  CheckCircle2,
  Zap,
  Terminal,
  Activity,
  ArrowRight,
  Play,
  Pause,
  RotateCw
} from 'lucide-react';

interface HeroSectionProps {
  onBookCallClick: () => void;
  onInitiateBriefClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookCallClick,
  onInitiateBriefClick
}) => {
  // Real-time terminal log simulator
  const [logs, setLogs] = useState<Array<{ time: string; text: string; color: string }>>([
    {
      time: '20:44:12',
      text: 'Synaptic core initialized: 380 neural clusters, additive blending active.',
      color: 'text-[#4cd7f6]'
    },
    {
      time: '20:44:13',
      text: 'Direct-to-Gmail routing protocol verified. Cal.com hook primed.',
      color: 'text-[#4edea3]'
    },
    {
      time: '20:44:14',
      text: 'Ready for high-velocity full-stack & generative media deployments.',
      color: 'text-[#c0c1ff]'
    }
  ]);

  const [isLogLive, setIsLogLive] = useState(true);

  useEffect(() => {
    if (!isLogLive) return;

    const extraEvents = [
      'Next.js 15 server action warmed on Vercel edge node (BOM1 Mumbai).',
      'LoRA checkpoint v4.2 fine-tuned with 99.4% style consistency.',
      'BLE packet buffer synchronized across iOS test flight build 2.8.4.',
      'Automated Figma design token compilation: 420 variables exported.',
      'Headless ComfyUI GPU cluster rendered batch #1480 (8k photoreal).',
      'Security audit passed: 0 vulnerabilities, CSP headers enforced.'
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const randomEvent = extraEvents[Math.floor(Math.random() * extraEvents.length)];

      setLogs((prev) => {
        const next = [...prev, { time: timeStr, text: randomEvent, color: 'text-[#c7c4d7]' }];
        if (next.length > 5) return next.slice(next.length - 5);
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isLogLive]);

  return (
    <section className="relative w-full overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Ambient Radial Glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-[#8083ff]/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute -top-24 right-10 w-96 h-96 bg-[#03b5d3]/10 blur-[110px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#6366f1]/15 blur-[140px] rounded-full" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text & Actions Column */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            {/* Cyber Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#282a30]/80 backdrop-blur-md shadow-md border border-[#464554]/30">
              <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping" />
              <span className="text-[11px] uppercase tracking-wider text-[#4cd7f6] font-semibold">
                ⚡ NEXT-GEN DIGITAL STUDIO — MERGING CODE WITH GENERATIVE AI
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#e2e2ea] tracking-tight leading-[1.12] max-w-2xl">
              We Build Scalable Digital Products &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c0c1ff] via-[#4cd7f6] to-[#4edea3]">
                AI Media
              </span>{' '}
              That Drive Revenue.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#c7c4d7] leading-relaxed max-w-xl">
              From high-performance web applications and Flutter mobile apps to synthetic AI brand visuals and intelligent automation pipelines. Transforming ambitious brands in India, US, and EMEA.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full pt-1">
              <button
                onClick={onBookCallClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#8083ff] text-[#0d0096] text-base font-semibold hover:bg-[#c0c1ff] transition-all duration-200 shadow-[0_0_24px_rgba(128,131,255,0.4)] hover:shadow-[0_0_32px_rgba(192,193,255,0.6)] cursor-pointer"
              >
                <span>Book Free Strategy Call (15-Min)</span>
                <Calendar size={18} />
              </button>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#282a30]/80 backdrop-blur-md text-[#e2e2ea] text-base font-medium hover:bg-[#37393f] transition-colors shadow-sm border border-[#464554]/40"
              >
                <span>Explore Capabilities &amp; Stack</span>
                <ArrowDown size={18} />
              </a>
            </div>

            {/* Meta Guarantees & Modern AI Platforms */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-[#c7c4d7] text-sm">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={18} className="text-[#4edea3]" />
                <span className="font-medium">100% IP &amp; Code Ownership</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={18} className="text-[#4cd7f6]" />
                <span className="font-medium">Sprint Velocity 2-4 Wks</span>
              </div>
            </div>

            {/* Quick Modern AI Stack Trust Strip */}
            <div className="pt-4 border-t border-[#464554]/25">
              <span className="text-[11px] font-mono text-[#908fa0] uppercase tracking-wider block mb-2">
                PRODUCTION INTEGRATED MODERN AI PLATFORMS:
              </span>
              <a
                href="#ai-stack"
                className="inline-flex flex-wrap items-center gap-2 group cursor-pointer"
                title="Explore our Modern AI Foundation Tooling"
              >
                {['Google AI Studio', 'Claude 3.7', 'Microsoft Copilot', 'OpenAI o3', 'Midjourney v6.1'].map((name, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#191c21]/90 text-[#c7c4d7] border border-[#464554]/40 group-hover:border-[#8083ff]/60 group-hover:text-white transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8083ff]"></span>
                    {name}
                  </span>
                ))}
                <span className="text-xs text-[#8083ff] group-hover:text-[#c0c1ff] font-semibold inline-flex items-center gap-0.5 ml-1 transition-colors font-mono">
                  +4 More &gt;
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Tech Glassmorphism Neural Orchestrator HUD */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-[#1d2025]/60 backdrop-blur-2xl border border-[#4cd7f6]/30 rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_40px_rgba(76,215,246,0.15)] relative overflow-hidden group">
              {/* Top HUD Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#464554]/30">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4cd7f6]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3]" />
                  <span className="font-mono text-xs sm:text-sm text-[#e2e2ea] ml-1 font-semibold tracking-wide">
                    AI SYNAPTIC ORCHESTRATOR // HUD-v4.2
                  </span>
                </div>
              </div>

              {/* Real-time Synaptic Pipeline Feed */}
              <div className="space-y-4 mb-4">
                {/* Metric HUD Cards */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-[#0c0e13]/80 border border-[#464554]/30 backdrop-blur-md">
                    <span className="text-[10px] uppercase tracking-wider text-[#908fa0] block font-mono">
                      Synaptic Nodes
                    </span>
                    <span className="font-mono text-[#4cd7f6] font-bold text-sm sm:text-base">
                      380+ Active
                    </span>
                    <span className="text-[10px] text-[#4edea3] block mt-0.5">
                      ↑ 99.98% sync
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0c0e13]/80 border border-[#464554]/30 backdrop-blur-md">
                    <span className="text-[10px] uppercase tracking-wider text-[#908fa0] block font-mono">
                      Axon Latency
                    </span>
                    <span className="font-mono text-[#4edea3] font-bold text-sm sm:text-base">
                      1.4ms P99
                    </span>
                    <span className="text-[10px] text-[#908fa0] block mt-0.5 font-mono">
                      DEL-IST node
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0c0e13]/80 border border-[#464554]/30 backdrop-blur-md">
                    <span className="text-[10px] uppercase tracking-wider text-[#908fa0] block font-mono">
                      Sprint Velocity
                    </span>
                    <span className="font-mono text-[#c0c1ff] font-bold text-sm sm:text-base">
                      3.2x Realized
                    </span>
                    <span className="text-[10px] text-[#c0c1ff] block mt-0.5">
                      Zero bloat
                    </span>
                  </div>
                </div>

                {/* Live Pipeline Workflows in Flight */}
                <div className="p-4 rounded-xl bg-[#0c0e13]/70 border border-[#c0c1ff]/20 backdrop-blur-md space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#e2e2ea] font-semibold">
                      <Activity size={14} className="text-[#c0c1ff]" /> Active Engineering Workstreams
                    </span>
                    <span className="font-mono text-[#4cd7f6] text-[11px]">4 Pods Deploying</span>
                  </div>

                  {/* Pod 1 */}
                  <div className="p-2.5 rounded-lg bg-[#1d2025]/70 border border-[#464554]/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#c0c1ff] animate-pulse" />
                      <span className="font-mono text-xs text-[#e2e2ea]">
                        Next.js 15 Edge App (SaaS Portal)
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#8083ff]/20 text-[#c0c1ff] font-mono text-[11px]">
                      Sprint 2 • 88%
                    </span>
                  </div>

                  {/* Pod 2 */}
                  <div className="p-2.5 rounded-lg bg-[#1d2025]/70 border border-[#464554]/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
                      <span className="font-mono text-xs text-[#e2e2ea]">
                        Flutter Mobile (iOS + Android BLE)
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#03b5d3]/20 text-[#4cd7f6] font-mono text-[11px]">
                      Deploy Ready
                    </span>
                  </div>

                  {/* Pod 3 */}
                  <div className="p-2.5 rounded-lg bg-[#1d2025]/70 border border-[#464554]/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
                      <span className="font-mono text-xs text-[#e2e2ea]">
                        ComfyUI Headless Synthetic Ad Pipeline
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#00885d]/20 text-[#4edea3] font-mono text-[11px]">
                      2.4K assets / hr
                    </span>
                  </div>
                </div>

                {/* Live Output Console Stream */}
                <div className="p-3 rounded-xl bg-[#0c0e13]/90 border border-[#464554]/30 font-mono text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[#908fa0] text-[11px] pb-1 border-b border-[#464554]/20">
                    <span className="flex items-center gap-1.5">
                      <Terminal size={12} /> TERMINAL LOG STREAM
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#4edea3]">WEBSOCKET_CONNECTED</span>
                      <button
                        onClick={() => setIsLogLive(!isLogLive)}
                        className="text-[#908fa0] hover:text-[#e2e2ea] cursor-pointer"
                        title={isLogLive ? 'Pause Stream' : 'Resume Stream'}
                      >
                        {isLogLive ? <Pause size={10} /> : <Play size={10} />}
                      </button>
                    </div>
                  </div>
                  <div className="text-[#c7c4d7] font-mono text-[11px] leading-relaxed space-y-1 max-h-24 overflow-y-auto">
                    {logs.map((log, idx) => (
                      <p key={idx} className="transition-opacity duration-300">
                        <span className="text-[#4edea3]">[{log.time}]</span>{' '}
                        <span className="text-[#4cd7f6]">&gt;</span>{' '}
                        <span className={log.color}>{log.text}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Terminal Footer CTA Strip */}
              <div className="flex items-center justify-between pt-2 border-t border-[#464554]/30 text-xs">
                <div className="flex items-center gap-2 text-[#c7c4d7] font-mono">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping" />
                  <span>DISCOVERY QUEUE: OPEN</span>
                </div>
                <button
                  onClick={onInitiateBriefClick}
                  className="inline-flex items-center gap-1 text-[#c0c1ff] font-semibold hover:text-[#4cd7f6] transition-colors cursor-pointer"
                >
                  <span>Initiate Brief</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
