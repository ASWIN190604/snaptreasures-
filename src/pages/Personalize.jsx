import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiShoppingBag, 
  FiZoomIn, 
  FiRotateCw, 
  FiCheck, 
  FiSliders, 
  FiInfo 
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import ImageUploader from '../components/ImageUploader';
import ProductPreview from '../components/ProductPreview';
import { formatCurrency } from '../utils/formatCurrency';
import { createProductOrderWhatsAppUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const Personalize = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Find product or default to acrylic-photo-magnet
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [uploadedImage, setUploadedImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [customText, setCustomText] = useState('');
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : '2.5 x 3.5 inches (Standard)'
  );
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product.sizes) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  const handleImageSelect = (dataUrl, name) => {
    setUploadedImage(dataUrl);
    setFileName(name);
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
    setFileName('');
  };

  const templates = [
    { id: 'classic', name: 'Classic Pure', desc: 'Clean border & authentic photo' },
    { id: 'hearts', name: 'Sweet Hearts', desc: 'Playful pink heart accents' },
    { id: 'gold', name: 'Golden Sparkle', desc: 'Warm milestone celebration' },
  ];

  const handleAddToCart = () => {
    const customization = {
      text: customText,
      template: selectedTemplate,
      size: selectedSize,
      previewUrl: uploadedImage || product.images[0],
      fileName: fileName || 'default-photo.jpg',
    };

    addToCart(product, 1, selectedSize, customization);
    setAddedToast(true);
    setTimeout(() => {
      navigate('/cart');
    }, 1200);
  };

  const whatsappUrl = createProductOrderWhatsAppUrl({
    productName: product.name,
    price: product.price,
    size: selectedSize,
    quantity: 1,
    customizationText: customText,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0DDE2] pb-6">
        <div>
          <Link
            to={`/product/${product.id}`}
            className="inline-flex items-center gap-1.5 text-xs text-[#786D73] hover:text-[#F20D65] mb-2"
          >
            <FiArrowLeft /> Back to product details
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#29212A]">
              Personalize Your Gift
            </h1>
            <span className="bg-[#FFF1F4] text-[#F20D65] text-xs font-bold px-2.5 py-1 rounded-full border border-[#F0DDE2]">
              Live Studio
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#786D73] mt-1">
            Customizing: <strong className="text-[#29212A]">{product.name}</strong> • Base Price: <strong className="text-[#F20D65]">{formatCurrency(product.price)}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <FaWhatsapp className="text-base" /> Order on WhatsApp
          </a>
        </div>
      </div>

      {/* Split Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Multi-step Customization Form */}
        <div className="lg:col-span-6 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#F0DDE2] shadow-xs">
          {/* STEP 1: Upload Photo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#29212A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F20D65] text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                Upload Your Photo
              </label>
              <span className="text-xs text-[#786D73]">JPG, PNG or WebP</span>
            </div>

            <ImageUploader
              selectedImage={uploadedImage}
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove}
            />
          </div>

          {/* Image Adjustments (Zoom & Rotation) */}
          <div className="space-y-3 pt-4 border-t border-[#F0DDE2]/70">
            <label className="text-xs font-bold uppercase tracking-wider text-[#29212A] flex items-center gap-2">
              <FiSliders className="text-[#F20D65]" /> Photo Alignment & Zoom
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FFF9F4] p-3.5 rounded-2xl border border-[#F0DDE2]/60">
              {/* Zoom Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#786D73]">
                  <span>Zoom Level:</span>
                  <span className="font-bold text-[#29212A]">{Math.round(zoomLevel * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2.2"
                  step="0.05"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                  className="w-full accent-[#F20D65] cursor-pointer"
                />
              </div>

              {/* Rotation Stepper */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#786D73]">
                  <span>Tilt Angle:</span>
                  <span className="font-bold text-[#29212A]">{rotation}°</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRotation((r) => (r - 2 < -10 ? -10 : r - 2))}
                    className="flex-1 py-1 bg-white border border-[#F0DDE2] rounded-lg text-xs font-semibold text-[#29212A] hover:bg-[#FFF1F4]"
                  >
                    -2° Left
                  </button>
                  <button
                    type="button"
                    onClick={() => setRotation(0)}
                    className="px-2.5 py-1 bg-white border border-[#F0DDE2] rounded-lg text-xs text-[#786D73] hover:text-[#F20D65]"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setRotation((r) => (r + 2 > 10 ? 10 : r + 2))}
                    className="flex-1 py-1 bg-white border border-[#F0DDE2] rounded-lg text-xs font-semibold text-[#29212A] hover:bg-[#FFF1F4]"
                  >
                    +2° Right
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: Custom Text */}
          <div className="space-y-3 pt-4 border-t border-[#F0DDE2]/70">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#29212A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F20D65] text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                Custom Text or Names (Optional)
              </label>
              <span className="text-xs text-[#786D73]">
                {customText.length}/50 chars
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                maxLength={50}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="e.g. Rohan & Pooja • 14.02.2025 or Best Friends Forever ♥"
                className="w-full px-4 py-3 bg-[#FFF9F4] border border-[#F0DDE2] rounded-2xl text-xs sm:text-sm text-[#29212A] placeholder-[#786D73] focus:outline-none focus:border-[#F20D65]"
              />
            </div>
          </div>

          {/* STEP 3: Choose Design Template */}
          <div className="space-y-3 pt-4 border-t border-[#F0DDE2]/70">
            <label className="text-sm font-bold text-[#29212A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F20D65] text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              Choose Design Theme
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedTemplate === tpl.id
                      ? 'bg-[#FFF1F4] border-[#F20D65] shadow-xs ring-1 ring-[#F20D65]'
                      : 'bg-white border-[#F0DDE2] hover:bg-[#FFF9F4]'
                  }`}
                >
                  <p className="font-bold text-xs text-[#29212A] flex items-center justify-between">
                    <span>{tpl.name}</span>
                    {selectedTemplate === tpl.id && (
                      <FiCheck className="text-[#F20D65]" />
                    )}
                  </p>
                  <p className="text-[10px] text-[#786D73] mt-0.5">
                    {tpl.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 4: Select Size */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-[#F0DDE2]/70">
              <label className="text-sm font-bold text-[#29212A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F20D65] text-white text-xs flex items-center justify-center font-bold">
                  4
                </span>
                Select Size / Dimensions
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedSize === sz
                        ? 'bg-[#F20D65] text-white border-[#F20D65]'
                        : 'bg-white text-[#29212A] border-[#F0DDE2] hover:border-[#F20D65]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add To Cart CTA Button */}
          <div className="pt-6 border-t border-[#F0DDE2] space-y-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-4 bg-[#F20D65] hover:bg-[#DB0959] text-white font-bold rounded-2xl shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2 text-base"
            >
              <FiShoppingBag className="text-lg" />
              <span>Confirm & Add Customized Gift to Cart</span>
            </button>

            {addedToast && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-semibold text-center animate-pulse">
                ✓ Customized gift successfully saved to cart! Redirecting...
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Mockup Preview */}
        <div className="lg:col-span-6 sticky top-24">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F0DDE2] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0DDE2] pb-3">
              <h3 className="font-bold text-sm text-[#29212A] flex items-center gap-1.5 font-display">
                <HiSparkles className="text-[#F20D65]" /> Real-time Live Preview
              </h3>
              <span className="text-[11px] text-[#786D73]">
                Auto-synchronized
              </span>
            </div>

            <ProductPreview
              product={product}
              imageSrc={uploadedImage}
              customText={customText}
              selectedSize={selectedSize}
              selectedTemplate={selectedTemplate}
              zoomLevel={zoomLevel}
              rotation={rotation}
            />

            {/* Direct WhatsApp Assistance Callout */}
            <div className="mt-4 p-3.5 bg-[#FFF9F4] rounded-2xl border border-[#F0DDE2] text-xs text-[#786D73] flex items-center gap-3">
              <FaWhatsapp className="text-2xl text-[#25D366] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#29212A]">Prefer sending photos on WhatsApp?</p>
                <p className="text-[11px]">You can complete checkout first or send photos directly to our number.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalize;
