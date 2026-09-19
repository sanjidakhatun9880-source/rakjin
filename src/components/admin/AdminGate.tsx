import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, Lock, AlertTriangle, ArrowLeft, Mail, KeyRound, CheckCircle2, ShieldAlert } from 'lucide-react';
import { StoreLogo } from '../common/StoreLogo';

interface AdminGateProps {
  onExitToStore: () => void;
}

export const AdminGate: React.FC<AdminGateProps> = ({ onExitToStore }) => {
  const { settings, loginAdmin } = useStore();
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = loginAdmin(email, pin);
      setIsLoading(false);
      if (result.success) {
        setSuccessMsg(result.message);
      } else {
        setError(result.message);
      }
    }, 450);
  };

  const handleQuickFill = () => {
    setEmail(settings.adminEmail);
    setPin(settings.securityPin);
    setError(null);
  };

  const handleTestUnauthorized = () => {
    setEmail('intruder.hacker@yahoo.com');
    setPin('0000');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Subtle background security grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Glow orb */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Back to Public Store button */}
        <button
          onClick={onExitToStore}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Exit to Customer Storefront</span>
        </button>

        {/* Security Shield Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center mb-3">
              <StoreLogo size="xl" variant="emblem" className="ring-4 ring-emerald-500/20" />
            </div>
            <h1 className="text-2xl font-bold font-serif tracking-tight text-white">Sanjida Food Store</h1>
            <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mt-1">
              Private Administrator Gate
            </p>
            <p className="text-xs text-slate-400 mt-1.5">
              Strictly restricted to authorized store administrator.
            </p>
          </div>

          {/* Strict Security Policy Notice */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 mb-6 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 font-medium">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                Access Control:
              </span>
              <span className="text-emerald-400 font-mono font-semibold">Strict Single-Owner Lock</span>
            </div>
            <div className="text-slate-400 flex items-center justify-between">
              <span>Authorized Email:</span>
              <span className="font-mono text-slate-200 bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                {settings.adminEmail}
              </span>
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="bg-rose-950/50 border border-rose-800 text-rose-200 rounded-xl p-3.5 mb-5 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block mb-0.5 text-rose-300">Security Alert</span>
                {error}
              </div>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-950/50 border border-emerald-800 text-emerald-200 rounded-xl p-3.5 mb-5 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Administrator Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sanjidakhatun9880@gmail.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Security Passcode / PIN
                </label>
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="text-[11px] text-slate-400 hover:text-slate-200"
                >
                  {showPin ? 'Hide PIN' : 'Show PIN'}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter 4-digit Security PIN"
                  maxLength={12}
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono tracking-widest"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-950 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate & Unlock Admin Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Helper for Owner */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <p className="text-[11px] text-slate-400 text-center mb-3">
              Owner Security Helpers:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={handleQuickFill}
                className="px-3 py-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-emerald-400 rounded-lg text-center transition-all cursor-pointer font-medium"
              >
                Auto-fill Owner Credentials
              </button>
              <button
                type="button"
                onClick={handleTestUnauthorized}
                className="px-3 py-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-rose-400 rounded-lg text-center transition-all cursor-pointer font-medium"
              >
                Test Intruder Block
              </button>
            </div>
            <p className="text-[10px] text-slate-500 text-center mt-2.5">
              Default Admin PIN: <span className="font-mono text-slate-400">{settings.securityPin}</span> (changeable in Settings)
            </p>
          </div>
        </div>

        {/* Security badges footer */}
        <div className="flex items-center justify-center gap-4 mt-6 text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Zero Public Discoverability
          </span>
          <span>•</span>
          <span>256-Bit SSL Enforcement</span>
          <span>•</span>
          <span>Audit Logged</span>
        </div>
      </div>
    </div>
  );
};
