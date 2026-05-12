import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Coffee, LogOut, PlusCircle, User, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-coffee-200/30 border-b border-coffee-200/50'
          : 'bg-white/60 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-accent-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
              <Coffee size={30} className="relative text-coffee-700 group-hover:text-coffee-800 transition-colors duration-300" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-xl tracking-tight text-coffee-900">Bean<span className="text-accent-600">Auction</span></span>
              <span className="text-[10px] text-coffee-400 tracking-[0.2em] uppercase font-medium">Premium Coffee Exchange</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollTo('auctions-section')}
              className="text-coffee-600 hover:text-coffee-900 text-sm font-semibold tracking-wide transition-colors duration-200 uppercase"
            >
              Auctions
            </button>
            <button
              onClick={() => scrollTo('about-section')}
              className="text-coffee-600 hover:text-coffee-900 text-sm font-semibold tracking-wide transition-colors duration-200 uppercase"
            >
              About
            </button>
            <button
              onClick={() => scrollTo('faq-section')}
              className="text-coffee-600 hover:text-coffee-900 text-sm font-semibold tracking-wide transition-colors duration-200 uppercase"
            >
              FAQ
            </button>

            {user ? (
              <div className="flex items-center space-x-4 pl-6 border-l border-coffee-200">
                {user.role === 'seller' && (
                  <Link
                    to="/create-auction"
                    className="flex items-center space-x-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-500 text-white px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 hover:scale-105"
                  >
                    <PlusCircle size={16} />
                    <span>Sell Beans</span>
                  </Link>
                )}
                <Link to="/profile" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-coffee-100 border border-coffee-200 flex items-center justify-center">
                    <User size={14} className="text-coffee-600" />
                  </div>
                  <span className="text-sm font-semibold text-coffee-800">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-coffee-400 hover:text-red-500 transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 pl-6 border-l border-coffee-200">
                <Link
                  to="/login"
                  className="text-coffee-700 hover:text-coffee-900 text-sm font-semibold transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-coffee-700 to-coffee-800 hover:from-coffee-800 hover:to-coffee-900 text-white px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 shadow-lg shadow-coffee-700/25 hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-coffee-700 hover:text-coffee-900 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-white/95 backdrop-blur-xl border-t border-coffee-200/50`}
      >
        <div className="px-6 py-6 flex flex-col space-y-4">
          <button onClick={() => scrollTo('auctions-section')} className="text-coffee-700 hover:text-accent-600 text-left font-semibold py-2 border-b border-coffee-100 uppercase tracking-wider text-sm transition-colors">Auctions</button>
          <button onClick={() => scrollTo('about-section')} className="text-coffee-700 hover:text-accent-600 text-left font-semibold py-2 border-b border-coffee-100 uppercase tracking-wider text-sm transition-colors">About</button>
          <button onClick={() => scrollTo('faq-section')} className="text-coffee-700 hover:text-accent-600 text-left font-semibold py-2 border-b border-coffee-100 uppercase tracking-wider text-sm transition-colors">FAQ</button>
          {user ? (
            <>
              {user.role === 'seller' && (
                <Link to="/create-auction" className="flex items-center space-x-2 text-accent-600 font-semibold py-2">
                  <PlusCircle size={18} /><span>Sell Beans</span>
                </Link>
              )}
              <Link to="/profile" className="flex items-center space-x-2 text-coffee-700 font-semibold py-2">
                <User size={18} /><span>My Profile</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center space-x-2 text-red-500 font-semibold py-2">
                <LogOut size={18} /><span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-coffee-800 font-semibold py-2">Login</Link>
              <Link to="/register" className="bg-gradient-to-r from-coffee-700 to-coffee-800 text-white px-5 py-3 rounded-full font-bold text-center">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
