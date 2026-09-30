import React from 'react';
import { Utensils, Heart, Globe, MessageCircle, Share2, Mail } from 'lucide-react';

export const Footer = ({ onNavigateTab }) => {
  return (
    <footer className="bg-[#1C1917] text-white pt-14 pb-10 border-t border-[#38322E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#38322E]">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF5E1E] to-[#FF8C38] flex items-center justify-center text-white shadow-orange-glow">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="font-['Outfit'] font-extrabold text-2xl tracking-tight text-white">
                Food<span className="text-[#FF5E1E]">Discover</span>
              </span>
            </div>
            
            <p className="text-xs text-stone-400 leading-relaxed max-w-md font-medium">
              Food Discover is Coimbatore's premier food discovery platform. Discover authentic food dishes, food seller/hotel details, reviews, rating breakdowns, location insights, and special discount offers.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-['Outfit'] font-bold text-sm uppercase tracking-wider text-[#FF5E1E]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
              <li><button onClick={() => onNavigateTab('home')} className="hover:text-[#FF5E1E] transition-colors">Home</button></li>
              <li><button onClick={() => onNavigateTab('categories')} className="hover:text-[#FF5E1E] transition-colors">Categories (Cuisines & Sellers)</button></li>
              <li><button onClick={() => onNavigateTab('offers')} className="hover:text-[#FF5E1E] transition-colors">Special Offers</button></li>
              <li><button onClick={() => onNavigateTab('wishlist')} className="hover:text-[#FF5E1E] transition-colors">Wishlist</button></li>
              <li><button onClick={() => onNavigateTab('account')} className="hover:text-[#FF5E1E] transition-colors">Account & Settings</button></li>
            </ul>
          </div>

          {/* Kovai Areas */}
          <div className="space-y-3">
            <h4 className="font-['Outfit'] font-bold text-sm uppercase tracking-wider text-[#FF5E1E]">
              Discovery Locations
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
              <li>RS Puram, Coimbatore</li>
              <li>Peelamedu & Hopes</li>
              <li>Gandhipuram Hub</li>
              <li>Saibaba Colony</li>
              <li>Race Course Road</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div className="flex items-center space-x-1.5">
            <span>© 2026 Food Discover. Built with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF5E1E] fill-[#FF5E1E]" />
            <span>for Coimbatore foodies.</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hover:text-[#FF5E1E] cursor-pointer"><Globe className="w-4 h-4" /></span>
            <span className="hover:text-[#FF5E1E] cursor-pointer"><MessageCircle className="w-4 h-4" /></span>
            <span className="hover:text-[#FF5E1E] cursor-pointer"><Share2 className="w-4 h-4" /></span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
