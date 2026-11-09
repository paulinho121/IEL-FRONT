import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Gauge, Zap } from 'lucide-react';
import { Product } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface HeroBannerProps {
  flagship: Product;
  currency: Currency;
  onExplore: (product: Product) => void;
  onQuickConfigure: (product: Product) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  flagship,
  currency,
  onExplore,
  onQuickConfigure,
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const activeColor = flagship.colorways[selectedColorIdx] || flagship.colorways[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#101828] via-[#0F172A] to-[#141B2C] text-white py-12 sm:py-20 lg:py-24 border-b border-slate-800">
      
      {/* Subtle Background Structural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Atmospheric Specular Radial Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-[#F97316]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Column: Typographic Architecture */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            
            {/* Chromatic Pill: Radiant Urgency */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-slate-700/80 mb-5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#F97316] font-sans">
                FLAGSHIP DROP 04 · LIMITED UNITS
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">|</span>
              <span className="text-slate-300 text-xs hidden sm:inline">
                CNC Billet Titanium & 7075 Aluminum
              </span>
            </div>

            {/* Display Hero Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] tracking-[-0.03em] leading-[1.1] text-white mb-4">
              ATELIER NEURA X1<span className="text-[#2563EB]">.</span>
              <span className="block text-slate-300 font-semibold text-2xl sm:text-4xl mt-1">
                Pure Computational Architecture.
              </span>
            </h1>

            {/* Sub-Headline & Technical Synopsis */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-sans leading-relaxed mb-8">
              Milled from a single monolithic 7075 aerospace billet. Engineered with dual sintered copper vapor chambers, 128GB unified memory, and 120Gbps Thunderbolt 5 interfaces.
            </p>

            {/* Key Technical Matrix Inset */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-xl p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md mb-8">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-[#2563EB]" />
                  Compute
                </span>
                <span className="font-display font-bold text-sm sm:text-base text-white mt-0.5">
                  16-Core M4-Max
                </span>
                <span className="text-[10px] text-slate-400">40-Core GPU Engine</span>
              </div>

              <div className="flex flex-col border-l border-slate-800 pl-3 sm:pl-4">
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1">
                  <Gauge className="w-3 h-3 text-[#F97316]" />
                  Thermal
                </span>
                <span className="font-display font-bold text-sm sm:text-base text-white mt-0.5">
                  Dual Vapor Core
                </span>
                <span className="text-[10px] text-slate-400">95W Sustained &lt; 28dB</span>
              </div>

              <div className="flex flex-col border-l border-slate-800 pl-3 sm:pl-4">
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  Bandwidth
                </span>
                <span className="font-display font-bold text-sm sm:text-base text-white mt-0.5">
                  120 Gbps
                </span>
                <span className="text-[10px] text-slate-400">Thunderbolt 5 × 3</span>
              </div>
            </div>

            {/* Action Buttons & Pricing Anchoring */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {/* Primary Configure Button */}
              <button
                onClick={() => onQuickConfigure(flagship)}
                className="h-12 px-6 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Configure Your Build</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Details Button */}
              <button
                onClick={() => onExplore(flagship)}
                className="h-12 px-6 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-white text-sm font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <span>Full Technical Spec</span>
              </button>

              {/* Price Anchor */}
              <div className="flex flex-col ml-0 sm:ml-2">
                <span className="text-[11px] text-slate-400">Starting from</span>
                <span className="font-display font-extrabold text-2xl text-white tracking-tight">
                  {formatPrice(flagship.price, currency)}
                </span>
              </div>
            </div>

            {/* Trust Markers */}
            <div className="flex items-center gap-4 mt-6 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                2-Year Sovereign Care
              </span>
              <span>•</span>
              <span>Complimentary Pelican™ Armor Case</span>
              <span>•</span>
              <span>Next-Day White Glove</span>
            </div>

          </div>

          {/* Right Hero Column: Hardware Exhibition Plinth */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* Ambient Exhibition Plinth Card */}
            <div className="relative w-full aspect-4/3 sm:aspect-square max-w-md rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/90 border border-slate-700/70 p-6 flex flex-col items-center justify-center shadow-2xl backdrop-blur-xl group">
              
              {/* Floating Status Tag */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 border border-slate-700 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-200">
                  Ready to Dispatch
                </span>
              </div>

              {/* Floating Benchmark Tag */}
              <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 border border-slate-700 backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-[#F97316]" />
                <span className="text-[10px] font-mono text-slate-200">
                  2,890 R24 Multicore
                </span>
              </div>

              {/* Flagship Image with Smooth Rotation/Scale */}
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img
                  src={activeColor.image || flagship.heroImage}
                  alt={flagship.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] transition-all duration-500 transform group-hover:scale-105"
                />
              </div>

              {/* Hardware Colorway Selector Plinth */}
              <div className="absolute -bottom-4 inset-x-6 bg-[#101828]/95 border border-slate-700 rounded-xl px-4 py-2.5 flex items-center justify-between shadow-xl backdrop-blur-md">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Anodized Finish
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {activeColor.name}
                  </span>
                </div>

                {/* Tactile Swatches */}
                <div className="flex items-center gap-2">
                  {flagship.colorways.map((cw, index) => {
                    const isSelected = selectedColorIdx === index;
                    return (
                      <button
                        key={cw.id}
                        onClick={() => setSelectedColorIdx(index)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          isSelected 
                            ? 'ring-2 ring-[#2563EB] ring-offset-2 ring-offset-[#101828] scale-110' 
                            : 'hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: cw.hex }}
                        title={cw.name}
                      />
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
