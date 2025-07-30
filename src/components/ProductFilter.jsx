import React from "react";

const FILTER_FIELDS = [
  { key: "category", label: "Category" },
  { key: "brand", label: "Brand" },
  { key: "price", label: "Price Range" },
  { key: "color", label: "Color" },
  { key: "size", label: "Size" },
  { key: "skinType", label: "Skin Type" },
];

const ProductFilter = ({ filters, handleFilterChange }) => (
  <div>
    {FILTER_FIELDS.map(({ key, label }) => (
      <div className="mb-5" key={key}>
        <label htmlFor={key} className="block text-medium font-bold text-gray-500 mb-1">
          {label}
        </label>
        <select
          name={key}
          id={key}
          value={filters[key] || ""}
          onChange={handleFilterChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm font-bold font-secondary text-gray-500 focus:ring-pink-500 focus:border-pink-500"
        >
          <option value="">All</option>
          {[...new Set(filters.options[key])].map((opt, index) => {
            // Ensure opt is defined and has the necessary properties before accessing
            const optionValue = key === "color" && opt?.name ? opt.name : opt;

            if (key === "color" && !opt?.name) {
              return null; // Skip if `opt` is not a valid color object
            }

            return (
              <option key={`${optionValue}-${index}`} value={optionValue}>
                {key === "color" ? opt.name : opt} {/* Display name for color */}
              </option>
            );
          })}
        </select>
      </div>
    ))}
  </div>
);

export default ProductFilter;
