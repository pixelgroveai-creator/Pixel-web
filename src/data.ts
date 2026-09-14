import { CaseStudy, ServiceVector } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'nexuspay',
    title: 'NexusPay Global Settlement Engine',
    client: 'NEXUSPAY FINTECH',
    location: 'LONDON / MUMBAI',
    category: 'web',
    badge: 'Web Platform',
    badgeColor: 'text-primary',
    stat: '+340% Organic Traffic',
    statLabel: 'Traffic Surge',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvAEXscFbUrd0C6KzUtFCOVYYAvdjhcC3Na_Sq2phCSsad9Df8aAcW5CqrQmnIT81O1dNo5FXRxJio9RxHC13TYeTptnIkoDm6DjXrtnLqoggYycEiE53cEOY03KYM8iYqJc3v3_ZOrmbNyDMrhTg6jxW75_nGX2h40tOlYvDTb4k3yHWducIOfxuT3TTvAJBYLAixiKvC5-EPQxjfB176g88lbb-IMWToze8-LZr3D5WHP2zrM0cx-w',
    imageAlt: 'Futuristic high-tech analytics dashboard interface on dark slate background with glowing neon indigo and cyan charts, displaying real-time e-commerce revenue data and latency metrics for modern SaaS enterprise',
    summary: 'Architected high-velocity Next.js 15 dashboard replacing legacy Ruby infrastructure, handling cross-border treasury routing with sub-50ms render latency.',
    techStack: ['Next.js 15', 'Supabase', 'Tailwind CSS', 'Server Actions'],
    fullDetails: {
      overview: 'NexusPay required an enterprise-tier treasury dashboard capable of streaming live multi-currency settlement rates with zero UI jitter.',
      challenge: 'Their existing legacy monolith suffered from 3.8s page load times and periodic transaction timeouts during high-volatility market opens.',
      solution: 'We rebuilt their client tier using Next.js 15 Edge SSR, Supabase realtime webhooks, and custom WebGL charting components with optimistic state updates.',
      impactMetrics: [
        { label: 'Render Latency', value: '<42ms', detail: 'Down from 3.8 seconds' },
        { label: 'Organic Traffic', value: '+340%', detail: 'Achieved in 90 days' },
        { label: 'Daily Volume', value: '₹700 Cr+', detail: 'Cross-border volume handled' }
      ],
      clientQuote: 'pixelgrow.ai delivered what three legacy agencies told us was impossible in our timeframe. The edge performance is breathtaking.',
      clientAuthor: 'Marcus Thorne',
      clientRole: 'VP of Engineering, NexusPay'
    }
  },
  {
    id: 'aura-botanics',
    title: 'Aura Botanics Synthetic Campaign',
    client: 'D2C BEAUTY',
    location: 'NEW YORK',
    category: 'media',
    badge: 'AI Pipeline',
    badgeColor: 'text-tertiary',
    stat: '-70% Asset Cost',
    statLabel: 'Production Savings',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQyqiv7NspqZhPFUoVjdFFJsvY1rJNxeD8E1uzFdQYzJGoxKhANRQmyJRabwLtWuzIvMH_Sh8mT3FB4y3S4JiD2d83j1h7iBJqv35NTR-PKm9lMP9USJIPVVyF2Zytly0jO0BmsyVsNV9UWHowt1l8TNlehYqvzCkVvS9sIkfJaR2veaNfSAL9POnwfLx_DLQjONBNXYfvyLz6Qsf5qHMeS4giZ7_SbuzoJRXSnU9-Gy8WcDYas2yoDg',
    imageAlt: 'Hyper-realistic synthetic AI product photography of luxury dark perfume bottle floating with cyan luminescence and glowing water droplets, studio softbox cyber aesthetic, photorealistic 8k render',
    summary: 'Deployed automated ComfyUI + SDXL LoRA pipeline generating 2,400+ photorealistic lifestyle & seasonal assets without physical production shoots.',
    techStack: ['SDXL LoRA', 'ComfyUI', 'AWS S3', 'Custom Nodes'],
    fullDetails: {
      overview: 'Aura Botanics needed over 2,000 localized product assets for an upcoming multi-continent retail expansion without ballooning studio budgets.',
      challenge: 'Physical photo shoots across 6 global environments were projected to cost ₹2.3 Crores and take 14 weeks of studio coordination.',
      solution: 'We trained high-precision SDXL LoRA checkpoints on exact glass caustics, bottle engravings, and fluid viscometry, orchestrating automated generation via headless ComfyUI APIs.',
      impactMetrics: [
        { label: 'Asset Cost Reduction', value: '72%', detail: 'Saved ₹1.6 Cr+ in budget' },
        { label: 'Time to Market', value: '9 Days', detail: 'From concept to 2,400 assets' },
        { label: 'Ad Click-Through', value: '+46%', detail: 'Compared to studio baselines' }
      ],
      clientQuote: 'The visual fidelity is completely indistinguishable from our master product photography. It transformed our seasonal marketing strategy.',
      clientAuthor: 'Elena Rostova',
      clientRole: 'Global Creative Director, Aura Botanics'
    }
  },
  {
    id: 'vitalspulse',
    title: 'VitalsPulse Smart Biosensor App',
    client: 'HEALTHTECH',
    location: 'BANGALORE',
    category: 'mobile',
    badge: 'Flutter Mobile',
    badgeColor: 'text-secondary',
    stat: '140K+ Active MAU',
    statLabel: 'Monthly Active Scale',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbIluSVcxTr5pe4s6fM_hS24YKQ0J4wzP1m4aFeagU4aBup6K3hjinyg8vZdgAYVUcPnzda21X7_1_L7aKWkysFcMLSmSttkm-pt3jH5byoNTjnD3l_0bQGXflX7ZzGniQewqzmXtENCFGz9KineGi1tCULoXa4iMU_CRITZXwwLmaZ8m5UtzKwUUpPwrUuObCe9tk0z49YqlQwvq4_a_j9UcM5CDFpb7RsZxdno3-_GZAt4rzgN-mLQ',
    imageAlt: 'Modern smartphone mobile app mockup on dark gradient background showing health and telemetry fitness tracker interface with cyan circular rings and purple biometric stats',
    summary: 'Crafted Flutter cross-platform mobile suite with Bluetooth Low Energy streaming and local anomaly detection models functioning offline.',
    techStack: ['Flutter 3.24', 'BLE Protocol', 'Riverpod', 'Isar DB'],
    fullDetails: {
      overview: 'VitalsPulse required an ultra-reliable consumer health app connected to their continuous pulse-oximeter wrist sensor with offline sync.',
      challenge: 'Handling 100Hz continuous sensor streams on low-power devices without battery drain or bluetooth disconnect bugs.',
      solution: 'We engineered custom Flutter platform channels with native C++ ring buffers for iOS and Android, paired with on-device SQLite storage and edge biometric anomaly detection.',
      impactMetrics: [
        { label: 'App Store Rating', value: '4.9 ★', detail: 'Across 12,000+ reviews' },
        { label: 'Battery Efficiency', value: '<2.1%', detail: 'Per 8-hour continuous stream' },
        { label: 'Offline Sync Reliability', value: '99.99%', detail: 'Zero lost data packets' }
      ],
      clientQuote: 'Our medical advisors praised the speed and stability of the app. Working with pixelgrow.ai felt like having an internal elite engineering team.',
      clientAuthor: 'Dr. Kabir Sen',
      clientRole: 'Co-founder & CTO, VitalsPulse'
    }
  },
  {
    id: 'cipherguard',
    title: 'CipherGuard Enterprise Rebrand',
    client: 'CYBERSECURITY',
    location: 'DUBAI',
    category: 'brand',
    badge: 'Brand System',
    badgeColor: 'text-tertiary',
    stat: '400+ Tokens',
    statLabel: 'Unified Design Tokens',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL7s2xKjIfRLZ1UZ2Ncu0BwLUgeMFZys4gUr6LwoILryxP4MWKrRJD-tzWQxHcXQQk22GZF8HIllZ9dBNnDC8_n2ujsTHKg5-aAslfFPGQgITb4Iq9i94B27gqGg1rW9G7te8SpViIeaOLwPq5TKKdNuA3feRBUUS-EgmmrXepLbDViy5jEy_FXGDYk3tNk9XLIKvxmOEJXTaWPiEmegsd0zLn63x6HEM5DUxvwOrHB_oh3LSmdVqrDw',
    imageAlt: 'Minimalist luxury dark mode brand design system guide showing isometric 3D typography tokens, deep obsidian cards with cyan and lavender color swatches',
    summary: 'Complete design architecture overhaul across marketing portal, mobile companion, and SaaS console with unified Figma variable tokens.',
    techStack: ['Figma Variables', 'Style Dictionary', '3D Spline', 'Tailwind V4'],
    fullDetails: {
      overview: 'CipherGuard required a total visual identity and design system overhaul ahead of their Series B funding and enterprise roll-out.',
      challenge: 'Three siloed teams (Marketing, Web Console, Mobile App) were using conflicting hex values, button styles, and inconsistent typography.',
      solution: 'We unified their entire digital landscape under a single design token schema exported directly into production CSS and React component libraries.',
      impactMetrics: [
        { label: 'Design Tokens', value: '420+', detail: 'Auto-compiled to code' },
        { label: 'Front-end Dev Velocity', value: '+2.4x', detail: 'Zero style re-work' },
        { label: 'Brand Recall', value: '94%', detail: 'Post-launch perception survey' }
      ],
      clientQuote: 'Our developers and designers finally speak the exact same language. The design system paid for itself within the first quarter.',
      clientAuthor: 'Tariq Al-Mansoor',
      clientRole: 'Chief Product Officer, CipherGuard'
    }
  },
  {
    id: 'komorebi',
    title: 'Komorebi Kinetic Apparel Store',
    client: 'DIRECT-TO-CONSUMER',
    location: 'BERLIN',
    category: 'web',
    badge: 'Headless Web',
    badgeColor: 'text-primary',
    stat: '₹11.5 Cr GMV',
    statLabel: 'Quarterly GMV',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt4i7iArDNiTgOi3VcAQnUc9u765Wp0YCwGjmSI1UntDptUpGbYNy5abUFY9_iidS8mtdocFc2AnLRQrhRCkZOAsAvDz-3kxrc3hzUD000-SUT4vTbs_8s0VtpTu5CZQud56pWwV6ompWqE_XFem8DbmIn9c6MK36IHqHPbgBADpnLi1ch3AXrWh9iwLpJmHCAWz_GsPe43gON0kCRdUGk4ZzVnhaMhFTSE-ttnLuNtCOUZNGyXonZFw',
    imageAlt: 'Futuristic headless online store showcase on laptop screen with high resolution 3D product previews and instant checkout UI in dark glowing neon styling',
    summary: 'Engineered headless Next.js commerce front-end connected to Shopify backend. Boosted conversion rate by 64% with 400ms page transitions.',
    techStack: ['Shopify Storefront API', 'Next.js 15', 'Stripe', 'Framer Motion'],
    fullDetails: {
      overview: 'Berlin fashion brand Komorebi needed a luxury kinetic shopping experience with dynamic 3D fabric physics and near-instant navigation.',
      challenge: 'Standard Shopify themes were slow, bloated with legacy app scripts, and restricted custom editorial video storytelling.',
      solution: 'We separated the storefront from the backend using Shopify Storefront GraphQL, edge edge caching, and interactive WebGL cloth simulation.',
      impactMetrics: [
        { label: 'Conversion Rate', value: '+64%', detail: 'Mobile checkout uplift' },
        { label: 'Page Transition', value: '400ms', detail: 'Smooth kinetic layout' },
        { label: 'Bounce Rate', value: '-38%', detail: 'Due to sub-second loads' }
      ],
      clientQuote: 'Our customers constantly comment on how snappy and editorial the store feels. It feels like browsing an interactive runway.',
      clientAuthor: 'Greta Weiss',
      clientRole: 'Founder & Head of Brand, Komorebi'
    }
  },
  {
    id: 'omnistream',
    title: 'OmniStream Synthetic Ad Engine',
    client: 'MEDIA NETWORK',
    location: 'GURUGRAM',
    category: 'media',
    badge: 'Video Engine',
    badgeColor: 'text-secondary',
    stat: '99.9% Uptime',
    statLabel: 'Pipeline Availability',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDckKsAxur8enJVBJHNIu3LN9fKq60-1CB40R-V-sSJ3LPukMEcuGw4DLhjS3c8Mqcccl6XE1frmRqx4o56cpYCCe9I2Lb6WTpRzSJ1052cFH3_GV6LsR8qnX23siPMNal9bkz-eOIhRcG_wQYfrGr9Pta4RZoEtMxwGPK_gafrQAYZX7hy_a-Kc03Bv7-XAP7AKBm78tVNf7ncKl_qD3jzYT9-92Lryzy96u_1Qr55Zi_G3cqtp793KA',
    imageAlt: 'Dynamic video frames timeline showing AI generated cinematic video reels with glowing audio waveforms and prompt tags in dark creative software studio',
    summary: 'Automated multi-lingual commercial creation using custom Claude scripting and ComfyUI video frame interpolation, serving 500+ daily creatives.',
    techStack: ['Claude 3.7', 'Python FastApi', 'ComfyUI', 'FFmpeg GPU'],
    fullDetails: {
      overview: 'OmniStream produces targeted video ads in 8 regional languages for performance marketing campaigns across YouTube and Instagram.',
      challenge: 'Manual localization, voice dubbing, and video rendering created a 5-day bottleneck for agile campaign iteration.',
      solution: 'We built a headless AI creative cluster combining LLM script adaptation, neural voice cloning, and GPU-accelerated video rendering pipelines.',
      impactMetrics: [
        { label: 'Daily Output', value: '500+', detail: 'Custom tailored video ads' },
        { label: 'Turnaround Time', value: '<4 Min', detail: 'From concept prompt to final MP4' },
        { label: 'Creative Fatigue', value: '-82%', detail: 'Continuous fresh ad variants' }
      ],
      clientQuote: 'pixelgrow.ai’s video engine gave us an insurmountable competitive moat in our programmatic ad buying campaigns.',
      clientAuthor: 'Aarav Singhania',
      clientRole: 'Head of Growth, OmniStream Media'
    }
  }
];

