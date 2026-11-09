import React, { useState } from 'react';
import { Gauge, Zap, Volume2, Flame, Award, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface BenchmarkPlinthProps {
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

export const BenchmarkPlinth: React.FC<BenchmarkPlinthProps> = ({
  onSelectProduct,
  products,
}) => {
  const [activeMetric, setActiveMetric] = useState<'thermal' | 'acoustic' | 'bandwidth'>('thermal');

  const workstation = products.find((p) => p.slug === 'atelier-neura-x1') || products[0];

  return (
    <section className="bg-white border-y border-[#E2E8F0] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-bold uppercase tracking-wider font-sans mb-3">
            <Gauge className="w-3.5 h-3.5" />
            Verification Laboratory
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#0F172A] tracking-tight">
            The Executive Benchmark Plinth
          </h2>
          <p className="text-sm sm:text-base text-[#475569] font-sans mt-2">
            Rigorous thermal acoustic modeling and uninterrupted multi-hour workloads. Engineered to never throttle under computational demand.
          </p>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto">
          <button
            onClick={() => setActiveMetric('thermal')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeMetric === 'thermal'
                ? 'bg-[#101828] text-white shadow-xs'
                : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Thermal Headroom (95W Load)</span>
          </button>

          <button
            onClick={() => setActiveMetric('acoustic')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeMetric === 'acoustic'
                ? 'bg-[#101828] text-white shadow-xs'
                : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Acoustic Envelope dB(A)</span>
          </button>

          <button
            onClick={() => setActiveMetric('bandwidth')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeMetric === 'bandwidth'
                ? 'bg-[#101828] text-white shadow-xs'
                : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interconnect Bandwidth (GB/s)</span>
          </button>
        </div>

        {/* Dynamic Interactive Plinth Card */}
        <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-6 sm:p-10 shadow-xs">
          {activeMetric === 'thermal' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                  Dual Vapor Chamber Physics
                </span>
                <h3 className="font-display font-bold text-2xl text-[#0F172A]">
                  Sustained 95W at Under 36°C Chassis Touchpoints
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  While ordinary consumer aluminum shells conduct heat directly to the user's palms, the Neura X1 uses an internal graphite insulation barrier that channels 99.2% of thermal exhaust out rear aerofoil vents.
                </p>
                <button
                  onClick={() => onSelectProduct(workstation)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8]"
                >
                  <span>Inspect Neura X1 Thermal Core</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-[#E2E8F0] space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#0F172A] mb-1.5">
                    <span>Atelier Neura X1 (Dual Sintered Vapor Chamber)</span>
                    <span className="text-[#2563EB]">34.8°C (Palmrest Max)</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-3 overflow-hidden">
                    <div className="bg-[#2563EB] h-3 rounded-full w-[35%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#64748B] mb-1.5">
                    <span>Generic Flagship Competitor A (Heatpipe Only)</span>
                    <span>49.2°C (Noticeably Warm)</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-3 overflow-hidden">
                    <div className="bg-[#94A3B8] h-3 rounded-full w-[65%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#64748B] mb-1.5">
                    <span>Generic Flagship Competitor B (Throttling Threshold)</span>
                    <span>54.6°C (Thermal Throttled)</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-3 overflow-hidden">
                    <div className="bg-rose-400 h-3 rounded-full w-[85%]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMetric === 'acoustic' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  Magnetic Levitation Rotor Bearings
                </span>
                <h3 className="font-display font-bold text-2xl text-[#0F172A]">
                  24 dB(A) Studio-Grade Silent Envelope
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Magnetic levitation blades have zero mechanical contact with casing bearings. Under 100% full render loads, the sound floor blends seamlessly below ambient recording studio background levels.
                </p>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Certified for Abbey Road acoustic noise room compliance</span>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-[#E2E8F0] space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#0F172A] mb-1.5">
                    <span>Atelier Neura X1 (Mag-Lev Fans @ Full Load)</span>
                    <span className="text-emerald-700">24.2 dB(A) — Library Whisper</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-3 overflow-hidden">
                    <div className="bg-emerald-600 h-3 rounded-full w-[28%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#64748B] mb-1.5">
                    <span>Standard Pro Workstation (Dual Ball-Bearing)</span>
                    <span>42.8 dB(A) — Audible Turbine</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-3 overflow-hidden">
                    <div className="bg-[#94A3B8] h-3 rounded-full w-[60%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#64748B] mb-1.5">
                    <span>High-Performance Gaming Laptop</span>
                    <span>58.4 dB(A) — Vacuum Whine</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-3 overflow-hidden">
                    <div className="bg-rose-400 h-3 rounded-full w-[90%]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMetric === 'bandwidth' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Next-Gen Bus Architecture
                </span>
                <h3 className="font-display font-bold text-2xl text-[#0F172A]">
                  409 GB/s Unified Memory + 120 Gbps Thunderbolt 5
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Direct DMA zero-copy communication between CPU, Ray-Tracing GPU cores, and Neural Engine. Stream uncompressed 16-bit 8K ProRes RAW video with zero frame drops.
                </p>
                <div className="text-xs text-[#64748B] font-mono">
                  PCIe Gen 5.0 x16 Bus Speed: 128 GB/s bidirectional throughput
                </div>
              </div>

              <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-[#E2E8F0] space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#0F172A] mb-1.5">
                    <span>Atelier LPDDR5X-8533 Unified Bus</span>
                    <span className="text-[#2563EB]">409.6 GB/s</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-3 overflow-hidden">
                    <div className="bg-[#2563EB] h-3 rounded-full w-[95%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#64748B] mb-1.5">
                    <span>Dual-Channel Desktop DDR5 (6400 MT/s)</span>
                    <span>102.4 GB/s</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-3 overflow-hidden">
                    <div className="bg-[#94A3B8] h-3 rounded-full w-[25%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#64748B] mb-1.5">
                    <span>Thunderbolt 5 I/O Bandwidth Boost</span>
                    <span>120 Gbps (15 GB/s External)</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-3 overflow-hidden">
                    <div className="bg-emerald-500 h-3 rounded-full w-[45%]" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
