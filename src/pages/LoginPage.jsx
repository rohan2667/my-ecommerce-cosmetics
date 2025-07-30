// // // // // import React, { useState, useRef } from "react";
// // // // // import { Link, useNavigate } from "react-router-dom";
// // // // // import { FaHeart, FaShoppingBasket, FaUserCircle } from "react-icons/fa";
// // // // // import { useAuth } from "../contexts/AuthContext";
// // // // // import AuthModal from "../modal/AuthModal";
// // // // // import LanguageSelector from "./LanguageSelector";
// // // // // import { allProducts } from "../assets/products"; // Adjust import path as needed

// // // // // // Helper to highlight matched parts of text
// // // // // function highlightMatch(text, query) {
// // // // //   if (!query) return text;

// // // // //   // Escape regex special chars in query
// // // // //   const escapedQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
// // // // //   const regex = new RegExp(`(${escapedQuery})`, "gi");

// // // // //   const parts = text.split(regex);

// // // // //   return parts.map((part, index) =>
// // // // //     regex.test(part) ? (
// // // // //       <span key={index} className="bg-pink-200 text-pink-800 font-semibold">
// // // // //         {part}
// // // // //       </span>
// // // // //     ) : (
// // // // //       part
// // // // //     )
// // // // //   );
// // // // // }

// // // // // const TopBar = () => {
// // // // //   const navigate = useNavigate();
// // // // //   const { isAuthenticated, isGuest } = useAuth();

// // // // //   const [selectedLang, setSelectedLang] = useState({
// // // // //     code: "US",
// // // // //     label: "English",
// // // // //     value: "en",
// // // // //   });

// // // // //   const [modalOpen, setModalOpen] = useState(false);
// // // // //   const [showGuestOption, setShowGuestOption] = useState(false);
// // // // //   const [redirectPath, setRedirectPath] = useState(null);

// // // // //   // Search state
// // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // //   const [searchResults, setSearchResults] = useState([]);
// // // // //   const [dropdownOpen, setDropdownOpen] = useState(false);
// // // // //   const [selectedCategory, setSelectedCategory] = useState("All Categories");

// // // // //   // Refs to handle blur behavior
// // // // //   const dropdownRef = useRef(null);
// // // // //   const inputRef = useRef(null);

// // // // //   // Extract unique categories plus "All Categories"
// // // // //   const categories = [
// // // // //     "All Categories",
// // // // //     ...Array.from(new Set(allProducts.map((p) => p.category || "Others"))),
// // // // //   ];

// // // // //   const handleModalOpen = ({ guest = false, redirectTo = null }) => {
// // // // //     setShowGuestOption(guest);
// // // // //     setRedirectPath(redirectTo);
// // // // //     setModalOpen(true);
// // // // //   };

// // // // //   const handleModalClose = () => {
// // // // //     setModalOpen(false);
// // // // //     setShowGuestOption(false);
// // // // //     if (redirectPath) {
// // // // //       navigate(redirectPath);
// // // // //     }
// // // // //     setRedirectPath(null);
// // // // //   };

// // // // //   const handleWishlistClick = () => {
// // // // //     if (!isAuthenticated && !isGuest) {
// // // // //       handleModalOpen({ guest: true, redirectTo: "/wishlist" });
// // // // //     } else {
// // // // //       navigate("/wishlist");
// // // // //     }
// // // // //   };

// // // // //   const handleCartClick = () => {
// // // // //     if (!isAuthenticated && !isGuest) {
// // // // //       handleModalOpen({ guest: true, redirectTo: "/cart" });
// // // // //     } else {
// // // // //       navigate("/cart");
// // // // //     }
// // // // //   };

// // // // //   const handleAccountClick = () => {
// // // // //     navigate("/account");
// // // // //   };

// // // // //   // Handle search input change
// // // // //   const handleSearchChange = (e) => {
// // // // //     const value = e.target.value;
// // // // //     setSearchTerm(value);

// // // // //     if (value.trim().length === 0) {
// // // // //       setSearchResults([]);
// // // // //       setDropdownOpen(false);
// // // // //       setSelectedCategory("All Categories");
// // // // //       return;
// // // // //     }

// // // // //     const filtered = allProducts.filter((product) => {
// // // // //       const matchesCategory =
// // // // //         selectedCategory === "All Categories" ||
// // // // //         (product.category || "Others") === selectedCategory;

// // // // //       const matchesSearch =
// // // // //         product.name.toLowerCase().includes(value.toLowerCase()) ||
// // // // //         product.brand.toLowerCase().includes(value.toLowerCase());

// // // // //       return matchesCategory && matchesSearch;
// // // // //     });

// // // // //     setSearchResults(filtered);
// // // // //     setDropdownOpen(true); // always open dropdown on search input change when results update
// // // // //   };

// // // // //   // When category changes, refilter search results based on new category + current search term
// // // // //   const handleCategoryClick = (category) => {
// // // // //     setSelectedCategory(category);

// // // // //     if (searchTerm.trim().length === 0) {
// // // // //       setSearchResults([]);
// // // // //       setDropdownOpen(false);
// // // // //       return;
// // // // //     }

// // // // //     const filtered = allProducts.filter((product) => {
// // // // //       const matchesCategory =
// // // // //         category === "All Categories" || (product.category || "Others") === category;

// // // // //       const matchesSearch =
// // // // //         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //         product.brand.toLowerCase().includes(searchTerm.toLowerCase());

// // // // //       return matchesCategory && matchesSearch;
// // // // //     });

// // // // //     setSearchResults(filtered);
// // // // //     setDropdownOpen(true); // keep dropdown open even if no results to show message
// // // // //   };

// // // // //   // Handle clicking a search result
// // // // //   const handleResultClick = (productId) => {
// // // // //     navigate(`/product/${productId}`);
// // // // //     setDropdownOpen(false);
// // // // //     setSearchTerm("");
// // // // //     setSelectedCategory("All Categories");
// // // // //   };

// // // // //   // Group search results by category
// // // // //   const groupedResults = searchResults.reduce((acc, product) => {
// // // // //     const category = product.category || "Others";
// // // // //     if (!acc[category]) acc[category] = [];
// // // // //     acc[category].push(product);
// // // // //     return acc;
// // // // //   }, {});

