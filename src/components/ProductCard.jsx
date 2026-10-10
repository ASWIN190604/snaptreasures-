import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiStar, FiEdit3 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/formatCurrency';
import { createProductOrderWhatsAppUrl } from '../utils/whatsapp';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-3xl border border-[#F0DDE2] overflow-hidden shadow-xs hover:shadow-soft-lg flex flex-col transition-all duration-300 relative"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-4/3 sm:aspect-square bg-[#FFF1F4] overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start pointer-events-none">
          {product.badge && (
            <span className="px-2.5 py-1 bg-[#F20D65] text-white text-[11px] font-bold rounded-full shadow-sm tracking-wide">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 bg-white text-[#C90A50] text-[10px] font-extrabold rounded-full shadow-xs border border-[#F0DDE2]">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
            isFavorited
              ? 'bg-[#F20D65] text-white'
              : 'bg-white/90 text-[#786D73] hover:text-[#F20D65] hover:bg-white'
          }`}
        >
          <motion.div whileTap={{ scale: 0.7 }}>
            <FiHeart className={`text-base ${isFavorited ? 'fill-current' : ''}`} />
          </motion.div>
        </button>

        {/* Quick Personalize Button Hover Overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
          <Link
            to={`/personalize/${product.id}`}
            className="w-full py-2 bg-white/95 backdrop-blur-sm text-[#F20D65] hover:bg-[#F20D65] hover:text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 border border-[#F20D65]/30"
          >
            <FiEdit3 className="text-sm" /> Personalize Photo & Text
          </Link>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Category */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#C90A50] font-medium tracking-wide uppercase text-[10px] bg-[#FFF1F4] px-2 py-0.5 rounded-full">
              {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1 text-[#29212A] font-medium">
              <FiStar className="text-amber-400 fill-amber-400 text-xs" />
              <span>{product.rating}</span>
              <span className="text-[#786D73]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-[#F20D65] transition-colors">
            <h3 className="font-bold text-sm sm:text-base text-[#29212A] line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-[#786D73] mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 mt-3 border-t border-[#F0DDE2]/60 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-[#F20D65]">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#786D73] line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium block">
              In Stock • Ready to ship
            </span>
          </div>

          {/* Quick Add to Cart Button */}
          <button
            onClick={handleQuickAdd}
            aria-label="Add to cart"
            className={`px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-xs ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-[#FFF1F4] text-[#F20D65] hover:bg-[#F20D65] hover:text-white'
            }`}
          >
            <FiShoppingBag className="text-sm" />
            <span className="hidden sm:inline">
              {addedAnimation ? 'Added!' : 'Add'}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
