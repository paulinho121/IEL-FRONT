import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Eye, Check, Layers } from 'lucide-react';
import { Product, Colorway } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isWishlisted: boolean;
  isCompared: boolean;
  onToggleWishlist: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onQuickAddToCart: (product: Product, colorway: Colorway) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  isCompared,
  onToggleWishlist,
  onToggleCompare,
  onSelectProduct,
  onQuickView,
  onQuickAddToCart,
}) => {
  const [selectedColorway, setSelectedColorway] = useState<Colorway>(
    product.colorways[0] || { id: 'default', name: 'Standard', hex: '#101828', image: product.heroImage }
  );
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAddToCart(product, selectedColorway);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white rounded-lg border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all duration-300 hover:shadow-lg overflow-hidden"
    >
      {/* Top Zone: 1:1 Neutral Container */}
      <div 
        onClick={() => onSelectProduct(product)}
        className="relative aspect-square w-full bg-[#F8FAFC] overflow-hidden cursor-pointer flex items-center justify-center p-6"
      >
        {/* Floating Badge Anchors (Top Left) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          {product.badge && (
            <span 
              className={`text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase font-sans ${
                product.badge.variant === 'radiant' 
                  ? 'bg-[#F97316] text-white shadow-xs' 
                  : product.badge.variant === 'cobalt'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]'
              }`}
            >
              {product.badge.text}
            </span>
          )}

          {product.inStock && product.stockCount <= 10 && (
            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-sm bg-rose-50 text-rose-700 border border-rose-200">
              Only {product.stockCount} left
            </span>
          )}
        </div>

        {/* Action Buttons (Top Right: Wishlist & Compare) */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2 rounded-full backdrop-blur-xs transition-all duration-150 ${
              isWishlisted
                ? 'bg-[#F97316] text-white shadow-md'
                : 'bg-white/90 text-[#475569] hover:text-[#0F172A] hover:bg-white shadow-xs'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(product);
            }}
            className={`p-2 rounded-full backdrop-blur-xs transition-all duration-150 ${
              isCompared
                ? 'bg-[#2563EB] text-white shadow-md'
                : 'bg-white/90 text-[#475569] hover:text-[#0F172A] hover:bg-white shadow-xs'
            }`}
            title={isCompared ? 'Remove from compare' : 'Compare specifications'}
            aria-label="Compare"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>

        {/* Hardware Product Photography with Smooth Scale on Hover */}
        <img
          src={selectedColorway.image || product.heroImage}
          alt={product.name}
          className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Quick View Hover Bar */}
        <div 
          className={`absolute bottom-3 inset-x-3 transition-all duration-200 flex justify-center z-10 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#101828]/90 hover:bg-[#101828] text-white text-xs font-semibold backdrop-blur-xs shadow-md transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick Inspect</span>
          </button>
        </div>
      </div>

      {/* Body Zone */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        
        {/* Colorway Swatches (if more than 1) */}
        {product.colorways.length > 1 && (
          <div className="flex items-center gap-1.5 mb-2.5">
            {product.colorways.map((cw) => {
              const isSelected = selectedColorway.id === cw.id;
              return (
                <button
                  key={cw.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColorway(cw);
                  }}
                  title={cw.name}
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'ring-2 ring-[#101828] ring-offset-1' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: cw.hex }}
                />
              );
            })}
            <span className="text-[10px] text-[#94A3B8] font-medium ml-1">
              {selectedColorway.name}
            </span>
          </div>
        )}

        {/* Brand & Category Label */}
        <div className="flex items-center justify-between text-xs text-[#94A3B8] font-medium mb-1">
          <span>{product.brand}</span>
          <span className="text-[11px] text-[#64748B]">{product.category}</span>
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => onSelectProduct(product)}
          className="font-display font-semibold text-base sm:text-lg text-[#0F172A] group-hover:text-[#2563EB] transition-colors cursor-pointer leading-snug line-clamp-1 mb-2"
        >
          {product.name}
        </h3>

        {/* Technical Spec Pills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.highlights.slice(0, 2).map((hl, idx) => (
            <span
              key={idx}
              className="inline-block bg-[#F1F5F9] text-[#334155] text-[10px] font-bold px-2 py-0.5 rounded-xs tracking-wider uppercase font-sans truncate max-w-full"
            >
              {hl}
            </span>
          ))}
        </div>

        {/* Star Rating & Review Count */}
        <div className="flex items-center gap-1.5 text-xs text-[#475569] mb-4">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-bold text-[#0F172A]">{product.rating.toFixed(2)}</span>
          <span className="text-[#94A3B8]">({product.reviewsCount})</span>
        </div>

        {/* Bottom Zone: Price & Rapid Cart Action */}
        <div className="mt-auto pt-3 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-[#94A3B8] line-through font-medium">
                {formatPrice(product.oldPrice, currency)}
              </span>
            )}
            <span className="font-display font-bold text-lg sm:text-xl text-[#0F172A] tracking-tight leading-tight">
              {formatPrice(product.price, currency)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleQuickAdd}
              className={`h-9 px-3.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 ${
                justAdded 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#101828] hover:bg-[#1E293B] text-white shadow-xs hover:shadow-md'
              }`}
              title="Rapid Add to Cart"
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Add</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
