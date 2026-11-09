import React, { useState, useMemo } from 'react';
import { 
  X, 
  Star, 
  Check, 
  ShieldCheck, 
  Truck, 
  Layers, 
  ShoppingBag, 
  Sparkles, 
  Share2, 
  Heart,
  ChevronRight,
  Package,
  Cpu,
  Info
} from 'lucide-react';
import { Product, Colorway } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  currency: Currency;
  isWishlisted: boolean;
  isCompared: boolean;
  onClose: () => void;
  onToggleWishlist: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onAddToCart: (
    product: Product, 
    colorway: Colorway, 
    selectedOptions: Record<string, string>, 
    quantity: number,
    finalPrice: number
  ) => void;
  onOpenDirectCheckout: (
    product: Product, 
    colorway: Colorway, 
    selectedOptions: Record<string, string>, 
    finalPrice: number
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  isWishlisted,
  isCompared,
  onClose,
  onToggleWishlist,
  onToggleCompare,
  onAddToCart,
  onOpenDirectCheckout,
}) => {
  if (!product) return null;

  // Selected Colorway
  const [selectedColorway, setSelectedColorway] = useState<Colorway>(
    product.colorways[0] || { id: 'default', name: 'Standard', hex: '#101828', image: product.heroImage }
  );

  // Active Gallery Image
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Selected Config Options (group.id -> option.id)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (product.configGroups) {
      product.configGroups.forEach((group) => {
        if (group.options.length > 0) {
          initial[group.id] = group.options[0].id;
        }
      });
    }
    return initial;
  });

  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'manifesto' | 'box' | 'reviews'>('specs');

  // Calculate dynamic configured price
  const finalPrice = useMemo(() => {
    let total = product.price;
    if (product.configGroups) {
      product.configGroups.forEach((group) => {
        const selectedId = selectedOptions[group.id];
        const option = group.options.find((o) => o.id === selectedId);
        if (option) {
          total += option.priceDelta;
        }
      });
    }
    return total;
  }, [product, selectedOptions]);

  const handleOptionChange = (groupId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupId]: optionId,
    }));
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedColorway, selectedOptions, quantity, finalPrice);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const galleryList = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [{ url: product.heroImage, label: 'Front Profile' }];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-6xl bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-2 text-xs text-[#475569]">
            <span className="font-semibold text-[#0F172A]">{product.brand}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span className="text-[#94A3B8]">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span className="font-medium text-[#0F172A] truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
              title="Share configuration"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copiedLink && (
              <span className="text-xs font-semibold text-emerald-600 animate-fade-in">
                Link Copied!
              </span>
            )}

            <button
              onClick={() => onToggleWishlist(product)}
              className={`p-2 rounded-lg transition-colors ${
                isWishlisted
                  ? 'text-[#F97316] bg-amber-50'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => onToggleCompare(product)}
              className={`p-2 rounded-lg transition-colors ${
                isCompared
                  ? 'text-[#2563EB] bg-blue-50'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
              }`}
              title="Compare with another unit"
            >
              <Layers className="w-4 h-4" />
            </button>

            <div className="w-px h-5 bg-[#E2E8F0] mx-1" />

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-5 sm:p-8">
            
            {/* Left Column: Visual Gallery & Interactive Showcase */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              
              {/* Main Feature Image Container */}
              <div className="relative aspect-square w-full rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden flex items-center justify-center p-6 group">
                
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                  {product.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider bg-[#F97316] text-white shadow-xs">
                      {product.badge.text}
                    </span>
                  )}
                  {product.benchmark && (
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-sm bg-slate-900 text-white flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#2563EB]" />
                      {product.benchmark.metric}: {product.benchmark.value}
                    </span>
                  )}
                </div>

                <img
                  src={galleryList[activeImageIndex]?.url || selectedColorway.image || product.heroImage}
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-md transition-all duration-300"
                />

                {/* Image Label Overlay */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-medium text-[#475569] border border-[#E2E8F0]">
                  {galleryList[activeImageIndex]?.label || selectedColorway.name}
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="grid grid-cols-4 gap-2.5">
                {galleryList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square rounded-lg bg-[#F8FAFC] border overflow-hidden p-1 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-xs'
                        : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>

              {/* Hardware Highlights Strip */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                {product.highlights.map((hl, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#334155]"
                  >
                    <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span className="truncate">{hl}</span>
                  </div>
                ))}
              </div>

              {/* Delivery Assurance Callout */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E2E8F0] flex items-start gap-3 mt-1">
                <Truck className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#0F172A] block">
                    White-Glove Insured Courier
                  </span>
                  <span className="text-[#475569] block mt-0.5">
                    Ships in custom reinforced transport armor box. Guaranteed zero-vibration transit.
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Title, Configurator & Purchase Engine */}
            <div className="lg:col-span-6 flex flex-col">
              
              {/* Product Title & Tagline */}
              <div className="mb-4">
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight leading-tight">
                  {product.name}
                </h2>
                <p className="text-sm sm:text-base text-[#475569] font-sans mt-1.5 leading-relaxed">
                  {product.tagline}
                </p>
              </div>

              {/* Rating & Stock Status */}
              <div className="flex flex-wrap items-center gap-3 pb-4 mb-4 border-b border-[#E2E8F0] text-xs">
                <div className="flex items-center gap-1 text-amber-500">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-[#0F172A] ml-1">{product.rating.toFixed(2)}</span>
                  <span className="text-[#94A3B8]">({product.reviewsCount} verified reviews)</span>
                </div>

                <span className="text-[#CBD5E1]">•</span>

                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-emerald-700">In Stock</span>
                  <span className="text-[#94A3B8]">({product.stockCount} units in current batch)</span>
                </div>
              </div>

              {/* Live Configured Price Display */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
                  {formatPrice(finalPrice * quantity, currency)}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-[#94A3B8] line-through font-medium">
                    {formatPrice((product.oldPrice + (finalPrice - product.price)) * quantity, currency)}
                  </span>
                )}
                {quantity > 1 && (
                  <span className="text-xs text-[#64748B] font-medium">
                    ({formatPrice(finalPrice, currency)} each)
                  </span>
                )}
              </div>

              {/* Colorway Swatch Picker (Spec Requirement: Circular 24px swatch with 2px offset white ring) */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-2 font-sans">
                  Select Finish:{' '}
                  <span className="text-[#0F172A] font-semibold normal-case">
                    {selectedColorway.name}
                  </span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colorways.map((cw) => {
                    const isSelected = selectedColorway.id === cw.id;
                    return (
                      <button
                        key={cw.id}
                        onClick={() => setSelectedColorway(cw)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'ring-2 ring-[#101828] ring-offset-2 ring-offset-white scale-110 shadow-xs'
                            : 'hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: cw.hex }}
                        title={cw.name}
                      >
                        {isSelected && cw.hex === '#101828' && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Configurable Hardware Modules (Memory, Storage, Surface, Care) */}
              {product.configGroups && product.configGroups.length > 0 && (
                <div className="space-y-5 mb-6">
                  {product.configGroups.map((group) => {
                    return (
                      <div key={group.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#475569] font-sans">
                            {group.name}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          {group.options.map((option) => {
                            const isChosen = selectedOptions[group.id] === option.id;
                            return (
                              <div
                                key={option.id}
                                onClick={() => handleOptionChange(group.id, option.id)}
                                className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between ${
                                  isChosen
                                    ? 'border-[#2563EB] bg-blue-50/40 ring-1 ring-[#2563EB]'
                                    : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  {/* Custom Checkbox/Radio 18px per spec */}
                                  <div 
                                    className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors ${
                                      isChosen 
                                        ? 'bg-[#2563EB] border-[#2563EB]' 
                                        : 'border-[#CBD5E1] bg-white'
                                    }`}
                                  >
                                    {isChosen && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                  </div>

                                  <div>
                                    <div className="text-xs font-bold text-[#0F172A]">
                                      {option.label}
                                    </div>
                                    {option.description && (
                                      <div className="text-[11px] text-[#64748B] mt-0.5 leading-normal">
                                        {option.description}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="text-xs font-display font-semibold shrink-0 ml-3">
                                  {option.priceDelta === 0 ? (
                                    <span className="text-[#64748B]">Included</span>
                                  ) : (
                                    <span className="text-[#0F172A]">
                                      +{formatPrice(option.priceDelta, currency)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Quantity Selector & Action CTAs */}
              <div className="space-y-3 pt-4 border-t border-[#E2E8F0] mt-auto">
                <div className="flex items-center gap-3">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-[#E2E8F0] rounded-lg bg-white h-12 px-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded text-[#475569] hover:bg-[#F1F5F9] font-bold flex items-center justify-center text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold font-display text-[#0F172A]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded text-[#475569] hover:bg-[#F1F5F9] font-bold flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Add to Cart Button (spec: #101828 height 48px, horizontal padding space-lg, border-radius 8px) */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 h-12 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-150 ${
                      addedAnimation
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#101828] hover:bg-[#1E293B] text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added to Studio Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add Configured Unit to Bag</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Conversion / Promotional Action (spec: Radiant Amber #F97316 for single-click checkouts) */}
                <button
                  onClick={() => onOpenDirectCheckout(product, selectedColorway, selectedOptions, finalPrice * quantity)}
                  className="w-full h-12 px-6 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Instant 1-Click Sovereign Checkout</span>
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-[#94A3B8] pt-1">
                  <span>30-Day Evaluation Period</span>
                  <span>•</span>
                  <span>Carbon-Neutral Packaging</span>
                  <span>•</span>
                  <span>Bespoke Serialized ID</span>
                </div>
              </div>

            </div>

          </div>

          {/* Deep Architectural & Technical Tabs Section */}
          <div className="border-t border-[#E2E8F0] bg-[#F8FAFC]/50 p-5 sm:p-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Tab Navigation */}
              <div className="flex border-b border-[#E2E8F0] gap-6 mb-6 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-3 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'specs'
                      ? 'border-[#2563EB] text-[#0F172A]'
                      : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  Technical Specification Matrix
                </button>
                <button
                  onClick={() => setActiveTab('manifesto')}
                  className={`pb-3 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'manifesto'
                      ? 'border-[#2563EB] text-[#0F172A]'
                      : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  Industrial Engineering Manifesto
                </button>
                <button
                  onClick={() => setActiveTab('box')}
                  className={`pb-3 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'box'
                      ? 'border-[#2563EB] text-[#0F172A]'
                      : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  In The Box Manifest
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-3 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'reviews'
                      ? 'border-[#2563EB] text-[#0F172A]'
                      : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  Field Reports ({product.reviews.length})
                </button>
              </div>

              {/* Tab 1: Technical Specification Matrix (Alternating row fills & clean #E2E8F0 divider lines per spec) */}
              {activeTab === 'specs' && (
                <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
                  <div className="divide-y divide-[#E2E8F0]">
                    {product.specs.map((item, idx) => (
                      <div 
                        key={idx}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:px-5 text-xs ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
                        }`}
                      >
                        <span className="font-medium text-[#475569] sm:w-1/3 mb-1 sm:mb-0">
                          {item.label}
                        </span>
                        <span className="font-bold text-[#0F172A] sm:w-2/3 sm:text-right font-sans">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Industrial Engineering Manifesto */}
              {activeTab === 'manifesto' && (
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-4">
                  <h4 className="font-display font-bold text-lg text-[#0F172A]">
                    Philosophy of Mechanical & Thermal Restraint
                  </h4>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {product.engineeringManifesto}
                  </p>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E2E8F0]">
                    <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                      <span className="text-xs font-bold text-[#0F172A] block mb-1">
                        Precision Tolerance
                      </span>
                      <span className="text-xs text-[#64748B]">
                        Machined within ±0.012mm tolerances on 5-axis German CNC milling plinths.
                      </span>
                    </div>

                    <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                      <span className="text-xs font-bold text-[#0F172A] block mb-1">
                        Thermal Dissipation
                      </span>
                      <span className="text-xs text-[#64748B]">
                        Computational fluid dynamics modeled to sustain maximum burst cycles silently.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: In The Box Manifest */}
              {activeTab === 'box' && (
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
                  <h4 className="font-display font-bold text-base text-[#0F172A] mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#2563EB]" />
                    Complete Physical Unboxing Contents
                  </h4>
                  <ul className="space-y-3">
                    {product.inTheBox.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs text-[#334155]">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab 4: Verified Field Reports */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="bg-white rounded-xl border border-[#E2E8F0] p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#101828] text-white flex items-center justify-center text-xs font-bold">
                            {rev.author[0]}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                              {rev.author}
                              {rev.verifiedStudio && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-xs bg-blue-50 text-[#2563EB] text-[9px] font-bold">
                                  <ShieldCheck className="w-2.5 h-2.5" />
                                  Verified Studio
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-[#94A3B8]">{rev.role}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      <h5 className="font-semibold text-xs text-[#0F172A] mb-1">
                        "{rev.title}"
                      </h5>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        {rev.comment}
                      </p>
                      <div className="text-[10px] text-[#94A3B8] mt-2">{rev.date}</div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
