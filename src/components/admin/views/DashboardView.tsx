import React from 'react';
import { useStore } from '../../../context/StoreContext';
import { OrderStatus } from '../../../types';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  AlertOctagon,
  Users,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Truck,
  Plus,
  RefreshCw,
  Eye,
  ShieldCheck
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
  onSelectOrder: (orderId: string) => void;
  onOpenAddProduct: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onSelectOrder,
  onOpenAddProduct
}) => {
  const { products, orders, customers, settings, updateOrderStatus, bulkRestock } = useStore();

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => (o.orderStatus !== 'cancelled' ? sum + o.total : sum), 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'pending');
  const lowStockProducts = products.filter(p => p.stock <= 10);
  const totalDelivered = orders.filter(o => o.orderStatus === 'delivered').length;

  const recentOrders = orders.slice(0, 5);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome & Live Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm border border-emerald-800/40">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-md text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Store Administrator Session: Sanjida Khatun</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">{settings.storeName} Overview</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Live private management console. All stock changes, order fulfillment workflows, and customer records persist automatically.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenAddProduct}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
          <button
            onClick={() => onNavigate('orders')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 cursor-pointer transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Fulfill Orders</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-200 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold tracking-wide text-slate-600">Total Store Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {settings.currency}{totalRevenue.toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active transactions processed</span>
          </p>
        </div>

        {/* Metric 2: Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-200 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold tracking-wide text-slate-600">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {orders.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">orders placed</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-amber-50 text-amber-700 border border-amber-200">
              {pendingOrders.length} Pending
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              {totalDelivered} Delivered
            </span>
          </div>
        </div>

        {/* Metric 3: Low Stock Warnings */}
        <div
          onClick={() => onNavigate('inventory')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold tracking-wide text-slate-600">Inventory Alerts</span>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${lowStockProducts.length > 0 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-extrabold tracking-tight ${lowStockProducts.length > 0 ? 'text-amber-600' : 'text-slate-900'}`}>
              {lowStockProducts.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">items low on stock</span>
          </div>
          <p className="text-[11px] text-slate-500 group-hover:text-emerald-700 font-medium flex items-center gap-1 mt-2">
            <span>View reorder recommendations</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </p>
        </div>

        {/* Metric 4: Registered Customers */}
        <div
          onClick={() => onNavigate('customers')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-200 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold tracking-wide text-slate-600">Active Customers</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {customers.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">accounts</span>
          </div>
          <p className="text-[11px] text-slate-500 group-hover:text-indigo-600 font-medium flex items-center gap-1 mt-2">
            <span>Manage customer profiles & VIPs</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </p>
        </div>
      </div>

      {/* Main Row: Recent Orders & Stock Alert Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Customer Orders</h2>
              <p className="text-xs text-slate-500">Live order fulfillment and payment verification</p>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({orders.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                  <th className="pb-3">Order #</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 font-mono font-semibold text-slate-900">
                      #{ord.orderNumber}
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-slate-800">{ord.customerName}</div>
                      <div className="text-[11px] text-slate-400">{ord.customerPhone}</div>
                    </td>
                    <td className="py-3 text-slate-600">
                      {ord.items.length} item{ord.items.length > 1 ? 's' : ''}
                    </td>
                    <td className="py-3 font-bold text-slate-900">
                      {settings.currency}{ord.total}
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(ord.orderStatus)}`}>
                        {ord.orderStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {ord.orderStatus === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'confirmed')}
                            className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded font-semibold text-[11px] border border-blue-200 cursor-pointer"
                          >
                            Confirm
                          </button>
                        )}
                        {ord.orderStatus === 'confirmed' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'processing')}
                            className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded font-semibold text-[11px] border border-indigo-200 cursor-pointer"
                          >
                            Pack
                          </button>
                        )}
                        {ord.orderStatus === 'processing' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'out_for_delivery')}
                            className="px-2 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded font-semibold text-[11px] border border-purple-200 cursor-pointer"
                          >
                            Dispatch
                          </button>
                        )}
                        <button
                          onClick={() => onSelectOrder(ord.id)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer"
                          title="View Invoice & Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Urgent Low Stock Alerts */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Restock Alerts</h2>
                <p className="text-xs text-slate-500">Items reaching critical low threshold</p>
              </div>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">
                {lowStockProducts.length} Items
              </span>
            </div>

            {lowStockProducts.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="font-semibold text-slate-700">Stock Healthy</p>
                <p>All items have sufficient inventory units.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-11 h-11 rounded-lg object-cover bg-slate-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs font-semibold text-slate-800 truncate">{p.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                        <span className="font-bold text-amber-700">{p.stock} {p.unit} remaining</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500 font-mono">{p.sku}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => bulkRestock(p.id, 20)}
                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-semibold shrink-0 cursor-pointer shadow-xs transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>+20</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('inventory')}
            className="w-full mt-4 py-2 text-center text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Open Full Inventory Manager
          </button>
        </div>
      </div>
    </div>
  );
};
