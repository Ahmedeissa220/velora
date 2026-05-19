import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-black pt-32 pb-10 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Grid */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-12
            border-b
            border-white/10
            pb-14
          "
        >
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white">Velora</h2>

            <p className="text-gray-400 mt-5 leading-8">
              Premium ecommerce experience designed for the modern generation.
              Style, technology, and luxury combined in one place.
            </p>

            {/* Socials */}
            <div className="flex items-cente  gap-4 mt-6">
              <a
                href="#"
                className="
                  w-11
                  h-11
                  rounded-full
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  text-gray-300
                  hover:bg-white
                  hover:text-black
                  transition-all
                  duration-300
                "
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="
                  w-11
                  h-11
                  rounded-full
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  text-gray-300
                  hover:bg-white
                  hover:text-black
                  transition-all
                  duration-300
                "
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="
                  w-11
                  h-11
                  rounded-full
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  text-gray-300
                  hover:bg-white
                  hover:text-black
                  transition-all
                  duration-300
                "
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                className="
                  w-11
                  h-11
                  rounded-full
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  text-gray-300
                  hover:bg-white
                  hover:text-black
                  transition-all
                  duration-300
                "
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-6">Shop</h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-all">
                  New Arrivals
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-all">
                  Best Sellers
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-all">
                  Trending
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-all">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-6">Support</h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-all">
                  Help Center
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-all">
                  Shipping Info
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-all">
                  Returns
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-all">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-6">Company</h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-all">
                  About
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-all">
                  Careers
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-all">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-all">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-4
            pt-8
          "
        >
          <p className="text-gray-500 text-sm">
            © 2026 Velora. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Designed & Developed with passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
