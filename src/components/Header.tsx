import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onStartProjectClick: () => void;
  onBookCallClick: () => void;
  onAdminClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartProjectClick, onBookCallClick, onAdminClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTimeIST, setCurrentTimeIST] = useState('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST is UTC+5:30
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const timeString = new Intl.DateTimeFormat('en-GB', options).format(now);
      setCurrentTimeIST(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#111319]/80 backdrop-blur-xl border-b border-[#464554]/20 shadow-[0_1px_12px_rgba(0,0,0,0.3)]">
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand & Location Indicator */}
        <div className="flex items-center gap-4 lg:gap-6">
          <a href="#" className="flex items-center" aria-label="pixelgrove.ai Home">
            <Logo size="md" showDotPinger={true} />
          </a>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#282a30]/60 backdrop-blur-md border border-[#464554]/30">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.8)] animate-pulse"></span>
            <span className="text-xs uppercase tracking-wider text-[#c7c4d7] font-medium font-mono">
              Lucknow <span className="text-[#4edea3]">IST {currentTimeIST || '14:45:00'} (UTC+5:30)</span>
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          <a
            href="#stack"
            className="text-sm text-[#c7c4d7] hover:text-[#e2e2ea] font-medium transition-colors inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#8083ff]/15 border border-[#8083ff]/30 text-white shadow-[0_0_12px_rgba(128,131,255,0.2)]"
          >
            <span>Stack</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8083ff] animate-pulse"></span>
          </a>
          <a
            href="#services"
            className="text-sm text-[#c7c4d7] hover:text-[#e2e2ea] font-medium transition-colors"
          >
            Services
          </a>
          <a
            href="#advantage"
            className="text-sm text-[#c7c4d7] hover:text-[#e2e2ea] font-medium transition-colors"
          >
            Process
          </a>
          <a
            href="#restaurant-solutions"
            className="inline-flex items-center gap-1.5 text-xs text-[#4cd7f6] font-semibold px-2.5 py-1 rounded-md bg-[#03b5d3]/20 border border-[#4cd7f6]/30 hover:bg-[#03b5d3]/40 hover:text-white transition-all shadow-[0_0_12px_rgba(76,215,246,0.2)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            Restaurant Tech
          </a>
          <a
            href="#lead-capture"
            className="text-sm text-[#c7c4d7] hover:text-[#e2e2ea] font-medium transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 relative">
          {onAdminClick && (
            <button
              onClick={onAdminClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#282a30] hover:bg-[#33353b] text-[#c7c4d7] hover:text-white text-xs font-semibold border border-[#464554]/40 hover:border-[#8083ff]/50 transition-all cursor-pointer shadow-sm"
              title="Open Admin Leads & Enquiries Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#8083ff]" />
              <span>Admin Leads</span>
            </button>
          )}

          <button
            onClick={onStartProjectClick}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#8083ff] text-[#0d0096] text-xs sm:text-sm font-semibold hover:bg-[#c0c1ff] transition-all duration-200 shadow-[0_0_16px_rgba(128,131,255,0.35)] hover:shadow-[0_0_24px_rgba(192,193,255,0.5)] cursor-pointer"
          >
            Start a Project
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#c7c4d7] hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111319]/95 backdrop-blur-2xl border-b border-[#464554]/30 px-6 py-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#464554]/20 text-xs text-[#c7c4d7]">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span>Lucknow IST: {currentTimeIST}</span>
          </div>
          <div className="flex flex-col space-y-3">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#c7c4d7] hover:text-[#c0c1ff] py-1 text-sm font-medium"
            >
              Services
            </a>
            <a
              href="#stack"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white bg-[#8083ff]/15 border border-[#8083ff]/30 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span>Stack</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8083ff] animate-pulse"></span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#8083ff]/30 text-[#c0c1ff]">Active Models</span>
            </a>
            <a
              href="#advantage"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#c7c4d7] hover:text-[#c0c1ff] py-1 text-sm font-medium"
            >
              Process &amp; Advantage
            </a>
            <a
              href="#restaurant-solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#4cd7f6] font-semibold py-1 text-sm flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse"></span>
              Restaurant Tech Suite
            </a>
            <a
              href="#lead-capture"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#c7c4d7] hover:text-[#c0c1ff] py-1 text-sm font-medium"
            >
              Contact Studio
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {onAdminClick && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAdminClick();
                }}
                className="w-full py-2 rounded-lg bg-[#282a30] text-[#c0c1ff] border border-[#8083ff]/40 text-xs font-medium flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#8083ff]" />
                <span>Open Admin Leads Portal</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartProjectClick();
              }}
              className="w-full py-2.5 rounded-lg bg-[#8083ff] text-[#0d0096] font-semibold text-sm shadow-[0_0_16px_rgba(128,131,255,0.4)]"
            >
              Start a Project
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookCallClick();
              }}
              className="w-full py-2 rounded-lg bg-[#282a30] text-[#e2e2ea] border border-[#464554]/40 text-xs font-medium"
            >
              Book Free Strategy Call (15-Min)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
