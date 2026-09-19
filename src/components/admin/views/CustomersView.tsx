import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Users, Search, Phone, Mail, MapPin, Award, ShoppingBag, Calendar } from 'lucide-react';

export const CustomersView: React.FC = () => {
  const { customers, orders, settings } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Customer Relationship Directory</h1>
          <p className="text-xs text-slate-500">
            View customer order histories, lifetime value spend, delivery addresses, and VIP patronage tiers.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-700">
          Total Customers: {customers.length}
        </span>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customers by name, phone number, email or city..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Contact & Location</th>
                <th className="py-3.5 px-4">Orders & Lifetime Spend</th>
                <th className="py-3.5 px-4">Status Tier</th>
                <th className="py-3.5 px-4">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((cust) => {
                const customerOrders = orders.filter(
                  (o) => o.customerPhone === cust.phone || o.customerEmail === cust.email
                );

                return (
                  <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                          {cust.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{cust.name}</span>
                          <span className="text-[11px] text-slate-400">Joined: {cust.joinedDate}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-slate-800 font-medium flex items-center gap-1 font-mono">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {cust.phone}
                      </span>
                      {cust.email && (
                        <span className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {cust.email}
                        </span>
                      )}
                      <span className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5 truncate max-w-xs">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {cust.address}, {cust.city}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-sm font-extrabold text-slate-900 block">
                        {settings.currency}{cust.totalSpent.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <ShoppingBag className="w-3 h-3 text-slate-400" />
                        {customerOrders.length || cust.totalOrders} total completed orders
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {cust.status === 'vip' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <Award className="w-3 h-3 text-amber-600" />
                          VIP Patron
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                          Standard Customer
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {cust.lastOrderDate}
                      </span>
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
