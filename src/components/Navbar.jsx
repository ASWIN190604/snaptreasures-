import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  FiSearch, 
  FiHeart, 
  FiShoppingBag, 
  FiMenu, 
  FiX, 
  FiPhoneCall
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../data/products';
import { formatCurrency } from '../utils/formatCurrency';
import { WHATSAPP_DIRECT_LINK } from '../utils/whatsapp';

export const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Bulk Orders', path: '/bulk-orders', badge: 'MOQ 50' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#F20D65] text-white text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 relative z-50">
        <HiSparkles className="animate-spin text-amber-200" style={{ animationDuration: '4s' }} />
        <span>
          ✨ <strong>Special Launch Offer:</strong> Acrylic Photo Magnets at <strong>₹99</strong> & Polaroid Prints 12 for <strong>₹99</strong>!
        </span>
        <a 
          href={WHATSAPP_DIRECT_LINK} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1 ml-3 underline hover:text-amber-200 transition-colors"
        >
          <FaWhatsapp /> Order on WhatsApp
        </a>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-[#F0DDE2]'
            : 'bg-[#FFF9F4]/90 backdrop-blur-sm py-3.5 border-b border-[#F0DDE2]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo and Wordmark */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/brand/logo.jpg"
                alt="Snap Treasures Logo"
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full object-cover border-2 border-[#F20D65] shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute -bottom-1 -right-1 bg-[#F20D65] text-white text-[9px] p-0.5 rounded-full">
                ♥
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#29212A] group-hover:text-[#F20D65] transition-colors leading-tight flex items-center gap-1 font-display">
                Snap<span className="text-[#F20D65]">Treasures</span>
              </span>
              <span className="text-[11px] font-script text-[#C90A50] tracking-wider -mt-1 font-semibold">
                Treasure Your Memories 🌸
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#F20D65] bg-[#FCE5EC] font-semibold'
                      : 'text-[#29212A] hover:text-[#F20D65] hover:bg-[#FFF1F4]'
                  }`
                }
              >
                {link.name}
                {link.badge && (
                  <span className="text-[10px] bg-[#F20D65] text-white px-1.5 py-0.2 rounded-full font-bold">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search products"
              className="p-2 text-[#29212A] hover:text-[#F20D65] hover:bg-[#FCE5EC] rounded-full transition-colors relative"
            >
              <FiSearch className="text-xl" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/shop?filter=wishlist"
              aria-label="View Wishlist"
              className="p-2 text-[#29212A] hover:text-[#F20D65] hover:bg-[#FCE5EC] rounded-full transition-colors relative"
            >
              <FiHeart className="text-xl" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#F20D65] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              aria-label="Shopping Cart"
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 bg-[#FFF1F4] hover:bg-[#FCE5EC] text-[#29212A] hover:text-[#F20D65] rounded-full transition-colors relative border border-[#F0DDE2]"
            >
              <div className="relative">
                <FiShoppingBag className="text-xl text-[#F20D65]" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-[#F20D65] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-[#29212A]">
                Cart
              </span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-[#29212A] hover:text-[#F20D65] rounded-lg transition-colors ml-1"
            >
              {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Quick Search Dropdown Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-[#F0DDE2] bg-white overflow-hidden shadow-md"
            >
              <div className="max-w-4xl mx-auto px-4 py-4">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <FiSearch className="absolute left-4 text-[#786D73] text-lg" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search magnets, Polaroid prints, frames, stickers, gifts..."
                    autoFocus
                    className="w-full pl-11 pr-24 py-3 bg-[#FFF9F4] border border-[#F0DDE2] rounded-full text-sm text-[#29212A] placeholder-[#786D73] focus:outline-none focus:border-[#F20D65] focus:ring-2 focus:ring-[#FCE5EC]"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 px-4 py-1.5 bg-[#F20D65] text-white text-xs font-semibold rounded-full hover:bg-[#DB0959] transition-colors"
                  >
                    Search
                  </button>
                </form>

                {/* Instant Search Results */}
                {searchResults.length > 0 && (
                  <div className="mt-3 bg-white rounded-2xl border border-[#F0DDE2] p-2 divide-y divide-[#F0DDE2]/50">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-[#FFF1F4] rounded-xl transition-colors"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover border border-[#F0DDE2]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#29212A] truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#786D73]">
                            {item.shortDescription}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-[#F20D65]">
                          {formatCurrency(item.price)}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#F0DDE2] bg-[#FFF9F4] px-4 pt-3 pb-6 space-y-2 shadow-lg"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-[#FCE5EC] text-[#F20D65] font-semibold'
                          : 'text-[#29212A] hover:bg-white'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-xs bg-[#F20D65] text-white px-2 py-0.5 rounded-full font-bold">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>

              <div className="pt-4 border-t border-[#F0DDE2] flex flex-col gap-2">
                <a
                  href={WHATSAPP_DIRECT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-white text-sm font-semibold rounded-xl shadow-sm"
                >
                  <FaWhatsapp className="text-lg" /> Chat on WhatsApp
                </a>
                <div className="flex items-center justify-center gap-4 text-xs text-[#786D73] pt-2">
                  <span>Pan-India Delivery</span>
                  <span>•</span>
                  <span>Custom Handcrafted</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
