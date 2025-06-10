const productImages = [
  "/images/718mKhznbeL._SL1500_.jpg",
  "/images/makeup-cosmetics.webp",
  "/images/2822953.webp",
  "/images/fenty-beauty9929.logowik.com.webp",
  "/images/summer-makeup-must-haves-768x512.jpg",
  "/images/Rare_beauty.webp.png",
];

const creativeColors = [
  { name: "Ruby Red", code: "#9B111E" },
  { name: "Coral", code: "#FF7F50" },
  { name: "Sunset Orange", code: "#FF4500" },
  { name: "Lavender", code: "#E6E6FA" },
  { name: "Mint Green", code: "#98FF98" },
  { name: "Sky Blue", code: "#87CEEB" },
  { name: "Champagne", code: "#F7E7CE" },
  { name: "Espresso", code: "#4B3621" },
  { name: "Rose Gold", code: "#B76E79" },
  { name: "Charcoal", code: "#36454F" },
];

const sizeOptions = [
  "10ml", "25ml", "50ml", "100ml", "150ml",
  "5g", "10g", "15g",
  "S", "M", "L", "XL",
];

const baseProducts = [
  {
    name: "Hydrating Face Cream",
    brand: "GlowCo",
    category: "Skincare",
    price: 25.99,
    skinType: "Dry",
  },
  {
    name: "Matte Lipstick",
    brand: "LuxeBeauty",
    category: "Makeup",
    price: 15.99,
    skinType: "All",
  },
  {
    name: "Aloe Vera Gel",
    brand: "NatureCare",
    category: "Skincare",
    price: 12.49,
    skinType: "Sensitive",
  },
  {
    name: "Nude Eyeshadow Palette",
    brand: "LuxeBeauty",
    category: "Makeup",
    price: 29.99,
    skinType: "All",
  },
];

function getRandomItems(array, count) {
  return array.sort(() => 0.5 - Math.random()).slice(0, count);
}

export const allProducts = Array.from({ length: 20 }, (_, i) => {
  const base = baseProducts[i % baseProducts.length];
  const colors = getRandomItems(creativeColors, Math.floor(Math.random() * 3) + 2);
  const sizes = getRandomItems(sizeOptions, Math.floor(Math.random() * 2) + 2);

  return {
    ...base,
    id: i + 1,
    image: productImages[i % productImages.length],
    colors,
    sizes,
    description: "High-quality product with natural and organic ingredients. ",
    ingredients: "Aloe Vera, Vitamin E, Rosehip Oil, Shea Butter, Hyaluronic Acid",
    howToUse: "Apply gently to clean skin. Use daily for best results.",
    attributes: {
      Size: sizes,
      Color: colors,
      Type: base.category,
      SkinType: base.skinType,
    },
    reviews: [],
  };
});
