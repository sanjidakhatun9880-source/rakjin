import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Coupon } from '../../../types';
import { Plus, Tag, ToggleLeft, ToggleRight, Trash2, Percent, DollarSign, Calendar } from 'lucide-react';

export const CouponsView: React.FC = () => {
  const { coupons, addCoupon, toggleCoupon, deleteCoupon, settings } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percent' | 'flat'>('percent');
  const [discountValue, setDiscountValue] = useState('10');
  const [minOrder, setMinOrder] = useState('1000');
  const [maxDiscount, setMaxDiscount] = useState('250');
  const [expiryDate, setExpiryDate] = useState('2026-12-31');
  const [description, setDescription] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    addCoupon({
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: parseFloat(discountValue) || 0,
      minOrder: parseFloat(minOrder) || 0,
      maxDiscount: maxDiscount ? parseFloat(maxDiscount) : undefined,
      expiryDate,
      isActive: true,
      description: description.trim() || 'Store promotional discount voucher'
    });

    setCode('');
    setDescription('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Promotions & Discount Coupons</h1>
          <p className="text-xs text-slate-500">
            Create promotional voucher codes for grocery shoppers with minimum cart spend limits.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancel' : 'Create New Coupon'}</span>
        </button>
      </div>

      {/* Add Coupon Form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="p-5 bg-white border border-emerald-300 rounded-2xl shadow-sm space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-slate-800">Create New Store Promo Voucher</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Coupon Promo Code *</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. FESTIVE20"
                required
                className="w-full px-3 py-2 text-xs font-mono font-bold uppercase border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Discount Type</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as 'percent' | 'flat')}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option value="percent">Percentage (%)</option>
                <option value="flat">Flat Amount ({settings.currency})</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Discount Value ({discountType === 'percent' ? '%' : settings.currency}) *
              </label>
              <input
                type="number"
                min="1"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Min Order Spend ({settings.currency})
              </label>
              <input
                type="number"
                min="0"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Max Cap Discount ({settings.currency})
              </label>
              <input
                type="number"
                min="0"
                value={maxDiscount}
                onChange={(e) => setMaxDiscount(e.target.value)}
                placeholder="Leave empty for no limit"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Coupon Description / Rule</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 10% off on all organic fresh vegetables & spices"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg shadow cursor-pointer"
            >
              Save Coupon
            </button>
          </div>
        </form>
      )}

      {/* Coupons List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coupons.map((c) => (
          <div
            key={c.id}
            className={`p-5 bg-white border rounded-2xl shadow-xs flex flex-col justify-between transition-all ${
              c.isActive ? 'border-slate-200' : 'border-slate-200 opacity-60 bg-slate-50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono font-black text-sm px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg tracking-wider">
                  {c.code}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  c.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {c.isActive ? 'ACTIVE' : 'PAUSED'}
                </span>
              </div>

              <div className="text-lg font-black text-slate-900 mb-1">
                {c.discountType === 'percent' ? `${c.discountValue}% OFF` : `${settings.currency}${c.discountValue} FLAT OFF`}
              </div>
              <p className="text-xs text-slate-600 mb-3">{c.description}</p>

              <div className="space-y-1 text-xs text-slate-500 pt-3 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Min Order:</span>
                  <span className="font-semibold text-slate-700">{settings.currency}{c.minOrder}</span>
                </div>
                {c.maxDiscount && (
                  <div className="flex justify-between">
                    <span>Max Discount Cap:</span>
                    <span className="font-semibold text-slate-700">{settings.currency}{c.maxDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Usage Redemptions:</span>
                  <span className="font-semibold text-slate-700">{c.usageCount} orders</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Valid Until:</span>
                  <span>{c.expiryDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100 text-xs">
              <button
                onClick={() => toggleCoupon(c.id)}
                className="flex items-center gap-1.5 font-medium text-slate-700 hover:text-emerald-700 cursor-pointer"
              >
                {c.isActive ? (
                  <>
                    <ToggleRight className="w-5 h-5 text-emerald-600" />
                    <span>Active</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-5 h-5 text-slate-400" />
                    <span>Inactive</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Delete coupon code "${c.code}"?`)) {
                    deleteCoupon(c.id);
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                title="Delete Coupon"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
