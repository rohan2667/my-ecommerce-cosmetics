import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

const ProductDetail = ({ product, onWriteReview }) => {
  const { name, price, description, ingredients, howToUse, attributes } = product;
  const { cart, addToCart, removeFromCart, decrementFromCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const colors = Array.isArray(attributes.Color)
    ? attributes.Color
    : [{ name: attributes.Color, code: attributes.ColorCode || "#ccc", image: product.image }];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(
    Array.isArray(attributes.Size) ? attributes.Size[0] : attributes.Size
  );
  const [quantity, setQuantity] = useState(0);

  const filteredAttributes = Object.entries(attributes).filter(
    ([key]) => key.toLowerCase() !== "color" && key.toLowerCase() !== "size"
  );

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const toggleWishlist = () =>
    isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product);

  useEffect(() => {
    const existingItem = cart.find(
      (item) =>
        item.id === product.id &&
        item.selectedColor?.name === selectedColor?.name &&
        item.selectedSize === selectedSize
    );
    setQuantity(existingItem?.quantity || 0);
  }, [cart, product.id, selectedColor, selectedSize]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;
    if (quantity === 0) {
      addToCart({ ...product, selectedColor, selectedSize }, 1);
    }
  };

  const handleIncreaseQuantity = () => {
    addToCart({ ...product, selectedColor, selectedSize }, 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity <= 1) {
      removeFromCart({ ...product, selectedColor, selectedSize });
    } else {
      decrementFromCart({ ...product, selectedColor, selectedSize });
    }
  };

  // Zoom state & ref
  const [zoomStyle, setZoomStyle] = useState({});
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      backgroundImage: `url(${selectedColor.image || product.image})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "200%",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  return (
    <>
      <div className="flex justify-center gap-12 px-4 max-w-[1200px] mx-auto">
        {/* Left side: color thumbnails */}
        <div className="flex flex-col space-y-5">
          {colors.map((colorOption) => (
            <button
              key={colorOption.name}
              onClick={() => setSelectedColor(colorOption)}
              className={`w-16 h-16 rounded-md border-2 transition-transform transform hover:scale-110 focus:outline-none ${
                selectedColor.name === colorOption.name
                  ? "border-pink-600 shadow-lg"
                  : "border-gray-300"
              }`}
              aria-label={`Select color ${colorOption.name}`}
            >
              <img
                src={colorOption.image || product.image}
                alt={colorOption.name}
                className="w-full h-full object-cover rounded-md"
              />
            </button>
          ))}
        </div>

        {/* Main Image with Hover Zoom */}
        <div className="h-150 flex flex-col items-center">
          <div
            ref={imgRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-[450px] h-[300px] rounded-xl shadow-lg border-4 cursor-zoom-in"
            style={{
              borderColor: selectedColor.code || "transparent",
              backgroundImage: zoomStyle.backgroundImage || `url(${selectedColor.image || product.image})`,
              backgroundPosition: zoomStyle.backgroundPosition || "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: zoomStyle.backgroundSize || "cover",
              transition: "background-position 0.1s ease"
            }}
            aria-label={`${name} product image with zoom`}
          />

          <div className="mt-5 space-y-3 max-w-[600px] text-center">
            <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
            <p className="text-gray-700 leading-relaxed">{ingredients}</p>
            <h2 className="text-xl font-semibold text-gray-800">How to Use</h2>
            <p className="text-gray-700 leading-relaxed">{howToUse}</p>
          </div>
        </div>

        {/* Product Details + Color & Size selectors */}
        <div className="flex flex-col justify-between max-w-[400px]">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{name}</h1>
            <p className="text-2xl text-pink-600 font-semibold mb-6">${price}</p>
            <p className="text-gray-700 mb-8">{description}</p>

            {/* Color Selection on right side */}
            {Array.isArray(attributes.Color) && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Select Color</h3>
                <div className="flex space-x-4">
                  {attributes.Color.map((colorOption) => (
                    <button
                      key={colorOption.name}
                      onClick={() => setSelectedColor(colorOption)}
                      className={`w-12 h-12 rounded-full border-2 transition-transform transform hover:scale-110 focus:outline-none flex items-center justify-center ${
                        selectedColor.name === colorOption.name
                          ? "border-pink-600 shadow-lg scale-125"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: colorOption.code }}
                      aria-label={`Select color ${colorOption.name}`}
                    >
                      {/* Add a subtle inner white circle for contrast */}
                      <div
                        className="w-6 h-6 rounded-full bg-white bg-opacity-30"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Selected: <strong>{selectedColor.name}</strong>
                </p>
              </div>
            )}

            {/* Size Selection */}
            {Array.isArray(attributes.Size) && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Select Size</h3>
                <div className="flex space-x-4">
                  {attributes.Size.map((sizeOption) => (
                    <button
                      key={sizeOption}
                      onClick={() => setSelectedSize(sizeOption)}
                      className={`px-5 py-2 rounded-lg border-2 font-semibold transition ${
                        selectedSize === sizeOption
                          ? "border-pink-600 bg-pink-50 text-pink-700 shadow"
                          : "border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {sizeOption}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Attributes */}
            {filteredAttributes.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Product Details</h2>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {filteredAttributes.map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-5">
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <button
                onClick={handleDecreaseQuantity}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition disabled:opacity-50"
                disabled={quantity === 0}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="text-xl font-semibold w-10 text-center">{quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-pink-600 text-white font-bold rounded-lg shadow hover:bg-pink-700 transition-all"
                aria-label="Add to cart"
              >
                {quantity > 0 ? "In Cart" : "Add to Cart"}
              </button>

              <button
                onClick={toggleWishlist}
                className={`flex-1 py-3 font-bold rounded-lg shadow transition-all ${
                  isWishlisted
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isWishlisted ? "♥ In Wishlist" : "♡ Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
