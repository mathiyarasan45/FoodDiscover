import React from 'react';
import { Bot, Sparkles, Send, Star, Clock, ChefHat } from 'lucide-react';
import { aiPrompts } from '../data/foodData';

export const AiFoodAssistant = () => {
  return (
    <section className="py-12 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main AI Feature Banner Container */}
        <div className="bg-[#FFFDF9] border border-[#F3EFE6] rounded-3xl p-6 sm:p-10 shadow-soft relative overflow-hidden">
          
          {/* Subtle Orange Glow in Background */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF5E1E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left AI Description & Prompts */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FF5E1E]/10 border border-[#FF5E1E]/20 px-3.5 py-1.5 rounded-full">
                <Bot className="w-4 h-4 text-[#FF5E1E]" />
                <span className="text-xs font-extrabold text-[#FF5E1E] uppercase tracking-wider">
                  Taste Match AI Assistant
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#FF5E1E]" />
              </div>

              {/* Title */}
              <h2 className="font-['Outfit'] font-extrabold text-3xl sm:text-4xl text-[#1C1917] tracking-tight leading-tight">
                Not sure what to order? <br />
                Let <span className="text-[#FF5E1E]">Foodie AI</span> guide your cravings.
              </h2>

              <p className="text-sm sm:text-base text-[#78716C] font-medium leading-relaxed max-w-xl">
                Tell our smart food assistant your mood, budget, or dietary preferences. We'll curate the perfect dish from top Coimbatore kitchens instantly.
              </p>

              {/* Prompt Suggestions */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] block">
                  Try asking:
                </span>
                <div className="flex flex-wrap gap-2">
                  {aiPrompts.map((promptText, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAF6F0] hover:bg-[#FF5E1E]/10 border border-[#F3EFE6] px-3.5 py-2 rounded-xl text-xs font-semibold text-[#1C1917] flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-[#FF5E1E]" />
                      <span>"{promptText}"</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fake AI Input Bar */}
              <div className="pt-2 max-w-xl">
                <div className="bg-[#FAF6F0] border border-[#F3EFE6] p-2 rounded-2xl flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Ask AI: e.g. Recommend a cozy cafe for coffee & pasta in Race Course..."
                    className="bg-transparent px-3 text-xs sm:text-sm text-[#1C1917] placeholder-[#78716C] w-full focus:outline-none font-medium"
                    readOnly
                  />
                  <button className="bg-[#FF5E1E] text-white p-3 rounded-xl hover:bg-[#E04D12] transition-colors shadow-orange-glow shrink-0">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right AI Match Preview Card (UI Only) */}
            <div className="lg:col-span-5 flex justify-center">
              
              <div className="w-full max-w-md bg-[#FAF6F0] border border-[#F3EFE6] rounded-2xl p-5 shadow-soft space-y-4">
                
                {/* AI Chat Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F3EFE6]">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF5E1E] to-[#FF8C38] flex items-center justify-center text-white shadow-sm">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-['Outfit'] font-bold text-sm text-[#1C1917]">Foodie AI Recommendation</div>
                      <div className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                        98% Flavor Match
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#78716C] uppercase bg-[#FFFDF9] px-2 py-1 rounded-md border border-[#F3EFE6]">
                    Coimbatore
                  </span>
                </div>

                {/* AI Recommendation Result Card */}
                <div className="bg-[#FFFDF9] border border-[#F3EFE6] rounded-xl p-3.5 flex gap-3 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80"
                    alt="AI Recommended Dish"
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#FF5E1E] uppercase tracking-wider">
                      Chef's Top Pick
                    </span>
                    <h4 className="font-['Outfit'] font-bold text-sm text-[#1C1917] leading-tight">
                      Special Ghee Roast Dosa Platter
                    </h4>
                    <p className="text-[11px] font-medium text-[#78716C]">
                      Anapoorna Classic • RS Puram
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs font-extrabold text-[#1C1917]">₹140</span>
                      <span className="text-[10px] font-bold bg-amber-500/10 text-amber-700 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-500" /> 4.9
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Reason Note */}
                <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl text-[11px] font-medium text-emerald-900 flex items-start gap-2">
                  <ChefHat className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>"Selected because you searched for authentic South Indian breakfast with top reviews in RS Puram!"</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
