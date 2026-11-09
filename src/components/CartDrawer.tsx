import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Tag, 
  Check, 
  Truck
} from 'lucide-react';
import { CartItem } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discountAmount = rawSubtotal * (discountPercent / 100);
  const subtotal = rawSubtotal - discountAmount;
  const estimatedTax = subtotal * 0.0825; // standard est
  const finalTotal = subtotal + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'ATELIERPRO') {
      setDiscountPercent(10);
      setPromoMessage('VIP 10% Sovereign discount applied');
    } else if (clean === 'BATCH04') {
      setDiscountPercent(15);
      setPromoMessage('15% Batch 04 reservation discount applied');
    } else {
      setPromoMessage('Invalid invitation or voucher code');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E2E8F0] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#101828]" />
              <h3 className="font-display font-bold text-lg text-[#0F172A]">
                Studio Hardware Bag
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E2E8F0] text-[#475569]">
                {items.reduce((acc, item) => acc + item.quantity, 0)} units
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#F1F5F9] text-[#94A3B8] flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="font-display font-bold text-base text-[#0F172A] mb-1">
                  Your Studio Bag is Empty
                </h4>
                <p className="text-xs text-[#64748B] max-w-xs mx-auto mb-6">
                  Explore our flagship catalog of computational workstations, studio monitors, and precision milled hardware.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg bg-[#101828] text-white text-xs font-semibold hover:bg-[#1E293B] transition-colors shadow-xs"
                >
                  Explore Showroom Catalog
                </button>
              </div>
            ) : (
              <>
                {/* Free Armor Case Promotion Notice */}
                <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200/80 flex items-center gap-2.5 text-xs text-amber-900">
                  <Sparkles className="w-4 h-4 text-[#F97316] shrink-0" />
                  <span>
                    <strong>Complimentary:</strong> Pelican™ CNC Inset transport case included with order.
                  </span>
                </div>

                {/* Items List */}
                <div className="divide-y divide-[#E2E8F0]">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="py-4 flex gap-3 first:pt-0">
                      
                      {/* Thumbnail */}
                      <div className="w-20 h-20 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] p-1.5 shrink-0 flex items-center justify-center">
                        <img
                          src={item.selectedColorway.image || item.product.heroImage}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-display font-semibold text-xs text-[#0F172A] line-clamp-1">
                            {item.product.name}
                          </h5>
                          <button
                            onClick={() => onRemoveItem(item.cartItemId)}
                            className="text-[#94A3B8] hover:text-rose-600 transition-colors p-0.5"
                            title="Remove unit"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Selected Finish */}
                        <div className="text-[11px] text-[#64748B] flex items-center gap-1.5 mt-0.5">
                          <span 
                            className="w-2.5 h-2.5 rounded-full inline-block border border-slate-300"
                            style={{ backgroundColor: item.selectedColorway.hex }}
                          />
                          <span>{item.selectedColorway.name}</span>
                        </div>

                        {/* Selected Hardware Options Summary */}
                        {Object.entries(item.selectedOptions).length > 0 && (
                          <div className="text-[10px] text-[#475569] bg-[#F8FAFC] rounded px-1.5 py-0.5 mt-1 line-clamp-1">
                            {Object.values(item.selectedOptions).join(' · ')}
                          </div>
                        )}

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between mt-auto pt-2">
                          <div className="flex items-center border border-[#E2E8F0] rounded bg-white">
                            <button
                              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                              className="w-6 h-6 text-xs text-[#475569] hover:bg-[#F1F5F9] flex items-center justify-center font-bold"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-[#0F172A]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                              className="w-6 h-6 text-xs text-[#475569] hover:bg-[#F1F5F9] flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                          </div>

                          <div className="font-display font-bold text-sm text-[#0F172A]">
                            {formatPrice(item.unitPrice * item.quantity, currency)}
                          </div>
                        </div>

                      </div>

                    </div>
                  ))}
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#94A3B8]" />
                      <input
                        type="text"
                        placeholder="Voucher code (try ATELIERPRO)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full h-9 pl-8 pr-3 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 h-9 bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] text-xs font-semibold text-[#0F172A] rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <div className={`text-[11px] mt-1.5 flex items-center gap-1 ${
                      discountPercent > 0 ? 'text-emerald-600 font-semibold' : 'text-rose-600'
                    }`}>
                      {discountPercent > 0 && <Check className="w-3 h-3" />}
                      {promoMessage}
                    </div>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Footer & Checkout Engine */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E2E8F0] bg-[#F8FAFC] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#64748B]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#0F172A] font-display">
                    {formatPrice(rawSubtotal, currency)}
                  </span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>VIP Privilege ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount, currency)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#2563EB]" />
                    Insured White-Glove Courier
                  </span>
                  <span className="text-emerald-700 font-semibold uppercase text-[10px]">
                    Complimentary
                  </span>
                </div>

                <div className="flex justify-between text-[#64748B]">
                  <span>Estimated Tax (8.25%)</span>
                  <span className="font-semibold text-[#0F172A] font-display">
                    {formatPrice(estimatedTax, currency)}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#E2E8F0] flex justify-between items-baseline">
                  <span className="font-bold text-sm text-[#0F172A]">Total Investment</span>
                  <span className="font-display font-extrabold text-xl text-[#0F172A]">
                    {formatPrice(finalTotal, currency)}
                  </span>
                </div>
              </div>

              {/* Conversion Action Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full h-12 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Proceed to Sovereign Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#94A3B8] pt-1">
                <ShieldCheck className="w-3 h-3 text-[#2563EB]" />
                <span>Encrypted 256-Bit Financial Transmission · Bank Wire & Card</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
