import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, Order } from '../../types';
import { DashboardView } from './views/DashboardView';
import { OrdersView } from './views/OrdersView';
import { ProductsView } from './views/ProductsView';
import { InventoryView } from './views/InventoryView';
import { CategoriesView } from './views/CategoriesView';
import { CouponsView } from './views/CouponsView';
import { CustomersView } from './views/CustomersView';
import { SecurityAuditView } from './views/SecurityAuditView';
import { SettingsView } from './views/SettingsView';
import { ProductModal } from './ProductModal';
import { OrderInvoiceModal } from './OrderInvoiceModal';
import { StoreLogo } from '../common/StoreLogo';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  AlertTriangle,
  Tag,
  Users,
  ShieldCheck,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Menu,
  X,
  Bell,
  CheckCircle2,
  Store
} from 'lucide-react';

interface AdminLayoutProps {
  onSwitchToStore: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onSwitchToStore }) => {
  const {
    settings,
    orders,
    products,
    categories,
    auditLogs,
    adminSession,
    logoutAdmin,
    addProduct,
    updateProduct
  } = useStore();

  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Counts for badges
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'pending').length;
  const lowStockCount = products.filter((p) => p.stock <= 10).length;
  const securityAlertsCount = auditLogs.filter((l) => l.severity === 'critical').length;

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (data: Omit<Product, 'id' | 'createdAt'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
    } else {
      addProduct(data);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} new` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    { id: 'products', label: 'Products', icon: Package, badge: `${products.length}` },
    { id: 'categories', label: 'Categories', icon: Layers },
    {
      id: 'inventory',
      label: 'Stock Alerts',
      icon: AlertTriangle,
      badge: lowStockCount > 0 ? `${lowStockCount} low` : undefined,
      badgeColor: 'bg-rose-100 text-rose-800'
    },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'customers', label: 'Customers', icon: Users },
    {
      id: 'audit',
      label: 'Security Logs',
      icon: ShieldCheck,
      badge: securityAlertsCount > 0 ? `${securityAlertsCount} alerts` : undefined,
      badgeColor: 'bg-rose-100 text-rose-800'
    },
    { id: 'settings', label: 'Store Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-3">
              <StoreLogo size="sm" variant="emblem" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold font-serif text-sm sm:text-base tracking-tight text-white">
                    Sanjida Food Store
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    Admin Portal
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Private Administration & Operations Console
                </p>
              </div>
            </div>
          </div>

          {/* Right: Quick actions, Owner info, Switch to Store, Logout */}
          <div className="flex items-center gap-3">
            {/* Live Store link (strictly for the logged in owner to preview their storefront) */}
            <button
              onClick={onSwitchToStore}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 cursor-pointer transition-colors"
              title="Preview customer storefront"
            >
              <Store className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Preview Customer Storefront</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>

            {/* Quick Add Product */}
            <button
              onClick={handleOpenAddProduct}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Product</span>
            </button>

            {/* Administrator Profile Pill */}
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                SK
              </div>
              <div className="text-left text-xs">
                <div className="font-semibold text-white flex items-center gap-1">
                  <span>Sanjida Khatun</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {settings.adminEmail}
                </div>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={logoutAdmin}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
              title="Lock Admin Console & Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:block pt-16 lg:pt-0 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 h-full flex flex-col justify-between overflow-y-auto">
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Store Operations
              </p>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          item.badgeColor || (isActive ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-300')
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Security Card */}
            <div className="pt-4 border-t border-slate-800 mt-6">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Single-Admin Restriction</span>
                </div>
                <p className="text-slate-400 text-[10px]">
                  Exclusive Access: <span className="text-slate-200 font-mono">{settings.adminEmail}</span>
                </p>
                <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-900 flex justify-between">
                  <span>Public Links:</span>
                  <span className="text-emerald-400 font-bold">Zero (Hidden)</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile backdrop */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          />
        )}

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {currentTab === 'dashboard' && (
            <DashboardView
              onNavigate={(tab) => setCurrentTab(tab)}
              onSelectOrder={(id) => {
                const found = orders.find((o) => o.id === id);
                if (found) setSelectedInvoiceOrder(found);
              }}
              onOpenAddProduct={handleOpenAddProduct}
            />
          )}

          {currentTab === 'orders' && (
            <OrdersView onOpenInvoice={(ord) => setSelectedInvoiceOrder(ord)} />
          )}

          {currentTab === 'products' && (
            <ProductsView
              onOpenAddModal={handleOpenAddProduct}
              onOpenEditModal={handleOpenEditProduct}
            />
          )}

          {currentTab === 'categories' && <CategoriesView />}

          {currentTab === 'inventory' && <InventoryView />}

          {currentTab === 'coupons' && <CouponsView />}

          {currentTab === 'customers' && <CustomersView />}

          {currentTab === 'audit' && <SecurityAuditView />}

          {currentTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <ProductModal
          product={editingProduct}
          categories={categories}
          settings={settings}
          onSave={handleSaveProduct}
          onClose={() => {
            setIsProductModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Order Invoice Modal */}
      {selectedInvoiceOrder && (
        <OrderInvoiceModal
          order={selectedInvoiceOrder}
          settings={settings}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
};
