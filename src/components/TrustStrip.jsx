import React from 'react';
import { FiCheckCircle, FiShield, FiHeart, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export const TrustStrip = () => {
  const benefits = [
    {
      icon: <FiShield className="text-2xl text-[#F20D65]" />,
      title: 'High Quality Prints & Materials',
      desc: 'Crystal acrylic & archival silk cardstock',
    },
    {
      icon: <FiCheckCircle className="text-2xl text-[#FF8A91]" />,
      title: 'Secure Gift Packaging',
      desc: 'Moisture-proof & bubble-wrapped safety',
    },
    {
      icon: <FaWhatsapp className="text-2xl text-[#25D366]" />,
      title: 'Easy Ordering via WhatsApp',
      desc: 'Chat directly & share your photos with ease',
    },
    {
      icon: <FiHeart className="text-2xl text-[#F20D65]" />,
      title: 'Made with Love in India',
      desc: 'Handcrafted personalized keepsakes',
    },
  ];

  return (
    <section className="py-8 bg-white border-y border-[#F0DDE2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#FFF9F4] transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FFF1F4] flex items-center justify-center shrink-0 shadow-xs border border-[#F0DDE2]/60">
                {b.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#29212A]">{b.title}</h4>
                <p className="text-xs text-[#786D73] mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
