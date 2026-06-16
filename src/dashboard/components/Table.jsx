import { TrendingUp, TrendingDown } from "lucide-react";

function Table({ recentOrders = [], topProducts = [] }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-400";
      case "pending":
        return "bg-yellow-500/10 text-yellow-400";
      case "cancelled":
        return "bg-red-500/10 text-red-400";
      default:
        return "bg-slate-500/10 text-slate-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* ================= RECENT ORDERS ================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/50 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
        {/* Header */}
        <div className="p-5 border-b border-slate-200/60 dark:border-slate-800/50 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Orders</h3>

            <p className="text-sm text-slate-500 dark:text-slate-400">Latest customer purchases</p>
          </div>

          <button className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 text-sm font-medium">
            View All
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="text-slate-500 dark:text-slate-400 text-sm border-b border-slate-200/60 dark:border-slate-800/50">
                <th className="p-4 text-left">Order</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders?.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-white/5 transition"
                >
                  <td className="p-4 text-cyan-600 dark:text-cyan-400 text-sm">{order.id}</td>

                  <td className="p-4 text-slate-800 dark:text-white text-sm">{order.customer}</td>

                  <td className="p-4 text-slate-600 dark:text-slate-300 text-sm">
                    {order.product}
                  </td>

                  <td className="p-4 text-slate-800 dark:text-white text-sm font-medium">
                    {order.amount}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-4 text-slate-500 dark:text-slate-400 text-sm">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= TOP PRODUCTS ================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/50 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
        {/* Header */}
        <div className="p-5 border-b border-slate-200/60 dark:border-slate-800/50">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Top Products</h3>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Best performing products
          </p>
        </div>

        {/* List */}
        <div className="p-5 space-y-3">
          {topProducts?.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition"
            >
              {/* LEFT */}
              <div>
                <h4 className="text-sm font-medium text-slate-800 dark:text-white">
                  {product.name}
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-400">{product.sales} sales</p>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  {product.revenue}
                </p>

                <div className="flex items-center gap-1 justify-end">
                  {product.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  )}

                  <span
                    className={`text-xs font-medium ${
                      product.trend === "up"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {product.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Table;
