import React from 'react';
import { FaHeart, FaShoppingBasket } from 'react-icons/fa';

const Navbar = () => (
  <nav className="w-full bg-white shadow-md z-50">
 
    <div className="container mx-auto flex items-center justify-between p-4">
    
      <a href="#" className="text-xl font-bold text-gray-800">Cosmetics</a>

   
      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

     
      <div className="flex space-x-4">
        <FaHeart className="text-xl hover:text-pink-500 cursor-pointer" />
        <FaShoppingBasket className="text-xl hover:text-pink-500 cursor-pointer" />
      </div>
    </div>

   
    <div className="bg-pink-100 border-t border-gray-200 w-full">
  <div className="container mx-auto flex flex-wrap justify-center gap-6 px-4 py-4 text-gray-700 font-medium">
    
    <a href="#" className="group hover:text-pink-600 transform transition-all duration-200 ease-in-out">
      <span className="block text-lg p-2 border-b-2 border-transparent group-hover:border-pink-600">
        Brands
      </span>
    </a>

    <a href="#" className="group hover:text-pink-600 transform transition-all duration-200 ease-in-out">
      <span className="block text-lg p-2 border-b-2 border-transparent group-hover:border-pink-600">
        Makeup
      </span>
    </a>

    <a href="#" className="group hover:text-pink-600 transform transition-all duration-200 ease-in-out">
      <span className="block text-lg p-2 border-b-2 border-transparent group-hover:border-pink-600">
        Hair
      </span>
    </a>

    <a href="#" className="group hover:text-pink-600 transform transition-all duration-200 ease-in-out">
      <span className="block text-lg p-2 border-b-2 border-transparent group-hover:border-pink-600">
        Skincare
      </span>
    </a>

    <a href="#" className="group hover:text-pink-600 transform transition-all duration-200 ease-in-out">
      <span className="block text-lg p-2 border-b-2 border-transparent group-hover:border-pink-600">
        Fragrance
      </span>
    </a>

    <a href="#" className="group hover:text-pink-600 transform transition-all duration-200 ease-in-out">
      <span className="block text-lg p-2 border-b-2 border-transparent group-hover:border-pink-600">
        Nails
      </span>
    </a>

    <a href="#" className="group hover:text-pink-600 transform transition-all duration-200 ease-in-out">
      <span className="block text-lg p-2 border-b-2 border-transparent group-hover:border-pink-600">
        Tools & Brushes
      </span>
    </a>

    <a href="#" className="group hover:text-pink-600 transform transition-all duration-200 ease-in-out">
      <span className="block text-lg p-2 border-b-2 border-transparent group-hover:border-pink-600">
        Bath & Body
      </span>
    </a>

    <a href="#" className="group hover:text-pink-600 transform transition-all duration-200 ease-in-out">
      <span className="block text-lg p-2 border-b-2 border-transparent group-hover:border-pink-600">
        Makeup
      </span>
    </a>

    <a href="#" className="group hover:text-pink-600 transform transition-all duration-200 ease-in-out">
      <span className="block text-lg p-2 border-b-2 border-transparent group-hover:border-pink-600">
        Sales & Offers
      </span>
    </a>

  </div>
</div>

  </nav>
);

export default Navbar;
