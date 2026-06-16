import { useState } from "react";
import {
  Shield,
  ShieldCheck,
  Smartphone,
  Monitor,
  Globe,
  LogOut,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";

const sessions = [
  {
    id: 1,
    device: "Chrome on Windows",
    location: "Cairo, Egypt",
    icon: Monitor,
    lastActive: "Active now",
    current: true,
  },
  {
    id: 2,
    device: "Safari on iPhone 13",
    location: "Cairo, Egypt",
    icon: Smartphone,
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: 3,
    device: "Edge on Unknown",
    location: "Unknown",
    icon: Globe,
    lastActive: "3 days ago",
    current: false,
  },
];

export default function Security() {
  const [twoFA, setTwoFA] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Security
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your authentication and active sessions
        </p>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-xl ${
                twoFA
                  ? "bg-emerald-100 dark:bg-emerald-500/10"
                  : "bg-slate-100 dark:bg-white/5"
              }`}
            >
              {twoFA ? (
                <ShieldCheck
                  size={24}
                  className="text-emerald-500 dark:text-emerald-400"
                />
              ) : (
                <Shield
                  size={24}
                  className="text-slate-400 dark:text-slate-500"
                />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Add an extra layer of security to your account with SMS or
                authenticator app verification.
              </p>
              {twoFA && (
                <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setTwoFA(!twoFA)}
            className={`
              shrink-0 w-12 h-7 rounded-full p-1 transition-colors duration-200
              ${twoFA ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"}
            `}
          >
            <div
              className={`
                w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200
                ${twoFA ? "translate-x-5" : "translate-x-0"}
              `}
            />
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-5">
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <KeyRound size={18} className="text-amber-500" />
          Change Password
        </h3>

        <div className="space-y-4">
          {[
            {
              label: "Current Password",
              key: "current",
              placeholder: "Enter current password",
            },
            {
              label: "New Password",
              key: "newPass",
              placeholder: "Enter new password",
            },
            {
              label: "Confirm Password",
              key: "confirm",
              placeholder: "Confirm new password",
            },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 ml-1">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={field.placeholder}
                  value={passwords[field.key]}
                  onChange={(e) =>
                    setPasswords({ ...passwords, [field.key]: e.target.value })
                  }
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ))}

          <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-medium text-sm shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
            Update Password
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">
            Active Sessions
          </h3>
          <button className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-400 font-medium transition-colors">
            <LogOut size={14} />
            Log out all
          </button>
        </div>

        <div className="space-y-3">
          {sessions.map((session) => {
            const Icon = session.icon;
            return (
              <div
                key={session.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5">
                  <Icon
                    size={18}
                    className="text-slate-500 dark:text-slate-400"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {session.device}
                    </p>
                    {session.current && (
                      <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold rounded-full uppercase tracking-wide">
                        This Device
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {session.location} · {session.lastActive}
                  </p>
                </div>

                {!session.current && (
                  <button className="text-xs text-red-400 hover:text-red-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Revoke
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}