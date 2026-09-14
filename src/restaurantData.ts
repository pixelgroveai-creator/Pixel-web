import { RestaurantServiceItem, IndustryPlaybookItem } from './types';

export const RESTAURANT_SERVICES: RestaurantServiceItem[] = [
  {
    id: 'qr-menu',
    badge: 'Front-of-House (FOH)',
    title: 'Digital QR Menu System',
    subtitle: 'Lightning-fast, zero-app-install interactive web menus with real-time operational sync.',
    tier: 'FOH',
    painPoints: [
      'Eliminates recurring ₹1,20,000–₹3,50,000/yr paper, leather, and lamination reprint costs',
      'Removes awkward table moments where servers must 86 an item after guests order',
      'Enables agile instant price adjustments during sudden wholesale ingredient cost spikes',
      'Zero app downloads needed—accessible via table QR code or contactless NFC tap discs'
    ],
    capabilities: [
      'Sub-5s live updates: change prices, vintage wine lists, or daily chef specials across all tables',
      'Rich multi-angle photography, dietary filters (vegan, gluten-free, halal), and pairings',
      'Digital Sommelier & Cellar Book mode for extensive fine dining beverage lists',
      'Flexible deployment: view-only showcase, contactless wine book, or hybrid order-and-pay'
    ],
    metrics: 'Saves ₹1,20,000–₹3,50,000/yr per location • <5s sync time'
  },
  {
    id: 'crm-inventory',
    badge: 'Back-of-House & Retention (BOH)',
    title: 'Customizable CRM & Live Inventory',
    subtitle: 'Modular restaurant CRM tied directly into real-time recipe-level ingredient depletion.',
    tier: 'BOH',
    painPoints: [
      'Stops chaotic dinner-rush stockouts and slashes unrecorded inventory leakage (4-6% variance)',
      'Bridges the communication disconnect between kitchen prep lines and floor service',
      'Converts anonymous one-time walk-ins into high-lifetime-value loyal regulars',
      'Eliminates manual clipboard counts with automated vendor purchase order drafting'
    ],
    capabilities: [
      'Live recipe-level depletion: tracks raw protein weights and dry goods as items are rung up',
      'Predictive par alerts: warns managers of ingredient shortages before weekend services',
      'Guest Intelligence Profiles: logs order history, spend tiers, allergies, and anniversary dates',
      'Automated win-back marketing: triggers behavioral SMS/email offers to 30-day dormant guests'
    ],
    metrics: '+18% repeat visits • Shaves 3-5% off food waste'
  }
];

export const CONNECTED_LOOP_STEPS = [
  {
    step: '01',
    title: 'Dynamic Real-Time 86-ing',
    description: 'When the BOH inventory module detects raw protein or wine stock hits zero, the FOH digital QR menu instantly greys it out or hides it across all tables before guests order.',
    benefit: 'Zero floor embarrassment • 100% kitchen-to-table synchronization'
  },
  {
    step: '02',
    title: 'Margin-Optimized Menu Engineering',
    description: 'The CRM/inventory algorithm calculates real-time profit margins per plate and prompts the QR menu to highlight high-margin dishes as "Chef Recommendations" during peak hours.',
    benefit: '+3.8% gross margin lift • Focuses kitchen capacity on profitable items'
  },
  {
    step: '03',
    title: 'Data-Enriched Guest Profiles',
    description: 'Guest preferences selected on the QR menu (e.g. natural wine lover, truffle enthusiast) automatically update their CRM profile, empowering servers with personalized table greetings.',
    benefit: 'High-touch hospitality • Automated personalized win-back campaigns'
  }
];

export const INDUSTRY_PLAYBOOKS: IndustryPlaybookItem[] = [
  {
    id: 'fine-dining',
    segment: 'Fine Dining & Upscale',
    icon: 'Wine',
    primaryPainPoint: 'Protecting elevated ambiance; frequent daily tasting menu changes; managing 200+ bottle cellar vintages.',
    suggestedLeadAngle: 'Digital Sommelier & Cellar Book + VIP Guest Preferences',
    keyMetric: 'Zero reprints for daily tasting menus; 100% accurate wine vintage stock',
    scenario: 'Keep bespoke leather-bound food menus, but deploy discrete QR/NFC tokens for dynamic wine pairings and rare cellar reserves that change nightly.'
  },
  {
    id: 'qsr',
    segment: 'Fast Casual & QSR',
    icon: 'Zap',
    primaryPainPoint: 'Peak lunch rush bottlenecks, line busting, labor costs, high kitchen turnover.',
    suggestedLeadAngle: 'Lightning QR Order/Browse + Real-Time Recipe Depletion',
    keyMetric: '+22% faster table turnover; instant automated 86-ing during volume rushes',
    scenario: 'Guests browse and pay right from their seat or queue line, while raw ingredient inventory automatically depletes without manual cashier tallying.'
  },
  {
    id: 'brewpub',
    segment: 'Casual Dining & Brewpubs',
    icon: 'Beer',
    primaryPainPoint: 'Rapidly rotating draft beer lines, game-day specials, high floor staff turnover.',
    suggestedLeadAngle: 'Rotating Tap QR + Automated Keg/Ingredient Level Alerts',
    keyMetric: '-5% beverage cost variance; automated loyalty rewards capture',
    scenario: 'Bartenders swap a blown keg on the dashboard; the table menus update live within 3 seconds, complete with tasting notes, ABV, and local brewery story.'
  },
  {
    id: 'franchise',
    segment: 'Multi-Location & Franchise',
    icon: 'Building2',
    primaryPainPoint: 'Brand inconsistency across branches, fluctuating regional vendor pricing, fragmented guest data.',
    suggestedLeadAngle: 'Centralized Menu Master + Multi-Warehouse Inventory Balancing',
    keyMetric: 'Unified group P&L visibility; 100% centralized brand menu governance',
    scenario: 'Corporate culinary directors push seasonal menu updates to 12 locations simultaneously while tracking localized food costs and supplier discrepancies.'
  }
];

