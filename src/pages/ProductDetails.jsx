import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FiHeart, 
  FiShoppingBag, 
  FiStar, 
  FiTruck, 
  FiShield, 
  FiCheckCircle, 
  FiArrowLeft,
  FiSliders,
  FiShare2
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import QuantitySelector from '../components/QuantitySelector';
import ProductGrid from '../components/ProductGrid';
import { formatCurrency } from '../utils/formatCurrency';
import { createProductOrderWhatsAppUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes ? product.sizes[0] : 'Standard');
      setSelectedImageIndex(0);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-display text-[#29212A]">
          Product Not Found
        </h2>
        <p className="text-sm text-[#786D73]">
          The keepsake you are looking for may have been moved or updated.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#F20D65] text-white rounded-full text-sm font-bold shadow-soft"
        >
          <FiArrowLeft /> Return to Shop
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const whatsappOrderUrl = createProductOrderWhatsAppUrl({
    productName: product.name,
    price: product.price,
    size: selectedSize,
    quantity,
  });

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#786D73]">
        <Link to="/" className="hover:text-[#F20D65]">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#F20D65]">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-[#F20D65] capitalize">
          {product.category.replace('-', ' ')}
        </Link>
        <span>/</span>
        <span className="text-[#29212A] font-semibold truncate max-w-48 sm:max-w-none">
          {product.name}
        </span>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Hero Image */}
          <div className="aspect-square bg-[#FFF1F4] rounded-3xl overflow-hidden border border-[#F0DDE2] relative shadow-soft">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
              {product.badge && (
                <span className="px-3 py-1 bg-[#F20D65] text-white text-xs font-bold rounded-full shadow-sm">
                  {product.badge}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="px-2.5 py-0.5 bg-white text-[#C90A50] text-xs font-black rounded-full shadow-xs border border-[#F0DDE2]">
                  SAVE {discountPercent}%
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
                isFavorited
                  ? 'bg-[#F20D65] text-white'
                  : 'bg-white/90 text-[#786D73] hover:text-[#F20D65] hover:bg-white'
              }`}
            >
              <FiHeart className={`text-lg ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#F20D65] shadow-md scale-102'
                      : 'border-[#F0DDE2] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#C90A50] font-bold uppercase tracking-wider mb-2">
              <span>{product.category.replace('-', ' ')}</span>
              <span>•</span>
              <span className="text-emerald-600">Same Day Dispatch</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#29212A] leading-tight">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mt-2.5 text-xs text-[#786D73]">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-amber-400 text-xs" />
                ))}
              </div>
              <span className="font-bold text-[#29212A]">{product.rating}</span>
              <span>({product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          {/* Price Area */}
          <div className="bg-[#FFF1F4]/70 p-4 rounded-2xl border border-[#F0DDE2] flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-[#F20D65]">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-base text-[#786D73] line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full ml-auto">
              Inclusive of all taxes
            </span>
          </div>

          {/* Product Description */}
          <p className="text-sm text-[#786D73] leading-relaxed">
            {product.description}
          </p>

          {/* Variant / Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#29212A]">
                Select Size / Variant:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                      selectedSize === size
                        ? 'bg-[#F20D65] text-white border-[#F20D65] shadow-xs'
                        : 'bg-white text-[#29212A] border-[#F0DDE2] hover:border-[#F20D65]/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#29212A]">
                Quantity:
              </span>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
              <span className="text-xs text-[#786D73]">
                Total: <strong className="text-[#29212A]">{formatCurrency(product.price * quantity)}</strong>
              </span>
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#F20D65] hover:bg-[#DB0959] text-white font-bold rounded-2xl shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <FiShoppingBag className="text-lg" />
                <span>Add to Cart</span>
              </button>

              {/* Personalize Button */}
              <Link
                to={`/personalize/${product.id}`}
                className="w-full py-4 bg-white hover:bg-[#FFF1F4] text-[#F20D65] border-2 border-[#F20D65] font-bold rounded-2xl shadow-xs transition-colors flex items-center justify-center gap-2 text-sm text-center"
              >
                <FiSliders className="text-lg" />
                <span>Personalize Photo & Text</span>
              </Link>
            </div>

            {/* Direct WhatsApp Ordering */}
            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
            >
              <FaWhatsapp className="text-xl" />
              <span>Order via WhatsApp ({WHATSAPP_DISPLAY})</span>
            </a>

            {/* Toast feedback */}
            {addedToast && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-medium flex items-center justify-between">
                <span>✓ Added {quantity} item(s) to your cart!</span>
                <Link to="/cart" className="underline font-bold text-emerald-900">
                  View Cart
                </Link>
              </div>
            )}
          </div>

          {/* Delivery & Assurance Info */}
          <div className="pt-4 border-t border-[#F0DDE2] space-y-2.5 text-xs text-[#786D73]">
            <div className="flex items-center gap-2.5">
              <FiTruck className="text-base text-[#F20D65] shrink-0" />
              <span><strong>Delivery:</strong> {product.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiShield className="text-base text-[#F20D65] shrink-0" />
              <span><strong>Authenticity:</strong> High quality prints with water & fade resistance</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiCheckCircle className="text-base text-[#F20D65] shrink-0" />
              <span><strong>Packaging:</strong> Gift-ready rigid bubble protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#F0DDE2]">
          <h2 className="text-2xl font-bold font-display text-[#29212A] mb-6">
            You May Also Love
          </h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
