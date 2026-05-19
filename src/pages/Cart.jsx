import { Minus, Plus, Trash2, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ShoppingCartPage = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    subtotal,
    shipping,
    tax,
    total,
  } = useCart();

  // Empty Cart
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Your cart is empty</h2>

          <p className="text-gray-400 mb-8">
            Add some premium products to continue shopping.
          </p>

          <Link
            to="/products"
            className="
              inline-flex items-center justify-center
              px-8 py-4
              rounded-2xl
              bg-white
              text-black
              font-semibold
              hover:scale-[1.02]
              transition
            "
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white px-4 sm:px-6 lg:px-12 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
            Your Selection
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Shopping Cart
          </h1>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE */}
          <div className="lg:col-span-8 space-y-6">
            {/* Cart Items */}
            {cart.map((item) => (
              <div
                key={item.id}
                className="
                  rounded-3xl
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  p-5 sm:p-6
                  flex flex-col sm:flex-row
                  gap-6
                  transition-all duration-300
                  hover:bg-white/[0.05]
                  hover:border-white/20
                "
              >
                {/* Product Image */}
                <div
                  className="
                    w-full sm:w-36
                    h-60 sm:h-40
                    rounded-2xl
                    overflow-hidden
                    flex-shrink-0
                    bg-neutral-900
                  "
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="
                      w-full h-full object-cover
                      hover:scale-105
                      transition-transform duration-500
                    "
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Top */}
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold">{item.title}</h2>

                        <p className="text-sm text-gray-400 mt-2">
                          {item.description || "Premium Velora Product"}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="
                          text-gray-500
                          hover:text-red-500
                          transition
                        "
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div
                    className="
                      mt-6
                      flex flex-col sm:flex-row
                      sm:items-center
                      sm:justify-between
                      gap-4
                    "
                  >
                    {/* Quantity */}
                    <div
                      className="
                        flex items-center
                        border border-white/10
                        rounded-full
                        px-2 py-2
                        w-fit
                        bg-white/[0.03]
                      "
                    >
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="
                          w-8 h-8
                          rounded-full
                          flex items-center justify-center
                          hover:bg-white/10
                          transition
                        "
                      >
                        <Minus size={16} />
                      </button>

                      <span className="px-5 font-semibold">{item.qty}</span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="
                          w-8 h-8
                          rounded-full
                          flex items-center justify-center
                          hover:bg-white/10
                          transition
                        "
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-2xl font-bold">
                      ${Number(item.price * item.qty).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Promo Code */}
            <div
              className="
                rounded-3xl
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-5
                flex flex-col sm:flex-row
                gap-4
              "
            >
              <input
                type="text"
                placeholder="Enter Promo Code"
                className="
                  flex-1
                  bg-transparent
                  border border-white/10
                  rounded-2xl
                  px-5 py-4
                  outline-none
                  focus:border-white/30
                  transition
                  placeholder:text-gray-500
                "
              />

              <button
                className="
                  px-8 py-4
                  rounded-2xl
                  bg-white
                  text-black
                  font-semibold
                  hover:scale-[1.02]
                  active:scale-95
                  transition-all
                "
              >
                Apply
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <aside className="lg:col-span-4">
            <div
              className="
                sticky top-10
                rounded-3xl
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-6 sm:p-8
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-2">
                    Payment Summary
                  </p>

                  <h2 className="text-3xl font-bold">Order Summary</h2>
                </div>

                {/* <div
                  className="
                    w-12 h-12
                    rounded-full
                    bg-white/10
                    flex items-center justify-center
                  "
                >
                  <Lock size={18} />
                </div> */}
              </div>

              {/* Summary Rows */}
              <div className="space-y-5">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>

                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>

                  <span>${shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>

                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="h-px bg-white/10"></div>

                <div className="flex justify-between items-end">
                  <span className="text-lg font-semibold">Total</span>

                  <span className="text-4xl font-bold">
                    ${Number(total).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout */}
              <Link to="/checkout">
                <button
                  className="
                  w-full mt-8
                  py-4
                  rounded-2xl
                  bg-white
                  text-black
                  font-semibold
                  text-lg
                  hover:scale-[1.02]
                  active:scale-95
                  transition-all
                "
                >
                  Proceed to Checkout
                </button>
              </Link>

              {/* Secure */}
              <div
                className="
                  flex items-center justify-center
                  gap-2
                  text-sm text-gray-400
                  mt-5
                "
              >
                <Lock size={15} />

                <span>Secure Checkout</span>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-4 gap-3 mt-8 opacity-50">
                <div
                  className="
                    h-12
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    flex items-center justify-center
                  "
                >
                  💳
                </div>

                <div
                  className="
                    h-12
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    flex items-center justify-center
                  "
                >
                  🏦
                </div>

                <div
                  className="
                    h-12
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    flex items-center justify-center
                  "
                >
                  👛
                </div>

                <div
                  className="
                    h-12
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    flex items-center justify-center
                  "
                >
                  ₿
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