// // // // //   // Handle input blur with dropdown ref check to prevent closing when clicking dropdown
// // // // //   const handleInputBlur = () => {
// // // // //     setTimeout(() => {
// // // // //       const active = document.activeElement;
// // // // //       if (dropdownRef.current && dropdownRef.current.contains(active)) {
// // // // //         inputRef.current?.focus(); // keep focus if clicking inside dropdown
// // // // //         return;
// // // // //       }
// // // // //       setDropdownOpen(false);
// // // // //     }, 150);
// // // // //   };

// // // // //   return (
// // // // //     <div className="bg-white shadow-sm relative">
// // // // //       <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center justify-between relative z-50">
// // // // //         {/* Left: Logo + Slogan */}
// // // // //         <div className="flex-1 flex items-center space-x-4">
// // // // //           <Link
// // // // //             to="/"
// // // // //             className="text-4xl font-extrabold text-pink-600 font-display tracking-tight leading-none"
// // // // //           >
// // // // //             Cosmetics
// // // // //           </Link>
// // // // //           <span className="text-lg italic font-display text-gray-500 border-l pl-3 hidden sm:inline-block">
// // // // //             Your beauty, our passion
// // // // //           </span>
// // // // //         </div>

// // // // //         {/* Center: Search Bar */}
// // // // //         <div className="flex-1 flex justify-center relative">
// // // // //           <input
// // // // //             ref={inputRef}
// // // // //             type="text"
// // // // //             placeholder="Search for products, brands, and more..."
// // // // //             className="w-full max-w-md px-4 py-2 text-sm font-secondary font-medium text-black border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
// // // // //             style={{ height: 36 }}
// // // // //             value={searchTerm}
// // // // //             onChange={handleSearchChange}
// // // // //             onFocus={() => {
// // // // //               if (searchResults.length > 0) setDropdownOpen(true);
// // // // //             }}
// // // // //             onBlur={handleInputBlur}
// // // // //           />

// // // // //           {/* Search Results Dropdown with Categories Sidebar */}
// // // // //           {dropdownOpen && (
// // // // //             <div
// // // // //               ref={dropdownRef}
// // // // //               className="absolute top-full mt-1 w-full max-w-md bg-white border border-gray-300 rounded-md shadow-lg max-h-72 overflow-hidden z-50 flex"
// // // // //             >
// // // // //               {/* Categories Sidebar */}
// // // // //               <div className="w-32 border-r border-gray-200 overflow-y-auto">
// // // // //                 {categories.map((cat) => (
// // // // //                   <div
// // // // //                     key={cat}
// // // // //                     onClick={() => handleCategoryClick(cat)}
// // // // //                     className={`cursor-pointer px-3 py-2 text-sm ${
// // // // //                       selectedCategory === cat
// // // // //                         ? "bg-pink-100 font-semibold text-pink-700"
// // // // //                         : "hover:bg-pink-50"
// // // // //                     }`}
// // // // //                     tabIndex={0}
// // // // //                     onKeyDown={(e) => {
// // // // //                       if (e.key === "Enter" || e.key === " ") {
// // // // //                         handleCategoryClick(cat);
// // // // //                       }
// // // // //                     }}
// // // // //                   >
// // // // //                     {cat}
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>

// // // // //               {/* Results List */}
// // // // //               <div className="flex-1 max-h-72 overflow-y-auto p-3 text-center text-gray-500">
// // // // //                 {searchResults.length === 0 ? (
// // // // //                   <div className="py-10 italic">
// // // // //                     No products found in "{selectedCategory}" matching "{searchTerm}".
// // // // //                   </div>
// // // // //                 ) : (
// // // // //                   Object.entries(groupedResults).map(([category, products]) => (
// // // // //                     <div key={category} className="py-2 px-3 border-b last:border-b-0 text-left">
// // // // //                       <h3 className="font-semibold text-pink-600 text-sm mb-1">{category}</h3>
// // // // //                       {products.map((product) => {
// // // // //                         const image = product.image || product.variants?.[0]?.image || "";

// // // // //                         return (
// // // // //                           <div
// // // // //                             key={product.id}
// // // // //                             onClick={() => handleResultClick(product.id)}
// // // // //                             className="flex items-center gap-3 px-4 py-2 hover:bg-pink-50 cursor-pointer"
// // // // //                           >
// // // // //                             <img
// // // // //                               src={image}
// // // // //                               alt={product.name}
// // // // //                               className="w-10 h-10 object-cover rounded"
// // // // //                             />
// // // // //                             <div>
// // // // //                               <p className="font-medium text-sm">
// // // // //                                 {highlightMatch(product.name, searchTerm)}
// // // // //                               </p>
// // // // //                               <p className="text-xs text-gray-500">
// // // // //                                 {highlightMatch(product.brand, searchTerm)}
// // // // //                               </p>
// // // // //                             </div>
// // // // //                           </div>
// // // // //                         );
// // // // //                       })}
// // // // //                     </div>
// // // // //                   ))
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* Right: Navigation */}
// // // // //         <div className="flex-1 flex items-center justify-end space-x-3">
// // // // //           <Link
// // // // //             to="/products"
// // // // //             className="text-2xl font-extrabold font-display bg-gradient-to-r from-yellow-300 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-pulse"
// // // // //             style={{
// // // // //               backgroundSize: "50% auto",
// // // // //               animation: "gradientShift 4s ease infinite",
// // // // //             }}
// // // // //           >
// // // // //             Shop Now
// // // // //           </Link>

// // // // //           {!isAuthenticated && (
// // // // //             <div className="flex items-center space-x-0 text-lg font-display font-semibold">
// // // // //               <button
// // // // //                 onClick={() => handleModalOpen({ guest: true })}
// // // // //                 className="hover:text-pink-500 font-medium"
// // // // //               >
// // // // //                 Login
// // // // //               </button>
// // // // //               <span className="text-gray-400 px-1">/</span>
// // // // //               <button
// // // // //                 onClick={() => handleModalOpen({ guest: true })}
// // // // //                 className="hover:text-pink-500 font-medium"
// // // // //               >
// // // // //                 Signup
// // // // //               </button>
// // // // //             </div>
// // // // //           )}

