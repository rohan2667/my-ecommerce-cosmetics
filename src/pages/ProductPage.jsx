import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import RatingReviews from "../components/RatingReviews";
import ProductCard from "../components/ProductCard";
import Layout from "../layouts/Layout";
import { allProducts } from "../assets/products";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find((p) => p.id.toString() === id);
  const reviewsRef = useRef(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    // Scroll to top on product change
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowReviewForm(false);
  }, [id]);

  const handleWriteReview = () => {
    setShowReviewForm(true);
    reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!product) {
    return (
      <Layout>
        <div className="p-6 text-xl text-center text-red-600 font-semibold">
          Product not found
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8 bg-white shadow-xl rounded-lg">
        <ProductDetail product={product} onWriteReview={handleWriteReview} />

        <div ref={reviewsRef} className="mt-10">
          <RatingReviews
            reviews={product.reviews || []}
            showForm={showReviewForm}
            setShowForm={setShowReviewForm}
          />
        </div>

        <h2 className="text-3xl font-extrabold mt-20 mb-8 text-pink-600">
          You may also like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {allProducts
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((related) => (
              <ProductCard key={related.id} product={related} onClick={() => navigate(`/product/${related.id}`)} />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
