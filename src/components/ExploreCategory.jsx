import React from 'react';
import { exploreCategories } from '../data/foodData';
import { ArrowUpRight } from 'lucide-react';

export const ExploreCategory = () => {
  return (
    <section id="explore" className="py-12 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#FF5E1E] mb-1">
              Diverse Flavors
            </div>
            <h2 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-[#1C1917] tracking-tight">
              Explore by Category
            </h2>
          </div>
          <p className="text-sm text-[#78716C] font-medium max-w-md">
            Browse through Kovai's top culinary traditions and signature dish categories.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {exploreCategories.map((cat) => (
            <div
              key={cat.id}
              className="relative rounded-3xl overflow-hidden shadow-soft shadow-soft-hover group h-48 cursor-pointer border border-[#F3EFE6]"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white inline-block mb-1.5">
                      {cat.count}
                    </span>
                    <h3 className="font-['Outfit'] font-bold text-lg text-white leading-snug">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#FF5E1E] transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
