import React, { useEffect, useState } from "react";

const deals = [
  {
    name: "Rare Beauty Blush",
    image: "/images/718mKhznbeL._SL1500_.jpg",
    originalPrice: 28.0,
    dealPrice: 19.99,
    description: "Soft pinch liquid blush – glow from within.",
  },
  {
    name: "Fenty Beauty Gloss",
    image: "/images/makeup-cosmetics.webp",
    originalPrice: 22.0,
    dealPrice: 14.99,
    description: "Gloss Bomb – ultra shine lip luminizer.",
  },
  {
    name: "Zara Perfume",
    image: "/images/Professional-Hair-Brands-And-Top-Products-Curated-By-Nykaa-Editors-For-A-Salon-Like-Finish-At-Home_OI.jpg",
    originalPrice: 35.0,
    dealPrice: 24.99,
    description: "Elevate your scent game – timeless aroma.",
  },
];

// Countdown timer: 5 hours from now
const targetTime = new Date().getTime() + 5 * 60 * 60 * 1000;

const DealsOfTheDay = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
      const minutes = String(
        Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0");
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(
        2,
        "0"
      );

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateDiscount = (original, deal) =>
    Math.round(((original - deal) / original) * 100);

  return (
    <section className="py-7 px-4 bg-gradient-to-br from-pink-100 via-white to-pink-200">
      <div className="max-w-7xl mx-auto">
        {/* Animated Gradient Heading */}
        <h2
          className="
            text-4xl
            font-extrabold
            text-center
            mb-6
            bg-gradient-to-r
            from-violet-500
            via-red-500
            to-purple-700
            bg-clip-text
            text-transparent
            animate-gradient-x
            bg-[length:200%_200%]
          "
          style={{
            backgroundSize: "200% 200%",
            animation: "gradientShift 4s ease infinite",
          }}
        >
          Deals of the Day
        </h2>

        {/* Timer Box */}
        <div className="flex justify-center mb-10">
          <div className="bg-white rounded-full shadow-lg px-6 py-3 flex gap-4 items-center font-mono text-lg text-pink-600 animate-pulse border-2 border-pink-300">
            <span className="font-bold">{timeLeft.hours}</span>:
            <span className="font-bold">{timeLeft.minutes}</span>:
            <span className="font-bold">{timeLeft.seconds}</span>
            <span className="text-sm uppercase ml-2 text-pink-400">left only!</span>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {deals.map((item, index) => {
            const discount = calculateDiscount(item.originalPrice, item.dealPrice);
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-pink-300 duration-300 flex flex-col"
              >
                {/* Image & Discount Badge */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    -{discount}% OFF
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{item.description}</p>

                  {/* Price & Buy Button */}
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <div className="text-xl text-pink-600 font-bold">
                      ${item.dealPrice.toFixed(2)}
                      <span className="text-sm text-gray-400 ml-2 line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <button className="bg-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-pink-600 transition">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gradient animation keyframes */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradientShift 4s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  );
};

export default DealsOfTheDay;
