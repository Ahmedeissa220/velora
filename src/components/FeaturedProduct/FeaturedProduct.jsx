import unnamed1 from "../../assets/unnamed (1).png";
import unnamed2 from "../../assets/unnamed (2).png";
import unnamed3 from "../../assets/unnamed (3).png";
import unnamed4 from "../../assets/unnamed (4).png";
import unnamed12 from "../../assets/unnamed (12).png";
import unnamed13 from "../../assets/unnamed (13).png";
import unnamed14 from "../../assets/unnamed (14).png";
import unnamed15 from "../../assets/unnamed (15).png";
import { Heart, ArrowRight, ShoppingCart, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Velora Tab Ultra",
    price: 1299.0,
    img: unnamed1,
    icon: Heart,
  },

  {
    id: 2,
    title: "Velora Horizon S",
    price: 499.0,
    img: unnamed2,
    icon: Heart,
  },

  {
    id: 3,
    title: "Velora Core Workstation",
    price: 2499.0,
    img: unnamed3,
    icon: Heart,
  },

  {
    id: 4,
    title: "Velora Air Pro",
    price: 299.0,
    img: unnamed4,
    icon: Heart,
  },
];

function FeaturedProduct() {
  const { addToCart } = useCart();

  const navigate = useNavigate();
  return (
    <>
      <section className="bg-[#141313] text-white py-16 sm:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12 lg:mb-25">
            {/* Title */}
            <div className="space-y-3">
              <span className="text-indigo-400 text-sm sm:text-base tracking-[0.2em] uppercase font-medium">
                Curated Selection
              </span>

              <h2 className="font-bold leading-tight text-3xl sm:text-4xl lg:text-5xl">
                Featured Innovations
              </h2>
            </div>

            {/* Button */}
            <Link
              to="/products"
              className="
              inline-flex items-center justify-center gap-2
              px-5 sm:px-6 py-3
              text-sm sm:text-base
              font-semibold
              rounded-xl
              transition-all duration-300
              shadow-lg
              hover:scale-105
              bg-gradient-to-br
              from-white
              to-purple-400
              text-black
              w-full sm:w-fit
            "
            >
              <span>View All</span>

              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
                  {/* Overlay */}
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

                  {/* Favorite */}
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
                  >
                    {product.icon && <product.icon className="w-4 h-4" />}
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 space-y-4">
                  {/* Title */}
                  <div>
                    <h3 className="text-lg sm:text-xl  font-semibold text-white line-clamp-1">
                      {product.title}
                    </h3>

                    <p className="text-white/60 text-sm sm:text-base mt-1">
                      {product.price}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    ★ ★ ★ ★ ★
                  </div>

                  {/* Button */}
                  <Link
                    className="
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
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#141313] py-16 px-4 sm:px-6 lg:px-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Audio */}
          <div className="lg:col-span-8 relative h-[300px] sm:h-[350px] lg:h-[380px] overflow-hidden rounded-3xl group cursor-pointer">
            <img
              src={unnamed12}
              alt="Audio"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Audio
              </h3>

              <p className="text-slate-300 mt-2 mb-4 text-sm sm:text-base">
                Precision sound for purists.
              </p>

              <span className="text-white text-3xl sm:text-4xl">
                {" "}
                <ArrowUpRight />
              </span>
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:col-span-4 lg:row-span-2 relative h-[300px] sm:h-[400px] lg:h-full overflow-hidden rounded-3xl group cursor-pointer">
            <img
              src={unnamed13}
              alt="Mobile"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Mobile
              </h3>

              <p className="text-slate-300 mt-2 mb-4 text-sm sm:text-base">
                The future of mobility.
              </p>

              <span className="text-white text-3xl sm:text-4xl">
                <ArrowUpRight />
              </span>
            </div>
          </div>

          {/* Computing */}
          <div className="lg:col-span-4 relative h-[300px] sm:h-[350px] overflow-hidden rounded-3xl group cursor-pointer">
            <img
              src={unnamed14}
              alt="Computing"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Computing
              </h3>

              <p className="text-slate-300 mt-2 mb-4 text-sm sm:text-base">
                Unyielding power.
              </p>

              <span className="text-white text-3xl sm:text-4xl">
                <ArrowUpRight />
              </span>
            </div>
          </div>

          {/* Wearables */}
          <div className="lg:col-span-4 relative h-[300px] sm:h-[350px] overflow-hidden rounded-3xl group cursor-pointer">
            <img
              src={unnamed15}
              alt="Wearables"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Wearables
              </h3>

              <p className="text-slate-300 mt-2 mb-4 text-sm sm:text-base">
                Elegance meets biology.
              </p>

              <span className="text-white text-3xl sm:text-4xl">
                <ArrowUpRight />
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeaturedProduct;
