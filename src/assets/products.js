const allProducts= [
  {
    id: "prod-1",
    name: "Creamy Matte Lipstick",
    brand: "LuxeBeauty",
    category: "Lipstick",
    price: 17.99,
    skinType: "All",
    description: "High-quality product with natural and organic ingredients.",
    ingredients: "Aloe Vera, Vitamin E, Rosehip Oil, Shea Butter, Hyaluronic Acid",
    howToUse: "Apply gently to clean skin. Use daily for best results.",
    variants: [
      { color: { name: "Agenda", code: "#8B0000" }, image:"/images/Creamy-Matte-Lipstick-Agenda-Lid-Off.webp" },
      { color: { name: "Dream Girl", code: "#FF69B4" }, image: "/images/Creamy-Matte-Lipstick-Dream-Girl-Lid-Off.webp" },
      { color: { name: "Heartfelt", code: "#DC143C" }, image: "/images/Creamy-Matte-Lipstick-Heartfelt-Lid-Off.webp" },
      { color: { name: "Obsession", code: "#A52A2A" }, image: "/images/Creamy-Matte-Lipstick-Obsession-Lid-Off.webp" },
      { color: { name: "Super Nude", code: "#C2B280" }, image: "/images/Creamy-Matte-Lipstick-Super-Nude-Lid-Off.webp" }
    ]
  },
  {
    id: "prod-2",
    name: "Velvet Matte Lipstick",
    brand: "LuxeBeauty",
    category: "Lipstick",
    price: 18.99,
    skinType: "All",
    description: "A soft matte finish with long-lasting hydration.",
    ingredients: "Shea Butter, Vitamin C, Avocado Oil, Jojoba Oil",
    howToUse: "Swipe directly onto lips. Reapply as needed.",
    variants: [
      { color: { name: "Wine Night", code: "#8B0000" }, image: "/images/Creamy-Matte-Lipstick-Agenda-Lid-Off.webp" },
      { color: { name: "Bubble Pink", code: "#FF69B4" }, image: "/images/Creamy-Matte-Lipstick-Dream-Girl-Lid-Off.webp" },
      { color: { name: "Crimson Kiss", code: "#DC143C" }, image: "/images/Creamy-Matte-Lipstick-Heartfelt-Lid-Off.webp" },
      { color: { name: "Rust Charm", code: "#A52A2A" }, image: "/images/Creamy-Matte-Lipstick-Obsession-Lid-Off.webp" },
      { color: { name: "Golden Beige", code: "#C2B280" }, image: "/images/Creamy-Matte-Lipstick-Super-Nude-Lid-Off.webp" }
    ]
  },
  {
    id: "prod-3",
    name: "Satin Touch Lipstick",
    brand: "LuxeBeauty",
    category: "Lipstick",
    price: 16.49,
    skinType: "All",
    description: "Smooth satin texture for a luxurious finish.",
    ingredients: "Macadamia Oil, Vitamin E, Coconut Extract",
    howToUse: "Apply to lips and blend for a soft, satin look.",
    variants: [
      { color: { name: "Cherry Bomb", code: "#8B0000" }, image: "/images/Creamy-Matte-Lipstick-Agenda-Lid-Off.webp" },
      { color: { name: "Pink Dust", code: "#FF69B4" }, image: "/images/Creamy-Matte-Lipstick-Dream-Girl-Lid-Off.webp" },
      { color: { name: "Rose Flame", code: "#DC143C" }, image: "/images/Creamy-Matte-Lipstick-Heartfelt-Lid-Off.webp" },
      { color: { name: "Bronze Heat", code: "#A52A2A" }, image: "/images/Creamy-Matte-Lipstick-Obsession-Lid-Off.webp" },
      { color: { name: "Natural Glow", code: "#C2B280" }, image: "/images/Creamy-Matte-Lipstick-Super-Nude-Lid-Off.webp" }
    ]
  },
  {
    id: "prod-4",
    name: "Nude Elegance Lipstick",
    brand: "LuxeBeauty",
    category: "Lipstick",
    price: 19.99,
    skinType: "All",
    description: "Elegant nude tones for every skin tone.",
    ingredients: "Argan Oil, Beeswax, Vitamin A",
    howToUse: "Glide on clean lips. Use daily for enhanced tone.",
    variants: [
      { color: { name: "Cocoa Charm", code: "#8B0000" }, image: "/images/Creamy-Matte-Lipstick-Agenda-Lid-Off.webp" },
      { color: { name: "Peony Blush", code: "#FF69B4" }, image: "/images/Creamy-Matte-Lipstick-Dream-Girl-Lid-Off.webp" },
      { color: { name: "Rouge Passion", code: "#DC143C" }, image: "/images/Creamy-Matte-Lipstick-Heartfelt-Lid-Off.webp" },
      { color: { name: "Mahogany Love", code: "#A52A2A" }, image: "/images/Creamy-Matte-Lipstick-Obsession-Lid-Off.webp" },
      { color: { name: "Sandstone", code: "#C2B280" }, image: "/images/Creamy-Matte-Lipstick-Super-Nude-Lid-Off.webp" }
    ]
  },
  {
    id: "prod-5",
    name: "Glossy Shine Lipstick",
    brand: "LuxeBeauty",
    category: "Lipstick",
    price: 15.99,
    skinType: "All",
    description: "Gloss finish with intense color payoff.",
    ingredients: "Castor Oil, Lanolin, Vitamin D",
    howToUse: "Apply as the final step in your makeup routine.",
    variants: [
      { color: { name: "Berry Wine", code: "#8B0000" }, image: "/images/Creamy-Matte-Lipstick-Agenda-Lid-Off.webp" },
      { color: { name: "Sweet Pink", code: "#FF69B4" }, image: "/images/Creamy-Matte-Lipstick-Dream-Girl-Lid-Off.webp" },
      { color: { name: "Garnet Glow", code: "#DC143C" }, image: "/images/Creamy-Matte-Lipstick-Heartfelt-Lid-Off.webp" },
      { color: { name: "Spiced Brick", code: "#A52A2A" }, image: "/images/Creamy-Matte-Lipstick-Obsession-Lid-Off.webp" },
      { color: { name: "Toasted Almond", code: "#C2B280" }, image: "/images/Creamy-Matte-Lipstick-Super-Nude-Lid-Off.webp" }
    ]
  },
  {
    id: "prod-6",
    name: "Hydra Matte Lipstick",
    brand: "LuxeBeauty",
    category: "Lipstick",
    price: 17.49,
    skinType: "Dry, All",
    description: "Hydrating matte formula with a velvet feel.",
    ingredients: "Hyaluronic Acid, Shea Butter, Vitamin B5",
    howToUse: "Start from the center and blend outward.",
    variants: [
      { color: { name: "Plum Desire", code: "#8B0000" }, image: "/images/Creamy-Matte-Lipstick-Agenda-Lid-Off.webp" },
      { color: { name: "Bubble Blush", code: "#FF69B4" }, image: "/images/Creamy-Matte-Lipstick-Dream-Girl-Lid-Off.webp" },
      { color: { name: "Ruby Love", code: "#DC143C" }, image: "/images/Creamy-Matte-Lipstick-Heartfelt-Lid-Off.webp" },
      { color: { name: "Cinnamon", code: "#A52A2A" }, image: "/images/Creamy-Matte-Lipstick-Obsession-Lid-Off.webp" },
      { color: { name: "Biscotti", code: "#C2B280" }, image: "/images/Creamy-Matte-Lipstick-Super-Nude-Lid-Off.webp" }
    ]
  },
  {
    id: "prod-7",
    name: "Luxe Matte Crayon",
    brand: "LuxeBeauty",
    category: "Lipstick",
    price: 14.99,
    skinType: "All",
    description: "Crayon format lipstick for precision application.",
    ingredients: "Beeswax, Coconut Oil, Jojoba Oil",
    howToUse: "Outline lips then fill for bold matte color.",
    variants: [
      { color: { name: "Maroon Muse", code: "#8B0000" }, image: "/images/Creamy-Matte-Lipstick-Agenda-Lid-Off.webp" },
      { color: { name: "Pink Haze", code: "#FF69B4" }, image: "/images/Creamy-Matte-Lipstick-Dream-Girl-Lid-Off.webp" },
      { color: { name: "Scarlet Flame", code: "#DC143C" }, image: "/images/Creamy-Matte-Lipstick-Heartfelt-Lid-Off.webp" },
      { color: { name: "Clay Crush", code: "#A52A2A" }, image: "/images/Creamy-Matte-Lipstick-Obsession-Lid-Off.webp" },
      { color: { name: "Beige Muse", code: "#C2B280" }, image: "/images/Creamy-Matte-Lipstick-Super-Nude-Lid-Off.webp" }
    ]
  },
  {
    id: "prod-8",
    name: "Sheer Color Balm",
    brand: "LuxeBeauty",
    category: "Lip Care",
    price: 13.49,
    sizes: ["20ml", "30ml"],
    skinType: "Sensitive",
    description: "Tinted balm for natural color and soft lips.",
    ingredients: "Shea Butter, Vitamin E, Natural Pigments",
    howToUse: "Swipe once for tint, layer for more color.",
    variants: [
      { color: { name: "Mulberry", code: "#8B0000" }, image: "/images/Creamy-Matte-Lipstick-Agenda-Lid-Off.webp" },
      { color: { name: "Petal Pink", code: "#FF69B4" }, image: "/images/Creamy-Matte-Lipstick-Dream-Girl-Lid-Off.webp" },
      { color: { name: "Flushed Red", code: "#DC143C" }, image: "/images/Creamy-Matte-Lipstick-Heartfelt-Lid-Off.webp" },
      { color: { name: "Burnt Spice", code: "#A52A2A" }, image: "/images/Creamy-Matte-Lipstick-Obsession-Lid-Off.webp" },
      { color: { name: "Soft Honey", code: "#C2B280" }, image: "/images/Creamy-Matte-Lipstick-Super-Nude-Lid-Off.webp" }
    ]
  },
  {
    id: "prod-9",
    name: "Soothing Body Lotion",
    brand: "LuxeBeauty",
    category: "Bodycare",
    price: 12.99,
    sizes: ["200ml", "400ml"],
    description: "Moisturizing lotion for dry and sensitive skin.",
    ingredients: "Shea Butter, Oat Extract, Glycerin",
    howToUse: "Massage into skin after bath or shower.",
    image: "/images/Creamy-Matte-Lipstick-Super-Nude-Lid-Off.webp" 
  },
  {
    id: "prod-10",
    name: "Soothing Body Lotion",
    brand: "LuxeBeauty",
    category: "Bodycare",
    price: 12.99,
    sizes: ["200ml", "400ml"],
    description: "Moisturizing lotion for dry and sensitive skin.",
    ingredients: "Shea Butter, Oat Extract, Glycerin",
    howToUse: "Massage into skin after bath or shower.",
    image: "/images/51fatgIq9eL._SY450_.jpg", // primary front image
    // variants: [
    //   {
    //     color: { name: "Pink", code: "#ff7eb9" },
    //     image: "/images/51fatgIq9eL._SY450_.jpg"
    //   },
    //   {
    //     color: { name: "Blue", code: "#5aa9ff" },
    //     image: "/images/51Yet3SobYL._SY450_.jpg"
    //   }
    // ],
    additionalImages: [
      "/images/51Yet3SobYL._SY450_.jpg" // back view or other views
    ]
  },
  {
    
    id: "prod-11",
    name: "Tinted Lip Oil",
    brand: "Rare Beauty",
    category: "Lip Oil",
    price: 14.99,
    skinType: "All",
    description: "Lip oil for beautiful lips.",
    ingredients: "Beeswax, Coconut Oil, Jojoba Oil",
    howToUse: "Outline lips then fill for bold matte color.",
    variants: [
      { color: { name: "Serenity", code: "#C14E45" }, image: "/images/soft-pinch-tinted-lip-oil-serenity-1440x1952.jpg" },
      { color: { name: "Affection", code: "#7C2D4C" }, image: "/images/soft-pinch-tinted-lip-oil-affection-1440x1952.jpg" },
    ]
  },
  {
    
    id: "prod-12",
    name: "Eye Mascara",
    brand: "Rare Beauty",
    category: "Eye Makeup",
    price: 14.99,
    skinType: "All",
    description: "Volume eyelashes.",
    ingredients: "Beeswax, Coconut Oil, Jojoba Oil",
    howToUse: "Curl your lashes.",
    image: "/images/Full-Size-Mascara-Open-SKU.jpg" ,
  }
];

export { allProducts };