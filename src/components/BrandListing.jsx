import React from 'react';
import { GiftIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/solid';
import { FaHeadset } from 'react-icons/fa';


export default function BrandListing() {
  const brands = [
    {
      name: "Rare Beauty",
      logo: "/images/Rare_beauty.webp.png",
      link: "/brands/rare-beauty",
    },
    {
      name: "Fenty Beauty",
      logo: "/images/fenty-beauty9929.logowik.com.webp",
      link: "/brands/fenty-beauty",
    },
    {
      name: "Sugar Cosmetics",
      logo: "/images/Sugar-Cosmetics-Logo-Startuptalky.jpg",
      link: "/brands/sugar-cosmetics",
    },
    {
      name: "Nykaa",
      logo: "/images/2822953.webp",
      link: "/brands/nykaa",
    },
  ];

  return (
    <>
    <section
      className="w-full h-screen pb-13 bg-cover bg-no-repeat mb-15 mt-10"
      style={{
        backgroundImage: "url('public/images/slider-bg_1728x.jpg')",
      }}
    >
      <h2 className="text-5xl font-display font-bold text-center mt-20 py-20 underline underline-offset-10 text-gray-800 mb-15">
        Explore Our Top Brands
      </h2>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={brand.link}
              className="group backdrop-blur-3xl p-4 border border-gray-200 rounded-xl shadow hover:shadow-lg transition-all duration-300 text-center"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-20 w-auto mx-auto mb-4 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-lg font-display font-bold text-gray-800">
                {brand.name}
              </h3>
              <p className="text-sm text-pink-600 mt-2 group-hover:underline">
                Shop Now →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* new section */}
    <div className='flex gap-20 px-20 py-5'>
      <div className='flex flex-col items-center justify-center mb-4'>
        <TruckIcon className='w-8 h-8 text-black mb-2' />
      
      <h2 className='text-medium font-semibold font-band text-black text-center'>FREE SHIP WORLDWIDE</h2>
      <p className='text-sm text-black font-secondary font-light text-center'>You will get free home delivery to the items in your cart on your first purchase</p>
      </div>

      <div className='flex flex-col items-center justify-center mb-4'>
        <GiftIcon className='w-8 h-8 text-black mb-2' />
      
      <h2 className='text-medium font-semibold font-band text-black text-center'>SPECIAL OFFERS</h2>
      <p className='text-sm text-black font-secondary font-light text-center '>Special Offers Shop from our special offer day and get online shopping offers on multiple items.</p>
      </div>

      <div className='flex flex-col items-center justify-center mb-4'>
        <ShieldCheckIcon className='w-8 h-8 text-black mb-2' />
      
      <h2 className='text-medium font-semibold font-band text-black text-center'>ORDER PRODUCTION</h2>
      <p className='text-sm text-black font-secondary font-light text-center'>We guarantee qualified purchases, safety transaction and easy returns on our site.</p>
      </div>

      <div className='flex flex-col items-center justify-center mb-4'>
        <FaHeadset className="w-8 h-8 text-black mb-2" />
      
      <h2 className='text-medium font-semibold font-band text-black text-center'>SUPPORT 24/7</h2>
      <p className='text-sm text-black font-secondary font-light text-center'>Our support team provide best services to our customers for getting a best product.</p>
      </div>

    </div>
    </>
  );
}
