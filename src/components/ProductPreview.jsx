import React, { useState } from 'react';
import { FiZoomIn, FiRotateCw, FiHeart, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const ProductPreview = ({
  product,
  imageSrc,
  customText = '',
  selectedSize = 'Standard',
  selectedTemplate = 'classic',
  zoomLevel = 1,
  rotation = 0,
}) => {
  const [backgroundScene, setBackgroundScene] = useState('studio'); // 'studio' | 'fridge' | 'wall'

  const effectiveImage = imageSrc || product?.images?.[0] || '/brand/posters_collateral.png';

  const isMagnet = product?.category === 'acrylic-magnets';
  const isPolaroid = product?.category === 'polaroid-prints';
  const isFrame = product?.category === 'photo-frames';
  const isSticker = product?.category === 'stickers';

  return (
    <div className="w-full flex flex-col items-center">
      {/* Scene Switcher Pills */}
      <div className="flex items-center gap-2 mb-4 bg-white/90 p-1 rounded-full border border-[#F0DDE2] shadow-xs text-xs">
        <span className="text-[#786D73] px-2 font-medium flex items-center gap-1">
          <FiEye /> Scene:
        </span>
        <button
          type="button"
          onClick={() => setBackgroundScene('studio')}
          className={`px-3 py-1 rounded-full font-medium transition-colors ${
            backgroundScene === 'studio'
              ? 'bg-[#F20D65] text-white shadow-xs'
              : 'text-[#29212A] hover:bg-[#FFF1F4]'
          }`}
        >
          Studio Clean
        </button>
        <button
          type="button"
          onClick={() => setBackgroundScene('fridge')}
          className={`px-3 py-1 rounded-full font-medium transition-colors ${
            backgroundScene === 'fridge'
              ? 'bg-[#F20D65] text-white shadow-xs'
              : 'text-[#29212A] hover:bg-[#FFF1F4]'
          }`}
        >
          {isMagnet ? 'Fridge Door' : 'Desk Space'}
        </button>
        <button
          type="button"
          onClick={() => setBackgroundScene('wall')}
          className={`px-3 py-1 rounded-full font-medium transition-colors ${
            backgroundScene === 'wall'
              ? 'bg-[#F20D65] text-white shadow-xs'
              : 'text-[#29212A] hover:bg-[#FFF1F4]'
          }`}
        >
          Wall Gallery
        </button>
      </div>

      {/* Main Canvas Mockup Container */}
      <div
        className={`w-full max-w-md aspect-4/5 rounded-3xl p-6 sm:p-8 flex items-center justify-center relative overflow-hidden transition-all duration-300 border border-[#F0DDE2] ${
          backgroundScene === 'fridge'
            ? 'bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 shadow-inner'
            : backgroundScene === 'wall'
            ? 'bg-[#F4ECE4] shadow-inner'
            : 'bg-gradient-to-tr from-[#FFF1F4] via-white to-[#FFF9F4] shadow-soft'
        }`}
      >
        {/* Decorative Grid or Wall Texture */}
        {backgroundScene === 'wall' && (
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#29212A_1px,transparent_1px)] [background-size:16px_16px]"></div>
        )}

        {/* Mockup Frame according to Product Type */}
        {isPolaroid ? (
          /* Polaroid Style Frame */
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-64 bg-white p-3.5 pb-10 rounded-sm shadow-polaroid border border-neutral-200 relative flex flex-col items-center"
          >
            {/* Top Tape Clip decoration */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-100/80 border border-amber-200/60 rounded-xs rotate-1 shadow-xs z-20"></div>

            {/* Photo Viewport */}
            <div className="w-full aspect-square bg-neutral-900 rounded-xs overflow-hidden relative shadow-inner">
              <motion.img
                src={effectiveImage}
                alt="Polaroid user photo"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                }}
                className="w-full h-full object-cover transition-transform duration-200"
              />

              {/* Template Accents */}
              {selectedTemplate === 'hearts' && (
                <div className="absolute top-2 right-2 text-[#F20D65] drop-shadow-md text-lg">
                  ♥
                </div>
              )}
              {selectedTemplate === 'gold' && (
                <div className="absolute top-2 left-2 text-amber-300 drop-shadow-md text-sm">
                  ✨
                </div>
              )}
            </div>

            {/* Polaroid Bottom Margin with Handwritten Text */}
            <div className="w-full mt-3 text-center min-h-6 flex flex-col items-center justify-center">
              {customText ? (
                <p className="font-script text-base text-[#29212A] tracking-wide font-bold line-clamp-1">
                  {customText}
                </p>
              ) : (
                <p className="font-script text-sm text-[#786D73]/60 italic">
                  Snap Treasures • Your memories
                </p>
              )}
              <span className="text-[9px] text-[#786D73]/70 uppercase tracking-widest mt-0.5">
                {selectedSize}
              </span>
            </div>
          </motion.div>
        ) : isFrame ? (
          /* Handcrafted Wooden Frame */
          <motion.div
            animate={{ rotate: rotation }}
            className="w-68 p-4 bg-[#7A4B2A] rounded-2xl shadow-2xl border-4 border-[#5C3418] relative"
          >
            <div className="bg-white p-2.5 rounded-xl shadow-inner">
              <div className="w-full aspect-4/5 rounded-lg overflow-hidden relative bg-neutral-100">
                <motion.img
                  src={effectiveImage}
                  alt="Custom framed memory"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center',
                  }}
                  className="w-full h-full object-cover"
                />
                {/* Glass Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none"></div>

                {customText && (
                  <div className="absolute bottom-2 inset-x-2 bg-white/90 backdrop-blur-xs py-1 px-2 rounded-md text-center text-xs font-serif font-bold text-[#29212A] shadow-xs">
                    {customText}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Acrylic Photo Magnet Style (Default) */
          <motion.div
            animate={{ rotate: rotation }}
            className="relative w-64 aspect-25/35 bg-white rounded-2xl p-1.5 shadow-2xl border-2 border-white/80 ring-2 ring-black/5"
          >
            {/* 3D Acrylic Glass Bevel Effect */}
            <div className="w-full h-full rounded-xl overflow-hidden relative shadow-inner bg-neutral-900">
              <motion.img
                src={effectiveImage}
                alt="Acrylic Magnet Custom Preview"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                }}
                className="w-full h-full object-cover"
              />

              {/* Glossy High-Shine Glare Line */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none"></div>

              {/* Template Overlay */}
              {selectedTemplate === 'hearts' && (
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-full text-xs text-[#F20D65] font-bold flex items-center gap-1 shadow-xs">
                  <span>♥</span> Loved
                </div>
              )}

              {/* Custom Text Badge on Magnet */}
              {customText && (
                <div className="absolute bottom-3 inset-x-3 bg-white/90 backdrop-blur-md p-1.5 rounded-xl text-center shadow-md border border-white/60">
                  <p className="font-sans font-bold text-xs text-[#29212A] truncate">
                    {customText}
                  </p>
                  <p className="text-[9px] text-[#F20D65] font-script">
                    Snap Treasures Keepsake
                  </p>
                </div>
              )}
            </div>

            {/* Dimension Badge Indicator */}
            <div className="absolute -bottom-3 right-4 bg-[#F20D65] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
              {selectedSize}
            </div>
          </motion.div>
        )}
      </div>

      {/* Note distinguishing browser mockup */}
      <p className="text-[11px] text-[#786D73] text-center mt-3 max-w-sm italic">
        * Live browser preview. Our production team sharpens and color-calibrates every photo before physical printing.
      </p>
    </div>
  );
};

export default ProductPreview;
