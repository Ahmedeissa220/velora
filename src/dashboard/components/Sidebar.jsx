import { NavLink } from "react-router-dom";
import Image from "../../assets/logo.png";
import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Users,
  Settings,
  X,
  ChartNoAxesCombined,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";



const Sidebar = ({ collapsed, mobileOpen, setMobileOpen }) => {
  const [openMenu, setOpenMenu] = useState({
    Settings: false,
  });

  const toggleMenu = (name) => {
    setOpenMenu((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: < ChartNoAxesCombined />,
    },
    {
      name: "Products",
      path: "/dashboard/products",
      icon: <ShoppingBag size={20} />,
    },
    {
      name: "Orders",
      path: "/dashboard/orders",
      icon: <ClipboardList size={20} />,
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: <Users size={20} />,
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      children: [
        {
          name: "General",
          path: "/dashboard/settings/general",
        },
        {
          name: "Appearance",
          path: "/dashboard/settings/appearance",
        },
        {
          name: "Security",
          path: "/dashboard/settings/security",
        },
        {
          name: "Billing",
          path: "/dashboard/settings/billing",
        },
      ],
    },
  ];

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  console.log("USER:", user);

  return (
    <>
      {/* Overlay (Mobile only) */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
    fixed top-0 left-0 z-50 min-h-full
    bg-[#0f172a] text-white
    flex flex-col

    transition-all duration-300 ease-in-out

    w-64
    ${collapsed ? "md:w-20" : "md:w-64"}

    md:translate-x-0
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        {/* Logo */}
        <div className="h-20 flex items-center gap-3 px-5 border-b border-white/10">
          <img src={Image} className="w-10 h-10 rounded-full" />

          <h1
            className={`
      text-xl font-bold transition-all duration-300
      ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
    `}
          >
            Velora
          </h1>

          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden ml-auto"
          >
            <X />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 p-3 space-y-2">
          {links.map((link) => {
            const isSettings = link.name === "Settings";

            return (
              <div key={link.name}>
                {/* MAIN ITEM */}
                {isSettings ? (
                  <button
                    onClick={() => toggleMenu("Settings")}
                    className={`
    flex items-center gap-3 px-4 py-3 rounded-xl w-full
    transition-all duration-200 ease-in-out
    hover:bg-white/10 text-slate-300
    ${openMenu.Settings ? "bg-white/5" : ""}
    ${collapsed ? "justify-center" : ""}
  `}
                  >
                    {link.icon}

                    {!collapsed && (
                      <>
                        <span className="font-medium">Settings</span>

                        <ChevronDown
                          className={`
          ml-auto transition-transform duration-300 ease-in-out
          ${openMenu.Settings ? "rotate-180" : "rotate-0"}
        `}
                        />
                      </>
                    )}
                  </button>
                ) : (
                  <NavLink
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `
              flex items-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-200

              ${isActive
                        ? "bg-white text-black"
                        : "hover:bg-white/10 text-slate-300"
                      }

              ${collapsed ? "justify-center" : ""}
            `
                    }
                  >
                    {link.icon}

                    <span
                      className={`
              font-medium whitespace-nowrap
              transition-all duration-300
              ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
            `}
                    >
                      {link.name}
                    </span>
                  </NavLink>
                )}

                {/* SUB MENU */}
                {link.children?.length > 0 && (
                  <div
                    className={`
      ml-10 mt-2 space-y-1 overflow-hidden
      transition-all duration-300 ease-in-out
      transform origin-top

      ${openMenu.Settings && !collapsed
                        ? "max-h-96 opacity-100 scale-100"
                        : "max-h-0 opacity-0 scale-95 pointer-events-none"
                      }
    `}
                  >
                    {link.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `
            block px-3 py-2 rounded-lg text-sm
            transition-all duration-200

            ${isActive
                            ? "bg-white text-black"
                            : "text-slate-400 hover:text-white hover:bg-white/10"
                          }
          `
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 md:justify-start">
            <img
              src={user?.photo}
              alt="user"
              className="w-10 h-10 rounded-full"
            />

            {!collapsed && (
              <div>
                <h3 className="font-medium">{user?.name || user?.email}</h3>
                <p className="text-sm text-slate-400">Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
