import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_DIRECT_LINK, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <a
        href={WHATSAPP_DIRECT_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <FaWhatsapp className="text-2xl text-white" />
        <span className="hidden sm:inline font-medium text-sm">
          Chat with Us
        </span>
      </a>
      
      {/* Tooltip hint on hover */}
      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-48 p-2 bg-[#29212A] text-white text-xs rounded-xl shadow-xl text-center">
        Order instantly or send photos on WhatsApp ({WHATSAPP_DISPLAY})
      </div>
    </div>
  );
};

export default WhatsAppButton;
