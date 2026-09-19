import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import {
  Save,
  Download,
  Upload,
  RotateCcw,
  Shield,
  Lock,
  DollarSign,
  Truck,
  Building,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, resetToDefaults, exportDatabaseJSON, importDatabaseJSON } = useStore();

  const [storeName, setStoreName] = useState(settings.storeName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [currency, setCurrency] = useState(settings.currency);
  const [deliveryFee, setDeliveryFee] = useState(settings.standardDeliveryFee.toString());
  const [freeThreshold, setFreeThreshold] = useState(settings.freeDeliveryThreshold.toString());
  const [address, setAddress] = useState(settings.address);
  const [openingHours, setOpeningHours] = useState(settings.openingHours);
  const [securityPin, setSecurityPin] = useState(settings.securityPin);
  const [announcement, setAnnouncement] = useState(settings.announcementText);

  const [savedNotice, setSavedNotice] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateSettings({
      storeName: storeName.trim(),
      tagline: tagline.trim(),
      contactPhone: contactPhone.trim(),
      contactEmail: contactEmail.trim(),
      currency: currency.trim(),
      standardDeliveryFee: parseFloat(deliveryFee) || 0,
      freeDeliveryThreshold: parseFloat(freeThreshold) || 0,
      address: address.trim(),
      openingHours: openingHours.trim(),
      securityPin: securityPin.trim(),
      announcementText: announcement.trim()
    });

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      const success = importDatabaseJSON(content);
      if (success) {
        setImportStatus('Database successfully restored from JSON backup!');
      } else {
        setImportStatus('Failed to parse backup file. Please ensure valid JSON structure.');
      }
      setTimeout(() => setImportStatus(null), 4000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Store Settings & Administration</h1>
        <p className="text-xs text-slate-500">
          Configure business profile details, delivery charges, security credentials, and data backups.
        </p>
      </div>

      {savedNotice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">Store settings successfully saved and updated in real-time!</span>
        </div>
      )}

      {importStatus && (
        <div className="p-3.5 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{importStatus}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Business Identity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-900">Store Identity & Branding</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Store Name *</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Store Currency Symbol *</label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                required
                placeholder="৳ or $"
                className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline / Mission</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Hotline Phone Number</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Support Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Store Address / Warehouse Hub</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Operating Hours</label>
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Storefront Announcement Bar Banner
            </label>
            <input
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        {/* Section 2: Delivery & Thresholds */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Truck className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-900">Delivery Charges & Thresholds</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Standard Delivery Charge ({settings.currency})
              </label>
              <input
                type="number"
                min="0"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Free Delivery Order Minimum ({settings.currency})
              </label>
              <input
                type="number"
                min="0"
                value={freeThreshold}
                onChange={(e) => setFreeThreshold(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Admin Security Settings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Shield className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-900">Security Credentials & Single-Owner Lock</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Authorized Administrator Email (Immutable Strict Lock)
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  disabled
                  value={settings.adminEmail}
                  className="w-full px-3 py-2 text-xs font-mono bg-slate-100 border border-slate-200 rounded-lg text-slate-600 cursor-not-allowed"
                />
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Only this exact Gmail account can access this private admin console.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Security PIN / Passcode
              </label>
              <input
                type="text"
                value={securityPin}
                onChange={(e) => setSecurityPin(e.target.value)}
                maxLength={12}
                required
                className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 tracking-wider"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Passcode used during Admin Gate authentication.
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow cursor-pointer transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings Changes</span>
          </button>
        </div>
      </form>

      {/* Section 4: Database Export & Restore */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Database Backup & Disaster Recovery</h2>
        <p className="text-xs text-slate-500">
          Save an offline JSON snapshot containing all your products, orders, categories, coupons, and customers.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={exportDatabaseJSON}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Database JSON Backup</span>
          </button>

          <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-semibold rounded-xl cursor-pointer transition-colors">
            <Upload className="w-4 h-4 text-emerald-700" />
            <span>Restore from JSON File</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all catalog and order data back to factory initial demo defaults? Any changes made will be replaced.')) {
                resetToDefaults();
              }
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-xl cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Factory Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
