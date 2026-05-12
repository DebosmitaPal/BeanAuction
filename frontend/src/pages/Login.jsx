import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Coffee, Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FDFBF7]">
      {/* Left Side: Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src="/login-bg.png" 
          alt="Luxury Coffee Craft" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A110B] via-[#1A110B]/40 to-transparent"></div>
        <div className="absolute bottom-20 left-20 right-20 z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#D87D4A] rounded-2xl flex items-center justify-center text-2xl">☕</div>
            <span className="text-3xl font-black text-white tracking-tighter">Bean<span className="text-[#D87D4A]">Auction</span></span>
          </div>
          <h2 className="text-6xl font-medium text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            The finest lots, <br/>
            <span className="italic text-[#D87D4A]">just a bid away.</span>
          </h2>
          <p className="text-white/70 text-xl max-w-lg leading-relaxed">
            Join the global community of specialty coffee roasters and estate farmers.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 relative overflow-hidden">
        {/* Decorative elements for mobile */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-1/3 -z-10">
          <img src="/login-bg.png" className="w-full h-full object-cover opacity-20" alt="bg" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FDFBF7]"></div>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-12 text-center lg:text-left">
            <h1 className="text-5xl font-black text-[#1A110B] mb-4 tracking-tighter">Welcome back.</h1>
            <p className="text-[#A89F98] text-lg font-medium">Enter your credentials to access the exchange.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 text-sm font-bold text-center tracking-wide uppercase">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <a href="#" className="text-xs font-bold text-[#D87D4A] hover:text-[#1A110B] transition-colors">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A110B] hover:bg-[#D87D4A] text-white py-6 rounded-[24px] font-black text-xs tracking-[0.3em] uppercase transition-all duration-500 shadow-2xl shadow-[#1A110B]/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
            >
              Sign In to Account
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-12 text-center text-[#A89F98] font-medium">
            New to BeanAuction?{' '}
            <Link to="/register" className="text-[#D87D4A] font-black hover:underline underline-offset-8 transition-all">
              Create a free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
