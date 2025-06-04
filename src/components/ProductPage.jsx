import React from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import RatingReviews from "../components/RatingReviews";
import ProductCard from "../assets/ProductCard";
import Layout from "../components/Layout";
import { allProducts } from "../assets/products"; 

const ProductPage = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id.toString() === id);

  if (!product) return <Layout><div className="p-6 text-xl">Product not found</div></Layout>;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <ProductDetail product={product} />
        <RatingReviews reviews={product.reviews || []} />

        <h2 className="text-2xl font-semibold my-6">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {allProducts
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
