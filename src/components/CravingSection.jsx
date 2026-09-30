import React from 'react';
import { cravingCategories } from '../data/foodData';
import { ChevronRight } from 'lucide-react';

export const CravingSection = () => {
  return (
    <section id="craving" className="py-12 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#FF5E1E] mb-1">
              Curated Moods
            </div>
            <h2 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-[#1C1917] tracking-tight">
              What are you craving today?
            </h2>
          </div>
          
          <div className="flex items-center space-x-1 text-sm font-bold text-[#FF5E1E] hover:text-[#E04D12] transition-colors cursor-pointer group">
            <span>Explore all categories</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Craving Category Cards Grid / Scrollable */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {cravingCategories.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFDF9] border border-[#F3EFE6] rounded-2xl p-4 text-center shadow-soft shadow-soft-hover cursor-pointer flex flex-col items-center justify-between space-y-3 group"
            >
              {/* Category Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.bg} flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform duration-300 border border-[#F3EFE6]`}>
                {item.icon}
              </div>

              {/* Title & Count */}
              <div>
                <h3 className="font-['Outfit'] font-bold text-sm text-[#1C1917] group-hover:text-[#FF5E1E] transition-colors">
                  {item.name}
                </h3>
                <span className="text-[11px] font-medium text-[#78716C] block mt-0.5">
                  {item.count}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
