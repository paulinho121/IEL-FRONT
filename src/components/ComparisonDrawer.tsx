import React, { useState } from 'react';
import { X, Layers, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface ComparisonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onRemoveProduct,
  onClearAll,
  onSelectProduct,
}) => {
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  if (!isOpen) return null;

  // Collect all unique spec labels across compared products
  const allSpecLabels = Array.from(
    new Set(
      products.flatMap((p) => p.specs.map((s) => s.label))
    )
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-12">
        <div className="w-screen max-w-5xl bg-white border-l border-[#E2E8F0] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#2563EB]" />
              <h3 className="font-display font-bold text-lg text-[#0F172A]">
                Hardware Benchmark Plinth Comparison
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E2E8F0] text-[#475569]">
                {products.length} models
              </span>
            </div>

            <div className="flex items-center gap-3">
              {products.length > 0 && (
                <>
                  <label className="flex items-center gap-2 text-xs font-medium text-[#475569] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={highlightDifferences}
                      onChange={(e) => setHighlightDifferences(e.target.checked)}
                      className="rounded border-[#CBD5E1] text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <span>Highlight Differing Specs</span>
                  </label>

                  <button
                    onClick={onClearAll}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
                  >
                    Clear Comparison
                  </button>
                </>
              )}

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-[#F1F5F9] text-[#94A3B8] flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="font-display font-bold text-base text-[#0F172A] mb-1">
                  No Hardware Selected for Comparison
                </h4>
                <p className="text-xs text-[#64748B] max-w-sm mx-auto mb-6">
                  Select the layers icon on any product card in the catalog to evaluate technical architectures side-by-side.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg bg-[#101828] text-white text-xs font-semibold hover:bg-[#1E293B]"
                >
                  Browse Hardware Catalog
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#E2E8F0]">
                      <th className="p-3 w-48 text-xs font-bold text-[#94A3B8] uppercase tracking-wider bg-white sticky left-0 z-10">
                        Specification Matrix
                      </th>
                      {products.map((p) => (
                        <th key={p.id} className="p-3 min-w-[240px] align-top bg-white">
                          <div className="flex flex-col items-start relative group">
                            <button
                              onClick={() => onRemoveProduct(p.id)}
                              className="absolute top-0 right-0 p-1 text-[#94A3B8] hover:text-rose-600 transition-colors"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="w-full aspect-square max-w-[140px] mx-auto bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-2 mb-2 flex items-center justify-center">
                              <img
                                src={p.heroImage}
                                alt={p.name}
                                className="w-full h-full object-contain"
                              />
                            </div>

                            <span className="text-[10px] font-bold uppercase text-[#94A3B8]">
                              {p.brand}
                            </span>
                            <span className="font-display font-bold text-xs text-[#0F172A] line-clamp-1">
                              {p.name}
                            </span>
                            <span className="font-display font-extrabold text-base text-[#0F172A] mt-1">
                              {formatPrice(p.price, currency)}
                            </span>

                            <button
                              onClick={() => {
                                onClose();
                                onSelectProduct(p);
                              }}
                              className="w-full mt-3 h-8 bg-[#101828] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <span>Configure Spec</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#E2E8F0]">
                    {/* Category Row */}
                    <tr className="bg-[#F8FAFC]">
                      <td className="p-3 text-xs font-bold text-[#475569] sticky left-0 bg-[#F8FAFC]">
                        Category
                      </td>
                      {products.map((p) => (
                        <td key={p.id} className="p-3 text-xs font-medium text-[#0F172A]">
                          {p.category}
                        </td>
                      ))}
                    </tr>

                    {/* Benchmark Row */}
                    <tr className="bg-white">
                      <td className="p-3 text-xs font-bold text-[#475569] sticky left-0 bg-white">
                        Performance Benchmark
                      </td>
                      {products.map((p) => (
                        <td key={p.id} className="p-3 text-xs font-mono font-semibold text-[#2563EB]">
                          {p.benchmark ? `${p.benchmark.metric}: ${p.benchmark.value}` : 'Master Reference Class'}
                        </td>
                      ))}
                    </tr>

                    {/* Dynamic Specs Rows */}
                    {allSpecLabels.map((specLabel, idx) => {
                      const values = products.map(
                        (p) => p.specs.find((s) => s.label === specLabel)?.value || '—'
                      );
                      const isDifferent = new Set(values).size > 1;

                      if (highlightDifferences && !isDifferent) return null;

                      return (
                        <tr
                          key={specLabel}
                          className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'} ${
                            isDifferent && highlightDifferences ? 'bg-amber-50/60' : ''
                          }`}
                        >
                          <td className="p-3 text-xs font-semibold text-[#475569] sticky left-0 bg-inherit">
                            {specLabel}
                          </td>
                          {values.map((val, vIdx) => (
                            <td key={vIdx} className="p-3 text-xs text-[#0F172A] font-medium leading-relaxed">
                              {val}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
