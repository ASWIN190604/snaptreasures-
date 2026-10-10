import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiHeart, 
  FiShoppingBag, 
  FiCheckCircle, 
  FiUploadCloud, 
  FiSliders, 
  FiEye, 
  FiPackage, 
  FiStar,
  FiSend
} from 'react-icons/fi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import ProductGrid from '../components/ProductGrid';
import CategoryCard from '../components/CategoryCard';
import TrustStrip from '../components/TrustStrip';
import { formatCurrency } from '../utils/formatCurrency';
import { WHATSAPP_DIRECT_LINK, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const Home = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  const occasions = [
    {
      title: 'Birthdays & Milestones',
      subtitle: 'Memorable birthday hampers & photo magnets',
      tag: 'Trending',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800&auto=format&fit=crop',
      link: '/shop?category=gift-sets',
    },
    {
      title: 'Anniversaries & Couples',
      subtitle: 'Special date engraving & heart borders',
      tag: 'Romantic',
      image: '/products/acrylic_magnet.jpg',
      link: '/shop?category=acrylic-magnets',
    },
    {
      title: 'Weddings & Celebrations',
      subtitle: 'Archival print packs & return favor gifts',
      tag: 'Cherished',
      image: '/products/polaroid_prints.jpg',
      link: '/shop?category=polaroid-prints',
    },
    {
      title: 'College & Corporate Farewell',
      subtitle: 'Bulk keepsakes with logo & QR printing',
      tag: 'MOQ 50',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop',
      link: '/bulk-orders',
    },
  ];

  const testimonials = [
    {
      name: 'Pooja Sharma',
      city: 'Bengaluru',
      rating: 5,
      date: 'Verified Buyer',
      comment: 'Ordered 12 Polaroid prints and 2 acrylic magnets for our first anniversary. The print clarity is breathtaking! The magnet holds tight on our fridge and smiles back every morning.',
      product: 'Acrylic Photo Magnet & Polaroid Prints',
    },
    {
      name: 'Rohan & Ananya',
      city: 'Mumbai',
      rating: 5,
      date: 'Verified Buyer',
      comment: 'The fastest same-day dispatch experience! WhatsApp ordering was so seamless. My girlfriend literally cried tears of joy when opening the gift box with fairy lights.',
      product: 'Deluxe Memory Hamper',
    },
    {
      name: 'Dr. Sneha Verma',
      city: 'Delhi NCR',
      rating: 5,
      date: 'Bulk Buyer (100 pcs)',
      comment: 'Ordered 100 customized photo magnets for my sister’s baby shower return favors. Every single guest praised the glossy finish and cute packaging. Snap Treasures is top tier!',
      product: 'Custom Bulk Magnet Favors',
    },
  ];

  const instagramPosts = [
    {
      id: 1,
      image: '/brand/posters_collateral.png',
      caption: 'Acrylic magnets ready to brighten your kitchen! 🌸 #SnapTreasures',
    },
    {
      id: 2,
      image: '/brand/packaging_stickers.png',
      caption: 'Packed with love and customized thank you seals! ✨',
    },
    {
      id: 3,
      image: '/products/polaroid_prints.jpg',
      caption: '12 Polaroids for just ₹99. Relive your happiest trips.',
    },
    {
      id: 4,
      image: '/products/acrylic_magnet.jpg',
      caption: 'Small prints, huge emotions. DM us or WhatsApp to order.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pb-20 lg:pt-12 bg-gradient-to-b from-[#FFF1F4]/70 via-[#FFF9F4] to-[#FFF9F4]">
        {/* Soft background glow circles */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#FCE5EC] rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FF8A91]/20 rounded-full blur-3xl opacity-40 -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading, CTA & Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#F0DDE2] shadow-xs text-xs sm:text-sm font-semibold text-[#F20D65]">
                <span className="w-2 h-2 rounded-full bg-[#F20D65] animate-ping"></span>
                <span>✨ New Launch: Acrylic Magnets at just ₹99</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#29212A] tracking-tight leading-[1.15] font-display">
                Turn Moments <br />
                Into <span className="text-[#F20D65] font-script font-normal italic">Memories</span>
              </h1>

              {/* Supporting Subtext */}
              <p className="text-base sm:text-lg text-[#786D73] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Customized Photo Gifts for Every Occasion. Transform your camera roll into vibrant acrylic photo magnets, vintage Polaroid prints, and personalized memory hampers.
              </p>

              {/* Key Features Bullets */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-[#29212A] font-medium pt-1">
                <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-[#F0DDE2]">
                  <FiCheckCircle className="text-[#F20D65]" /> Same Day Dispatch
                </span>
                <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-[#F0DDE2]">
                  <FiCheckCircle className="text-[#F20D65]" /> 12 Prints for ₹99
                </span>
                <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-[#F0DDE2]">
                  <FiCheckCircle className="text-[#F20D65]" /> Pan-India Shipping
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-8 py-4 bg-[#F20D65] hover:bg-[#DB0959] text-white font-bold rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-200 flex items-center justify-center gap-2 text-base group"
                >
                  <span>Shop Now</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/personalize/acrylic-photo-magnet"
                  className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-[#FFF1F4] text-[#F20D65] border-2 border-[#F20D65] font-bold rounded-2xl shadow-xs transition-colors flex items-center justify-center gap-2 text-base"
                >
                  <FiSliders className="text-lg" />
                  <span>Personalize a Gift</span>
                </Link>

                <a
                  href={WHATSAPP_DIRECT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-4 bg-[#25D366]/10 hover:bg-[#25D366] text-[#1EBE5D] hover:text-white font-bold rounded-2xl border border-[#25D366]/30 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <FaWhatsapp className="text-lg" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Layered Polaroid & Magnet Collage Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-md aspect-square sm:aspect-4/3 flex items-center justify-center">
                {/* Background Rotating Decorative Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#FF8A91]/40 animate-spin" style={{ animationDuration: '40s' }}></div>

                {/* Layer 1: Left Polaroid tilted -8 deg */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -4 }}
                  className="absolute -left-2 sm:left-4 top-8 w-44 sm:w-52 bg-white p-3 pb-8 rounded-sm shadow-polaroid border border-[#F0DDE2] -rotate-8 z-10 transition-transform cursor-pointer"
                >
                  <div className="aspect-square rounded-xs overflow-hidden bg-neutral-900 mb-2">
                    <img
                      src="/products/polaroid_prints.jpg"
                      alt="Polaroid family moment"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-script text-center text-sm font-bold text-[#29212A]">
                    Summer Vacay '25 ♥
                  </p>
                </motion.div>

                {/* Layer 2: Main Acrylic Magnet in Center tilted +4 deg */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className="relative w-52 sm:w-60 bg-white p-2.5 rounded-2xl shadow-soft-lg border-2 border-white rotate-4 z-20 cursor-pointer"
                >
                  {/* Acrylic Badge */}
                  <div className="absolute -top-3 -right-3 bg-[#F20D65] text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md z-30">
                    Offer ₹99
                  </div>
                  <div className="aspect-4/5 rounded-xl overflow-hidden relative shadow-inner bg-neutral-900">
                    <img
                      src="/products/acrylic_magnet.jpg"
                      alt="Snap Treasures acrylic magnet"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"></div>
                  </div>
                  <div className="pt-2 text-center">
                    <p className="font-sans font-extrabold text-xs text-[#29212A]">
                      Acrylic Photo Magnet
                    </p>
                    <p className="text-[10px] text-[#C90A50] font-script">
                      Stuck with Style! 🌸
                    </p>
                  </div>
                </motion.div>

                {/* Layer 3: Floating Sticker Accent */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 right-2 sm:right-6 bg-white p-2.5 rounded-2xl shadow-xl border border-[#F0DDE2] z-30 flex items-center gap-2.5"
                >
                  <img
                    src="/brand/logo.jpg"
                    alt="Snap Treasures avatar"
                    className="w-9 h-9 rounded-full object-cover border border-[#F20D65]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#29212A]">100% Custom</p>
                    <p className="text-[10px] text-emerald-600 font-medium">Dispatched Today</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BENEFITS STRIP */}
      <TrustStrip />

      {/* 3. CATEGORY SHORTCUTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold text-[#F20D65] uppercase tracking-wider bg-[#FFF1F4] px-3 py-1 rounded-full">
              Explore By Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#29212A] mt-2">
              Personalized Keepsakes for Everyone
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F20D65] hover:text-[#DB0959] transition-colors"
          >
            <span>View All Categories</span>
            <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold text-[#F20D65] uppercase tracking-wider bg-[#FFF1F4] px-3 py-1 rounded-full">
              Handcrafted With Love
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#29212A] mt-2">
              Featured Gifts & Offers
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F20D65] hover:text-[#DB0959]"
          >
            <span>Browse Full Collection ({PRODUCTS.length})</span>
            <FiArrowRight />
          </Link>
        </div>

        <ProductGrid products={featuredProducts} />
      </section>

      {/* 5. HOW IT WORKS: 4 SIMPLE STEPS */}
      <section className="bg-white border-y border-[#F0DDE2] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-[#F20D65] uppercase tracking-wider bg-[#FFF1F4] px-3 py-1 rounded-full">
              Easy Gifting Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#29212A] mt-2">
              How Snap Treasures Works
            </h2>
            <p className="text-sm text-[#786D73] mt-2">
              Create and receive your personalized gift in four effortless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                icon: <FiUploadCloud className="text-2xl text-[#F20D65]" />,
                title: 'Upload Your Photo',
                desc: 'Select your favorite snapshot from your phone gallery or camera roll.',
              },
              {
                step: '02',
                icon: <FiSliders className="text-2xl text-[#FF8A91]" />,
                title: 'Customize Details',
                desc: 'Add custom dates, names, heartwarming quotes, and pick your frame size.',
              },
              {
                step: '03',
                icon: <FiEye className="text-2xl text-[#C90A50]" />,
                title: 'Instant Live Preview',
                desc: 'See realistic mockups on fridge, desk, or gallery wall before finalizing.',
              },
              {
                step: '04',
                icon: <FiPackage className="text-2xl text-emerald-600" />,
                title: 'Swift Dispatch',
                desc: 'Handcrafted with care, packaged securely, and shipped across India.',
              },
            ].map((st, i) => (
              <div
                key={i}
                className="bg-[#FFF9F4] rounded-3xl p-6 border border-[#F0DDE2] relative hover:shadow-soft transition-all duration-300 group"
              >
                <span className="absolute top-4 right-5 text-2xl font-black text-[#F0DDE2] group-hover:text-[#F20D65]/20 transition-colors font-display">
                  {st.step}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-4 border border-[#F0DDE2]">
                  {st.icon}
                </div>
                <h3 className="font-bold text-base text-[#29212A] mb-1">
                  {st.title}
                </h3>
                <p className="text-xs text-[#786D73] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/personalize/acrylic-photo-magnet"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F20D65] hover:bg-[#DB0959] text-white text-sm font-bold rounded-2xl shadow-soft"
            >
              <span>Try Personalizing Now</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. GIFTS FOR EVERY OCCASION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-[#F20D65] uppercase tracking-wider bg-[#FFF1F4] px-3 py-1 rounded-full">
            Cherished Milestones
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#29212A] mt-2">
            Gifts for Every Occasion
          </h2>
          <p className="text-sm text-[#786D73] mt-2">
            Whether it's a romantic anniversary or a grand corporate offsite, we have you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ, idx) => (
            <Link
              key={idx}
              to={occ.link}
              className="group relative rounded-3xl overflow-hidden border border-[#F0DDE2] bg-white shadow-xs hover:shadow-soft-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#FFF1F4]">
                <img
                  src={occ.image}
                  alt={occ.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#F20D65] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                  {occ.tag}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#29212A] group-hover:text-[#F20D65] transition-colors">
                    {occ.title}
                  </h3>
                  <p className="text-xs text-[#786D73] mt-0.5">
                    {occ.subtitle}
                  </p>
                </div>
                <div className="mt-3 flex items-center text-xs font-bold text-[#F20D65] gap-1">
                  <span>Explore Gifts</span>
                  <FiArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. WHATSAPP CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#25D366]/90 via-[#25D366] to-[#1EBE5D] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold uppercase tracking-wider">
              Fast & Personalized Support
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              Want to Order or Share Photos Directly on WhatsApp?
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">
              Skip forms! Send your photos directly to our verified WhatsApp support ({WHATSAPP_DISPLAY}). We assist with sizing, cropping, and instant invoice previews.
            </p>
          </div>

          <a
            href={WHATSAPP_DIRECT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-[#1EBE5D] hover:bg-[#FFF9F4] font-extrabold rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-3 text-base shrink-0"
          >
            <FaWhatsapp className="text-2xl text-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-[#F20D65] uppercase tracking-wider bg-[#FFF1F4] px-3 py-1 rounded-full">
            Real Customer Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#29212A] mt-2">
            Treasured by Hundreds Across India
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#F0DDE2] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <FiStar key={i} className="fill-amber-400 text-sm" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#29212A] italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F0DDE2]/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#29212A]">
                    {t.name}
                  </h4>
                  <p className="text-[10px] text-[#786D73]">
                    {t.city} • <span className="text-emerald-600 font-medium">{t.date}</span>
                  </p>
                </div>
                <span className="text-[10px] text-[#F20D65] bg-[#FFF1F4] px-2 py-0.5 rounded-full font-medium max-w-28 truncate">
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. INSTAGRAM GALLERY FEED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-extrabold text-[#F20D65] uppercase tracking-wider bg-[#FFF1F4] px-3 py-1 rounded-full">
              Instagram Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#29212A] mt-2">
              Follow Us @snaptreasures
            </h2>
          </div>
          <a
            href="https://instagram.com/snaptreasures"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F20D65] hover:text-[#DB0959]"
          >
            <FaInstagram /> <span>View Instagram Profile</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/snaptreasures"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden aspect-square border border-[#F0DDE2] bg-[#FFF1F4] block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center text-white text-xs">
                <FaInstagram className="text-2xl" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
