import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import QuantitySelector from './QuantitySelector';
import { formatCurrency } from '../utils/formatCurrency';

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 bg-white rounded-3xl border border-[#F0DDE2] shadow-xs hover:shadow-soft transition-all duration-200">
      {/* Product Image & Details */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#FFF1F4] border border-[#F0DDE2] shrink-0 relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          {item.customization && (
            <span className="absolute bottom-1 right-1 bg-[#F20D65] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
              Custom
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <Link
            to={`/product/${item.id}`}
            className="text-sm sm:text-base font-bold text-[#29212A] hover:text-[#F20D65] transition-colors line-clamp-1"
          >
            {item.name}
          </Link>

          <p className="text-xs text-[#786D73] mt-0.5">
            Size: <span className="font-semibold text-[#29212A]">{item.variant}</span>
          </p>

          {/* Customization Details preview */}
          {item.customization && (
            <div className="mt-1.5 p-1.5 bg-[#FFF9F4] rounded-xl border border-[#F0DDE2]/60 text-[11px] text-[#786D73] space-y-0.5">
              {item.customization.text && (
                <p className="truncate">
                  ✍️ Text: <strong className="text-[#29212A]">"{item.customization.text}"</strong>
                </p>
              )}
              {item.customization.template && (
                <p>
                  🎨 Style: <span className="capitalize">{item.customization.template}</span>
                </p>
              )}
            </div>
          )}

          <div className="sm:hidden mt-2 font-bold text-[#F20D65] text-sm">
            {formatCurrency(item.price)} each
          </div>
        </div>
      </div>

      {/* Quantity & Pricing Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F0DDE2]/50">
        <QuantitySelector
          quantity={item.quantity}
          onChange={(newQty) => onUpdateQuantity(item.cartItemId, newQty)}
          size="sm"
        />

        <div className="text-right min-w-20">
          <p className="text-sm sm:text-base font-extrabold text-[#F20D65]">
            {formatCurrency(itemTotal)}
          </p>
          <p className="text-[10px] text-[#786D73] hidden sm:block">
            {formatCurrency(item.price)} each
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.cartItemId)}
          aria-label="Remove item"
          className="p-2 text-[#786D73] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
        >
          <FiTrash2 className="text-base" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
