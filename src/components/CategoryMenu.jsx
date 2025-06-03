import React from 'react';

const categories = [
  {
    label: 'Brands',
    dropdown: ['L’Oreal', 'Maybelline', 'MAC'],
  },
  {
    label: 'Makeup',
    dropdown: ['Foundation', 'Concealer', 'Lipstick'],
  },
  {
    label: 'Hair',
    dropdown: ['Shampoo', 'Conditioner', 'Hair Oil'],
  },
  {
    label: 'Skincare',
    dropdown: ['Moisturizers', 'Serums', 'Sunscreen'],
  },
  {
    label: 'Fragrance',
    dropdown: ['Perfume', 'Body Mist', 'Deodorant'],
  },
  {
    label: 'Nails',
    dropdown: ['Nail Polish', 'Nail Care'],
  },
  {
    label: 'Tools & Brushes',
    dropdown: ['Brush Sets', 'Sponges', 'Eyelash Curler'],
  },
  {
    label: 'Bath & Body',
    dropdown: ['Body Wash', 'Lotion', 'Scrubs'],
  },
  {
    label: 'Sales & Offers',
    dropdown: ['Clearance', 'Buy 1 Get 1', 'Limited Time'],
  },
];

const CategoryMenu = () => {
  return (
    <div className="bg-pink-100 border-t border-gray-200 w-full relative z-40">
      <div className="max-w-6xl mx-auto flex justify-between px-1 py-2 text-gray-700 text-sm font-medium">
        {categories.map((item, idx) => (
          <div key={idx} className="relative group">
            <a
              href="#"
              className="text-center hover:text-pink-600 transition-all duration-200 block px-2"
            >
              <span className="block p-1 border-b-2 border-transparent group-hover:border-pink-600">
                {item.label}
              </span>
            </a>

            {/* Dropdown */}
            <div className="absolute left-0 top-full mt-2 bg-white border shadow-md opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-200 min-w-[150px]">
              <ul className="flex flex-col text-left text-sm text-gray-700 p-2">
                {item.dropdown.map((option, i) => (
                  <li key={i}>
                    <a href="#" className="block px-3 py-1 hover:bg-pink-100 rounded">
                      {option}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
