import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiSearch, FiX, FiCheck, FiSliders } from 'react-icons/fi';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import ProductGrid from '../components/ProductGrid';
import { useWishlist } from '../context/WishlistContext';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlistIds } = useWishlist();

  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialFilter = searchParams.get('filter') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'rating'
  const [isWishlistOnly, setIsWishlistOnly] = useState(initialFilter === 'wishlist');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('search');
    if (q !== null) setSearchQuery(q);
    const filter = searchParams.get('filter');
    if (filter === 'wishlist') setIsWishlistOnly(true);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Wishlist only filter
      if (isWishlistOnly && !wishlistIds.includes(product.id)) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured' retains catalogue order
    });
  }, [selectedCategory, isWishlistOnly, searchQuery, sortBy, wishlistIds]);

  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
    setIsWishlistOnly(false);
    const newParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', slug);
    }
    newParams.delete('filter');
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setIsWishlistOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'all' || isWishlistOnly || searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header Panel */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold text-[#F20D65] uppercase tracking-wider bg-[#FFF1F4] px-3.5 py-1.5 rounded-full inline-block">
          Handcrafted Gifting Store
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#29212A] tracking-tight">
          Our Collection
        </h1>
        <p className="text-sm sm:text-base text-[#786D73]">
          Personalized gifts to make your memories last forever.
        </p>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#F0DDE2] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#786D73] text-lg" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gifts, magnets, prints..."
            className="w-full pl-11 pr-10 py-2.5 bg-[#FFF9F4] border border-[#F0DDE2] rounded-full text-xs sm:text-sm text-[#29212A] placeholder-[#786D73] focus:outline-none focus:border-[#F20D65] focus:ring-1 focus:ring-[#F20D65]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#786D73] hover:text-[#F20D65]"
            >
              <FiX className="text-sm" />
            </button>
          )}
        </div>

        {/* Sort & Count */}
        <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          <span className="text-xs text-[#786D73] hidden sm:inline">
            Showing <strong className="text-[#29212A]">{filteredProducts.length}</strong> items
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#786D73] whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FFF9F4] border border-[#F0DDE2] text-xs font-semibold text-[#29212A] rounded-full px-3.5 py-2 focus:outline-none focus:border-[#F20D65] cursor-pointer"
            >
              <option value="featured">Featured / Best Value</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.slug && !isWishlistOnly;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border ${
                isSelected
                  ? 'bg-[#F20D65] text-white border-[#F20D65] shadow-xs'
                  : 'bg-white text-[#29212A] border-[#F0DDE2] hover:border-[#F20D65]/50 hover:bg-[#FFF1F4]'
              }`}
            >
              {cat.shortName || cat.name}
            </button>
          );
        })}

        {/* Wishlist quick chip */}
        <button
          onClick={() => {
            setIsWishlistOnly(!isWishlistOnly);
            setSelectedCategory('all');
          }}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border flex items-center gap-1.5 ${
            isWishlistOnly
              ? 'bg-[#F20D65] text-white border-[#F20D65] shadow-xs'
              : 'bg-white text-[#29212A] border-[#F0DDE2] hover:bg-[#FFF1F4]'
          }`}
        >
          <span>♥ Wishlist</span>
          {wishlistIds.length > 0 && (
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isWishlistOnly ? 'bg-white text-[#F20D65]' : 'bg-[#FFF1F4] text-[#F20D65]'}`}>
              {wishlistIds.length}
            </span>
          )}
        </button>
      </div>

      {/* Active Filter Indicators */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between text-xs text-[#786D73] bg-[#FFF1F4] px-4 py-2.5 rounded-2xl border border-[#F0DDE2]">
          <div className="flex items-center gap-2 flex-wrap">
            <span>Filtering by:</span>
            {selectedCategory !== 'all' && (
              <span className="font-bold text-[#F20D65] bg-white px-2 py-0.5 rounded-full border border-[#F0DDE2]">
                Category: {selectedCategory}
              </span>
            )}
            {isWishlistOnly && (
              <span className="font-bold text-[#F20D65] bg-white px-2 py-0.5 rounded-full border border-[#F0DDE2]">
                Wishlist Items Only
              </span>
            )}
            {searchQuery && (
              <span className="font-bold text-[#F20D65] bg-white px-2 py-0.5 rounded-full border border-[#F0DDE2]">
                "{searchQuery}"
              </span>
            )}
          </div>

          <button
            onClick={clearAllFilters}
            className="text-xs font-bold text-[#C90A50] hover:underline shrink-0"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Products Grid */}
      <ProductGrid
        products={filteredProducts}
        emptyMessage={
          isWishlistOnly
            ? "You haven't saved any items to your wishlist yet. Click the heart icon on any product to save it here!"
            : "No gifts match your search and filter criteria. Try searching for 'magnet' or clear your filters."
        }
      />
    </div>
  );
};

export default Shop;