// // // // //           <FaHeart
// // // // //             title="Wishlist"
// // // // //             className="text-lg text-gray-600 hover:text-pink-500 cursor-pointer"
// // // // //             onClick={handleWishlistClick}
// // // // //           />

// // // // //           <FaShoppingBasket
// // // // //             title="Cart"
// // // // //             className="text-lg text-gray-600 hover:text-pink-500 cursor-pointer"
// // // // //             onClick={handleCartClick}
// // // // //           />

// // // // //           {isAuthenticated && (
// // // // //             <FaUserCircle
// // // // //               title="My Account"
// // // // //               className="text-2xl text-gray-600 hover:text-pink-500 cursor-pointer"
// // // // //               onClick={handleAccountClick}
// // // // //             />
// // // // //           )}

// // // // //           <div className="w-20 font-display">
// // // // //             <LanguageSelector
// // // // //               selectedLang={selectedLang}
// // // // //               setSelectedLang={setSelectedLang}
// // // // //             />
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <AuthModal
// // // // //         isOpen={modalOpen}
// // // // //         onClose={handleModalClose}
// // // // //         showGuestOption={showGuestOption}
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default TopBar;
// // // // import React, { useState, useRef } from "react";
// // // // import { Link, useNavigate } from "react-router-dom";
// // // // import { FaHeart, FaShoppingBasket, FaUserCircle, FaChevronDown } from "react-icons/fa";
// // // // import { useAuth } from "../contexts/AuthContext";
// // // // import AuthModal from "../modal/AuthModal";
// // // // import LanguageSelector from "./LanguageSelector";
// // // // import { allProducts } from "../assets/products"; // Adjust import path as needed

// // // // // Helper to highlight matched parts of text
// // // // function highlightMatch(text, query) {
// // // //   if (!query) return text;

// // // //   const escapedQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
// // // //   const regex = new RegExp(`(${escapedQuery})`, "gi");

// // // //   const parts = text.split(regex);

// // // //   return parts.map((part, index) =>
// // // //     regex.test(part) ? (
// // // //       <span key={index} className="bg-pink-200 text-pink-800 font-semibold">
// // // //         {part}
// // // //       </span>
// // // //     ) : (
// // // //       part
// // // //     )
// // // //   );
// // // // }

// // // // const TopBar = () => {
// // // //   const navigate = useNavigate();
// // // //   const { isAuthenticated, isGuest } = useAuth();

// // // //   const [selectedLang, setSelectedLang] = useState({
// // // //     code: "US",
// // // //     label: "English",
// // // //     value: "en",
// // // //   });

// // // //   const [modalOpen, setModalOpen] = useState(false);
// // // //   const [showGuestOption, setShowGuestOption] = useState(false);
// // // //   const [redirectPath, setRedirectPath] = useState(null);

// // // //   // Search state
// // // //   const [searchTerm, setSearchTerm] = useState("");
// // // //   const [searchResults, setSearchResults] = useState([]);
// // // //   const [dropdownOpen, setDropdownOpen] = useState(false);
// // // //   const [selectedCategory, setSelectedCategory] = useState("All Categories");

// // // //   // Category dropdown inside search bar
// // // //   const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

// // // //   // Refs to handle blur/focus behavior
// // // //   const dropdownRef = useRef(null);
// // // //   const inputRef = useRef(null);
// // // //   const categorySelectorRef = useRef(null);

// // // //   // Extract unique categories plus "All Categories"
// // // //   const categories = [
// // // //     "All Categories",
// // // //     ...Array.from(new Set(allProducts.map((p) => p.category || "Others"))),
// // // //   ];

// // // //   const handleModalOpen = ({ guest = false, redirectTo = null }) => {
// // // //     setShowGuestOption(guest);
// // // //     setRedirectPath(redirectTo);
// // // //     setModalOpen(true);
// // // //   };

// // // //   const handleModalClose = () => {
// // // //     setModalOpen(false);
// // // //     setShowGuestOption(false);
// // // //     if (redirectPath) {
// // // //       navigate(redirectPath);
// // // //     }
// // // //     setRedirectPath(null);
// // // //   };

// // // //   const handleWishlistClick = () => {
// // // //     if (!isAuthenticated && !isGuest) {
// // // //       handleModalOpen({ guest: true, redirectTo: "/wishlist" });
// // // //     } else {
// // // //       navigate("/wishlist");
// // // //     }
// // // //   };

// // // //   const handleCartClick = () => {
// // // //     if (!isAuthenticated && !isGuest) {
// // // //       handleModalOpen({ guest: true, redirectTo: "/cart" });
// // // //     } else {
// // // //       navigate("/cart");
// // // //     }
// // // //   };

// // // //   const handleAccountClick = () => {
// // // //     navigate("/account");
// // // //   };

// // // //   // Filter products based on search term and selected category
// // // //   const filterProducts = (term, category) => {
// // // //     if (!term.trim()) return [];

// // // //     return allProducts.filter((product) => {
// // // //       const matchesCategory =
// // // //         category === "All Categories" || (product.category || "Others") === category;

// // // //       const matchesSearch =
// // // //         product.name.toLowerCase().includes(term.toLowerCase()) ||
// // // //         product.brand.toLowerCase().includes(term.toLowerCase());

// // // //       return matchesCategory && matchesSearch;
// // // //     });
// // // //   };

// // // //   const handleSearchChange = (e) => {
// // // //     const value = e.target.value;
// // // //     setSearchTerm(value);

// // // //     if (value.trim().length === 0) {
// // // //       setSearchResults([]);
// // // //       setDropdownOpen(false);
// // // //       return;
// // // //     }

// // // //     const filtered = filterProducts(value, selectedCategory);
// // // //     setSearchResults(filtered);
// // // //     setDropdownOpen(true);
// // // //   };

// // // //   const handleCategorySelect = (category) => {
// // // //     setSelectedCategory(category);
// // // //     setCategoryDropdownOpen(false);

// // // //     if (searchTerm.trim().length === 0) {
// // // //       setSearchResults([]);
// // // //       setDropdownOpen(false);
// // // //       return;
// // // //     }

