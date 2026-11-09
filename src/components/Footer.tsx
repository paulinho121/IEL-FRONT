import React, { useState } from 'react';
import { ArrowRight, Check, Shield, Award, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#101828] text-white border-t border-slate-800">
      
      {/* VIP Hardware Drop Announcement Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1E293B] border border-slate-700 text-[#F97316] text-[10px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3" />
              Direct Studio Allocation
            </div>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
              Join the Sovereign Hardware Register
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1">
              Receive 24-hour advance access to limited CNC batch runs, titanium colorway releases, and engineering whitepapers.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 max-w-md">
            <input
              type="email"
              required
              placeholder="Enter studio or engineering email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 px-4 text-xs bg-slate-800/90 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 min-w-[260px]"
            />
            <button
              type="submit"
              className="h-11 px-5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shrink-0"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Enrolled</span>
                </>
              ) : (
                <>
                  <span>Request Invitation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links & Certification Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#101828] font-bold">
                <div className="w-3.5 h-3.5 border-2 border-[#101828] rotate-45 flex items-center justify-center">
                  <div className="w-1 h-1 bg-[#2563EB]" />
                </div>
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                ATELIER<span className="text-[#2563EB]">.</span>TECH
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              The flagship showroom for advanced consumer hardware and pro-grade peripherals. Precision architecture engineered without compromises.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
                ISO 9001 Certified Cleanroom
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#F97316]" />
                Red Dot Best of the Best
              </span>
            </div>
          </div>

          {/* Column 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 font-sans">
              Hardware Platforms
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Neura X1 Workstation</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Horizon 32 Studio OLED</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Aether 75 Mechanical</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Apex Zero Magnesium Mouse</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Resonator Planar Headphones</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Quantum Core TB5 Dock</span></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 font-sans">
              Architecture & Labs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Thermal Acoustic Modeling</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">7075 Aerospace Billet Milling</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Tandem OLED Lifespan Whitepaper</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Acoustic IXPE Resonator Analysis</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Bespoke Enterprise Staging</span></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 font-sans">
              Concierge Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">White-Glove Armored Courier</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Sovereign 3-Year Warranty</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Studio Batch Calibration</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Hardware Serial Verification</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Direct Engineer Support: concierge@atelier.tech</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Atelier Tech Inc. All rights reserved. Precision crafted in Switzerland & California.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Charter</span>
            <span className="hover:text-white cursor-pointer">Terms of Sovereign Sale</span>
            <span className="hover:text-white cursor-pointer">Compliance Dossier (CE/FCC/RoHS)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
