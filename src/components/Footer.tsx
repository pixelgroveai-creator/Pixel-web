import React from 'react';
import { ArrowUpRight, Mail, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onAdminClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="w-full relative z-10 bg-[#0c0e13]/85 backdrop-blur-xl border-t border-[#464554]/20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <a href="#" aria-label="pixelgrove.ai Home">
              <Logo size="lg" showDotPinger={true} />
            </a>
            <p className="text-sm text-[#c7c4d7] max-w-sm leading-relaxed">
              Engineering autonomous digital intelligence, high-velocity design systems, and hyper-scalable enterprise AI ecosystems from Lucknow to global markets.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-[#908fa0] uppercase tracking-wider font-mono">Node:</span>
              <span className="font-mono text-xs text-[#4cd7f6] font-semibold">
                LKO-IST-01 [ACTIVE]
              </span>
            </div>
          </div>

          {/* Ecosystem Col */}
          <div className="md:col-span-2 flex flex-col gap-2.5">
            <span className="text-xs text-[#c0c1ff] uppercase tracking-wider font-semibold font-mono">
              Ecosystem
            </span>
            <a href="#services" className="text-xs sm:text-sm text-[#c7c4d7] hover:text-[#e2e2ea] transition-colors">
              Services
            </a>
            <a href="#services" className="text-xs sm:text-sm text-[#c7c4d7] hover:text-[#e2e2ea] transition-colors">
              AI Stack
            </a>
            <a href="#advantage" className="text-xs sm:text-sm text-[#c7c4d7] hover:text-[#e2e2ea] transition-colors">
              Process
            </a>
            <a href="#lead-capture" className="text-xs sm:text-sm text-[#c7c4d7] hover:text-[#e2e2ea] transition-colors">
              Contact
            </a>
          </div>

          {/* Intelligence Col */}
          <div className="md:col-span-2 flex flex-col gap-2.5">
            <span className="text-xs text-[#4cd7f6] uppercase tracking-wider font-semibold font-mono">
              Intelligence
            </span>
            <a href="#services" className="text-xs sm:text-sm text-[#c7c4d7] hover:text-[#e2e2ea] transition-colors">
              Engineering Vectors
            </a>
            <a href="#ai-stack" className="text-xs sm:text-sm text-[#c7c4d7] hover:text-[#e2e2ea] transition-colors">
              Modern AI Stack
            </a>
            <a href="#restaurant-solutions" className="text-xs sm:text-sm text-[#c7c4d7] hover:text-[#e2e2ea] transition-colors">
              Hospitality AI
            </a>
          </div>

          {/* Coordinates Col */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <span className="text-xs text-[#4edea3] uppercase tracking-wider font-semibold font-mono">
              Coordinates
            </span>
            <p className="text-xs sm:text-sm text-[#c7c4d7] leading-relaxed">
              Gomti nagar, Lucknow
            </p>
            <div className="mt-1 space-y-1.5">
              <a
                href="mailto:pixelgrove.ai@gmail.com"
                className="text-xs sm:text-sm text-[#c0c1ff] hover:text-white transition-colors flex items-center gap-1.5 font-mono"
              >
                <Mail size={13} />
                <span>pixelgrove.ai@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#191c21]/60 rounded-xl px-6 py-4 border border-[#464554]/30 text-xs text-[#908fa0]">
          <p>© 2025 Pixelgrove AI Studio Pvt. Ltd. All systems operational.</p>
          <div className="flex items-center gap-2 font-medium text-[#e2e2ea] py-1 px-3 rounded-full bg-[#282a30]/60 border border-[#464554]/40 shadow-sm">
            <span>Made in India 🇮🇳 with ❤️</span>
          </div>
          <div className="flex items-center gap-6">
            {onAdminClick && (
              <button
                onClick={onAdminClick}
                className="hover:text-white text-[#8083ff] transition-colors flex items-center gap-1 cursor-pointer font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Leads Portal</span>
              </button>
            )}
            <a href="#" className="hover:text-[#c7c4d7] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#c7c4d7] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#c7c4d7] transition-colors">
              Cyber Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
