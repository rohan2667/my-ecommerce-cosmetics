import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./assets/homepage.jsx";
import ShopPage from "./components/ShopPage.jsx";
import ProductPage from "./components/ProductPage.jsx";
import CartPage from "./components/CartPage.jsx";
import WishlistPage from "./components/WishlistPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";

import { CartProvider } from "./components/CartContext.jsx";
import { WishlistProvider } from "./components/WishlistContext.jsx";
import { AuthProvider, useAuth } from "./components/AuthContext.jsx";

// Protected Route Component
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected Routes */}
              <Route path="/cart" element={<PrivateRoute element={<CartPage />} />} />
              <Route path="/wishlist" element={<PrivateRoute element={<WishlistPage />} />} />

              {/* 404 */}
              <Route
                path="*"
                element={
                  <div className="text-center text-red-500 mt-10 text-2xl font-semibold">
                    404 - Page Not Found
                  </div>
                }
              />
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
