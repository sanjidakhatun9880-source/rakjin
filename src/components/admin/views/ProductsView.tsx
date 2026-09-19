import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Product } from '../../../types';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Shield,
  Tag,
  TrendingDown
} from 'lucide-react';

interface ProductsViewProps {
  onOpenAddModal: () => void;
  onOpenEditModal: (product: Product) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ onOpenAddModal, onOpenEditModal }) => {
  const { products, categories, deleteProduct, bulkRestock, settings } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.banglaName && p.banglaName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Food & Grocery Catalog</h1>
          <p className="text-xs text-slate-500">
            Add new grocery items, update pricing, manage stock levels, and control halal & organic certification flags.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search catalog by name, Bangla name, or SKU..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        {/* Category Filter */}
        <div className="sm:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-emerald-600"
          >
            <option value="all">All Food Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                <th className="py-3.5 px-4">Item & Info</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price & Unit</th>
                <th className="py-3.5 px-4">Stock Level</th>
                <th className="py-3.5 px-4">Badges</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const isLow = p.stock <= 10;
                const isOut = p.stock === 0;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Item Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-slate-900 block truncate max-w-xs sm:max-w-sm">
                            {p.name}
                          </span>
                          {p.banglaName && (
                            <span className="text-[11px] text-emerald-800 font-medium block">
                              {p.banglaName}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 font-mono">
                            SKU: {p.sku}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {p.category}
                    </td>

                    {/* Price & Unit */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-slate-900 text-sm">
                          {settings.currency}{p.salePrice ?? p.price}
                        </span>
                        {p.salePrice && (
                          <span className="line-through text-slate-400 text-[11px]">
                            {settings.currency}{p.price}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 block">per {p.unit}</span>
                    </td>

                    {/* Stock */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold text-xs ${
                            isOut
                              ? 'text-rose-600'
                              : isLow
                              ? 'text-amber-600'
                              : 'text-slate-800'
                          }`}
                        >
                          {p.stock} {p.unit}
                        </span>
                        {isLow && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                            Low
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <button
                          onClick={() => bulkRestock(p.id, 10)}
                          className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] cursor-pointer"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => bulkRestock(p.id, 25)}
                          className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] cursor-pointer"
                        >
                          +25
                        </button>
                      </div>
                    </td>

                    {/* Badges */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {p.isHalal && (
                          <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[10px] font-semibold flex items-center gap-0.5">
                            <Shield className="w-2.5 h-2.5" />
                            Halal
                          </span>
                        )}
                        {p.isOrganic && (
                          <span className="px-1.5 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 rounded text-[10px] font-semibold">
                            Organic
                          </span>
                        )}
                        {p.isFeatured && (
                          <span className="px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-[10px] font-semibold">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => onOpenEditModal(p)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${p.name}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
