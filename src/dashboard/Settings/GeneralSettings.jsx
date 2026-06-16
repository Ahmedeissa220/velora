import { useEffect, useState } from "react";
import { Store, Mail, Phone, Globe, Clock, ImagePlus } from "lucide-react";

export default function GeneralSettings() {
  const [form, setForm] = useState(() => {
    const data = localStorage.getItem("velora_settings");
    if (data) return JSON.parse(data);
    return {
      storeName: "",
      email: "",
      phone: "",
      currency: "EGP",
      timezone: "Africa/Cairo",
      logo: "",
    };
  });

  const [saving, setSaving] = useState(false);

  // Auto save (debounced)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSaving(true);

    const t = setTimeout(() => {
      localStorage.setItem("velora_settings", JSON.stringify(form));
      setSaving(false);
    }, 700);

    return () => clearTimeout(t);
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500";

  const selectClass =
    "w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm text-slate-800 dark:text-white";

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          General Settings
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your store information and preferences
        </p>
      </div>

      {/* Store Information */}
      <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-5">
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <Store size={18} className="text-blue-500" />
          Store Information
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 ml-1">
              Store Name
            </label>
            <input
              name="storeName"
              placeholder="e.g. Velora Electronics"
              value={form.storeName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 ml-1">
                <Mail size={12} className="inline mr-1" />
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="store@velora.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 ml-1">
                <Phone size={12} className="inline mr-1" />
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="+20 1XX XXX XXXX"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-5">
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <Globe size={18} className="text-indigo-500" />
          Preferences
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 ml-1">
              Currency
            </label>
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="EGP">🇪🇬 EGP – Egyptian Pound</option>
              <option value="USD">🇺🇸 USD – US Dollar</option>
              <option value="EUR">🇪🇺 EUR – Euro</option>
              <option value="GBP">🇬🇧 GBP – British Pound</option>
              <option value="SAR">🇸🇦 SAR – Saudi Riyal</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 ml-1">
              <Clock size={12} className="inline mr-1" />
              Timezone
            </label>
            <select
              name="timezone"
              value={form.timezone}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="Africa/Cairo">Africa/Cairo (GMT+2)</option>
              <option value="UTC">UTC (GMT+0)</option>
              <option value="Europe/London">Europe/London (GMT+0/+1)</option>
              <option value="America/New_York">America/New York (GMT-5)</option>
              <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
              <option value="Asia/Riyadh">Asia/Riyadh (GMT+3)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Branding */}
      <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-5">
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <ImagePlus size={18} className="text-emerald-500" />
          Branding
        </h3>

        <div className="flex items-start gap-5">
          <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-white/5 border-2 border-dashed border-slate-300 dark:border-white/10 flex items-center justify-center text-xs text-slate-400 dark:text-slate-500 shrink-0">
            Logo
          </div>

          <div className="space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Upload your store logo
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Recommended: 256×256 PNG or SVG
            </p>
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer transition-colors">
              <ImagePlus size={16} />
              Choose File
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Save Status */}
      <div className="flex items-center gap-2 text-sm">
        <div
          className={`w-2 h-2 rounded-full transition-colors ${
            saving ? "bg-yellow-400 animate-pulse" : "bg-emerald-500"
          }`}
        />
        <span className="text-slate-400 dark:text-slate-500">
          {saving ? "Saving changes..." : "All changes saved"}
        </span>
      </div>
    </div>
  );
}