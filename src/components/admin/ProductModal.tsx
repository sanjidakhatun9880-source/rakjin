import React, { useState, useEffect } from 'react';
import { Product, Category, StoreSettings } from '../../types';
import { X, Image as ImageIcon, Save, Check, Shield } from 'lucide-react';

interface ProductModalProps {
  product: Product | null; // null means adding new product
  categories: Category[];
  settings: StoreSettings;
  onSave: (data: Omit<Product, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

const PRESET_IMAGES = [
  { name: 'Kalijira Rice', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80' },
  { name: 'Mustard Oil', url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80' },
  { name: 'Halal Beef Cuts', url: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80' },
  { name: 'River Hilsa Fish', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80' },
  { name: 'Artisanal Ghee', url: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=600&q=80' },
  { name: 'Turmeric & Spices', url: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=600&q=80' },
  { name: 'Fresh Potatoes', url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80' },
  { name: 'Red Lentils (Dal)', url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Tea Leaves', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
  { name: 'Chanachur Snacks', url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80' },
  { name: 'Fresh Chicken', url: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=600&q=80' },
  { name: 'Green Cardamom', url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80' },
];

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  categories,
  settings,
  onSave,
  onClose
}) => {
  const [name, setName] = useState(product?.name || '');
  const [banglaName, setBanglaName] = useState(product?.banglaName || '');
  const [category, setCategory] = useState(product?.category || categories[0]?.name || 'Rice, Grains & Dal');
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [salePrice, setSalePrice] = useState(product?.salePrice?.toString() || '');
  const [unit, setUnit] = useState(product?.unit || '1 kg');
  const [stock, setStock] = useState(product?.stock?.toString() || '25');
  const [sku, setSku] = useState(product?.sku || `SFS-${Math.floor(100 + Math.random() * 900)}`);
  const [image, setImage] = useState(product?.image || PRESET_IMAGES[0].url);
  const [description, setDescription] = useState(product?.description || '');
  const [isHalal, setIsHalal] = useState(product?.isHalal !== undefined ? product.isHalal : true);
  const [isOrganic, setIsOrganic] = useState(product?.isOrganic || false);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured || false);
  const [tagsInput, setTagsInput] = useState(product?.tags?.join(', ') || 'Fresh, Halal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedPrice = parseFloat(price) || 0;
    const parsedSalePrice = salePrice ? parseFloat(salePrice) : undefined;
    const parsedStock = parseInt(stock, 10) || 0;
    const parsedTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    onSave({
      name: name.trim(),
      banglaName: banglaName.trim() || undefined,
      category,
      price: parsedPrice,
      salePrice: parsedSalePrice && parsedSalePrice < parsedPrice ? parsedSalePrice : undefined,
      unit: unit.trim(),
      stock: parsedStock,
      sku: sku.trim() || `SFS-${Date.now().toString().slice(-4)}`,
      image: image.trim(),
      description: description.trim(),
      isHalal,
      isOrganic,
      isFeatured,
      rating: product?.rating || 5.0,
      reviewsCount: product?.reviewsCount || 1,
      tags: parsedTags
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden text-slate-800 border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div>
            <h2 className="text-base font-bold">
              {product ? 'Edit Grocery Item' : 'Add New Grocery Product'}
            </h2>
            <p className="text-xs text-slate-400">
              {product ? `Update catalog details for SKU: ${product.sku}` : 'Add a new food item to Sanjida Food Store'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto space-y-5">
          {/* Row 1: English & Bangla Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Product Title (English) *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Royal Shahi Kalijira Rice"
                required
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bangla Title (Optional)
              </label>
              <input
                type="text"
                value={banglaName}
                onChange={(e) => setBanglaName(e.target.value)}
                placeholder="e.g. কালিজিরা পোলাও চাল"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Row 2: Category & SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Stock Keeping Unit (SKU)
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Row 3: Pricing & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Regular Price ({settings.currency}) *
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 180"
                required
                className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sale Price ({settings.currency})
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="e.g. 165"
                className="w-full px-3 py-2 text-sm font-semibold text-emerald-700 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Selling Unit *
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g. 1 kg, 500 gm, 1 Liter"
                required
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Row 4: Stock Quantity & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Available Stock Count *
              </label>
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="25"
                required
                className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Items below 10 units automatically trigger low stock alerts.
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Search Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Fresh, Halal, Best Seller"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Image URL & Preset Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Product Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                required
                className="flex-1 px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
              <img
                src={image}
                alt="preview"
                className="w-10 h-10 object-cover rounded-lg border border-slate-300 bg-slate-100 shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                }}
              />
            </div>

            {/* Presets Gallery */}
            <div className="mt-2">
              <p className="text-[11px] text-slate-500 mb-1.5 font-medium">Or choose quick high-res grocery preset:</p>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setImage(preset.url)}
                    className={`px-2 py-1 text-[11px] rounded border transition-colors cursor-pointer ${
                      image === preset.url
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description & Highlights
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Freshly sourced, hygienic packaging, 100% natural..."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Badges and Flags */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <p className="text-xs font-bold text-slate-700">Product Badges & Highlights</p>
            <div className="flex flex-wrap gap-4 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isHalal}
                  onChange={(e) => setIsHalal(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-slate-800 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  100% Halal Certified
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOrganic}
                  onChange={(e) => setIsOrganic(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-slate-800">100% Organic / Chemical-Free</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-slate-800">Feature on Storefront Homepage</span>
              </label>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow cursor-pointer transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{product ? 'Save Changes' : 'Publish Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
