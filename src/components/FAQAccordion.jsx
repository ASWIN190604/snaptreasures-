import React, { useState } from 'react';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQAccordion = ({ faqs, defaultOpenId = null }) => {
  const [openId, setOpenId] = useState(defaultOpenId);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-[#F20D65]/40 shadow-soft'
                : 'bg-white/80 border-[#F0DDE2] hover:border-[#F20D65]/20'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(faq.id)}
              className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#29212A] hover:text-[#F20D65] transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <FiHelpCircle className={`text-base shrink-0 ${isOpen ? 'text-[#F20D65]' : 'text-[#786D73]'}`} />
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[#786D73] shrink-0"
              >
                <FiChevronDown className="text-lg" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#786D73] leading-relaxed border-t border-[#F0DDE2]/40 bg-[#FFF9F4]/40">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
