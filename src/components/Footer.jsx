import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiHeart, 
  FiSend, 
  FiCheckCircle, 
  FiShield, 
  FiTruck, 
  FiPackage 
} from 'react-icons/fi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { WHATSAPP_DISPLAY, WHATSAPP_DIRECT_LINK } from '../utils/whatsapp';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-white border-t border-[#F0DDE2] pt-14 pb-8 text-[#29212A] relative overflow-hidden">
      {/* Decorative top wave/tint */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF8A91] via-[#F20D65] to-[#C90A50]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper Trust Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#F0DDE2]/70 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#FFF1F4] flex items-center justify-center text-[#F20D65] shrink-0">
              <FiShield className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#29212A]">Premium Quality</h4>
              <p className="text-xs text-[#786D73]">Crystal clear acrylic & silk prints</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#FFF1F4] flex items-center justify-center text-[#F20D65] shrink-0">
              <FiPackage className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#29212A]">Gift-Ready Packing</h4>
              <p className="text-xs text-[#786D73]">Secure bubble & cute boxes</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#FFF1F4] flex items-center justify-center text-[#F20D65] shrink-0">
              <FiTruck className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#29212A]">Fast Pan-India Delivery</h4>
              <p className="text-xs text-[#786D73]">Same-day dispatch available</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#FFF1F4] flex items-center justify-center text-[#25D366] shrink-0">
              <FaWhatsapp className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#29212A]">WhatsApp Support</h4>
              <p className="text-xs text-[#786D73]">Instant queries & custom help</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/brand/logo.jpg"
                alt="Snap Treasures"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#F20D65]"
              />
              <div>
                <span className="text-xl font-bold font-display text-[#29212A]">
                  Snap<span className="text-[#F20D65]">Treasures</span>
                </span>
                <p className="text-xs text-[#C90A50] font-script font-semibold text-sm">
                  Treasure Your Memories 🌸
                </p>
              </div>
            </div>
            <p className="text-sm text-[#786D73] leading-relaxed max-w-sm">
              We turn your candid moments into durable keepsakes. From glossy acrylic photo magnets to nostalgic Polaroid prints and custom stickers, every piece is made with love.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/snaptreasures"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @snaptreasures"
                className="w-9 h-9 rounded-full bg-[#FFF1F4] hover:bg-[#F20D65] hover:text-white text-[#F20D65] flex items-center justify-center transition-all duration-200"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href={WHATSAPP_DIRECT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-[#FFF1F4] hover:bg-[#25D366] hover:text-white text-[#25D366] flex items-center justify-center transition-all duration-200"
              >
                <FaWhatsapp className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-[#29212A] uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#786D73]">
              <li>
                <Link to="/" className="hover:text-[#F20D65] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#F20D65] transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/personalize/acrylic-photo-magnet" className="hover:text-[#F20D65] transition-colors">
                  Personalize a Gift
                </Link>
              </li>
              <li>
                <Link to="/bulk-orders" className="hover:text-[#F20D65] transition-colors">
                  Bulk & Corporate (MOQ 50)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F20D65] transition-colors">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-[#29212A] uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-[#786D73]">
              <li>
                <Link to="/shop?category=acrylic-magnets" className="hover:text-[#F20D65] transition-colors">
                  Acrylic Photo Magnets
                </Link>
              </li>
              <li>
                <Link to="/shop?category=polaroid-prints" className="hover:text-[#F20D65] transition-colors">
                  Polaroid Prints (12 for ₹99)
                </Link>
              </li>
              <li>
                <Link to="/shop?category=photo-frames" className="hover:text-[#F20D65] transition-colors">
                  Wooden Photo Frames
                </Link>
              </li>
              <li>
                <Link to="/shop?category=stickers" className="hover:text-[#F20D65] transition-colors">
                  Custom Stickers & Seals
                </Link>
              </li>
              <li>
                <Link to="/shop?category=gift-sets" className="hover:text-[#F20D65] transition-colors">
                  Memory Gift Hampers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="text-sm font-bold text-[#29212A] uppercase tracking-wider mb-4">
              Stay in Touch
            </h4>
            <p className="text-xs text-[#786D73] mb-3">
              Get exclusive coupon drops, gift guides & creative photo inspiration.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#FFF9F4] border border-[#F0DDE2] rounded-xl text-xs text-[#29212A] placeholder-[#786D73] focus:outline-none focus:border-[#F20D65]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1.5 px-3 py-1.5 bg-[#F20D65] hover:bg-[#DB0959] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  <FiSend />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 p-2 rounded-lg font-medium">
                  <FiCheckCircle /> Welcome! You're subscribed to sweet memory updates.
                </div>
              )}
            </form>

            <div className="mt-4 pt-3 border-t border-[#F0DDE2]/60 text-xs text-[#786D73] space-y-1.5">
              <div className="flex items-center gap-2">
                <FaWhatsapp className="text-[#25D366] text-sm shrink-0" />
                <a href={WHATSAPP_DIRECT_LINK} className="hover:text-[#F20D65]">
                  {WHATSAPP_DISPLAY}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FaInstagram className="text-[#F20D65] text-sm shrink-0" />
                <a href="https://instagram.com/snaptreasures" className="hover:text-[#F20D65]">
                  @snaptreasures
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-4 border-t border-[#F0DDE2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#786D73] gap-4">
          <p>© 2026 Snap Treasures. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[#29212A]">
            Handcrafted with <FiHeart className="text-[#F20D65] fill-[#F20D65] inline" /> in India
          </p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-[#F20D65]">
              Contact Us
            </Link>
            <span>•</span>
            <Link to="/about" className="hover:text-[#F20D65]">
              Privacy & Quality Pledge
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
