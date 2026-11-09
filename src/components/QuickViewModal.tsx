import React, { useState } from 'react';
import { X, Star, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { Product, Colorway } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface QuickViewModalProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onSelectFullProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product, colorway: Colorway) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  currency,
  onClose,
  onSelectFullProduct,
  onQuickAddToCart,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<Colorway>(
    product.colorways[0] || { id: 'default', name: 'Standard', hex: '#101828', image: product.heroImage }
  );
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onQuickAddToCart(product, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="bg-[#F8FAFC] p-8 flex items-center justify-center relative aspect-square">
            <img
              src={selectedColor.image || product.heroImage}
              alt={product.name}
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>

          {/* Body */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider mb-1">
                {product.brand} · {product.category}
              </div>

              <h3 className="font-display font-extrabold text-xl text-[#0F172A] mb-1">
                {product.name}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-[#475569] mb-3">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="font-bold text-[#0F172A]">{product.rating.toFixed(2)}</span>
                <span className="text-[#94A3B8]">({product.reviewsCount} reviews)</span>
              </div>

              <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 mb-4">
                {product.description}
              </p>

              {/* Colorways */}
              {product.colorways.length > 1 && (
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-[#475569] block mb-1.5">
                    Finish: {selectedColor.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colorways.map((cw) => (
                      <button
                        key={cw.id}
                        onClick={() => setSelectedColor(cw)}
                        className={`w-6 h-6 rounded-full transition-all ${
                          selectedColor.id === cw.id
                            ? 'ring-2 ring-[#101828] ring-offset-2'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: cw.hex }}
                        title={cw.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Specs Pills */}
              <div className="space-y-1 mb-4">
                {product.specs.slice(0, 3).map((s, idx) => (
                  <div key={idx} className="flex justify-between text-[11px] text-[#475569] border-b border-[#F1F5F9] pb-1">
                    <span className="text-[#64748B]">{s.label}:</span>
                    <span className="font-semibold text-[#0F172A]">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Actions */}
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-display font-extrabold text-2xl text-[#0F172A]">
                  {formatPrice(product.price, currency)}
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-[#94A3B8] line-through">
                    {formatPrice(product.oldPrice, currency)}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAdd}
                  className={`h-10 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    added ? 'bg-emerald-600 text-white' : 'bg-[#101828] hover:bg-[#1E293B] text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Quick Add</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onSelectFullProduct(product);
                  }}
                  className="h-10 px-3 rounded-lg text-xs font-semibold bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Full Config</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
