import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-[#0F172A] text-white min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Glow Orbs */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-500/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center">
        {/* Big 404 */}
        <div className="relative mb-6 select-none">
          <p className="text-[160px] md:text-[220px] font-black leading-none tracking-tighter text-white/5">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-[80px] md:text-[120px] font-black leading-none tracking-tighter bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
              404
            </p>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
          This page went off-grid.
        </h1>
        <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/30"
          >
            <Home size={20} />
            Back to Home
          </Link>
          <Link
            to="/products"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Search size={20} />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
