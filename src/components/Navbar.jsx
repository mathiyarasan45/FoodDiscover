import React, { useState } from 'react';
import { Utensils, MapPin, Menu, X, Heart, Home, Grid, Tag, User } from 'lucide-react';
import { currentLocationName } from '../data/foodData';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'categories', label: 'Categories', icon: Grid },
    { id: 'offers', label: 'Offers', icon: Tag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'account', label: 'Account', icon: User },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#F3EFE6] shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo & Current Location Display Only */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 group focus:outline-none text-left"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF5E1E] to-[#FF8C38] flex items-center justify-center shadow-orange-glow transform group-hover:scale-105 transition-transform duration-300">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Outfit'] font-extrabold text-2xl tracking-tight text-[#1C1917] flex items-center gap-1">
                  Food<span className="text-[#FF5E1E]">Discover</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#78716C] -mt-1">
                  Taste & Crave
                </span>
              </div>
            </button>

            {/* Current Location Display Only (No picker/modal per requirement) */}
            <div className="hidden md:flex items-center space-x-2 bg-[#FAF6F0] border border-[#F3EFE6] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#1C1917]">
              <MapPin className="w-4 h-4 text-[#FF5E1E] shrink-0" />
              <span className="font-semibold text-xs text-[#78716C] uppercase tracking-wider">Location:</span>
              <span className="font-bold text-[#1C1917]">{currentLocationName}</span>
            </div>
          </div>

          {/* Middle/Right: Desktop Navigation Links (EXACTLY 5 Items) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#FF5E1E] text-white shadow-orange-glow'
                      : 'text-[#1C1917] hover:bg-[#FAF6F0] hover:text-[#FF5E1E]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#78716C]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Right: Menu Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button 
              className="p-2.5 rounded-xl text-[#1C1917] hover:bg-[#FAF6F0] focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF9] border-b border-[#F3EFE6] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fade-in">
          <div className="flex items-center space-x-2 bg-[#FAF6F0] p-3 rounded-xl text-xs font-medium text-[#1C1917] mb-2">
            <MapPin className="w-4 h-4 text-[#FF5E1E] shrink-0" />
            <span className="font-semibold text-[#78716C] uppercase">Location:</span>
            <span className="font-bold text-[#1C1917]">{currentLocationName}</span>
          </div>
          
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    isActive
                      ? 'bg-[#FF5E1E] text-white shadow-orange-glow'
                      : 'text-[#1C1917] hover:bg-[#FAF6F0]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
