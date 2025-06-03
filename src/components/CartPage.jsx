import React from "react";
import { useCart } from "./CartContext";
import { FaTrashAlt, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import Layout from "../components/Layout";

const CartPage = () => {
  const { cart, removeFromCart, addToCart, decrementFromCart } = useCart();

  // Calculate total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0)
    return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400">
        <svg
          className="w-20 h-20 mb-4 text-pink-300"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M17 13V9m-6 4v-4"
          ></path>
        </svg>
        <p className="text-xl font-semibold">Your cart is empty 🛒</p>
        <p className="mt-2 text-sm text-gray-500">
          Start adding some products!
        </p>
      </div>
      </Layout>
    );

  return (
    <Layout>
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-10">Your Cart</h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b pb-4"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-28 object-cover rounded-lg shadow-sm"
            />

            {/* Details */}
            <div className="flex-1 ml-0 sm:ml-6 mt-4 sm:mt-0">
              <h2 className="text-lg font-semibold text-gray-800 hover:text-pink-600 transition-colors cursor-pointer truncate">
                {item.name}
              </h2>
              <p className="text-sm text-gray-500">{item.brand}</p>
              <p className="text-sm mt-1 text-pink-600 font-bold">
                ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price} each
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button
                onClick={() => decrementFromCart(item)}
                className="text-pink-500 hover:text-pink-700 disabled:opacity-50"
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
              >
                <FaMinusCircle size={22} />
              </button>

              <span className="font-semibold text-lg">{item.quantity}</span>

              <button
                onClick={() => addToCart(item)}
                className="text-pink-500 hover:text-pink-700"
                aria-label="Increase quantity"
              >
                <FaPlusCircle size={22} />
              </button>
            </div>

            {/* Subtotal */}
            <p className="text-lg font-bold text-gray-900 mt-4 sm:mt-0 w-28 text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 mt-4 sm:mt-0 ml-4"
              aria-label="Remove item from cart"
              title="Remove item"
            >
              <FaTrashAlt size={22} />
            </button>
          </div>
        ))}

        {/* Total & Checkout */}
        <div className="flex justify-between items-center pt-6 border-t mt-6">
          <h3 className="text-2xl font-extrabold text-gray-900">
            Total: <span className="text-pink-600">${total.toFixed(2)}</span>
          </h3>

          <button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-pink-700 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default CartPage;
