import React from 'react';
import { Order, StoreSettings } from '../../types';
import { CheckCircle2, Truck, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { StoreLogo } from '../common/StoreLogo';

interface OrderSuccessModalProps {
  order: Order | null;
  settings: StoreSettings;
  onClose: () => void;
  onTrackOrder: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  settings,
  onClose,
  onTrackOrder
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden text-slate-800 border border-slate-200 p-6 text-center space-y-4">
        {/* Brand emblem & Checkmark */}
        <div className="flex items-center justify-center gap-3">
          <StoreLogo size="lg" variant="emblem" />
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center ring-4 ring-emerald-50">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 font-serif">Order Placed Successfully!</h2>
          <p className="text-xs text-slate-500 mt-1">
            Thank you for shopping with {settings.storeName}. We have received your order and our fulfillment team is preparing it.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 text-left">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-slate-500">Order Number:</span>
            <span className="font-mono font-bold text-slate-900 text-sm">#{order.orderNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Recipient:</span>
            <span className="font-semibold text-slate-800">{order.customerName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Delivery Slot:</span>
            <span className="font-semibold text-slate-800">{order.deliverySlot}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Payment:</span>
            <span className="font-semibold text-slate-800">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-200 font-bold">
            <span className="text-slate-700">Total Payable:</span>
            <span className="text-base text-emerald-800 font-black">
              {settings.currency}{order.total}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={onTrackOrder}
            className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-colors flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Track Order Delivery Status</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
