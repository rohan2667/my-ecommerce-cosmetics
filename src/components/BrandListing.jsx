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
    <section className="py-10 px-4 bg-gradient-to-b from-pink-50 to-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Explore Our Top Brands
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {brands.map((brand) => (
          <a
            key={brand.name}
            href={brand.link}
            className="group bg-white p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
          >
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="h-20 w-auto mx-auto mb-4 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <h3 className="text-lg font-semibold text-gray-700">{brand.name}</h3>
            <p className="text-sm text-pink-600 mt-2 group-hover:underline">Shop Now →</p>
          </a>
        ))}
      </div>
    </section>
  );
}
