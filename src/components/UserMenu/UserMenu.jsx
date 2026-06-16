import { useState } from "react";
import { User, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    setOpen(false);
    navigate("/");
  };

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
          {!currentUser ? (
            <>
              <Link
                to="/signin"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <div className="px-4 py-2 mb-2 border-b border-white/10">
                <p className="text-xs text-slate-400">Signed in as</p>
                <p className="text-sm font-semibold text-white truncate">{currentUser.email}</p>
              </div>
              <Link
                to="/account"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
              >
                My Account
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full text-left flex items-center gap-2 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserMenu;
