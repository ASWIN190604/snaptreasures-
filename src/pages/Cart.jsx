import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiShoppingBag, 
  FiArrowRight, 
  FiArrowLeft, 
  FiTruck, 
  FiShield, 
  FiCheckCircle 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { formatCurrency } from '../utils/formatCurrency';
import { WHATSAPP_DIRECT_LINK } from '../utils/whatsapp';

export const Cart = () => {
  const {
    cartItems,
    cartCount,
    subtotal,
    deliveryFee,
    total,
    orderNotes,
    setOrderNotes,
    updateQuantity,
    removeFromCart,
    clearCart,
    freeShippingThreshold,
  } = useCart();

  const navigate = useNavigate();

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#FFF1F4] text-[#F20D65] flex items-center justify-center mx-auto text-3xl shadow-soft">
          <FiShoppingBag />
        </div>
        <h1 className="text-3xl font-extrabold font-display text-[#29212A]">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-sm text-[#786D73] max-w-md mx-auto">
          You haven't added any personalized keepsakes yet. Browse our acrylic magnets, Polaroid sets, or custom frames!
        </p>
        <div className="pt-2">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F20D65] hover:bg-[#DB0959] text-white font-bold rounded-2xl shadow-soft transition-all text-sm"
          >
            <span>Start Exploring Gifts</span>
            <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0DDE2] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#29212A]">
            Your Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-[#786D73] mt-1">
            You have <strong className="text-[#29212A]">{cartCount}</strong> personalized keepsake(s) ready for production.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-[#786D73] hover:text-rose-600 transition-colors self-start sm:self-auto"
        >
          Clear entire cart
        </button>
      </div>

      {/* Free Shipping Meter */}
      <div className="bg-[#FFF1F4] p-4 rounded-2xl border border-[#F0DDE2] space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#29212A]">
          <span className="flex items-center gap-1.5 text-[#F20D65]">
            <FiTruck className="text-sm" />
            {amountNeededForFreeShipping === 0
              ? '🎉 You unlocked Free Pan-India Delivery!'
              : `Add ${formatCurrency(amountNeededForFreeShipping)} more to get FREE Delivery!`}
          </span>
          <span className="text-[#786D73]">Goal: {formatCurrency(freeShippingThreshold)}</span>
        </div>
        <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-[#F0DDE2]">
          <div
            className="h-full bg-gradient-to-r from-[#FF8A91] to-[#F20D65] rounded-full transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Split Layout: Cart Items List on Left, Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Items & Notes */}
        <div className="lg:col-span-8 space-y-4">
          <div className="space-y-3">
            {cartItems.map((item) => (
              <CartItem
                key={item.cartItemId}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          {/* Order Notes / Gift Message Input */}
          <div className="bg-white p-5 rounded-3xl border border-[#F0DDE2] space-y-2 shadow-xs mt-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#29212A]">
              Special Instructions or Gift Note for the Recipient (Optional)
            </label>
            <textarea
              rows={2}
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="e.g. Please add a handwritten card: 'Happy 25th Birthday Rhea! Love, Maya'"
              className="w-full px-3.5 py-2.5 bg-[#FFF9F4] border border-[#F0DDE2] rounded-xl text-xs sm:text-sm text-[#29212A] placeholder-[#786D73] focus:outline-none focus:border-[#F20D65]"
            ></textarea>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#F20D65] hover:underline"
            >
              <FiArrowLeft /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-[#F0DDE2] shadow-soft space-y-5">
            <h3 className="font-bold text-base text-[#29212A] font-display border-b border-[#F0DDE2] pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm text-[#786D73]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#29212A]">{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Pan-India Delivery</span>
                <span className="font-bold">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-xs">
                      FREE
                    </span>
                  ) : (
                    <span className="text-[#29212A]">{formatCurrency(deliveryFee)}</span>
                  )}
                </span>
              </div>

              <div className="border-t border-[#F0DDE2] pt-3 flex justify-between items-baseline text-base font-extrabold text-[#29212A]">
                <span>Total Amount</span>
                <span className="text-2xl text-[#F20D65] font-extrabold">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-[#F20D65] hover:bg-[#DB0959] text-white font-bold rounded-2xl shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>Proceed to Checkout</span>
                <FiArrowRight />
              </button>

              <a
                href={WHATSAPP_DIRECT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366]/10 hover:bg-[#25D366] text-[#1EBE5D] hover:text-white border border-[#25D366]/30 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-xs"
              >
                <FaWhatsapp className="text-base" />
                <span>Quick Checkout on WhatsApp</span>
              </a>
            </div>

            <div className="pt-2 border-t border-[#F0DDE2]/60 text-[11px] text-[#786D73] space-y-1.5">
              <p className="flex items-center gap-1.5">
                <FiCheckCircle className="text-emerald-600 shrink-0" />
                <span>Secure demo order recording</span>
              </p>
              <p className="flex items-center gap-1.5">
                <FiShield className="text-[#F20D65] shrink-0" />
                <span>100% Quality guarantee before dispatch</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
