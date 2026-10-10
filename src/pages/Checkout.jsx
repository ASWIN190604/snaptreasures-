import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FiLock, 
  FiShield, 
  FiCheckCircle, 
  FiArrowLeft, 
  FiCreditCard, 
  FiSmartphone, 
  FiTruck,
  FiAlertCircle 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

export const Checkout = () => {
  const { cartItems, subtotal, deliveryFee, total, orderNotes, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    paymentMethod: 'upi', // 'upi' | 'card' | 'cod'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const indianStates = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Delhi NCR', 'Goa',
    'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-display text-[#29212A]">
          Your Cart is Empty
        </h2>
        <p className="text-sm text-[#786D73]">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#F20D65] text-white rounded-full text-sm font-bold shadow-soft"
        >
          <FiArrowLeft /> Return to Shop
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'Enter a valid 10-digit mobile number.';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email address is required.';
    }
    if (!formData.address.trim()) errs.address = 'Complete street address is required.';
    if (!formData.city.trim()) errs.city = 'City name is required.';
    if (!formData.pincode.trim() || formData.pincode.length < 6) {
      errs.pincode = 'Enter a valid 6-digit postal PIN code.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `ST-${Date.now().toString().slice(-6)}`;
      const newOrder = {
        orderId,
        items: [...cartItems],
        customer: { ...formData },
        subtotal,
        deliveryFee,
        total,
        orderNotes,
        date: new Date().toISOString(),
        status: 'Order Placed (Demo Confirmation)',
      };

      try {
        const stored = JSON.parse(localStorage.getItem('snaptreasures_orders') || '[]');
        stored.unshift(newOrder);
        localStorage.setItem('snaptreasures_orders', JSON.stringify(stored));
      } catch (err) {
        console.error(err);
      }

      clearCart();
      setIsSubmitting(false);
      navigate(`/order-success?orderId=${orderId}`);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#F0DDE2] pb-6">
        <div>
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs text-[#786D73] hover:text-[#F20D65] mb-1"
          >
            <FiArrowLeft /> Back to shopping cart
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#29212A]">
            Secure Checkout
          </h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <FiLock /> <span>256-Bit SSL Demo Mode</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Shipping & Payment Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Contact */}
            <div className="bg-white p-6 rounded-3xl border border-[#F0DDE2] shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#29212A] font-display flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F20D65] text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                Customer Contact Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Aditi Sen"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FFF9F4] ${
                      errors.fullName ? 'border-rose-500' : 'border-[#F0DDE2]'
                    } focus:outline-none focus:border-[#F20D65]`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9876543210"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FFF9F4] ${
                      errors.phone ? 'border-rose-500' : 'border-[#F0DDE2]'
                    } focus:outline-none focus:border-[#F20D65]`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="aditi@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FFF9F4] ${
                      errors.email ? 'border-rose-500' : 'border-[#F0DDE2]'
                    } focus:outline-none focus:border-[#F20D65]`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-3xl border border-[#F0DDE2] shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#29212A] font-display flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F20D65] text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                Pan-India Shipping Address
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                    Flat, House No., Building, Street Name *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="A-402, Sunshine Apartments, MG Road"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FFF9F4] ${
                      errors.address ? 'border-rose-500' : 'border-[#F0DDE2]'
                    } focus:outline-none focus:border-[#F20D65]`}
                  />
                  {errors.address && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Pune"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FFF9F4] ${
                        errors.city ? 'border-rose-500' : 'border-[#F0DDE2]'
                      } focus:outline-none focus:border-[#F20D65]`}
                    />
                    {errors.city && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                      State *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#F0DDE2] text-xs bg-[#FFF9F4] focus:outline-none focus:border-[#F20D65]"
                    >
                      {indianStates.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A] mb-1">
                      PIN Code (6 digits) *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="411001"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FFF9F4] ${
                        errors.pincode ? 'border-rose-500' : 'border-[#F0DDE2]'
                      } focus:outline-none focus:border-[#F20D65]`}
                    />
                    {errors.pincode && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.pincode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-3xl border border-[#F0DDE2] shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#29212A] font-display flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F20D65] text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
                Payment Method (Demo Mode)
              </h2>

              <div className="space-y-3">
                {[
                  {
                    id: 'upi',
                    icon: <FiSmartphone className="text-xl text-[#F20D65]" />,
                    title: 'UPI (GPay / PhonePe / Paytm / QR)',
                    badge: 'Instant & Preferred',
                  },
                  {
                    id: 'card',
                    icon: <FiCreditCard className="text-xl text-[#FF8A91]" />,
                    title: 'Credit / Debit Cards (RuPay, Visa, MC)',
                    badge: 'Gateway Ready',
                  },
                  {
                    id: 'cod',
                    icon: <FiTruck className="text-xl text-emerald-600" />,
                    title: 'Cash on Delivery (Verified on WhatsApp)',
                    badge: 'Pan-India',
                  },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === m.id
                        ? 'bg-[#FFF1F4] border-[#F20D65] ring-1 ring-[#F20D65]'
                        : 'bg-[#FFF9F4]/50 border-[#F0DDE2] hover:bg-[#FFF9F4]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={m.id}
                        checked={formData.paymentMethod === m.id}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="accent-[#F20D65] w-4 h-4"
                      />
                      <span className="shrink-0">{m.icon}</span>
                      <span className="text-xs sm:text-sm font-bold text-[#29212A]">
                        {m.title}
                      </span>
                    </div>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded-full font-bold text-[#786D73] border border-[#F0DDE2]">
                      {m.badge}
                    </span>
                  </label>
                ))}
              </div>

              {/* Demo Mode Notice */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
                <FiAlertCircle className="shrink-0 mt-0.5 text-sm" />
                <span>
                  <strong>Demo Store Mode:</strong> Submitting will record your order locally and generate a demo order reference without charging your card or account.
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#F20D65] hover:bg-[#DB0959] text-white font-bold rounded-2xl shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating Demo Order...</span>
              ) : (
                <span>Confirm & Place Order ({formatCurrency(total)})</span>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary Review */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-[#F0DDE2] shadow-soft space-y-4">
            <h3 className="font-bold text-base text-[#29212A] font-display border-b border-[#F0DDE2] pb-3">
              Order Summary ({cartItems.length} items)
            </h3>

            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover border border-[#F0DDE2] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#29212A] truncate">{item.name}</p>
                    <p className="text-[#786D73]">Qty: {item.quantity} • {item.variant}</p>
                  </div>
                  <span className="font-bold text-[#29212A]">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#F0DDE2] space-y-2 text-xs text-[#786D73]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#29212A]">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Pan-India Delivery</span>
                <span className="font-bold">
                  {deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#F0DDE2] flex justify-between text-base font-extrabold text-[#29212A]">
                <span>Total Payable</span>
                <span className="text-[#F20D65]">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
