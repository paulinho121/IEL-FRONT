import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularTags = [
    'Thunderbolt 5',
    'Tandem OLED',
    'Vapor Chamber',
    'Planar Magnetic',
    'Magnesium 39g',
    '8000Hz Polling',
    'American Walnut',
  ];

  const filtered = query.trim()
    ? products.filter((p) => {
        const text = `${p.name} ${p.brand} ${p.category} ${p.tagline} ${p.highlights.join(' ')} ${p.specs.map(s => s.value).join(' ')}`.toLowerCase();
        return text.includes(query.toLowerCase());
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#E2E8F0]">
          <Search className="w-5 h-5 text-[#94A3B8] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search flagship hardware, specifications, silicon..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm font-medium text-[#0F172A] placeholder-[#94A3B8] focus:outline-hidden"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-[#94A3B8] hover:text-[#0F172A]"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="text-[10px] font-mono text-[#94A3B8] px-1.5 py-0.5 rounded border border-[#E2E8F0] bg-[#F8FAFC]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results or Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2 font-sans">
                Popular Architecture Queries
              </div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2 font-sans">
                Featured Flagships
              </div>
              <div className="space-y-2">
                {products.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onSelectProduct(p);
                    }}
                    className="p-2.5 rounded-xl hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#F1F5F9] p-1 flex items-center justify-center shrink-0">
                        <img src={p.heroImage} alt={p.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0F172A] line-clamp-1">{p.name}</div>
                        <div className="text-[10px] text-[#64748B]">{p.tagline}</div>
                      </div>
                    </div>
                    <div className="font-display font-bold text-xs text-[#0F172A]">
                      {formatPrice(p.price, currency)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xs text-[#64748B]">
                No hardware matching "{query}" found in current catalog.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                {filtered.length} Hardware Matches
              </div>
              {filtered.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(p);
                  }}
                  className="p-3 rounded-xl hover:bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg bg-[#F8FAFC] p-1.5 flex items-center justify-center shrink-0">
                      <img src={p.heroImage} alt={p.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                        {p.name}
                      </div>
                      <div className="text-[11px] text-[#64748B] line-clamp-1">{p.tagline}</div>
                      <div className="flex gap-1 mt-1">
                        {p.highlights.slice(0, 2).map((hl, i) => (
                          <span key={i} className="text-[9px] bg-[#F1F5F9] text-[#334155] px-1.5 py-0.2 rounded font-mono">
                            {hl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 ml-3">
                    <div className="font-display font-extrabold text-sm text-[#0F172A]">
                      {formatPrice(p.price, currency)}
                    </div>
                    <div className="text-[10px] text-[#2563EB] font-semibold flex items-center gap-1 justify-end mt-0.5">
                      <span>View</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
