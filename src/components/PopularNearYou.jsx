import React from 'react';
import { popularNearYou } from '../data/foodData';
import { Star, Clock, Heart, Plus, Sparkles, MapPin } from 'lucide-react';

export const PopularNearYou = () => {
  return (
    <section id="restaurants" className="py-12 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#FF5E1E] mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trending Kitchens in Coimbatore</span>
            </div>
            <h2 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-[#1C1917] tracking-tight">
              Popular Near You
            </h2>
          </div>

          {/* Quick Filter Tabs (UI Only) */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
            <button className="bg-[#1C1917] text-white text-xs font-bold px-4 py-2 rounded-xl">
              All Spots
            </button>
            <button className="bg-[#FFFDF9] hover:bg-[#F5EFEB] border border-[#F3EFE6] text-[#1C1917] text-xs font-bold px-4 py-2 rounded-xl transition-colors">
              Pure Veg 🥬
            </button>
            <button className="bg-[#FFFDF9] hover:bg-[#F5EFEB] border border-[#F3EFE6] text-[#1C1917] text-xs font-bold px-4 py-2 rounded-xl transition-colors">
              Fast Delivery ⚡
            </button>
            <button className="bg-[#FFFDF9] hover:bg-[#F5EFEB] border border-[#F3EFE6] text-[#1C1917] text-xs font-bold px-4 py-2 rounded-xl transition-colors">
              Top Rated ⭐
            </button>
          </div>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularNearYou.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFDF9] border border-[#F3EFE6] rounded-3xl overflow-hidden shadow-soft shadow-soft-hover flex flex-col justify-between group"
            >
              <div>
                {/* Food Image & Badge Container */}
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay for discount tag readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-[#FFFDF9]/90 backdrop-blur-md text-[#1C1917] text-[11px] font-extrabold px-3 py-1 rounded-full border border-[#F3EFE6] shadow-sm">
                      {item.badge}
                    </span>

                    {/* Favorite Heart Button (UI Only) */}
                    <button className="w-9 h-9 rounded-full bg-[#FFFDF9]/80 backdrop-blur-md border border-[#F3EFE6] flex items-center justify-center text-[#1C1917] hover:text-[#FF5E1E] transition-colors shadow-sm">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Discount Tag */}
                  <div className="absolute bottom-3 left-3 bg-[#FF5E1E] text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-orange-glow flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{item.discount}</span>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-5 space-y-3">
                  
                  {/* Title & Veg Indicator */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-['Outfit'] font-bold text-lg text-[#1C1917] group-hover:text-[#FF5E1E] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    {/* Veg/Non-Veg Tag */}
                    <span className={`w-4 h-4 rounded-sm border-2 ${item.isVeg ? 'border-emerald-600 bg-emerald-50' : 'border-red-600 bg-red-50'} flex items-center justify-center shrink-0 mt-1`}>
                      <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
                    </span>
                  </div>

                  {/* Cuisine & Location */}
                  <p className="text-xs font-medium text-[#78716C] line-clamp-1">
                    {item.cuisine}
                  </p>
                  
                  <div className="flex items-center text-[11px] font-semibold text-[#78716C] gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5E1E]" />
                    <span>{item.location}</span>
                  </div>

                </div>
              </div>

              {/* Bottom Meta & Action Bar */}
              <div className="px-5 pb-5 pt-3 border-t border-[#F3EFE6] bg-[#FAF6F0]/50 flex items-center justify-between">
                
                {/* Rating & Delivery stats */}
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1 bg-amber-500/10 text-amber-700 px-2 py-1 rounded-lg font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{item.rating}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-[#78716C] font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#78716C]" />
                    <span>{item.deliveryTime}</span>
                  </div>
                </div>

                {/* Price & Add Button */}
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-extrabold text-[#1C1917]">
                    {item.priceForTwo}
                  </span>

                  {/* Visual Add Button (UI Only) */}
                  <button className="bg-[#1C1917] hover:bg-[#FF5E1E] text-white p-2 rounded-xl font-bold text-xs flex items-center justify-center transition-colors shadow-sm">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
