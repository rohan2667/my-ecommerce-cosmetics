import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/WishlistContext";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart(); // Using the original working logic
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [inCart, setInCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setInCart(cart.some((item) => item.id === product.id));
  }, [cart, product.id]);

  useEffect(() => {
    setWishlisted(wishlist.some((item) => item.id === product.id));
  }, [wishlist, product.id]);

  const toggleCart = () => {
    inCart ? removeFromCart(product.id) : addToCart(product);
  };

  const toggleWishlist = () => {
    wishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-pink-200 transition-all duration-300 flex flex-col transform hover:-translate-y-1 hover:scale-[1.015]">
      <div className="relative group">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-52 object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105"
          />
          {/* Optional Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-70 rounded-t-xl" />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 backdrop-blur-sm bg-white/80 shadow-md hover:scale-110 ${
            wishlisted ? "text-pink-600" : "text-gray-400 hover:text-pink-500"
          }`}
          aria-label="Toggle Wishlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill={wishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-pink-600 transition-colors mb-1 truncate">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mb-4 flex-grow line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
          {/* Price */}
          <span className="text-pink-600 font-bold text-sm">
            ${parseFloat(product.price).toFixed(2)}
          </span>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg font-semibold text-sm transition duration-300 focus:outline-none ${
              inCart
                ? "bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.7)]"
                : "bg-white border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_15px_rgba(236,72,153,0.7)]"
            }`}
            aria-label="Add to Cart"
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 15px rgba(236, 72, 153, 0.7)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = inCart
                ? "0 0 15px rgba(236, 72, 153, 0.7)"
                : "none")
            }
          >
            {inCart ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Added
              </>
            ) : (
              <>
                <FaShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
