import { useState } from "react";
import { User, X } from "lucide-react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-full hover:bg-white/10 transition text-white"
      >
        <User size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Side Drawer */}
      <div
        className={`
    fixed top-16 right-4

    w-72 sm:w-80

    bg-[#0f0f0f]/95
    backdrop-blur-2xl

    border border-white/10
    rounded-2xl

    shadow-[0_10px_40px_rgba(0,0,0,0.5)]

    z-50

    transform transition-all duration-300 ease-out

    ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
  `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-white font-semibold">Menu</h2>

          <button onClick={() => setOpen(false)}>
            <X className="text-white hover:text-red-400 transition" />
          </button>
        </div>

        {/* Links */}
        <div className="p-3 space-y-2">
          <Link
            to="/signin"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
          >
            Login
          </Link>

          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
          >
            Profile
          </Link>

          <Link
            to="/orders"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
          >
            Orders
          </Link>

          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
