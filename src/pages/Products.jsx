import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

















import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

// const products = [
//   {
//     id: 1,
//     title: "Velora Tab Ultra",
//     price: 1299.0,
//     img: unnamed1,
//     icon: Heart,
//     discription:
//       "A next-generation tablet designed for performance, creativity, and seamless multitasking.",
//   },

//   {
//     id: 2,
//     title: "Velora Horizon S",
//     price: 499.0,
//     img: unnamed2,
//     icon: Heart,
//     discription:
//       "A sleek and powerful device built for smooth everyday performance and modern productivity.",
//   },

//   {
//     id: 3,
//     title: "Velora Core Workstation",
//     price: 2499.0,
//     img: unnamed3,
//     icon: Heart,
//     discription:
//       "A high-performance workstation built for demanding tasks, creative work, and heavy.",
//   },

//   {
//     id: 4,
//     title: "Velora Air Pro Max",
//     price: 299.0,
//     img: unnamed4,
//     icon: Heart,
//     discription:
//       "Ultra-light performance device designed for everyday use with smooth speed and modern",
//   },
//   {
//     id: 5,
//     title: "Aura One Headphones",
//     price: 1299,
//     img: unnamed5,
//     icon: Heart,
//     discription:
//       "Next-generation spatial audio with precision-milled aluminum housing",
//   },
//   {
//     id: 6,
//     title: "Velora Tab Ultra",
//     price: 2499,
//     img: unnamed6,
//     icon: Heart,
//     discription:
//       "The world's thinnest 16-inch display with 240Hz OLED technology.",
//   },
//   {
//     id: 7,
//     title: "Nexus Mechanical",
//     price: 450,
//     img: unnamed7,
//     icon: Heart,
//     discription:
//       "Tactile precision redefined with custom carbon-fiber switches.",
//   },
//   {
//     id: 8,
//     title: "Voxel Home Engineal",
//     price: 899,
//     img: unnamed8,
//     icon: Heart,
//     discription: "360-degree acoustic immersion with integrated AI assistant.",
//   },
//   {
//     id: 9,
//     title: "Chronos Smart V2",
//     price: 750,
//     img: unnamed9,
//     icon: Heart,
//     discription:
//       "Aerospace-grade titanium housing with week-long battery life.",
//   },
//   {
//     id: 10,
//     title: "Lumina Pro 32",
//     price: 3199,
//     img: unnamed10,
//     icon: Heart,
//     discription:
//       "Color-accurate 6K display with integrated hardware calibration.",
//   },
//   {
//     id: 11,
//     tag: "MOST WANTED",
//     rank: "01",
//     img: unnamed16,
//     title: "Velora Vision Pro",
//     discription: "The world's most advanced mirrorless system for creators.",
//     price: 4200,
//     icon: Heart,
//   },
//   {
//     id: 12,
//     tag: "BEST SELLER",
//     rank: "02",
//     img: unnamed17,
//     title: "Velora X-Series",
//     discription: "Mastering grade audio fidelity in a portable form factor.",
//     price: 899,
//     icon: Heart,
//   },
//   {
//     id: 13,
//     tag: "NEW RELEASE",
//     rank: "03",
//     img: unnamed18,
//     title: "Velora Flow Pad",
//     discription: "Limitless creativity with zero-latency tactile feedback.",
//     price: 650,
//     icon: Heart,
//   },
//   {
//     id: 14,
//     tag: "NEW RELEASE",
//     rank: "03",
//     img: unnamed19,
//     title: "VELORA ONYX-1",
//     discription: "The quintessential time-piece for the digital nomad. ",
//     price: 450.0,
//     icon: Heart,
//   },
//   {
//     id: 15,
//     tag: "NEW RELEASE",
//     rank: "03",
//     img: unnamed20,
//     title: "STRIDE ULTRA-S",
//     discription:
//       "Performance footwear re-imagined with aerospace-grade carbon fiber. ",
//     price: 280.0,
//     icon: Heart,
//   },
//   {
//     id: 16,
//     tag: "NEW RELEASE",
//     rank: "03",
//     img: unnamed21,
//     title: "SONIC PURE X",
//     discription:
//       " Active noise cancellation with 48-hour studio-quality playback capacity. ",
//     price: 590.0,
//     icon: Heart,
//   },
//   {
//     id: 17,
//     tag: "NEW RELEASE",
//     rank: "03",
//     img: unnamed22,
//     title: "CARRY MODULE 4",
//     discription:
//       "Modular tech pouch for the modern minimalist. Weatherproof treated felt. ",
//     price: 125.0,
//     icon: Heart,
//   },
// ];






function Products() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const { addToCart } = useCart();

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const snapshot = await getDocs(collection(db, "products"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <>
      <div className="bg-[#0F172A] text-white min-h-screen relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-purple-500/30 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-pink-500/30 blur-[120px] rounded-full"></div>

        <main className="relative z-10 container mx-auto px-4">
          <header className="py-12 border-b border-white/5">
            <div className="flex items-center gap-2 text-sm mb-4">
              <Link
                to="/"
                className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-white transition"
              >
                Home
              </Link>
              <span>
                <ChevronRight className="w-3" />
              </span>
              <span className="text-white text-sm font-bold">Products</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <h1 className="text-6xl font-bold text-primary uppercase">
                  Luxury Tech
                </h1>
                <p className="text-slate-300 text-lg font-semibold max-w-2xl">
                  Engineered precision meeting aesthetic purity. Explore our
                  curated selection of high-performance instruments.
                </p>
              </div>
            </div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 p-8">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
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
                mt-20
                flex flex-col h-130
              "
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-square">
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 z-10" />
                  {product.img ? (
                    <img
                      src={product.img}
                      alt={product.title}
                      className="
                      w-full h-full object-cover
                      transition-all duration-700
                      group-hover:scale-110
                    "
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800/50">
                      <span className="text-slate-500 text-sm font-medium">No Image Available</span>
                    </div>
                  )}
                  <button
                    className="
                    absolute top-3 right-3 z-20
                    w-9 h-9
                    rounded-full
                    bg-black/40
                    backdrop-blur-md
                    border border-white/10
                    flex items-center justify-center
                    text-white/70
                    hover:text-red-400
                    hover:scale-110
                    transition-all duration-300
                  "
                    onClick={() => {
                      if (isInWishlist(product.id)) {
                        removeFromWishlist(product.id);
                      } else {
                        addToWishlist(product);
                      }
                    }}
                  >
                    {product.icon && (
                      <product.icon
                        className={
                          isInWishlist(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }
                      />
                    )}
                  </button>
                </div>
                <div className="p-4 sm:p-5 space-y-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg sm:text-xl  font-semibold text-white line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="text-white text-sm font-semibold sm:text-base mt-1 shrink-0">
                      ${product.price}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-400 line-clamp-3 min-h-[72px]">
                    {product.discription}
                  </p>
                  {/* <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    ★ ★ ★ ★ ★
                  </div> */}
                  <Link
                    className="
                      mt-auto
                      w-full py-3 rounded-xl
                    bg-white text-black
                      text-sm sm:text-base
                      font-semibold
                      transition-all duration-300
                      hover:bg-gradient-to-r
                    hover:from-indigo-300
                    hover:to-purple-300
                      hover:scale-[1.02]
                      flex items-center justify-center gap-2
                    "
                    to="/cart"
                    onClick={() => {
                      addToCart(product);
                      navigate("/cart");
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 group-hover:rotate-12 transition" />
                    Add to Cart
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default Products;
