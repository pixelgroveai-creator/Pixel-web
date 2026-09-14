import React from 'react';
import { ShieldCheck, Mail, MapPin, Code2, Globe, Heart } from 'lucide-react';

interface NothingFooterProps {
  onOpenJsonInspector: () => void;
  onNavigateCTLogs: () => void;
  onSelectProduct: (productId: string) => void;
}

export const NothingFooter: React.FC<NothingFooterProps> = ({
  onOpenJsonInspector,
  onNavigateCTLogs,
  onSelectProduct
}) => {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-[#1f1f1f] text-white font-mono pt-16 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff2a2a] shadow-[0_0_8px_#ff2a2a]" />
              <span className="text-xl font-bold tracking-tight uppercase">NOTHING ( IN )</span>
            </div>
            <p className="text-xs text-[#a3a3a3] leading-relaxed max-w-md font-sans">
              Here at Nothing, we’re building a world where tech is fun again. Remember a time where every new product made you excited? We’re bringing that back through transparency, human touch, and distinct design.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-[#737373]">
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-[#4cd7f6]" />
                <span>Gomti nagar, Lucknow</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Mail size={13} className="text-[#ff2a2a]" />
                <a href="mailto:pixelgrove.ai@gmail.com" className="hover:text-white">
                  pixelgrove.ai@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Products (from JSON 1) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hardware</h4>
            <ul className="space-y-2 text-xs text-[#a3a3a3]">
              <li>
                <button
                  onClick={() => onSelectProduct('phone-4a-pro')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  phone ( 4a ) pro
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProduct('phone-4a')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  phone ( 4a )
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProduct('headphone-1')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  headphone ( 1 )
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProduct('nothing-os-5')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  NOTHING OS 5.0
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Security & CT Logs (from JSON 2) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Transparency</h4>
            <ul className="space-y-2 text-xs text-[#a3a3a3]">
              <li>
                <button
                  onClick={onNavigateCTLogs}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-[#ff2a2a] cursor-pointer"
                >
                  <ShieldCheck size={13} />
                  <span>CT Log List (v89.30)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenJsonInspector}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Code2 size={13} />
                  <span>JSON Raw Inspector</span>
                </button>
              </li>
              <li>
                <a
                  href="/api/json-data/nothing"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors block"
                >
                  Store Scrape API
                </a>
              </li>
              <li>
                <a
                  href="/api/json-data/certificate-transparency"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors block"
                >
                  CT Directory API
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Store & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Support &amp; India</h4>
            <ul className="space-y-2 text-xs text-[#a3a3a3]">
              <li>
                <span className="text-[#d4d4d4]">Currency: INR (₹)</span>
              </li>
              <li>
                <span>GST Compliant Billing</span>
              </li>
              <li>
                <span>Doorstep Courier Service</span>
              </li>
              <li>
                <span>Nothing Community Forum</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with mandatory "Made in India 🇮🇳 with ❤️" */}
        <div className="pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373]">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Nothing Technology Limited. All rights reserved.</span>
          </div>

          {/* Mandatory Badge: Made in India 🇮🇳 with ❤️ */}
          <div className="px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#2e2e2e] text-white text-xs font-mono flex items-center gap-2">
            <span>Made in India 🇮🇳 with ❤️</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a href="https://in.nothing.tech/pages/privacy-policy" target="_blank" rel="noreferrer" className="hover:text-white">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="https://in.nothing.tech/pages/terms-of-sales" target="_blank" rel="noreferrer" className="hover:text-white">
              Terms of Sales
            </a>
            <span>•</span>
            <button onClick={onOpenJsonInspector} className="hover:text-white cursor-pointer">
              JSON Specs
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
