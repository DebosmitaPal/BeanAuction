import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Clock, TrendingUp, ChevronDown, Star, Shield, Zap, Globe, Award, ArrowRight, CreditCard, Share2, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { AuthContext } from '../context/AuthContext';

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
const Hero = () => {
  const [count, setCount] = useState({ auctions: 0, traders: 0, countries: 0 });

  useEffect(() => {
    const targets = { auctions: 12, traders: 85, countries: 42 };
    const duration = 2500;
    const steps = 80;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount({
        auctions: Math.floor(eased * targets.auctions),
        traders: Math.floor(eased * targets.traders),
        countries: Math.floor(eased * targets.countries),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[95vh] pt-32 pb-20 overflow-hidden flex flex-col font-sans">
      <style>
        {`
          @keyframes grain {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-5%, -10%); }
            20% { transform: translate(-15%, 5%); }
            30% { transform: translate(7%, -25%); }
            40% { transform: translate(-5%, 25%); }
            50% { transform: translate(-15%, 10%); }
            60% { transform: translate(15%, 0%); }
            70% { transform: translate(0%, 15%); }
            80% { transform: translate(3%, 35%); }
            90% { transform: translate(-10%, 10%); }
          }
          .grain-bg::after {
            content: "";
            background-image: url("https://www.transparenttextures.com/patterns/carbon-fibre.png");
            height: 300%; width: 300%;
            position: fixed; top: -100%; left: -100%;
            animation: grain 8s steps(10) infinite;
            opacity: 0.03;
            pointer-events: none;
            z-index: 50;
          }
          .text-glow {
            text-shadow: 0 0 30px rgba(216, 125, 74, 0.4);
          }
          @keyframes reveal {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-reveal {
            animation: reveal 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
        `}
      </style>

      <div className="grain-bg absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
          alt="Coffee Art"
          className="w-full h-full object-cover scale-110"
          style={{ filter: 'brightness(0.35) contrast(1.15)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A110B]/80 to-[#1A110B]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A110B] via-transparent to-[#1A110B]/30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center relative z-10">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-flex items-center gap-3 mb-8 animate-reveal" style={{ animationDelay: '0.1s' }}>
            <span className="w-12 h-[1px] bg-[#D87D4A]"></span>
            <span className="text-[#D87D4A] text-[10px] font-black tracking-[0.5em] uppercase">Est. 2026 • Origin Direct</span>
          </div>

          <h1 className="text-7xl sm:text-8xl md:text-[100px] lg:text-[130px] font-medium text-white tracking-tighter leading-[0.85] mb-10 animate-reveal" style={{ fontFamily: "'Playfair Display', serif", animationDelay: '0.3s' }}>
            A Legacy in <br />
            <span className="text-[#D87D4A] italic text-glow">Every Grain.</span>
          </h1>

          <p className="text-[#A89F98] text-xl md:text-2xl max-w-2xl leading-relaxed font-medium mb-12 animate-reveal" style={{ animationDelay: '0.5s' }}>
            Join the inner circle of specialty coffee acquisition. Secure the rarest micro-lots before they ever reach the open market.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-8 w-full sm:w-auto animate-reveal" style={{ animationDelay: '0.7s' }}>
            <button
              onClick={() => document.getElementById('auctions-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-[#D87D4A] hover:bg-white hover:text-[#1A110B] text-white px-16 py-7 rounded-[24px] font-black text-xs tracking-[0.3em] transition-all duration-700 shadow-[0_30px_60px_-15px_rgba(216,125,74,0.4)] hover:scale-105 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 group"
            >
              EXPLORE ACTIVE LOTS
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-[#1A110B] overflow-hidden bg-[#3D2B1F]">
                    <img src={`https://i.pravatar.cc/100?u=${i * 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-white/60 text-xs font-bold tracking-widest uppercase"><span className="text-white">400+</span> Traders</p>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16 animate-reveal" style={{ animationDelay: '0.9s' }}>
          {[
            { value: `${count.auctions}`, label: 'Live Micro-lots', sub: 'Updated real-time' },
            { value: `${count.traders}`, label: 'Verified Roasters', sub: 'Global network' },
            { value: `${count.countries}`, label: 'Niche Origins', sub: 'Estate direct' }
          ].map((stat, i) => (
            <div key={i} className="group cursor-default">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-black text-white tracking-tighter group-hover:text-[#D87D4A] transition-all duration-500">{stat.value}</span>
                <span className="text-[#D87D4A] text-xl font-bold">+</span>
              </div>
              <p className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-1">{stat.label}</p>
              <p className="text-[#6D5D55] text-[10px] font-medium uppercase tracking-widest opacity-60">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────────── */
const AboutSection = () => {
  const features = [
    {
      icon: <Zap size={24} />,
      title: 'Atomic Bidding',
      desc: 'Zero-latency synchronization ensuring every millisecond counts in the final stretch.',
      color: 'bg-orange-500/10 text-orange-600'
    },
    {
      icon: <Shield size={24} />,
      title: 'Estate Guard',
      desc: 'Direct-to-origin audit trail verifying every bean\'s journey from soil to shipment.',
      color: 'bg-emerald-500/10 text-emerald-600'
    },
    {
      icon: <Globe size={24} />,
      title: 'Global Pipeline',
      desc: 'Integrated logistics bridging the most remote mountain estates with your roastery.',
      color: 'bg-blue-500/10 text-blue-600'
    }
  ];

  return (
    <section id="about-section" className="py-40 bg-[#1A110B] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D87D4A]/5 rounded-full blur-[150px] -mr-64 -mt-32"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div>
              <span className="text-[#D87D4A] text-[10px] font-black tracking-[0.5em] uppercase mb-6 block">Our Philosophy</span>
              <h2 className="text-5xl md:text-7xl font-medium text-white leading-[0.9] tracking-tighter mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                Crafting the <span className="italic text-[#D87D4A]">Standard</span> of Digital Trade.
              </h2>
              <p className="text-[#A89F98] text-lg leading-relaxed max-w-xl">
                We don't just facilitate sales; we preserve legacies. Every auction is a tribute to the years of labor, the unique soil, and the climatic perfection that creates a specialty lot.
              </p>
            </div>

            <div className="space-y-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className={`w-14 h-14 shrink-0 rounded-[20px] ${f.color} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-2">{f.title}</h4>
                    <p className="text-[#6D5D55] text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-[60px] overflow-hidden border border-white/10 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2000&auto=format&fit=crop" alt="Coffee Experience" className="w-full h-[700px] object-cover hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="absolute -bottom-10 -left-10 z-20 bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[40px] max-w-xs shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#D87D4A] flex items-center justify-center text-white">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-white font-black text-xl leading-none">85+</p>
                  <p className="text-[#A89F98] text-[9px] font-bold uppercase tracking-widest">SCA Certified</p>
                </div>
              </div>
              <p className="text-white/80 text-xs leading-relaxed italic">"The most transparent acquisition process I've experienced in 20 years of roasting."</p>
              <p className="text-[#D87D4A] text-[9px] font-black uppercase tracking-widest mt-4">— Marcus Thorne, Artisan Roasts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   FAQ SECTION
───────────────────────────────────────────── */
const faqs = [
  {
    icon: <Zap size={20} />,
    q: 'How does real-time bidding work?',
    a: 'Our platform uses WebSocket technology for sub-millisecond synchronization. Every bid is instantly validated and broadcasted globally.',
  },
  {
    icon: <Shield size={20} />,
    q: 'What are seller requirements?',
    a: 'Verified producers only. We require direct-to-origin audit trails and a minimum SCA cupping score of 85+ for all listings.',
  },
  {
    icon: <TrendingUp size={20} />,
    q: 'Is there a minimum increment?',
    a: 'Yes, bid increments are dynamically calculated based on lot value to maintain market momentum and ensure fair competition.',
  },
  {
    icon: <Globe size={20} />,
    q: 'How is logistics handled?',
    a: 'BeanAuction partners with specialty freight experts to manage export/import documentation and door-to-door temperature-controlled transit.',
  },
  {
    icon: <Award size={20} />,
    q: 'What happens after I win?',
    a: 'Automated escrow kicks in. Funds are held securely until you verify the harvest quality upon arrival at your roastery.',
  },
  {
    icon: <Star size={20} />,
    q: 'Can I request samples?',
    a: 'Absolutely. We offer a "Pre-Auction Sample Program" where roasters can order 100g green or roasted samples for cupping.',
  },
];

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div
    className={`group rounded-[40px] transition-all duration-700 border ${isOpen
      ? 'border-[#D87D4A] bg-white shadow-[0_40px_80px_-20px_rgba(216,125,74,0.15)]'
      : 'border-[#EAE3DC] bg-[#FAF9F6]/80 hover:bg-white hover:border-[#D87D4A]/30'
      }`}
  >
    <button
      onClick={onClick}
      className="w-full flex items-center gap-6 px-10 py-9 text-left"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 ${isOpen ? 'bg-[#D87D4A] text-white rotate-[360deg]' : 'bg-[#EAE3DC]/50 text-[#D87D4A] group-hover:bg-[#D87D4A]/10'}`}>
        {faq.icon}
      </div>
      <span className={`flex-1 text-xl font-bold transition-colors duration-500 ${isOpen ? 'text-[#1A110B]' : 'text-[#1A110B]/70 group-hover:text-[#1A110B]'}`}>
        {faq.q}
      </span>
      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${isOpen ? 'rotate-180 bg-[#1A110B] border-[#1A110B] text-white' : 'border-[#EAE3DC] text-[#D87D4A] group-hover:border-[#D87D4A]/30'}`}>
        <ChevronDown size={18} />
      </div>
    </button>
    <div
      className={`transition-all duration-700 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
    >
      <div className="px-10 pb-10">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#EAE3DC] to-transparent mb-8" />
        <p className="text-[#6D5D55] leading-relaxed text-lg font-medium pl-18">{faq.a}</p>
      </div>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq-section" className="py-32 bg-[#1A110B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-[#FAF9F6] rounded-[60px] relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]">

          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
            <svg viewBox="0 0 1440 320" className="w-full h-auto text-white opacity-80" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,106.7C672,96,768,128,864,160C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>
          </div>
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 mt-[1px]">
            <svg viewBox="0 0 1440 320" className="w-full h-auto text-white opacity-40" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,192C672,181,768,139,864,133.3C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 rotate-180">
            <svg viewBox="0 0 1440 320" className="w-full h-auto text-white opacity-60" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,106.7C672,96,768,128,864,160C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>
          </div>

          <div className="p-12 md:p-24 relative z-10 flex flex-col lg:flex-row gap-24 items-start">
            <div className="lg:sticky lg:top-40 max-w-md">
              <span className="text-[#D87D4A] text-[10px] font-black tracking-[0.5em] uppercase mb-8 block">Inquiry Protocol</span>
              <h2 className="text-6xl font-medium text-[#1A110B] tracking-tighter leading-[0.9] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Collector's <span className="italic text-[#D87D4A]">Manual.</span>
              </h2>
              <p className="text-[#6D5D55] text-xl leading-relaxed mb-12">
                Every detail of the exchange decoded. From origin verification to the final roast drop.
              </p>
              <div className="p-8 rounded-[40px] bg-white border border-[#EAE3DC] shadow-xl">
                <p className="text-[#1A110B] text-sm font-bold mb-6">Need specialized assistance?</p>
                <div className="flex -space-x-3 mb-8">
                  {[
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                  ].map((url, i) => (
                    <img key={i} src={url} className="w-12 h-12 rounded-full border-4 border-white object-cover" alt="Support" />
                  ))}
                </div>
                <a href="mailto:concierge@beanauction.com" className="inline-flex items-center gap-3 text-[#D87D4A] font-black text-[10px] tracking-widest uppercase group">
                  CONNECT WITH CONCIERGE
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>

            <div className="flex-1 space-y-6 w-full">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  faq={faq}
                  isOpen={openIdx === i}
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   AUCTION GRID SECTION
───────────────────────────────────────────── */
const AuctionsSection = ({ auctions, loading, user }) => (
  <section id="auctions-section" className="py-40 bg-[#FAF9F6] relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-3 h-3 rounded-full bg-[#D87D4A] animate-ping"></span>
            <span className="text-[#D87D4A] text-[10px] font-black tracking-[0.5em] uppercase">Live Market Pulse</span>
          </div>
          <h2 className="text-6xl font-medium text-[#1A110B] tracking-tighter leading-none mb-6">Current Harvests.</h2>
          <p className="text-[#A89F98] text-lg font-medium leading-relaxed">
            Exclusive micro-lots currently undergoing high-precision bidding.
          </p>
        </div>

        {user?.role === 'seller' && (
          <Link to="/create-auction" className="group bg-[#1A110B] hover:bg-[#D87D4A] text-white px-10 py-6 rounded-[24px] font-black text-[10px] tracking-[0.3em] uppercase transition-all duration-700 shadow-2xl flex items-center gap-4">
            INITIATE LISTING
            <Zap size={14} className="group-hover:rotate-12 transition-transform" />
          </Link>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-40">
          <div className="w-16 h-16 border-t-4 border-[#D87D4A] rounded-full animate-spin"></div>
        </div>
      ) : auctions.length === 0 ? (
        <div className="text-center py-40 bg-[#FAF9F6] rounded-[60px] border-4 border-dashed border-[#EAE3DC]">
          <h3 className="text-3xl font-bold text-[#1A110B] mb-4">The floor is silent.</h3>
          <p className="text-[#A89F98] font-bold uppercase tracking-widest text-[10px]">Next global drop in 14:02:11</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {auctions.map((a, i) => (
            <Link key={a._id} to={`/auction/${a._id}`} className="group relative p-[1px] rounded-[41px] transition-all duration-700 bg-gradient-to-br from-[#D87D4A]/40 to-[#1A110B]/30 shadow-[0_0_35px_rgba(216,125,74,0.25)] hover:bg-gradient-to-br hover:from-[#D87D4A] hover:to-[#1A110B] hover:shadow-[0_0_70px_rgba(216,125,74,0.6)] animate-pulse-slow">
              <div className="h-[420px] bg-white rounded-[40px] p-8 border border-[#D87D4A]/20 transition-all duration-700 group-hover:border-transparent relative overflow-hidden flex flex-col justify-between">
                
                {/* Modern Decorative Accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D87D4A]/5 rounded-full blur-2xl transition-all duration-700 group-hover:bg-[#D87D4A]/10"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D87D4A]"></div>
                      <span className="text-[10px] font-black text-[#1A110B] tracking-[0.3em] uppercase">
                        {a.origin || 'Exclusive'}
                      </span>
                    </div>
                    <div className="bg-[#FAF9F6] px-4 py-2 rounded-2xl border border-[#EAE3DC]/50 flex items-center gap-2">
                      <Clock size={12} className="text-[#D87D4A]" />
                      <span className="text-[9px] font-black text-[#A89F98] tracking-widest uppercase">
                        {formatDistanceToNow(new Date(a.endTime)).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-4xl font-bold text-[#1A110B] tracking-tight leading-[1.1] mb-6 group-hover:text-[#D87D4A] transition-colors duration-500">
                    {a.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[9px] font-black text-[#D87D4A] uppercase tracking-[0.2em] px-3 py-1 bg-[#D87D4A]/5 rounded-lg border border-[#D87D4A]/10">
                      {a.roastLevel || 'Master Roast'}
                    </span>
                    <div className="h-[1px] flex-1 bg-[#EAE3DC]"></div>
                  </div>

                  <p className="text-[#6D5D55] text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity line-clamp-2">
                    {a.description}
                  </p>
                </div>

                <div className="relative z-10">
                  <div className="flex items-end justify-between p-1 border-t border-[#FAF9F6] pt-8">
                    <div>
                      <p className="text-[#A89F98] text-[8px] font-black uppercase tracking-[0.3em] mb-2">Current Bid</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xl font-bold text-[#D87D4A]">$</span>
                        <p className="text-4xl font-black text-[#1A110B] tracking-tighter group-hover:scale-110 transition-transform origin-left duration-500">{a.currentBid}</p>
                      </div>
                    </div>
                    <div className="w-16 h-16 rounded-[28px] bg-[#1A110B] text-white flex items-center justify-center shadow-xl transition-all duration-700 group-hover:bg-[#D87D4A] group-hover:-rotate-12 group-hover:scale-110">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   BIDDING ACTIVITY SECTION
 ───────────────────────────────────────────── */
const BiddingActivity = ({ bids, currentUser }) => (
  <section className="py-40 bg-[#FAF9F6] border-y border-[#EAE3DC] relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-20">
        <div>
          <h2 className="text-5xl font-medium text-[#1A110B] tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Personal <span className="italic text-[#D87D4A]">Ledger.</span>
          </h2>
          <p className="text-[#A89F98] font-bold uppercase tracking-[0.3em] text-[10px]">Real-time audit of your active market positions</p>
        </div>
        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#D87D4A] shadow-xl border border-[#EAE3DC]">
          <TrendingUp size={28} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {bids.map((bid) => {
          const bidderId = bid.highestBidder?._id || bid.highestBidder;
          const isWinning = bidderId === currentUser?._id;
          const isCompleted = bid.status === 'completed';

          return (
            <Link key={bid._id} to={`/auction/${bid._id}`} className="group relative">
              <div className="bg-white rounded-[40px] p-7 border border-[#EAE3DC] transition-all duration-500 hover:shadow-xl hover:border-[#D87D4A]/30 flex flex-col justify-between h-[260px] relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D87D4A]/5 rounded-full blur-2xl -mr-12 -mt-12"></div>
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] border border-[#EAE3DC] flex items-center justify-center text-[#D87D4A] group-hover:bg-[#1A110B] group-hover:text-white transition-all duration-500 shadow-sm">
                      <TrendingUp size={20} />
                    </div>
                    <div className="text-right">
                      {isCompleted ? (
                        isWinning ? (
                          <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase tracking-widest rounded-xl border border-emerald-100">SECURED</span>
                        ) : (
                          <span className="px-4 py-1.5 bg-gray-50 text-gray-400 text-[8px] font-black uppercase tracking-widest rounded-xl border border-gray-100">EXPIRED</span>
                        )
                      ) : (
                        isWinning ? (
                          <span className="px-4 py-1.5 bg-[#D87D4A]/10 text-[#D87D4A] text-[8px] font-black uppercase tracking-widest rounded-xl border border-[#D87D4A]/20 animate-pulse">LEADING</span>
                        ) : (
                          <span className="px-4 py-1.5 bg-orange-50 text-orange-600 text-[8px] font-black uppercase tracking-widest rounded-xl border border-orange-100">OUTBID</span>
                        )
                      )}
                    </div>
                  </div>
                  <h4 className="font-bold text-[#1A110B] text-lg mb-1 truncate group-hover:text-[#D87D4A] transition-colors">{bid.title}</h4>
                  <p className="text-[10px] font-black text-[#A89F98] uppercase tracking-widest">{bid.origin}</p>
                </div>

                <div className="flex justify-between items-center bg-[#FAF9F6] p-5 rounded-[28px] border border-[#EAE3DC]/50">
                  <div>
                    <p className="text-[8px] font-black text-[#A89F98] uppercase tracking-widest mb-1">Exposure</p>
                    <p className="text-2xl font-black text-[#1A110B] tracking-tighter">${bid.currentBid}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE3DC] flex items-center justify-center text-[#1A110B] group-hover:bg-[#D87D4A] group-hover:text-white group-hover:border-[#D87D4A] transition-all">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
const Footer = () => (
  <footer className="pt-16 pb-8 bg-[#D4B895] border-t border-[#1A110B]/10">
    <div className="max-w-7xl mx-auto px-6">

      <div className="flex mb-12 border-b border-[#1A110B]/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#1A110B] rounded-xl flex items-center justify-center text-[#D4B895]">
            <Award size={24} />
          </div>
          <div>
            <h3 className="text-3xl font-black text-[#1A110B] tracking-tighter italic" style={{ fontFamily: "'Playfair Display', serif" }}>BeanAuction</h3>
            <p className="text-[#1A110B]/60 text-[10px] font-bold uppercase tracking-widest mt-1">Premium Origin Trade</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div>
          <h4 className="text-[#1A110B] font-black uppercase tracking-[0.2em] text-[10px] mb-4">Marketplace</h4>
          <ul className="space-y-2">
            {['Live Auctions', 'Past Harvests', 'Network'].map(link => (
              <li key={link}><a href="#" className="text-[#1A110B]/70 hover:text-[#1A110B] transition-colors font-bold text-sm">{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[#1A110B] font-black uppercase tracking-[0.2em] text-[10px] mb-4">Governance</h4>
          <ul className="space-y-2">
            {['Escrow Policy', 'SCA Protocols', 'Terms'].map(link => (
              <li key={link}><a href="#" className="text-[#1A110B]/70 hover:text-[#1A110B] transition-colors font-bold text-sm">{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[#1A110B] font-black uppercase tracking-[0.2em] text-[10px] mb-4">Company</h4>
          <ul className="space-y-2">
            {['Our Story', 'Careers', 'Contact'].map(link => (
              <li key={link}><a href="#" className="text-[#1A110B]/70 hover:text-[#1A110B] transition-colors font-bold text-sm">{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[#1A110B] font-black uppercase tracking-[0.2em] text-[10px] mb-4">Connect</h4>
          <div className="flex gap-3">
            {[Share2, MessageCircle, Globe].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/50 border border-[#1A110B]/20 flex items-center justify-center text-[#1A110B] hover:bg-[#1A110B] hover:text-[#D4B895] transition-all">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#1A110B]/10">
        <p className="text-[#1A110B]/60 text-[10px] font-bold uppercase tracking-widest">© 2026 BeanAuction.</p>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Cookies'].map(link => (
            <a key={link} href="#" className="text-[#1A110B]/60 hover:text-[#1A110B] text-[10px] font-bold uppercase tracking-widest transition-colors">{link}</a>
          ))}
        </div>
      </div>

    </div>
  </footer>
);

/* ─────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────── */
const Dashboard = () => {
  const [auctions, setAuctions] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: auctionData } = await api.get('/auctions');
        setAuctions(auctionData.filter(a => a.status === 'active'));

        if (user) {
          const { data: bidData } = await api.get('/auctions/my-bids');
          setMyBids(bidData);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="bg-[#1A110B] overflow-hidden">
      <Hero />
      <AuctionsSection auctions={auctions} loading={loading} user={user} />
      {user && myBids.length > 0 && (
        <BiddingActivity bids={myBids} currentUser={user} />
      )}
      <AboutSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Dashboard;
