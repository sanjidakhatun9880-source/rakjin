import React from 'react';
import { Product, StoreSettings } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Plus, Minus, ShoppingBag, Shield, Check, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  settings: StoreSettings;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, settings }) => {
  const { cart, addToCart, updateCartQuantity } = useStore();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;

  const currentPrice = product.salePrice ?? product.price;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group">
      {/* Image Container */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isHalal && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/80 backdrop-blur-xs text-emerald-300 text-[10px] font-bold border border-emerald-500/30 shadow-xs">
              <Shield className="w-2.5 h-2.5" />
              Halal
            </span>
          )}
          {product.isOrganic && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-teal-950/80 backdrop-blur-xs text-teal-300 text-[10px] font-bold border border-teal-500/30 shadow-xs">
              Organic
            </span>
          )}
        </div>

        {/* Sale Tag */}
        {product.salePrice && (
          <div className="absolute top-2.5 right-2.5 bg-rose-600 text-white font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow">
            Save {settings.currency}{product.price - product.salePrice}
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-white font-bold text-xs uppercase tracking-wider">
            Sold Out
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Unit */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-medium text-emerald-800">{product.category}</span>
            <span className="font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              {product.unit}
            </span>
          </div>

          {/* Titles */}
          <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
            {product.name}
          </h3>
          {product.banglaName && (
            <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
              {product.banglaName}
            </p>
          )}

          {/* Description */}
          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900">
                {settings.currency}{currentPrice}
              </span>
              {product.salePrice && (
                <span className="text-xs text-slate-400 line-through">
                  {settings.currency}{product.price}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 block leading-none">
              Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </span>
          </div>

          {/* Add to Cart / Quantity Stepper */}
          {isOutOfStock ? (
            <button
              disabled
              className="px-3 py-1.5 bg-slate-100 text-slate-400 text-xs font-semibold rounded-xl cursor-not-allowed"
            >
              Out of Stock
            </button>
          ) : currentQuantity === 0 ? (
            <button
              onClick={() => addToCart(product, 1)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer hover:shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 rounded-xl p-1 text-emerald-950">
              <button
                onClick={() => updateCartQuantity(product.id, currentQuantity - 1)}
                className="w-6 h-6 rounded-lg bg-white shadow-xs flex items-center justify-center text-emerald-800 hover:bg-emerald-100 cursor-pointer transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-xs font-black">{currentQuantity}</span>
              <button
                onClick={() => updateCartQuantity(product.id, currentQuantity + 1)}
                disabled={currentQuantity >= product.stock}
                className="w-6 h-6 rounded-lg bg-emerald-700 text-white shadow-xs flex items-center justify-center hover:bg-emerald-800 cursor-pointer transition-colors disabled:opacity-40"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
