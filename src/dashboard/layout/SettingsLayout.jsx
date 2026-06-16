import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Settings,
  Palette,
  CreditCard,
  Shield,
  ChevronRight,
} from "lucide-react";

const settingsLinks = [
  {
    name: "General",
    path: "/dashboard/settings/general",
    icon: Settings,
    desc: "Store info & preferences",
  },
  {
    name: "Appearance",
    path: "/dashboard/settings/appearance",
    icon: Palette,
    desc: "Theme & branding",
  },
  {
    name: "Security",
    path: "/dashboard/settings/security",
    icon: Shield,
    desc: "2FA & sessions",
  },
  {
    name: "Billing",
    path: "/dashboard/settings/billing",
    icon: CreditCard,
    desc: "Plans & payments",
  },
];

const SettingsLayout = () => {
  const location = useLocation();

  return (
    <div className="p-4 md:p-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-700 to-slate-400 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage your store configuration and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-2xl p-3 space-y-1 shadow-sm">
            {settingsLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/15 dark:to-indigo-500/15 border border-blue-200/50 dark:border-blue-500/20"
                        : "hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent"
                    }
                  `}
                >
                  <div
                    className={`
                    p-2 rounded-lg transition-colors
                    ${
                      isActive
                        ? "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400"
                        : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                    }
                  `}
                  >
                    <Icon size={18} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-blue-700 dark:text-blue-300"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                      {item.desc}
                    </p>
                  </div>

                  <ChevronRight
                    size={16}
                    className={`transition-colors ${
                      isActive
                        ? "text-blue-500 dark:text-blue-400"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                </NavLink>
              );
            })}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout;