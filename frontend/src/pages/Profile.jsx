import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { User, Mail, Lock, CheckCircle, Package, ShoppingBag, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('settings');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [myAuctions, setMyAuctions] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchMyActivity = async () => {
      try {
        const { data } = await api.get('/auctions');
        const currentUserId = user?._id;
        const sales = data.filter(a => (a.seller?._id === currentUserId || a.seller === currentUserId) && a.isPaid);
        const wins = data.filter(a => (a.highestBidder?._id === currentUserId || a.highestBidder === currentUserId) && (a.status === 'completed' || a.isPaid));
        setMyAuctions(sales);
        setMyOrders(wins);
      } catch (err) {
        console.error('Error fetching activity', err);
      }
    };
    if (user) fetchMyActivity();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { name: formData.name, email: formData.email };
      if (formData.password) payload.password = formData.password;
      const { data } = await api.put('/auth/profile', payload);
      login(data);
      setSuccess(true);
      setFormData({ ...formData, password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#D87D4A]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1A110B]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-[380px_1fr] gap-12 items-start">

          {/* Sidebar Card */}
          <aside className="space-y-8 animate-reveal">
            <div className="bg-white rounded-[48px] border border-[#EAE3DC] p-10 shadow-[0_40px_80px_-20px_rgba(26,17,11,0.08)]">
              <div className="relative mb-10 group">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#D87D4A] to-[#1A110B] rounded-[40px] flex items-center justify-center text-5xl text-white font-serif-custom shadow-2xl relative z-10 group-hover:rotate-6 transition-transform duration-700">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="absolute inset-0 bg-[#D87D4A] rounded-[40px] blur-3xl opacity-30 scale-110 group-hover:scale-125 transition-all duration-700"></div>
              </div>

              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#1A110B] mb-2 tracking-tight">{user?.name}</h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF9F6] border border-[#EAE3DC] rounded-full">
                  <span className={`w-2 h-2 rounded-full ${user?.role === 'seller' ? 'bg-[#D87D4A]' : 'bg-[#1A110B]'}`}></span>
                  <span className="text-[10px] font-black text-[#A89F98] uppercase tracking-widest">{user?.role} Account</span>
                </div>
              </div>

              <nav className="space-y-4">
                {[
                  { id: 'settings', label: 'Security & Profile', icon: <User size={18} /> },
                  { id: 'activity', label: 'Market Activity', icon: <Package size={18} /> },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 p-5 rounded-3xl font-bold text-sm transition-all duration-500 ${activeTab === tab.id
                        ? 'bg-[#1A110B] text-white shadow-xl translate-x-2'
                        : 'text-[#A89F98] hover:bg-[#FAF9F6] hover:text-[#1A110B]'
                      }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>

              <div className="mt-12 pt-12 border-t border-[#FAF9F6]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F6] p-4 rounded-3xl text-center">
                    <p className="text-[9px] font-black text-[#A89F98] uppercase tracking-widest mb-1">Won</p>
                    <p className="text-xl font-black text-[#1A110B]">{myOrders.length}</p>
                  </div>
                  <div className="bg-[#FAF9F6] p-4 rounded-3xl text-center">
                    <p className="text-[9px] font-black text-[#A89F98] uppercase tracking-widest mb-1">Sold</p>
                    <p className="text-xl font-black text-[#1A110B]">{myAuctions.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="animate-reveal" style={{ animationDelay: '0.2s' }}>
            {activeTab === 'settings' ? (
              <div className="bg-white rounded-[56px] border border-[#EAE3DC] p-10 md:p-16 shadow-[0_50px_100px_-20px_rgba(26,17,11,0.05)]">
                <div className="mb-14">
                  <h1 className="text-5xl font-medium text-[#1A110B] tracking-tighter mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Account <span className="italic text-[#D87D4A]">Synchronization</span>
                  </h1>
                  <p className="text-[#A89F98] text-lg font-medium">Manage your digital identity and security credentials.</p>
                </div>

                {success && (
                  <div className="mb-10 p-6 bg-green-50 border border-green-100 rounded-[32px] flex items-center text-green-700">
                    <CheckCircle size={24} className="mr-4 shrink-0 text-green-500" />
                    <p className="font-bold">Security profile updated successfully.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-[#A89F98] uppercase tracking-[0.4em] ml-2">Legal Identity</label>
                      <div className="relative group">
                        <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D87D4A]" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-16 pr-8 py-6 bg-[#FAF9F6] border border-transparent focus:bg-white focus:border-[#D87D4A] rounded-[28px] outline-none transition-all duration-500 font-bold text-[#1A110B]"
                          placeholder="Your Name"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-[#A89F98] uppercase tracking-[0.4em] ml-2">Communication</label>
                      <div className="relative group">
                        <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D87D4A]" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-16 pr-8 py-6 bg-[#FAF9F6] border border-transparent focus:bg-white focus:border-[#D87D4A] rounded-[28px] outline-none transition-all duration-500 font-bold text-[#1A110B]"
                          placeholder="Your Email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#A89F98] uppercase tracking-[0.4em] ml-2">Security Hash (Optional)</label>
                    <div className="relative group">
                      <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D87D4A]" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-16 pr-8 py-6 bg-[#FAF9F6] border border-transparent focus:bg-white focus:border-[#D87D4A] rounded-[28px] outline-none transition-all duration-500 font-bold text-[#1A110B]"
                        placeholder="Enter new password to update"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-8 bg-[#1A110B] hover:bg-[#D87D4A] text-white rounded-[32px] font-black text-xs tracking-[0.4em] uppercase transition-all duration-700 shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-4"
                  >
                    {loading ? 'Encrypting Data...' : 'Synchronize Profile'}
                    <ArrowRight size={20} />
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Wins Section */}
                <div className="bg-white rounded-[56px] border border-[#EAE3DC] p-10 md:p-16 shadow-sm">
                  <div className="flex items-center justify-between mb-12">
                    <div>
                      <h2 className="text-4xl font-bold text-[#1A110B] tracking-tight mb-2">Acquisition History</h2>
                      <p className="text-[#A89F98] text-sm font-medium uppercase tracking-[0.2em]">Micro-lots you have secured</p>
                    </div>
                    <div className="w-16 h-16 bg-[#FAF9F6] rounded-[24px] flex items-center justify-center text-[#D87D4A]">
                      <ShoppingBag size={28} />
                    </div>
                  </div>

                  {myOrders.length === 0 ? (
                    <div className="text-center py-20 bg-[#FAF9F6] rounded-[40px] border-2 border-dashed border-[#EAE3DC]">
                      <p className="text-[#A89F98] font-bold text-lg">No acquisitions found.</p>
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      {myOrders.map(a => (
                        <div key={a._id} className="flex items-center gap-8 p-6 bg-[#FAF9F6] hover:bg-white border border-transparent hover:border-[#D87D4A]/20 rounded-[32px] transition-all duration-500 group">
                          <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-lg border border-white">
                            <img 
                              src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop" 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              alt={a.title}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-[#1A110B] mb-1">{a.title}</h4>
                            <p className="text-[10px] font-black text-[#A89F98] uppercase tracking-widest">{a.origin}</p>
                          </div>
                          <div className="text-right pr-4">
                            <span className="text-[9px] font-black text-[#A89F98] uppercase tracking-widest block mb-1">Settled Price</span>
                            <p className="text-2xl font-black text-[#D87D4A] tracking-tighter">${a.currentBid}</p>
                          </div>
                          <Link to={`/auction/${a._id}`} className="w-14 h-14 bg-white text-[#1A110B] rounded-2xl flex items-center justify-center hover:bg-[#1A110B] hover:text-white transition-all shadow-sm">
                            <ArrowRight size={22} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {user?.role === 'seller' && (
                  <div className="bg-white rounded-[56px] border border-[#EAE3DC] p-10 md:p-16 shadow-sm">
                    <div className="flex items-center justify-between mb-12">
                      <div>
                        <h2 className="text-4xl font-bold text-[#1A110B] tracking-tight mb-2">Export Logistics</h2>
                        <p className="text-[#A89F98] text-sm font-medium uppercase tracking-[0.2em]">Completed sales awaiting dispatch</p>
                      </div>
                      <div className="w-16 h-16 bg-[#FAF9F6] rounded-[24px] flex items-center justify-center text-[#D87D4A]">
                        <Package size={28} />
                      </div>
                    </div>

                    {myAuctions.length === 0 ? (
                      <div className="text-center py-20 bg-[#FAF9F6] rounded-[40px] border-2 border-dashed border-[#EAE3DC]">
                        <p className="text-[#A89F98] font-bold text-lg">No active exports.</p>
                      </div>
                    ) : (
                      <div className="grid gap-6">
                        {myAuctions.map(a => (
                          <div key={a._id} className="flex items-center gap-8 p-6 bg-[#FAF9F6] hover:bg-white border border-transparent hover:border-[#D87D4A]/20 rounded-[32px] transition-all duration-500 group">
                            <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-lg border border-white">
                              <img 
                                src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop" 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                alt={a.title}
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-[#1A110B] mb-1">{a.title}</h4>
                              <p className="text-[10px] font-black text-[#A89F98] uppercase tracking-widest">{a.origin}</p>
                            </div>
                            <div className="text-right pr-4">
                              <span className="text-[9px] font-black text-[#A89F98] uppercase tracking-widest block mb-1">Export Value</span>
                              <p className="text-2xl font-black text-[#D87D4A] tracking-tighter">${a.currentBid}</p>
                            </div>
                            <Link to={`/auction/${a._id}`} className="w-14 h-14 bg-white text-[#1A110B] rounded-2xl flex items-center justify-center hover:bg-[#1A110B] hover:text-white transition-all shadow-sm">
                              <ArrowRight size={22} />
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
