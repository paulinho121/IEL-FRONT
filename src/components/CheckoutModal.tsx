import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  Building2, 
  Sparkles, 
  ArrowRight,
  PackageCheck,
  Download
} from 'lucide-react';
import { CartItem } from '../types';
import { Currency, formatPrice } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [shippingData, setShippingData] = useState({
    firstName: 'Julian',
    lastName: 'Vance',
    email: 'julian@kinetica.studio',
    company: 'Kinetica Post & VFX Studio',
    address: '742 Evergreen Terrace, Suite 400',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
    courierInstructions: 'White-glove reception desk delivery on 4th floor.',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire' | 'invoice'>('card');
  const [orderCertificateId, setOrderCertificateId] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.0825;
  const grandTotal = subtotal + tax;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'shipping') {
      setStep('payment');
    } else if (step === 'payment') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        const randomId = 'ATELIER-' + Math.floor(100000 + Math.random() * 900000);
        setOrderCertificateId(randomId);
        setStep('confirmed');
        onOrderSuccess();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-auto max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
            <h3 className="font-display font-bold text-base sm:text-lg text-[#0F172A]">
              Sovereign Hardware Acquisition
            </h3>
          </div>

          {step !== 'confirmed' && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Multi-Step Indicator */}
        {step !== 'confirmed' && (
          <div className="px-6 py-3 bg-[#F1F5F9]/60 border-b border-[#E2E8F0] flex items-center justify-between text-xs font-semibold">
            <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-[#2563EB]' : 'text-slate-600'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${
                step === 'shipping' ? 'bg-[#2563EB]' : 'bg-emerald-600'
              }`}>
                {step === 'payment' ? '✓' : '1'}
              </span>
              <span>1. White-Glove Destination</span>
            </div>

            <div className="w-12 h-px bg-[#CBD5E1]" />

            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#2563EB]' : 'text-[#94A3B8]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${
                step === 'payment' ? 'bg-[#2563EB]' : 'bg-[#94A3B8]'
              }`}>
                2
              </span>
              <span>2. Verified Settlement</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'shipping' && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                Consignee & Delivery Plinth Information
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#475569] mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={shippingData.firstName}
                    onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                    className="w-full h-11 px-3 text-xs bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-hidden focus:border-[#2563EB] focus:ring-3 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#475569] mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={shippingData.lastName}
                    onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                    className="w-full h-11 px-3 text-xs bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-hidden focus:border-[#2563EB] focus:ring-3 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#475569] mb-1">Corporate or Studio Email</label>
                  <input
                    type="email"
                    required
                    value={shippingData.email}
                    onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                    className="w-full h-11 px-3 text-xs bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-hidden focus:border-[#2563EB] focus:ring-3 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#475569] mb-1">Studio / Entity Name</label>
                  <input
                    type="text"
                    value={shippingData.company}
                    onChange={(e) => setShippingData({ ...shippingData, company: e.target.value })}
                    className="w-full h-11 px-3 text-xs bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-hidden focus:border-[#2563EB] focus:ring-3 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#475569] mb-1">Physical Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingData.address}
                  onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                  className="w-full h-11 px-3 text-xs bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-hidden focus:border-[#2563EB] focus:ring-3 focus:ring-blue-100"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#475569] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                    className="w-full h-11 px-3 text-xs bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-hidden focus:border-[#2563EB] focus:ring-3 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#475569] mb-1">State / Province</label>
                  <input
                    type="text"
                    required
                    value={shippingData.state}
                    onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                    className="w-full h-11 px-3 text-xs bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-hidden focus:border-[#2563EB] focus:ring-3 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#475569] mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={shippingData.postalCode}
                    onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                    className="w-full h-11 px-3 text-xs bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-hidden focus:border-[#2563EB] focus:ring-3 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#475569] mb-1">Courier Handling Directives</label>
                <input
                  type="text"
                  value={shippingData.courierInstructions}
                  onChange={(e) => setShippingData({ ...shippingData, courierInstructions: e.target.value })}
                  className="w-full h-11 px-3 text-xs bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-hidden focus:border-[#2563EB] focus:ring-3 focus:ring-blue-100"
                />
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <div className="text-xs text-[#64748B]">
                  White-glove freight delivery is <strong className="text-emerald-700">Complimentary</strong>
                </div>
                <button
                  type="submit"
                  className="h-11 px-6 bg-[#101828] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-xs transition-colors"
                >
                  <span>Continue to Settlement</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                Select Secure Settlement Method
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#2563EB] bg-blue-50/50 ring-1 ring-[#2563EB]'
                      : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#2563EB] mb-1" />
                  <div className="text-xs font-bold text-[#0F172A]">Credit / Amex</div>
                  <div className="text-[10px] text-[#64748B]">Immediate clearance</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wire')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentMethod === 'wire'
                      ? 'border-[#2563EB] bg-blue-50/50 ring-1 ring-[#2563EB]'
                      : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-[#2563EB] mb-1" />
                  <div className="text-xs font-bold text-[#0F172A]">Fedwire / SWIFT</div>
                  <div className="text-[10px] text-[#64748B]">Tier-1 institutional</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('invoice')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentMethod === 'invoice'
                      ? 'border-[#2563EB] bg-blue-50/50 ring-1 ring-[#2563EB]'
                      : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-[#F97316] mb-1" />
                  <div className="text-xs font-bold text-[#0F172A]">Studio Net 30</div>
                  <div className="text-[10px] text-[#64748B]">Approved entities</div>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-[#475569] mb-1">Card Number</label>
                    <input
                      type="text"
                      defaultValue="•••• •••• •••• 8842"
                      className="w-full h-11 px-3 text-xs font-mono bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#475569] mb-1">Expiration</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full h-11 px-3 text-xs font-mono bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#475569] mb-1">CVC Code</label>
                      <input
                        type="text"
                        defaultValue="•••"
                        className="w-full h-11 px-3 text-xs font-mono bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'wire' && (
                <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-1.5">
                  <div className="font-bold text-[#0F172A]">Atelier Sovereign Treasury Wire Routing:</div>
                  <div className="font-mono text-[11px] text-[#475569]">Bank: J.P. Morgan Chase & Co. Private Bank</div>
                  <div className="font-mono text-[11px] text-[#475569]">Routing (ABA): 021000021</div>
                  <div className="font-mono text-[11px] text-[#475569]">Account: 9028-4410-ATELIER-CORP</div>
                  <div className="text-[10px] text-[#64748B] pt-1">
                    Units are automatically held in climate-controlled staging for 48 hours pending wire reconciliation.
                  </div>
                </div>
              )}

              {/* Summary Table */}
              <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 text-xs">
                <div className="flex justify-between text-[#64748B]">
                  <span>Hardware Subtotal ({items.length} positions)</span>
                  <span className="font-semibold text-[#0F172A]">{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Dedicated Armored Courier</span>
                  <span className="text-emerald-700 font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>State & Federal Tax</span>
                  <span className="font-semibold text-[#0F172A]">{formatPrice(tax, currency)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0F172A] pt-2 border-t border-[#E2E8F0]">
                  <span>Total Due</span>
                  <span className="font-display font-extrabold text-lg">{formatPrice(grandTotal, currency)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs text-[#64748B] hover:text-[#0F172A] font-semibold"
                >
                  ← Back to Destination
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="h-11 px-6 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Allocating Hardware Serial...</span>
                  ) : (
                    <>
                      <span>Authorize Acquisition</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 'confirmed' && (
            <div className="text-center py-6 space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10 stroke-[2]" />
              </div>

              <div>
                <h4 className="font-display font-extrabold text-2xl text-[#0F172A]">
                  Acquisition Confirmed
                </h4>
                <p className="text-xs text-[#475569] max-w-md mx-auto mt-1 leading-relaxed">
                  Your flagship hardware allocation is secured. Our cleanroom technicians are currently conducting final optical calibration and zero-vibration packing.
                </p>
              </div>

              {/* Certificate Card */}
              <div className="max-w-md mx-auto bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-4 text-left shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8]">
                    Certificate of Authenticity
                  </div>
                  <div className="font-mono text-xs font-bold text-[#2563EB]">
                    {orderCertificateId}
                  </div>
                </div>

                <div className="py-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Assigned Consignee:</span>
                    <span className="font-semibold text-[#0F172A]">{shippingData.firstName} {shippingData.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Destination:</span>
                    <span className="font-semibold text-[#0F172A]">{shippingData.city}, {shippingData.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Estimated Arrival:</span>
                    <span className="font-semibold text-emerald-700">Tomorrow by 11:30 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Transport Enclosure:</span>
                    <span className="font-semibold text-[#0F172A]">Pelican™ CNC Hard Shell</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#94A3B8]">
                  <span>Calibration ID: QC-CAL-9941</span>
                  <span className="flex items-center gap-1 text-[#2563EB] font-semibold cursor-pointer">
                    <Download className="w-3.5 h-3.5" />
                    Download PDF Dossier
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-[#101828] text-white text-xs font-semibold hover:bg-[#1E293B] transition-colors"
                >
                  Return to Showroom
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
