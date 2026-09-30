import React from 'react';
import { todaysOffers } from '../data/foodData';
import { Tag, Copy, Sparkles, Gift } from 'lucide-react';

export const TodaysOffers = () => {
  return (
    <section id="offers" className="py-12 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#FF5E1E] mb-1 flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5" />
              <span>Special Discounts</span>
            </div>
            <h2 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-[#1C1917] tracking-tight">
              Today's Offers
            </h2>
          </div>
          <p className="text-sm text-[#78716C] font-medium">
            Use promo codes at checkout to unlock exclusive Kovai food savings.
          </p>
        </div>

        {/* Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {todaysOffers.map((offer) => (
            <div
              key={offer.id}
              className={`rounded-3xl p-6 ${offer.bgColor} ${offer.textColor} shadow-soft shadow-soft-hover relative overflow-hidden flex flex-col justify-between space-y-6 group`}
            >
              {/* Background Decorative Circles */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                    {offer.validity}
                  </span>
                </div>

                <h3 className="font-['Outfit'] font-extrabold text-xl leading-snug">
                  {offer.title}
                </h3>
                <p className="text-xs font-medium text-white/80 mt-1">
                  {offer.subtitle}
                </p>
              </div>

              {/* Coupon Code Pill & Copy Button */}
              <div className="bg-white/15 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/70 font-semibold block">
                    Promo Code
                  </span>
                  <span className="font-mono font-bold text-base tracking-wider text-white">
                    {offer.code}
                  </span>
                </div>

                {/* Copy Button (UI Only) */}
                <button className="bg-white text-[#1C1917] hover:bg-stone-100 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer">
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
