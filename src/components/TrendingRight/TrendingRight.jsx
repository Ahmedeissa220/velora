import { ShoppingBag } from "lucide-react";
import unnamed16 from "../../assets/unnamed (16).png";
import unnamed17 from "../../assets/unnamed (17).png";
import unnamed18 from "../../assets/unnamed (18).png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const products = [
  {
    id: 1,
    tag: "MOST WANTED",
    rank: "01",
    img: unnamed16,
    title: "Velora Vision Pro",
    para: "The world's most advanced mirrorless system for creators.",
    price: 4200,
    icon: ShoppingBag,
  },
  {
    id: 2,
    tag: "BEST SELLER",
    rank: "02",
    img: unnamed17,
    title: "Velora X-Series",
    para: "Mastering grade audio fidelity in a portable form factor.",
    price: 899,
    icon: ShoppingBag,
  },
  {
    id: 3,
    tag: "NEW RELEASE",
    rank: "03",
    img: unnamed18,
    title: "Velora Flow Pad",
    para: "Limitless creativity with zero-latency tactile feedback.",
    price: 650,
    icon: ShoppingBag,
  },
];

function TrendingRight() {
  const { addToCart } = useCart();

  const navigate = useNavigate();
  return (
    <section className="pt-12 sm:pt-16 lg:pt-20 bg-zinc-950 min-h-screen p-10">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-white">
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 animate-pulse">
            Trending Right Now
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-20">
          {products.map((product) => (
            <div
              key={product.id}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:scale-[1.03] hover:bg-white/10 hover:border-white/20 group"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="bg-indigo-600/20 text-indigo-300 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest">
                  {product.tag}
                </span>

                <span className="text-white font-semibold text-sm sm:text-base">
                  #{product.rank}
                </span>
              </div>

              {/* Image */}
              <div className="flex justify-center items-center mb-6">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] lg:w-[180px] lg:h-[180px] object-contain transition-transform duration-500 group-hover:scale-110 rounded-xl"
                />
              </div>

              {/* Title */}
              <h3 className="text-white text-base sm:text-lg font-semibold mb-2">
                {product.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-xs sm:text-sm mb-4">
                {product.para}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-lg sm:text-xl lg:text-2xl text-white font-bold">
                  {product.price}
                </span>

                <Link
                  to="/cart"
                  onClick={() => {
                    addToCart(product);
                    navigate("/cart");
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition"
                >
                  <ShoppingBag className="text-black w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingRight;
