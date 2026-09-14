import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, CheckCircle2, Cpu, Shield, Zap, Terminal } from 'lucide-react';

interface AiPlatform {
  id: string;
  name: string;
  provider: string;
  category: 'foundation' | 'multimodal' | 'enterprise' | 'code';
  categoryLabel: string;
  description: string;
  accentColor: string;
  badge: string;
  capabilities: string[];
  status: string;
  logoSvg: React.ReactNode;
}

const AI_PLATFORMS: AiPlatform[] = [
  {
    id: 'google-ai-studio',
    name: 'Google AI Studio',
    provider: 'Google DeepMind',
    category: 'foundation',
    categoryLabel: 'Foundation & Multimodal',
    description:
      'Native enterprise deployment of Gemini 2.5 Pro & Flash. Deep integration of 1M+ token context windows, structured JSON schema outputs, and live multimodal audio/video streaming APIs.',
    accentColor: '#4285F4',
    badge: 'Gemini 2.5 Architecture',
    capabilities: ['1M+ Token Context', 'Live Audio/Video API', 'Grounding with Google Search', 'Structured JSON Output'],
    status: 'PRODUCTION CERTIFIED',
    logoSvg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="35%" stopColor="#9B72CB" />
            <stop offset="70%" stopColor="#D96570" />
            <stop offset="100%" stopColor="#1A73E8" />
          </linearGradient>
        </defs>
        <path
          d="M12 1.5C12 7.299 7.299 12 1.5 12C7.299 12 12 16.701 12 22.5C12 16.701 16.701 12 22.5 12C16.701 12 12 7.299 12 1.5Z"
          fill="url(#geminiGrad)"
        />
        <circle cx="19" cy="5" r="2" fill="#4285F4" opacity="0.8" />
        <circle cx="5" cy="19" r="1.5" fill="#9B72CB" opacity="0.7" />
      </svg>
    )
  },
  {
    id: 'claude',
    name: 'Claude',
    provider: 'Anthropic',
    category: 'foundation',
    categoryLabel: 'Advanced Reasoning & Code',
    description:
      'Enterprise orchestrations utilizing Claude 3.7 Sonnet & Opus with hybrid extended thinking. Powering complex code generation, autonomous desktop computer use, and architectural document reasoning.',
    accentColor: '#D97757',
    badge: 'Claude 3.7 Hybrid Reasoning',
    capabilities: ['Extended Thinking Tokens', 'Computer Use Automation', 'Precise Tool Use', 'Constitutional AI Safety'],
    status: 'ENTERPRISE TIER',
    logoSvg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.2 2.5L14.7 6.4L18.7 5.1L17.5 9.1L21.5 10.6L18.4 13.4L20.8 16.8L16.8 17L17 21.2L13.2 19.3L11.7 23.2L9.3 19.7L5.5 21.5L6.4 17.5L2.5 16.2L5.4 13.3L2.8 9.9L6.8 9.7L6.6 5.5L10.4 7.4L13.2 2.5Z"
          fill="#D97757"
        />
        <circle cx="12" cy="12" r="3.2" fill="#111319" />
      </svg>
    )
  },
  {
    id: 'microsoft-copilot',
    name: 'Microsoft Copilot',
    provider: 'Microsoft & Azure AI',
    category: 'enterprise',
    categoryLabel: 'Enterprise Intelligence',
    description:
      'Turnkey custom Copilot Studio agent implementations and Azure OpenAI enterprise private infrastructure. Seamless integration with Microsoft 365 graphs, SharePoint knowledge bases, and Teams.',
    accentColor: '#0078D4',
    badge: 'Copilot Studio & Azure OpenAI',
    capabilities: ['Private Tenant Azure Hosting', 'SharePoint/M365 Semantic Graph', 'Enterprise Role-Based Access', 'Zero Data Egress'],
    status: 'SOC-2 CERTIFIED',
    logoSvg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="copilotG1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0078D4" />
            <stop offset="100%" stopColor="#5C2D91" />
          </linearGradient>
          <linearGradient id="copilotG2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#107C41" />
            <stop offset="100%" stopColor="#0078D4" />
          </linearGradient>
        </defs>
        <path
          d="M5.5 8C5.5 5.51472 7.51472 3.5 10 3.5H14C16.4853 3.5 18.5 5.51472 18.5 8V10H15V8C15 7.44772 14.5523 7 14 7H10C9.44772 7 9 7.44772 9 8V10.5C9 11.8807 10.1193 13 11.5 13H15.5C18.2614 13 20.5 15.2386 20.5 18C20.5 20.7614 18.2614 23 15.5 23H10C6.96243 23 4.5 20.5376 4.5 17.5V12.5C4.5 10.0147 6.51472 8 9 8"
          stroke="url(#copilotG1)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle cx="15.5" cy="18" r="2.2" fill="url(#copilotG2)" />
      </svg>
    )
  },
  {
    id: 'openai',
    name: 'OpenAI',
    provider: 'OpenAI Platform',
    category: 'foundation',
    categoryLabel: 'Agentic Tool Calling & Realtime',
    description:
      'High-throughput deployment of o3-mini and GPT-4o models. Specializing in autonomous multi-step function calling, WebSockets Realtime Voice API, and fine-tuned embeddings for vector search.',
    accentColor: '#10A37F',
    badge: 'o3-mini & GPT-4o Engine',
    capabilities: ['Autonomous Tool Calling', 'Realtime WebSockets Voice', 'Vector Store Text Embeddings', 'Batch Processing Engine'],
    status: 'TIER 5 LATENCY',
    logoSvg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.5 10.2C20.1 7.8 18.2 6 15.8 6C15.4 6 15 6.1 14.6 6.3C13.8 4.6 12 3.5 10 3.5C7.4 3.5 5.3 5.3 4.8 7.8C4.5 8 4.2 8.3 3.9 8.7C2.7 10.4 2.8 12.8 4 14.4C3.8 15 3.8 15.6 4 16.2C4.7 18.4 6.8 20 9.2 20C9.6 20 10.1 19.9 10.5 19.7C11.3 21.4 13.1 22.5 15.1 22.5C17.7 22.5 19.8 20.7 20.3 18.2C21.4 16.4 21.4 13.9 20.5 10.2Z"
          stroke="#10A37F"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M12 7.5V12L15.5 14M8.5 10L12 12L8.5 14"
          stroke="#10A37F"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    provider: 'Midjourney Research',
    category: 'multimodal',
    categoryLabel: 'Generative Media & Art Direction',
    description:
      'Ultra-high fidelity generative visual production pipelines using Midjourney v6.1. Scaled programmatic asset synthesis for commercial advertising, packaging design, and visual art direction.',
    accentColor: '#908fa0',
    badge: 'v6.1 Visual Pipeline',
    capabilities: ['8K Commercial Rendering', 'Consistent Character Seeds', 'Style Reference Weights', 'Photorealistic Lighting Physics'],
    status: 'ACTIVE PIPELINE',
    logoSvg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2L4 16L12 14L20 16L12 2Z"
          fill="#c0c1ff"
        />
        <path
          d="M4 18L12 22L20 18L12 16L4 18Z"
          fill="#8083ff"
        />
      </svg>
    )
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    provider: 'Perplexity Enterprise',
    category: 'enterprise',
    categoryLabel: 'Real-Time Web Grounding',
    description:
      'Sonar Reasoning and Perplexity Pro API integrations delivering hallucination-resistant knowledge synthesis with live web indexing, cited academic sources, and corporate research automation.',
    accentColor: '#20B2AA',
    badge: 'Sonar Reasoning & Web RAG',
    capabilities: ['Live Internet Grounding', 'Zero-Hallucination Cited Outputs', 'Enterprise Deep Search', 'Finance & Technical Research'],
    status: 'ENTERPRISE API',
    logoSvg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 3V21M3 12H21M6 6L18 18M18 6L6 18"
          stroke="#20B2AA"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="3" fill="#111319" stroke="#20B2AA" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    provider: 'Open Source Ecosystem',
    category: 'foundation',
    categoryLabel: 'Open Weights & Local Inference',
    description:
      'Deployment of top-ranking open weights: DeepSeek-R1, Llama 3.3, and Qwen 2.5. Custom quantization (vLLM, Ollama), fine-tuned LoRA adaptors, and private dedicated inference endpoints.',
    accentColor: '#FFD21E',
    badge: 'DeepSeek-R1 & Llama 3.3',
    capabilities: ['vLLM Distributed Serving', 'Private Dedicated Clusters', 'Quantized Edge Inference', 'Custom LoRA Adaptors'],
    status: 'OPEN WEIGHTS',
    logoSvg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9.5" fill="#FFD21E" />
        <circle cx="9" cy="10" r="1.5" fill="#111319" />
        <circle cx="15" cy="10" r="1.5" fill="#111319" />
        <path
          d="M8.5 14.5C9.5 16 14.5 16 15.5 14.5"
          stroke="#111319"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M4.5 13C3.5 13.5 3 15 3.5 16C4.5 18 6 18 7 17.5"
          stroke="#111319"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M19.5 13C20.5 13.5 21 15 20.5 16C19.5 18 18 18 17 17.5"
          stroke="#111319"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    )
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    provider: 'Mistral AI (Europe)',
    category: 'foundation',
    categoryLabel: 'Sovereign & Edge Models',
    description:
      'Sovereign enterprise compliance architectures running Mistral Large 2, Codestral, and Pixtral. Designed for privacy-first European and Indian cross-border regulatory compliance.',
    accentColor: '#FF7000',
    badge: 'Mistral Large 2 & Codestral',
    capabilities: ['European Data Sovereignty', 'Codestral High-Speed Autocomplete', 'Function Calling & JSON Spec', 'Low Memory Footprint'],
    status: 'SOVEREIGN COMPLIANT',
    logoSvg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="5" height="5" fill="#FF7000" />
        <rect x="16" y="3" width="5" height="5" fill="#FF7000" />
        <rect x="3" y="8" width="5" height="5" fill="#FF7000" />
        <rect x="9.5" y="8" width="5" height="5" fill="#FF7000" />
        <rect x="16" y="8" width="5" height="5" fill="#FF7000" />
        <rect x="3" y="13" width="5" height="5" fill="#FF7000" />
        <rect x="16" y="13" width="5" height="5" fill="#FF7000" />
      </svg>
    )
  },
  {
    id: 'cursor',
    name: 'Cursor AI',
    provider: 'Anysphere',
    category: 'code',
    categoryLabel: 'Autonomous Engineering',
    description:
      'High-velocity autonomous engineering squads operating with AI agent IDE workflows, automated code linting, dynamic multi-file diffing, and zero-defect deployment pipelines.',
    accentColor: '#8083ff',
    badge: 'Agentic IDE Workflows',
    capabilities: ['Multi-file Surgical Edits', 'Continuous Test Verification', 'Autonomous Spec Execution', 'High Velocity Shipping'],
    status: 'CORE TOOLCHAIN',
    logoSvg: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2L20.5 7V17L12 22L3.5 17V7L12 2Z"
          stroke="#8083ff"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M12 2V12L20.5 17M12 12L3.5 17"
          stroke="#c0c1ff"
          strokeWidth="2"
        />
      </svg>
    )
  }
];

