import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Phone, Mail, MapPin, ShieldCheck, Truck, Clock, Heart } from 'lucide-react';
import { StoreLogo } from '../common/StoreLogo';

interface StoreFooterProps {
  onSecretAdminTrigger: () => void;
}

export const StoreFooter: React.FC<StoreFooterProps> = ({ onSecretAdminTrigger }) => {
  const { settings } = useStore();
  const [clickCount, setClickCount] = useState(0);

  // Hidden easter egg: clicking the copyright symbol 3 times triggers the secret admin gate
  const handleSecretCopyrightClick = () => {
    const newCount = clickCount + 1;
    if (newCount >= 3) {
      setClickCount(0);
      onSecretAdminTrigger();
    } else {
      setClickCount(newCount);
      setTimeout(() => setClickCount(0), 1200);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Bio */}
          <div>
            <div className="mb-3">
              <StoreLogo size="sm" variant="header" showSubtitle={false} theme="dark" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {settings.tagline}. Dedicated to bringing pure, chemical-free, 100% Halal food ingredients to your dining table every single day.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Halal & Hygienic Sourcing</span>
            </div>
          </div>

          {/* Col 2: Delivery Areas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Delivery Coverage (Dhaka)
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Uttara (All Sectors 1-18)</li>
              <li>• Gulshan 1 & 2, Banani, Baridhara</li>
              <li>• Dhanmondi, Lalmatia & Kalabagan</li>
              <li>• Mirpur (Sections 1-14 & DOHS)</li>
              <li>• Mohammadpur & Bashundhara R/A</li>
              <li>• Express 60-min delivery on selected slots</li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Customer Support Hotline
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-slate-200 font-semibold">{settings.contactPhone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{settings.contactEmail}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{settings.openingHours}</span>
              </p>
              <p className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </p>
            </div>
          </div>

          {/* Col 4: Safe Payment & Guarantee */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Payment Methods Accepted
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              We accept Cash on Delivery (COD), bKash, Nagad, Rocket, and all major debit/credit cards at your doorstep.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-slate-300">
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Cash on Delivery</span>
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">bKash</span>
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Nagad</span>
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Visa / Mastercard</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with discrete easter egg on copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            {/* The copyright symbol itself has a hidden click listener for 3 rapid clicks */}
            <span
              onClick={handleSecretCopyrightClick}
              className="cursor-default select-none hover:text-slate-400"
              title=""
            >
              ©
            </span>{' '}
            {new Date().getFullYear()} {settings.storeName}. All rights reserved.
          </p>

          <p className="flex items-center gap-1 text-[11px]">
            <span>Crafted with fresh passion for authentic food lovers</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
