import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className="group block relative overflow-hidden rounded-3xl bg-white border border-[#F0DDE2] p-4 sm:p-5 shadow-xs hover:shadow-soft-lg transition-all duration-300"
    >
      <div className="relative aspect-square sm:aspect-4/3 rounded-2xl overflow-hidden bg-[#FFF1F4] mb-4">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        {category.badge && (
          <span className="absolute top-3 left-3 bg-[#F20D65] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            {category.badge}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base text-[#29212A] group-hover:text-[#F20D65] transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-[#786D73] mt-0.5 line-clamp-1">
            {category.description}
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#FFF1F4] group-hover:bg-[#F20D65] group-hover:text-white text-[#F20D65] flex items-center justify-center shrink-0 transition-colors ml-2">
          <FiArrowRight className="text-sm" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
