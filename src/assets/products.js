// src/assets/products.js
const productImages = [
  "/images/718mKhznbeL._SL1500_.jpg",
  "/images/makeup-cosmetics.webp",
  "/images/2822953.webp",
  "/images/fenty-beauty9929.logowik.com.webp",
  "/images/summer-makeup-must-haves-768x512.jpg",
  "/images/Rare_beauty.webp.png",
];

const baseProducts = [
  {
    name: "Hydrating Face Cream",
    brand: "GlowCo",
    category: "Skincare",
    price: 25.99,
    color: "White",
    size: "50ml",
    skinType: "Dry",
  },
  {
    name: "Matte Lipstick",
    brand: "LuxeBeauty",
    category: "Makeup",
    price: 15.99,
    color: "Red",
    size: "5g",
    skinType: "All",
  },
  {
    name: "Aloe Vera Gel",
    brand: "NatureCare",
    category: "Skincare",
    price: 12.49,
    color: "Green",
    size: "100ml",
    skinType: "Sensitive",
  },
  {
    name: "Nude Eyeshadow Palette",
    brand: "LuxeBeauty",
    category: "Makeup",
    price: 29.99,
    color: "Nude",
    size: "10 Shades",
    skinType: "All",
  },
];

export const allProducts = Array.from({ length: 20 }, (_, i) => {
  const base = baseProducts[i % baseProducts.length];
  return {
    ...base,
    id: i + 1,
    image: productImages[i % productImages.length],
    description: "High-quality product with natural ingredients.",
    ingredients: "Aloe Vera, Vitamin E, Rosehip Oil",
    howToUse: "Apply gently to the skin. Use daily.",
    attributes: {
      Size: base.size,
      Color: base.color,
      Type: base.category,
      SkinType: base.skinType,
    },
    reviews: [],
  };
});
