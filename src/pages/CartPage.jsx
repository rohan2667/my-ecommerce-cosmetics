import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { FaTrashAlt, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import Layout from "../layouts/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "../modal/AuthModal";

const CartPage = () => {
  const { cart, removeFromCart, addToCart, decrementFromCart } = useCart();
  const { isAuthenticated, isGuest } = useAuth();
  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    console.log("handleCheckout triggered");
    console.log("Authenticated:", isAuthenticated, "Guest:", isGuest);

    if (!isAuthenticated && !isGuest) {
      setShowAuthModal(true);
    } else {
      navigate("/checkout");
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400">
          <svg
            className="w-20 h-20 mb-4 text-pink-300"
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
          <p className="mt-2 text-sm text-gray-500">
            Looks like you haven't added any products yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-2 py-1.5 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition"
          >
            Go Shopping
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-4xl font-extrabold text-pink-600 mb-4">Your Cart</h2>
        <ul className="divide-y divide-gray-200">
          {cart.map((item) => (
            <li
              key={`${item.id}-${item.selectedColor?.name ?? ""}-${
                item.selectedSize ?? ""
              }`}
              className="py-4 flex items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex flex-col flex-grow">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                {item.selectedColor && (
                  <p className="text-sm text-gray-600">
                    Color: <span className="font-medium">{item.selectedColor.name}</span>
                  </p>
                )}
                {item.selectedSize && (
                  <p className="text-sm text-gray-600">
                    Size: <span className="font-medium">{item.selectedSize}</span>
                  </p>
                )}
                <p className="text-pink-600 font-semibold mt-1">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-2">
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
          ))}
        </ul>

        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <span className="text-2xl font-semibold">
            Total: ${getTotalPrice().toFixed(2)}
          </span>
          <button
            onClick={handleCheckout}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
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
