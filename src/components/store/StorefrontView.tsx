import React, { useState, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, Product } from '../../types';
import { StoreHeader } from './StoreHeader';
import { HeroBanner } from './HeroBanner';
import { ProductCard } from './ProductCard';
import { CartDrawer } from './CartDrawer';
import { CheckoutModal } from './CheckoutModal';
import { TrackOrderModal } from './TrackOrderModal';
import { OrderSuccessModal } from './OrderSuccessModal';
import { StoreFooter } from './StoreFooter';
import { Filter, Sparkles, Shield, Flame, Check, Tag } from 'lucide-react';

interface StorefrontViewProps {
  onTriggerAdminAuth: () => void;
}

export const StorefrontView: React.FC<StorefrontViewProps> = ({ onTriggerAdminAuth }) => {
  const { products, categories, settings } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'halal' | 'organic' | 'deals'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const productSectionRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.banglaName && product.banglaName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesCategory || !matchesSearch) return false;

    if (filterType === 'halal') return product.isHalal;
    if (filterType === 'organic') return product.isOrganic;
    if (filterType === 'deals') return Boolean(product.salePrice);

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Customer Header - Zero Admin Links */}
      <StoreHeader
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={(val) => setSearchTerm(val)}
      />

      {/* Main Storefront Body */}
      <main className="flex-1">
        {/* Hero Promotional Banner */}
        <HeroBanner onScrollToProducts={scrollToProducts} />

        {/* Categories Bar */}
        <section ref={productSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Fresh Departments & Groceries
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Handpicked farm-fresh vegetables, organic pantry staples, and premium halal butcher cuts.
              </p>
            </div>
          </div>

          {/* Category Pills Slider */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                selectedCategory === 'all'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Items ({products.length})
            </button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat.name).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.name
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === cat.name
                        ? 'bg-emerald-800 text-emerald-100'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Filter Tags (Halal, Organic, Deals) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200/80 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>

              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300/70'
                }`}
              >
                All
              </button>

              <button
                onClick={() => setFilterType('halal')}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  filterType === 'halal'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <Shield className="w-3 h-3" />
                <span>100% Halal Verified</span>
              </button>

              <button
                onClick={() => setFilterType('organic')}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  filterType === 'organic'
                    ? 'bg-teal-700 text-white'
                    : 'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Certified Organic</span>
              </button>

              <button
                onClick={() => setFilterType('deals')}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  filterType === 'deals'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                <Flame className="w-3 h-3 text-rose-500" />
                <span>Special Offers & Deals</span>
              </button>
            </div>

            <div className="text-xs text-slate-400">
              Showing <span className="font-bold text-slate-700">{filteredProducts.length}</span> items
            </div>
          </div>
        </section>

        {/* Product Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
              <p className="text-base font-bold text-slate-800 mb-1">No grocery items found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try selecting another department category or clearing your search filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setFilterType('all');
                  setSearchTerm('');
                }}
                className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} settings={settings} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(order) => {
          setIsCheckoutOpen(false);
          setPlacedOrder(order);
        }}
      />

      {/* Track Order Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
      />

      {/* Order Placed Success Modal */}
      <OrderSuccessModal
        order={placedOrder}
        settings={settings}
        onClose={() => setPlacedOrder(null)}
        onTrackOrder={() => {
          setPlacedOrder(null);
          setIsTrackOrderOpen(true);
        }}
      />

      {/* Store Footer - with discrete easter egg */}
      <StoreFooter onSecretAdminTrigger={onTriggerAdminAuth} />
    </div>
  );
};
