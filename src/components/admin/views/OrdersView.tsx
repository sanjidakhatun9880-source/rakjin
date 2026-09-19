import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Order, OrderStatus } from '../../../types';
import {
  Search,
  Filter,
  FileText,
  Trash2,
  Phone,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Truck
} from 'lucide-react';

interface OrdersViewProps {
  onOpenInvoice: (order: Order) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ onOpenInvoice }) => {
  const { orders, updateOrderStatus, deleteOrder, settings } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.deliveryCity.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || ord.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Order Management & Fulfillment</h1>
          <p className="text-xs text-slate-500">
            Process orders, assign dispatch riders, update customer timelines, and print official invoices.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-700">
            Total Orders: {orders.length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Order #, Customer Name, Phone, or City..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          {/* Quick status tabs */}
          <div className="flex flex-wrap gap-1.5">
            {['all', 'pending', 'confirmed', 'processing', 'out_for_delivery', 'delivered', 'cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  statusFilter === tab
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.replace(/_/g, ' ')}
                {tab === 'all'
                  ? ` (${orders.length})`
                  : ` (${orders.filter((o) => o.orderStatus === tab).length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-slate-600">No orders found matching your filter.</p>
            <p>Try changing your search term or status filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                  <th className="py-3.5 px-4">Order #</th>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Items Ordered</th>
                  <th className="py-3.5 px-4">Delivery & Slot</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4">Status & Pipeline</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Order Number & Date */}
                    <td className="py-3.5 px-4 align-top">
                      <span className="font-mono font-bold text-slate-900 block">
                        #{ord.orderNumber}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {new Date(ord.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </td>

                    {/* Customer Info */}
                    <td className="py-3.5 px-4 align-top">
                      <span className="font-semibold text-slate-900 block">{ord.customerName}</span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 font-mono">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {ord.customerPhone}
                      </span>
                      <span className="text-[11px] text-slate-400 truncate max-w-[180px] block">
                        {ord.deliveryAddress}
                      </span>
                    </td>

                    {/* Items */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="text-slate-800 font-medium">
                        {ord.items.length} item{ord.items.length > 1 ? 's' : ''}:
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 space-y-0.5 max-w-[220px]">
                        {ord.items.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="truncate">
                            • {item.quantity}x {item.productName}
                          </div>
                        ))}
                        {ord.items.length > 2 && (
                          <div className="text-emerald-700 font-medium">
                            +{ord.items.length - 2} more items...
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Delivery & Slot */}
                    <td className="py-3.5 px-4 align-top">
                      <span className="font-medium text-slate-800 block">{ord.deliveryCity}</span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {ord.deliverySlot}
                      </span>
                    </td>

                    {/* Payment Info */}
                    <td className="py-3.5 px-4 align-top">
                      <span className="text-sm font-bold text-slate-900 block">
                        {settings.currency}{ord.total}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {ord.paymentMethod}
                      </span>
                      <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.2 rounded mt-0.5 ${
                        ord.paymentStatus === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.paymentStatus}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="space-y-1.5">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className={`text-xs font-bold px-2 py-1 rounded-lg border cursor-pointer focus:outline-none ${getStatusBadge(
                            ord.orderStatus
                          )}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing (Packing)</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <div className="text-[10px] text-slate-400">
                          {ord.timeline.length} updates logged
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 align-top text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => onOpenInvoice(ord)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                          title="Generate Printable Invoice"
                        >
                          <FileText className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Invoice</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to remove order #${ord.orderNumber}?`)) {
                              deleteOrder(ord.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
