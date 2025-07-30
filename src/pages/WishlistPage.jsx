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
      <div className="flex -mb-5">
      <div className="relative w-120 h-full shadow-lg overflow-hidden">
        <img
          src="public/images/category_img_3.jpeg"
          alt="wishlist Banner"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col ml-7 mt-20">
          <h1 className="text-6xl font-bold tracking-widest font-display text-white drop-shadow-lg px-4 py-2 rounded">
            Your Wishlist
          </h1>
          <p className="text-lg font-bold ml-20 animate-pulse tracking-widest font-display text-white drop-shadow-lg px-4 py-2 rounded">Where your favorites live!</p>
        </div>
        </div>

      
        <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400 font-secondary ml-80 mt-25">
          <svg
            className="w-20 h-20 mb-10 text-pink-300"
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
          <p className="mt-6 text-sm text-gray-500">Add your favorites here!</p>
          <button
            onClick={() => navigate("/")}
            className="mt-10 px-5 py-1.5 rounded-full text-medium border border-pink-600 text-pink-600 hover:bg-pink-700 hover:text-white transition transform hover:-translate-y-1 active:scale-95 font-display font-bold tracking-widest"
          >
            Go Shopping
          </button>
        </div>
        </div> 
      </Layout>
      
    );

  return (
    <Layout>
      <div className="flex -mb-5">
      <div className="relative w-120 h-full shadow-lg overflow-hidden">
        <img
          src="public/images/category_img_3.jpeg"
          alt="wishlist Banner"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col ml-7 mt-20">
          <h1 className="text-6xl font-bold tracking-widest font-display text-white drop-shadow-lg px-4 py-2 rounded">
            Your Wishlist
          </h1>
          <p className="text-lg font-bold ml-20 animate-pulse tracking-widest font-display text-white drop-shadow-lg px-4 py-2 rounded">Where your favorites live!</p>
        </div>
        </div>

      <div className="overflow-y-auto w-220 h-175 py-4 px-4 font-secondary">

        <div className="grid grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
