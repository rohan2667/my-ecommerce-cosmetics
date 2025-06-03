import React, { useState } from "react";
import ProductCard from "../assets/ProductCard"; 

const products = [
  {
    id: 1,
    name: "Rare Beauty Blush",
    image: "/images/718mKhznbeL._SL1500_.jpg",
    price: "28.00",
    description: "Soft pinch liquid blush – glow from within.",
  },
  {
    id: 2,
    name: "Fenty Beauty Gloss",
    image: "/images/makeup-cosmetics.webp",
    price: "22.00",
    description: "Gloss Bomb – ultra shine lip luminizer.",
  },
  {
    id: 3,
    name: "Zara Perfume",
    image: "/images/Professional-Hair-Brands-And-Top-Products-Curated-By-Nykaa-Editors-For-A-Salon-Like-Finish-At-Home_OI.jpg",
    price: "35.00",
    description: "Elevate your scent game – timeless aroma.",
  },
  {
    id: 4,
    name: "Sugar Lipstick Set",
    image: "/images/summer-makeup-must-haves-768x512.jpg",
    price: "18.00",
    description: "Matte as hell – 3 mini liquid lipsticks.",
  },
  {
    id: 5,
    name: "Nykaa Foundation",
    image: "/images/718mKhznbeL._SL1500_.jpg",
    price: "25.00",
    description: "SkinShield anti-pollution foundation.",
  },
  {
    id: 6,
    name: "Maybelline Mascara",
    image: "/images/makeup-cosmetics.webp",
    price: "12.00",
    description: "Colossal Volume Express – blackest black.",
  },
  {
    id: 7,
    name: "The Ordinary Serum",
    image: "/images/Professional-Hair-Brands-And-Top-Products-Curated-By-Nykaa-Editors-For-A-Salon-Like-Finish-At-Home_OI.jpg",
    price: "10.00",
    description: "Niacinamide 10% + Zinc 1% – clear skin hero.",
  },
  {
    id: 8,
    name: "L’Oreal Hair Spa",
    image: "/images/summer-makeup-must-haves-768x512.jpg",
    price: "20.00",
    description: "Salon-like treatment for silky smooth hair.",
  },
];

const PRODUCTS_PER_PAGE = 4;

const BestSellers = () => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handlePrev = () => {
    setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const currentProducts = products.slice(
    page * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE + PRODUCTS_PER_PAGE
  );

  return (
    <div className="py-1 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Best Sellers</h2>

        <div className="relative">
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:shadow-pink-400 transition focus:outline-none"
            style={{ boxShadow: "0 0 10px rgba(236, 72, 153, 0)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 15px rgba(236, 72, 153, 0.7)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 10px rgba(236, 72, 153, 0)")
            }
          >
            <svg
              className="w-6 h-6 text-pink-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next"
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:shadow-pink-400 transition focus:outline-none"
            style={{ boxShadow: "0 0 10px rgba(236, 72, 153, 0)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 15px rgba(236, 72, 153, 0.7)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 10px rgba(236, 72, 153, 0)")
            }
          >
            <svg
              className="w-6 h-6 text-pink-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
