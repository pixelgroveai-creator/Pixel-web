import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showDotPinger?: boolean;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showDotPinger = true,
  variant = 'light',
}) => {
  // Height and scale configurations calibrated to match the reference logotype proportions
  const heightClass =
    size === 'sm' ? 'h-5' : size === 'lg' ? 'h-8 sm:h-9' : 'h-6 sm:h-7';

  const logoSrc = variant === 'dark' ? '/pixelgrove_logo_dark.png' : '/pixelgrove_logo.png';

  return (
    <div
      id="brand-logo"
      className={`inline-flex items-center gap-2.5 group select-none ${className}`}
    >
      {showDotPinger && (
        <div className="relative flex items-center justify-center w-2.5 h-2.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4cd7f6] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c0c1ff] shadow-[0_0_10px_rgba(76,215,246,0.8)]"></span>
        </div>
      )}

      {/* Authentic Branding Logotype matched to the uploaded master reference image */}
      <img
        src={logoSrc}
        alt="pixelgrove.ai"
        className={`${heightClass} w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] filter drop-shadow-[0_0_12px_rgba(192,193,255,0.2)]`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

