import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

function SalesChart({ data = [] }) {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const tooltipBg = isDark ? "#0f172a" : "#ffffff";
  const tooltipBorder = isDark
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid #e2e8f0";
  const tooltipText = isDark ? "#fff" : "#1e293b";
  const tooltipLabel = isDark ? "#94a3b8" : "#64748b";

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm dark:shadow-none">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Sales by Category</h3>

        <p className="text-sm text-slate-500 dark:text-slate-400">Product distribution overview</p>
      </div>

      {/* Chart */}
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: tooltipBorder,
                borderRadius: "12px",
                color: tooltipText,
                boxShadow: isDark ? "none" : "0 10px 25px -5px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ color: tooltipLabel }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-3">
        {data?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-slate-600 dark:text-slate-300">{item.name}</span>
            </div>

            <span className="text-sm font-semibold text-slate-800 dark:text-white">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SalesChart;
