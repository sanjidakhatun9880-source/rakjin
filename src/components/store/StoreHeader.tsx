import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Search, Phone, MapPin, Truck, Clock } from 'lucide-react';
import { StoreLogo } from '../common/StoreLogo';

interface StoreHeaderProps {
  onOpenCart: () => void;
  onOpenTrackOrder: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({
  onOpenCart,
  onOpenTrackOrder,
  searchTerm,
  onSearchChange
}) => {
  const { cart, settings } = useStore();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-emerald-800 text-emerald-50 text-[11px] font-medium py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{settings.announcementText}</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-200 text-[10px]">
            <span className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-emerald-300" /> Express 60-min Delivery
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-300" /> {settings.openingHours}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Logo & Branding */}
        <div className="flex items-center shrink-0">
          <StoreLogo size="md" variant="header" showSubtitle={true} theme="light" />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Kalijira rice, mustard oil, halal beef, spices, fish..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Customer Actions (Strictly Customer-Facing: Hotline, Track Order, Cart) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Customer Hotline */}
          <div className="hidden lg:flex items-center gap-2 text-left pr-3 border-r border-slate-200">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="text-slate-400 text-[10px] block">Customer Hotline</span>
              <span className="font-bold text-slate-800 font-mono">{settings.contactPhone}</span>
            </div>
          </div>

          {/* Customer Order Tracking Modal Button */}
          <button
            onClick={onOpenTrackOrder}
            className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
          >
            <Truck className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Track Order</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-xl shadow-sm transition-all cursor-pointer relative"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center shadow">
                  {cartItemCount}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-left text-xs leading-none">
              <span className="text-[10px] text-emerald-200 block">My Cart</span>
              <span className="font-bold">{settings.currency}{cartSubtotal}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search groceries, halal meats, fish, rice..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
          />
        </div>
      </div>
    </header>
  );
};
