import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onRemove: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onRemove,
  onSelectProduct,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E2E8F0] shadow-2xl flex flex-col">
          
          <div className="p-5 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#F97316] fill-current" />
              <h3 className="font-display font-bold text-lg text-[#0F172A]">
                Saved Hardware Builds
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E2E8F0] text-[#475569]">
                {products.length} saved
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {products.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#F1F5F9] text-[#94A3B8] flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="font-display font-bold text-base text-[#0F172A] mb-1">
                  No Saved Hardware
                </h4>
                <p className="text-xs text-[#64748B] max-w-xs mx-auto mb-6">
                  Click the heart icon on any product in the showroom to save it to your executive wishlist.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg bg-[#101828] text-white text-xs font-semibold hover:bg-[#1E293B]"
                >
                  Explore Showroom
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#E2E8F0]">
                {products.map((p) => (
                  <div key={p.id} className="py-4 flex gap-3 first:pt-0">
                    <div 
                      onClick={() => {
                        onClose();
                        onSelectProduct(p);
                      }}
                      className="w-20 h-20 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] p-1.5 shrink-0 flex items-center justify-center cursor-pointer hover:border-[#CBD5E1]"
                    >
                      <img src={p.heroImage} alt={p.name} className="w-full h-full object-contain" />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-[#94A3B8]">{p.brand}</span>
                          <h5 
                            onClick={() => {
                              onClose();
                              onSelectProduct(p);
                            }}
                            className="font-display font-semibold text-xs text-[#0F172A] hover:text-[#2563EB] cursor-pointer line-clamp-1"
                          >
                            {p.name}
                          </h5>
                        </div>
                        <button
                          onClick={() => onRemove(p.id)}
                          className="text-[#94A3B8] hover:text-rose-600 transition-colors p-0.5"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="font-display font-bold text-sm text-[#0F172A] mt-1">
                        {formatPrice(p.price, currency)}
                      </div>

                      <div className="flex items-center gap-2 mt-auto pt-2">
                        <button
                          onClick={() => {
                            onMoveToCart(p);
                            onRemove(p.id);
                          }}
                          className="h-8 px-3 rounded-md bg-[#101828] hover:bg-[#1E293B] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>

                        <button
                          onClick={() => {
                            onClose();
                            onSelectProduct(p);
                          }}
                          className="h-8 px-3 rounded-md bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] text-xs font-semibold transition-colors flex items-center gap-1"
                        >
                          <span>Configure</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
