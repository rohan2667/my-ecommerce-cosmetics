import React from 'react';
import Navbar from './Navbar';
import ProductCard from './Products';
import Footer from './Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const Homepage = () => {
  const bestSellers = [
    { id: 1, name: 'Blush', price: '$99', image: '/images/718mKhznbeL._SL1500_.jpg' },
    { id: 2, name: 'Powder', price: '$59', image: '/images/makeup-cosmetics.webp' },
    { id: 3, name: 'Lipstick', price: '$29', image: '/images/summer-makeup-must-haves-768x512.jpg' },
    { id: 4, name: 'Foundation', price: '$49', image: '/images/Professional-Hair-Brands-And-Top-Products-Curated-By-Nykaa-Editors-For-A-Salon-Like-Finish-At-Home_OI.jpg' },
    { id: 5, name: 'Mascara', price: '$25', image: '/images/718mKhznbeL._SL1500_.jpg' },
    { id: 6, name: 'Blush', price: '$99', image: '/images/makeup-cosmetics.webp' },
    { id: 7, name: 'Nail Polish', price: '$19', image: '/images/summer-makeup-must-haves-768x512.jpg' },
    { id: 8, name: 'Eyeliner', price: '$14', image: '/images/Professional-Hair-Brands-And-Top-Products-Curated-By-Nykaa-Editors-For-A-Salon-Like-Finish-At-Home_OI.jpg' },
  ];

  return (
    <>
      {/* Fixed Discount Banner */}
      <a
        href="/sale"
        className="fixed top-0 w-full bg-pink-300 text-black text-center py-2 z-50 hover:bg-pink-600 transition-colors"
      >
        <strong>🔥 50% OFF — Limited Time Only! Click Here 🔥</strong>
      </a>

      {/* Push Navbar down below banner */}
      <div className="pt-16">
        <Navbar />

        {/* Carousel */}
        <div className="w-full md:w-3/4 lg:w-2/3 mx-auto py-8">
          <Swiper
            spaceBetween={10}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]"
          >
            <SwiperSlide>
              <img
                src="/images/718mKhznbeL._SL1500_.jpg"
                alt="Makeup"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/makeup-cosmetics.webp"
                alt="Skincare"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/summer-makeup-must-haves-768x512.jpg"
                alt="Hair Care"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/Professional-Hair-Brands-And-Top-Products-Curated-By-Nykaa-Editors-For-A-Salon-Like-Finish-At-Home_OI.jpg"
                alt="Fragrance"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      {/* Best Sellers Section */}
      <main className="px-4 pb-10">
        <h2 className="text-3xl font-bold mb-4 text-center">Best Sellers</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
        >
          {bestSellers.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </main>

      <Footer />
    </>
  );
};

export default Homepage;


