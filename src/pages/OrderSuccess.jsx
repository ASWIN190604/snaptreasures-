import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  FiCheckCircle, 
  FiPackage, 
  FiArrowRight, 
  FiTruck, 
  FiCalendar, 
  FiMapPin, 
  FiInfo 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { formatCurrency } from '../utils/formatCurrency';
import { WHATSAPP_DISPLAY, createWhatsAppUrl } from '../utils/whatsapp';

export const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Fire celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F20D65', '#FF8A91', '#FCE5EC', '#25D366'],
      });
    } catch (e) {
      console.log(e);
    }

    // Retrieve order
    try {
      const orders = JSON.parse(localStorage.getItem('snaptreasures_orders') || '[]');
      const found = orders.find((o) => o.orderId === orderId) || orders[0];
      setOrder(found);
    } catch (e) {
      console.error(e);
    }
  }, [orderId]);

  const whatsappMessage = order
    ? `Hi Snap Treasures! 🌸 I just placed demo order *${order.orderId}* on the website!\n\nName: ${order.customer?.fullName}\nItems: ${order.items?.length || 1}\nTotal: ₹${order.total}\n\nHere are my photos for printing!`
    : `Hi Snap Treasures! I just placed an order on the website.`;

  const whatsappLink = createWhatsAppUrl(whatsappMessage);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      {/* Success Badge & Header */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F0DDE2] shadow-soft text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto text-4xl shadow-xs border border-emerald-100">
          <FiCheckCircle />
        </div>

        <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Demo Order Confirmed
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#29212A]">
          Thank You For Treasuring Memories With Us!
        </h1>

        <p className="text-sm sm:text-base text-[#786D73] max-w-lg mx-auto">
          Your order has been recorded in our demonstration system. We will package your keepsakes with love and care.
        </p>

        {order && (
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFF1F4] rounded-2xl border border-[#F0DDE2] text-sm">
            <span className="text-[#786D73]">Order Reference:</span>
            <span className="font-extrabold text-[#F20D65]">{order.orderId}</span>
          </div>
        )}

        {/* WhatsApp Follow-up CTA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
          >
            <FaWhatsapp className="text-xl" />
            <span>Send Photos / Confirm via WhatsApp</span>
          </a>

          <Link
            to="/shop"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#FFF9F4] hover:bg-white text-[#29212A] border border-[#F0DDE2] font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <span>Continue Shopping</span>
            <FiArrowRight />
          </Link>
        </div>

        {/* Demo Mode Disclaimer */}
        <div className="mt-6 p-3 bg-amber-50 rounded-xl text-xs text-amber-800 flex items-center justify-center gap-2">
          <FiInfo className="shrink-0" />
          <span>Demo Environment: No real charge was made. Data is saved in your local browser session.</span>
        </div>
      </div>

      {/* Order Details Breakdown */}
      {order && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0DDE2] shadow-xs space-y-6">
          <h2 className="text-lg font-bold font-display text-[#29212A] border-b border-[#F0DDE2] pb-3">
            Order Summary Breakdown
          </h2>

          <div className="divide-y divide-[#F0DDE2]">
            {order.items?.map((item, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover border border-[#F0DDE2] shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-[#29212A] truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#786D73]">
                      Size: {item.variant} • Qty: {item.quantity}
                    </p>
                    {item.customization?.text && (
                      <p className="text-[11px] text-[#F20D65] truncate font-medium">
                        Custom Text: "{item.customization.text}"
                      </p>
                    )}
                  </div>
                </div>

                <span className="font-bold text-sm text-[#29212A] shrink-0">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#F0DDE2] flex flex-col sm:flex-row justify-between gap-6 text-xs text-[#786D73]">
            {order.customer && (
              <div className="space-y-1">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#29212A]">
                  Delivery Address:
                </h4>
                <p className="font-semibold text-[#29212A]">{order.customer.fullName}</p>
                <p>{order.customer.address}, {order.customer.city}</p>
                <p>{order.customer.state} - {order.customer.pincode}</p>
                <p>Phone: {order.customer.phone}</p>
              </div>
            )}

            <div className="space-y-2 min-w-48 sm:text-right">
              <div className="flex justify-between sm:justify-end gap-4">
                <span>Subtotal:</span>
                <span className="font-bold text-[#29212A]">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-4">
                <span>Delivery:</span>
                <span className="font-bold text-[#29212A]">{order.deliveryFee === 0 ? 'FREE' : formatCurrency(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-4 text-base font-extrabold text-[#F20D65] pt-1 border-t border-[#F0DDE2]">
                <span>Total:</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;
