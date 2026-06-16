import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function Charts({ data = [] }) {
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

  const gridColor = isDark ? "#1e293b" : "#e2e8f0";
  const axisColor = isDark ? "#94a3b8" : "#64748b";
  const tooltipBg = isDark ? "#0f172a" : "#ffffff";
  const tooltipBorder = isDark
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid #e2e8f0";
  const tooltipText = isDark ? "#fff" : "#1e293b";
  const tooltipLabel = isDark ? "#94a3b8" : "#64748b";

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm dark:shadow-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Sales Performance
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400">Revenue vs Expenses Overview</p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></span>
            Revenue
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-500"></span>
            Expenses
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 md:h-80">
        {" "}
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              opacity={0.5}
            />

            <XAxis
              dataKey="month"
              stroke={axisColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke={axisColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: tooltipBorder,
                borderRadius: "12px",
                color: tooltipText,
                boxShadow: isDark ? "none" : "0 10px 25px -5px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ color: tooltipLabel }}
              formatter={(value) => [`$${value.toLocaleString()}`, ""]}
            />

            {/* Revenue */}
            <Bar
              dataKey="revenue"
              fill="#06b6d4"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />

            {/* Expenses */}
            <Bar
              dataKey="expenses"
              fill="#64748b"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
