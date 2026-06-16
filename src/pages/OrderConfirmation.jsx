import { useLocation, useNavigate, Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag, Package, ChevronRight, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  // If someone lands here without placing an order, redirect them
  useEffect(() => {
    if (!orderData) {
      navigate("/products", { replace: true });
    }
  }, [orderData, navigate]);

  if (!orderData) return null;

  const [orderNumber] = useState(() => orderData.orderNumber || `ORD-${Math.floor(Math.random() * 900000) + 100000}`);

  return (
    <div className="bg-[#0F172A] text-white min-h-screen relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <main className="relative z-10 container mx-auto px-4 py-16 max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              </div>
              {/* Ping animation */}
              <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Order{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Confirmed!
            </span>
          </h1>
          <p className="text-slate-400 text-lg">
            Thank you for your purchase. Your order is being prepared.
          </p>

          <div className="inline-flex items-center gap-3 mt-5 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <Package size={18} className="text-indigo-400" />
            <span className="text-slate-300 text-sm font-medium">Order Number:</span>
            <span className="text-white font-bold tracking-wider">{orderNumber}</span>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <ShoppingBag size={20} className="text-indigo-400" />
            <h2 className="text-xl font-bold">Order Summary</h2>
          </div>

          {/* Items */}
          <div className="space-y-4 mb-6">
            {orderData.items?.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/10 border border-white/10 flex-shrink-0">
                  {item.img ? (
                    <img src={item.img} alt={item.title || item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">No img</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white line-clamp-1">{item.title || item.name}</p>
                  <p className="text-slate-400 text-sm">Qty: {item.qty || item.quantity || 1}</p>
                </div>
                <p className="font-bold text-white shrink-0">
                  ${Number(item.price).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-white/10 pt-5 space-y-3">
            <div className="flex justify-between text-slate-400 text-sm">
              <span>Subtotal</span>
              <span>${Number(orderData.subtotal || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400 text-sm">
              <span>Shipping</span>
              <span>{Number(orderData.shipping || 0) === 0 ? "Free" : `$${Number(orderData.shipping).toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-white font-extrabold text-xl pt-2 border-t border-white/10">
              <span>Total</span>
              <span>${Number(orderData.total || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-10">
          <h3 className="font-bold mb-3 text-indigo-300">Estimated Delivery</h3>
          <p className="text-slate-300">
            {orderData.deliveryType === "pickup"
              ? `Ready for pickup at the ${orderData.branch || "selected"} branch within 24 hours.`
              : "Your order will be delivered within 3–5 business days."}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/account"
            className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/30"
          >
            View My Orders
            <ChevronRight size={18} />
          </Link>
          <Link
            to="/products"
            className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    </div>
  );
}
