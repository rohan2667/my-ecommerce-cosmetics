import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 text-gray-700 mt-5">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* About Section */}
        <div>
          <h3 className="text-2xl font-bold text-pink-600 mb-4">Cosmetics</h3>
          <p className="text-sm leading-relaxed">
            Your destination for radiant beauty products crafted to nourish your skin and uplift your soul. Discover the magic in every bottle.
          </p>
          <div className="flex space-x-4 mt-6">
            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterestP].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="text-pink-500 hover:text-pink-700 transition-colors duration-300"
                aria-label="social link"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-pink-600 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/shop" className="hover:text-pink-500 transition">
                Shop All Products
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-pink-500 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-pink-500 transition">
                Beauty Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-pink-500 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-pink-500 transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-xl font-semibold text-pink-600 mb-4">Customer Care</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/shipping" className="hover:text-pink-500 transition">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="/returns" className="hover:text-pink-500 transition">
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-pink-500 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-pink-500 transition">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/support" className="hover:text-pink-500 transition">
                Support Center
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="text-xl font-semibold text-pink-600 mb-4">Stay in Touch</h4>
          <p className="text-sm mb-4">
            Subscribe to get the latest updates on new products, sales & more.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col space-y-3"
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              className="px-4 py-2 rounded-md border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pink-200 text-center py-6 text-xs text-pink-600">
        &copy; {new Date().getFullYear()} Cosmetics. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
