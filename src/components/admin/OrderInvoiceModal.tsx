import React from 'react';
import { Order, StoreSettings } from '../../types';
import { X, Printer, CheckCircle2, Truck, Calendar, MapPin, Phone, Mail, ShoppingBag } from 'lucide-react';
import { StoreLogo } from '../common/StoreLogo';

interface OrderInvoiceModalProps {
  order: Order | null;
  settings: StoreSettings;
  onClose: () => void;
}

export const OrderInvoiceModal: React.FC<OrderInvoiceModalProps> = ({ order, settings, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden text-slate-800 border border-slate-200">
        {/* Header toolbar (Hidden in print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold text-sm">Official Order Invoice #{order.orderNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Area */}
        <div className="p-8 print:p-0" id="printable-invoice">
          {/* Top Brand & Metadata */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <StoreLogo size="md" variant="emblem" />
                <div>
                  <h1 className="text-xl font-black font-serif tracking-tight text-slate-900">
                    Sanjida Food Store
                  </h1>
                  <span className="text-[10px] font-bold tracking-widest text-amber-600 uppercase">
                    100% Halal • Quality Assured
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">{settings.tagline}</p>
              <div className="text-xs text-slate-600 mt-2 space-y-0.5">
                <p>{settings.address}</p>
                <p>Hotline: {settings.contactPhone} | {settings.contactEmail}</p>
              </div>
            </div>

            <div className="sm:text-right">
              <div className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                {order.orderStatus.replace('_', ' ')}
              </div>
              <p className="text-2xl font-black text-slate-900">#{order.orderNumber}</p>
              <p className="text-xs text-slate-500 mt-1">
                Date: {new Date(order.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
              </p>
              <p className="text-xs text-slate-500">
                Payment: <span className="font-semibold text-slate-700">{order.paymentMethod}</span> ({order.paymentStatus})
              </p>
            </div>
          </div>

          {/* Customer & Delivery Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-slate-200 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 text-emerald-800">
                Customer Details
              </h3>
              <p className="font-semibold text-slate-800 text-sm">{order.customerName}</p>
              <p className="flex items-center gap-1.5 text-slate-600 mt-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {order.customerPhone}
              </p>
              {order.customerEmail && (
                <p className="flex items-center gap-1.5 text-slate-600 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {order.customerEmail}
                </p>
              )}
            </div>

            <div>
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 text-emerald-800">
                Delivery Destination
              </h3>
              <p className="flex items-start gap-1.5 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{order.deliveryAddress}, {order.deliveryCity}</span>
              </p>
              <p className="flex items-center gap-1.5 text-slate-600 mt-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Slot: <span className="font-medium text-slate-800">{order.deliverySlot}</span>
              </p>
              {order.notes && (
                <p className="text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded mt-2 border border-amber-200">
                  Note: {order.notes}
                </p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="py-5">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                  <th className="pb-2">Item Description</th>
                  <th className="pb-2 text-center">Unit</th>
                  <th className="pb-2 text-center">Qty</th>
                  <th className="pb-2 text-right">Price</th>
                  <th className="pb-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="py-2.5">
                    <td className="py-2.5 font-medium text-slate-800">{item.productName}</td>
                    <td className="py-2.5 text-center text-slate-500">{item.unit}</td>
                    <td className="py-2.5 text-center font-semibold text-slate-700">{item.quantity}</td>
                    <td className="py-2.5 text-right text-slate-600">{settings.currency}{item.price}</td>
                    <td className="py-2.5 text-right font-bold text-slate-900">{settings.currency}{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subtotals & Total */}
          <div className="pt-4 border-t border-slate-200 flex flex-col items-end text-xs">
            <div className="w-full sm:w-64 space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal:</span>
                <span className="font-medium">{settings.currency}{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge:</span>
                <span className="font-medium">{order.deliveryFee === 0 ? 'FREE' : `${settings.currency}${order.deliveryFee}`}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount ({order.couponCode || 'Promo'}):</span>
                  <span>-{settings.currency}{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-300">
                <span>Net Total Payable:</span>
                <span className="text-emerald-700">{settings.currency}{order.total}</span>
              </div>
            </div>
          </div>

          {/* Footer Thank you */}
          <div className="mt-8 pt-4 border-t border-dashed border-slate-200 text-center text-xs text-slate-500">
            <p className="font-medium text-slate-700">Thank you for ordering with {settings.storeName}!</p>
            <p className="text-[11px] mt-0.5">For any query regarding this order, please call {settings.contactPhone}</p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Close Invoice
          </button>
        </div>
      </div>
    </div>
  );
};