export const SERVICE_VECTORS: ServiceVector[] = [
  {
    vectorNumber: 'VECTOR // 01',
    title: 'Custom Web Engineering',
    description: 'Sub-second web platforms, enterprise dashboards, headless e-commerce storefronts, and interactive 3D experiences engineered for maximum conversion and Google Lighthouse 99+ scores.',
    features: [
      'Next.js 15 Server Actions, TypeScript, React 19 architecture',
      'Headless Shopify & Stripe orchestration with global edge CDN',
      'Interactive Three.js & WebGL micro-interactions'
    ],
    tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'WebGL'],
    accentColor: 'text-primary',
    iconName: 'terminal'
  },
  {
    vectorNumber: 'VECTOR // 02',
    title: 'Mobile App Development',
    description: 'Fluid multi-platform iOS and Android products compiled from unified codebases, paired with native device integrations, offline-first syncing, and embedded on-device AI copilot features.',
    features: [
      'Single codebase Flutter & React Native zero-compromise builds',
      'In-app LLM assistant integration with edge caching',
      'App Store & Play Store automated CI/CD compliance pipeline'
    ],
    tags: ['Flutter 3.x', 'React Native', 'Dart', 'CoreML / ONNX'],
    accentColor: 'text-secondary',
    iconName: 'smartphone'
  },
  {
    vectorNumber: 'VECTOR // 03',
    title: 'Branding & Visual Identity Systems',
    description: 'Complete brand architectures built for digital scalability. From mathematical grid logos and tokenized Figma libraries to comprehensive typography systems and multi-channel asset kits.',
    features: [
      'Figma Variables & multi-tier design token documentation',
      'Complete UI kit components mapped 1:1 to code libraries',
      'Digital identity rules, 3D asset palettes & motion specs'
    ],
    tags: ['Design Tokens', 'Figma Systems', '3D Spline', 'Vector Iconography'],
    accentColor: 'text-tertiary',
    iconName: 'style'
  },
  {
    vectorNumber: 'VECTOR // 04',
    title: 'AI Creative & Media Automation',
    description: 'Scalable generative workflows that produce commercial-grade product photography, dynamic motion ads, automated localization, and hyper-personalized creative without 6-figure studio costs.',
    features: [
      'Custom SDXL LoRA fine-tuning for authentic product likeness',
      'Headless ComfyUI pipelines integrated via webhook triggers',
      'Multi-variant AI video reels & campaign creative engines'
    ],
    tags: ['SDXL Custom LoRA', 'ComfyUI', 'Midjourney v6', 'Runway Gen-3'],
    accentColor: 'text-primary-container',
    iconName: 'smart_toy'
  }
];
