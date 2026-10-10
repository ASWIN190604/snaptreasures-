import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiShoppingBag } from 'react-icons/fi';

export const NotFound = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
      <span className="text-6xl sm:text-8xl font-black font-display text-[#F20D65] block">
        404
      </span>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#29212A] font-display">
        Page Not Found
      </h1>
      <p className="text-sm text-[#786D73] max-w-md mx-auto">
        The memory or page you are looking for doesn't exist or has moved. Explore our personalized gifts instead!
      </p>
      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="px-6 py-3 bg-[#F20D65] hover:bg-[#DB0959] text-white font-bold rounded-2xl shadow-soft text-sm flex items-center gap-2"
        >
          <FiHome /> Back to Home
        </Link>
        <Link
          to="/shop"
          className="px-6 py-3 bg-white hover:bg-[#FFF9F4] text-[#29212A] border border-[#F0DDE2] font-bold rounded-2xl text-sm flex items-center gap-2"
        >
          <FiShoppingBag /> Browse Shop
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
