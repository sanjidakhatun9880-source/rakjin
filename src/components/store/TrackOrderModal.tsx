import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';
import { X, Search, Truck, CheckCircle2, Clock, MapPin, Package, Phone } from 'lucide-react';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ isOpen, onClose }) => {
  const { orders, settings } = useStore();
  const [query, setQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const clean = query.trim().toLowerCase().replace('#', '');
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === clean ||
        o.customerPhone.includes(clean) ||
        o.customerEmail.toLowerCase() === clean
    );

    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const statusSteps = ['pending', 'confirmed', 'processing', 'out_for_delivery', 'delivered'];
  const currentStepIdx = searchedOrder ? statusSteps.indexOf(searchedOrder.orderStatus) : -1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full my-8 overflow-hidden text-slate-800 border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-800 text-white">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-300" />
            <h2 className="font-extrabold text-sm">Track Your Grocery Delivery</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Order # (e.g. SFS-8921) or Phone..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition-colors"
            >
              Track
            </button>
          </form>

          {/* Result */}
          {hasSearched && !searchedOrder && (
            <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
              <p className="font-bold text-slate-700 mb-1">Order Not Found</p>
              <p>Please double check your Order Number or phone number.</p>
            </div>
          )}

          {searchedOrder && (
            <div className="space-y-4 animate-in fade-in">
              {/* Order Meta */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-mono font-black text-sm text-emerald-950 block">
                    #{searchedOrder.orderNumber}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Recipient: {searchedOrder.customerName}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white inline-block">
                    {searchedOrder.orderStatus.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Slot: {searchedOrder.deliverySlot}
                  </span>
                </div>
              </div>

              {/* Step Progress Bar */}
              <div className="py-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-2">
                  <span className={currentStepIdx >= 0 ? 'text-emerald-700' : ''}>Placed</span>
                  <span className={currentStepIdx >= 1 ? 'text-emerald-700' : ''}>Confirmed</span>
                  <span className={currentStepIdx >= 2 ? 'text-emerald-700' : ''}>Packing</span>
                  <span className={currentStepIdx >= 3 ? 'text-emerald-700' : ''}>Out for Delivery</span>
                  <span className={currentStepIdx >= 4 ? 'text-emerald-700' : ''}>Delivered</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{ width: `${Math.max(10, ((currentStepIdx + 1) / 5) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Timeline Updates */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Fulfillment Status Log
                </h4>
                <div className="space-y-2">
                  {searchedOrder.timeline.map((event, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-800">{event.label}</div>
                        <div className="text-[11px] text-slate-400">{event.time}</div>
                        {event.note && (
                          <div className="text-[11px] text-slate-600 bg-slate-50 p-1.5 rounded mt-1 border border-slate-100">
                            {event.note}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items Summary */}
              <div className="pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between font-bold text-slate-800 mb-1.5">
                  <span>Items in Order:</span>
                  <span>{settings.currency}{searchedOrder.total}</span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-600">
                  {searchedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{it.quantity}x {it.productName}</span>
                      <span>{settings.currency}{it.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
