import React from "react";
import Layout from "../layouts/Layout";
import { useWishlist } from "../contexts/WishlistContext";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

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
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-2 py-1.5 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition"
          >
            Go Shopping
          </button>
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
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
