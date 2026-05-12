import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Coffee, User, Store, Mail, Lock, UserCircle, ArrowRight } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('bidder');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FDFBF7]">
      {/* Left Side: Branding & Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src="/login-bg.png" 
          alt="Coffee Culture" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A110B] via-[#1A110B]/60 to-transparent"></div>
        <div className="absolute bottom-20 left-20 right-20 z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#D87D4A] rounded-2xl flex items-center justify-center text-2xl shadow-xl">☕</div>
            <span className="text-3xl font-black text-white tracking-tighter">Bean<span className="text-[#D87D4A]">Auction</span></span>
          </div>
          <h2 className="text-6xl font-medium text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            The journey from <br/>
            <span className="italic text-[#D87D4A]">farm to cup</span> starts here.
          </h2>
          <p className="text-white/70 text-xl max-w-lg leading-relaxed">
            Create an account to join the world's most exclusive coffee marketplace.
          </p>
        </div>
      </div>

      {/* Right Side: Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 relative overflow-hidden">
        {/* Mobile decorative background */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-1/3 -z-10">
          <img src="/login-bg.png" className="w-full h-full object-cover opacity-20" alt="bg" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FDFBF7]"></div>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-5xl font-black text-[#1A110B] mb-4 tracking-tighter">Join us.</h1>
            <p className="text-[#A89F98] text-lg font-medium">Select your role and start your journey.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 text-sm font-bold text-center tracking-wide uppercase">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('bidder')}
                className={`flex flex-col items-center gap-3 p-5 rounded-[28px] border-2 transition-all duration-500 ${
                  role === 'bidder'
                    ? 'border-[#D87D4A] bg-[#D87D4A]/5 text-[#1A110B] shadow-xl'
                    : 'border-[#EAE3DC] bg-white text-[#A89F98] hover:border-[#D87D4A]/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${role === 'bidder' ? 'bg-[#D87D4A] text-white' : 'bg-[#FAF9F6]'}`}>
                  <User size={20} />
                </div>
                <span className="font-black text-[10px] uppercase tracking-widest text-center">Buyer / Roaster</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('seller')}
                className={`flex flex-col items-center gap-3 p-5 rounded-[28px] border-2 transition-all duration-500 ${
                  role === 'seller'
                    ? 'border-[#1A110B] bg-[#1A110B]/5 text-[#1A110B] shadow-xl'
                    : 'border-[#EAE3DC] bg-white text-[#A89F98] hover:border-[#1A110B]/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${role === 'seller' ? 'bg-[#1A110B] text-white' : 'bg-[#FAF9F6]'}`}>
                  <Store size={20} />
                </div>
                <span className="font-black text-[10px] uppercase tracking-widest text-center">Seller / Farmer</span>
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#A89F98] uppercase tracking-[0.3em] ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <UserCircle size={18} className="text-[#D87D4A]" />
                </div>
                <input
                  type="text"
                  required
                  className="w-full pl-14 pr-6 py-5 rounded-[24px] border border-[#EAE3DC] focus:border-[#D87D4A] focus:ring-4 focus:ring-[#D87D4A]/5 outline-none transition-all duration-300 bg-white text-[#1A110B] font-bold placeholder:text-[#A89F98]/40"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Full Name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#A89F98] uppercase tracking-[0.3em] ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Mail size={18} className="text-[#D87D4A]" />
                </div>
                <input
                  type="email"
                  required
                  className="w-full pl-14 pr-6 py-5 rounded-[24px] border border-[#EAE3DC] focus:border-[#D87D4A] focus:ring-4 focus:ring-[#D87D4A]/5 outline-none transition-all duration-300 bg-white text-[#1A110B] font-bold placeholder:text-[#A89F98]/40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#A89F98] uppercase tracking-[0.3em] ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[#D87D4A]" />
                </div>
                <input
                  type="password"
                  required
                  className="w-full pl-14 pr-6 py-5 rounded-[24px] border border-[#EAE3DC] focus:border-[#D87D4A] focus:ring-4 focus:ring-[#D87D4A]/5 outline-none transition-all duration-300 bg-white text-[#1A110B] font-bold placeholder:text-[#A89F98]/40"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A110B] hover:bg-[#D87D4A] text-white py-6 rounded-[24px] font-black text-xs tracking-[0.3em] uppercase transition-all duration-500 shadow-2xl shadow-[#1A110B]/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
            >
              Initialize My Account
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-12 text-center text-[#A89F98] font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-[#D87D4A] font-black hover:underline underline-offset-8 transition-all">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