interface AiEcosystemSectionProps {
  onSelectPlatform?: (platformName: string) => void;
}

export const AiEcosystemSection: React.FC<AiEcosystemSectionProps> = ({ onSelectPlatform }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePlatformId, setActivePlatformId] = useState<string>('google-ai-studio');

  const filteredPlatforms =
    selectedCategory === 'all'
      ? AI_PLATFORMS
      : AI_PLATFORMS.filter((p) => p.category === selectedCategory);

  const activePlatform =
    AI_PLATFORMS.find((p) => p.id === activePlatformId) || AI_PLATFORMS[0];

  return (
    <section
      id="ai-stack"
      className="w-full bg-[#0c0e13] relative py-20 lg:py-28 border-t border-[#464554]/25 overflow-hidden"
    >
      {/* Subtle Glow Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-[radial-gradient(ellipse_at_center,rgba(128,131,255,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8083ff]/15 border border-[#8083ff]/30 text-xs font-mono text-[#c0c1ff] mb-4">
              <Sparkles size={13} className="text-[#8083ff]" />
              <span>FOUNDATION AI ECOSYSTEM &amp; TOOLING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#e2e2ea] tracking-tight">
              Engineered With Modern AI Tools
            </h2>
            <p className="text-sm sm:text-base text-[#c7c4d7] mt-3 max-w-2xl leading-relaxed">
              We architect production web systems, autonomous agent workflows, and generative media by orchestrating market-leading foundation models into high-availability enterprise stacks.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Platforms (9)' },
              { id: 'foundation', label: 'Foundation LLMs' },
              { id: 'enterprise', label: 'Enterprise & RAG' },
              { id: 'multimodal', label: 'Vision & Media' },
              { id: 'code', label: 'Autonomous Code' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#8083ff] text-[#0d0096] shadow-[0_0_12px_rgba(128,131,255,0.4)]'
                    : 'bg-[#191c21] text-[#c7c4d7] hover:bg-[#282a30] hover:text-[#e2e2ea] border border-[#464554]/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Logo Marquee Strip for Instant Visual Credibility */}
        <div className="mb-12 p-4 sm:p-6 rounded-2xl bg-[#111319]/85 backdrop-blur-xl border border-[#464554]/30 shadow-xl">
          <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#464554]/20">
            <span className="text-xs font-mono text-[#908fa0] uppercase tracking-wider">
              VERIFIED MODERN AI INTEGRATION LOGOS
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
              <span className="text-[11px] font-mono text-[#4edea3]">LIVE MULTI-MODEL ROUTER ACTIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
            {AI_PLATFORMS.map((platform) => {
              const isSelected = platform.id === activePlatformId;
              return (
                <button
                  key={platform.id}
                  onClick={() => setActivePlatformId(platform.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 cursor-pointer group ${
                    isSelected
                      ? 'bg-[#282a30] border-[#8083ff] shadow-[0_0_16px_rgba(128,131,255,0.3)] scale-105'
                      : 'bg-[#191c21]/80 border-[#464554]/30 hover:border-[#8083ff]/60 hover:bg-[#20232a]'
                  }`}
                  title={`${platform.name} (${platform.provider})`}
                >
                  <div className="transition-transform duration-200 group-hover:scale-110 mb-2">
                    {platform.logoSvg}
                  </div>
                  <span className="text-xs font-bold text-[#e2e2ea] text-center leading-tight truncate w-full">
                    {platform.name}
                  </span>
                  <span className="text-[10px] text-[#908fa0] truncate w-full text-center">
                    {platform.provider.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Inspection Bento: Left Active Showcase, Right Platform Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Tool Deep-Dive Spotlight Card */}
          <div className="lg:col-span-5 bg-[#191c21]/90 backdrop-blur-xl border border-[#8083ff]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(ellipse_at_top_right,rgba(128,131,255,0.25)_0%,transparent_70%)] pointer-events-none" />

            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#0c0e13] border border-[#464554]/40 shadow-inner">
                  {activePlatform.logoSvg}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#e2e2ea] leading-tight">
                    {activePlatform.name}
                  </h3>
                  <span className="text-xs font-mono text-[#c0c1ff]">
                    {activePlatform.provider}
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#4edea3]/15 text-[#4edea3] border border-[#4edea3]/30">
                {activePlatform.status}
              </span>
            </div>

            <div className="inline-block px-3 py-1 rounded-md bg-[#8083ff]/15 border border-[#8083ff]/30 text-xs font-mono text-[#c0c1ff] mb-4">
              {activePlatform.badge}
            </div>

            <p className="text-xs sm:text-sm text-[#c7c4d7] leading-relaxed mb-6">
              {activePlatform.description}
            </p>

            {/* Core Architectural Capabilities */}
            <div className="space-y-2.5 mb-6 pt-4 border-t border-[#464554]/25">
              <span className="text-xs font-mono text-[#908fa0] uppercase tracking-wider block">
                PRODUCTION INTEGRATION CAPABILITIES:
              </span>
              {activePlatform.capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-[#e2e2ea]">
                  <CheckCircle2 size={14} className="text-[#4edea3] flex-shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-[#464554]/25 flex items-center justify-between gap-3">
              <button
                onClick={() => onSelectPlatform && onSelectPlatform(`${activePlatform.name} Stack`)}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#8083ff] text-[#0d0096] text-xs sm:text-sm font-semibold hover:bg-[#c0c1ff] transition-all cursor-pointer shadow-[0_0_16px_rgba(128,131,255,0.4)]"
              >
                <span>Deploy {activePlatform.name} in Your Stack</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          {/* Grid of All Modern AI Tools */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPlatforms.map((tool) => {
              const isSelected = tool.id === activePlatformId;
              return (
                <div
                  key={tool.id}
                  onClick={() => setActivePlatformId(tool.id)}
                  className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#20232a] border-[#8083ff] shadow-[0_0_16px_rgba(128,131,255,0.2)]'
                      : 'bg-[#191c21]/70 border-[#464554]/30 hover:border-[#8083ff]/50 hover:bg-[#1d2026]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#0c0e13] border border-[#464554]/30">
                        {tool.logoSvg}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#e2e2ea] leading-snug">
                          {tool.name}
                        </h4>
                        <span className="text-[11px] text-[#908fa0] font-mono">
                          {tool.provider}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#282a30] text-[#c7c4d7] border border-[#464554]/30 whitespace-nowrap">
                      {tool.categoryLabel.split(' ')[0]}
                    </span>
                  </div>

                  <p className="text-xs text-[#c7c4d7] line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#464554]/20 font-mono">
                    <span className="text-[#4cd7f6]">{tool.badge.split(' ')[0]} {tool.badge.split(' ')[1]}</span>
                    <span className="text-[#8083ff] hover:text-[#c0c1ff] inline-flex items-center gap-1 font-semibold">
                      Inspect
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
