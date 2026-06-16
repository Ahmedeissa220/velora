import { useState, useEffect } from "react";
import { Search, Trash2, Download, Loader2, AlertCircle, TrendingUp, Clock, CheckCircle, Package } from "lucide-react";
import * as XLSX from "xlsx";
import { db } from "../../firebase";
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Orders from Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        const orderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // Sort by date (assuming date is a string or timestamp, here we just reverse to show newest first if they are added sequentially)
        orderList.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setOrders(orderList);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Firebase fetch error:", err);
        setError("Failed to fetch orders from database.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.customer?.toLowerCase().includes(search.toLowerCase()) ||
      order.product?.toLowerCase().includes(search.toLowerCase()) ||
      order.id?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "orders", id));
    } catch (err) {
      console.error("API delete failed", err);
      setError("Failed to delete order.");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, { status });
    } catch (err) {
      console.error("API update failed", err);
      setError("Failed to update status.");
    }
  };

  const exportCSV = () => {
    const rows = [
      ["Order ID", "Customer", "Product", "Total", "Status", "Date"],
      ...orders.map((o) => [o.id, o.customer, o.product, o.total, o.status, o.date]),
    ];
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "orders.csv";
    link.click();
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: <Package size={24} className="text-blue-500 dark:text-blue-400" />,
      bg: "bg-blue-100 dark:bg-blue-500/10",
    },
    {
      title: "Pending",
      value: orders.filter((o) => o.status === "Pending").length,
      icon: <Clock size={24} className="text-yellow-500 dark:text-yellow-400" />,
      bg: "bg-yellow-100 dark:bg-yellow-500/10",
    },
    {
      title: "Delivered",
      value: orders.filter((o) => o.status === "Delivered").length,
      icon: <CheckCircle size={24} className="text-emerald-500 dark:text-emerald-400" />,
      bg: "bg-emerald-100 dark:bg-emerald-500/10",
    },
    {
      title: "Revenue",
      value: `$${orders.reduce((acc, cur) => acc + (Number(cur.total) || 0), 0).toLocaleString()}`,
      icon: <TrendingUp size={24} className="text-purple-500 dark:text-purple-400" />,
      bg: "bg-purple-100 dark:bg-purple-500/10",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20";
      case "Pending": return "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20";
      case "Processing": return "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20";
      case "Cancelled": return "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20";
      default: return "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300";
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Orders Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Track and process customer orders</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="flex-1 lg:flex-none flex items-center gap-2 bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 px-4 py-2.5 rounded-2xl focus-within:ring-2 focus-within:ring-blue-500/50 transition-all shadow-sm">
            <Search size={18} className="text-slate-400" />
            <input
              placeholder="Search orders..."
              className="bg-transparent outline-none w-full text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 dark:bg-slate-900/60 backdrop-blur-xl dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-white/5 px-4 py-2.5 rounded-2xl font-medium transition-all shadow-sm"
          >
            <Download size={18} className="text-blue-500 dark:text-blue-400" /> CSV
          </button>

          <button
            onClick={exportExcel}
            className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-600/20 dark:hover:bg-emerald-600/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 px-4 py-2.5 rounded-2xl font-medium transition-all shadow-sm"
          >
            <Download size={18} /> Excel
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((item) => (
          <div key={item.title} className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-all">
            <div className={`p-4 rounded-2xl ${item.bg} shadow-inner`}>
              {item.icon}
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{item.title}</p>
              <h2 className="text-3xl font-bold mt-1 text-slate-800 dark:text-slate-100">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">Loading orders from Firebase...</p>
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-6 m-4 rounded-2xl border border-red-200 dark:border-red-500/20">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        ) : filteredOrders.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-64">
            <Search className="w-12 h-12 text-slate-400 dark:text-slate-500 mb-3" />
            <h3 className="text-xl font-medium text-slate-600 dark:text-slate-300">No orders found</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-50/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-b border-slate-200/60 dark:border-white/5">
                <tr>
                  <th className="px-6 py-5 font-semibold">Order ID</th>
                  <th className="px-6 py-5 font-semibold">Customer</th>
                  <th className="px-6 py-5 font-semibold">Product</th>
                  <th className="px-6 py-5 font-semibold">Total</th>
                  <th className="px-6 py-5 font-semibold">Status</th>
                  <th className="px-6 py-5 font-semibold">Date</th>
                  <th className="px-6 py-5 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200">{order.id}</td>
                    <td className="px-6 py-4 text-slate-800 dark:text-white">{order.customer}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{order.product}</td>
                    <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">${Number(order.total).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`appearance-none px-4 py-1.5 rounded-full font-medium text-xs outline-none cursor-pointer transition-colors ${getStatusColor(order.status)}`}
                      >
                        <option value="Pending" className="bg-white dark:bg-slate-800 text-yellow-600 dark:text-yellow-400">Pending</option>
                        <option value="Processing" className="bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400">Processing</option>
                        <option value="Delivered" className="bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400">Delivered</option>
                        <option value="Cancelled" className="bg-white dark:bg-slate-800 text-red-600 dark:text-red-400">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{order.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-xl transition-all lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100"
                          title="Delete Order"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl font-medium transition-all ${
                currentPage === index + 1 
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30" 
                  : "bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
