import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, Truck, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { StoreLogo } from '../common/StoreLogo';

interface HeroBannerProps {
  onScrollToProducts: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onScrollToProducts }) => {
  const { settings } = useStore();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-6 shadow-xl border border-emerald-800/40">
      {/* Background visual accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-12 py-10 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-3xl">
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Guaranteed Halal Food</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Farm-Fresh & Stone-Ground Purity</span>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4 font-serif">
            Pure & Fresh Groceries for Your Family Table
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mb-8 leading-relaxed">
            From aromatic Shahi Kalijira polao rice, cold-pressed pungent mustard oil, to fresh river Hilsa and tender grass-fed halal beef — handpicked daily and delivered directly to your doorstep.
          </p>

          {/* Action Button & Quick Highlights */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onScrollToProducts}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-950 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Browse Fresh Groceries</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 text-xs text-slate-300 pl-2">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Fast 60-min delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Free over {settings.currency}{settings.freeDeliveryThreshold}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Emblem on Hero */}
        <div className="hidden lg:flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/30 backdrop-blur-md shadow-2xl shrink-0 animate-in fade-in duration-500">
          <StoreLogo size="2xl" variant="emblem" className="ring-4 ring-amber-400/30 shadow-xl mb-3" />
          <span className="font-serif font-black text-white text-lg tracking-tight">Sanjida Food Store</span>
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mt-0.5">Dhaka, Bangladesh</span>
        </div>
      </div>
    </div>
  );
};