export const OBJECTION_HANDLERS = [
  {
    objection: 'Our guests prefer physical menus / QR menus feel cheap or impersonal.',
    category: 'Hospitality & Atmosphere',
    response: 'Hospitality is tactile, especially for your ambiance. Many fine-dining partners keep bespoke physical food menus, but use the digital QR code exclusively as a live Wine & Cocktails Cellar book or for daily chef specials. That way, your 200-bottle wine list is always 100% accurate, and you never have to reprint multi-page books when a rare vintage runs dry.'
  },
  {
    objection: 'We already have a POS (Toast / Square / Clover / Micros). I do not want another disconnected tool.',
    category: 'Integrations & Stack',
    response: 'We do not replace your POS—we integrate directly with Toast, Square, Clover, and major systems via two-way API sync. Your staff continues ringing orders and taking payments exactly as they do today; our system runs silently in the background to automate inventory counts and keep table menus synchronized.'
  },
  {
    objection: 'We do not have the time or staff bandwidth to learn complicated software.',
    category: 'Onboarding & Operations',
    response: 'In a kitchen with high turnover, nobody has time for 40 hours of software training. We handle 100% of the initial menu setup and recipe import for you. On the floor, guests do not download an app—they just tap or scan. In the back, your team uses one-tap counting on any tablet or phone.'
  },
  {
    objection: 'Software subscriptions are getting too expensive in this economy.',
    category: 'ROI & Margins',
    response: 'Every rupee on the P&L has to justify itself right now. Most operators find the system pays for itself in the first 60 days purely from two places: zeroing out monthly paper reprints (₹12,000–₹30,000/mo), and catching just 2–3% in food waste and untracked inventory shrinkage. We can run a quick 3-minute ROI breakdown based on your current seat count.'
  }
];

export const SIMULATED_OPERATOR_CHATS = [
  {
    id: 'qsr-speed',
    label: 'Fast Casual / QSR (Toast Integration & Rush Speed)',
    operatorQuery: 'We run a busy fast-casual spot on Toast. We get crushed at lunch. How does this help us without messing up our POS tickets?',
    agentResponse: 'I completely understand—when you have a 30-person lunch line, the last thing you can afford is tickets dropping or cashiers re-entering orders. Our system integrates directly with Toast via two-way sync: as orders fire, our BOH module depletes raw ingredients at the recipe level in real time. If your prep line runs out of carnitas or avocados at 12:45 PM, the digital menu greys it out instantly on table codes and mobile kiosks. Your staff never has to run back and announce an 86, and table turns improve by 20-25%. Would you like to see a quick 10-minute sandbox tailored to your Toast setup?'
  },
  {
    id: 'fine-dining-elegance',
    label: 'Fine Dining GM (Worried about cheap QR feeling)',
    operatorQuery: 'We are a white-tablecloth concept. Our regulars hate ugly laminated QR codes on tables. Why would we ever use this?',
    agentResponse: 'I completely respect that—hospitality is tactile, and your ambiance is your signature. You never want guests feeling like they are in an airport lounge. What our fine-dining partners do is keep their bespoke, leather-bound dinner menus for food, but introduce discrete brushed-brass or engraved wooden tokens exclusively for their dynamic Wine & Spirits Cellar Book and daily tasting specials. When a rare 2016 Burgundy runs out, your sommelier updates it in 5 seconds from an iPad without reprinting a 40-page wine list. Plus, guest wine preferences feed directly into your CRM so you know Mr. Vance prefers dry Barolos before he even sits down. Would you be open to a 10-minute preview of our cellar book layout?'
  },
  {
    id: 'brewpub-kegs',
    label: 'Brewpub Manager (Keg tracking & Rotating taps)',
    operatorQuery: 'We have 28 rotating craft taps and a huge patio. Keeping the chalkboard and printouts updated is a full-time headache.',
    agentResponse: 'Keeping 28 craft taps updated across multiple seating zones is brutal—especially on Friday nights when kegs blow every 20 minutes. With our system, your bar manager taps one button when a keg blows; all digital menus update instantaneously with tasting notes, brewery provenance, and IBU stats. Behind the scenes, the inventory module tracks pour ounce depletion and alerts you before weekend peak hours so you never run dry on your top-selling IPA. Most brewpubs see beverage cost variance drop by ~5% in the first month. How do you currently track your keg par levels?'
  },
  {
    id: 'roi-cost',
    label: 'Skeptical Owner (Subscription costs & ROI)',
    operatorQuery: 'Everyone is trying to sell me another monthly SaaS subscription. Why should I pay for this right now?',
    agentResponse: 'Every line item on your P&L has to pull its weight, especially with food costs where they are today. We look at this strictly through hard numbers: if you are spending ₹12,000 to ₹25,000 a month on menu paper, laminating, and seasonal reprints, the QR system wipes that out immediately. On the back-of-house side, catching just 2% of food waste and unrecorded inventory leakage on a ₹4,00,000 monthly food spend recovers ₹8,000–₹12,000/month straight to your bottom line. The platform typically delivers 4x to 6x ROI within the first 60 days. Would you like to run the exact math for your seat count on a quick 3-minute call?'
  }
];
