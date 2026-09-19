import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PaymentMethod, Order } from '../../types';
import { X, CheckCircle2, ShoppingBag, Truck, MapPin, Phone, CreditCard, Wallet, Banknote, Calendar, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const { cart, appliedCoupon, clearCart, placeCustomerOrder, settings } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Dhaka');
  const [deliverySlot, setDeliverySlot] = useState('Morning (9:00 AM - 1:00 PM)');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const isFreeDelivery = subtotal >= settings.freeDeliveryThreshold;
  const deliveryFee = isFreeDelivery ? 0 : settings.standardDeliveryFee;

  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountType === 'percent') {
      discountAmount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
        discountAmount = appliedCoupon.maxDiscount;
      }
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  const finalTotal = Math.max(0, subtotal + deliveryFee - discountAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) return;

    setIsSubmitting(true);

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      price: item.product.salePrice ?? item.product.price,
      quantity: item.quantity,
      unit: item.product.unit,
      image: item.product.image,
      total: (item.product.salePrice ?? item.product.price) * item.quantity
    }));

    setTimeout(() => {
      const placed = placeCustomerOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || 'shopper@sanjidafoodstore.com',
        deliveryAddress: deliveryAddress.trim(),
        deliveryCity: deliveryCity.trim(),
        deliverySlot,
        paymentMethod,
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
        orderStatus: 'pending',
        items: orderItems,
        subtotal,
        deliveryFee,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        total: finalTotal,
        notes: notes.trim() || undefined
      });

      clearCart();
      setIsSubmitting(false);
      onOrderSuccess(placed);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden text-slate-800 border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-800 text-white">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-300" />
            <h2 className="font-extrabold text-base">Complete Your Grocery Order</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[82vh] overflow-y-auto space-y-6">
          {/* Order Summary Pill */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-emerald-950 block">
                {cart.length} item{cart.length !== 1 ? 's' : ''} in grocery basket
              </span>
              <span className="text-emerald-700">
                Delivery: {deliveryFee === 0 ? 'FREE' : `${settings.currency}${deliveryFee}`}
              </span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block text-[11px]">Total Payable:</span>
              <span className="text-lg font-black text-emerald-900">
                {settings.currency}{finalTotal}
              </span>
            </div>
          </div>

          {/* Customer & Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-emerald-800">
              1. Customer & Contact Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Nusrat Jahan"
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Phone Number *
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. +880 1712-345678"
                  required
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address (For invoice & updates)
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="e.g. customer@example.com"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Delivery Location */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-emerald-800">
              2. Delivery Address & Preferred Time
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  House / Flat / Road / Sector Address *
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="House 24, Road 4, Sector 7, Uttara"
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City / Zone *
                </label>
                <select
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-emerald-600"
                >
                  <option value="Dhaka">Dhaka (All Zones)</option>
                  <option value="Uttara">Dhaka - Uttara</option>
                  <option value="Gulshan & Banani">Dhaka - Gulshan & Banani</option>
                  <option value="Dhanmondi">Dhaka - Dhanmondi</option>
                  <option value="Mirpur">Dhaka - Mirpur</option>
                  <option value="Mohammadpur">Dhaka - Mohammadpur</option>
                  <option value="Bashundhara R/A">Dhaka - Bashundhara R/A</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Delivery Time Slot
              </label>
              <select
                value={deliverySlot}
                onChange={(e) => setDeliverySlot(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-emerald-600"
              >
                <option value="Express 60-Minute Delivery">Express Delivery (Next 60 Minutes)</option>
                <option value="Morning (9:00 AM - 1:00 PM)">Morning Slot (9:00 AM - 1:00 PM)</option>
                <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon Slot (2:00 PM - 5:00 PM)</option>
                <option value="Evening (5:00 PM - 8:30 PM)">Evening Slot (5:00 PM - 8:30 PM)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Please ring the doorbell or leave with building security"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-emerald-800">
              3. Select Payment Method
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={() => setPaymentMethod('Cash on Delivery')}
                  className="sr-only"
                />
                <Banknote className="w-5 h-5 text-emerald-700" />
                <span className="text-xs">Cash on Delivery</span>
                <span className="text-[10px] text-slate-400 font-normal">Pay at your doorstep</span>
              </label>

              <label
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'bKash / Mobile Banking'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="bKash / Mobile Banking"
                  checked={paymentMethod === 'bKash / Mobile Banking'}
                  onChange={() => setPaymentMethod('bKash / Mobile Banking')}
                  className="sr-only"
                />
                <Wallet className="w-5 h-5 text-emerald-700" />
                <span className="text-xs">bKash / Nagad / Rocket</span>
                <span className="text-[10px] text-slate-400 font-normal">Mobile banking wallet</span>
              </label>

              <label
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'Credit / Debit Card'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Credit / Debit Card"
                  checked={paymentMethod === 'Credit / Debit Card'}
                  onChange={() => setPaymentMethod('Credit / Debit Card')}
                  className="sr-only"
                />
                <CreditCard className="w-5 h-5 text-emerald-700" />
                <span className="text-xs">Credit / Debit Card</span>
                <span className="text-[10px] text-slate-400 font-normal">Visa / MasterCard</span>
              </label>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Placing Order...</span>
              ) : (
                <>
                  <span>Place Grocery Order ({settings.currency}{finalTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
