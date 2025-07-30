import React, { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import { allProducts } from "../assets/products";
import ProductCard from "../components/ProductCard"; // Make sure this path is correct

// Spinner Component
const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="w-10 h-10 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

// Get query from URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ITEMS_PER_PAGE = 9;

const SearchResultsPage = () => {
  const query = useQuery();
  const searchTerm = query.get("query")?.toLowerCase().trim() || "";

  const products = useMemo(() => {
    return allProducts.map((p) => ({
      ...p,
      finalPrice: parseFloat(p.price).toFixed(2),
    }));
  }, []);

  const [filters, setFilters] = useState({
    category: "All",
    brand: "All",
    color: "All",
    size: "All",
    skinType: "All",
    priceMax: 0,
  });

  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const categories = useMemo(() => ["All", ...new Set(products.map(p => p.category || "Other"))], [products]);
  const brands = useMemo(() => ["All", ...new Set(products.map(p => p.brand || "Other"))], [products]);
  const colors = useMemo(() => ["All", ...new Set(products.flatMap(p => p.variants?.map(v => v.color.name) || []))], [products]);
  const sizes = useMemo(() => ["All", ...new Set(products.flatMap(p => p.variants?.map(v => v.size) || []))], [products]);
  const skinTypes = useMemo(() => ["All", ...new Set(products.map(p => p.skinType || "Other"))], [products]);

  const maxPrice = useMemo(() => Math.ceil(Math.max(...products.map(p => parseFloat(p.price)))), [products]);

  useEffect(() => {
    setFilters(f => ({ ...f, priceMax: maxPrice }));
  }, [maxPrice]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [searchTerm, filters, sortBy, currentPage]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesSearch =
        !searchTerm ||
        p.name.toLowerCase().includes(searchTerm) ||
        p.description?.toLowerCase().includes(searchTerm) ||
        p.brand?.toLowerCase().includes(searchTerm) ||
        p.category?.toLowerCase().includes(searchTerm);

      const matchesCategory = filters.category === "All" || p.category === filters.category;
      const matchesBrand = filters.brand === "All" || p.brand === filters.brand;
      const matchesColor = filters.color === "All" || p.variants?.some(v => v.color.name === filters.color);
      const matchesSize = filters.size === "All" || p.variants?.some(v => v.size === filters.size);
      const matchesSkinType = filters.skinType === "All" || p.skinType === filters.skinType;
      const matchesPrice = parseFloat(p.price) <= filters.priceMax;

      return matchesSearch && matchesCategory && matchesBrand && matchesColor && matchesSize && matchesSkinType && matchesPrice;
    });
  }, [products, filters, searchTerm]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    if (sortBy === "priceLow") copy.sort((a, b) => a.price - b.price);
    else if (sortBy === "priceHigh") copy.sort((a, b) => b.price - a.price);
    else if (sortBy === "newest") copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return copy;
  }, [filtered, sortBy]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sorted.slice(start, start + ITEMS_PER_PAGE);
  }, [sorted, currentPage]);

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);

  const resetFilters = () => {
    setFilters({
      category: "All",
      brand: "All",
      color: "All",
      size: "All",
      skinType: "All",
      priceMax: maxPrice,
    });
  };

  return (
    <Layout>
      <div className="relative w-full h-[250px] mb-10 shadow-lg overflow-hidden">
        <img
          src="public/images/slider-bg-new2.jpg"
          alt="Cart Banner"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col ml-50 mt-15">
          <h1 className="text-6xl font-bold tracking-widest font-display text-white drop-shadow-lg px-4 py-2 rounded">
            Search Results
          </h1>
          <p className="text-lg ml-45 animate-pulse tracking-widest font-display text-white drop-shadow-lg px-4 py-2 rounded">
            Discover beauty in every detail.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:underline">Home</Link> › Search
          {searchTerm && <> › <span className="italic">"{searchTerm}"</span></>}
        </nav>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="md:w-1/4 bg-white shadow rounded-lg p-4 space-y-4">
            {[
              { label: "Category", key: "category", options: categories },
              { label: "Brand", key: "brand", options: brands },
              { label: "Color", key: "color", options: colors },
              { label: "Size", key: "size", options: sizes },
              { label: "Skin Type", key: "skinType", options: skinTypes },
            ].map(({ label, key, options }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <select
                  value={filters[key]}
                  onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                  className="w-full border rounded mt-1 px-3 py-2 text-sm"
                >
                  {options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Max Price: ${filters.priceMax}
              </label>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                className="w-full mt-2 accent-pink-400"
              />
              <div className="text-xs flex justify-between text-gray-500">
                <span>$0</span>
                <span>${maxPrice}</span>
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 text-sm"
            >
              Reset Filters
            </button>
          </aside>

          {/* Main Content */}
          <main className="md:w-3/4">
            {/* Sort + Count */}
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="text-sm text-gray-600">{filtered.length} results found</div>
              <div className="flex items-center gap-2 text-sm">
                <label htmlFor="sortBy" className="text-gray-600">Sort by:</label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="relevance">Relevance</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <Spinner />
            ) : paginated.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-pink-600 font-semibold mt-10">
                No products found matching your criteria.
              </p>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6 text-sm">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default SearchResultsPage;
