import React, { useState, useMemo, useEffect } from "react";
import Layout from "../layouts/Layout";
import { allProducts } from "../assets/products";
import { Link } from "react-router-dom";

const StarRating = ({ rating }) => (
  <div className="flex space-x-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.92-.755 1.688-1.54 1.118l-3.387-2.46a1 1 0 00-1.175 0l-3.387 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
      </svg>
    ))}
  </div>
);

const CountdownTimer = ({ secondsLeft }) => {
  const [time, setTime] = useState(secondsLeft);
  useEffect(() => {
    if (time <= 0) return;
    const interval = setInterval(() => setTime((t) => Math.max(t - 1, 0)), 1000);
    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <span
      className={`text-xs font-bold ${
        time === 0
          ? "text-red-600"
          : time <= 30
          ? "text-red-600 animate-pulse"
          : "text-pink-600"
      }`}
      title={time === 0 ? "Deal expired" : "Time left for this deal"}
    >
      {time === 0 ? "Expired" : `Ends in ${formatTime(time)}`}
    </span>
  );
};

// Memoize discounted products so they are stable across renders
const useDiscountedProducts = () =>
  useMemo(() => {
    // Check if any product has category "Makeup" otherwise fallback to all
    const makeupProducts = allProducts.filter((p) => p.category === "Makeup");
    const baseProducts = makeupProducts.length > 0 ? makeupProducts : allProducts;

    return baseProducts.map((p, i) => {
      const discount = i % 2 === 0 ? 20 : 10;
      const finalPrice = (p.price - (p.price * discount) / 100).toFixed(2);
      return {
        ...p,
        discount,
        finalPrice,
        rating: Math.floor(Math.random() * 3) + 3,
        dealSecondsLeft: 600 + i * 20,
      };
    });
  }, []);

const SalesOffersPage = () => {
  const products = useDiscountedProducts();

  // Compute maxPrice once from products
  const maxPrice = useMemo(() => {
    return Math.ceil(Math.max(...products.map((p) => parseFloat(p.finalPrice))));
  }, [products]);

  // Initialize filters with dynamic maxPrice
  const [filters, setFilters] = useState({
    category: "All",
    brand: "All",
    color: "All",
    priceMax: maxPrice,
  });

  // Update filters.priceMax when maxPrice changes
  useEffect(() => {
    setFilters((f) => ({ ...f, priceMax: maxPrice }));
  }, [maxPrice]);

  const categories = useMemo(() => ["All", ...new Set(products.map((p) => p.category))], [products]);
  const brands = useMemo(() => ["All", ...new Set(products.map((p) => p.brand))], [products]);
  const colors = useMemo(
    () => ["All", ...new Set(products.flatMap((p) => p.variants?.map((v) => v.color.name) || []))],
    [products]
  );

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const matchCat = filters.category === "All" || p.category === filters.category;
        const matchBrand = filters.brand === "All" || p.brand === filters.brand;
        const matchColor = filters.color === "All" || p.variants?.some((v) => v.color.name === filters.color);
        const matchPrice = parseFloat(p.finalPrice) <= filters.priceMax;
        return matchCat && matchBrand && matchColor && matchPrice;
      }),
    [filters, products]
  );

  const resetFilters = () =>
    setFilters({ category: "All", brand: "All", color: "All", priceMax: maxPrice });

  const featured = products.filter((p) => p.discount > 0).slice(0, 3);

  return (
    <Layout>
      <div className="relative w-full h-[250px] mb-10 shadow-lg overflow-hidden">
        <img
          src="images/salesandofferbanner.jpg"
          alt="Sales and Offers Banner"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-center tracking-widest font-display text-white drop-shadow-lg px-4 py-2 rounded">
            Sales & Special Offers
          </h1>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hot Deals */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-pink-700 mb-6 border-b border-pink-300 pb-3">
              Hot Deals
            </h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
              {featured.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-pink-400 transition-shadow p-5 relative transform hover:-translate-y-1 duration-300"
                >
                  <div
                    className="absolute top-4 left-4 bg-gradient-to-r font-band from-pink-600 via-pink-700 to-pink-800 text-white text-medium font-light px-3 py-1 rounded-full shadow-lg animate-pulse"
                    title={`${product.discount}% OFF`}
                  >
                    {product.discount}% OFF
                  </div>
                  <img
                    src={product.variants?.[0]?.image || product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl mb-5"
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                  />
                  <h3 className="text-xl font-extrabold font-display text-pink-700 mb-2">{product.name}</h3>
                  <p className="text-sm font-secondary text-gray-600 line-clamp-3 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-pink-700 font-extrabold font-secondary text-xl">
                      ${product.finalPrice}
                      <span className="line-through font-secondary text-gray-400 ml-2 text-sm">${product.price}</span>
                    </span>
                    <CountdownTimer secondsLeft={product.dealSecondsLeft} />
                  </div>
                  <StarRating rating={product.rating} />
                  <Link
                    to={`/product/${product.id}`}
                    className="mt-6 block bg-white border tracking-wider font-secondary border-pink-400 hover:shadow-pink-300 transition-colors text-pink-400 text-center py-3 rounded-xl font-semibold shadow-md"
                  >
                    Shop Deal
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Filters */}
            <aside className="md:w-1/4 bg-white border border-pink-300 rounded-2xl font-secondary p-6 shadow-lg sticky top-24 h-max">
              <h3 className="text-lg font-semibold text-pink-700 mb-6 border-b border-pink-300 pb-3">
                Filter Products
              </h3>

              <div className="space-y-6 text-sm">
                {/* Category */}
                <div>
                  <label className="block text-pink-700 mb-2 font-semibold">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full border border-pink-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-pink-700 mb-2 font-semibold">Brand</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                    className="w-full border border-pink-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    {brands.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-pink-700 mb-2 font-semibold">Color</label>
                  <select
                    value={filters.color}
                    onChange={(e) => setFilters({ ...filters, color: e.target.value })}
                    className="w-full border border-pink-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    {colors.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-pink-700 mb-2 font-semibold">
                    Max Price: ${filters.priceMax}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={maxPrice}
                    value={filters.priceMax}
                    onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$0</span>
                    <span>${maxPrice}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={resetFilters}
                className="mt-10 w-full tracking-wider bg-white  text-pink-400 border border-pink-400  hover:shadow-pink-700 py-3 rounded-xl font-semibold transition"
              >
                Reset Filters
              </button>
            </aside>

            {/* Offers Section */}
            <section className="md:w-3/4 flex flex-col">
              <h2 className="text-2xl font-semibold text-pink-700 mb-6 border-b border-pink-300 pb-3">
                Offers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.length > 0 ? (
                  filtered.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-pink-400 transition-shadow relative transform hover:-translate-y-1 duration-300"
                    >
                      <div
                        className="absolute top-4 left-4 bg-gradient-to-r font-band from-pink-600 via-pink-700 to-pink-800 text-white text-medium font-light px-3 py-1 rounded-full shadow-lg animate-pulse"
                        title={`${product.discount}% OFF`}
                      >
                        {product.discount}% OFF
                      </div>
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.variants?.[0]?.image || product.image}
                          alt={product.name}
                          onError={(e) => (e.target.src = "/fallback.jpg")}
                          className="h-52 w-full object-cover rounded-xl mb-4"
                        />
                        <h3 className="text-xl font-bold font-display text-pink-700 mb-2">{product.name}</h3>
                      </Link>
                      <p className="text-sm font-secondary text-gray-600 line-clamp-3">{product.description}</p>
                      <StarRating rating={product.rating} />
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-pink-700 font-secondary font-extrabold text-xl">
                          ${product.finalPrice}
                          <span className="line-through text-gray-400 ml-2 text-sm">${product.price}</span>
                        </span>
                        <Link
                          to={`/product/${product.id}`}
                          className="text-sm font-secondary tracking-wider bg-white border border-pink-300 hover:shadow-pink-500 transition-colors text-pink-400 px-4 py-2 rounded-xl font-semibold shadow-md"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-pink-600 font-semibold mt-10">
                    No products match your filters.
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalesOffersPage;

