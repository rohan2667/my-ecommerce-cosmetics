import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { cart, addToCart, removeFromCart, decrementFromCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // Find selected variant by color or default to first variant
  const selectedVariant =
    product.variants?.find(
      (variant) => variant.color.name === selectedColor?.name
    ) || product.variants?.[0];

  // Image source to show - fallback to product.image if no variants
  const imageSrc = selectedVariant ? selectedVariant.image : product.image || "";

  useEffect(() => {
    const cartItem = cart.find(
      (item) =>
        item.id === product.id &&
        item.selectedColor?.name === selectedColor?.name &&
        item.selectedSize === selectedSize
    );

    if (cartItem) {
      setInCart(true);
      setQuantity(cartItem.quantity);
    } else {
      setInCart(false);
      setQuantity(0);
    }
  }, [cart, product.id, selectedColor?.name, selectedSize]);

  useEffect(() => {
    setWishlisted(wishlist.some((item) => item.id === product.id));
  }, [wishlist, product.id]);

  const toggleColor = (color) =>
    setSelectedColor((prev) => (prev?.name === color.name ? null : color));

  const toggleSize = (size) =>
    setSelectedSize((prev) => (prev === size ? null : size));

  const handleAddToCart = () => {
    const needsColor = ["Makeup", "Foundation"].includes(product.category);
    if (needsColor && !selectedColor) {
      alert("Please select a color before adding to cart.");
      return;
    }
    if (!needsColor && product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const productWithOptions = {
      ...product,
      selectedColor,
      selectedSize,
    };

    addToCart(productWithOptions, 1);
  };

  const handleRemoveFromCart = () => {
    const productWithOptions = {
      ...product,
      selectedColor,
      selectedSize,
    };
    removeFromCart(productWithOptions);
  };

  const handleIncrement = () => {
    const productWithOptions = {
      ...product,
      selectedColor,
      selectedSize,
    };
    addToCart(productWithOptions, 1);
  };

  const handleDecrement = () => {
    const productWithOptions = {
      ...product,
      selectedColor,
      selectedSize,
    };
    decrementFromCart(productWithOptions);
  };

  const toggleWishlist = () => {
    wishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const renderColorPalette = () => (
    <div className="flex gap-3 mt-2 flex-wrap">
      {product.variants?.map((variant, idx) => {
        const isSelected = selectedColor?.name === variant.color.name;
        return (
          <button
            key={idx}
            title={variant.color.name}
            onClick={() => toggleColor(variant.color)}
            className={`w-7 h-7 rounded-full border-2 transition-all focus:outline-none ${
              isSelected
                ? "border-pink-500 ring-2 ring-pink-400"
                : "border-gray-300 hover:ring-2 hover:ring-pink-300"
            }`}
            style={{ backgroundColor: variant.color.code }}
            aria-pressed={isSelected}
          />
        );
      })}
    </div>
  );

  const renderSizes = () => (
    <div className="flex gap-2 flex-wrap mt-2">
      {product.sizes?.map((size, idx) => {
        const isSelected = selectedSize === size;
        return (
          <button
            key={idx}
            onClick={() => toggleSize(size)}
            className={`px-3 py-1 text-xs rounded-full border-2 font-medium transition-colors focus:outline-none ${
              isSelected
                ? "bg-pink-500 text-white border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.7)]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-pink-100 hover:border-pink-400"
            }`}
            aria-pressed={isSelected}
          >
            {size}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-pink-200 hover:scale-103 transition-all duration-300 flex flex-col h-full">
      <div className="relative group">
        <Link to={`/product/${product.id}`}>
          <img
            src={imageSrc}
            alt={`${product.name} - ${selectedVariant?.color?.name || "Product Image"}`}
            className="w-full h-52 rounded-t-xl transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <button
          onClick={toggleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm bg-white/80 shadow-md transition-all duration-300 hover:scale-110 ${
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
          <h3 className="text-xl font-display font-bold text-gray-900 hover:text-pink-600 transition-colors mb-1 truncate">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm font-secondary text-gray-500 line-clamp-2 min-h-[3rem]">
          {product.description}
        </p>

        {product.variants && renderColorPalette()}
        {product.sizes && renderSizes()}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <span className="text-pink-600 font-bold font-secondary text-medium">
            ${parseFloat(product.price).toFixed(2)}
          </span>

          <div className="flex items-center gap-2">
            {inCart ? (
              <>
                <button
                  onClick={handleDecrement}
                  className="bg-gray-200 text-gray-600 rounded-full p-1 w-8 h-8 flex items-center justify-center"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-sm font-semibold">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="bg-gray-200 text-gray-600 rounded-full p-1 w-8 h-8 flex items-center justify-center"
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <button
                  onClick={handleRemoveFromCart}
                  className="bg-red-600 text-white rounded-full p-1 w-8 h-8 flex items-center justify-center"
                  aria-label="Remove from cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={
                  (product.variants && !selectedColor) ||
                  (product.sizes && product.sizes.length > 0 && !selectedSize)
                }
                className={`flex items-center gap-1 px-3 py-2 rounded-lg font-semibold text-sm transition duration-300 focus:outline-none ${
                  (product.variants && !selectedColor) ||
                  (product.sizes && !selectedSize)
                    ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_15px_rgba(236,72,153,0.7)]"
                }`}
                aria-label="Add to cart"
              >
                <FaShoppingCart />
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
