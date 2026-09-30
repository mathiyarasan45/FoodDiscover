import React from 'react';
import { foodGuides } from '../data/foodData';
import { BookOpen, Clock, ArrowRight, Compass } from 'lucide-react';

export const FoodGuide = () => {
  return (
    <section className="py-12 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#FF5E1E] mb-1 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Kovai Food Culture</span>
            </div>
            <h2 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-[#1C1917] tracking-tight">
              Food Discover Guides
            </h2>
          </div>
          <p className="text-sm text-[#78716C] font-medium max-w-md">
            Handpicked food stories, local food trail reviews, and top dining recommendations across Coimbatore.
          </p>
        </div>

        {/* Guides Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {foodGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-[#FFFDF9] border border-[#F3EFE6] rounded-3xl overflow-hidden shadow-soft shadow-soft-hover flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#1C1917]/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                    {guide.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#78716C]">
                    <span>{guide.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#FF5E1E]" />
                      {guide.readTime}
                    </span>
                  </div>

                  <h3 className="font-['Outfit'] font-bold text-lg text-[#1C1917] group-hover:text-[#FF5E1E] transition-colors leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-[#78716C] leading-relaxed line-clamp-3">
                    {guide.summary}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="px-6 pb-6 pt-2">
                <button className="flex items-center space-x-2 text-xs font-bold text-[#FF5E1E] group-hover:text-[#E04D12] transition-colors cursor-pointer">
                  <span>Read full guide</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
