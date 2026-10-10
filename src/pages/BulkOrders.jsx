import React, { useState } from 'react';
import { 
  FiCheckCircle, 
  FiPackage, 
  FiSend, 
  FiBriefcase, 
  FiAward, 
  FiTruck, 
  FiCalendar, 
  FiPhone, 
  FiMail 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { createBulkOrderWhatsAppUrl, WHATSAPP_DISPLAY, WHATSAPP_DIRECT_LINK } from '../utils/whatsapp';

export const BulkOrders = () => {
  const [formData, setFormData] = useState({
    name: '',
    org: '',
    email: '',
    phone: '',
    eventType: 'Corporate Event',
    category: 'Acrylic Photo Magnets',
    quantity: '50-100 pcs',
    deliveryDate: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = 'Please enter a 10-digit mobile number.';
    }
    if (!formData.deliveryDate) {
      newErrors.deliveryDate = 'Please select your target delivery date.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setSubmittedData({ ...formData });

    // Store in demo localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('snaptreasures_bulk_enquiries') || '[]');
      existing.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('snaptreasures_bulk_enquiries', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }
  };

  const directWhatsAppUrl = createBulkOrderWhatsAppUrl({
    name: formData.name || 'Customer',
    org: formData.org || 'Company/Event',
    eventType: formData.eventType,
    category: formData.category,
    quantity: formData.quantity,
  });

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#FFF1F4] to-[#FFF9F4] py-14 sm:py-20 border-b border-[#F0DDE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#F0DDE2] shadow-xs text-xs font-bold text-[#F20D65]">
            <span>✨ Minimum Order Quantity: 50 Pieces</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-[#29212A] tracking-tight">
            Bulk Orders for Every Occasion
          </h1>

          <p className="text-base sm:text-lg text-[#786D73] leading-relaxed">
            Customized photo gifts for corporate milestones, college farewells, weddings, and special events. Volume pricing with bespoke branding.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/918807283652?text=${encodeURIComponent('Hi Snap Treasures! I would like to inquire about Bulk / Corporate Gifting (MOQ 50 pcs).')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-2xl shadow-md transition-transform hover:scale-102 flex items-center gap-2 text-sm"
            >
              <FaWhatsapp className="text-xl" /> Chat for Instant Bulk Quote
            </a>
          </div>
        </div>
      </section>

      {/* 2. FOUR KEY BENEFITS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FiPackage className="text-2xl text-[#F20D65]" />,
              title: 'MOQ from 50 Pieces',
              desc: 'Flexible volumes designed for small celebrations and large enterprises alike.',
            },
            {
              icon: <FiAward className="text-2xl text-[#FF8A91]" />,
              title: 'Custom Brand & QR Logo',
              desc: 'Incorporate your company insignia, employee names, and interactive QR links.',
            },
            {
              icon: <FiBriefcase className="text-2xl text-[#C90A50]" />,
              title: 'Tiered Volume Discounts',
              desc: 'Special bulk rates with GST invoicing and dedicated account manager.',
            },
            {
              icon: <FiTruck className="text-2xl text-emerald-600" />,
              title: 'Express Pan-India Delivery',
              desc: 'Dispatched securely to single or multi-city office hubs with tracking.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-[#F0DDE2] shadow-xs hover:shadow-soft transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FFF1F4] flex items-center justify-center mb-4 border border-[#F0DDE2]/60">
                {item.icon}
              </div>
              <h3 className="font-bold text-base text-[#29212A] mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-[#786D73] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ENQUIRY FORM & SPLIT DETAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#F0DDE2] shadow-xs">
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-display text-[#29212A]">
                Submit Bulk Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-[#786D73] mt-1">
                Fill in your event details below. Our corporate gifting desk will revert within 2 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#FFF9F4] p-8 rounded-2xl border border-emerald-300 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                  <FiCheckCircle />
                </div>
                <h3 className="text-xl font-bold text-[#29212A]">
                  Enquiry Registered Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-[#786D73] max-w-md mx-auto">
                  Thank you, <strong>{submittedData?.name}</strong>. Your request for{' '}
                  <strong>{submittedData?.quantity}</strong> of{' '}
                  <strong>{submittedData?.category}</strong> has been logged locally in our demo system.
                </p>

                <div className="pt-2">
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:bg-[#1EBE5D] transition-colors"
                  >
                    <FaWhatsapp className="text-lg" /> Fast-Track via WhatsApp
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="block mx-auto text-xs text-[#786D73] hover:text-[#F20D65] pt-2"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aditi Rao"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FFF9F4] ${
                        errors.name ? 'border-rose-500' : 'border-[#F0DDE2]'
                      } focus:outline-none focus:border-[#F20D65]`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                      Company / College / Event
                    </label>
                    <input
                      type="text"
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      placeholder="e.g. Infosys / IIT / Wedding"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F0DDE2] text-xs sm:text-sm bg-[#FFF9F4] focus:outline-none focus:border-[#F20D65]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="aditi@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FFF9F4] ${
                        errors.email ? 'border-rose-500' : 'border-[#F0DDE2]'
                      } focus:outline-none focus:border-[#F20D65]`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FFF9F4] ${
                        errors.phone ? 'border-rose-500' : 'border-[#F0DDE2]'
                      } focus:outline-none focus:border-[#F20D65]`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Event Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                      Event Type
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#F0DDE2] text-xs bg-[#FFF9F4] focus:outline-none focus:border-[#F20D65]"
                    >
                      <option>Corporate Event</option>
                      <option>College Fest / Farewell</option>
                      <option>Wedding Return Favors</option>
                      <option>Birthday Return Gifts</option>
                      <option>Festival / Holiday Hamper</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                      Product
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#F0DDE2] text-xs bg-[#FFF9F4] focus:outline-none focus:border-[#F20D65]"
                    >
                      <option>Acrylic Photo Magnets</option>
                      <option>Polaroid Prints (Packs)</option>
                      <option>Wooden Photo Frames</option>
                      <option>Stickers & Brand Seals</option>
                      <option>Curated Memory Hampers</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                      Quantity (MOQ 50)
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#F0DDE2] text-xs bg-[#FFF9F4] focus:outline-none focus:border-[#F20D65]"
                    >
                      <option>50 - 100 pcs</option>
                      <option>100 - 250 pcs</option>
                      <option>250 - 500 pcs</option>
                      <option>500+ pcs</option>
                    </select>
                  </div>
                </div>

                {/* Delivery Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                    Target Delivery Date *
                  </label>
                  <input
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FFF9F4] ${
                      errors.deliveryDate ? 'border-rose-500' : 'border-[#F0DDE2]'
                    } focus:outline-none focus:border-[#F20D65]`}
                  />
                  {errors.deliveryDate && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.deliveryDate}</p>
                  )}
                </div>

                {/* Additional requirements */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                    Additional Requirements / Branding Needs
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Provide details about packaging preferences, custom logos, individual photo sets..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F0DDE2] text-xs sm:text-sm bg-[#FFF9F4] focus:outline-none focus:border-[#F20D65]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#F20D65] hover:bg-[#DB0959] text-white font-bold rounded-2xl shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <FiSend className="text-base" />
                  <span>Submit Bulk Quote Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Visual Tiers & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFF1F4] p-6 rounded-3xl border border-[#F0DDE2] space-y-4">
              <h3 className="font-bold text-base text-[#29212A] font-display">
                Why Companies & Colleges Choose Us
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#786D73]">
                <li className="flex items-start gap-2.5">
                  <FiCheckCircle className="text-[#F20D65] shrink-0 mt-0.5 text-base" />
                  <span><strong>100% Customization:</strong> Each unit can hold a different employee photo or a uniform corporate branding logo.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FiCheckCircle className="text-[#F20D65] shrink-0 mt-0.5 text-base" />
                  <span><strong>Tax Invoicing:</strong> Official GST invoice generated for all enterprise accounts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FiCheckCircle className="text-[#F20D65] shrink-0 mt-0.5 text-base" />
                  <span><strong>Rapid Turnaround:</strong> Bulk batches dispatched within 3 to 5 business days pan-India.</span>
                </li>
              </ul>
            </div>

            {/* Poster reference showcase */}
            <div className="bg-white p-5 rounded-3xl border border-[#F0DDE2] shadow-xs">
              <div className="rounded-2xl overflow-hidden aspect-video bg-[#FFF1F4] mb-3">
                <img
                  src="/brand/posters_collateral.png"
                  alt="Bulk production collateral"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-sm text-[#29212A]">
                MOQ 50 Pieces • Verified Craftsmanship
              </h4>
              <p className="text-xs text-[#786D73] mt-1">
                From acrylic desk badges to event photo tags, we ensure unmatched optical clarity and pristine finish.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BulkOrders;
