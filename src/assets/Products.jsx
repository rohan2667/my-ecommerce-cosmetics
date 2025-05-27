import React from 'react';

const Products = ({ product }) => (
  <div className="border border-gray-300 rounded-lg p-4 m-4 max-w-xs shadow-md hover:shadow-lg transition-shadow duration-300">
    <img src={product.image} alt={product.name} className="w-full h-auto rounded-md mb-4" />
    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
    <p className="text-gray-700 mb-4">{product.price}</p>
    <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
      Add to Cart
    </button>
  </div>
);

export default Products;