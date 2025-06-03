// src/pages/ProductPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import RatingReviews from "../components/RatingReviews";
import ProductCard from "../assets/ProductCard"; // corrected import path
import Layout from "../components/Layout";

// Sample product data
const products = [
  {
    id: "1",
    name: "Hydrating Lip Gloss",
    price: 14.99,
    image: "/images/718mKhznbeL._SL1500_.jpg",
    description: "A long-lasting, glossy lip tint that hydrates and shines.",
    ingredients: "Beeswax, Shea Butter, Vitamin E, Natural Oils",
    howToUse: "Apply directly to lips. Reapply as needed throughout the day.",
    attributes: {
      Color: "Rose Pink",
      Shade: "Glossy",
      Weight: "10ml",
      Type: "Lip Gloss",
      SkinTone: "All Skin Tones",
    },
    reviews: [
      { user: "Alice", rating: 5, comment: "So hydrating and beautiful color!" },
      { user: "Sarah", rating: 4, comment: "Great gloss, but a little sticky." },
    ],
    related: [
      { id: "2", name: "Matte Lipstick", price: 12.99, image: "/images/2822953.webp" },
      { id: "3", name: "Lip Balm", price: 7.99, image: "/images/fenty-beauty9929.logowik.com.webp" },
    ],
  },
  // Add more products if needed
];

const ProductPage = () => {
  const { id } = useParams();

  // Find the product by id from URL params
  const product = products.find((p) => p.id === id);

  // Dummy addToCart function (replace with your real handler or context)
  const addToCart = (product) => {
    alert(`Added "${product.name}" to cart!`);
  };

  if (!product) return <div>Product not found</div>;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Product details */}
        <ProductDetail product={product} />
        
        {/* Reviews */}
        <RatingReviews reviews={product.reviews} />

        {/* Related products */}
        <h2 className="text-2xl font-semibold my-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {product.related.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
