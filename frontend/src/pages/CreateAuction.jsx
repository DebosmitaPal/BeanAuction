import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Sparkles } from 'lucide-react';

const CreateAuction = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    origin: '',
    roastLevel: '',
    startingPrice: '',
    durationHours: '2',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endTime = new Date();
      endTime.setHours(endTime.getHours() + parseInt(formData.durationHours));

      const response = await api.post('/auctions', {
        ...formData,
        endTime: endTime.toISOString()
      });
      navigate(`/auction/${response.data._id}`);
    } catch (error) {
      console.error('Error creating auction', error);
      alert('Failed to create auction');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-md border border-[#E5E0D8] bg-transparent text-[#4A3C34] font-medium placeholder:text-[#A89F98] focus:border-[#A67A64] focus:ring-1 focus:ring-[#A67A64] outline-none transition-all";
  const labelClasses = "block text-[11px] font-bold text-[#A67A64] uppercase tracking-wider mb-1.5";

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans pt-20">
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float 6s ease-in-out 3s infinite;
          }
          .font-serif-custom {
            font-family: 'Playfair Display', 'Merriweather', Georgia, serif;
          }
        `}
      </style>

      {/* Subtle background dot pattern similar to screenshot 2 */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 min-h-[85vh]">
          
          {/* Left Text & Form Column */}
          <div className="flex-1 w-full max-w-xl py-12">
            <div className="inline-flex items-center gap-2 mb-4 text-[#A67A64]">
              <Sparkles size={18} strokeWidth={1.5} />
              <span className="text-sm font-medium tracking-wide">We make auction</span>
            </div>
            
            {/* Huge 'magic.' style heading */}
            <h1 className="text-[90px] md:text-[130px] font-medium text-[#6B4B3E] tracking-tight mb-6 font-serif-custom leading-[0.85]">
              create.
            </h1>
            
            <p className="text-[#8C7A70] text-sm leading-relaxed mb-10 max-w-md">
              Your exceptional coffee deserves an exceptional audience. Fill out the details below to start your auction and connect directly with elite roasters worldwide.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className={labelClasses}>Listing Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g. Ethiopian Yirgacheffe Grade 1"
                  />
                </div>

                <div className="col-span-2">
                  <label className={labelClasses}>Description</label>
                  <textarea
                    name="description"
                    required
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className={inputClasses + " resize-none"}
                    placeholder="Describe the flavor profile, processing method, and origin story..."
                  ></textarea>
                </div>

                <div>
                  <label className={labelClasses}>Origin</label>
                  <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Country/Region"
                  />
                </div>

                <div>
                  <label className={labelClasses}>Roast Level</label>
                  <select
                    name="roastLevel"
                    value={formData.roastLevel}
                    onChange={handleChange}
                    className={inputClasses + " cursor-pointer"}
                  >
                    <option value="">Select Roast Level</option>
                    <option value="Light">Light</option>
                    <option value="Medium">Medium</option>
                    <option value="Medium-Dark">Medium-Dark</option>
                    <option value="Dark">Dark</option>
                    <option value="Unroasted (Green)">Unroasted (Green)</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Starting Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#A67A64]">$</span>
                    <input
                      type="number"
                      name="startingPrice"
                      min="1"
                      step="0.01"
                      required
                      value={formData.startingPrice}
                      onChange={handleChange}
                      className={inputClasses + " pl-8"}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Duration</label>
                  <select
                    name="durationHours"
                    value={formData.durationHours}
                    onChange={handleChange}
                    className={inputClasses + " cursor-pointer"}
                  >
                    <option value="1">1 Hour</option>
                    <option value="2">2 Hours</option>
                    <option value="4">4 Hours</option>
                    <option value="8">8 Hours</option>
                    <option value="24">24 Hours (1 Day)</option>
                    <option value="48">48 Hours (2 Days)</option>
                  </select>
                </div>


              </div>

              <div className="pt-6 flex items-center gap-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-10 py-3.5 rounded-md font-bold text-white tracking-wide transition-all ${
                    loading 
                      ? 'bg-[#D5CFC8] cursor-not-allowed' 
                      : 'bg-[#B3856D] hover:bg-[#9D715A] shadow-md shadow-[#B3856D]/30 hover:-translate-y-0.5'
                  }`}
                >
                  {loading ? 'Processing...' : 'Start Auction'}
                </button>
                <div className="text-[#6B4B3E] font-serif-custom text-3xl font-medium tracking-tight">
                  {formData.startingPrice ? `$ ${parseFloat(formData.startingPrice).toFixed(2)}` : '$ 0.00'}
                </div>
              </div>
            </form>
          </div>

          {/* Right Image Column - Beautiful Avatar / Hero Image */}
          <div className="hidden lg:flex flex-1 relative items-center justify-center w-full h-full">
            {/* Decorative splash lines like in screenshot 2 */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <svg className="absolute top-[10%] right-[10%] w-64 h-64 opacity-60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 50 L80 20" stroke="#B3856D" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 4"/>
                <path d="M50 50 L90 50" stroke="#B3856D" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 4"/>
                <path d="M50 50 L75 85" stroke="#B3856D" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 4"/>
              </svg>
            </div>
            
            {/* The beautiful generated image */}
            <img 
              src="/hero-bag.png" 
              alt="Premium Coffee Product" 
              className="w-full max-w-[550px] object-contain drop-shadow-[0_30px_40px_rgba(107,75,62,0.15)] z-10 animate-float"
            />

            {/* Floating 'chocolate balls' replaced with coffee-themed glossy elements */}
            <div className="absolute top-[20%] right-[15%] w-8 h-8 rounded-full bg-gradient-to-br from-[#A67A64] to-[#6B4B3E] shadow-lg z-20 animate-float-delayed drop-shadow-xl border border-[#D8C7BC]/30">
              <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full blur-[1px]"></div>
            </div>
            <div className="absolute bottom-[20%] left-[5%] w-14 h-14 rounded-full bg-gradient-to-br from-[#8D6550] to-[#4A3022] shadow-2xl z-20 animate-float drop-shadow-2xl border border-[#D8C7BC]/20">
              <div className="absolute top-2 left-2 w-4 h-3 bg-white/30 rounded-full blur-[1.5px] transform -rotate-45"></div>
            </div>
            <div className="absolute top-[60%] left-[10%] w-5 h-5 rounded-full bg-gradient-to-br from-[#C4A491] to-[#8D6550] shadow-md z-0 animate-float-delayed opacity-80 border border-white/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;
