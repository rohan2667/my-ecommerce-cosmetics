import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const banners = [
  {
    id: 1,
    image: "/images/718mKhznbeL._SL1500_.jpg",
    text: "🔥 Summer Sale - Up to 50% Off!",
  },
  {
    id: 2,
    image: "/images/makeup-cosmetics.webp",
    text: " New Arrivals Just Dropped!",
  },
  {
    id: 3,
    image: "/images/Professional-Hair-Brands-And-Top-Products-Curated-By-Nykaa-Editors-For-A-Salon-Like-Finish-At-Home_OI.jpg",
    text: "💥 Flash Deals Today Only!",
  },
  {
    id: 4,
    image: "/images/summer-makeup-must-haves-768x512.jpg",
    text: "✨ Must-Have Summer Makeup!",
  },
];

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

export default function BannerSlider() {
  return (
    <div className="w-full mb-6">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        arrows={false}
        showDots
        removeArrowOnDeviceType={["tablet", "mobile"]}
        containerClass="w-full"
        itemClass="w-full"
      >
        {banners.map((banner) => {
          const [emoji, ...rest] = banner.text.split(" ");
          const restText = rest.join(" ");

          return (
            <div
              key={banner.id}
              className="relative w-full h-64 md:h-118 rounded overflow-hidden shadow-lg"
            >
              <img
                src={banner.image}
                alt={banner.text}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 to-transparent text-white px-4">
                <h2 className="text-lg md:text-5xl tracking-wide font-semibold drop-shadow flex items-center gap-3 text-center">
                  <span className="text-white text-4xl md:text-3xl">{emoji}</span>
                  <span className="bg-gradient-to-r from-purple-400 via-[#f595c5] to-red-500 bg-clip-text text-transparent">
                    {restText}
                  </span>
                </h2>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
