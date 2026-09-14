import React, { useState, useMemo } from 'react';
import {
  Layers,
  Sparkles,
  ExternalLink,
  Cpu,
  Search,
  CheckCircle2,
  SlidersHorizontal,
  Zap,
  Shield,
  Code2,
  Video,
  Image as ImageIcon,
  MessageSquareCode,
  Mic,
  BrainCircuit,
  X,
  ArrowRight
} from 'lucide-react';

export type StackCategory =
  | 'all'
  | 'text-to-image'
  | 'video-generation'
  | 'code-tools'
  | 'llm'
  | 'voice-audio'
  | 'reasoning';

export interface StackModelItem {
  id: string;
  name: string;
  creator: string;
  category: 'text-to-image' | 'video-generation' | 'code-tools' | 'llm' | 'voice-audio' | 'reasoning';
  categoryLabel: string;
  tagline: string;
  description: string;
  marketStatus: 'Active Commercial API' | 'Production GA' | 'Enterprise Ready' | 'Open Weights' | 'Active SaaS';
  accentColor: string;
  glowColor: string;
  keyCapabilities: string[];
  benchmarks: string;
  activeSince: string;
  apiAvailability: boolean;
  logo: React.ReactNode;
}

const STACK_ITEMS: StackModelItem[] = [
  // ==========================================
  // 1. TEXT-TO-IMAGE MODELS
  // ==========================================
  {
    id: 'midjourney',
    name: 'Midjourney',
    creator: 'Midjourney Inc.',
    category: 'text-to-image',
    categoryLabel: 'Text-to-Image Models',
    tagline: 'World benchmark for artistic coherence, photorealism, and texture richness.',
    description: 'v6.1 & v7 image generation engine delivering cinematic lighting, accurate anatomy, coherent text rendering, and high-frequency photographic fidelity.',
    marketStatus: 'Active SaaS',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    keyCapabilities: ['Photorealistic 4K Render', 'Artistic Coherence', 'Style Reference Tuning', 'Vary Region (Inpainting)'],
    benchmarks: 'Top-ranked human aesthetic preference (94.2%)',
    activeSince: 'v6.1 (Active 2026)',
    apiAvailability: false,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="#38bdf8" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 10.5C9.5 8.5 14.5 8.5 16 10.5M7 14C9 16.5 15 16.5 17 14" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2.2" fill="#38bdf8" />
      </svg>
    )
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    creator: 'Stability AI',
    category: 'text-to-image',
    categoryLabel: 'Text-to-Image Models',
    tagline: 'Leading open-weights generative diffusion architecture for custom enterprise fine-tuning.',
    description: 'Stable Diffusion 3.5 Large and SDXL models featuring Multimodal Diffusion Transformer (MMDiT) architectures with uncompromised local on-premise execution.',
    marketStatus: 'Open Weights',
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    keyCapabilities: ['MMDiT Architecture', 'Local LoRA Fine-Tuning', 'Commercial License Rights', 'ControlNet Precision'],
    benchmarks: '8B parameter MMDiT with state-of-the-art prompt fidelity',
    activeSince: 'SD 3.5 Large (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="#a855f7" strokeWidth="1.8" strokeDasharray="3 2" />
        <circle cx="12" cy="12" r="5" fill="#a855f7" opacity="0.3" />
        <path d="M12 3V7M12 17V21M3 12H7M17 12H21" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'flux-1',
    name: 'FLUX.1',
    creator: 'Black Forest Labs',
    category: 'text-to-image',
    categoryLabel: 'Text-to-Image Models',
    tagline: 'Frontier 12B parameter hybrid flow-matching transformer for unparalleled prompt adherence.',
    description: 'Engineered by the original Stable Diffusion inventors. FLUX.1 [schnell], [dev], and [pro] set a new global gold standard for complex typography, human hands, and anatomical accuracy.',
    marketStatus: 'Active Commercial API',
    accentColor: '#ffb347',
    glowColor: 'rgba(255, 179, 71, 0.35)',
    keyCapabilities: ['12B Flow Transformer', 'Zero-shot Text Rendering', 'Extreme Prompt Fidelity', 'Photographic Dynamic Range'],
    benchmarks: '#1 Artificial Analysis ELO leaderboard score (1,154 ELO)',
    activeSince: 'FLUX.1 Pro (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="#ffb347" strokeWidth="1.8" />
        <path d="M7 8H17M7 12H14M7 16H11" stroke="#ffb347" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="15.5" cy="14.5" r="1.5" fill="#ffb347" />
      </svg>
    )
  },
  {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    creator: 'OpenAI',
    category: 'text-to-image',
    categoryLabel: 'Text-to-Image Models',
    tagline: 'Native semantic prompt expansion and direct integration across the OpenAI ecosystem.',
    description: 'Built natively on ChatGPT and OpenAI API infrastructure, transforming complex natural language prompts into precise, copyright-compliant visual compositions.',
    marketStatus: 'Active Commercial API',
    accentColor: '#10a37f',
    glowColor: 'rgba(16, 163, 127, 0.35)',
    keyCapabilities: ['Native ChatGPT Integration', 'In-image Typography', 'Enterprise Content Moderation', 'Seed Coherence'],
    benchmarks: 'Industry-standard prompt expansion and alignment',
    activeSince: 'DALL-E 3 (Production)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="#10a37f" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 6L16 10M12 6L8 10M12 6V16" stroke="#10a37f" strokeWidth="2" strokeLinecap="round" />
        <circle cx="17" cy="17" r="3" stroke="#10a37f" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    id: 'ideogram',
    name: 'Ideogram 2.0',
    creator: 'Ideogram AI',
    category: 'text-to-image',
    categoryLabel: 'Text-to-Image Models',
    tagline: 'Mastery over brand typography, vector graphic styling, and graphic design assets.',
    description: 'The industry benchmark for generating posters, T-shirt prints, logos, and advertising graphics with impeccable, legible typography and crisp vector geometry.',
    marketStatus: 'Active Commercial API',
    accentColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    keyCapabilities: ['Graphic Design Layouts', 'Pixel-Accurate Typography', 'Realistic Color Palettes', 'Style Presets (Anime, 3D, Design)'],
    benchmarks: '98.7% accurate spelling rate on complex typographic posters',
    activeSince: 'Ideogram 2.0 (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="#f43f5e" strokeWidth="1.8" />
        <path d="M8 8V16M16 8V16M8 12H16" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'google-imagen-3',
    name: 'Google Imagen 3',
    creator: 'Google DeepMind',
    category: 'text-to-image',
    categoryLabel: 'Text-to-Image Models',
    tagline: 'DeepMind flagship visual model with SynthID watermarking and photorealistic texture.',
    description: 'Available via Vertex AI and Google AI Studio. Excels at natural daylight, micro-details in human portraits, and deep semantic comprehension of multi-layered prompts.',
    marketStatus: 'Enterprise Ready',
    accentColor: '#4285f4',
    glowColor: 'rgba(66, 133, 244, 0.35)',
    keyCapabilities: ['SynthID Digital Watermark', 'Deep Semantic Parsing', 'Vertex AI Enterprise SLA', 'Reduced Artifact Ratio'],
    benchmarks: 'Benchmark leader in human portraiture and artifact suppression',
    activeSince: 'Imagen 3 GA (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8.5" stroke="#4285f4" strokeWidth="1.8" />
        <path d="M8 14L11 11L15 15L17 13" stroke="#4285f4" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="9.5" cy="8.5" r="1.5" fill="#4285f4" />
      </svg>
    )
  },

  // ==========================================
  // 2. VIDEO GENERATION MODELS
  // ==========================================
  {
    id: 'runway-gen3',
    name: 'Runway Gen-3 Alpha',
    creator: 'Runway AI',
    category: 'video-generation',
    categoryLabel: 'Video Generation Models',
    tagline: 'Hollywood & commercial studio standard for cinematic temporal fidelity and camera direction.',
    description: 'Leading diffusion transformer offering precise Camera Control (pan, tilt, zoom, dolly), Motion Brush multi-region kinematics, and keyframe-to-keyframe video transitions.',
    marketStatus: 'Active Commercial API',
    accentColor: '#4edea3',
    glowColor: 'rgba(78, 222, 163, 0.35)',
    keyCapabilities: ['Cinematic Camera Controls', 'Multi-Motion Brush', 'Text & Image-to-Video', 'High Frame Rate Temporal Consistency'],
    benchmarks: 'Used by major Hollywood VFX studios and commercial agencies',
    activeSince: 'Gen-3 Alpha Turbo (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="18" height="14" rx="3" stroke="#4edea3" strokeWidth="1.8" />
        <polygon points="10,9 16,12 10,15" fill="#4edea3" />
        <circle cx="6" cy="8" r="1" fill="#4edea3" />
      </svg>
    )
  },
  {
    id: 'openai-sora',
    name: 'OpenAI Sora',
    creator: 'OpenAI',
    category: 'video-generation',
    categoryLabel: 'Video Generation Models',
    tagline: 'Large-scale world simulation model generating up to 1-minute 1080p photorealistic video.',
    description: 'Trained on visual spacetime patches to simulate real-world physics, reflective lighting, gravity, and continuous character consistency across long temporal sequences.',
    marketStatus: 'Active SaaS',
    accentColor: '#10a37f',
    glowColor: 'rgba(16, 163, 127, 0.35)',
    keyCapabilities: ['1-Minute Continuous Video', 'Physical World Simulation', '3D Temporal Consistency', 'Storyboarding Suite'],
    benchmarks: 'World simulator benchmark in physical collision coherence',
    activeSince: 'Sora Pro (Active 2026)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3V21M3 12H21" stroke="#10a37f" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="7" stroke="#10a37f" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    id: 'kling-ai',
    name: 'Kling AI 1.5',
    creator: 'Kuaishou Technology',
    category: 'video-generation',
    categoryLabel: 'Video Generation Models',
    tagline: 'High-speed 1080p video synthesis with fluid, realistic human body and facial kinetics.',
    description: '3D Spatiotemporal Joint Attention architecture generating realistic human athletic movements, natural cloth dynamics, and multi-camera perspectives up to 2 minutes.',
    marketStatus: 'Active Commercial API',
    accentColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    keyCapabilities: ['Fluid Human Dynamics', 'Up to 2-Min Video Extension', '1080p 30fps Generation', 'Camera Trajectory Editing'],
    benchmarks: 'Outstanding complex limb & athletic motion fidelity',
    activeSince: 'Kling 1.5 HD (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12L12 4L20 12L12 20Z" stroke="#f97316" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3" fill="#f97316" />
      </svg>
    )
  },
  {
    id: 'luma-dream-machine',
    name: 'Luma Dream Machine',
    creator: 'Luma AI',
    category: 'video-generation',
    categoryLabel: 'Video Generation Models',
    tagline: 'Transformer model directly trained on 3D scenes for rapid commercial video generation.',
    description: 'High-speed rendering of physically accurate camera fly-throughs, lighting changes, and believable environment interactions with an accessible, production API.',
    marketStatus: 'Active Commercial API',
    accentColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.35)',
    keyCapabilities: ['Rapid Generation Cycles', '3D Scene Understanding', 'Keyframe Interpolation', 'High Dynamic Camera Paths'],
    benchmarks: 'Under 120-second turnaround for 5-second cinematic loops',
    activeSince: 'Dream Machine 1.5 (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="#ec4899" strokeWidth="1.8" />
        <ellipse cx="12" cy="12" rx="9" ry="4" stroke="#ec4899" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: 'pika-labs',
    name: 'Pika 2.0',
    creator: 'Pika Labs',
    category: 'video-generation',
    categoryLabel: 'Video Generation Models',
    tagline: 'Creative video effects, physics deformation, and high-impact social motion formats.',
    description: 'Pika 2.0 introduces real-time scene effects (Inflate, Melt, Explode, Crumble) paired with camera control and regional canvas expansion.',
    marketStatus: 'Active SaaS',
    accentColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    keyCapabilities: ['Pikaffects Physics Simulation', 'Inpainting & Region Modify', 'Voice Synchronization', 'Seamless Video Loop Stitching'],
    benchmarks: 'Leading motion styling for viral and advertising creatives',
    activeSince: 'Pika 2.0 (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" stroke="#8b5cf6" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    id: 'haiper-ai',
    name: 'Haiper AI 2.0',
    creator: 'Haiper',
    category: 'video-generation',
    categoryLabel: 'Video Generation Models',
    tagline: 'Perceptual AI architecture focused on crystal-clear 4K upscaling and organic motion.',
    description: 'Engineered by former DeepMind researchers to solve temporal flickering and blur in commercial e-commerce, fashion, and architectural rendering.',
    marketStatus: 'Active Commercial API',
    accentColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    keyCapabilities: ['Native 4K Upscale', 'Temporal Anti-Flicker', 'E-commerce Asset Video', 'Real-Time Motion Repaint'],
    benchmarks: 'Zero-artifact rendering on repetitive geometric textures',
    activeSince: 'Haiper 2.0 (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="#06b6d4" strokeWidth="1.8" transform="rotate(45 12 12)" />
      </svg>
    )
  },

  // ==========================================
  // 3. CODE & DEVELOPMENT TOOLS
  // ==========================================
  {
    id: 'cursor',
    name: 'Cursor',
    creator: 'Anysphere',
    category: 'code-tools',
    categoryLabel: 'Code/Development Tools',
    tagline: 'The world’s premier AI-native code editor with multi-file Agent Composer.',
    description: 'Fork of VS Code built from the ground up for agentic development. Understands full repository context, performs multi-file refactors simultaneously, and leverages Claude 3.7 Sonnet.',
    marketStatus: 'Active SaaS',
    accentColor: '#c0c1ff',
    glowColor: 'rgba(192, 193, 255, 0.4)',
    keyCapabilities: ['Multi-file Agent Composer', 'Full-repo Semantic Index', 'Tab Predictive Completion', 'Instant Terminal Command Fix'],
    benchmarks: 'Used by over 80% of top AI startup engineering teams',
    activeSince: 'Cursor 0.45+ (Active 2026)',
    apiAvailability: false,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" stroke="#c0c1ff" strokeWidth="1.8" />
        <polyline points="2,8 12,14 22,8" stroke="#c0c1ff" strokeWidth="1.8" />
        <line x1="12" y1="14" x2="12" y2="22" stroke="#c0c1ff" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    creator: 'GitHub & Microsoft',
    category: 'code-tools',
    categoryLabel: 'Code/Development Tools',
    tagline: 'Enterprise standard codebase companion with Claude, GPT-4o, and Gemini models.',
    description: 'Copilot Workspace and Copilot Enterprise provide deep GitHub repository integration, automated pull request reviews, test generation, and compliance vulnerability auditing.',
    marketStatus: 'Enterprise Ready',
    accentColor: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.35)',
    keyCapabilities: ['Copilot Workspace Multi-Plan', 'Multi-Model Switcher', 'Enterprise SOC-2 / FedRAMP', 'Pull Request Auto-Summary'],
    benchmarks: 'Over 1.8M active enterprise developers worldwide',
    activeSince: 'Copilot Workspace GA',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.484 2 12.017C2 16.444 4.867 20.198 8.839 21.52C9.339 21.611 9.52 21.303 9.52 21.036C9.52 20.799 9.511 20.015 9.506 19.18C6.724 19.784 6.136 17.838 6.136 17.838C5.681 16.683 5.025 16.375 5.025 16.375C4.118 15.754 5.094 15.766 5.094 15.766C6.097 15.836 6.626 16.797 6.626 16.797C7.518 18.324 8.966 17.884 9.536 17.628C9.627 16.981 9.886 16.541 10.171 16.291C7.95 16.039 5.615 15.18 5.615 11.344C5.615 10.251 6.005 9.357 6.645 8.658C6.542 8.404 6.2 7.388 6.743 6.012C6.743 6.012 7.583 5.743 9.49 7.035C10.288 6.813 11.134 6.702 11.978 6.698C12.822 6.702 13.668 6.813 14.468 7.035C16.373 5.743 17.211 6.012 17.211 6.012C17.756 7.388 17.414 8.404 17.311 8.658C17.953 9.357 18.339 10.251 18.339 11.344C18.339 15.19 16.001 16.035 13.771 16.283C14.13 16.592 14.45 17.202 14.45 18.138C14.45 19.479 14.438 20.562 14.438 20.892C14.438 21.163 14.616 21.476 15.125 21.376C19.109 20.05 21.972 16.301 21.972 11.874C21.972 6.484 17.525 2 12 2Z" fill="#ffffff" />
      </svg>
    )
  },
  {
    id: 'v0-vercel',
    name: 'v0 by Vercel',
    creator: 'Vercel',
    category: 'code-tools',
    categoryLabel: 'Code/Development Tools',
    tagline: 'Generative UI development platform generating production-ready React, Tailwind, and shadcn/ui.',
    description: 'Creates responsive frontend components and full multi-page flows in seconds, seamlessly syncing with Next.js, Vercel deployments, and Figma prototypes.',
    marketStatus: 'Active SaaS',
    accentColor: '#000000',
    glowColor: 'rgba(255, 255, 255, 0.4)',
    keyCapabilities: ['Production React / Tailwind Output', 'shadcn/ui Native Integration', 'One-Click Vercel Deploy', 'Figma to Code Ingestion'],
    benchmarks: 'Saves 65% of initial frontend boilerplate setup time',
    activeSince: 'v0 GA (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L2 21H22L12 3Z" stroke="#ffffff" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    id: 'claude-code',
    name: 'Claude Code & Artifacts',
    creator: 'Anthropic',
    category: 'code-tools',
    categoryLabel: 'Code/Development Tools',
    tagline: 'Agentic command-line software engineering and real-time interactive UI sandboxes.',
    description: 'Claude Code operates directly inside developer terminal environments to execute builds, git commits, bug hunts, and dependency upgrades with verified reasoning traces.',
    marketStatus: 'Active Commercial API',
    accentColor: '#d97757',
    glowColor: 'rgba(217, 119, 87, 0.35)',
    keyCapabilities: ['Terminal CLI Agent', 'Interactive React Artifacts', 'Automated Git Operations', 'Test Suite Execution & Self-Repair'],
    benchmarks: 'Top-tier SWE-bench Verified coding benchmark score (74.9%)',
    activeSince: 'Claude 3.7 Agent (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 3L14.5 7L18.5 5.5L17 9.5L21 11L18 14L20.5 17L16.5 17.5L16.8 21.5L13 19.5L11.5 23.5L9.2 20L5.5 21.8L6.5 17.8L2.5 16.5L5.5 13.5L2.8 10.2L6.8 10L6.5 5.8L10.2 7.8L13 3Z" fill="#d97757" />
      </svg>
    )
  },
  {
    id: 'lovable-dev',
    name: 'Lovable',
    creator: 'Lovable Technologies',
    category: 'code-tools',
    categoryLabel: 'Code/Development Tools',
    tagline: 'Full-stack software engineer agent that builds entire web products from conversational intent.',
    description: 'Integrates Supabase databases, GitHub repositories, authentication layers, and Stripe billing into complete production web applications.',
    marketStatus: 'Active SaaS',
    accentColor: '#ff4d94',
    glowColor: 'rgba(255, 77, 148, 0.35)',
    keyCapabilities: ['Full-stack App Synthesis', 'Supabase Database Integration', 'Stripe & Auth Scaffolding', 'Instant GitHub Sync'],
    benchmarks: 'Zero-to-production web apps in under 15 minutes',
    activeSince: 'Lovable 2.0 (Active)',
    apiAvailability: false,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="#ff4d94" strokeWidth="1.8" />
        <circle cx="12" cy="11" r="2.5" fill="#ff4d94" />
      </svg>
    )
  },
  {
    id: 'replit-agent',
    name: 'Replit Agent',
    creator: 'Replit',
    category: 'code-tools',
    categoryLabel: 'Code/Development Tools',
    tagline: 'Autonomous developer inside cloud sandboxes that creates, debugs, and hosts full systems.',
    description: 'Handles runtime provisioning, PostgreSQL schemas, API endpoints, and real-time deployment URLs from high-level natural language instructions.',
    marketStatus: 'Active SaaS',
    accentColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    keyCapabilities: ['Autonomous Cloud Sandbox', 'Postgres Schema Setup', 'Automated Package Management', 'Instant Live HTTPS Hosting'],
    benchmarks: 'Deploys functional multi-tier stacks in single session',
    activeSince: 'Replit Agent GA (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="8" height="6" rx="1" fill="#f97316" />
        <rect x="11" y="9" width="10" height="6" rx="1" fill="#f97316" />
        <rect x="3" y="14" width="8" height="6" rx="1" fill="#f97316" />
      </svg>
    )
  },

  // ==========================================
  // 4. LARGE LANGUAGE MODELS (LLMs)
  // ==========================================
  {
    id: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet',
    creator: 'Anthropic',
    category: 'llm',
    categoryLabel: 'Large Language Models',
    tagline: 'First hybrid reasoning model with adjustable extended thinking tokens and computer use.',
    description: 'Seamlessly switches between instantaneous standard answers and thorough deep architectural chain-of-thought analysis. Capable of autonomous desktop computer use.',
    marketStatus: 'Active Commercial API',
    accentColor: '#d97757',
    glowColor: 'rgba(217, 119, 87, 0.4)',
    keyCapabilities: ['Hybrid Extended Thinking', 'Autonomous Computer Use', '200K Token Context', 'High Precision Tool Calling'],
    benchmarks: '#1 Artificial Analysis Overall Coding & Reasoning leaderboard',
    activeSince: 'Claude 3.7 Sonnet (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2.5L14.5 6.4L18.5 5.1L17.3 9.1L21.3 10.6L18.2 13.4L20.6 16.8L16.6 17L16.8 21.2L13 19.3L11.5 23.2L9.1 19.7L5.3 21.5L6.2 17.5L2.3 16.2L5.2 13.3L2.6 9.9L6.6 9.7L6.4 5.5L10.2 7.4L13 2.5Z" fill="#d97757" />
        <circle cx="12" cy="12" r="3" fill="#111319" />
      </svg>
    )
  },
  {
    id: 'chatgpt-gpt-4o',
    name: 'ChatGPT / GPT-4o',
    creator: 'OpenAI',
    category: 'llm',
    categoryLabel: 'Large Language Models',
    tagline: 'Omni-modal flagship model processing text, vision, and real-time bidirectional audio.',
    description: 'High-speed 128K context model powering ChatGPT Plus/Team and enterprise APIs. Native multimodal tokenization enables sub-300ms speech dialogues and vision understanding.',
    marketStatus: 'Production GA',
    accentColor: '#10a37f',
    glowColor: 'rgba(16, 163, 127, 0.4)',
    keyCapabilities: ['Real-time Bidirectional Audio', 'Native Vision Parsing', 'JSON Schema Enforcement', 'Function / Tool Integration'],
    benchmarks: 'Over 300M weekly active users across global consumer & enterprise tiers',
    activeSince: 'GPT-4o (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9.5" stroke="#10a37f" strokeWidth="1.8" />
        <path d="M8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12Z" stroke="#10a37f" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="1.8" fill="#10a37f" />
      </svg>
    )
  },
  {
    id: 'google-gemini-2',
    name: 'Google Gemini 2.5',
    creator: 'Google DeepMind',
    category: 'llm',
    categoryLabel: 'Large Language Models',
    tagline: 'Breakthrough 2M+ token native context window with multimodal live streaming and search grounding.',
    description: 'Gemini 2.5 Pro and Flash ingest entire code repositories, hours of video, or corporate document vaults in a single prompt. Natively integrated with Google Search and Workspace.',
    marketStatus: 'Active Commercial API',
    accentColor: '#4285f4',
    glowColor: 'rgba(66, 133, 244, 0.4)',
    keyCapabilities: ['2,000,000+ Token Context', 'Live Video/Audio WebSockets', 'Google Search Grounding', 'Structured Code Generation'],
    benchmarks: 'Largest native context window in production AI history',
    activeSince: 'Gemini 2.5 Pro/Flash (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" fill="#4285f4" />
      </svg>
    )
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1 & V3',
    creator: 'DeepSeek AI',
    category: 'llm',
    categoryLabel: 'Large Language Models',
    tagline: 'Open-weights Mixture-of-Experts architecture rivaling proprietary reasoning frontiers.',
    description: '671B parameter architecture utilizing Multi-Head Latent Attention (MLA) and DeepSeekMoE to achieve world-class mathematics, coding, and logical reasoning at 90% lower compute cost.',
    marketStatus: 'Open Weights',
    accentColor: '#0ea5e9',
    glowColor: 'rgba(14, 165, 233, 0.4)',
    keyCapabilities: ['Pure Reinforcement Learning', 'Multi-Head Latent Attention', 'Full Weights Open Source', 'Uncensored Local Deployment'],
    benchmarks: '90.8% MATH-500 score; competitive with OpenAI o1',
    activeSince: 'DeepSeek R1 / V3 (Active 2026)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 8C6 3 18 3 21 8C21 15 15 21 12 21C9 21 3 15 3 8Z" stroke="#0ea5e9" strokeWidth="1.8" />
        <circle cx="12" cy="11" r="3" stroke="#0ea5e9" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    id: 'meta-llama-3',
    name: 'Meta Llama 3.3',
    creator: 'Meta AI',
    category: 'llm',
    categoryLabel: 'Large Language Models',
    tagline: 'The industry-standard open foundational weight family for sovereign enterprise private cloud.',
    description: '70B parameter model delivering capabilities on par with previous 405B benchmarks. Optimized for vLLM, Ollama, Hugging Face, and enterprise on-premises air-gapped security.',
    marketStatus: 'Open Weights',
    accentColor: '#0668e1',
    glowColor: 'rgba(6, 104, 225, 0.35)',
    keyCapabilities: ['Open Foundation License', '128K Context Window', 'Local Fine-Tuning Support', 'Zero Data Egress Risk'],
    benchmarks: 'MMLU score of 88.6; global benchmark for self-hosted AI',
    activeSince: 'Llama 3.3 70B (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8C5.5 8 3.5 10 3.5 12C3.5 14 5.5 16 8 16C10.5 16 11.5 13.5 12 12C12.5 10.5 13.5 8 16 8C18.5 8 20.5 10 20.5 12C20.5 14 18.5 16 16 16C13.5 16 12.5 13.5 12 12C11.5 10.5 10.5 8 8 8Z" stroke="#0668e1" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large 2',
    creator: 'Mistral AI',
    category: 'llm',
    categoryLabel: 'Large Language Models',
    tagline: 'European enterprise AI flagship with native multi-language fluency and code precision.',
    description: '123B model excelling at 128K context window reasoning, European regulatory compliance, multi-lingual translation (French, German, Spanish, Italian, Chinese), and function calling.',
    marketStatus: 'Enterprise Ready',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    keyCapabilities: ['128K Token Multi-Language', 'Precise Function Calling', 'EU AI Act Compliance', 'Cost-Efficient Serving'],
    benchmarks: 'HumanEval score of 92.0%; top European language benchmark',
    activeSince: 'Mistral Large 2 (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="4" height="4" fill="#f59e0b" />
        <rect x="8" y="8" width="4" height="4" fill="#f59e0b" />
        <rect x="12" y="12" width="4" height="4" fill="#f59e0b" />
        <rect x="16" y="16" width="4" height="4" fill="#f59e0b" />
      </svg>
    )
  },

  // ==========================================
  // 5. AUDIO & VOICE GENERATION
  // ==========================================
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    creator: 'ElevenLabs',
    category: 'voice-audio',
    categoryLabel: 'Audio & Voice Generation',
    tagline: 'Ultra-realistic conversational voice synthesis, multilingual dubbing, and voice agents.',
    description: 'Industry standard for emotional speech nuances, real-time WebRTC conversational agents, and zero-shot voice cloning with sub-150ms audio streaming APIs.',
    marketStatus: 'Active Commercial API',
    accentColor: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.4)',
    keyCapabilities: ['Zero-Shot Voice Cloning', 'Sub-150ms Conversational WebSocket', '32+ Language Auto-Dubbing', 'Sound Effects Synthesis'],
    benchmarks: 'Over 1M business voices and 400M audio minutes synthesized',
    activeSince: 'Eleven Multilingual v2 & Conversational API',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="5" width="3.5" height="14" rx="1.75" fill="#ffffff" />
        <rect x="13.5" y="5" width="3.5" height="14" rx="1.75" fill="#ffffff" />
      </svg>
    )
  },
  {
    id: 'suno-ai',
    name: 'Suno v4',
    creator: 'Suno Inc.',
    category: 'voice-audio',
    categoryLabel: 'Audio & Voice Generation',
    tagline: 'End-to-end full production song generation with realistic vocals, harmonies, and stems.',
    description: 'Suno v4 produces studio-grade musical arrangements across any genre with custom lyric writing, vocal arrangements, and high-fidelity instrumental stem separation.',
    marketStatus: 'Active SaaS',
    accentColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    keyCapabilities: ['Full 3-Minute Song Synthesis', 'Dynamic Genre Fusion', 'Stem Separation (Vocal/Beat)', 'Studio Mastering Fidelity'],
    benchmarks: 'Over 100M songs created by songwriters and production studios',
    activeSince: 'Suno v4 (Active)',
    apiAvailability: false,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="#ec4899" strokeWidth="1.8" />
        <path d="M7 12H9M11 9V15M13 7V17M15 10V14M17 12H19" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'cartesia-sonic',
    name: 'Cartesia Sonic',
    creator: 'Cartesia AI',
    category: 'voice-audio',
    categoryLabel: 'Audio & Voice Generation',
    tagline: 'Sub-90ms state-space voice generation engineered for ultra-responsive phone AI agents.',
    description: 'State Space Model (SSM) architecture delivering natural conversational audio with negligible latency for call centers, voice assistants, and robotics.',
    marketStatus: 'Active Commercial API',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    keyCapabilities: ['Sub-90ms Latency', 'State Space Model Architecture', 'Real-time Twilio/SIP Ingestion', 'Ultra-low CPU Footprint'],
    benchmarks: 'Fastest conversational voice model in commercial production',
    activeSince: 'Cartesia Sonic GA',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="4 2" />
        <circle cx="12" cy="12" r="3" fill="#38bdf8" />
      </svg>
    )
  },

  // ==========================================
  // 6. REASONING & MULTIMODAL ENGINES
  // ==========================================
  {
    id: 'openai-o1-o3',
    name: 'OpenAI o1 & o3-mini',
    creator: 'OpenAI',
    category: 'reasoning',
    categoryLabel: 'Reasoning & Multimodal Engines',
    tagline: 'Reinforcement learning chain-of-thought models designed to solve graduate-level science and code.',
    description: 'Spends deliberate test-time compute to plan, explore alternative hypotheses, and backtrack errors before producing final answers. Gold-standard for algorithmic math and cryptography.',
    marketStatus: 'Production GA',
    accentColor: '#10a37f',
    glowColor: 'rgba(16, 163, 127, 0.4)',
    keyCapabilities: ['Test-Time Compute Scaling', 'Deep Algorithmic Verification', 'Mathematical Proofs', 'Multi-Step Cyber Security Audits'],
    benchmarks: '89th percentile on Codeforces competitive programming',
    activeSince: 'OpenAI o1 & o3-mini (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="#10a37f" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" stroke="#10a37f" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 'gemini-thinking',
    name: 'Gemini 2.0 Flash Thinking',
    creator: 'Google DeepMind',
    category: 'reasoning',
    categoryLabel: 'Reasoning & Multimodal Engines',
    tagline: 'Visible thought processes and multimodal reasoning with real-time web tool grounding.',
    description: 'Reveals its internal thinking process directly in API streams, allowing developers to inspect reasoning tokens, catch logical inconsistencies, and inspect search grounded decisions.',
    marketStatus: 'Active Commercial API',
    accentColor: '#4285f4',
    glowColor: 'rgba(66, 133, 244, 0.4)',
    keyCapabilities: ['Visible Thought Tokens', 'Multimodal Image/Doc Reasoning', 'Search & Python Code Execution', 'High Output Velocity'],
    benchmarks: 'Sub-second start to complex multi-step reasoning traces',
    activeSince: 'Gemini Flash Thinking Experimental (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3C8 3 5 6 5 10C5 13 7 15 8 17H16C17 15 19 13 19 10C19 6 16 3 12 3Z" stroke="#4285f4" strokeWidth="1.8" />
        <line x1="9" y1="20" x2="15" y2="20" stroke="#4285f4" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'perplexity-pro',
    name: 'Perplexity Pro',
    creator: 'Perplexity AI',
    category: 'reasoning',
    categoryLabel: 'Reasoning & Multimodal Engines',
    tagline: 'Real-time web research engine combining frontier LLM reasoning with live citations.',
    description: 'Queries live indexes, synthesizes academic publications, verifies facts with inline footnotes, and leverages Sonar / Deep Research for deep diligence briefs.',
    marketStatus: 'Active SaaS',
    accentColor: '#22d3ee',
    glowColor: 'rgba(34, 211, 238, 0.4)',
    keyCapabilities: ['Live Web Index Grounding', 'Inline Verified Footnotes', 'Deep Research Pro Reports', 'File & Dataset Ingestion'],
    benchmarks: 'Leading conversational research engine globally',
    activeSince: 'Sonar Online & Deep Research (Active)',
    apiAvailability: true,
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" stroke="#22d3ee" strokeWidth="1.8" />
        <path d="M8 8L16 16M16 8L8 16" stroke="#22d3ee" strokeWidth="1.8" />
      </svg>
    )
  }
];