// // // //     const filtered = filterProducts(searchTerm, category);
// // // //     setSearchResults(filtered);
// // // //     setDropdownOpen(true);
// // // //     inputRef.current?.focus();
// // // //   };

// // // //   const handleResultClick = (productId) => {
// // // //     navigate(`/product/${productId}`);
// // // //     setDropdownOpen(false);
// // // //     setSearchTerm("");
// // // //     setSelectedCategory("All Categories");
// // // //   };

// // // //   // Group search results by category
// // // //   const groupedResults = searchResults.reduce((acc, product) => {
// // // //     const category = product.category || "Others";
// // // //     if (!acc[category]) acc[category] = [];
// // // //     acc[category].push(product);
// // // //     return acc;
// // // //   }, {});

// // // //   // Close dropdowns if click outside
// // // //   React.useEffect(() => {
// // // //     function handleClickOutside(event) {
// // // //       if (
// // // //         dropdownRef.current &&
// // // //         !dropdownRef.current.contains(event.target) &&
// // // //         inputRef.current &&
// // // //         !inputRef.current.contains(event.target) &&
// // // //         categorySelectorRef.current &&
// // // //         !categorySelectorRef.current.contains(event.target)
// // // //       ) {
// // // //         setDropdownOpen(false);
// // // //         setCategoryDropdownOpen(false);
// // // //       }
// // // //     }
// // // //     document.addEventListener("mousedown", handleClickOutside);
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // //   }, []);

// // // //   return (
// // // //     <div className="bg-white shadow-sm relative">
// // // //       <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center justify-between relative z-45">
// // // //         {/* Left: Logo + Slogan */}
// // // //         <div className="flex-1 flex items-center space-x-4">
// // // //           <Link
// // // //             to="/"
// // // //             className="text-4xl font-extrabold text-pink-600 font-display tracking-tight leading-none"
// // // //           >
// // // //             Cosmetics
// // // //           </Link>
// // // //           <span className="text-lg italic font-display text-gray-500 border-l pl-3 hidden sm:inline-block">
// // // //             Your beauty, our passion
// // // //           </span>
// // // //         </div>

// // // //         {/* Center: Search Bar with Category Selector */}
// // // //         <div className="flex-1 flex justify-center relative">
// // // //           <div className="relative w-full max-w-md">
// // // //             {/* Search bar container */}
// // // //             <div className="flex items-center border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-pink-400 overflow-hidden">
// // // //               {/* Category selector */}
// // // //               <div
// // // //                 ref={categorySelectorRef}
// // // //                 className="relative cursor-pointer select-none bg-gray-100 text-gray-700 px-3 py-1 flex items-center text-sm font-medium"
// // // //                 onClick={() => setCategoryDropdownOpen((open) => !open)}
// // // //                 tabIndex={0}
// // // //                 onKeyDown={(e) => {
// // // //                   if (e.key === "Enter" || e.key === " ") {
// // // //                     e.preventDefault();
// // // //                     setCategoryDropdownOpen((open) => !open);
// // // //                   }
// // // //                 }}
// // // //               >
// // // //                 {selectedCategory}
// // // //                 <FaChevronDown className="ml-1 text-xs" />
// // // //                 {/* Category dropdown */}
// // // //                 {categoryDropdownOpen && (
// // // //                   <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto text-sm">
// // // //                     {categories.map((cat) => (
// // // //                       <div
// // // //                         key={cat}
// // // //                         className={`px-3 py-2 cursor-pointer hover:bg-pink-50 ${
// // // //                           selectedCategory === cat
// // // //                             ? "bg-pink-100 font-semibold text-pink-700"
// // // //                             : ""
// // // //                         }`}
// // // //                         onClick={() => handleCategorySelect(cat)}
// // // //                         tabIndex={0}
// // // //                         onKeyDown={(e) => {
// // // //                           if (e.key === "Enter" || e.key === " ") {
// // // //                             e.preventDefault();
// // // //                             handleCategorySelect(cat);
// // // //                           }
// // // //                         }}
// // // //                       >
// // // //                         {cat}
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 )}
// // // //               </div>

// // // //               {/* Search input */}
// // // //               <input
// // // //                 ref={inputRef}
// // // //                 type="text"
// // // //                 placeholder="Search for products, brands, and more..."
// // // //                 className="flex-1 px-4 py-2 text-sm font-secondary font-medium text-black focus:outline-none"
// // // //                 style={{ height: 36 }}
// // // //                 value={searchTerm}
// // // //                 onChange={handleSearchChange}
// // // //                 onFocus={() => {
// // // //                   if (searchResults.length > 0) setDropdownOpen(true);
// // // //                 }}
// // // //               />
// // // //             </div>

// // // //             {/* Search Results Dropdown */}
// // // //             {dropdownOpen && (
// // // //               <div
// // // //                 ref={dropdownRef}
// // // //                 className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-72 overflow-hidden z-50"
// // // //               >
// // // //                 <div className="max-h-72 overflow-y-auto p-3 text-center text-gray-500">
// // // //                   {searchResults.length === 0 ? (
// // // //                     <div className="py-10 italic">
// // // //                       No products found in "{selectedCategory}" matching "
// // // //                       {searchTerm}".
// // // //                     </div>
// // // //                   ) : (
// // // //                     Object.entries(groupedResults).map(([category, products]) => (
// // // //                       <div
// // // //                         key={category}
// // // //                         className="py-2 px-3 border-b last:border-b-0 text-left"
// // // //                       >
// // // //                         <h3 className="font-semibold text-pink-600 text-sm mb-1">
// // // //                           {category}
// // // //                         </h3>
// // // //                         {products.map((product) => {
// // // //                           const image =
// // // //                             product.image || product.variants?.[0]?.image || "";

