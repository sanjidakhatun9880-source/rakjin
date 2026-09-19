import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { AlertTriangle, CheckCircle, Plus, Search, ArrowUpDown, Package, Layers } from 'lucide-react';

export const InventoryView: React.FC = () => {
  const { products, bulkRestock, settings } = useStore();
  const [stockFilter, setStockFilter] = useState<'all' | 'critical' | 'low' | 'healthy'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());

    if (stockFilter === 'critical') return matchesSearch && p.stock <= 5;
    if (stockFilter === 'low') return matchesSearch && p.stock > 5 && p.stock <= 10;
    if (stockFilter === 'healthy') return matchesSearch && p.stock > 10;
    return matchesSearch;
  });

  const totalInventoryUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const totalStockValuation = products.reduce((acc, p) => acc + p.stock * p.price, 0);
  const criticalCount = products.filter((p) => p.stock <= 5).length;
  const lowCount = products.filter((p) => p.stock > 5 && p.stock <= 10).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Inventory & Stock Operations</h1>
        <p className="text-xs text-slate-500">
          Monitor real-time warehouse inventory, manage safety stock levels, and perform fast single-click restocks.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Total Stock Valuation</span>
          <span className="text-xl font-extrabold text-slate-900 mt-1 block">
            {settings.currency}{totalStockValuation.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">{totalInventoryUnits} total retail units</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Critical Stock (&le; 5 units)</span>
          <span className="text-xl font-extrabold text-rose-600 mt-1 block">
            {criticalCount} items
          </span>
          <span className="text-[11px] text-rose-500 font-medium mt-1 block">Immediate reorder needed</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Low Stock (&le; 10 units)</span>
          <span className="text-xl font-extrabold text-amber-600 mt-1 block">
            {lowCount} items
          </span>
          <span className="text-[11px] text-amber-600 font-medium mt-1 block">Watchlist alert</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Cataloged SKUs</span>
          <span className="text-xl font-extrabold text-emerald-700 mt-1 block">
            {products.length} products
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">In 8 active categories</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter inventory by item name or SKU..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div className="flex gap-1.5">
          <button
            onClick={() => setStockFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              stockFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All ({products.length})
          </button>
          <button
            onClick={() => setStockFilter('critical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              stockFilter === 'critical' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            Critical ({criticalCount})
          </button>
          <button
            onClick={() => setStockFilter('low')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              stockFilter === 'low' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            Low ({lowCount})
          </button>
          <button
            onClick={() => setStockFilter('healthy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              stockFilter === 'healthy' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Healthy Stock
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                <th className="py-3.5 px-4">Item & SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Current Stock</th>
                <th className="py-3.5 px-4">Stock Status</th>
                <th className="py-3.5 px-4 text-right">Quick Restock Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const isCritical = p.stock <= 5;
                const isLow = p.stock > 5 && p.stock <= 10;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{p.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">SKU: {p.sku}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {p.category}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-sm font-extrabold text-slate-900">
                        {p.stock}
                      </span>{' '}
                      <span className="text-slate-500 text-[11px]">{p.unit}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      {isCritical ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-100 text-rose-800 rounded-full text-[11px] font-bold border border-rose-200">
                          <AlertTriangle className="w-3 h-3" />
                          Critical Low
                        </span>
                      ) : isLow ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-[11px] font-bold border border-amber-200">
                          <AlertTriangle className="w-3 h-3" />
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-bold border border-emerald-200">
                          <CheckCircle className="w-3 h-3" />
                          Adequate
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => bulkRestock(p.id, 10)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                        >
                          +10 {p.unit}
                        </button>
                        <button
                          onClick={() => bulkRestock(p.id, 25)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                        >
                          +25
                        </button>
                        <button
                          onClick={() => bulkRestock(p.id, 50)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                        >
                          +50
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
