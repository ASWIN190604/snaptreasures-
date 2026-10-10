import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

export const QuantitySelector = ({ quantity, onChange, min = 1, max = 99, size = 'md' }) => {
  const isSm = size === 'sm';

  return (
    <div className={`inline-flex items-center border border-[#F0DDE2] bg-white rounded-full ${isSm ? 'p-0.5' : 'p-1'} shadow-xs`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className={`rounded-full flex items-center justify-center text-[#786D73] hover:text-[#F20D65] hover:bg-[#FFF1F4] disabled:opacity-30 disabled:hover:bg-transparent transition-colors ${
          isSm ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'
        }`}
      >
        <FiMinus />
      </button>

      <span className={`font-semibold text-[#29212A] text-center select-none ${isSm ? 'w-6 text-xs' : 'w-9 text-sm'}`}>
        {quantity}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`rounded-full flex items-center justify-center text-[#786D73] hover:text-[#F20D65] hover:bg-[#FFF1F4] disabled:opacity-30 disabled:hover:bg-transparent transition-colors ${
          isSm ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'
        }`}
      >
        <FiPlus />
      </button>
    </div>
  );
};

export default QuantitySelector;