// // // //                           return (
// // // //                             <div
// // // //                               key={product.id}
// // // //                               onClick={() => handleResultClick(product.id)}
// // // //                               className="flex items-center gap-3 px-4 py-2 hover:bg-pink-50 cursor-pointer"
// // // //                             >
// // // //                               <img
// // // //                                 src={image}
// // // //                                 alt={product.name}
// // // //                                 className="w-10 h-10 object-cover rounded"
// // // //                               />
// // // //                               <div>
// // // //                                 <p className="font-medium text-sm">
// // // //                                   {highlightMatch(product.name, searchTerm)}
// // // //                                 </p>
// // // //                                 <p className="text-xs text-gray-500">
// // // //                                   {highlightMatch(product.brand, searchTerm)}
// // // //                                 </p>
// // // //                               </div>
// // // //                             </div>
// // // //                           );
// // // //                         })}
// // // //                       </div>
// // // //                     ))
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         {/* Right: Navigation */}
// // // //         <div className="flex-1 flex items-center justify-end space-x-3">
// // // //           <Link
// // // //             to="/products"
// // // //             className="text-2xl font-extrabold font-display bg-gradient-to-r from-yellow-300 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-pulse"
// // // //             style={{
// // // //               backgroundSize: "50% auto",
// // // //               animation: "gradientShift 4s ease infinite",
// // // //             }}
// // // //           >
// // // //             Shop Now
// // // //           </Link>

// // // //           {!isAuthenticated && (
// // // //             <div className="flex items-center space-x-0 text-lg font-display font-semibold">
// // // //               <button
// // // //                 onClick={() => handleModalOpen({ guest: true })}
// // // //                 className="hover:text-pink-500 font-medium"
// // // //               >
// // // //                 Login
// // // //               </button>
// // // //               <span className="text-gray-400 px-1">/</span>
// // // //               <button
// // // //                 onClick={() => handleModalOpen({ guest: true })}
// // // //                 className="hover:text-pink-500 font-medium"
// // // //               >
// // // //                 Signup
// // // //               </button>
// // // //             </div>
// // // //           )}

// // // //           <FaHeart
// // // //             title="Wishlist"
// // // //             className="text-lg text-gray-600 hover:text-pink-500 cursor-pointer"
// // // //             onClick={handleWishlistClick}
// // // //           />

// // // //           <FaShoppingBasket
// // // //             title="Cart"
// // // //             className="text-lg text-gray-600 hover:text-pink-500 cursor-pointer"
// // // //             onClick={handleCartClick}
// // // //           />

// // // //           {isAuthenticated && (
// // // //             <FaUserCircle
// // // //               title="My Account"
// // // //               className="text-2xl text-gray-600 hover:text-pink-500 cursor-pointer"
// // // //               onClick={handleAccountClick}
// // // //             />
// // // //           )}

// // // //           <div className="w-20 font-display">
// // // //             <LanguageSelector
// // // //               selectedLang={selectedLang}
// // // //               setSelectedLang={setSelectedLang}
// // // //             />
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <AuthModal
// // // //         isOpen={modalOpen}
// // // //         onClose={handleModalClose}
// // // //         showGuestOption={showGuestOption}
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default TopBar;

// // import React, { useState, useRef, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { FaHeart, FaShoppingBasket, FaUserCircle, FaChevronDown } from "react-icons/fa";
// // import { useAuth } from "../contexts/AuthContext";
// // import AuthModal from "../modal/AuthModal";
// // import LanguageSelector from "./LanguageSelector";
// // import { allProducts } from "../assets/products"; // Adjust import path as needed

// // // Helper to highlight matched parts of text
// // function highlightMatch(text, query) {
// //   if (!query) return text;

// //   const escapedQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
// //   const regex = new RegExp(`(${escapedQuery})`, "gi");

// //   const parts = text.split(regex);

// //   return parts.map((part, index) =>
// //     regex.test(part) ? (
// //       <span key={index} className="bg-pink-200 text-pink-800 font-semibold">
// //         {part}
// //       </span>
// //     ) : (
// //       part
// //     )
// //   );
// // }

// // const TopBar = () => {
// //   const navigate = useNavigate();
// //   const { isAuthenticated, isGuest } = useAuth();

// //   const [selectedLang, setSelectedLang] = useState({
// //     code: "US",
// //     label: "English",
// //     value: "en",
// //   });

// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [showGuestOption, setShowGuestOption] = useState(false);
// //   const [redirectPath, setRedirectPath] = useState(null);

// //   // Search state
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const [selectedCategory, setSelectedCategory] = useState("All Categories");

// //   // Category dropdown inside search bar
// //   const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

// //   // Refs to handle blur/focus behavior
// //   const dropdownRef = useRef(null);
// //   const inputRef = useRef(null);
// //   const categorySelectorRef = useRef(null);

// //   // Extract unique categories plus "All Categories"
// //   const categories = [
// //     "All Categories",
// //     ...Array.from(new Set(allProducts.map((p) => p.category || "Others"))),
// //   ];

// //   const handleModalOpen = ({ guest = false, redirectTo = null }) => {
// //     setShowGuestOption(guest);
// //     setRedirectPath(redirectTo);
// //     setModalOpen(true);
// //   };

// //   const handleModalClose = () => {
// //     setModalOpen(false);
// //     setShowGuestOption(false);
// //     if (redirectPath) {
// //       navigate(redirectPath);
// //     }
// //     setRedirectPath(null);
// //   };

// //   const handleWishlistClick = () => {
// //     if (!isAuthenticated && !isGuest) {
// //       handleModalOpen({ guest: true, redirectTo: "/wishlist" });
// //     } else {
// //       navigate("/wishlist");
// //     }
// //   };

// //   const handleCartClick = () => {
// //     if (!isAuthenticated && !isGuest) {
// //       handleModalOpen({ guest: true, redirectTo: "/cart" });
// //     } else {
// //       navigate("/cart");
// //     }
// //   };

// //   const handleAccountClick = () => {
// //     navigate("/account");
// //   };

// //   // Filter products based on search term and selected category
// //   const filterProducts = (term, category) => {
// //     if (!term.trim()) return [];

// //     return allProducts.filter((product) => {
// //       const matchesCategory =
// //         category === "All Categories" || (product.category || "Others") === category;

// //       const matchesSearch =
// //         product.name.toLowerCase().includes(term.toLowerCase()) ||
// //         product.brand.toLowerCase().includes(term.toLowerCase());

// //       return matchesCategory && matchesSearch;
// //     });
// //   };

// //   const handleSearchChange = (e) => {
// //     const value = e.target.value;
// //     setSearchTerm(value);

