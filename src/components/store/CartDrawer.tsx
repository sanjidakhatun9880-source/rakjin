import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout
}) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    settings
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return acc + price * item.quantity;
  }, 0);

  // Delivery calculation
  const isFreeDelivery = subtotal >= settings.freeDeliveryThreshold;
  const deliveryFee = isFreeDelivery ? 0 : settings.standardDeliveryFee;
  const remainingForFree = Math.max(0, settings.freeDeliveryThreshold - subtotal);

  // Discount calculation
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

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCouponCode(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-sm">Shopping Basket</h2>
                <p className="text-[11px] text-slate-500">
                  {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Clear basket"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free delivery tracker */}
          <div className="px-5 py-3 bg-emerald-50/80 border-b border-emerald-100 text-xs text-emerald-950">
            {isFreeDelivery ? (
              <div className="flex items-center gap-2 font-bold text-emerald-800">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You unlocked FREE Express Doorstep Delivery!</span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-emerald-800 mb-1">
                  <span>Add {settings.currency}{remainingForFree} more for FREE delivery</span>
                  <span>{Math.round((subtotal / settings.freeDeliveryThreshold) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-emerald-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / settings.freeDeliveryThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="font-bold text-slate-700 text-sm">Your basket is empty</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Explore our fresh produce, halal meats, fragrant rice, and organic spices to add items.
                </p>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.product.salePrice ?? item.product.price;
                const itemTotal = itemPrice * item.quantity;

                return (
                  <div key={item.product.id} className="py-4 flex gap-3 first:pt-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-xs truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {settings.currency}{itemPrice} / {item.product.unit}
                      </div>

                      <div className="flex items-center justify-between mt-2.5">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg p-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="w-5 h-5 rounded bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-5 h-5 rounded bg-emerald-700 text-white hover:bg-emerald-800 flex items-center justify-center cursor-pointer disabled:opacity-40"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Item total & delete */}
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-900 text-sm">
                            {settings.currency}{itemTotal}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-400 hover:text-rose-600 cursor-pointer p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Checkout Section */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50/80 space-y-4">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-100/70 border border-emerald-200 rounded-xl text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-700" />
                      <span className="font-mono font-bold text-emerald-900">{appliedCoupon.code}</span>
                      <span className="text-emerald-700 font-medium">applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Promo code (e.g. SANJIDA10)"
                      className="flex-1 px-3 py-1.5 text-xs font-mono uppercase bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponFeedback && !appliedCoupon && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">{settings.currency}{subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Charge</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `${settings.currency}${deliveryFee}`
                    )}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>-{settings.currency}{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-emerald-800">{settings.currency}{finalTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
