import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const productItems = [
  'Professional MakeUp Brush',
  'Radiance Complexion Compact',
  'Active Original Deodorant',
  'Anti-Blackhead Cream',
  'Blush Brush Cosmetic',
  'Chubby Makeup Brush',
  'Colossal Waterproof Mascara',
  'Cosmetic Makeup Brush Set',
  'Hypercurl Mascara Waterproof',
  'Eyeconic Lash Curling Mascara',
  'Make Up BrushSet',
  'Flawless Matte Complexion',
  'Heaven Xpression Lipstick',
  'Hairfall Control Shampoo',
  'Eye Brow And Mascara',
  'Liquid Foundation',
  'Mini Brush Kit',
  'Cosmetic Powder Brush',
  'Eyeliner Pen Waterproof',
  'Depigmentation Face Pack',
  'Velvet Matte Lipstick',
  'Herbals Fairness Facial',
  'Single Foundation Brush',
  'Professional Face Brush',
  'Mascara Waterproof Black',
];

const categories = [
  { label: 'Brands', dropdown: productItems },
  { label: 'Makeup', dropdown: productItems },
  { label: 'Hair', dropdown: productItems },
  { label: 'Skincare', dropdown: productItems },
  { label: 'Fragrance', dropdown: productItems },
  { label: 'Nails', dropdown: productItems },
  { label: 'Tools & Brushes', dropdown: productItems },
  { label: 'Bath & Body', dropdown: productItems },
  { label: 'Sales & Offers', dropdown: productItems, linkTo: '/sales-offers' }, // 🔗
];

const CategoryMenu = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleEnter = (idx) => {
    setActiveIndex(idx);
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
    setTimeout(() => {
      if (!isHovered) setActiveIndex(null);
    }, 200);
  };

  return (
    <div className="relative z-40">
      {/* Top Menu Bar */}
      <div className="bg-pink-100 border-t border-gray-200 w-full">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between px-2 py-2 text-gray-700 font-display text-lg font-semibold">
          {categories.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => handleEnter(idx)}
              onMouseLeave={handleLeave}
              className="relative"
            >
              <Link
                to={item.linkTo || "#"}
                className="text-center hover:text-pink-600 transition-all duration-200 block px-3"
              >
                <span className="block p-1 border-b-2 border-transparent hover:border-pink-600">
                  {item.label}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Shared Dropdown */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleLeave}
        className={`absolute w-[80vw] left-1/2 -translate-x-1/2 h-[25rem] bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out
          ${activeIndex !== null && isHovered ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}
        `}
      >
        {activeIndex !== null && (
          <div className="max-w-7xl mx-auto px-6 py-6 overflow-y-auto h-full">
            <ul className="grid grid-cols-3 md:grid-cols-4 gap-4 text-sm text-gray-700">
              {categories[activeIndex].dropdown.map((option, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="w-2 h-2 mt-2 bg-pink-500 rounded-full shrink-0" />
                  <a
                    href="#"
                    className="hover:text-pink-600 transition-colors duration-150"
                  >
                    {option}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryMenu;
