import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import {
  User,
  ShoppingBag,
  LogOut,
  Edit3,
  Save,
  X,
  Package,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

export default function Account() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(currentUser?.displayName || "");
  const [savingName, setSavingName] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);

  // Fetch user's orders from Firestore
  useEffect(() => {
    if (!currentUser) return;
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setOrders(data);
      } catch {
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [currentUser]);

  const handleSaveName = async () => {
    if (!newName.trim()) return;
    setSavingName(true);
    try {
      await updateProfile(auth.currentUser, { displayName: newName.trim() });
      setNameSaved(true);
      setEditingName(false);
      setTimeout(() => setNameSaved(false), 3000);
    } catch {
      // fail silently
    } finally {
      setSavingName(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  const getStatusIcon = (status) => {
    switch ((status || "").toLowerCase()) {
      case "delivered": return <CheckCircle2 size={16} className="text-emerald-400" />;
      case "cancelled": return <XCircle size={16} className="text-red-400" />;
      default: return <Clock size={16} className="text-yellow-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "delivered": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "cancelled": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "processing": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default: return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  };

  const initials = (currentUser?.displayName || currentUser?.email || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-[#0F172A] text-white min-h-screen relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <main className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-2 text-sm mb-10 text-slate-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-white font-semibold">My Account</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center mb-4">
              {/* Avatar */}
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-indigo-500/50"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg shadow-indigo-500/30">
                  {initials}
                </div>
              )}
              <p className="font-bold text-white text-lg">{currentUser?.displayName || "User"}</p>
              <p className="text-slate-400 text-sm mt-1 truncate">{currentUser?.email}</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-semibold transition-all ${
                  activeTab === "profile"
                    ? "bg-indigo-600/30 text-indigo-300 border-l-2 border-indigo-400"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <User size={18} /> Profile
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-semibold transition-all border-t border-white/5 ${
                  activeTab === "orders"
                    ? "bg-indigo-600/30 text-indigo-300 border-l-2 border-indigo-400"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <ShoppingBag size={18} /> My Orders
                {orders.length > 0 && (
                  <span className="ml-auto bg-indigo-500/30 text-indigo-300 text-xs px-2 py-0.5 rounded-full">
                    {orders.length}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all border-t border-white/5"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-8">Profile Information</h2>

                {nameSaved && (
                  <div className="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                    <CheckCircle2 size={18} />
                    Name updated successfully!
                  </div>
                )}

                <div className="space-y-6">
                  {/* Display Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                      DISPLAY NAME
                    </label>
                    {editingName ? (
                      <div className="flex items-center gap-3">
                        <input
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                          placeholder="Enter your name"
                        />
                        <button
                          onClick={handleSaveName}
                          disabled={savingName}
                          className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-50"
                        >
                          <Save size={18} />
                        </button>
                        <button
                          onClick={() => { setEditingName(false); setNewName(currentUser?.displayName || ""); }}
                          className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-all"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-white font-medium">{currentUser?.displayName || "Not set"}</span>
                        <button
                          onClick={() => setEditingName(true)}
                          className="text-slate-400 hover:text-indigo-400 transition-colors p-1"
                        >
                          <Edit3 size={18} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                      EMAIL ADDRESS
                    </label>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-white font-medium">{currentUser?.email}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Email cannot be changed here. Contact support if needed.</p>
                  </div>

                  {/* Account Created */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                      MEMBER SINCE
                    </label>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-white font-medium">
                        {currentUser?.metadata?.creationTime
                          ? new Date(currentUser.metadata.creationTime).toLocaleDateString("en-GB", {
                              day: "numeric", month: "long", year: "numeric",
                            })
                          : "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-8">My Orders</h2>

                {ordersLoading ? (
                  <div className="flex flex-col items-center justify-center h-48 space-y-4">
                    <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
                    <p className="text-slate-400">Loading your orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Package size={48} className="text-slate-600 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-400">No orders yet</h3>
                    <p className="text-slate-500 mt-2 mb-6">Looks like you haven't placed any orders.</p>
                    <Link
                      to="/products"
                      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all"
                    >
                      Start Shopping <ChevronRight size={16} />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-indigo-500/30 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Order Number</p>
                            <p className="font-bold text-white">{order.orderNumber || order.id}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-500 mb-1">Date</p>
                            <p className="text-sm text-slate-300">{order.date || "—"}</p>
                          </div>
                          <div>
                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              {order.status || "Pending"}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-500 mb-1">Total</p>
                            <p className="font-bold text-white">${Number(order.total).toLocaleString()}</p>
                          </div>
                        </div>
                        {order.items && order.items.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            {order.items.slice(0, 3).map((item, i) => (
                              <div key={i} className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 border border-white/10 flex-shrink-0">
                                {item.img ? (
                                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Package size={12} className="text-slate-500" />
                                  </div>
                                )}
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <span className="text-xs text-slate-400">+{order.items.length - 3} more</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
