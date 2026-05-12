import React, { useState, useEffect } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Loader2, ArrowRight, Wallet, Award, Coffee } from 'lucide-react';
import api from '../api/axios';

const PaymentDemo = ({ isOpen, onClose, auction, amount, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setLoading(false);
    }
  }, [isOpen]);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(prev => prev + 1);
    }, 1500);
  };

  // Auto-advance from processing to success
  useEffect(() => {
    if (step === 3) {
      const handlePayment = async () => {
        try {
          // Attempt to update backend, but proceed anyway for demo consistency
          await api.put(`/auctions/${auction._id}/pay`);
          console.log('Payment updated in backend');
          if (onSuccess) onSuccess();
        } catch (error) {
          console.error('Backend payment update failed:', error.response?.data || error.message);
        } finally {
          setTimeout(() => {
            setStep(4);
          }, 3000);
        }
      };
      handlePayment();
    }
  }, [step, auction._id]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1A110B]/60 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-xl bg-white rounded-[48px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500 border border-white/20">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-[#FAF9F6] flex items-center justify-center text-[#1A110B] hover:bg-[#1A110B] hover:text-white transition-all duration-300 z-10"
        >
          <X size={20} />
        </button>

        <div className="p-10 md:p-14">
          
          {/* Progress Bar */}
          <div className="flex gap-2 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${
                  step >= i ? 'bg-[#D87D4A]' : 'bg-[#EAE3DC]'
                }`} 
              />
            ))}
          </div>

          {/* Step 1: Order Summary */}
          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <div>
                <span className="text-[#D87D4A] text-[10px] font-black tracking-[0.4em] uppercase mb-2 block">Step 01</span>
                <h2 className="text-4xl font-medium text-[#1A110B] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Order Summary</h2>
              </div>

              <div className="bg-[#FAF9F6] rounded-[32px] p-8 border border-[#EAE3DC]">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-[#EAE3DC]">
                    <Coffee className="text-[#D87D4A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1A110B]">{auction.title}</h3>
                    <p className="text-[#A89F98] text-xs font-bold tracking-widest uppercase">{auction.origin}</p>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-[#EAE3DC]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A89F98] font-bold uppercase tracking-widest">Winning Bid</span>
                    <span className="text-[#1A110B] font-black">${amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A89F98] font-bold uppercase tracking-widest">Platform Fee (0%)</span>
                    <span className="text-green-600 font-black">$0.00</span>
                  </div>
                  <div className="flex justify-between text-xl pt-4 border-t border-[#EAE3DC]">
                    <span className="text-[#1A110B] font-black uppercase tracking-tighter">Total Amount</span>
                    <span className="text-[#D87D4A] font-black tracking-tighter">${amount}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full bg-[#1A110B] text-white py-6 rounded-[32px] font-black text-xs tracking-[0.3em] uppercase transition-all duration-500 flex items-center justify-center gap-3 hover:bg-[#D87D4A] group"
              >
                Confirm Order
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <div>
                <span className="text-[#D87D4A] text-[10px] font-black tracking-[0.4em] uppercase mb-2 block">Step 02</span>
                <h2 className="text-4xl font-medium text-[#1A110B] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Payment Method</h2>
              </div>

              <div className="space-y-4">
                {[
                  { id: 'wallet', icon: <Wallet size={24} />, label: 'Coffee Wallet', desc: 'Instant settlement with beans' },
                  { id: 'card', icon: <CreditCard size={24} />, label: 'Elite Credit', desc: 'Visa, Mastercard, AMEX' },
                  { id: 'escrow', icon: <ShieldCheck size={24} />, label: 'Estate Escrow', desc: 'Secure bank-to-bank transfer' }
                ].map((method) => (
                  <button 
                    key={method.id}
                    onClick={handleNext}
                    className="w-full flex items-center gap-6 p-6 rounded-[32px] border border-[#EAE3DC] hover:border-[#D87D4A] hover:bg-[#FAF9F6] transition-all duration-300 text-left group"
                  >
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#D87D4A] shadow-sm border border-[#EAE3DC] group-hover:scale-110 transition-transform">
                      {method.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A110B]">{method.label}</h4>
                      <p className="text-[#A89F98] text-xs font-medium">{method.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Processing */}
          {step === 3 && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-1000">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-[#FAF9F6] border-t-[#D87D4A] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-[#D87D4A]">
                  <ShieldCheck size={40} className="animate-pulse" />
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-medium text-[#1A110B] tracking-tight mb-2">Verifying Transaction</h2>
                <p className="text-[#A89F98] font-medium tracking-wide">Securing funds in escrow and notifying the estate...</p>
              </div>

              {/* Autoprogress is handled by a useEffect in the actual implementation if needed, but here we'll just wait for the next state change which is triggered by step duration or manual trigger in dev */}
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="py-10 flex flex-col items-center justify-center text-center space-y-10 animate-in zoom-in duration-700">
              <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-200 animate-success-check">
                <CheckCircle2 size={64} />
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-green-600 text-[10px] font-black tracking-[0.4em] uppercase mb-2 block">Payment Successful</span>
                  <h2 className="text-4xl font-medium text-[#1A110B] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Lot Secured!</h2>
                </div>
                <p className="text-[#6D5D55] text-lg max-w-xs mx-auto">
                  Congratulations! You've successfully acquired this premium lot. The seller has been notified to prepare shipping.
                </p>
              </div>

              <div className="w-full p-8 rounded-[32px] bg-[#FAF9F6] border border-green-100 text-left space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-[#A89F98] uppercase tracking-widest">Transaction ID</span>
                  <span className="font-mono text-xs font-bold text-[#1A110B]">BA-#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-[#A89F98] uppercase tracking-widest">Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[9px] font-black uppercase tracking-widest">Completed</span>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full bg-[#1A110B] text-white py-6 rounded-[32px] font-black text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:bg-[#D87D4A]"
              >
                Back to Marketplace
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentDemo;
