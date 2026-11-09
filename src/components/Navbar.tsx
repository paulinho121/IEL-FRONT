import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Layers, 
  Sparkles, 
  ChevronDown, 
  SlidersHorizontal,
  X
} from 'lucide-react';
import { ProductCategory } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface NavbarProps {
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  currency: Currency;
  onChangeCurrency: (curr: Currency) => void;
  cartCount: number;
  cartSubtotal: number;
  wishlistCount: number;
  compareCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenSearch: () => void;
  onToggleFilters: () => void;
  showFilters: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  currency,
  onChangeCurrency,
  cartCount,
  cartSubtotal,
  wishlistCount,
  compareCount,
  onOpenCart,
  onOpenWishlist,
  onOpenCompare,
  onOpenSearch,
  onToggleFilters,
  showFilters,
}) => {
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  const categories: ProductCategory[] = [
    'All',
    'Workstations',
    'Displays',
    'Precision Input',
    'Audio & Acoustics',
    'Modular Power & Docks',
    'Desk Architecture',
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Specular Top Urgency Ticker */}
      {!announcementDismissed && (
        <div className="bg-[#101828] text-white text-xs px-4 py-2 border-b border-slate-800 flex items-center justify-between transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-1 text-center font-medium">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F97316] text-[10px] font-bold tracking-wider uppercase text-white shadow-xs">
              <Sparkles className="w-3 h-3" />
              BATCH 04 LIVE
            </span>
            <span className="text-slate-200">
              Atelier Neura X1 Workstation is now shipping with complimentary Pelican™ CNC Armor Case.
            </span>
            <span className="hidden md:inline text-slate-400 font-normal">
              Insured white-glove courier included.
            </span>
          </div>
          <button 
            onClick={() => setAnnouncementDismissed(true)} 
            className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Specular Navigation Bar */}
      <div className="bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Brand Mark */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onSelectCategory('All')}
                className="group flex items-center gap-2.5 text-left focus:outline-hidden"
              >
                <div className="w-9 h-9 rounded-lg bg-[#101828] flex items-center justify-center text-white font-bold tracking-tighter shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <div className="w-4 h-4 border-2 border-white rotate-45 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-[#2563EB]" />
                  </div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-lg sm:text-xl text-[#0F172A] tracking-tight leading-none group-hover:text-[#2563EB] transition-colors">
                    ATELIER<span className="text-[#2563EB]">.</span>TECH
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mt-0.5 font-sans">
                    Flagship Showroom
                  </div>
                </div>
              </button>
            </div>

            {/* Desktop Center Category Pills */}
            <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-normal transition-all duration-150 whitespace-nowrap ${
                      isActive
                        ? 'bg-[#101828] text-white shadow-xs'
                        : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons & Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger Button */}
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#475569] bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F1F5F9] transition-all"
                title="Search Hardware Catalog (Cmd+K)"
              >
                <Search className="w-4 h-4 text-[#94A3B8]" />
                <span className="hidden sm:inline font-medium">Search</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-[#E2E8F0] rounded text-[#94A3B8]">
                  ⌘K
                </kbd>
              </button>

              {/* Currency Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-semibold text-[#0F172A] bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
                >
                  <span>{currency}</span>
                  <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
                </button>

                {showCurrencyDropdown && (
                  <div className="absolute right-0 mt-1.5 w-24 bg-white border border-[#E2E8F0] rounded-lg shadow-lg py-1 z-50">
                    {(['USD', 'EUR', 'GBP', 'JPY'] as Currency[]).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          onChangeCurrency(curr);
                          setShowCurrencyDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[#F1F5F9] transition-colors flex items-center justify-between ${
                          currency === curr ? 'text-[#2563EB] font-bold bg-[#F8FAFC]' : 'text-[#0F172A]'
                        }`}
                      >
                        {curr}
                        {currency === curr && <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Compare Trigger */}
              <button
                onClick={onOpenCompare}
                className="relative p-2 rounded-lg text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors"
                title="Hardware Benchmark Comparison"
              >
                <Layers className="w-4 h-4" />
                {compareCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#2563EB] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {compareCount}
                  </span>
                )}
              </button>

              {/* Wishlist Trigger */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2 rounded-lg text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors"
                title="Saved Hardware Configurations"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#F97316] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Filter Toggle Button on Smaller Screens / Catalog */}
              <button
                onClick={onToggleFilters}
                className={`p-2 rounded-lg border transition-colors ${
                  showFilters
                    ? 'bg-[#101828] text-white border-[#101828]'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] border-[#E2E8F0]'
                }`}
                title="Filter Hardware"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#101828] text-white hover:bg-[#1E293B] shadow-xs hover:shadow-md transition-all duration-150"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#F97316] text-white text-[10px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-none">
                  <span className="text-[10px] font-semibold text-slate-300">Bag</span>
                  <span className="text-xs font-bold text-white font-display">
                    {formatPrice(cartSubtotal, currency)}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Category Scrolling Bar for Tablet & Mobile */}
        <div className="xl:hidden border-t border-[#E2E8F0] bg-[#F8FAFC]/95 overflow-x-auto py-2 px-4 flex gap-1.5 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#101828] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#0F172A] bg-white border border-[#E2E8F0]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