const CATEGORIES: { id: StackCategory; label: string; icon: React.ReactNode; count: number }[] = [
  { id: 'all', label: 'All Stack Tools', icon: <Layers size={14} />, count: STACK_ITEMS.length },
  { id: 'text-to-image', label: 'Text-to-Image Models', icon: <ImageIcon size={14} />, count: STACK_ITEMS.filter(i => i.category === 'text-to-image').length },
  { id: 'video-generation', label: 'Video Generation Models', icon: <Video size={14} />, count: STACK_ITEMS.filter(i => i.category === 'video-generation').length },
  { id: 'code-tools', label: 'Code/Development Tools', icon: <Code2 size={14} />, count: STACK_ITEMS.filter(i => i.category === 'code-tools').length },
  { id: 'llm', label: 'Large Language Models', icon: <MessageSquareCode size={14} />, count: STACK_ITEMS.filter(i => i.category === 'llm').length },
  { id: 'voice-audio', label: 'Audio & Voice Generation', icon: <Mic size={14} />, count: STACK_ITEMS.filter(i => i.category === 'voice-audio').length },
  { id: 'reasoning', label: 'Reasoning & Multimodal', icon: <BrainCircuit size={14} />, count: STACK_ITEMS.filter(i => i.category === 'reasoning').length },
];

