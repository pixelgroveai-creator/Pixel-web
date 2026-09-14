import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, Check, Volume2, Bell, Sliders, Smartphone, Cpu, ShieldCheck } from 'lucide-react';
import { NothingProduct } from '../data/nothingStoreData';

interface ProductShowcaseHeroProps {
  products: NothingProduct[];
  currency: 'INR' | 'USD';
  onSelectProduct: (product: NothingProduct) => void;
  onAddToCart: (product: NothingProduct) => void;
  onOpenGlyphSimulator: (type: 'essential' | 'delivery' | 'kef' | 'os') => void;
}

export const ProductShowcaseHero: React.FC<ProductShowcaseHeroProps> = ({
  products,
  currency,
  onSelectProduct,
  onAddToCart,
  onOpenGlyphSimulator
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const formatPrice = (p: NothingProduct) => {
    if (currency === 'INR') {
      return p.priceINR ? `₹${p.priceINR.toLocaleString('en-IN')}` : 'Free Public Beta';
    } else {
      return p.priceUSD ? `$${p.priceUSD.toLocaleString('en-US')}` : 'Free Public Beta';
    }
  };

  return (
    <section className="w-full bg-[#0a0a0a] text-white">
      {/* Brand Ethos Strip (Direct from JSON 1 metadata description) */}
      <div className="w-full border-b border-[#1f1f1f] bg-[#0d0d0d] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1c1c] border border-[#2e2e2e] text-xs font-mono text-[#a3a3a3]">
            <span className="w-2 h-2 rounded-full bg-[#ff2a2a]" />
            <span>NOTHING PHILOSOPHY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-mono font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight uppercase">
            Making Tech Fun Again.
          </h1>
          <p className="text-sm sm:text-base text-[#a3a3a3] max-w-2xl mx-auto font-sans leading-relaxed">
            “Remember a time where every new product made you excited? We’re bringing that back through transparent engineering, iconic glyph lighting, and uncompromised craftsmanship.”
          </p>
        </div>
      </div>

      {/* Featured Products Grid / List */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {products.map((product, index) => {
          const isPhone4aPro = product.id === 'phone-4a-pro';
          const isPhone4a = product.id === 'phone-4a';
          const isHeadphone1 = product.id === 'headphone-1';
          const isNothingOS = product.id === 'nothing-os-5';

          return (
            <div
              key={product.id}
              id={product.id}
              className="group relative rounded-3xl bg-[#121212] border border-[#222] overflow-hidden hover:border-[#3a3a3a] transition-all duration-300"
            >
              {/* Top Banner & Badge */}
              <div className="flex items-center justify-between px-6 sm:px-10 pt-8 pb-4 border-b border-[#1a1a1a]">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff2a2a]" />
                  <span className="font-mono text-xs text-[#737373] uppercase tracking-widest">
                    MODEL_REF: 0{index + 1}
                  </span>
                  {product.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ff2a2a]/20 border border-[#ff2a2a]/40 text-[#ff2a2a] text-[11px] font-mono font-bold tracking-wider">
                      {product.badge}
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs text-[#a3a3a3]">
                  {product.color || 'Industrial Transparent Edition'}
                </span>
              </div>

              {/* Main Product Stage */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
                {/* Visual Imagery Side */}
                <div className="lg:col-span-7 relative flex items-center justify-center min-h-[340px] sm:min-h-[460px] rounded-2xl bg-gradient-to-b from-[#181818] to-[#0c0c0c] p-6 border border-[#222] overflow-hidden">
                  {/* Subtle Background Glow */}
                  <div className="absolute inset-0 bg-radial from-[#ffffff]/5 via-transparent to-transparent pointer-events-none" />

                  {/* Primary Hero Image from Sanity */}
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten pointer-events-none transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Overlaid Transparent Product Asset from Shopify if available */}
                  {product.productImage && (
                    <div className="relative z-10 max-w-[280px] sm:max-w-[340px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:-translate-y-2">
                      <img
                        src={product.productImage}
                        alt={`${product.name} white finish`}
                        className="w-full h-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Interactive Trigger Overlay */}
                  <div className="absolute bottom-4 right-4 z-20">
                    {isPhone4aPro && (
                      <button
                        onClick={() => onOpenGlyphSimulator('essential')}
                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#000]/80 hover:bg-white hover:text-black border border-[#333] text-xs font-mono text-white transition-all cursor-pointer backdrop-blur-md"
                      >
                        <Bell size={13} className="text-[#ff2a2a]" />
                        <span>Test Essential Glyphs</span>
                      </button>
                    )}
                    {isPhone4a && (
                      <button
                        onClick={() => onOpenGlyphSimulator('delivery')}
                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#000]/80 hover:bg-white hover:text-black border border-[#333] text-xs font-mono text-white transition-all cursor-pointer backdrop-blur-md"
                      >
                        <Sliders size={13} className="text-[#4cd7f6]" />
                        <span>Simulate Glyph Delivery Bar</span>
                      </button>
                    )}
                    {isHeadphone1 && (
                      <button
                        onClick={() => onOpenGlyphSimulator('kef')}
                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#000]/80 hover:bg-white hover:text-black border border-[#333] text-xs font-mono text-white transition-all cursor-pointer backdrop-blur-md"
                      >
                        <Volume2 size={13} className="text-[#4edea3]" />
                        <span>KEF Acoustic Tuner</span>
                      </button>
                    )}
                    {isNothingOS && (
                      <button
                        onClick={() => onOpenGlyphSimulator('os')}
                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#000]/80 hover:bg-white hover:text-black border border-[#333] text-xs font-mono text-white transition-all cursor-pointer backdrop-blur-md"
                      >
                        <Smartphone size={13} className="text-[#ff2a2a]" />
                        <span>Try OS 5.0 Widgets</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Details & Action Column */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    <h2 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase text-white">
                      {product.name}
                    </h2>
                    <p className="font-mono text-base sm:text-lg text-[#ff2a2a] mt-2 font-medium">
                      {product.tagline}
                    </p>
                    {product.description && (
                      <p className="text-sm text-[#a3a3a3] mt-3 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Pricing or Availability */}
                  <div className="p-4 rounded-xl bg-[#171717] border border-[#292929] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#737373] uppercase tracking-wider block">
                        {currency === 'INR' ? 'INDIA MRP (INCL. TAXES)' : 'MSRP (US STORE)'}
                      </span>
                      <span className="font-mono text-2xl font-bold text-white">
                        {formatPrice(product)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#4edea3] font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                        In Stock &amp; Verified
                      </span>
                      <span className="text-[11px] font-mono text-[#737373] block">
                        {currency === 'INR' ? 'Free express delivery in India' : 'Ships nationwide'}
                      </span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  {product.highlights && (
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-[#737373] uppercase tracking-wider block">
                        ENGINEERING HIGHLIGHTS
                      </span>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-[#d4d4d4] font-sans">
                        {product.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#ff2a2a] font-mono font-bold">›</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.features && (
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-[#737373] uppercase tracking-wider block">
                        KEY FEATURES
                      </span>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-[#d4d4d4] font-sans">
                        {product.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#ff2a2a] font-mono font-bold">›</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#1f1f1f]">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-full sm:w-auto flex-1 py-3 px-6 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#e5e5e5] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    >
                      <span>Discover &amp; Specs</span>
                      <ArrowUpRight size={14} />
                    </button>

                    {!isNothingOS ? (
                      <button
                        onClick={() => onAddToCart(product)}
                        className="w-full sm:w-auto py-3 px-6 rounded-full bg-[#1c1c1c] hover:bg-[#2c2c2c] border border-[#333] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Add to Bag
                      </button>
                    ) : (
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto py-3 px-6 rounded-full bg-[#ff2a2a] hover:bg-[#e02020] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all text-center"
                      >
                        Enroll in Beta
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
