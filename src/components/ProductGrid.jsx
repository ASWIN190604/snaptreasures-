import React from 'react';
import ProductCard from './ProductCard';
import { FiInbox } from 'react-icons/fi';

export const ProductGrid = ({ products, emptyMessage = 'No products match your criteria.' }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#F0DDE2] my-6">
        <div className="w-16 h-16 rounded-full bg-[#FFF1F4] text-[#F20D65] flex items-center justify-center mx-auto mb-4 text-2xl">
          <FiInbox />
        </div>
        <h3 className="text-lg font-bold text-[#29212A] mb-1">No items found</h3>
        <p className="text-sm text-[#786D73] max-w-md mx-auto">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
