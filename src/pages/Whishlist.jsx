import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const { addToCart } = useCart();

  const navigate = useNavigate();

  return (
    <div className="bg-[#0F172A] text-white min-h-screen relative overflow-hidden">
      {/* Blur Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-purple-500/30 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-pink-500/30 blur-[120px] rounded-full"></div>

      <main className="relative z-10 container mx-auto px-4 py-14">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-bold text-primary uppercase">
              Wishlist
            </h1>

            <p className="text-slate-400 mt-3 font-medium">
              Your favorite luxury tech products.
            </p>
          </div>

          <Link
            to="/products"
            className="text-white/70 hover:text-white transition"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Heart className="w-20 h-20 text-slate-500 mb-6" />

            <h2 className="text-3xl font-bold mb-3">Your wishlist is empty</h2>

            <p className="text-slate-400 mb-8">
              Save your favorite products here.
            </p>

            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:shadow-[0_10px_40px_rgba(99,102,241,0.2)]
                "
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-square">
                  <div className="absolute inset-0 bg-black/20 z-10" />

                  <img
                    src={product.img}
                    alt={product.title}
                    className="
                      w-full h-full object-cover
                      transition-all duration-700
                      group-hover:scale-110
                    "
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="
                      absolute top-3 right-3 z-20
                      w-10 h-10 rounded-full
                      bg-black/40 backdrop-blur-md
                      border border-white/10
                      flex items-center justify-center
                      hover:bg-red-500/20
                      transition-all
                    "
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="text-xl font-semibold text-white">
                      {product.title}
                    </h3>

                    <p className="text-white font-bold">${product.price}</p>
                  </div>

                  <p className="text-sm font-medium text-slate-400 line-clamp-2">
                    {product.discription}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        addToCart(product);
                        navigate("/cart");
                      }}
                      className="
                        w-full py-3 rounded-xl
                        bg-white text-black
                        font-semibold
                        transition-all duration-300
                        hover:bg-gradient-to-r
                        hover:from-indigo-300
                        hover:to-purple-300
                        hover:scale-[1.02]
                        flex items-center justify-center gap-2
                      "
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
