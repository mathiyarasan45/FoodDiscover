import React, { useState, useEffect } from 'react';
import { Search, Sparkles, MapPin, Star, Heart, Store, ChevronRight, Tag, Flame, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';
import { currentLocationName, recentSearches } from '../data/foodData';
import { getCuisines, getFoodItemsByCuisine, getFoodSellersByType, getOffersByCategory } from '../services/api';

export const HomePage = ({ onSelectFood, onSelectSeller, onNavigateTab, isWishlisted, onToggleWishlist }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAiNotice, setShowAiNotice] = useState(false);

  // Data states from DB Service
  const [foods, setFoods] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchHomeData() {
      try {
        setIsLoading(true);
        const [foodData, sellerData, offerData, cuisineData] = await Promise.all([
          getFoodItemsByCuisine('All'),
          getFoodSellersByType('All'),
          getOffersByCategory('All'),
          getCuisines()
        ]);
        if (isMounted) {
          setFoods(foodData || []);
          setSellers(sellerData || []);
          setOffers(offerData || []);
          setCuisines(cuisineData || []);
        }
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchHomeData();
    return () => { isMounted = false; };
  }, []);

  // Filter foods and sellers based on search query
  const filteredFoods = searchQuery.trim() === ''
    ? foods
    : foods.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const filteredSellers = searchQuery.trim() === ''
    ? sellers
    : sellers.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.typeName && s.typeName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        s.location.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Varieties to show in Section 2.4
  const homeVarieties = [
    { id: 'c-parotta', name: 'Parotta', icon: '🫓', image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=600&q=80' },
    { id: 'c-biryani', name: 'Biryani', icon: '🍲', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80' },
    { id: 'c-italian', name: 'Pizza', icon: '🍕', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80' },
    { id: 'c-fast-food', name: 'Burger', icon: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80' },
    { id: 'c-ice-cream', name: 'Ice Cream', icon: '🍨', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80' },
    { id: 'c-healthy-food', name: 'Healthy Food', icon: '🥗', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80' },
    { id: 'c-other-food', name: 'Other Varieties', icon: '✨', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* 2.1 CURRENT LOCATION BAR */}
      <section className="bg-[#FFFDF9] border-b border-[#F3EFE6] py-3 px-4 sm:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-[#1C1917]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5E1E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5E1E]"></span>
            </span>
            <span className="text-[#78716C] uppercase font-bold text-[11px] tracking-wider">Current Location:</span>
            <span className="font-extrabold text-[#1C1917] flex items-center gap-1">
              <MapPin className="w-4 h-4 text-[#FF5E1E]" />
              {currentLocationName}
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-xs font-bold text-[#FF5E1E] bg-[#FF5E1E]/10 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Food Discovery Platform</span>
          </div>
        </div>
      </section>

      {/* HERO & 2.2 MAIN SEARCH BAR + 2.3 FOOD ASSISTANT BUTTON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-gradient-to-br from-[#FFFDF9] to-[#FAF6F0] p-6 sm:p-10 rounded-3xl border border-[#F3EFE6] shadow-soft space-y-6">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 bg-white border border-[#F3EFE6] px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#FF5E1E] shadow-2xs">
              <Flame className="w-3.5 h-3.5" />
              <span>DISCOVER KOVAI'S FINEST FLAVORS</span>
            </div>
            
            <h1 className="font-['Outfit'] font-extrabold text-3xl sm:text-5xl text-[#1C1917] tracking-tight leading-tight">
              Discover authentic food, sellers & offers near you.
            </h1>
            
            <p className="text-sm sm:text-base text-[#78716C] font-medium max-w-2xl">
              Search top-rated dishes, local food sellers, hidden mess spots, and exclusive discount deals across Coimbatore.
            </p>
          </div>

          {/* 2.2 SEARCH BAR + 2.3 FOOD ASSISTANT UI BUTTON */}
          <div className="relative max-w-3xl">
            <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border-2 border-[#F3EFE6] focus-within:border-[#FF5E1E] shadow-md flex items-center gap-2 transition-all">
              
              {/* Main Search Input */}
              <div className="flex items-center space-x-3 px-3 flex-1 min-w-0">
                <Search className="w-5 h-5 text-[#FF5E1E] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search food items, varieties, hotels or sellers..."
                  className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#1C1917] placeholder-[#78716C] focus:outline-none"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-bold text-[#78716C] hover:text-[#1C1917] px-2 py-1 bg-stone-100 rounded-md"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* 2.3 FOOD ASSISTANT BUTTON (UI ONLY per prompt instructions) */}
              <button
                type="button"
                onClick={() => setShowAiNotice(!showAiNotice)}
                className="bg-gradient-to-r from-[#1C1917] to-[#38322E] hover:from-[#FF5E1E] hover:to-[#FF8C38] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center gap-2 shrink-0 shadow-sm"
                title="Food Assistant (UI Only)"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Food Assistant</span>
                <span className="sm:hidden">Assistant</span>
              </button>

            </div>

            {/* UI ONLY Food Assistant Tooltip / Drawer Notice */}
            {showAiNotice && (
              <div className="mt-3 p-4 bg-white border border-[#FF5E1E]/30 rounded-2xl shadow-lg animate-fade-in flex items-start space-x-3 text-xs sm:text-sm">
                <Sparkles className="w-5 h-5 text-[#FF5E1E] shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="font-extrabold text-[#1C1917]">Food Assistant Feature (UI Helper)</div>
                  <p className="text-[#78716C] font-medium">
                    This Food Assistant button is positioned beside the search bar as requested. Click shortcut keywords like <strong>"Biryani"</strong> or <strong>"Parotta"</strong> below to quickly discover top recommendations.
                  </p>
                </div>
                <button 
                  onClick={() => setShowAiNotice(false)} 
                  className="text-[#78716C] hover:text-[#1C1917] font-bold"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 2.4 FOOD CATEGORIES / FOOD VARIETIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-['Outfit'] font-extrabold text-2xl text-[#1C1917]">
              Food Varieties & Categories
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C]">Explore popular food cravings in Coimbatore</p>
          </div>
          <button
            onClick={() => onNavigateTab('categories')}
            className="text-xs sm:text-sm font-bold text-[#FF5E1E] hover:underline flex items-center gap-1"
          >
            View All Categories <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {homeVarieties.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigateTab('categories')}
              className="group bg-[#FFFDF9] hover:bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#F3EFE6] hover:border-[#FF5E1E]/50 shadow-2xs hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-center space-y-2 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#F3EFE6] group-hover:scale-110 transition-transform bg-stone-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-xs sm:text-sm text-[#1C1917] group-hover:text-[#FF5E1E] truncate max-w-full">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 2.5 NEAR ME FOODS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-['Outfit'] font-extrabold text-2xl text-[#1C1917] flex items-center gap-2">
              <span>Near Me Foods</span>
              <span className="bg-[#FF5E1E]/10 text-[#FF5E1E] text-xs font-bold px-2.5 py-0.5 rounded-full">
                RS Puram & Near
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C]">Top dishes discovered near your current location</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredFoods.slice(0, 8).map((food) => {
            const foodImg = food.hero_image_url || food.image || (food.gallery_image_urls && food.gallery_image_urls[0]) || (food.images && food.images[0]);
            const galleryFallback = (food.gallery_image_urls && food.gallery_image_urls[0]) || (food.images && food.images[0]);
            return (
              <div
                key={food.id}
                onClick={() => onSelectFood(food)}
                className="group bg-[#FFFDF9] hover:bg-[#FAF6F0] rounded-3xl border border-[#F3EFE6] hover:border-[#FF5E1E]/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-44 overflow-hidden bg-stone-100">
                  <img
                    src={foodImg}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      if (galleryFallback && e.target.src !== galleryFallback) {
                        e.target.src = galleryFallback;
                      }
                    }}
                  />
                  
                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(food);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
                      isWishlisted(food.id) 
                        ? 'bg-white text-rose-500 shadow-md' 
                        : 'bg-black/30 text-white hover:bg-white hover:text-rose-500'
                    }`}
                    title={isWishlisted(food.id) ? "Saved in Wishlist" : "Add to Wishlist"}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted(food.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {food.badge && (
                    <span className="absolute top-3 left-3 bg-[#FF5E1E] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {food.badge}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-[#78716C] mb-1">
                      <span className="text-[#FF5E1E] font-extrabold uppercase text-[10px]">{food.cuisine}</span>
                      <span className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {food.rating}
                      </span>
                    </div>

                    <h3 className="font-['Outfit'] font-bold text-base text-[#1C1917] group-hover:text-[#FF5E1E] line-clamp-1">
                      {food.name}
                    </h3>

                    <div className="text-xs text-[#78716C] flex items-center gap-1 mt-1 truncate">
                      <Store className="w-3.5 h-3.5 text-[#FF5E1E] shrink-0" />
                      <span className="truncate font-semibold">{food.sellerName}</span>
                    </div>

                    <div className="text-[11px] text-[#78716C] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#78716C] shrink-0" />
                      <span className="truncate">{food.location}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F3EFE6] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#78716C] uppercase">Est. Price</span>
                      <div className="font-['Outfit'] font-extrabold text-lg text-[#1C1917]">₹{food.price}</div>
                    </div>
                    <span className="text-xs font-extrabold text-[#FF5E1E] group-hover:translate-x-0.5 transition-transform flex items-center">
                      Discover →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2.6 NEAR ME HOTELS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-['Outfit'] font-extrabold text-2xl text-[#1C1917]">
              Near Me Hotels & Restaurants
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C]">Top food sellers and dining spots near your area</p>
          </div>
          <button
            onClick={() => onNavigateTab('categories')}
            className="text-xs sm:text-sm font-bold text-[#FF5E1E] hover:underline flex items-center gap-1"
          >
            Explore All Sellers <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredSellers.slice(0, 3).map((seller) => {
            const sellerImg = seller.hero_image_url || seller.image || (seller.ambience_image_urls && seller.ambience_image_urls[0]) || (seller.ambienceImages && seller.ambienceImages[0]);
            const ambienceFallback = (seller.ambience_image_urls && seller.ambience_image_urls[0]) || (seller.ambienceImages && seller.ambienceImages[0]);
            return (
              <div
                key={seller.id}
                onClick={() => onSelectSeller(seller)}
                className="group bg-[#FFFDF9] hover:bg-[#FAF6F0] rounded-3xl border border-[#F3EFE6] hover:border-[#FF5E1E]/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={sellerImg}
                    alt={seller.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      if (ambienceFallback && e.target.src !== ambienceFallback) {
                        e.target.src = ambienceFallback;
                      }
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-[#1C1917] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    {seller.typeName}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-[#1C1917] text-xs font-extrabold px-2.5 py-1 rounded-xl shadow-sm flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {seller.rating} ({seller.reviewsCount})
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-['Outfit'] font-bold text-lg text-[#1C1917] group-hover:text-[#FF5E1E] truncate">
                    {seller.name}
                  </h3>
                  <p className="text-xs text-[#78716C] line-clamp-2 font-medium">
                    {seller.shortDescription}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#78716C] pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5E1E] shrink-0" />
                    <span>{seller.location}</span>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-[#F3EFE6] flex items-center justify-between text-xs font-bold text-[#FF5E1E]">
                  <span>View Full Seller Menu & Rating</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2.7 FOR YOU (PERSONALIZED DISCOVERY SUGGESTIONS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1C1917] via-[#2D2623] to-[#1C1917] p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="bg-[#FF5E1E] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                For You • Personalized Discovery
              </span>
              <h2 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-white mt-2">
                Handpicked Cravings For You Today
              </h2>
            </div>
            <button 
              onClick={() => onNavigateTab('categories')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors border border-white/20"
            >
              Browse All Recommendations
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {foods.slice(0, 3).map((food) => {
              const recImg = food.hero_image_url || food.image || (food.gallery_image_urls && food.gallery_image_urls[0]);
              const recFallback = (food.gallery_image_urls && food.gallery_image_urls[0]);
              return (
                <div
                  key={food.id}
                  onClick={() => onSelectFood(food)}
                  className="bg-white/10 hover:bg-white/20 border border-white/10 p-3.5 rounded-2xl transition-all cursor-pointer flex items-center space-x-3"
                >
                  <img
                    src={recImg}
                    alt={food.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    onError={(e) => {
                      if (recFallback && e.target.src !== recFallback) {
                        e.target.src = recFallback;
                      }
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold text-[#FF8C38] uppercase truncate">{food.cuisine}</div>
                    <div className="text-sm font-bold text-white truncate">{food.name}</div>
                    <div className="text-xs text-stone-300 font-extrabold mt-0.5">₹{food.price} • {food.sellerName}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2.8 RECENTLY SEARCHES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#F3EFE6] shadow-2xs space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#78716C] uppercase tracking-wider">
            <Flame className="w-4 h-4 text-[#FF5E1E]" />
            <span>Recently Searched Terms</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {recentSearches.map((term, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(term)}
                className="bg-[#FAF6F0] hover:bg-[#FF5E1E] hover:text-white border border-[#F3EFE6] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#1C1917] transition-all cursor-pointer"
              >
                🔍 {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2.9 SMALL ADVERTISEMENT SECTION (PROMOTION PLACEHOLDER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-2 border-dashed border-[#FF8C38]/40 p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FF5E1E] text-white flex items-center justify-center font-extrabold text-xl shrink-0">
              📢
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#FF5E1E] uppercase tracking-widest">PROMOTIONAL SPONSOR</span>
              <h4 className="font-['Outfit'] font-bold text-base sm:text-lg text-[#1C1917]">
                Kovai Taste Trail 2026: Discover 50 Hidden Eateries This Weekend!
              </h4>
              <p className="text-xs text-[#78716C]">Sponsored food guide placeholder section</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigateTab('offers')}
            className="bg-[#1C1917] text-white hover:bg-[#FF5E1E] text-xs font-extrabold px-5 py-2.5 rounded-xl transition-colors shrink-0"
          >
            Explore Festival Offers
          </button>
        </div>
      </section>

      {/* 2.10 OFFERS / SPECIAL OFFERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-['Outfit'] font-extrabold text-2xl text-[#1C1917] flex items-center gap-2">
              <Tag className="w-6 h-6 text-[#FF5E1E]" />
              <span>Offers & Special Food Discounts</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C]">Buy One Get One, Combo Deals & Limited-Time Special Offers</p>
          </div>
          <button
            onClick={() => onNavigateTab('offers')}
            className="text-xs sm:text-sm font-bold text-[#FF5E1E] hover:underline flex items-center gap-1"
          >
            View All Offers <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.slice(0, 3).map((offer) => {
            const offerImg = offer.banner_image_url || offer.image || offer.foodItem?.hero_image_url || offer.foodItem?.image || offer.seller?.hero_image_url || offer.seller?.image;
            const targetFallback = offer.foodItem?.hero_image_url || offer.seller?.hero_image_url;
            return (
              <div
                key={offer.id}
                onClick={() => onNavigateTab('offers')}
                className="group bg-[#FFFDF9] hover:bg-[#FAF6F0] rounded-3xl border border-[#F3EFE6] hover:border-[#FF5E1E]/40 p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Visible Offer Image Container */}
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-stone-100">
                    <img
                      src={offerImg}
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        if (targetFallback && e.target.src !== targetFallback) {
                          e.target.src = targetFallback;
                        }
                      }}
                    />
                    <span className="absolute top-3 left-3 bg-[#FF5E1E] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase shadow-md">
                      {offer.offerFilter}
                    </span>
                    {offer.discount && (
                      <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg">
                        {offer.discount}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#78716C] mb-1">
                      <span className="text-[#FF5E1E] uppercase text-[10px] font-extrabold">{offer.sellerName || offer.targetSeller}</span>
                      <span>{offer.validity}</span>
                    </div>
                    <h3 className="font-['Outfit'] font-bold text-base text-[#1C1917] group-hover:text-[#FF5E1E] line-clamp-2">
                      {offer.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#78716C] font-medium line-clamp-2">
                    {offer.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F3EFE6] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#78716C] uppercase font-bold">Offer Discount</span>
                    <div className="font-['Outfit'] font-extrabold text-lg text-[#FF5E1E]">{offer.discount}</div>
                  </div>
                  <span className="text-xs font-bold text-[#1C1917] group-hover:text-[#FF5E1E]">View Offer →</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default HomePage;
