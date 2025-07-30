import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { FaTrashAlt, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import Layout from "../layouts/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "../modal/AuthModal";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, addToCart, decrementFromCart } = useCart();
  const { isAuthenticated, isGuest } = useAuth();
  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!isAuthenticated && !isGuest) {
      setShowAuthModal(true);
    } else {
      navigate("/checkout");
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="relative w-full h-[250px] mb-10 shadow-lg overflow-hidden">
        <img
          src="images/hero_bg_1.jpeg"
          alt="Cart Banner"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-end mr-40 mt-13 ">
          <h1 className="text-7xl font-bold text-center tracking-widest font-display text-white drop-shadow-lg px-4 py-2 rounded">
            Your Cart
          </h1>
          <p className="text-lg -mr-12 animate-pulse tracking-widest font-display text-white drop-shadow-lg px-4 py-2 rounded">Start shopping! Your next favorite thing is waiting.</p>
        </div>
      </div>
        <div className="flex flex-col  items-center justify-center h-[70vh] text-gray-400 font-secondary">
          <svg
            className="w-20 h-20 mb-10 text-pink-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M17 13V9m-6 4v-4"
            />
          </svg>
          <p className="text-xl font-semibold">Your cart is empty 🛒</p>
          <p className="mt-6 text-sm text-gray-500">
            Looks like you haven't added any products yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-10 px-5 py-1.5 rounded-full text-medium border border-pink-600 text-pink-600 hover:bg-pink-700 hover:text-white transition transform hover:-translate-y-1 active:scale-95 font-display font-bold tracking-widest"
          >
            Go Shopping
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
     <div className="relative w-full h-[250px] mb-10 shadow-lg overflow-hidden">
        <img
          src="images/hero_bg_1.jpeg"
          alt="Cart Banner"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-end mr-40 mt-13 ">
          <h1 className="text-7xl font-bold text-center tracking-widest font-display text-white drop-shadow-lg px-4 py-2 rounded">
            Your Cart
          </h1>
          <p className="text-lg -mr-7 animate-pulse tracking-widest font-display text-white drop-shadow-lg px-4 py-2 rounded">Ready to check out? Your favorites are waiting!</p>
        </div>
      </div>
      <div className="mx-auto mt-10 font-secondary flex flex-col items-center justify-center">
      <div className="w-200 h-100 overflow-y-auto bg-pink-50 p-3 rounded-xl border border-pink-300 space-y-2">
        
        <ul className="divide-y divide-gray-200">
          {cart.map((item) => {
            const selectedImage = item.variants?.find(
              (v) => v.color.name === item.selectedColor?.name
            )?.image;

            return (

              <li
                key={`${item.id}-${item.selectedColor?.name ?? ""}-${item.selectedSize ?? ""}`}
                className="py-4 flex items-center"
              >
                <img
                  src={selectedImage || "/fallback-image.jpg"}
                  alt={item.selectedColor?.name || "Product"}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                
                <div className="flex flex-col flex-grow mr-50">
                  <h3 className="font-semibold text-xl font-display">{item.name}</h3>
                  {item.selectedColor && (
                    <p className="text-sm text-gray-600 font-secondary">
                      Color: <span className="font-medium">{item.selectedColor.name}</span>
                    </p>
                  )}
                  {item.selectedSize && (
                    <p className="text-sm text-gray-600 font-secondary">
                      Size: <span className="font-medium">{item.selectedSize}</span>
                    </p>
                  )}
                  <p className="text-pink-600 font-semibold text-medium mt-1 font-secondary">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-2 font-secondary">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      decrementFromCart(item);
                    }}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                    className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
                  >
                    <FaMinusCircle size={20} />
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, 1);
                    }}
                    aria-label="Increase quantity"
                    className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                  >
                    <FaPlusCircle size={20} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(item);
                    }}
                    aria-label="Remove item"
                    className="p-1 rounded-full bg-red-600 text-white hover:bg-red-700"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </li>
              
            );
          })}
        </ul>
        </div>

        <div className="mt-6 flex justify-between items-center border-t pt-4 gap-125">
          <span className="text-xl font-semibold font-secondary">
            Total: ${getTotalPrice().toFixed(2)}
          </span>
          <button
            onClick={handleCheckout}
            className="rounded-full text-medium border border-pink-600 text-pink-600 hover:bg-pink-700 hover:text-white transition transform hover:-translate-y-1 active:scale-95 font-secondary font-bold text-sm px-4 py-2"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </Layout>
  );
};

export default CartPage;
