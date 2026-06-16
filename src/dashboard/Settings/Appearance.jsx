import { useState, useEffect } from "react";
import { Sun, Moon, Monitor, Paintbrush } from "lucide-react";

const themes = [
  {
    id: "light",
    name: "Light",
    icon: Sun,
    desc: "Clean and bright interface",
    preview: "bg-white border-slate-200",
  },
  {
    id: "dark",
    name: "Dark",
    icon: Moon,
    desc: "Easy on the eyes",
    preview: "bg-slate-900 border-slate-700",
  },
  {
    id: "system",
    name: "System",
    icon: Monitor,
    desc: "Follow device settings",
    preview:
      "bg-gradient-to-br from-white to-slate-900 border-slate-400",
  },
];

const accentColors = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Emerald", value: "#10b981" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
];

export default function Appearance() {
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const data = localStorage.getItem("velora_appearance");
    return data ? JSON.parse(data).theme || "dark" : "dark";
  });
  const [accentColor, setAccentColor] = useState(() => {
    const data = localStorage.getItem("velora_appearance");
    return data ? JSON.parse(data).accent || "#3b82f6" : "#3b82f6";
  });
  const [fontScale, setFontScale] = useState(() => {
    const data = localStorage.getItem("velora_appearance");
    return data ? JSON.parse(data).fontScale || "medium" : "medium";
  });

  useEffect(() => {
    localStorage.setItem(
      "velora_appearance",
      JSON.stringify({
        theme: selectedTheme,
        accent: accentColor,
        fontScale,
      })
    );

    // Apply theme to document
    const root = document.documentElement;
    if (selectedTheme === "dark") {
      root.classList.add("dark");
    } else if (selectedTheme === "light") {
      root.classList.remove("dark");
    } else {
      // system
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [selectedTheme, accentColor, fontScale]);

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Appearance
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize the look and feel of your dashboard
        </p>
      </div>

      {/* Theme Mode */}
      <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-5">
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <Paintbrush size={18} className="text-indigo-500" />
          Theme Mode
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themes.map((theme) => {
            const Icon = theme.icon;
            const isSelected = selectedTheme === theme.id;

            return (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`
                  relative p-4 rounded-2xl border-2 transition-all duration-200
                  text-left group
                  ${
                    isSelected
                      ? "border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-500/5 shadow-md shadow-blue-500/10"
                      : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-white dark:bg-white/5"
                  }
                `}
              >
                {/* Preview bar */}
                <div
                  className={`w-full h-10 rounded-lg mb-3 border ${theme.preview}`}
                />

                <div className="flex items-center gap-2">
                  <Icon
                    size={16}
                    className={`${
                      isSelected
                        ? "text-blue-500 dark:text-blue-400"
                        : "text-slate-400"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isSelected
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {theme.name}
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 ml-6">
                  {theme.desc}
                </p>

                {/* Check mark */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Color */}
      <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-5">
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">
          Accent Color
        </h3>

        <div className="flex flex-wrap gap-3">
          {accentColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setAccentColor(color.value)}
              className={`
                group relative w-10 h-10 rounded-xl transition-all duration-200
                ${
                  accentColor === color.value
                    ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 scale-110"
                    : "hover:scale-110"
                }
              `}
              style={{
                backgroundColor: color.value,
                ringColor: color.value,
              }}
              title={color.name}
            >
              {accentColor === color.value && (
                <svg
                  className="w-4 h-4 text-white absolute inset-0 m-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500">
          Selected: {accentColors.find((c) => c.value === accentColor)?.name}
        </p>
      </div>

      {/* Font Size */}
      <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-5">
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">
          Interface Scale
        </h3>

        <div className="flex gap-3">
          {["small", "medium", "large"].map((size) => (
            <button
              key={size}
              onClick={() => setFontScale(size)}
              className={`
                flex-1 px-4 py-3 rounded-xl text-sm font-medium capitalize
                border transition-all duration-200
                ${
                  fontScale === size
                    ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300"
                    : "border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
                }
              `}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}