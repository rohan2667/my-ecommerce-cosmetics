import React, { useState } from "react";
import ProductCard from "../assets/ProductCard";
import ProductFilter from "../components/ProductFilter";
import usePagination from "../components/usePagination";
import { useCart } from "../components/CartContext";
import Layout from "../components/Layout"; // Import Layout here

const productImages = [
  "/images/718mKhznbeL._SL1500_.jpg",
  "/images/makeup-cosmetics.webp",
  "/images/2822953.webp",
  "/images/fenty-beauty9929.logowik.com.webp",
  "/images/summer-makeup-must-haves-768x512.jpg",
  "/images/Rare_beauty.webp.png",
];

const baseProducts = [
  {
    name: "Hydrating Face Cream",
    brand: "GlowCo",
    category: "Skincare",
    price: 25.99,
    color: "White",
    size: "50ml",
    skinType: "Dry",
  },
  {
    name: "Matte Lipstick",
    brand: "LuxeBeauty",
    category: "Makeup",
    price: 15.99,
    color: "Red",
    size: "5g",
    skinType: "All",
  },
  {
    name: "Aloe Vera Gel",
    brand: "NatureCare",
    category: "Skincare",
    price: 12.49,
    color: "Green",
    size: "100ml",
    skinType: "Sensitive",
  },
  {
    name: "Nude Eyeshadow Palette",
    brand: "LuxeBeauty",
    category: "Makeup",
    price: 29.99,
    color: "Nude",
    size: "10 Shades",
    skinType: "All",
  },
  {
    name: "Vitamin C Serum",
    brand: "GlowCo",
    category: "Skincare",
    price: 34.99,
    color: "Orange",
    size: "30ml",
    skinType: "All",
  },
  {
    name: "Waterproof Mascara",
    brand: "LuxeBeauty",
    category: "Makeup",
    price: 18.49,
    color: "Black",
    size: "10ml",
    skinType: "All",
  },
  {
    name: "Soothing Toner",
    brand: "NatureCare",
    category: "Skincare",
    price: 19.99,
    color: "Blue",
    size: "100ml",
    skinType: "Sensitive",
  },
  {
    name: "Blush Palette",
    brand: "LuxeBeauty",
    category: "Makeup",
    price: 22.99,
    color: "Pink",
    size: "5 Shades",
    skinType: "All",
  },
  {
    name: "Luxury Facial Oil",
    brand: "GlowCo",
    category: "Skincare",
    price: 45.0,
    color: "Golden",
    size: "25ml",
    skinType: "Dry",
  },
  {
    name: "Velvet Lip Gloss",
    brand: "RareBeauty",
    category: "Makeup",
    price: 16.99,
    color: "Rose",
    size: "7ml",
    skinType: "All",
  },
];

const allProducts = Array.from({ length: 20 }, (_, i) => {
  const base = baseProducts[i % baseProducts.length];
  return {
    ...base,
    id: i + 1,
    image: productImages[i % productImages.length],
  };
});

const ShopPage = () => {
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    price: "",
    color: "",
    size: "",
    skinType: "",
  });

  const { addToCart } = useCart();

  const options = {
    category: [...new Set(allProducts.map((p) => p.category))],
    brand: [...new Set(allProducts.map((p) => p.brand))],
    price: ["< $15", "$15 - $30", "$30 - $50", "$50+"],
    color: [...new Set(allProducts.map((p) => p.color))],
    size: [...new Set(allProducts.map((p) => p.size))],
    skinType: [...new Set(allProducts.map((p) => p.skinType))],
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filtered = allProducts.filter((p) => {
    let priceMatch = true;
    if (filters.price) {
      const price = p.price;
      switch (filters.price) {
        case "< $15":
          priceMatch = price < 15;
          break;
        case "$15 - $30":
          priceMatch = price >= 15 && price < 30;
          break;
        case "$30 - $50":
          priceMatch = price >= 30 && price < 50;
          break;
        case "$50+":
          priceMatch = price >= 50;
          break;
        default:
          priceMatch = true;
      }
    }

    return (
      (!filters.category || p.category === filters.category) &&
      (!filters.brand || p.brand === filters.brand) &&
      priceMatch &&
      (!filters.color || p.color === filters.color) &&
      (!filters.size || p.size === filters.size) &&
      (!filters.skinType || p.skinType === filters.skinType)
    );
  });

  const {
    currentData,
    currentPage,
    maxPage,
    next,
    prev,
    setPage,
  } = usePagination(filtered, 12); // 4 columns * 3 rows

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8 min-h-[80vh]">
        <aside className="w-64 sticky top-20 self-start bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-pink-600">
            Filters
          </h2>
          <ProductFilter
            filters={{ ...filters, options }}
            handleFilterChange={handleFilterChange}
          />
        </aside>

        <main className="flex-1">
          <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
            Explore Our Products
          </h1>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 mt-20 text-lg font-medium">
              No products found matching your criteria.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {currentData.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center space-x-3 mt-10">
                <button
                  onClick={prev}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-md hover:bg-pink-100 disabled:opacity-50 transition"
                >
                  Prev
                </button>
                {[...Array(maxPage).keys()].map((num) => (
                  <button
                    key={num + 1}
                    onClick={() => setPage(num + 1)}
                    className={`px-4 py-2 border rounded-md ${
                      currentPage === num + 1
                        ? "bg-pink-500 text-white font-semibold"
                        : "hover:bg-pink-100"
                    } transition`}
                  >
                    {num + 1}
                  </button>
                ))}
                <button
                  onClick={next}
                  disabled={currentPage === maxPage}
                  className="px-4 py-2 border rounded-md hover:bg-pink-100 disabled:opacity-50 transition"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default ShopPage;
