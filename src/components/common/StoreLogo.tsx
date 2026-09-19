import React, { useState } from 'react';
import { StoreLogoEmblemSvg } from './StoreLogoEmblemSvg';

interface StoreLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'emblem' | 'full' | 'header' | 'badge';
  className?: string;
  showSubtitle?: boolean;
  theme?: 'light' | 'dark';
}

export const StoreLogo: React.FC<StoreLogoProps> = ({
  size = 'md',
  variant = 'header',
  className = '',
  showSubtitle = true,
  theme = 'light'
}) => {
  const [imgError, setImgError] = useState(false);

  // Size mapping for logo image / emblem
  const sizeClasses = {
    xs: 'w-7 h-7 min-w-[28px] min-h-[28px]',
    sm: 'w-9 h-9 min-w-[36px] min-h-[36px]',
    md: 'w-11 h-11 min-w-[44px] min-h-[44px]',
    lg: 'w-14 h-14 min-w-[56px] min-h-[56px]',
    xl: 'w-20 h-20 min-w-[80px] min-h-[80px]',
    '2xl': 'w-28 h-28 min-w-[112px] min-h-[112px]'
  };

  const imageDimension = sizeClasses[size] || 'w-11 h-11 min-w-[44px] min-h-[44px]';

  const renderLogoImage = (extraClasses = '') => {
    if (imgError) {
      return (
        <div className={`${imageDimension} ${extraClasses} rounded-full overflow-hidden flex items-center justify-center bg-white`}>
          <StoreLogoEmblemSvg className="w-full h-full" />
        </div>
      );
    }

    const baseUrl = ((import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL) || './';
    const logoSrc = `${baseUrl}logo.png`.replace(/\/\//g, '/');

    return (
      <img
        src={logoSrc}
        alt="Sanjida Food Store Official Logo"
        referrerPolicy="no-referrer"
        loading="eager"
        className={`${imageDimension} ${extraClasses} object-contain rounded-full transition-transform hover:scale-105 duration-200`}
        onError={() => setImgError(true)}
      />
    );
  };

  if (variant === 'emblem' || variant === 'badge') {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 rounded-full bg-white p-0.5 shadow-sm border border-amber-300/70 overflow-hidden ${className}`}>
        {renderLogoImage()}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="relative p-1 rounded-full bg-white shadow-md border border-amber-300/80 mb-2">
          {renderLogoImage()}
        </div>
        <div className="leading-tight">
          <span className={`block font-serif font-black tracking-tight text-lg sm:text-xl ${theme === 'dark' ? 'text-white' : 'text-emerald-950'}`}>
            Sanjida
          </span>
          <span className="block text-[11px] font-bold tracking-[0.2em] text-amber-600 uppercase mt-0.5">
            — FOOD STORE —
          </span>
          {showSubtitle && (
            <span className={`block text-[11px] mt-1 font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-emerald-700'}`}>
              Pure • 100% Halal • Fresh Everyday
            </span>
          )}
        </div>
      </div>
    );
  }

  // Header lockup variant
  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      <div className="relative shrink-0 rounded-full bg-white p-0.5 shadow-xs border border-amber-300/80 overflow-hidden">
        {renderLogoImage('hover:rotate-3 transition-transform duration-300')}
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span className={`text-lg sm:text-xl font-black font-serif tracking-tight leading-none ${theme === 'dark' ? 'text-white' : 'text-emerald-950'}`}>
            Sanjida
          </span>
          <span className="text-[10px] sm:text-xs font-bold tracking-wider text-amber-700 uppercase bg-amber-100/70 border border-amber-300/70 px-1.5 py-0.5 rounded-md leading-none">
            Food Store
          </span>
        </div>
        {showSubtitle && (
          <span className={`text-[11px] font-medium tracking-wide mt-1 leading-tight ${theme === 'dark' ? 'text-slate-400' : 'text-emerald-800'}`}>
            Fresh, 100% Halal & Authentic Groceries
          </span>
        )}
      </div>
    </div>
  );
};
