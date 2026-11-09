import React, { useState, useEffect, useMemo } from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  Sparkles, 
  Check, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Flame, 
  Package, 
  ChevronRight,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from './data/products';
import { Product, ProductCategory, Colorway, CartItem } from './types';
import { Currency, formatPrice } from './utils/formatters';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { BenchmarkPlinth } from './components/BenchmarkPlinth';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Category Filtering
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyDrops, setOnlyDrops] = useState(false);
  const [priceMax, setPriceMax] = useState<number>(4000);
  const [showFilters, setShowFilters] = useState(false);

  // Cart State (Persisted in localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Persisted)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_wishlist');
      return saved ? JSON.parse(saved) : ['prod-neura-x1', 'prod-horizon-32'];
    } catch {
      return ['prod-neura-x1', 'prod-horizon-32'];
    }
  });

  // Comparison State
  const [compareIds, setCompareIds] = useState<string[]>(['prod-neura-x1', 'prod-horizon-32']);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_wishlist', JSON.stringify(wishlistIds));
    } catch {}
  }, [wishlistIds]);

  // Derived lists
  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const comparedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => compareIds.includes(p.id));
  }, [compareIds]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (activeCategory !== 'All' && p.category !== activeCategory) return false;
      if (onlyInStock && (!p.inStock || p.stockCount <= 0)) return false;
      if (onlyDrops && !p.isDrop) return false;
      if (p.price > priceMax) return false;
      if (searchQuery.trim()) {
        const text = `${p.name} ${p.brand} ${p.category} ${p.tagline} ${p.highlights.join(' ')}`.toLowerCase();
        if (!text.includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [activeCategory, onlyInStock, onlyDrops, priceMax, searchQuery, sortBy]);

  // Toggle Wishlist
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => 
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  // Toggle Compare
  const handleToggleCompare = (product: Product) => {
    setCompareIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      } else {
        if (prev.length >= 4) {
          alert('Maximum 4 hardware models can be compared on the plinth simultaneously.');
          return prev;
        }
        return [...prev, product.id];
      }
    });
  };

  // Cart Operations
  const handleAddToCart = (
    product: Product,
    colorway: Colorway,
    selectedOptions: Record<string, string>,
    quantity: number,
    finalPrice: number
  ) => {
    const cartItemId = `${product.id}-${colorway.id}-${JSON.stringify(selectedOptions)}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((i) => 
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          selectedColorway: colorway,
          selectedOptions,
          quantity,
          unitPrice: finalPrice,
        },
      ];
    });
  };

  const handleQuickAddToCart = (product: Product, colorway: Colorway) => {
    const defaultOptions: Record<string, string> = {};
    if (product.configGroups) {
      product.configGroups.forEach((g) => {
        if (g.options.length > 0) defaultOptions[g.id] = g.options[0].id;
      });
    }
    handleAddToCart(product, colorway, defaultOptions, 1, product.price);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
    } else {
      setCart((prev) => prev.map((i) => i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i));
    }
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const handleOpenDirectCheckout = (
    product: Product,
    colorway: Colorway,
    selectedOptions: Record<string, string>,
    finalPrice: number
  ) => {
    handleAddToCart(product, colorway, selectedOptions, 1, finalPrice);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const flagshipProduct = PRODUCTS.find((p) => p.slug === 'atelier-neura-x1') || PRODUCTS[0];

  return (
    <div className="min-h-screen bg-[#F7F9FB] text-[#0F172A] flex flex-col font-sans selection:bg-[#2563EB] selection:text-white">
      
      {/* Frosted Specular Header */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        currency={currency}
        onChangeCurrency={setCurrency}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        wishlistCount={wishlistIds.length}
        compareCount={compareIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleFilters={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
      />

      {/* Flagship Hero Exhibition Plinth (Only on 'All' or when no specific search filter) */}
      {activeCategory === 'All' && !searchQuery && (
        <HeroBanner
          flagship={flagshipProduct}
          currency={currency}
          onExplore={(p) => setSelectedProduct(p)}
          onQuickConfigure={(p) => setSelectedProduct(p)}
        />
      )}

      {/* Main Catalog View */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        
        {/* Section Header & View Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#94A3B8] font-sans mb-1">
              <span>Executive Showroom</span>
              <span>•</span>
              <span className="text-[#2563EB] font-bold">{activeCategory}</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F172A] tracking-tight">
              {activeCategory === 'All' ? 'Current Hardware Allocations' : `${activeCategory} Collection`}
            </h2>
          </div>

          {/* Quick Filter & Sorting Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Stock Toggle */}
            <button
              onClick={() => setOnlyInStock(!onlyInStock)}
              className={`h-9 px-3 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                onlyInStock 
                  ? 'bg-[#101828] text-white border-[#101828] shadow-xs' 
                  : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${onlyInStock ? 'bg-emerald-400' : 'bg-slate-400'}`} />
              <span>In Stock Only</span>
            </button>

            {/* Drops Only Toggle */}
            <button
              onClick={() => setOnlyDrops(!onlyDrops)}
              className={`h-9 px-3 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                onlyDrops 
                  ? 'bg-[#F97316] text-white border-[#F97316] shadow-xs' 
                  : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Limited Drops</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-9 pl-3 pr-8 text-xs font-semibold bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] appearance-none focus:outline-hidden focus:border-[#2563EB] cursor-pointer"
              >
                <option value="featured">Sort: Featured Allocations</option>
                <option value="rating">Sort: Studio Rating</option>
                <option value="price-asc">Sort: Investment (Low → High)</option>
                <option value="price-desc">Sort: Investment (High → Low)</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-[#94A3B8] absolute right-2.5 pointer-events-none" />
            </div>

            {/* Filter Drawer Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`h-9 px-3 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                showFilters
                  ? 'bg-blue-50 text-[#2563EB] border-[#2563EB]'
                  : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Collapsible Refined Filters Bar */}
        {showFilters && (
          <div className="mt-4 p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4 animate-fade-in">
            <div className="flex flex-wrap items-center gap-6">
              
              {/* Price Max Range Slider */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Max Price:
                </span>
                <input
                  type="range"
                  min="150"
                  max="4000"
                  step="50"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-36 accent-[#2563EB] cursor-pointer"
                />
                <span className="font-display font-bold text-xs text-[#0F172A] w-16">
                  {formatPrice(priceMax, currency)}
                </span>
              </div>

              {/* Active Results Count */}
              <div className="text-xs text-[#64748B]">
                Showing <strong className="text-[#0F172A]">{filteredProducts.length}</strong> verified hardware items
              </div>

            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setOnlyInStock(false);
                setOnlyDrops(false);
                setPriceMax(4000);
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}

        {/* Product Cards Grid: 12-column layout (Desktop 3-4 cols, tablet 2 cols, mobile 1 col) */}
        <div className="mt-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E8F0] p-8">
              <div className="w-16 h-16 rounded-full bg-[#F1F5F9] text-[#94A3B8] flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#0F172A] mb-1">
                No Matching Hardware Configurations
              </h3>
              <p className="text-xs text-[#64748B] max-w-sm mx-auto mb-6">
                Adjust your price sliders, drop toggles, or category filters to explore available hardware allocations.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setOnlyInStock(false);
                  setOnlyDrops(false);
                  setPriceMax(4000);
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-lg bg-[#101828] text-white text-xs font-semibold hover:bg-[#1E293B]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  isWishlisted={wishlistIds.includes(product.id)}
                  isCompared={compareIds.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onToggleCompare={handleToggleCompare}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onQuickAddToCart={handleQuickAddToCart}
                />
              ))}
            </div>
          )}
        </div>

      </main>

      {/* Executive Benchmark & Verification Plinth */}
      <BenchmarkPlinth
        onSelectProduct={(p) => setSelectedProduct(p)}
        products={PRODUCTS}
      />

      {/* Industrial Design Manifesto & Engineering Philosophy */}
      <section className="bg-[#F8FAFC] border-b border-[#E2E8F0] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101828] text-white text-[11px] font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-[#2563EB]" />
                Engineering Constitution
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#0F172A] tracking-tight leading-tight">
                Sculpted from Solid 7075-T6 Aerospace Billet.
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                Most consumer technology compromises with sheet-metal stampings and injection-molded plastics that creak under torsional stress. At Atelier, every structural chassis is machined from a solid ingot of cold-rolled aerospace aluminum.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A]">Zero Structural Flex</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Sub-millimeter internal stiffening ribs eliminate chassis twisting during intense keyboard strokes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A]">Laser-Etched Acoustic Chambers</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Diffusive micro-perforations prevent standing soundwaves from coloring audio monitor feeds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A]">White-Glove Armored Packaging</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Each shipment includes custom Pelican™ injection hard-shell cases with closed-cell CNC foam.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/3 rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-xl p-4 flex items-center justify-center group">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85"
                  alt="Precision CNC Milling Plinth"
                  className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/80 via-transparent to-transparent rounded-xl flex items-end p-6">
                  <div className="text-white">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-300">
                      Cleanroom Machine Plinth 08
                    </span>
                    <h4 className="font-display font-bold text-base text-white">
                      5-Axis German CNC Machining Center
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Toleranced to ±0.012mm across all external mating seams.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Floating Bottom Compare Bar (if 2+ products selected) */}
      {compareIds.length >= 2 && !isCompareOpen && (
        <div className="fixed bottom-6 inset-x-4 max-w-xl mx-auto z-30 animate-fade-in">
          <div className="bg-[#101828] text-white p-3.5 rounded-xl shadow-2xl border border-slate-700 flex items-center justify-between gap-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white">
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">
                  {compareIds.length} Flagship Models Staged
                </span>
                <span className="text-[10px] text-slate-300">
                  Ready for Side-by-Side Spec Matrix
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCompareIds([])}
                className="px-2.5 py-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => setIsCompareOpen(true)}
                className="h-9 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span>Launch Plinth</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* All Drawers & Modals */}
      <ProductDetailModal
        product={selectedProduct}
        currency={currency}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        isCompared={selectedProduct ? compareIds.includes(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onToggleCompare={handleToggleCompare}
        onAddToCart={handleAddToCart}
        onOpenDirectCheckout={handleOpenDirectCheckout}
      />

      <QuickViewModal
        product={quickViewProduct}
        currency={currency}
        onClose={() => setQuickViewProduct(null)}
        onSelectFullProduct={(p) => {
          setQuickViewProduct(null);
          setSelectedProduct(p);
        }}
        onQuickAddToCart={handleQuickAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <ComparisonDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        products={comparedProducts}
        currency={currency}
        onRemoveProduct={(id) => setCompareIds((prev) => prev.filter((pId) => pId !== id))}
        onClearAll={() => setCompareIds([])}
        onSelectProduct={(p) => {
          setIsCompareOpen(false);
          setSelectedProduct(p);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={wishlistProducts}
        currency={currency}
        onRemove={(id) => setWishlistIds((prev) => prev.filter((pId) => pId !== id))}
        onSelectProduct={(p) => {
          setIsWishlistOpen(false);
          setSelectedProduct(p);
        }}
        onMoveToCart={(p) => handleQuickAddToCart(p, p.colorways[0])}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        currency={currency}
        onSelectProduct={(p) => {
          setIsSearchOpen(false);
          setSelectedProduct(p);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currency={currency}
        onOrderSuccess={() => {
          setCart([]);
        }}
      />

    </div>
  );
}
