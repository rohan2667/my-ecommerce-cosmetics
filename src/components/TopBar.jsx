import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingBasket, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "../modal/AuthModal";
import LanguageSelector from "./LanguageSelector";
import { allProducts } from "../assets/products";

function highlightMatch(text, query) {
  if (!query) return text;
  const escapedQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-pink-200 text-pink-800 font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
}

const TopBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isGuest } = useAuth();

  const [selectedLang, setSelectedLang] = useState({
    code: "US",
    label: "English",
    value: "en",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [showGuestOption, setShowGuestOption] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [searchExpanded, setSearchExpanded] = useState(false);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const uniqueCategories = Array.from(
    new Set(allProducts.map((p) => p.category || "Others"))
  );

  const categories = ["Categories", ...uniqueCategories];

  const handleModalOpen = ({ guest = false, redirectTo = null }) => {
    setShowGuestOption(guest);
    setRedirectPath(redirectTo);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setShowGuestOption(false);
    if (redirectPath) navigate(redirectPath);
    setRedirectPath(null);
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated && !isGuest) {
      handleModalOpen({ guest: true, redirectTo: "/wishlist" });
    } else {
      navigate("/wishlist");
    }
  };

  const handleCartClick = () => {
    if (!isAuthenticated && !isGuest) {
      handleModalOpen({ guest: true, redirectTo: "/cart" });
    } else {
      navigate("/cart");
    }
  };

  const handleAccountClick = () => navigate("/account");

  const filterProducts = (term, category) => {
    if (!term.trim()) return [];
    return allProducts.filter((product) => {
      const matchesCategory =
        category === "Categories" ||
        (product.category || "Others") === category;
      const matchesSearch =
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.brand.toLowerCase().includes(term.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      resetSearch();
      return;
    }

    const filtered = filterProducts(value, selectedCategory);
    setSearchResults(filtered);
    setDropdownOpen(true);
    setSearchExpanded(true);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (!searchTerm.trim()) {
      resetSearch();
      return;
    }
    const filtered = filterProducts(searchTerm, category);
    setSearchResults(filtered);
    setDropdownOpen(true);
    setSearchExpanded(true);
    inputRef.current?.focus();
  };

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
    resetSearch();
  };

  const handleSeeAllClick = () => {
    navigate(
      `/search?query=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(
        selectedCategory
      )}`
    );
    resetSearch();
  };

  const resetSearch = () => {
    setDropdownOpen(false);
    setSearchExpanded(false);
    setSearchTerm("");
    setSelectedCategory("Categories");
    setSearchResults([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        resetSearch();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Group search results by category, max 4 per category, only 2 categories max
  const groupedResults = Object.entries(
    searchResults.reduce((acc, product) => {
      const cat = product.category || "Others";
      if (!acc[cat]) acc[cat] = [];
      if (acc[cat].length < 4) acc[cat].push(product);
      return acc;
    }, {})
  ).slice(0, 2);

  return (
    <div className="bg-white shadow-sm relative overflow-x-hidden">
      <div className="h-[72px] px-8 flex items-center justify-between relative z-50">
        {!searchExpanded && (
          <div className="flex-1 flex items-center space-x-4">
            <Link
              to="/"
              className="text-4xl font-extrabold text-pink-600 font-display tracking-tight"
            >
              Cosmetics
            </Link>
            <span className="text-lg italic font-display text-gray-500 border-l pl-3 hidden sm:inline-block">
              Your beauty, our passion
            </span>
          </div>
        )}

        {/* Search Bar */}
        <div
          className={`flex-1 flex justify-center relative transition-all duration-300 ${
            searchExpanded
              ? "fixed top-0 left-0 right-0 px-8 py-4 shadow-lg z-50 max-w-full w-full"
              : "relative max-w-lg"
          }`}
        >
          <div className="relative w-full text-sm font-secondary text-gray-700">
            <div className="flex items-stretch border border-gray-300 rounded-full bg-white shadow-sm overflow-hidden">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for products, brands, and more..."
                className="flex-1 px-4 py-2 text-gray-900 focus:outline-none rounded-full"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (searchResults.length > 0) {
                    setDropdownOpen(true);
                    setSearchExpanded(true);
                  }
                }}
              />
              {searchExpanded && (
                <button
                  onClick={resetSearch}
                  className="px-4 text-gray-400 hover:text-pink-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="fixed top-[104px] left-0 right-0 z-50 backdrop-blur-3xl border border-gray-200 shadow-xl flex flex-col max-w-5xl mx-auto rounded"
                style={{
                  minWidth: "100vw",
                  maxWidth: "calc(100vw - 2rem)",
                  height: "420px",
                }}
              >
                <div className="flex flex-1 overflow-hidden">
                  {/* Sidebar */}
                  <div className="w-40 border-r border-gray-200 p-4">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={`block w-full text-left mb-2 px-3 py-2 rounded ${
                          selectedCategory === cat
                            ? "bg-pink-100 font-semibold text-pink-700"
                            : "hover:bg-pink-50 text-gray-700"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Products */}
                  <div className="flex-1 px-6 py-4">
                    {groupedResults.length === 0 ? (
                      <div className="py-8 text-center italic text-gray-400">
                        No results for "{searchTerm}" in "{selectedCategory}".
                      </div>
                    ) : (
                      groupedResults.map(([category, products]) => (
                        <div key={category} className="mb-4">
                          <h3 className="text-pink-600 font-semibold mb-2">{category}</h3>
                          <div className="grid grid-cols-4 gap-4">
                            {products.map((product) => {
                              const image =
                                product.image || product.variants?.[0]?.image || "";
                              return (
                                <div
                                  key={product.id}
                                  className="flex flex-col items-center gap-1 cursor-pointer hover:bg-pink-50 rounded p-2"
                                  onClick={() => handleResultClick(product.id)}
                                >
                                  <img
                                    src={image}
                                    alt={product.name}
                                    className="w-16 h-16 rounded object-cover"
                                  />
                                  <p className="text-xs font-medium text-center truncate w-full">
                                    {highlightMatch(product.name, searchTerm)}
                                  </p>
                                  <p className="text-[10px] text-gray-400 text-center truncate w-full">
                                    {highlightMatch(product.brand, searchTerm)}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* See all results button fixed bottom center */}
                <div className="flex items-center justify-center h-[60px] border-t border-gray-100">
                  <button
                    onClick={handleSeeAllClick}
                    className="px-6 py-2 text-pink-600 hover:bg-pink-50 rounded font-semibold"
                  >
                    See all results ({searchResults.length})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {!searchExpanded && (
          <div className="flex-1 flex items-center justify-end space-x-3">
            <Link
              to="/products"
              className="text-2xl font-extrabold font-display bg-gradient-to-r from-yellow-300 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-pulse"
            >
              Shop Now
            </Link>
            {!isAuthenticated && (
              <div className="flex items-center text-lg font-display font-semibold">
                <button
                  onClick={() => handleModalOpen({ guest: true })}
                  className="hover:text-pink-500 font-medium"
                >
                  Login
                </button>
                <span className="text-gray-400 px-1">/</span>
                <button
                  onClick={() => handleModalOpen({ guest: true })}
                  className="hover:text-pink-500 font-medium"
                >
                  Signup
                </button>
              </div>
            )}
            <FaHeart
              title="Wishlist"
              className="text-lg text-gray-600 hover:text-pink-500 cursor-pointer"
              onClick={handleWishlistClick}
            />
            <FaShoppingBasket
              title="Cart"
              className="text-lg text-gray-600 hover:text-pink-500 cursor-pointer"
              onClick={handleCartClick}
            />
            {isAuthenticated && (
              <FaUserCircle
                title="My Account"
                className="text-2xl text-gray-600 hover:text-pink-500 cursor-pointer"
                onClick={handleAccountClick}
              />
            )}
            <div className="w-20 font-display">
              <LanguageSelector
                selectedLang={selectedLang}
                setSelectedLang={setSelectedLang}
              />
            </div>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        showGuestOption={showGuestOption}
      />
    </div>
  );
};

export default TopBar;

