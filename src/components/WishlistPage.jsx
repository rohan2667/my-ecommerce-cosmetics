import React from "react";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/WishlistContext";
import Layout from "../components/Layout";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const moveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  if (!wishlist || wishlist.length === 0)
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
              d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          <p className="text-xl font-semibold">Your wishlist is empty 💔</p>
          <p className="mt-2 text-sm text-gray-500">Add your favorites here!</p>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-extrabold text-pink-600 mb-10">
          Your Wishlist
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {item.name}
              </h2>
              <p className="text-sm text-gray-500">{item.brand}</p>
              <p className="text-pink-600 font-bold mt-1">
                ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
              </p>

              <div className="mt-auto flex justify-between items-center">
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold"
                >
                  <FaTrashAlt /> Remove
                </button>

                <button
                  onClick={() => moveToCart(item)}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 flex items-center gap-2"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
