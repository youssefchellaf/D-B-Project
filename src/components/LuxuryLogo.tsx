import React from 'react';

interface LuxuryLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withTagline?: boolean;
  onClick?: () => void;
}

export default function LuxuryLogo({ size = 'md', className = '', withTagline = true, onClick }: LuxuryLogoProps) {
  // Brand typographical sizing
  const titleSize = {
    sm: 'text-3xl xs:text-4xl sm:text-5xl',
    md: 'text-4xl xs:text-5xl sm:text-6xl md:text-7xl',
    lg: 'text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl',
  };

  const taglineSize = {
    sm: 'text-sm sm:text-base mt-2',
    md: 'text-base sm:text-lg mt-2.5',
    lg: 'text-lg sm:text-xl md:text-2xl mt-3',
  };

  const dividerSize = {
    sm: 'w-36 sm:w-52 my-1.5 sm:my-2',
    md: 'w-48 sm:w-64 my-2 sm:my-2.5',
    lg: 'w-64 sm:w-80 my-2.5 sm:my-3',
  };

  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center justify-center text-center select-none ${onClick ? 'cursor-pointer active:scale-[0.99] transition-transform duration-100' : ''} ${className}`}
    >
      
      {/* Brand Elegant Text Typography in a single line, never wrapping, with professional tracking and serif fonts */}
      <h1 dir="ltr" className={`font-display tracking-wide ${titleSize[size]} text-center whitespace-nowrap flex items-center justify-center gap-x-2 sm:gap-x-3 select-none`}>
        <span className="text-[#2E4F32] font-semibold drop-shadow-[0_1px_2px_rgba(46,79,50,0.05)]">Douaa</span>
        <span className="text-[#C19641] italic text-[0.9em] select-none" style={{ fontFamily: '"Playfair Display", serif' }}>&amp;</span>
        <span className="text-[#561C76] font-semibold drop-shadow-[0_1px_2px_rgba(86,28,118,0.05)]">Basma</span>
      </h1>

      {/* Elegant minimalist separator line */}
      <div className={`flex items-center justify-center gap-3 ${dividerSize[size]}`}>
        <span className="h-[1px] flex-1 bg-[#C19641] opacity-40" />
        <div className="w-1.5 h-1.5 rotate-45 border border-[#C19641] bg-white opacity-60" />
        <span className="h-[1px] flex-1 bg-[#C19641] opacity-40" />
      </div>

      {/* Arabic Tagline */}
      {withTagline && (
        <p className={`font-serif font-bold text-[#561C76] text-center tracking-wide ${taglineSize[size]}`}>
          بسمة و دعاء <span className="text-[#C19641] font-sans font-light">|</span> عصائر و تحليات فاخرة
        </p>
      )}
    </div>
  );
}

