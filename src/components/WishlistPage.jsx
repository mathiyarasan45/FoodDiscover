import React, { useState, useEffect } from 'react';
import { Search, Heart, Star, MapPin, Store, Trash2, ArrowRight, Loader2 } from 'lucide-react';
import { searchWishlistItems } from '../services/api';

export const WishlistPage = ({ wishlistItems, isLoading: initialLoading, onRemoveFromWishlist, onSelectFood, onNavigateTab }) => {
  const [wishlistSearchQuery, setWishlistSearchQuery] = useState('');
  const [displayedItems, setDisplayedItems] = useState(wishlistItems || []);
  const [isSearching, setIsSearching] = useState(false);

  // Sync displayed items when wishlistItems prop changes or search query is used
  useEffect(() => {
    let isMounted = true;
    async function filterWishlist() {
      if (!wishlistSearchQuery || wishlistSearchQuery.trim() === '') {
        if (isMounted) setDisplayedItems(wishlistItems);
        return;
      }
      try {
        setIsSearching(true);
        const results = await searchWishlistItems('usr-1', wishlistSearchQuery);
        if (isMounted) setDisplayedItems(results || []);
      } catch (err) {
        console.error('Wishlist search error:', err);
      } finally {
        if (isMounted) setIsSearching(false);
      }
    }
    filterWishlist();
    return () => { isMounted = false; };
  }, [wishlistSearchQuery, wishlistItems]);

  const filteredWishlist = displayedItems;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Wishlist Header & TOP WISHLIST-ONLY SEARCH BAR */}
      <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#F3EFE6] shadow-soft space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-rose-50 text-rose-600 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase mb-2 border border-rose-200">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>SAVED FOOD DISCOVERIES ({wishlistItems.length})</span>
            </div>
            <h1 className="font-['Outfit'] font-extrabold text-3xl sm:text-4xl text-[#1C1917]">
              My Discovered Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C] font-medium mt-1">
              Your personal collection of saved food dishes and culinary discoveries
            </p>
          </div>
        </div>

        {/* WISHLIST SEARCH BAR (Searches ONLY inside wishlistItems) */}
        <div className="bg-[#FAF6F0] p-2 rounded-2xl border border-[#F3EFE6] flex items-center space-x-3 px-4">
          <Search className="w-5 h-5 text-rose-500 shrink-0" />
          <input
            type="text"
            value={wishlistSearchQuery}
            onChange={(e) => setWishlistSearchQuery(e.target.value)}
            placeholder="Search ONLY within your saved Wishlist items..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#1C1917] placeholder-[#78716C] focus:outline-none py-1.5"
          />
          {wishlistSearchQuery && (
            <button 
              onClick={() => setWishlistSearchQuery('')}
              className="text-xs font-bold text-[#78716C] hover:text-[#1C1917] px-2 py-1 bg-stone-200 rounded-md shrink-0"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Wishlist Items Cards Grid */}
      {filteredWishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWishlist.map((food) => (
            <div
              key={food.id}
              onClick={() => onSelectFood(food)}
              className="group bg-[#FFFDF9] hover:bg-[#FAF6F0] rounded-3xl border border-[#F3EFE6] hover:border-rose-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-stone-100">
                <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                
                {/* Remove from Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromWishlist(food.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white text-rose-500 hover:bg-rose-500 hover:text-white shadow-md transition-all"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <span className="absolute bottom-3 left-3 bg-white/95 text-[#1C1917] text-xs font-extrabold px-2.5 py-1 rounded-xl shadow-xs flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {food.rating}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[10px] font-extrabold uppercase text-[#FF5E1E] tracking-wider">{food.cuisine}</span>
                <h3 className="font-['Outfit'] font-bold text-lg text-[#1C1917] group-hover:text-[#FF5E1E] line-clamp-1">
                  {food.name}
                </h3>
                <div className="text-xs text-[#78716C] flex items-center gap-1.5 font-semibold">
                  <Store className="w-4 h-4 text-[#FF5E1E] shrink-0" />
                  <span className="truncate">{food.sellerName}</span>
                </div>
                <div className="text-xs text-[#78716C] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#78716C] shrink-0" />
                  <span>{food.location}</span>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-[#F3EFE6] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#78716C] uppercase font-bold">Est. Price</span>
                  <div className="font-['Outfit'] font-extrabold text-xl text-[#1C1917]">₹{food.price}</div>
                </div>
                <span className="text-xs font-extrabold text-[#FF5E1E] group-hover:translate-x-1 transition-transform">
                  Open Discovery →
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#FFFDF9] p-10 sm:p-16 rounded-3xl border border-[#F3EFE6] text-center max-w-2xl mx-auto space-y-4">
          <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-500 shadow-sm">
            <Heart className="w-10 h-10 fill-rose-500/20" />
          </div>
          
          <h3 className="font-['Outfit'] font-extrabold text-2xl text-[#1C1917]">
            {wishlistSearchQuery ? 'No matching saved items' : 'Your Wishlist is Empty'}
          </h3>
          
          <p className="text-sm text-[#78716C] font-medium max-w-md mx-auto">
            {wishlistSearchQuery 
              ? `No items inside your Wishlist matched "${wishlistSearchQuery}". Try clearing the wishlist search.`
              : 'Discover delicious food items, hotels, and varieties across Food Discover, and click the heart icon to save them here!'
            }
          </p>

          <div className="pt-4">
            <button
              onClick={() => onNavigateTab('home')}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#FF5E1E] to-[#FF8C38] text-white font-extrabold text-sm px-6 py-3 rounded-2xl shadow-orange-glow hover:opacity-95 transition-opacity"
            >
              <span>Discover Foods Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default WishlistPage;
