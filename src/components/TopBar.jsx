import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingBasket } from "react-icons/fa";
import { useAuth } from "./AuthContext";
import LanguageSelector from "./LanguageSelector";

const TopBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [selectedLang, setSelectedLang] = useState({
    code: "US",
    label: "English",
    value: "en",
  });

  const handleProtectedNavigation = (path) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center justify-between">

        {/* Left: Logo + Slogan */}
        <div className="flex-1 flex items-center space-x-4">
          <Link
            to="/"
            className="text-3xl font-extrabold text-pink-600 tracking-tight leading-none"
          >
            Cosmetics
          </Link>
          <span className="text-sm italic text-gray-500 border-l pl-3 hidden sm:inline-block">
            Your beauty, our passion
          </span>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Search for products, brands, and more..."
            className="w-full max-w-md px-4 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            style={{ height: 36 }}
          />
        </div>

        {/* Right: Navigation */}
        <div className="flex-1 flex items-center justify-end space-x-3">
          <Link
            to="/products"
            className="text-sm sm:text-md md:text-lg font-bold bg-gradient-to-r from-yellow-300 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-pulse"
            style={{
              backgroundSize: "50% auto",
              animation: "gradientShift 4s ease infinite",
            }}
          >
            Shop Now
          </Link>

          <div className="flex items-center space-x-0 text-sm">
            <Link to="/login" className="hover:text-pink-500 font-medium">
              Login
            </Link>
            <span className="text-gray-400 px-1">/</span>
            <Link to="/signup" className="hover:text-pink-500 font-medium">
              Signup
            </Link>
          </div>

          <FaHeart
            title="Wishlist"
            className="text-lg text-gray-600 hover:text-pink-500 cursor-pointer"
            onClick={() => handleProtectedNavigation("/wishlist")}
          />
          <FaShoppingBasket
            title="Cart"
            className="text-lg text-gray-600 hover:text-pink-500 cursor-pointer"
            onClick={() => handleProtectedNavigation("/cart")}
          />

          <div className="w-36">
            <LanguageSelector
              selectedLang={selectedLang}
              setSelectedLang={setSelectedLang}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;