import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const banners = [
  {
    id: 1,
    image: "/images/slider-1_92036d79-afe9-4951-8749-39650620dc10.jpg",
    heading2: "Cosmetic Face Products",
    paragraph:
      "Cleansing, Beautifying, \nPromoting Attractiveness \nwithout Affecting the \nBody's Natural Beauty",
  },
  {
    id: 2,
    image: "/images/slider-3_a3eee9f8-b7f4-48cc-9d89-71081de9a6b6.jpg",
    heading: "Beauty Cosmetics",
    paragraph5: "Herbals With \nNatural Ingredients",
    paragraph2: "20% Off On First Order",
  },
  {
    id: 3,
    image: "/images/slider-2_b0e9436e-ff93-406a-bd90-e20f8fd1a385.jpg",
    paragraph3: "20% Off On First Order",
    paragraph4: "A Perfect and \nIncredible Cosmetics!",
    paragraph6:
      "Choose our herbal beauty cosmetic products to look good \nwhich last all day, get smooth gentle skin, natural glow, silky \nsoft hair.",
  },
];

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

export default function BannerSlider() {
  const slide3 = banners.find((b) => b.id === 3);
  const otherSlides = banners.filter((b) => b.id !== 3);

  return (
    <div className="w-full mb-6">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        showDots
        arrows={false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        containerClass="w-full"
        itemClass="w-full"
      >
        {/* Render other slides (default layout) */}
        {otherSlides.map((banner) => (
          <div
            key={banner.id}
            className="relative w-full h-64 md:h-118 rounded overflow-hidden shadow-lg"
          >
            <img
              src={banner.image}
              alt={banner.heading}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-10">
              {banner.heading2 && (
                <h2 className="text-pink-500 font-decorative text-4xl">
                  {banner.heading2}
                </h2>
              )}
              {banner.paragraph && (
                <p
                  className="text-black text-3xl mt-5 mb-5 font-band leading-relaxed tracking-wider"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {banner.paragraph}
                </p>
              )}
              {banner.heading && (
                <h2 className="text-pink-500 font-decorative text-6xl">
                  {banner.heading}
                </h2>
              )}
              {banner.paragraph5 && (
                <p
                  className="text-black text-4xl mt-5 font-band leading-relaxed tracking-wider whitespace-pre-line"
                >
                  {banner.paragraph5}
                </p>
              )}
              {banner.paragraph2 && (
                <p className="text-pink-500 text-2xl mt-5 font-band leading-relaxed tracking-wider whitespace-pre-line">
                  {banner.paragraph2}
                </p>
              )}
              <button className="rounded-full border border-pink-600 text-pink-600 hover:bg-pink-700 hover:text-white transition transform hover:-translate-y-1 active:scale-95 font-display font-bold px-4 py-2 animate-pulse  shadow-md tracking-widest mt-4">
                SHOP NOW
              </button>
            </div>
          </div>
        ))}

        {/* Render custom third slide (left-aligned layout) */}
        {slide3 && (
          <div
            key={slide3.id}
            className="relative w-full h-64 md:h-118 rounded overflow-hidden shadow-lg"
          >
            <img
              src={slide3.image}
              alt="Custom Slide"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 flex flex-col left-190 top-17 w-full h-full">
              {slide3.paragraph3 && (
                <p className="text-pink-500 text-lg mb-4 font-band leading-relaxed tracking-wider">
                  {slide3.paragraph3}
                </p>
              )}
              {slide3.paragraph4 && (
                <p
                  className="text-black text-5xl font-semibold mb-4 font-band tracking-wider"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {slide3.paragraph4}
                </p>
              )}
              {slide3.paragraph6 && (
                <p
                  className="text-black text-base mb-9 font-band leading-relaxed tracking-wider"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {slide3.paragraph6}
                </p>
              )}
              <button className="rounded-full border border-pink-600 text-pink-600 hover:bg-pink-700 hover:text-white transition transform hover:-translate-y-1 active:scale-95 font-display font-bold px-4 py-2 shadow-md w-fit tracking-widest mt-4">
                SHOP NOW
              </button>
            </div>
          </div>
        )}
      </Carousel>
    </div>
  );
}
