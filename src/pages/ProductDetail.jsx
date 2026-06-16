import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import {
  ShoppingCart,
  Heart,
  ChevronRight,
  ArrowLeft,
  Star,
  Shield,
  Truck,
  RefreshCw,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Product not found.");
        }
      } catch {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const inWishlist = product ? isInWishlist(product.id) : false;

  const features = [
    { icon: <Truck size={18} />, label: "Free Delivery", sub: "On orders over $200" },
    { icon: <Shield size={18} />, label: "2-Year Warranty", sub: "Full manufacturer coverage" },
    { icon: <RefreshCw size={18} />, label: "30-Day Returns", sub: "Hassle-free returns" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-indigo-400 animate-spin" />
          <p className="text-slate-400 font-medium animate-pulse">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white">{error}</h2>
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all"
          >
            <ArrowLeft size={18} /> Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] text-white min-h-screen relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />

      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-10 text-slate-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
          <ChevronRight size={14} />
          <span className="text-white font-semibold line-clamp-1 max-w-[200px]">{product.title}</span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Image Panel */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl aspect-square">
              {product.img ? (
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-slate-500 text-lg font-medium">No Image Available</span>
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Wishlist button */}
            <button
              onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
              className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 ${
                inWishlist ? "bg-red-500/20 text-red-400 border-red-500/40" : "bg-black/40 text-white/70 hover:text-red-400"
              }`}
            >
              <Heart size={20} className={inWishlist ? "fill-red-500 text-red-500" : ""} />
            </button>
          </div>

          {/* Info Panel */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Title & Price */}
            <div className="space-y-3">
              <h1 className="text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400" />
                ))}
                <span className="text-slate-400 text-sm ml-2">(4.9 · 128 reviews)</span>
              </div>
              <p className="text-4xl font-extrabold text-white">
                ${Number(product.price).toLocaleString()}
              </p>
            </div>

            {/* Description */}
            {product.discription && (
              <div className="border-t border-white/10 pt-6">
                <p className="text-slate-300 text-lg leading-relaxed font-medium">
                  {product.discription}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                  addedToCart
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30"
                }`}
              >
                <ShoppingCart size={20} />
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </button>

              <button
                onClick={() => { addToCart(product); navigate("/cart"); }}
                className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-base font-semibold bg-white text-black hover:bg-slate-100 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Buy Now
              </button>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <div className="text-indigo-400">{f.icon}</div>
                  <p className="font-semibold text-sm text-white">{f.label}</p>
                  <p className="text-xs text-slate-400">{f.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
