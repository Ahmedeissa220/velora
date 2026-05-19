import { useState } from "react";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

const NavLinks = [
  { name: "Shop", href: "#" },
  { name: "Collections", href: "#" },
  { name: "New Arrivals", href: "#" },
  { name: "Support", href: "#" },
];

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-950/80 text-white sticky top-0 z-50 border-b border-gray-800">
      <header className="container mx-auto px-4">
        {/* Top Navbar */}
        <nav className="h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold tracking-wide">
            Velora
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 font-medium hover:text-white transition duration-300 text-lg"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-md relative">
            <Search className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search tech..."
              className="w-full bg-gray-800 text-white placeholder:text-slate-500
              border border-gray-700 rounded-xl py-2.5 pl-11 pr-4
              focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-5 text-gray-400">
            <Link to="/whishlist">
              <Heart className="cursor-pointer hover:text-white transition" />
            </Link>

            <div className="relative cursor-pointer">
              <Link to="/cart">
                <ShoppingCart className="hover:text-white transition" />
              </Link>

              <span
                className="absolute -top-2 -right-2 bg-white text-gray-900
                text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
              >
                2
              </span>
            </div>
            {/* <Link to="/signin">
              <User className="cursor-pointer hover:text-white transition" />
            </Link> */}
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 font-medium ${
            isOpen ? "max-h-[500px] pb-6" : "max-h-0"
          }`}
        >
          {/* Mobile Search */}
          <div className="relative mt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search tech..."
              className="w-full bg-gray-800 text-white placeholder:text-slate-500
              border border-gray-700 rounded-xl py-2.5 pl-11 pr-4
              focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col mt-6 space-y-5">
            {NavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition text-lg"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center justify-between mt-6 px-4 text-gray-300">
            {/* Left side */}
            <div className="flex items-center gap-6">
              <Link to="/whishlist">
                <Heart className="cursor-pointer hover:text-white transition" />
              </Link>
              <div className="relative cursor-pointer">
                <Link to="/cart">
                  <ShoppingCart className="hover:text-white transition" />
                </Link>

                <span
                  className="
          absolute -top-2 -right-2
          bg-white text-gray-900
          text-[10px] font-bold
          w-4 h-4 rounded-full
          flex items-center justify-center
        "
                >
                  2
                </span>
              </div>
              <div className="flex items-center">
                <UserMenu />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavBar;
