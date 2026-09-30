import React from 'react';
import { Search, Sparkles, Star, Clock, Flame } from 'lucide-react';
import { heroShortcuts } from '../data/foodData';

export const HeroSection = () => {
  return (
    <section id="home" className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      
      {/* Background Decorative Warm Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-[#FF5E1E]/5 via-[#FF8C38]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#FFFDF9] border border-[#F3EFE6] px-4 py-2 rounded-full shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5E1E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5E1E]"></span>
              </span>
              <span className="text-xs font-bold text-[#1C1917] tracking-wide uppercase">
                #1 Food Discovery Platform in Coimbatore
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#FF5E1E]" />
            </div>

            {/* Main Headline */}
            <h1 className="font-['Outfit'] font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#1C1917] tracking-tight leading-[1.15]">
              Discover the food <br className="hidden sm:inline" />
              you'll <span className="relative inline-block text-[#FF5E1E] underline decoration-wavy decoration-[#FF8C38]/40 underline-offset-8">love.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#78716C] max-w-xl leading-relaxed font-medium">
              Find top-rated restaurants, authentic homemade food, crispy snacks, artisan bakeries, and late-night cravings — all in one place.
            </p>

            {/* Search Bar Input */}
            <div className="bg-[#FFFDF9] p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-[#F3EFE6] shadow-soft max-w-2xl">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex items-center space-x-3 px-3 w-full flex-1">
                  <Search className="w-5 h-5 text-[#FF5E1E] shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for food, restaurants or cuisines in Coimbatore..."
                    className="w-full bg-transparent text-sm sm:text-base font-medium text-[#1C1917] placeholder-[#78716C] focus:outline-none"
                    readOnly
                  />
                </div>
                <button className="w-full sm:w-auto bg-gradient-to-r from-[#FF5E1E] to-[#FF8C38] hover:from-[#E04D12] hover:to-[#FF5E1E] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl sm:rounded-2xl shadow-orange-glow transition-all duration-300 transform active:scale-95 shrink-0 flex items-center justify-center gap-2">
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Food Shortcut Chips */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#78716C] uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-[#FF5E1E]" />
                <span>Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {heroShortcuts.map((chip) => (
                  <button
                    key={chip.id}
                    className="flex items-center space-x-2 bg-[#FFFDF9] hover:bg-[#FF5E1E] hover:text-white border border-[#F3EFE6] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#1C1917] shadow-sm transition-all duration-300 group cursor-pointer"
                  >
                    <span className="text-base group-hover:scale-110 transition-transform">{chip.icon}</span>
                    <span>{chip.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Hero Image Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Card Graphic Wrapper */}
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Main Appetizing Food Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFDF9]">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80"
                  alt="Authentic Dum Biryani Showcase"
                  className="w-full h-[380px] sm:h-[460px] object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Soft gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="bg-[#FF5E1E] text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full w-max mb-2">
                    Chef's Kovai Special
                  </span>
                  <h3 className="font-['Outfit'] font-bold text-2xl text-white">
                    Seeraga Samba Mutton Biryani
                  </h3>
                  <p className="text-xs text-stone-200 mt-1">
                    Served with Brinjal Gravy & Onion Raitha • Kovai Dum Hub
                  </p>
                </div>
              </div>

              {/* Floating Stat Card 1 (Top Left) */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-[#FFFDF9] border border-[#F3EFE6] p-3.5 sm:p-4 rounded-2xl shadow-soft flex items-center space-x-3 animate-pulse-subtle">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#1C1917]">4.9 ⭐ Rating</div>
                  <div className="text-[11px] font-medium text-[#78716C]">From 10,000+ Foodies</div>
                </div>
              </div>

              {/* Floating Stat Card 2 (Bottom Right) */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-[#FFFDF9] border border-[#F3EFE6] p-3.5 sm:p-4 rounded-2xl shadow-soft flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF5E1E]/10 flex items-center justify-center text-[#FF5E1E]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#1C1917]">25 Mins</div>
                  <div className="text-[11px] font-medium text-[#78716C]">Fast Super Delivery</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
