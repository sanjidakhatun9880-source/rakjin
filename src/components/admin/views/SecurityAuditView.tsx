import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { ShieldCheck, ShieldAlert, AlertTriangle, Info, Lock, Key, Trash2, CheckCircle2 } from 'lucide-react';

export const SecurityAuditView: React.FC = () => {
  const { auditLogs, clearAuditLogs, settings } = useStore();
  const [severityFilter, setSeverityFilter] = useState<'all' | 'info' | 'warning' | 'critical'>('all');

  const filteredLogs = auditLogs.filter((log) => {
    if (severityFilter === 'all') return true;
    return log.severity === severityFilter;
  });

  const authDeniedCount = auditLogs.filter((l) => l.type === 'auth_denied').length;
  const authSuccessCount = auditLogs.filter((l) => l.type === 'auth_success').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Security Enforcement & Audit Trail</h1>
          <p className="text-xs text-slate-500">
            Real-time security surveillance and operational audit logging. Strict identity restriction status.
          </p>
        </div>
        <button
          onClick={() => {
            if (window.confirm('Clear all security audit logs?')) {
              clearAuditLogs();
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5 text-slate-500" />
          <span>Clear Logs</span>
        </button>
      </div>

      {/* Security Status Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">Private Access Shield Active</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Zero public exposure: No admin buttons, login links, or discoverable paths exist anywhere on the customer storefront.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                <div className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                  <span className="text-slate-400">Exclusive Owner Email: </span>
                  <span className="font-mono text-emerald-400 font-bold">{settings.adminEmail}</span>
                </div>
                <div className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                  <span className="text-slate-400">Enforcement Mode: </span>
                  <span className="text-white font-medium">Whitelist Block (1 of 1)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Security Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Authorized Logins</span>
          <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">
            {authSuccessCount} sessions
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">By {settings.adminEmail}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Blocked Intrusion Attempts</span>
          <span className="text-2xl font-extrabold text-rose-600 mt-1 block">
            {authDeniedCount} rejected
          </span>
          <span className="text-[11px] text-rose-500 font-medium mt-1 block">Unauthorized email blocks</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Total Recorded Events</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
            {auditLogs.length} events
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">Audit log history</span>
        </div>
      </div>

      {/* Severity Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'info', 'warning', 'critical'] as const).map((sev) => (
          <button
            key={sev}
            onClick={() => setSeverityFilter(sev)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize cursor-pointer transition-colors ${
              severityFilter === sev
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {sev} ({sev === 'all' ? auditLogs.length : auditLogs.filter((l) => l.severity === sev).length})
          </button>
        ))}
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs">
            No events found for this filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Severity</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Event Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {log.severity === 'critical' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          <ShieldAlert className="w-3 h-3" />
                          CRITICAL
                        </span>
                      ) : log.severity === 'warning' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <AlertTriangle className="w-3 h-3" />
                          WARNING
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          <Info className="w-3 h-3" />
                          INFO
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800 whitespace-nowrap">
                      {log.actor}
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-700 text-xs">
                      {log.description}
                    </td>
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                      {log.type}
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
