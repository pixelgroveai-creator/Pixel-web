export interface NothingProduct {
  id: string;
  name: string;
  tagline: string;
  heroImage: string;
  productImage?: string;
  link: string;
  color?: string;
  priceINR?: number;
  priceUSD?: number;
  badge?: string;
  specs?: Record<string, string>;
  highlights?: string[];
  description?: string;
  features?: string[];
}

export interface NothingStoreMetadata {
  title: string;
  description: string;
  country: string;
  countryCode: string;
  currency: string;
  currencySymbol: string;
  detectedRegion: string;
  tagline: string;
  themeColor: string;
  favicon: string;
  sourceURL: string;
  robots: string;
  statusCode: number;
}

export interface NothingScrapeData {
  metadata: NothingStoreMetadata;
  products: NothingProduct[];
  regionPrompt: {
    userLocation: string;
    browsingStore: string;
    switchUrl: string;
  };
}

export const NOTHING_STORE_DATA: NothingScrapeData = {
  metadata: {
    title: "Nothing | IN",
    description: "Here at Nothing, we’re building a world where tech is fun again. Remember a time where every new product made you excited? We’re bringing that back.",
    country: "India",
    countryCode: "IN",
    currency: "INR",
    currencySymbol: "₹",
    detectedRegion: "United States",
    tagline: "Here at Nothing, we’re building a world where tech is fun again. Remember a time where every new product made you excited? We’re bringing that back.",
    themeColor: "#F4F4F4",
    favicon: "https://cdn.shopify.com/oxygen-v2/44152/39458/83049/4418536/assets/favicon-red-Y_6swvx7.svg",
    sourceURL: "https://in.nothing.tech/",
    robots: "index, follow",
    statusCode: 200
  },
  regionPrompt: {
    userLocation: "United States",
    browsingStore: "India",
    switchUrl: "https://us.nothing.tech/"
  },
  products: [
    {
      id: "phone-4a-pro",
      name: "phone ( 4a ) pro",
      tagline: "Stay in the moment with Essential Notifications",
      heroImage: "https://cdn.sanity.io/images/gtd4w1cq/production/d537f4c841503edee2f704a0a279697e8a1ce909-4096x2305.jpg?auto=format",
      productImage: "https://cdn.shopify.com/s/files/1/0376/5420/0459/files/Phone-4a-Pro-White.png?v=1771948315",
      link: "https://in.nothing.tech/products/phone-4a-pro",
      color: "White / Dark Grey",
      priceINR: 31999,
      priceUSD: 389,
      badge: "NEW LAUNCH",
      specs: {
        "Display": "6.78\" Flexible AMOLED, 120Hz LTPO, 4,500 nits peak, HDR10+",
        "Processor": "Dimensity 7350 Pro 5G with Co-engineered NPU",
        "Camera": "50 MP Main (Sony LYT-700 OIS) + 50 MP Ultra-Wide + 32 MP Selfie",
        "Glyph Interface": "Essential Glyph Matrix with 36 custom addressable LED zones",
        "Battery & Charging": "5,100 mAh with 65W Fast Charging (50% in 18 mins)",
        "Operating System": "Nothing OS 5.0 (Zero Bloatware, 3 OS + 4 Years Security)",
        "Materials": "100% Recycled Aluminum mid-frame, Bio-based polymer rear"
      },
      highlights: [
        "Essential Notifications keep crucial alerts subtly illuminated until dismissed",
        "Co-developed 4nm silicon tuned exclusively for fluid 120 FPS gaming and camera ISP",
        "Dual tactile volume rockers with high-precision bead-blasted metal buttons"
      ]
    },
    {
      id: "phone-4a",
      name: "phone ( 4a )",
      tagline: "Get live delivery updates with the new Glyph Bar",
      heroImage: "https://cdn.sanity.io/images/gtd4w1cq/production/d2a928661850d77fa8db5489eb53af14990639e8-4096x2305.jpg?auto=format",
      productImage: "https://cdn.shopify.com/s/files/1/0376/5420/0459/files/Phone-4a-White.png?v=1771948069",
      link: "https://in.nothing.tech/products/phone-4a",
      color: "Milk White / Black",
      priceINR: 24999,
      priceUSD: 299,
      badge: "BESTSELLER",
      specs: {
        "Display": "6.7\" Flexible AMOLED, 120Hz adaptive, 1300 nits peak brightness",
        "Processor": "Dimensity 7200 Pro custom 4nm octa-core silicon",
        "Camera": "50 MP Dual Rear Camera with OIS & EIS + 32 MP Front Camera",
        "Glyph Bar": "Linear Glyph Progress Bar with live delivery & timer tracking",
        "Battery & Charging": "5,000 mAh with 45W Fast Charging (50% in 23 mins)",
        "Cooling": "3,200mm² advanced vapor chamber for uninterrupted sustained performance",
        "Durability": "IP54 water & dust resistance, Corning Gorilla Glass 5"
      },
      highlights: [
        "Live delivery updates via Glyph bar for Zomato, Swiggy, Uber, and timers",
        "Transparent industrial symmetry that celebrates internal precision engineering",
        "Nothing OS monochrome aesthetic with ultra-responsive haptics"
      ]
    },
    {
      id: "headphone-1",
      name: "headphone ( 1 )",
      tagline: "Custom sound with tuning by KEF",
      heroImage: "https://cdn.sanity.io/images/gtd4w1cq/production/1cb755a0792e7ee8611c70b56e2f08fad95ce0d4-4096x2305.jpg?auto=format",
      productImage: "https://cdn.shopify.com/s/files/1/0376/5420/0459/files/headphone-1-white-3_4-view-thumbnail.webp?v=1788847549",
      link: "https://in.nothing.tech/products/headphone-1",
      color: "Pure White / Matte Black",
      priceINR: 18999,
      priceUSD: 229,
      badge: "KEF AUDIO CO-DEVELOPMENT",
      specs: {
        "Acoustic Tuning": "Acoustic architecture tuned by legendary British audio pioneer KEF",
        "Drivers": "40mm custom planar magnetic diaphragm with neodymium motor",
        "Noise Cancellation": "Hybrid Smart Active Noise Cancellation up to 45dB with Transparency mode",
        "Battery Life": "65 hours total playback (42 hours with ANC enabled), 10-min charge gives 8 hrs",
        "Codecs & Wireless": "Bluetooth 5.4, LDAC, LHDC 5.0, Hi-Res Audio Wireless certified",
        "Hardware Controls": "Tactile mechanical roller dial + capacitive touch gestures",
        "Voice Isolation": "6 HD beamforming microphones with Clear Voice Technology 3.0"
      },
      highlights: [
        "Studio-grade soundstage designed in Kent, England with KEF audio engineers",
        "Tactile mechanical roller dial inspired by vintage studio mixing consoles",
        "Ergonomic weight distribution with breathable memory foam ear cushions"
      ]
    },
    {
      id: "nothing-os-5",
      name: "NOTHING OS 5.0",
      tagline: "Open Beta, out now",
      description: "Get an early look at Nothing OS 5.0 and help us refine the experience ahead of the general release.",
      heroImage: "https://cdn.sanity.io/images/gtd4w1cq/production/63f0a5870bac4035b50e56d6c8728d223a75aed0-3840x2160.webp?auto=format",
      link: "https://in.nothing.tech/nothing-os",
      badge: "OPEN BETA",
      features: [
        "Refined NDot typography and deeply customizable monochrome widget canvas",
        "Smart Glyph Engine 3.0 with dynamic real-time app notifications & countdowns",
        "App Locker with biometric authentication and isolated Private Space",
        "Zero bloatware guarantee — 25% faster cold launches and smoother frame rates",
        "Enhanced Quick Settings tiles with one-tap Glyph brightness & audio switcher"
      ]
    }
  ]
};
