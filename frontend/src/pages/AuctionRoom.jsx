import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { SocketContext } from '../context/SocketContext';
import { AuthContext } from '../context/AuthContext';
import { Clock, DollarSign, MapPin, Coffee, Activity, User, TrendingUp, CreditCard, ChevronLeft, Award, ShieldCheck, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow, differenceInSeconds } from 'date-fns';
import PaymentDemo from '../components/PaymentDemo';

const AuctionRoom = () => {
  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Caveat:wght@400..700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bidHistory, setBidHistory] = useState([]);
  const [timeLeft, setTimeLeft] = useState('');
  const [isEnded, setIsEnded] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [isBidding, setIsBidding] = useState(false);

  const socket = useContext(SocketContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const { data } = await api.get(`/auctions/${id}`);
        setAuction(data);
        setBidHistory(data.bids || []);
        if (data.status === 'completed' || new Date(data.endTime) <= new Date()) {
          setIsEnded(true);
          setWinner(data.highestBidder);
        }
      } catch (error) {
        console.error('Error fetching auction', error);
        setError('Failed to load auction details.');
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id]);

  useEffect(() => {
    if (!socket || !auction) return;

    socket.emit('joinAuction', id);

    socket.on('bidUpdate', (data) => {
      setAuction((prev) => ({
        ...prev,
        currentBid: data.currentBid,
        highestBidder: data.highestBidder
      }));
      setBidHistory((prev) => [{
        amount: data.currentBid,
        user: { name: data.highestBidder?.name || 'Anonymous' },
        createdAt: new Date()
      }, ...prev]);
    });

    socket.on('bidError', (data) => {
      setError(data.message);
      setTimeout(() => setError(''), 3000);
    });

    socket.on('auctionEnd', (data) => {
      setIsEnded(true);
      setWinner(data.winner);
    });

    return () => {
      socket.emit('leaveAuction', id);
      socket.off('bidUpdate');
      socket.off('bidError');
      socket.off('auctionEnd');
    };
  }, [socket, id, auction]);

  useEffect(() => {
    if (!auction || isEnded) return;

    const timer = setInterval(() => {
      const end = new Date(auction.endTime);
      const now = new Date();
      const diff = differenceInSeconds(end, now);

      if (diff <= 0) {
        setIsEnded(true);
        clearInterval(timer);
        setTimeLeft('Auction Ended');
      } else {
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [auction, isEnded]);

  // Confetti effect for winners
  useEffect(() => {
    if (isEnded && (winner?._id === user?._id || auction?.highestBidder?._id === user?._id)) {
      const colors = ['#D87D4A', '#1A110B', '#F59E0B', '#A17152'];
      const newConfetti = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100 + 'vw',
        delay: Math.random() * 2 + 's',
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4 + 'px'
      }));
      setConfetti(newConfetti);
    }
  }, [isEnded, winner, user, auction]);

  const handleBid = (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to bid.');
      return;
    }

    if (!socket || !socket.connected) {
      setError('Connection lost. Please refresh the page.');
      return;
    }
    
    const amount = Number(bidAmount);
    if (amount <= auction.currentBid) {
      setError('Bid must be higher than current bid.');
      return;
    }

    setIsBidding(true);
    socket.emit('placeBid', {
      auctionId: id,
      userId: user._id,
      amount
    });
    setBidAmount('');
    
    // Reset bidding state after a short delay or when update/error received
    setTimeout(() => setIsBidding(false), 2000);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-[#FAF9F6]">
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-2 border-[#EAE3DC] border-t-[#D87D4A] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-[#D87D4A] text-2xl">☕</div>
      </div>
    </div>
  );

  if (!auction) return <div className="text-center py-20 text-xl font-semibold text-[#1A110B]">Auction not found</div>;

  const isWinner = isEnded && (winner?._id === user?._id || auction.highestBidder?._id === user?._id);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-12 overflow-x-hidden relative">
      
      {/* Confetti Elements */}
      {confetti.map(c => (
        <div 
          key={c.id}
          className="confetti"
          style={{ 
            left: c.left, 
            animationDelay: c.delay, 
            backgroundColor: c.color,
            width: c.size,
            height: c.size,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px'
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-[#A89F98] hover:text-[#D87D4A] mb-8 font-bold text-xs tracking-widest transition-colors uppercase">
          <ChevronLeft size={16} className="mr-1" /> Back to Marketplace
        </Link>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Details & History */}
          <div className="flex-1 space-y-10">
            
            {/* Main Header Card */}
            <div className="bg-white rounded-[40px] border border-[#EAE3DC] overflow-hidden shadow-sm">
              <div className="p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[#D87D4A] text-[10px] font-black tracking-[0.3em] uppercase">Premium Lot #{id.slice(-4)}</span>
                      <div className="w-1 h-1 rounded-full bg-[#EAE3DC]"></div>
                      <span className="text-[#A89F98] text-[14px] font-bold tracking-normal lowercase" style={{ fontFamily: "'Caveat', cursive" }}>{auction.origin || 'Micro-Lot'}</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-medium text-[#1A110B] leading-tight tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{auction.title}</h1>
                  </div>
                  
                  <div className={`px-6 py-3 rounded-full font-black text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 border ${isEnded ? 'bg-red-50 border-red-100 text-red-600' : 'bg-green-50 border-green-100 text-green-700'}`}>
                    <div className={`w-2 h-2 rounded-full ${isEnded ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></div>
                    {isEnded ? 'Auction Closed' : 'Live Bidding'}
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 bg-[#FAF9F6] rounded-[32px] border border-[#EAE3DC]">
                  {[
                    { label: 'Origin', value: auction.origin || 'N/A', icon: <MapPin size={14} /> },
                    { label: 'Roast', value: auction.roastLevel || 'Green', icon: <Coffee size={14} /> },
                    { label: 'Seller', value: auction.seller?.name || 'Verified', icon: <ShieldCheck size={14} /> },
                    { label: 'Starting', value: `$${auction.startingPrice}`, icon: <DollarSign size={14} /> }
                  ].map((spec, i) => (
                    <div key={i} className="flex flex-col p-6 rounded-[24px] bg-white border border-[#EAE3DC]/50 shadow-sm">
                      <div className="text-[#D87D4A] mb-3">{spec.icon}</div>
                      <span className="text-[9px] font-black text-[#A89F98] uppercase tracking-widest mb-1">{spec.label}</span>
                      <span className="font-bold text-[#1A110B] truncate">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <h3 className="text-[10px] font-black text-[#1A110B] uppercase tracking-[0.4em] mb-6">Lot Description</h3>
                  <p className="text-[#6D5D55] text-lg leading-relaxed opacity-90">{auction.description}</p>
                </div>
              </div>
            </div>

            {/* Bid History Card */}
            <div className="bg-white rounded-[40px] border border-[#EAE3DC] p-10 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-[10px] font-black text-[#1A110B] uppercase tracking-[0.4em]">Live Bid History</h3>
                <div className="flex items-center gap-2 text-[#A89F98] text-[10px] font-black uppercase tracking-widest">
                  <Activity size={12} className="text-[#D87D4A]" /> {bidHistory.length} Total Bids
                </div>
              </div>

              {bidHistory.length === 0 ? (
                <div className="text-center py-12 bg-[#FAF9F6] rounded-[32px] border-2 border-dashed border-[#EAE3DC]">
                  <p className="text-[#A89F98] font-medium">No bids have been placed yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bidHistory.map((bid, i) => (
                    <div key={i} className={`flex justify-between items-center p-6 rounded-[28px] border transition-all ${i === 0 ? 'bg-[#1A110B] border-[#1A110B] text-white shadow-xl scale-[1.02]' : 'bg-white border-[#EAE3DC] text-[#1A110B]'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${i === 0 ? 'bg-[#D87D4A] text-white' : 'bg-[#FAF9F6] text-[#D87D4A]'}`}>
                          {i === 0 ? <Award size={24} /> : (bid.user?.name?.[0] || 'U')}
                        </div>
                        <div>
                          <p className={`font-bold ${i === 0 ? 'text-white' : 'text-[#1A110B]'}`}>{bid.user?.name || 'Anonymous'}</p>
                          <p className={`text-[10px] font-medium tracking-widest uppercase ${i === 0 ? 'text-white/60' : 'text-[#A89F98]'}`}>
                            {formatDistanceToNow(new Date(bid.createdAt || bid.time), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-black tracking-tighter ${i === 0 ? 'text-[#D87D4A]' : 'text-[#1A110B]'}`}>${bid.amount}</p>
                        {i === 0 && <span className="text-[8px] font-black tracking-[0.3em] uppercase text-white/40">Leader</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Bidding Actions */}
          <div className="lg:w-[400px] space-y-6">
            
            {/* Timer Card */}
            <div className="bg-[#1A110B] rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D87D4A]/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40 mb-4 block text-center">Remaining Time</span>
                <div className="text-5xl font-medium tracking-tighter text-center mb-2 tabular-nums">
                  {timeLeft || '00:00:00'}
                </div>
                {isEnded && <div className="text-center text-[#D87D4A] font-bold text-xs uppercase tracking-widest mt-4">Closed</div>}
              </div>
            </div>

            {/* Current Bid Card */}
            <div className="bg-white rounded-[40px] border border-[#EAE3DC] p-10 shadow-sm text-center">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#A89F98] mb-4 block">Highest Offer</span>
              <div className="text-6xl font-medium text-[#1A110B] tracking-tighter mb-4 flex items-center justify-center gap-1">
                <span className="text-2xl text-[#D87D4A]">$</span>
                {auction.currentBid}
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF9F6] rounded-full text-xs font-bold text-[#6D5D55] border border-[#EAE3DC]">
                <User size={12} className="text-[#D87D4A]" /> 
                <span style={{ fontFamily: "'Caveat', cursive", fontSize: '1.2rem' }}>{auction.highestBidder?.name || 'No Bidders'}</span>
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-white rounded-[40px] border border-[#EAE3DC] p-10 shadow-sm">
              {error && <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-6 text-xs font-bold text-center tracking-wide uppercase">{error}</div>}

              {isEnded ? (
                <div className="space-y-6">
                  <div className="p-8 rounded-[32px] bg-[#FAF9F6] border border-[#EAE3DC] text-center">
                    <h3 className="font-black text-[10px] tracking-[0.3em] uppercase text-[#A89F98] mb-4">Official Result</h3>
                    <div className="w-16 h-16 bg-[#D87D4A] rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                      <Award size={32} />
                    </div>
                    <p className="text-[#1A110B] font-bold text-xl mb-1">{auction.highestBidder?.name || 'No winner'}</p>
                    <p className="text-[#D87D4A] font-black text-2xl">${auction.currentBid}</p>
                  </div>

                  {auction.isPaid ? (
                    <div className="flex items-center gap-3 p-6 bg-green-50 border border-green-100 rounded-[32px] text-green-700 justify-center">
                      <CheckCircle2 size={24} className="text-green-500" />
                      <span className="font-black text-xs uppercase tracking-[0.3em]">Paid</span>
                    </div>
                  ) : isWinner && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-2xl text-green-700">
                        <Sparkles size={20} className="animate-pulse" />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">You are the winner of this lot!</p>
                      </div>
                      <button
                        onClick={() => setShowPayment(true)}
                        className="w-full bg-[#1A110B] hover:bg-[#D87D4A] text-white py-6 rounded-[32px] font-black text-xs tracking-[0.3em] uppercase transition-all duration-500 shadow-2xl hover:scale-[1.02] flex items-center justify-center gap-3 group"
                      >
                        <CreditCard size={18} className="group-hover:animate-bounce" />
                        Proceed to Payment
                      </button>
                    </div>
                  )}
                </div>
              ) : user?._id === auction.seller?._id ? (
                <div className="p-8 bg-[#FAF9F6] border border-[#EAE3DC] rounded-[32px] text-center">
                  <span className="text-[10px] font-black text-[#A89F98] uppercase tracking-[0.3em] mb-4 block">Seller View</span>
                  <p className="text-[#1A110B] font-bold">You are the seller of this lot.</p>
                  <p className="text-[#A89F98] text-xs mt-2">Bidding is disabled for your own listings.</p>
                </div>
              ) : (
                <form onSubmit={handleBid} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-[#1A110B] uppercase tracking-[0.3em] mb-4 text-center">Place Your Bid</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                        <DollarSign size={20} className="text-[#D87D4A]" />
                      </div>
                      <input
                        type="number"
                        min={auction.currentBid + 0.5}
                        step="0.5"
                        required
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="w-full pl-14 pr-6 py-6 text-2xl font-bold rounded-[32px] border border-[#EAE3DC] focus:border-[#D87D4A] focus:ring-4 focus:ring-[#D87D4A]/5 outline-none transition-all duration-300 bg-[#FAF9F6] text-[#1A110B] placeholder:text-[#A89F98]/50"
                        placeholder={(auction.currentBid + 0.5).toFixed(2)}
                      />
                    </div>
                    <p className="text-[10px] text-center mt-4 text-[#A89F98] font-bold uppercase tracking-widest">Min. Increment: $0.50</p>
                  </div>
                  <button
                    type="submit"
                    disabled={isBidding}
                    className={`w-full ${isBidding ? 'bg-gray-400' : 'bg-[#D87D4A] hover:bg-[#1A110B]'} text-white py-6 rounded-[32px] font-black text-xs tracking-[0.3em] uppercase transition-all duration-500 shadow-xl shadow-[#D87D4A]/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3`}
                  >
                    {isBidding ? 'Placing Bid...' : 'Confirm Bid'}
                    {!isBidding && <TrendingUp size={16} />}
                  </button>
                </form>
              )}
            </div>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-4 text-[#A89F98] opacity-60">
              <ShieldCheck size={16} />
              <span className="text-[9px] font-black tracking-widest uppercase">Verified Secure Exchange</span>
            </div>
          </div>
        </div>
      </div>

      <PaymentDemo 
        isOpen={showPayment} 
        onClose={() => {
          setShowPayment(false);
          // Refresh auction data to show paid status
          api.get(`/auctions/${id}`).then(({ data }) => {
            setAuction(data);
          });
        }} 
        onSuccess={() => {
          setAuction(prev => ({ ...prev, isPaid: true }));
        }}
        auction={auction}
        amount={auction.currentBid}
      />
    </div>
  );
};

export default AuctionRoom;
