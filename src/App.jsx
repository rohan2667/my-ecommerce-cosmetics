import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Homepage from "./pages/Homepage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishlistPage from "./pages/WishlistPage";
import AccountPage from "./pages/AccountPage";
import SalesOffersPage from "./pages/SalesOffersPage";
import SearchPage from "./pages/SearchPage";

import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import AuthModal from "./modal/AuthModal";

// Protected Route Component for Wishlist only
const PrivateRoute = ({ element }) => {
  const { isAuthenticated, isGuest } = useAuth();
  return isAuthenticated || isGuest ? (
    element
  ) : (
    <div className="flex items-center justify-center h-screen text-center text-xl text-pink-600">
      You must be logged in to view this page.
    </div>
  );
};

// Checkout Route with modal for auth
const CheckoutRoute = () => {
  const { isAuthenticated, isGuest } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated && !isGuest) {
      setShowAuthModal(true);
    }
  }, [isAuthenticated, isGuest]);

  const handleCloseModal = () => {
    setShowAuthModal(false);
    if (!isAuthenticated && !isGuest) {
      navigate("/cart");
    }
  };

  return (
    <>
      {!isAuthenticated && !isGuest && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={handleCloseModal}
          showGuestOption={true}
        />
      )}
      {(isAuthenticated || isGuest) && <CheckoutPage />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Homepage />} />
              <Route path="/products" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/account" element={<AccountPage />} />
              {/* Protected Checkout */}
              <Route path="/checkout" element={<CheckoutRoute />} />
              <Route path="/sales-offers" element={<SalesOffersPage />} />
              <Route path="/search" element={<SearchPage />} />


              {/* Catch-all */}
              <Route
                path="*"
                element={
                  <div className="text-center text-red-500 mt-10 text-2xl font-semibold">
                    404 - Page Not Found
                  </div>
                }
              />
            </Routes>
            <ToastContainer position="top-right" autoClose={2000} />
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
