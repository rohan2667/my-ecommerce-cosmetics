import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { allProducts } from "../assets/products";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const searchTerm = query.get("query")?.toLowerCase() || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand?.toLowerCase().includes(searchTerm) ||
      product.category?.toLowerCase().includes(searchTerm)
    );
    setResults(filtered);
  }, [searchTerm]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">
        Search results for: <span className="text-pink-500">"{searchTerm}"</span>
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => {
            const image = product.image || product.variants?.[0]?.image;
            return (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className="border rounded-lg shadow hover:shadow-md transition p-4 cursor-pointer"
              >
                <img
                  src={image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
