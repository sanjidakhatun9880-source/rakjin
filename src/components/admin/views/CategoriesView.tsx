import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Category } from '../../../types';
import { Plus, Edit2, Trash2, Layers, Tag, Check, X } from 'lucide-react';

export const CategoriesView: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [banglaName, setBanglaName] = useState('');
  const [description, setDescription] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editBangla, setEditBangla] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCategory({
      name: name.trim(),
      banglaName: banglaName.trim() || undefined,
      description: description.trim(),
      icon: 'Tag',
      slug: name.toLowerCase().replace(/\s+/g, '-')
    });

    setName('');
    setBanglaName('');
    setDescription('');
    setIsAdding(false);
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditBangla(cat.banglaName || '');
    setEditDesc(cat.description || '');
  };

  const saveEdit = (id: string) => {
    if (!editName.trim()) return;
    updateCategory(id, {
      name: editName.trim(),
      banglaName: editBangla.trim() || undefined,
      description: editDesc.trim(),
      slug: editName.toLowerCase().replace(/\s+/g, '-')
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Food Categories Management</h1>
          <p className="text-xs text-slate-500">
            Structure your store catalog into organized grocery departments with bilingual naming support.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancel' : 'New Category'}</span>
        </button>
      </div>

      {/* Add New Category Form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="p-5 bg-white border border-emerald-300 rounded-2xl shadow-sm space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-slate-800">Add New Food Department / Category</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category Name (English) *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Organic Honey & Pickles"
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Bangla Name (Optional)</label>
              <input
                type="text"
                value={banglaName}
                onChange={(e) => setBanglaName(e.target.value)}
                placeholder="e.g. খাঁটি মধু ও আচার"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Fresh hand-harvested honey, homemade achars, and chutneys"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
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
              Create Category
            </button>
          </div>
        </form>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat.name).length;
          const isEditing = editingId === cat.id;

          return (
            <div key={cat.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col justify-between">
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600">English Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-2.5 py-1 text-xs border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600">Bangla Name</label>
                    <input
                      type="text"
                      value={editBangla}
                      onChange={(e) => setEditBangla(e.target.value)}
                      className="w-full px-2.5 py-1 text-xs border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600">Description</label>
                    <input
                      type="text"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="w-full px-2.5 py-1 text-xs border rounded"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => saveEdit(cat.id)}
                      className="px-3 py-1 bg-emerald-600 text-white font-semibold rounded text-xs"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{cat.name}</h3>
                      {cat.banglaName && (
                        <p className="text-xs text-emerald-700 font-medium">{cat.banglaName}</p>
                      )}
                      <p className="text-xs text-slate-500 mt-1">{cat.description}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold shrink-0">
                      {count} items
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100 text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">slug: /{cat.slug}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => startEdit(cat)}
                        className="p-1.5 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100 cursor-pointer"
                        title="Edit Category"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (count > 0) {
                            alert(`Cannot delete category "${cat.name}" because it contains ${count} products. Reassign or delete the products first.`);
                            return;
                          }
                          if (window.confirm(`Delete category "${cat.name}"?`)) {
                            deleteCategory(cat.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 cursor-pointer"
                        title="Delete Category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
