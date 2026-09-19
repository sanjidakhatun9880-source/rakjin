import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AdminGate } from './components/admin/AdminGate';
import { AdminLayout } from './components/admin/AdminLayout';
import { StorefrontView } from './components/store/StorefrontView';
import { Shield, Eye, ShieldCheck, Lock, ExternalLink, HelpCircle } from 'lucide-react';

const MainApp: React.FC = () => {
  const { adminSession } = useStore();

  // Read initial route from URL hash (e.g. #admin)
  const [viewMode, setViewMode] = useState<'store' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (hash.includes('admin') || search.includes('admin')) {
        return 'admin';
      }
    }
    return 'store';
  });

  const [showDevPill, setShowDevPill] = useState(true);

  // Sync with browser hash changes (e.g. typing #admin in URL bar)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('admin')) {
        setViewMode('admin');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard shortcut listener: Ctrl + Shift + A or Ctrl + Alt + A to toggle admin gate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey) && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setViewMode((prev) => (prev === 'admin' ? 'store' : 'admin'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSwitchToAdmin = () => {
    window.location.hash = '#admin';
    setViewMode('admin');
  };

  const handleSwitchToStore = () => {
    window.location.hash = '';
    setViewMode('store');
  };

  return (
    <div className="relative min-h-screen">
      {/* Dynamic View Rendering */}
      {viewMode === 'admin' ? (
        adminSession.isAuthenticated ? (
          <AdminLayout onSwitchToStore={handleSwitchToStore} />
        ) : (
          <AdminGate onExitToStore={handleSwitchToStore} />
        )
      ) : (
        <StorefrontView onTriggerAdminAuth={handleSwitchToAdmin} />
      )}

      {/* Discrete Developer & Owner Sandbox Helper Pill (Floating in bottom-right) */}
      <aside aria-label="Development environment controls" className="fixed bottom-4 right-4 z-50 flex flex-col items-end print:hidden">
        {showDevPill ? (
          <div className="bg-slate-950/95 text-white border border-slate-700/80 rounded-2xl shadow-2xl p-3 max-w-xs text-xs backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Private Admin Portal</span>
              </div>
              <button
                onClick={() => setShowDevPill(false)}
                className="text-slate-400 hover:text-white text-[11px] px-1 cursor-pointer"
                title="Minimize helper"
              >
                ✕
              </button>
            </div>

            <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
              Per strict security rules, the public website contains <strong className="text-emerald-400">zero admin buttons or links</strong>.
            </p>

            <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Current Mode:</span>
                <span className="font-bold uppercase text-white">
                  {viewMode === 'admin' ? (
                    <span className="text-emerald-400">Admin Console</span>
                  ) : (
                    <span className="text-amber-300">Customer Store</span>
                  )}
                </span>
              </div>

              <div className="flex gap-1.5 pt-1">
                {viewMode === 'store' ? (
                  <button
                    onClick={handleSwitchToAdmin}
                    className="w-full py-1.5 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold text-center cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Open Private Admin Gate</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSwitchToStore}
                    className="w-full py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold text-center cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Customer Storefront</span>
                  </button>
                )}
              </div>

              <p className="text-[10px] text-slate-400 text-center pt-1 font-mono">
                Direct URL: <span className="text-emerald-300">#admin</span> | Hotkey: <span className="text-emerald-300">Ctrl+Alt+A</span>
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowDevPill(true)}
            className="p-2.5 bg-slate-950/90 text-emerald-400 border border-slate-800 rounded-full shadow-lg hover:bg-slate-900 cursor-pointer transition-transform hover:scale-105"
            title="Open Admin Gateway & Mode Switcher"
          >
            <Shield className="w-4 h-4" />
          </button>
        )}
      </aside>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
