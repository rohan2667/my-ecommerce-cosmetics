import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

const ProductDetail = ({ product }) => {
  const {
    name,
    brand,
    price,
    description,
    ingredients,
    howToUse,
    sizes,
    variants = [],
    additionalImages = [],
    image: primaryImage,
  } = product;

  const { cart, addToCart, removeFromCart, decrementFromCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const hasColorVariants = Array.isArray(variants) && variants.length > 0;
  const hasSizeOptions = Array.isArray(sizes) && sizes.length > 0;

  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);
  const [selectedSize, setSelectedSize] = useState(hasSizeOptions ? sizes[0] : null);

  const initialImage = selectedVariant?.image || primaryImage || "";
  const [mainImage, setMainImage] = useState(initialImage);

  const [zoomStyle, setZoomStyle] = useState({});
  const [quantity, setQuantity] = useState(0);
  const imgRef = useRef(null);

  const [showIngredients, setShowIngredients] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);

  useEffect(() => {
    if (hasColorVariants) {
      setSelectedVariant(variants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [variants, hasColorVariants]);

  useEffect(() => {
    if (hasSizeOptions) {
      setSelectedSize(sizes[0]);
    } else {
      setSelectedSize(null);
    }
  }, [sizes, hasSizeOptions]);

  useEffect(() => {
    if (selectedVariant?.image) {
      setMainImage(selectedVariant.image);
    } else if (primaryImage) {
      setMainImage(primaryImage);
    }
  }, [selectedVariant, primaryImage]);

  useEffect(() => {
    const item = cart.find((item) => {
      if (hasColorVariants && hasSizeOptions) {
        return (
          item.id === product.id &&
          item.selectedColor?.name === selectedVariant?.color.name &&
          item.selectedSize === selectedSize
        );
      } else if (hasColorVariants) {
        return item.id === product.id && item.selectedColor?.name === selectedVariant?.color.name;
      } else if (hasSizeOptions) {
        return item.id === product.id && item.selectedSize === selectedSize;
      } else {
        return item.id === product.id;
      }
    });
    setQuantity(item?.quantity || 0);
  }, [cart, product.id, selectedVariant, selectedSize, hasColorVariants, hasSizeOptions]);

  const handleColorSelect = (variant) => {
    setSelectedVariant(variant);
    setZoomStyle({});
    setMainImage(variant.image);
  };

  const handleSizeSelect = (sizeOption) => {
    setSelectedSize(sizeOption);
  };

  const handleThumbnailClick = (imgUrl) => {
    setMainImage(imgUrl);
    setZoomStyle({});
  };

  const handleMouseMove = (e) => {
    if (!imgRef.current || !mainImage) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${mainImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "200%",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  const handleAddToCart = () => {
    if (hasColorVariants && !selectedVariant) return;
    if (hasSizeOptions && !selectedSize) return;

    if (quantity === 0) {
      addToCart(
        {
          ...product,
          ...(hasColorVariants && { selectedColor: selectedVariant.color }),
          ...(hasSizeOptions && { selectedSize }),
        },
        1
      );
    }
  };

  const handleIncreaseQuantity = () => {
    addToCart(
      {
        ...product,
        ...(hasColorVariants && { selectedColor: selectedVariant.color }),
        ...(hasSizeOptions && { selectedSize }),
      },
      1
    );
  };

  const handleDecreaseQuantity = () => {
    if (quantity <= 1) {
      removeFromCart({
        ...product,
        ...(hasColorVariants && { selectedColor: selectedVariant.color }),
        ...(hasSizeOptions && { selectedSize }),
      });
    } else {
      decrementFromCart({
        ...product,
        ...(hasColorVariants && { selectedColor: selectedVariant.color }),
        ...(hasSizeOptions && { selectedSize }),
      });
    }
  };

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const toggleWishlist = () => {
    isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow flex flex-wrap gap-10">
      {/* Thumbnails */}
      <div className="flex flex-col space-y-4">
        {hasColorVariants ? (
          variants.map((variant) => (
            <button
              key={variant.color.name}
              onClick={() => handleColorSelect(variant)}
              className={`w-16 h-16 border-2 rounded-md overflow-hidden focus:outline-none ${
                mainImage === variant.image ? "border-pink-600 shadow-lg" : "border-gray-300"
              }`}
              aria-label={`Select variant color ${variant.color.name}`}
            >
              <img src={variant.image} alt={variant.color.name} className="w-full h-full object-cover" />
            </button>
          ))
        ) : (
          <>
            {primaryImage && (
              <button
                onClick={() => handleThumbnailClick(primaryImage)}
                className={`w-16 h-16 border-2 rounded-md overflow-hidden focus:outline-none ${
                  mainImage === primaryImage ? "border-pink-600 shadow-lg" : "border-gray-300"
                }`}
                aria-label="View primary image"
              >
                <img src={primaryImage} alt="Primary product" className="w-full h-full object-cover" />
              </button>
            )}
            {additionalImages.map((imgUrl, idx) => (
              <button
                key={`additional-${idx}`}
                onClick={() => handleThumbnailClick(imgUrl)}
                className={`w-16 h-16 border-2 rounded-md overflow-hidden focus:outline-none ${
                  mainImage === imgUrl ? "border-pink-600 shadow-lg" : "border-gray-300"
                }`}
                aria-label={`View additional image ${idx + 1}`}
              >
                <img src={imgUrl} alt={`Additional view ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </>
        )}
      </div>

      {/* Main Image + Accordion Info */}
      <div className="flex flex-col items-center mr-20">
        <div
          ref={imgRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-[400px] h-[400px] border-4 rounded-lg shadow-md cursor-zoom-in"
          style={{
            borderColor: selectedVariant?.color?.code || (hasColorVariants ? "#ddd" : "transparent"),
            backgroundImage: `url(${mainImage})`,
            backgroundPosition: zoomStyle.backgroundPosition || "center",
            backgroundSize: zoomStyle.backgroundSize || "cover",
            backgroundRepeat: "no-repeat",
            transition: "background-position 0.1s ease",
          }}
          aria-label={`${name} product image`}
        />
        {hasColorVariants && (
          <p className="mt-2 text-sm font-secondary text-gray-500">
            Hover to zoom – Color: <strong>{selectedVariant?.color.name}</strong>
          </p>
        )}

        {/* Collapsible Sections */}
         <div className="w-full space-y-2 mt-2 mb-3">
          {ingredients && (
            <div className="border-t pt-2 border-gray-300">
              <button
                onClick={() => setShowIngredients(!showIngredients)}
                className="w-full text-left font-medium font-secondary text-gray-800 hover:text-pink-600 flex justify-between items-center"
              >
                Ingredients
                <span>{showIngredients ? "−" : "+"}</span>
              </button>
              {showIngredients && <p className="text-sm font-secondary text-gray-700 mt-1">{ingredients}</p>}
            </div>
          )}
          {howToUse && (
            <div className="border-t pt-2 border-gray-300">
              <button
                onClick={() => setShowHowToUse(!showHowToUse)}
                className="w-full text-left font-secondary font-medium text-gray-800 hover:text-pink-600 flex justify-between items-center"
              >
                How to Use
                <span>{showHowToUse ? "−" : "+"}</span>
              </button>
              {showHowToUse && <p className="text-sm font-secondary text-gray-700 mt-1">{howToUse}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Product Info & Controls */}
      <div className="max-w-md space-y-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-gray-800 mb-1">{name}</h1>
          {brand && <p className="text-sm font-secondary text-gray-500 mb-5">{brand}</p>}
          <p className="text-lg font-secondary font-semibold text-pink-600 mb-5">${price.toFixed(2)}</p>
          {description && <p className="text-gray-700 font-secondary mb-8">{description}</p>}
        </div>

        {/* Color Selector */}
        {hasColorVariants && (
          <div>
            <h3 className="font-semibold text-gray-800 font-secondary mb-8">Select Color</h3>
            <div className="flex space-x-3">
              {variants.map((variant) => (
                <button
                  key={variant.color.name}
                  onClick={() => handleColorSelect(variant)}
                  className={`w-10 h-10 mb-5 rounded-full border-2 flex items-center justify-center transition-transform transform focus:outline-none ${
                    selectedVariant?.color.name === variant.color.name
                      ? "border-pink-600 shadow-md scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: variant.color.code }}
                  aria-label={`Select color ${variant.color.name}`}
                >
                  <div className="w-5 h-5 rounded-full bg-white bg-opacity-20" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Selector */}
       {hasSizeOptions && (
          <div>
            <h3 className="font-semibold text-gray-800 font-secondary mb-2">Select Size</h3>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`px-3 py-1 border text-sm font-secondary rounded transition-all ${
                    selectedSize === size
                      ? "border-pink-500 text-pink-600 font-semibold"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={handleDecreaseQuantity}
            disabled={quantity === 0}
            className="flex items-center justify-center w-5 h-5 rounded bg-gray-200  hover:bg-gray-300 text-lg font-bold disabled:opacity-50"
          >
            −
          </button>
          <span className="w-6 text-center">{quantity}</span>
          <button
            onClick={handleIncreaseQuantity}
            className="flex items-center justify-center w-5 h-5 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold"
          >
            +
          </button>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 text-sm font-secondary rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow"
          >
            {quantity > 0 ? "In Cart" : "Add to Cart"}
          </button>
          <button
            onClick={toggleWishlist}
            className={`px-4 py-2 text-sm fpont-secondary rounded-full font-semibold shadow ${
              isWishlisted
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isWishlisted ? "♥ In Wishlist" : "♡ Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;