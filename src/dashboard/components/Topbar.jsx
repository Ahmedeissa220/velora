import { Menu, Bell, Moon, Sun, Settings } from "lucide-react";
import { useEffect, useState } from "react";
const Topbar = ({ collapsed, setCollapsed, setMobileOpen }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return savedTheme === "dark" || (!savedTheme && systemPrefersDark);
  });

  // Apply theme class on mount and when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // toggle dark mode
  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <header
      className={`
    fixed top-0 right-0 h-20
    bg-slate-100 dark:bg-slate-950 
    border-b border-slate-200 dark:border-slate-800
    flex items-center justify-between px-4 md:px-6 z-40

    transition-all duration-300 ease-in-out

    left-0
    ${collapsed ? "md:left-20" : "md:left-64"}
  `}
    >
      {/* Left */}
      <div className=" flex items-center gap-2 md:gap-3 min-w-0">
        {/* 📱 Mobile Menu */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-slate-700 dark:text-white"
        >
          <Menu />
        </button>

        {/* 🖥 Desktop Collapse */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:block text-slate-800 dark:text-white"
        >
          <Menu />
        </button>

        <div className="min-w-0">
          <h1 className="text-xl  md:text-2xl font-bold text-slate-800 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm font-medium text-slate-800 dark:text-white  md:block hidden">
            Welcome back, {user?.name || user?.email}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        <button className="relative w-10 h-10 rounded-xl text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center transition">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button className="hidden sm:flex w-10 h-10 rounded-xl text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 items-center justify-center transition">
          <Settings size={20} />
        </button>
        <div className="pl-2 space-x-2 md:space-x-3 md:pl-3 border-l border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 md:justify-start">
            <img
              src={user?.photo}
              alt="user"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
            />

            <div className="hidden sm:block">
              <h3 className="font-medium text-slate-800 dark:text-white max-w-[120px] truncate">
                {user?.name || user?.email}
              </h3>
              <p className="text-sm text-slate-800 dark:text-white">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
