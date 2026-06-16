import { useState } from "react";
import { CreditCard, MapPin, Truck, Store, ShieldCheck } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const branches = [
  {
    id: 1,
    name: "Nasr City Branch",
    address: "Makram Ebeid, Cairo",
  },
  {
    id: 2,
    name: "New Cairo Branch",
    address: "Fifth Settlement, Cairo",
  },
  {
    id: 3,
    name: "Alexandria Branch",
    address: "Smouha, Alexandria",
  },
];

export default function Checkout() {
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [selectedBranch, setSelectedBranch] = useState(1);
  const [placing, setPlacing] = useState(false);

  const { cart, subtotal, shipping, total, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      const orderNumber = `ORD-${Date.now()}`;
      const selectedBranchName = branches.find((b) => b.id === selectedBranch)?.name;
      const orderData = {
        orderNumber,
        userId: currentUser?.uid || "guest",
        items: cart.map((item) => ({
          id: item.id,
          title: item.title || item.name,
          img: item.img || "",
          price: item.price,
          qty: item.qty || 1,
        })),
        subtotal,
        shipping,
        total,
        deliveryType,
        branch: selectedBranchName || null,
        status: "Pending",
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        createdAt: Date.now(),
      };

      await addDoc(collection(db, "orders"), orderData);
      clearCart();
      navigate("/order-confirmation", { state: { orderData } });
    } catch (err) {
      console.error("Failed to place order:", err);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f8f8f8] py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#171717]">
              Checkout
            </h1>

            <p className="text-gray-500 mt-2">
              Complete your order details below.
            </p>
          </div>

          {/* Delivery Type */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-5">Delivery Method</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DELIVERY */}
              <button
                onClick={() => setDeliveryType("delivery")}
                className={`border rounded-2xl p-5 text-left transition-all ${
                  deliveryType === "delivery"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white"
                }`}
              >
                <Truck className="mb-3" size={28} />

                <h3 className="font-semibold text-lg">Home Delivery</h3>

                <p
                  className={`text-sm mt-1 ${
                    deliveryType === "delivery"
                      ? "text-gray-200"
                      : "text-gray-500"
                  }`}
                >
                  Receive your order at your address.
                </p>
              </button>

              {/* PICKUP */}
              <button
                onClick={() => setDeliveryType("pickup")}
                className={`border rounded-2xl p-5 text-left transition-all ${
                  deliveryType === "pickup"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white"
                }`}
              >
                <Store className="mb-3" size={28} />

                <h3 className="font-semibold text-lg">Pickup Branch</h3>

                <p
                  className={`text-sm mt-1 ${
                    deliveryType === "pickup"
                      ? "text-gray-200"
                      : "text-gray-500"
                  }`}
                >
                  Pick up your order from a Velora branch.
                </p>
              </button>
            </div>
          </div>

          {/* SHIPPING FORM */}
          {deliveryType === "delivery" && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-black" />

                <h2 className="text-xl font-semibold">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black md:col-span-2"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
                />

                <input
                  type="text"
                  placeholder="City"
                  className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
                />

                <input
                  type="text"
                  placeholder="Street Address"
                  className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black md:col-span-2"
                />
              </div>
            </div>
          )}

          {/* BRANCHES */}
          {deliveryType === "pickup" && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6">Select Branch</h2>

              <div className="space-y-4">
                {branches.map((branch) => (
                  <label
                    key={branch.id}
                    className={`flex items-start gap-4 border rounded-2xl p-5 cursor-pointer transition-all ${
                      selectedBranch === branch.id
                        ? "border-black bg-black text-white"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="branch"
                      checked={selectedBranch === branch.id}
                      onChange={() => setSelectedBranch(branch.id)}
                    />

                    <div>
                      <h3 className="font-semibold text-lg">{branch.name}</h3>

                      <p
                        className={`text-sm mt-1 ${
                          selectedBranch === branch.id
                            ? "text-gray-200"
                            : "text-gray-500"
                        }`}
                      >
                        {branch.address}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* PAYMENT */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-black" />

              <h2 className="text-xl font-semibold">Payment Method</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between border border-gray-200 rounded-2xl p-5 cursor-pointer hover:border-black transition-all">
                <div>
                  <h3 className="font-semibold">Cash On Delivery</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Pay when your order arrives.
                  </p>
                </div>

                <input type="radio" name="payment" defaultChecked />
              </label>

              <label className="flex items-center justify-between border border-gray-200 rounded-2xl p-5 cursor-pointer hover:border-black transition-all">
                <div>
                  <h3 className="font-semibold">Credit / Debit Card</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Visa, MasterCard and Meeza.
                  </p>
                </div>

                <input type="radio" name="payment" />
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-6">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            {/* CART ITEMS */}
            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-gray-100 pb-5"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Size: {item.size} • Color: {item.color}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-gray-500">
                        Qty: {item.qty}
                      </span>

                      <span className="font-semibold">$ {item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTALS */}
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between text-gray-600">
                <span>Subtotal</span>

                <span>$ {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <span>Shipping</span>

                <span>
                  {shipping === 0 ? "Free" : `$ ${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 flex items-center justify-between text-xl font-bold">
                <span>Total</span>

                <span>$ {total.toFixed(2)}</span>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handlePlaceOrder}
              disabled={placing || cart.length === 0}
              className="w-full bg-black text-white py-4 rounded-2xl mt-8 font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {placing ? "Placing Order..." : "Place Order"}
            </button>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-5">
              <ShieldCheck size={18} />
              Secure Checkout Powered by Velora
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
