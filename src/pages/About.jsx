import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiHeart, 
  FiArrowRight, 
  FiCheckCircle, 
  FiPackage, 
  FiTruck, 
  FiSmile, 
  FiCamera 
} from 'react-icons/fi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { WHATSAPP_DIRECT_LINK } from '../utils/whatsapp';

export const About = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. EDITORIAL HERO */}
      <section className="bg-gradient-to-b from-[#FFF1F4] via-[#FFF9F4] to-[#FFF9F4] py-16 sm:py-24 border-b border-[#F0DDE2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F20D65] bg-white px-4 py-1.5 rounded-full border border-[#F0DDE2] shadow-xs inline-block">
            Our Brand Story
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-[#29212A] tracking-tight leading-tight">
            Small Prints, <br />
            <span className="text-[#F20D65] font-script italic font-normal">
              Big Emotions
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#786D73] leading-relaxed max-w-2xl mx-auto">
            At Snap Treasures, we believe life's most precious treasures aren't hidden in gold chests—they are lived in spontaneous laughter, messy road trips, warm hugs, and fleeting smiles.
          </p>
        </div>
      </section>

      {/* 2. THE STORY BEHIND SNAP TREASURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Collage Images on Left */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden shadow-polaroid border border-[#F0DDE2] bg-white p-2">
                <img
                  src="/brand/logo.jpg"
                  alt="Snap Treasures Brand Emblem"
                  className="w-full aspect-square object-cover rounded-2xl"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-polaroid border border-[#F0DDE2] bg-white p-2 mt-8">
                <img
                  src="/brand/posters_collateral.png"
                  alt="Our Photo Magnets"
                  className="w-full aspect-square object-cover object-top rounded-2xl"
                />
              </div>
              <div className="col-span-2 rounded-3xl overflow-hidden shadow-soft border border-[#F0DDE2] bg-white p-2 -mt-4">
                <img
                  src="/brand/packaging_stickers.png"
                  alt="Packaging Seals and Stickers"
                  className="w-full aspect-21/9 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Story Narrative on Right */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block text-xs font-bold text-[#C90A50] uppercase tracking-wider bg-[#FFF1F4] px-3 py-1 rounded-full">
              Made With Love
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#29212A]">
              From Digital Pixels to Tangible Keepsakes
            </h2>

            <p className="text-sm sm:text-base text-[#786D73] leading-relaxed">
              In a world where thousands of photos sit trapped inside phone galleries, unseen and forgotten, Snap Treasures was born out of a desire to bring moments back into our daily spaces.
            </p>

            <p className="text-sm sm:text-base text-[#786D73] leading-relaxed">
              Every morning when you reach for milk in your refrigerator, our acrylic photo magnets catch the sunlight and bring a quiet smile to your face. Every Polaroid print pinned above your work desk serves as a gentle reminder of who and what truly matters.
            </p>

            <div className="p-4 bg-[#FFF1F4] rounded-2xl border border-[#F0DDE2] space-y-2">
              <h4 className="font-bold text-sm text-[#29212A] flex items-center gap-2">
                <FiHeart className="text-[#F20D65] fill-[#F20D65]" /> Our Promise
              </h4>
              <p className="text-xs text-[#786D73] leading-relaxed">
                We handle every photograph with the utmost privacy, color-tune every print individually, and package every order as if it were a gift for our own loved ones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR PILLARS OF CRAFTSMANSHIP */}
      <section className="bg-white border-y border-[#F0DDE2] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#29212A]">
              Why People Treasure Our Work
            </h2>
            <p className="text-sm text-[#786D73] mt-2">
              Careful craftsmanship in every cut, print, and parcel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FiCamera className="text-2xl text-[#F20D65]" />,
                title: 'Photographic HD Clarity',
                desc: 'Vivid color saturation with UV resistance that protects your photos from yellowing or fading over time.',
              },
              {
                icon: <FiPackage className="text-2xl text-[#FF8A91]" />,
                title: 'Gift-Ready Presentation',
                desc: 'Signature "Open Me" seals, bubble wrapping, and candy-sweet presentation ready to gift straight out of the box.',
              },
              {
                icon: <FiTruck className="text-2xl text-[#C90A50]" />,
                title: 'Pan-India Reach',
                desc: 'Reliable express courier distribution across every state and union territory in India.',
              },
              {
                icon: <FaWhatsapp className="text-2xl text-[#25D366]" />,
                title: 'Personalized Support',
                desc: 'Direct human assistance on WhatsApp. Need a custom crop or date format? We assist you one-on-one.',
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="bg-[#FFF9F4] p-6 rounded-3xl border border-[#F0DDE2] hover:shadow-soft transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-4 border border-[#F0DDE2]">
                  {pillar.icon}
                </div>
                <h3 className="font-bold text-base text-[#29212A] mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#786D73] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-[#FFF1F4] via-white to-[#FFF1F4] rounded-3xl p-10 sm:p-14 border border-[#F0DDE2] shadow-soft max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold font-display text-[#29212A]">
            Ready to Treasure Your Favorite Memories?
          </h2>
          <p className="text-sm text-[#786D73] max-w-lg mx-auto">
            Choose a photo from your morning, your trip, or your family album, and let us turn it into a lasting keepsake today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-[#F20D65] hover:bg-[#DB0959] text-white font-bold rounded-2xl shadow-soft transition-all text-sm flex items-center gap-2"
            >
              <span>Explore The Collection</span>
              <FiArrowRight />
            </Link>
            <a
              href={WHATSAPP_DIRECT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white hover:bg-[#FFF9F4] text-[#25D366] border border-[#25D366]/40 font-bold rounded-2xl text-sm flex items-center gap-2"
            >
              <FaWhatsapp className="text-lg" />
              <span>Say Hi on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