// //     if (value.trim().length === 0) {
// //       setSearchResults([]);
// //       setDropdownOpen(false);
// //       return;
// //     }

// //     const filtered = filterProducts(value, selectedCategory);
// //     setSearchResults(filtered);
// //     setDropdownOpen(true);
// //   };

// //   const handleCategorySelect = (category) => {
// //     setSelectedCategory(category);
// //     setCategoryDropdownOpen(false);

// //     if (searchTerm.trim().length === 0) {
// //       setSearchResults([]);
// //       setDropdownOpen(false);
// //       return;
// //     }

// //     const filtered = filterProducts(searchTerm, category);
// //     setSearchResults(filtered);
// //     setDropdownOpen(true);
// //     inputRef.current?.focus();
// //   };

// //   const handleResultClick = (productId) => {
// //     navigate(`/product/${productId}`);
// //     setDropdownOpen(false);
// //     setSearchTerm("");
// //     setSelectedCategory("All Categories");
// //   };

// //   // Group search results by category
// //   const groupedResults = searchResults.reduce((acc, product) => {
// //     const category = product.category || "Others";
// //     if (!acc[category]) acc[category] = [];
// //     acc[category].push(product);
// //     return acc;
// //   }, {});

// //   // Close dropdowns if click outside
// //   useEffect(() => {
// //     function handleClickOutside(event) {
// //       if (
// //         dropdownRef.current &&
// //         !dropdownRef.current.contains(event.target) &&
// //         inputRef.current &&
// //         !inputRef.current.contains(event.target) &&
// //         categorySelectorRef.current &&
// //         !categorySelectorRef.current.contains(event.target)
// //       ) {
// //         setDropdownOpen(false);
// //         setCategoryDropdownOpen(false);
// //       }
// //     }
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   return (
// //     <div className="bg-white shadow-sm relative">
// //       <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center justify-between relative z-50">
// //         {/* Left: Logo + Slogan */}
// //         <div className="flex-1 flex items-center space-x-4">
// //           <Link
// //             to="/"
// //             className="text-4xl font-extrabold text-pink-600 font-display tracking-tight leading-none"
// //           >
// //             Cosmetics
// //           </Link>
// //           <span className="text-lg italic font-display text-gray-500 border-l pl-3 hidden sm:inline-block">
// //             Your beauty, our passion
// //           </span>
// //         </div>

// //         {/* Center: Search Bar with Category Selector */}
// //         <div className="flex-1 flex justify-center relative">
// //           <div className="relative w-full max-w-md">
// //             {/* Search bar container WITHOUT overflow-hidden */}
// //             <div className="flex items-center border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-pink-400">
// //               {/* Category selector */}
// //               <div
// //                 ref={categorySelectorRef}
// //                 className="relative cursor-pointer select-none bg-gray-100 text-gray-700 px-3 py-1 flex items-center text-sm font-medium"
// //                 onClick={() => setCategoryDropdownOpen((open) => !open)}
// //                 tabIndex={0}
// //                 onKeyDown={(e) => {
// //                   if (e.key === "Enter" || e.key === " ") {
// //                     e.preventDefault();
// //                     setCategoryDropdownOpen((open) => !open);
// //                   }
// //                 }}
// //               >
// //                 {selectedCategory}
// //                 <FaChevronDown className="ml-1 text-xs" />
// //                 {/* Category dropdown */}
// //                 {categoryDropdownOpen && (
// //                   <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto text-sm">
// //                     {categories.map((cat) => (
// //                       <div
// //                         key={cat}
// //                         className={`px-3 py-2 cursor-pointer hover:bg-pink-50 ${
// //                           selectedCategory === cat
// //                             ? "bg-pink-100 font-semibold text-pink-700"
// //                             : ""
// //                         }`}
// //                         onClick={() => handleCategorySelect(cat)}
// //                         tabIndex={0}
// //                         onKeyDown={(e) => {
// //                           if (e.key === "Enter" || e.key === " ") {
// //                             e.preventDefault();
// //                             handleCategorySelect(cat);
// //                           }
// //                         }}
// //                       >
// //                         {cat}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Search input */}
// //               <input
// //                 ref={inputRef}
// //                 type="text"
// //                 placeholder="Search for products, brands, and more..."
// //                 className="flex-1 px-4 py-2 text-sm font-secondary font-medium text-black focus:outline-none"
// //                 style={{ height: 36 }}
// //                 value={searchTerm}
// //                 onChange={handleSearchChange}
// //                 onFocus={() => {
// //                   if (searchResults.length > 0) setDropdownOpen(true);
// //                 }}
// //               />
// //             </div>

// //             {/* Search Results Dropdown */}
// //             {dropdownOpen && (
// //               <div
// //                 ref={dropdownRef}
// //                 className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-72 overflow-hidden z-50"
// //               >
// //                 <div className="max-h-72 overflow-y-auto p-3 text-center text-gray-500">
// //                   {searchResults.length === 0 ? (
// //                     <div className="py-10 italic">
// //                       No products found in "{selectedCategory}" matching "
// //                       {searchTerm}".
// //                     </div>
// //                   ) : (
// //                     Object.entries(groupedResults).map(([category, products]) => (
// //                       <div
// //                         key={category}
// //                         className="py-2 px-3 border-b last:border-b-0 text-left"
// //                       >
// //                         <h3 className="font-semibold text-pink-600 text-sm mb-1">
// //                           {category}
// //                         </h3>
// //                         {products.map((product) => {
// //                           const image =
// //                             product.image || product.variants?.[0]?.image || "";

// //                           return (
// //                             <div
// //                               key={product.id}
// //                               onClick={() => handleResultClick(product.id)}
// //                               className="flex items-center gap-3 px-4 py-2 hover:bg-pink-50 cursor-pointer"
// //                             >
// //                               <img
// //                                 src={image}
// //                                 alt={product.name}
// //                                 className="w-10 h-10 object-cover rounded"
// //                               />
// //                               <div>
// //                                 <p className="font-medium text-sm">
// //                                   {highlightMatch(product.name, searchTerm)}
// //                                 </p>
// //                                 <p className="text-xs text-gray-500">
// //                                   {highlightMatch(product.brand, searchTerm)}
// //                                 </p>
// //                               </div>
// //                             </div>
// //                           );
// //                         })}
// //                       </div>
// //                     ))
// //                   )}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Right: Navigation */}
// //         <div className="flex-1 flex items-center justify-end space-x-3">
// //           <Link
// //             to="/products"
// //             className="text-2xl font-extrabold font-display bg-gradient-to-r from-yellow-300 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-pulse"
// //             style={{
// //               backgroundSize: "50% auto",
// //               animation: "gradientShift 4s ease infinite",
// //             }}
// //           >
// //             Shop Now
// //           </Link>

// //           {!isAuthenticated && (
// //             <div className="flex items-center space-x-0 text-lg font-display font-semibold">
// //               <button
// //                 onClick={() => handleModalOpen({ guest: true })}
// //                 className="hover:text-pink-500 font-medium"
// //               >
// //                 Login
// //               </button>
// //               <span className="text-gray-400 px-1">/</span>
// //               <button
// //                 onClick={() => handleModalOpen({ guest: true })}
// //                 className="hover:text-pink-500 font-medium"
// //               >
// //                 Signup
// //               </button>
// //             </div>
// //           )}

// //           <FaHeart
// //             title="Wishlist"
// //             className="text-lg text-gray-600 hover:text-pink-500 cursor-pointer"
// //             onClick={handleWishlistClick}
// //           />

// //           <FaShoppingBasket
// //             title="Cart"
// //             className="text-lg text-gray-600 hover:text-pink-500 cursor-pointer"
// //             onClick={handleCartClick}
// //           />

// //           {isAuthenticated && (
// //             <FaUserCircle
// //               title="My Account"
// //               className="text-2xl text-gray-600 hover:text-pink-500 cursor-pointer"
// //               onClick={handleAccountClick}
// //             />
// //           )}

// //           <div className="w-20 font-display">
// //             <LanguageSelector
// //               selectedLang={selectedLang}
// //               setSelectedLang={setSelectedLang}
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       <AuthModal
// //         isOpen={modalOpen}
// //         onClose={handleModalClose}
// //         showGuestOption={showGuestOption}
// //       />
// //     </div>
// //   );
// // };

// // export default TopBar;

// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaHeart, FaShoppingBasket, FaUserCircle, FaChevronDown } from "react-icons/fa";
// import { useAuth } from "../contexts/AuthContext";
// import AuthModal from "../modal/AuthModal";
// import LanguageSelector from "./LanguageSelector";
// import { allProducts } from "../assets/products"; // Adjust import path as needed

// // Helper to highlight matched parts of text
// function highlightMatch(text, query) {
//   if (!query) return text;

//   const escapedQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
//   const regex = new RegExp(`(${escapedQuery})`, "gi");

//   const parts = text.split(regex);

//   return parts.map((part, index) =>
//     regex.test(part) ? (
//       <span key={index} className="bg-pink-200 text-pink-800 font-semibold">
//         {part}
//       </span>
//     ) : (
//       part
//     )
//   );
// }

// const TopBar = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, isGuest } = useAuth();

//   const [selectedLang, setSelectedLang] = useState({
//     code: "US",
//     label: "English",
//     value: "en",
//   });

//   const [modalOpen, setModalOpen] = useState(false);
//   const [showGuestOption, setShowGuestOption] = useState(false);
//   const [redirectPath, setRedirectPath] = useState(null);

//   // Search state
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All Categories");

//   // Category dropdown inside search bar
//   const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

//   // Refs to handle blur/focus behavior
//   const dropdownRef = useRef(null);
//   const inputRef = useRef(null);
//   const categorySelectorRef = useRef(null);

//   // Extract unique categories plus "All Categories"
//   const categories = [
//     "All Categories",
//     ...Array.from(new Set(allProducts.map((p) => p.category || "Others"))),
//   ];

//   const handleModalOpen = ({ guest = false, redirectTo = null }) => {
//     setShowGuestOption(guest);
//     setRedirectPath(redirectTo);
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//     setShowGuestOption(false);
//     if (redirectPath) {
//       navigate(redirectPath);
//     }
//     setRedirectPath(null);
//   };

//   const handleWishlistClick = () => {
//     if (!isAuthenticated && !isGuest) {
//       handleModalOpen({ guest: true, redirectTo: "/wishlist" });
//     } else {
//       navigate("/wishlist");
//     }
//   };

//   const handleCartClick = () => {
//     if (!isAuthenticated && !isGuest) {
//       handleModalOpen({ guest: true, redirectTo: "/cart" });
//     } else {
//       navigate("/cart");
//     }
//   };

//   const handleAccountClick = () => {
//     navigate("/account");
//   };

//   // Filter products based on search term and selected category
//   const filterProducts = (term, category) => {
//     if (!term.trim()) return [];

//     return allProducts.filter((product) => {
//       const matchesCategory =
//         category === "All Categories" || (product.category || "Others") === category;

//       const matchesSearch =
//         product.name.toLowerCase().includes(term.toLowerCase()) ||
//         product.brand.toLowerCase().includes(term.toLowerCase());

//       return matchesCategory && matchesSearch;
//     });
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     if (value.trim().length === 0) {
//       setSearchResults([]);
//       setDropdownOpen(false);
//       return;
//     }

//     const filtered = filterProducts(value, selectedCategory);
//     setSearchResults(filtered);
//     setDropdownOpen(true);
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setCategoryDropdownOpen(false);

//     if (searchTerm.trim().length === 0) {
//       setSearchResults([]);
//       setDropdownOpen(false);
//       return;
//     }

//     const filtered = filterProducts(searchTerm, category);
//     setSearchResults(filtered);
//     setDropdownOpen(true);
//     inputRef.current?.focus();
//   };

//   const handleResultClick = (productId) => {
//     navigate(`/product/${productId}`);
//     setDropdownOpen(false);
//     setSearchTerm("");
//     setSelectedCategory("All Categories");
//   };

//   // Group search results by category
//   const groupedResults = searchResults.reduce((acc, product) => {
//     const category = product.category || "Others";
//     if (!acc[category]) acc[category] = [];
//     acc[category].push(product);
//     return acc;
//   }, {});

//   // Close dropdowns if click outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         inputRef.current &&
//         !inputRef.current.contains(event.target) &&
//         categorySelectorRef.current &&
//         !categorySelectorRef.current.contains(event.target)
//       ) {
//         setDropdownOpen(false);
//         setCategoryDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="bg-white shadow-sm relative">
//       <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center justify-between relative z-50">
//         {/* Left: Logo + Slogan */}
//         <div className="flex-1 flex items-center space-x-4">
//           <Link
//             to="/"
//             className="text-4xl font-extrabold text-pink-600 font-display tracking-tight leading-none"
//           >
//             Cosmetics
//           </Link>
//           <span className="text-lg italic font-display text-gray-500 border-l pl-3 hidden sm:inline-block">
//             Your beauty, our passion
//           </span>
//         </div>

//         {/* Center: Search Bar with Category Selector */}
//         <div className="flex-1 flex justify-center relative">
//           <div className="relative w-full max-w-md">
//             {/* Search bar container */}
//             <div className="flex items-center border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-pink-400 overflow-hidden">
//               {/* Category selector */}
//               <div
//                 ref={categorySelectorRef}
//                 className="relative cursor-pointer select-none bg-gray-100 text-gray-700 px-3 py-1 flex items-center text-sm font-medium rounded-l-full border-r border-gray-300"
//                 style={{ minWidth: 140, height: 36 }}
//                 onClick={() => setCategoryDropdownOpen((open) => !open)}
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     e.preventDefault();
//                     setCategoryDropdownOpen((open) => !open);
//                   }
//                 }}
//               >
//                 {selectedCategory}
//                 <FaChevronDown className="ml-1 text-xs" />
//                 {/* Category dropdown */}
//                 {categoryDropdownOpen && (
//                   <div
//                     className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto text-sm"
//                     style={{ width: 140 }}
//                   >
//                     {categories.map((cat) => (
//                       <div
//                         key={cat}
//                         className={`px-3 py-2 cursor-pointer hover:bg-pink-50 ${
//                           selectedCategory === cat
//                             ? "bg-pink-100 font-semibold text-pink-700"
//                             : ""
//                         }`}
//                         onClick={() => handleCategorySelect(cat)}
//                         tabIndex={0}
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter" || e.key === " ") {
//                             e.preventDefault();
//                             handleCategorySelect(cat);
//                           }
//                         }}
//                       >
//                         {cat}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Search input */}
//               <input
//                 ref={inputRef}
//                 type="text"
//                 placeholder="Search for products, brands, and more..."
//                 className="flex-1 px-4 py-2 text-sm font-secondary font-medium text-black focus:outline-none rounded-r-full"
//                 style={{ height: 36 }}
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 onFocus={() => {
//                   if (searchResults.length > 0) setDropdownOpen(true);
//                 }}
//               />
//             </div>

//             {/* Search Results Dropdown */}
//             {dropdownOpen && (
//               <div
//                 ref={dropdownRef}
//                 className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-72 overflow-hidden z-50"
//               >
//                 <div className="max-h-72 overflow-y-auto p-3 text-center text-gray-500">
//                   {searchResults.length === 0 ? (
//                     <div className="py-10 italic">
//                       No products found in "{selectedCategory}" matching "
//                       {searchTerm}".
//                     </div>
//                   ) : (
//                     Object.entries(groupedResults).map(([category, products]) => (
//                       <div
//                         key={category}
//                         className="py-2 px-3 border-b last:border-b-0 text-left"
//                       >
//                         <h3 className="font-semibold text-pink-600 text-sm mb-1">
//                           {category}
//                         </h3>
//                         {products.map((product) => {
//                           const image =
//                             product.image || product.variants?.[0]?.image || "";

//                           return (
//                             <div
//                               key={product.id}
//                               onClick={() => handleResultClick(product.id)}
//                               className="flex items-center gap-3 px-4 py-2 hover:bg-pink-50 cursor-pointer"
//                             >
//                               <img
//                                 src={image}
//                                 alt={product.name}
//                                 className="w-10 h-10 object-cover rounded"
//                               />
//                               <div>
//                                 <p className="font-medium text-sm">
//                                   {highlightMatch(product.name, searchTerm)}
//                                 </p>
//                                 <p className="text-xs text-gray-500">
//                                   {highlightMatch(product.brand, searchTerm)}
//                                 </p>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right: Navigation */}
//         <div className="flex-1 flex items-center justify-end space-x-3">
//           <Link
//             to="/products"
//             className="text-2xl font-extrabold font-display bg-gradient-to-r from-yellow-300 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-pulse"
//             style={{
//               backgroundSize: "50% auto",
//               animation: "gradientShift 4s ease infinite",
//             }}
//           >
//             Shop Now
//           </Link>

//           {!isAuthenticated && (
//             <div className="flex items-center space-x-0 text-lg font-display font-semibold">
//               <button
//                 onClick={() => handleModalOpen({ guest: true })}
//                 className="hover:text-pink-500 font-medium"
//               >
//                 Login
//               </button>
//               <span className="text-gray-400 px-1">/</span>
//               <button
//                 onClick={() => handleModalOpen({ guest: true })}
//                 className="hover:text-pink-500 font-medium"
//               >
//                 Signup
//               </button>
//             </div>
//           )}

//           <FaHeart
//             title="Wishlist"
//             className="text-lg text-gray-600 hover:text-pink-500 cursor-pointer"
//             onClick={handleWishlistClick}
//           />

//           <FaShoppingBasket
//             title="Cart"
//             className="text-lg text-gray-600 hover:text-pink-500 cursor-pointer"
//             onClick={handleCartClick}
//           />

//           {isAuthenticated && (
//             <FaUserCircle
//               title="My Account"
//               className="text-2xl text-gray-600 hover:text-pink-500 cursor-pointer"
//               onClick={handleAccountClick}
//             />
//           )}

//           <div className="w-20 font-display">
//             <LanguageSelector
//               selectedLang={selectedLang}
//               setSelectedLang={setSelectedLang}
//             />
//           </div>
//         </div>
//       </div>

//       <AuthModal
//         isOpen={modalOpen}
//         onClose={handleModalClose}
//         showGuestOption={showGuestOption}
//       />
//     </div>
//   );
// };

// export default TopBar;