interface StackSectionProps {
  onSelectModel?: (modelName: string) => void;
}

export const StackSection: React.FC<StackSectionProps> = ({ onSelectModel }) => {
  const [selectedCategory, setSelectedCategory] = useState<StackCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState<StackModelItem | null>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    return STACK_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.creator.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.keyCapabilities.some((c) => c.toLowerCase().includes(q)) ||
        item.tagline.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section
      id="stack"
      className="relative py-24 sm:py-32 overflow-hidden border-t border-[#464554]/30"
    >
      {/* 
        Paper Depth Atmosphere:
        Layered paper gradient elevates the entire Stack section, ensuring the 
        rotating background galaxy remains subtly visible while text and logos 
        maintain maximum optical contrast (contrast ratio > 8:1).
      */}
      <div className="absolute inset-0 bg-[#0c0e13]/85 backdrop-blur-md pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(29,32,37,0.7)_0%,rgba(12,14,19,0.92)_85%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8083ff]/15 border border-[#c0c1ff]/30 text-[#c0c1ff] text-xs font-mono mb-4 shadow-[0_2px_10px_rgba(128,131,255,0.2)]">
            <Layers size={13} className="text-[#8083ff]" />
            <span>PRODUCTION AI STACK • ACTIVE MARKET LEADERBOARD</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#e2e2ea] leading-tight">
            Stack
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#c7c4d7] leading-relaxed max-w-2xl">
            A curated index of actively available, production-grade AI models, video engines, code companions, and frontier reasoning architectures currently powering modern digital ecosystems.
          </p>
        </div>

        {/* Paper Motion Controls Bar: Folder Tabs & Quick Search */}
        <div className="mb-10 space-y-4">
          {/* Category Tabs: Designed using Paper Motion tab dividers */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#464554]/30">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-3.5 py-2.5 rounded-t-lg text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#1d2025] text-white border-t-2 border-[#8083ff] shadow-[0_-4px_16px_rgba(0,0,0,0.5)] z-10'
                      : 'bg-[#14161d]/60 text-[#908fa0] hover:text-[#e2e2ea] hover:bg-[#1d2025]/50 border-t-2 border-transparent'
                  }`}
                >
                  <span className={isActive ? 'text-[#c0c1ff]' : 'text-[#908fa0]'}>
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-[#8083ff]/30 text-[#c0c1ff]' : 'bg-[#282a30] text-[#908fa0]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="relative w-full sm:w-80">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#908fa0]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models, creators, capabilities..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#14161d] border border-[#464554]/30 text-[#e2e2ea] placeholder-[#908fa0] text-xs focus:outline-none focus:border-[#8083ff] focus:ring-1 focus:ring-[#8083ff]/50 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#908fa0] hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-[#908fa0] font-mono self-start sm:self-auto">
              <span>
                Showing <strong className="text-white">{filteredItems.length}</strong> active market models
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline flex items-center gap-1 text-[#4edea3]">
                <CheckCircle2 size={12} /> Commercial SLA Verified
              </span>
            </div>
          </div>
        </div>

        {/* 
          Paper Motion Grid:
          Each card incorporates layered sheets, subtle elevation lifts, and milled paper edges.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative rounded-xl bg-[#171920]/90 border border-[#464554]/35 hover:border-[#8083ff]/60 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(29,32,37,0.92) 0%, rgba(17,19,25,0.96) 100%)'
              }}
            >
              {/* Paper Top Specular Sheen */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

              {/* Dynamic Brand Accent Glow */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: item.accentColor }}
              />

              {/* Paper Tuck Accent in Top-Right Corner */}
              <div className="absolute top-0 right-0 w-6 h-6 overflow-hidden pointer-events-none">
                <div className="w-8 h-8 bg-[#282a30]/60 -rotate-45 transform origin-bottom-left border-b border-[#464554]/40" />
              </div>

              <div>
                {/* Header: Logo & Badges */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl bg-[#0c0e13]/80 border border-[#464554]/40 p-2.5 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-200"
                      style={{ boxShadow: `0 0 16px ${item.glowColor}` }}
                    >
                      {item.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#e2e2ea] group-hover:text-white transition-colors flex items-center gap-1.5">
                        <span>{item.name}</span>
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-80 transition-opacity text-[#c0c1ff]" />
                      </h3>
                      <span className="text-xs text-[#908fa0] font-mono block">
                        {item.creator}
                      </span>
                    </div>
                  </div>

                  <span
                    className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border shrink-0"
                    style={{
                      backgroundColor: `${item.accentColor}18`,
                      borderColor: `${item.accentColor}50`,
                      color: item.accentColor
                    }}
                  >
                    {item.marketStatus}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-xs text-[#c7c4d7] line-clamp-2 leading-relaxed mb-4">
                  {item.tagline}
                </p>

                {/* Capability Pills (Paper Chips) */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.keyCapabilities.slice(0, 3).map((cap, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-[#282a30]/60 border border-[#464554]/30 text-[#e2e2ea] font-mono tracking-tight"
                    >
                      {cap}
                    </span>
                  ))}
                  {item.keyCapabilities.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#1d2025] text-[#908fa0] font-mono">
                      +{item.keyCapabilities.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer: Benchmark Spec & Click Hint */}
              <div className="pt-3 border-t border-[#464554]/25 flex items-center justify-between text-[11px] font-mono text-[#908fa0]">
                <span className="truncate max-w-[75%] text-[#c7c4d7]">
                  {item.benchmarks}
                </span>
                <span className="text-[#8083ff] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-sans font-semibold">
                  Specs <ArrowRight size={11} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search Fallback */}
        {filteredItems.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-[#14161d]/80 border border-[#464554]/30 max-w-md mx-auto">
            <Layers size={32} className="text-[#908fa0] mx-auto mb-3 opacity-50" />
            <h4 className="text-base font-bold text-[#e2e2ea]">No matching models found</h4>
            <p className="text-xs text-[#908fa0] mt-1">
              Try adjusting your query or resetting the category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-1.5 rounded-lg bg-[#282a30] text-xs font-semibold text-white hover:bg-[#37393f] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* 
        Interactive Architecture Spec Modal:
        Opens with smooth layered paper motion when any model is clicked.
      */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-lg bg-[#1a1d24] border border-[#8083ff]/40 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-left animate-in zoom-in-95 duration-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: `0 0 35px ${activeModalItem.glowColor}`
            }}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#464554]/30 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-xl bg-[#0c0e13] border border-[#464554]/50 p-3 flex items-center justify-center shadow-inner"
                  style={{ boxShadow: `0 0 20px ${activeModalItem.glowColor}` }}
                >
                  {activeModalItem.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{activeModalItem.name}</h3>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border font-semibold"
                      style={{
                        backgroundColor: `${activeModalItem.accentColor}20`,
                        borderColor: `${activeModalItem.accentColor}60`,
                        color: activeModalItem.accentColor
                      }}
                    >
                      {activeModalItem.marketStatus}
                    </span>
                  </div>
                  <span className="text-xs text-[#908fa0] font-mono block mt-0.5">
                    Created by {activeModalItem.creator} • {activeModalItem.categoryLabel}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="p-1 rounded-lg text-[#908fa0] hover:text-white hover:bg-[#282a30] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8083ff]">
                Architecture Overview:
              </span>
              <p className="text-xs text-[#c7c4d7] leading-relaxed">
                {activeModalItem.description}
              </p>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#111319] border border-[#464554]/30 text-xs font-mono">
              <div>
                <span className="text-[10px] text-[#908fa0] block">ACTIVE REVISION</span>
                <span className="text-white font-medium">{activeModalItem.activeSince}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#908fa0] block">API ACCESS</span>
                <span className={activeModalItem.apiAvailability ? 'text-[#4edea3]' : 'text-[#ffb347]'}>
                  {activeModalItem.apiAvailability ? 'Commercial REST / WebSocket' : 'Consumer / Web Sandbox'}
                </span>
              </div>
              <div className="col-span-2 pt-2 border-t border-[#464554]/20">
                <span className="text-[10px] text-[#908fa0] block">INDUSTRY BENCHMARK</span>
                <span className="text-[#c0c1ff]">{activeModalItem.benchmarks}</span>
              </div>
            </div>

            {/* Capabilities */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#908fa0] block mb-2">
                Core Capabilities & Modalities:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeModalItem.keyCapabilities.map((cap, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#282a30] border border-[#464554]/40 text-[#e2e2ea]"
                  >
                    ✓ {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#464554]/30">
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-2 rounded-lg bg-[#282a30] text-[#c7c4d7] hover:text-white text-xs font-medium cursor-pointer"
              >
                Close Spec
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onSelectModel) {
                    onSelectModel(activeModalItem.name);
                  }
                  setActiveModalItem(null);
                  const el = document.getElementById('lead-capture');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-lg bg-[#8083ff] text-[#0d0096] font-bold text-xs hover:bg-[#c0c1ff] transition-all shadow-[0_0_16px_rgba(128,131,255,0.35)] cursor-pointer flex items-center gap-1.5"
              >
                <span>Deploy With {activeModalItem.name}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
