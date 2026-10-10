import React, { useState } from 'react';
import { 
  FiMail, 
  FiPhone, 
  FiMessageSquare, 
  FiSend, 
  FiCheckCircle, 
  FiMapPin, 
  FiClock, 
  FiHelpCircle 
} from 'react-icons/fi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import FAQAccordion from '../components/FAQAccordion';
import { FAQS } from '../data/faqs';
import { WHATSAPP_DISPLAY, WHATSAPP_DIRECT_LINK, createWhatsAppUrl } from '../utils/whatsapp';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Enquiry',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email.';
    }
    if (!formData.message.trim()) errs.message = 'Please type your question or message.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const vErrors = validate();
    if (Object.keys(vErrors).length > 0) {
      setErrors(vErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Order Enquiry',
        message: '',
      });
      setSubmitted(false);
    }, 5000);
  };

  const whatsappInquiryUrl = createWhatsAppUrl(
    `Hi Snap Treasures! 🌸 I have a question regarding: ${formData.subject}`
  );

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#FFF1F4] via-[#FFF9F4] to-[#FFF9F4] py-14 sm:py-20 border-b border-[#F0DDE2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F20D65] bg-white px-4 py-1.5 rounded-full border border-[#F0DDE2] shadow-xs inline-block">
            Get In Touch
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-[#29212A] tracking-tight">
            We’re Here to Help!
          </h1>

          <p className="text-base sm:text-lg text-[#786D73] max-w-xl mx-auto">
            Have a question, custom request, or need help with your order? We’d love to hear from you.
          </p>
        </div>
      </section>

      {/* 2. THREE CONTACT TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* WhatsApp Direct */}
          <a
            href={WHATSAPP_DIRECT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-3xl border border-[#F0DDE2] shadow-xs hover:shadow-soft transition-all text-center flex flex-col items-center group"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#25D366] flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
              <FaWhatsapp />
            </div>
            <h3 className="font-bold text-base text-[#29212A] mb-1">
              WhatsApp Support
            </h3>
            <p className="text-xs text-[#786D73] mb-3">
              Instant responses, custom order inquiries, photo uploads.
            </p>
            <span className="text-sm font-extrabold text-[#25D366] mt-auto">
              {WHATSAPP_DISPLAY}
            </span>
          </a>

          {/* Instagram Profile */}
          <a
            href="https://instagram.com/snaptreasures"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-3xl border border-[#F0DDE2] shadow-xs hover:shadow-soft transition-all text-center flex flex-col items-center group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FFF1F4] text-[#F20D65] flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
              <FaInstagram />
            </div>
            <h3 className="font-bold text-base text-[#29212A] mb-1">
              Instagram DM
            </h3>
            <p className="text-xs text-[#786D73] mb-3">
              Explore customer video unboxings, reels, and stories.
            </p>
            <span className="text-sm font-extrabold text-[#F20D65] mt-auto">
              @snaptreasures
            </span>
          </a>

          {/* Pan-India Delivery Hub */}
          <div className="bg-white p-6 rounded-3xl border border-[#F0DDE2] shadow-xs text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF1F4] text-[#FF8A91] flex items-center justify-center text-2xl mb-4">
              <FiClock />
            </div>
            <h3 className="font-bold text-base text-[#29212A] mb-1">
              Working Hours
            </h3>
            <p className="text-xs text-[#786D73] mb-3">
              Monday to Saturday: 10:00 AM – 8:00 PM IST. Same day dispatch for express orders.
            </p>
            <span className="text-xs font-bold text-[#C90A50] mt-auto">
              Pan-India Express Shipping
            </span>
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM & FAQ SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#F0DDE2] shadow-xs space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-display text-[#29212A]">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-[#786D73] mt-1">
                Prefer email? Leave your inquiry and we will get back to you shortly.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                  <FiCheckCircle />
                </div>
                <h4 className="font-bold text-sm text-[#29212A]">
                  Thank you! Message Received
                </h4>
                <p className="text-xs text-[#786D73]">
                  Your message has been received in our demonstration system. For urgent queries, please tap WhatsApp!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Iyer"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FFF9F4] ${
                      errors.name ? 'border-rose-500' : 'border-[#F0DDE2]'
                    } focus:outline-none focus:border-[#F20D65]`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="maya@gmail.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FFF9F4] ${
                        errors.email ? 'border-rose-500' : 'border-[#F0DDE2]'
                      } focus:outline-none focus:border-[#F20D65]`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F0DDE2] text-xs sm:text-sm bg-[#FFF9F4] focus:outline-none focus:border-[#F20D65]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                    Subject / Concern
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#F0DDE2] text-xs bg-[#FFF9F4] focus:outline-none focus:border-[#F20D65]"
                  >
                    <option>Order Enquiry & Photo Upload</option>
                    <option>Delivery Status Tracking</option>
                    <option>Custom Design Assistance</option>
                    <option>Bulk / Corporate Quote</option>
                    <option>Other Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you need help with..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FFF9F4] ${
                      errors.message ? 'border-rose-500' : 'border-[#F0DDE2]'
                    } focus:outline-none focus:border-[#F20D65]`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3.5 bg-[#F20D65] hover:bg-[#DB0959] text-white font-bold rounded-2xl shadow-soft transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <FiSend />
                    <span>Send Message</span>
                  </button>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <FaWhatsapp className="text-base" /> Chat Instead
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-extrabold text-[#F20D65] uppercase tracking-wider bg-[#FFF1F4] px-3 py-1 rounded-full">
                Help & Answers
              </span>
              <h2 className="text-2xl font-bold font-display text-[#29212A] mt-2">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-[#786D73] mt-1">
                Quick answers to the most common queries about prints, delivery, and customization.
              </p>
            </div>

            <FAQAccordion faqs={FAQS} defaultOpenId="faq-1" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
