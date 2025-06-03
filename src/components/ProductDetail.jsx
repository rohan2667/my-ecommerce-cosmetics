import React from "react";
import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/WishlistContext";

const ProductDetail = ({ product }) => {
  const { name, price, image, description, ingredients, howToUse, attributes } = product;
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <img src={image} alt={name} className="w-full h-80 object-cover rounded-lg shadow-md" />
      </div>
      <div>
        <h1 className="text-3xl font-semibold mb-2">{name}</h1>
        <p className="text-xl text-pink-600 font-bold mb-4">${price}</p>
        <p className="mb-4 text-gray-700">{description}</p>

        <div className="mb-4">
          <h2 className="font-semibold text-lg">Details:</h2>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {Object.entries(attributes).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-lg">Ingredients:</h2>
          <p className="text-sm text-gray-700">{ingredients}</p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-lg">How to Use:</h2>
          <p className="text-sm text-gray-700">{howToUse}</p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition"
          >
            Add to Cart
          </button>
          <button
            onClick={toggleWishlist}
            className={`flex-1 py-3 font-semibold rounded-lg shadow-md transition ${
              isWishlisted ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
