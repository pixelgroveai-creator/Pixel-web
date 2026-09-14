import React, { useState } from 'react';
import { ShoppingBag, Globe, Menu, X, Code2, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';
import { NothingStoreMetadata } from '../data/nothingStoreData';

interface NothingHeaderProps {
  metadata: NothingStoreMetadata;
  currency: 'INR' | 'USD';
  setCurrency: (c: 'INR' | 'USD') => void;
  region: 'IN' | 'US';
  setRegion: (r: 'IN' | 'US') => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenJsonInspector: () => void;
  onSelectProduct: (productId: string) => void;
}

export const NothingHeader: React.FC<NothingHeaderProps> = ({
  currency,
  setCurrency,
  region,
  setRegion,
  activeSection,
  setActiveSection,
  cartCount,
  onOpenCart,
  onOpenJsonInspector,
  onSelectProduct
}) => {
  const [showRegionBanner, setShowRegionBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSwitchToUS = () => {
    setRegion('US');
    setCurrency('USD');
  };

  const handleStayOnIndia = () => {
    setRegion('IN');
    setCurrency('INR');
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0a0a0a]/90 border-b border-[#222222] transition-colors">
      {/* Region Detection Notification Strip (Direct from JSON 1) */}
      {showRegionBanner && (
        <div className="w-full bg-[#141414] border-b border-[#262626] px-4 py-2 text-xs font-mono text-[#a3a3a3] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ff2a2a] animate-ping" />
            <span>
              Looks like you're in: <strong className="text-white font-medium">United States</strong>
              <span className="hidden sm:inline"> — But you're browsing the store for:</span>{' '}
              <strong className="text-white font-medium">India (IN)</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={handleSwitchToUS}
              className={`px-2.5 py-1 rounded border text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                region === 'US'
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-transparent text-[#d4d4d4] border-[#333] hover:border-white hover:text-white'
              }`}
            >
              Go to: United States ($)
            </button>
            <button
              onClick={handleStayOnIndia}
              className={`px-2.5 py-1 rounded border text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                region === 'IN'
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-transparent text-[#d4d4d4] border-[#333] hover:border-white hover:text-white'
              }`}
            >
              Stay on India (₹)
            </button>
            <button
              onClick={() => setShowRegionBanner(false)}
              className="text-[#737373] hover:text-white p-1 ml-1 cursor-pointer"
              title="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveSection('store')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            {/* Signature Nothing Red LED Indicator */}
            <div className="relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff2a2a] shadow-[0_0_8px_#ff2a2a]" />
              <div className="absolute w-4 h-4 rounded-full bg-[#ff2a2a]/30 animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xl sm:text-2xl font-bold tracking-[-0.05em] text-white group-hover:opacity-80 transition-opacity uppercase">
                NOTHING
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#737373] uppercase -mt-1">
                {region === 'IN' ? 'STORE ( IN )' : 'STORE ( US )'}
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-mono tracking-wider">
          <button
            onClick={() => setActiveSection('store')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              activeSection === 'store'
                ? 'bg-white text-black font-bold'
                : 'text-[#a3a3a3] hover:text-white hover:bg-[#1a1a1a]'
            }`}
          >
            PRODUCTS
          </button>
          <button
            onClick={() => {
              setActiveSection('store');
              onSelectProduct('phone-4a-pro');
            }}
            className="px-3 py-1.5 rounded-full text-[#a3a3a3] hover:text-white hover:bg-[#1a1a1a] transition-all cursor-pointer"
          >
            phone ( 4a ) pro
          </button>
          <button
            onClick={() => {
              setActiveSection('store');
              onSelectProduct('phone-4a');
            }}
            className="px-3 py-1.5 rounded-full text-[#a3a3a3] hover:text-white hover:bg-[#1a1a1a] transition-all cursor-pointer"
          >
            phone ( 4a )
          </button>
          <button
            onClick={() => {
              setActiveSection('store');
              onSelectProduct('headphone-1');
            }}
            className="px-3 py-1.5 rounded-full text-[#a3a3a3] hover:text-white hover:bg-[#1a1a1a] transition-all cursor-pointer"
          >
            headphone ( 1 )
          </button>
          <button
            onClick={() => {
              setActiveSection('store');
              onSelectProduct('nothing-os-5');
            }}
            className="px-3 py-1.5 rounded-full text-[#a3a3a3] hover:text-white hover:bg-[#1a1a1a] transition-all cursor-pointer"
          >
            NOTHING OS 5.0
          </button>
          <button
            onClick={() => setActiveSection('transparency')}
            className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSection === 'transparency'
                ? 'bg-[#ff2a2a] text-white font-bold'
                : 'text-[#ff2a2a] hover:bg-[#ff2a2a]/10'
            }`}
          >
            <ShieldCheck size={13} />
            <span>CT LOGS</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#ff2a2a]/20 border border-[#ff2a2a]/40 font-mono">
              v89.30
            </span>
          </button>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* JSON Explorer Button */}
          <button
            onClick={onOpenJsonInspector}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171717] hover:bg-[#262626] border border-[#333] text-xs font-mono text-[#d4d4d4] hover:text-white transition-all cursor-pointer"
            title="Inspect Supported JSON Files"
          >
            <Code2 size={13} className="text-[#ff2a2a]" />
            <span className="hidden lg:inline">JSON DATA</span>
          </button>

          {/* Currency Switcher */}
          <div className="flex items-center rounded-full bg-[#171717] border border-[#333] p-0.5 text-xs font-mono">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                currency === 'INR' ? 'bg-white text-black font-bold' : 'text-[#737373] hover:text-white'
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                currency === 'USD' ? 'bg-white text-black font-bold' : 'text-[#737373] hover:text-white'
              }`}
            >
              $ USD
            </button>
          </div>

          {/* Cart Toggle */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full bg-[#171717] hover:bg-[#262626] border border-[#333] text-white transition-all cursor-pointer"
            title="Open Bag"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ff2a2a] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-[#171717] border border-[#333] text-white hover:bg-[#262626]"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#222] bg-[#0c0c0c] px-4 py-6 space-y-4 font-mono text-sm animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                setActiveSection('store');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-lg bg-[#1a1a1a] text-white font-bold"
            >
              All Products
            </button>
            <button
              onClick={() => {
                setActiveSection('transparency');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-lg bg-[#1a1a1a] text-[#ff2a2a] font-bold flex items-center gap-1.5"
            >
              <ShieldCheck size={14} />
              CT Logs (v89.30)
            </button>
          </div>

          <div className="space-y-1 text-xs text-[#a3a3a3]">
            <p className="uppercase text-[10px] text-[#737373] tracking-widest px-2 pt-2">Featured Hardware</p>
            <button
              onClick={() => {
                onSelectProduct('phone-4a-pro');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded hover:bg-[#1a1a1a] text-white flex items-center justify-between"
            >
              <span>phone ( 4a ) pro</span>
              <span className="text-[#ff2a2a] text-[10px]">NEW</span>
            </button>
            <button
              onClick={() => {
                onSelectProduct('phone-4a');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded hover:bg-[#1a1a1a] text-white flex items-center justify-between"
            >
              <span>phone ( 4a )</span>
              <span className="text-[#737373] text-[10px]">Glyph Bar</span>
            </button>
            <button
              onClick={() => {
                onSelectProduct('headphone-1');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded hover:bg-[#1a1a1a] text-white flex items-center justify-between"
            >
              <span>headphone ( 1 )</span>
              <span className="text-[#737373] text-[10px]">KEF Audio</span>
            </button>
            <button
              onClick={() => {
                onSelectProduct('nothing-os-5');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded hover:bg-[#1a1a1a] text-white flex items-center justify-between"
            >
              <span>NOTHING OS 5.0</span>
              <span className="text-[#ff2a2a] text-[10px]">BETA</span>
            </button>
          </div>

          <div className="pt-2 border-t border-[#222] flex items-center justify-between">
            <button
              onClick={() => {
                onOpenJsonInspector();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-[#d4d4d4] flex items-center gap-1.5 hover:text-white"
            >
              <Code2 size={14} className="text-[#ff2a2a]" />
              <span>Inspect Supported JSON</span>
            </button>
            <span className="text-xs text-[#737373]">India (IN)</span>
          </div>
        </div>
      )}
    </header>
  );
};
