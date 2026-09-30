import React, { useState, useEffect } from 'react';
import { X, Star, MapPin, Store, Sparkles, Heart, Eye, Play, Utensils } from 'lucide-react';
import { getFoodItemsBySeller, getReviewsBySeller, getRelatedSellers } from '../services/api';

export const SellerDetailModal = ({ seller, onClose, onSelectFood, isWishlisted, onToggleWishlist }) => {
  const [activeTabFilter, setActiveTabFilter] = useState('all');
  
  const [sellerFoods, setSellerFoods] = useState([]);
  const [reviews, setReviews] = useState(seller?.reviews || []);
  const [relatedSellers, setRelatedSellers] = useState([]);

  useEffect(() => {
    if (!seller) return;
    let isMounted = true;
    async function loadSellerData() {
      try {
        const [foods, revs, relSellers] = await Promise.all([
          getFoodItemsBySeller(seller.id),
          getReviewsBySeller(seller.id),
          getRelatedSellers(seller.id)
        ]);
        if (isMounted) {
          if (foods) setSellerFoods(foods);
          if (revs && revs.length > 0) setReviews(revs);
          if (relSellers) setRelatedSellers(relSellers);
        }
      } catch (err) {
        console.error('Error loading seller modal data:', err);
      }
    }
    loadSellerData();
    return () => { isMounted = false; };
  }, [seller]);

  if (!seller) return null;

  const filteredFoods = activeTabFilter === 'all' 
    ? sellerFoods 
    : activeTabFilter === 'veg' 
      ? sellerFoods.filter(f => f.isVeg) 
      : sellerFoods.filter(f => !f.isVeg);

  const ambienceImages = seller.ambienceImages && seller.ambienceImages.length > 0 
    ? seller.ambienceImages 
    : [seller.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#FFFDF9] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col border border-[#F3EFE6]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-[#F3EFE6]">
          <div className="flex items-center space-x-2">
            <span className="bg-[#FF5E1E]/10 text-[#FF5E1E] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5" />
              {seller.typeName || seller.type} Detail
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#FAF6F0] border border-[#F3EFE6] text-[#1C1917] hover:bg-[#FF5E1E] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          
          {/* Top Hero Banner & Ambience Images */}
          <div className="space-y-4">
            <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden border-2 border-[#F3EFE6] shadow-lg">
              <img
                src={seller.image}
                alt={seller.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="bg-[#FF5E1E] text-white text-xs font-extrabold px-3 py-1 rounded-full w-max mb-2 uppercase tracking-wider">
                  {seller.typeName}
                </span>
                <h1 className="font-['Outfit'] font-extrabold text-3xl sm:text-4xl text-white">
                  {seller.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-200 mt-2 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#FF5E1E]" /> {seller.location}
                  </span>
                  <span className="flex items-center gap-1 bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {seller.rating} ({seller.reviewsCount} Discovered)
                  </span>
                </div>
              </div>
            </div>

            {/* Ambience Photos Row */}
            {ambienceImages.length > 1 && (
              <div>
                <h4 className="text-xs font-bold text-[#78716C] uppercase tracking-wider mb-2">Ambience & Shop Photos</h4>
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {ambienceImages.map((img, idx) => (
                    <div key={idx} className="w-32 h-20 rounded-2xl overflow-hidden border border-[#F3EFE6] shrink-0">
                      <img src={img} alt="Ambience photo" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Short Description */}
          <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#F3EFE6]">
            <h3 className="text-xs font-bold text-[#78716C] uppercase tracking-wider mb-1">About {seller.name}</h3>
            <p className="text-sm sm:text-base text-[#1C1917] font-medium leading-relaxed">
              {seller.shortDescription}
            </p>
          </div>

          {/* Rating Breakdown Section (Price, Quality, Quantity, Overall) */}
          <div>
            <h3 className="font-['Outfit'] font-bold text-lg text-[#1C1917] mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF5E1E]" />
              <span>Seller Experience & Rating Breakdown</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#F3EFE6] text-center">
                <div className="text-xs font-bold text-[#78716C] uppercase">Price Affordability</div>
                <div className="text-xl font-extrabold text-[#1C1917] mt-1">{seller.ratingBreakdown?.price || 4.7} ★</div>
              </div>
              <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#F3EFE6] text-center">
                <div className="text-xs font-bold text-[#78716C] uppercase">Food Quality</div>
                <div className="text-xl font-extrabold text-[#FF5E1E] mt-1">{seller.ratingBreakdown?.quality || 4.9} ★</div>
              </div>
              <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#F3EFE6] text-center">
                <div className="text-xs font-bold text-[#78716C] uppercase">Portion Quantity</div>
                <div className="text-xl font-extrabold text-[#1C1917] mt-1">{seller.ratingBreakdown?.quantity || 4.8} ★</div>
              </div>
              <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#F3EFE6] text-center">
                <div className="text-xs font-bold text-[#78716C] uppercase">Overall Score</div>
                <div className="text-xl font-extrabold text-emerald-600 mt-1">{seller.ratingBreakdown?.overall || 4.8} ★</div>
              </div>
            </div>
          </div>

          <hr className="border-[#F3EFE6]" />

          {/* ALL Food Items Available at this Seller */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="font-['Outfit'] font-extrabold text-xl text-[#1C1917] flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#FF5E1E]" />
                  <span>All Food Items Available Here ({sellerFoods.length})</span>
                </h3>
                <p className="text-xs text-[#78716C]">Click any food item card to view its rich details and reviews</p>
              </div>

              {/* Filter Veg / Non Veg Tabs */}
              <div className="flex items-center bg-[#FAF6F0] p-1 rounded-xl border border-[#F3EFE6]">
                <button
                  onClick={() => setActiveTabFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTabFilter === 'all' ? 'bg-[#FF5E1E] text-white shadow-sm' : 'text-[#78716C]'
                  }`}
                >
                  All Items
                </button>
                <button
                  onClick={() => setActiveTabFilter('veg')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTabFilter === 'veg' ? 'bg-emerald-600 text-white shadow-sm' : 'text-[#78716C]'
                  }`}
                >
                  Pure Veg
                </button>
                <button
                  onClick={() => setActiveTabFilter('non-veg')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTabFilter === 'non-veg' ? 'bg-rose-600 text-white shadow-sm' : 'text-[#78716C]'
                  }`}
                >
                  Non-Veg
                </button>
              </div>
            </div>

            {/* Food Grid */}
            {filteredFoods.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredFoods.map((food) => (
                  <div
                    key={food.id}
                    onClick={() => {
                      onClose();
                      onSelectFood(food);
                    }}
                    className="group bg-[#FFFDF9] hover:bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#F3EFE6] hover:border-[#FF5E1E]/40 shadow-sm transition-all duration-300 flex space-x-3 cursor-pointer"
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                      <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(food);
                        }}
                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-white/90 text-rose-500 shadow-sm"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isWishlisted(food.id) ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5E1E]">{food.cuisine}</span>
                          <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {food.rating}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-[#1C1917] group-hover:text-[#FF5E1E] truncate mt-0.5">
                          {food.name}
                        </h4>
                        <p className="text-xs text-[#78716C] line-clamp-1 mt-0.5">
                          {food.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F3EFE6]">
                        <span className="font-['Outfit'] font-extrabold text-base text-[#1C1917]">₹{food.price}</span>
                        <span className="text-[11px] font-extrabold text-[#FF5E1E] group-hover:underline">View Details →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#F3EFE6] text-center text-sm font-medium text-[#78716C]">
                No food items match the selected dietary filter.
              </div>
            )}
          </div>

          <hr className="border-[#F3EFE6]" />

          {/* Customer Reviews & Photos */}
          <div>
            <h3 className="font-['Outfit'] font-bold text-lg text-[#1C1917] mb-4">
              Customer Reviews for {seller.name}
            </h3>

            {seller.reviews && seller.reviews.length > 0 ? (
              <div className="space-y-4">
                {seller.reviews.map((rev) => (
                  <div key={rev.id} className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#F3EFE6] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={rev.avatar} alt={rev.user} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <div className="text-xs font-bold text-[#1C1917]">{rev.user}</div>
                          <div className="text-[10px] text-[#78716C]">{rev.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-xs font-bold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{rev.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#1C1917] font-medium">"{rev.comment}"</p>

                    {rev.photo && (
                      <div className="pt-1">
                        <img src={rev.photo} alt="Review" className="w-24 h-16 rounded-xl object-cover border border-[#F3EFE6]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#F3EFE6] text-center text-sm font-medium text-[#78716C]">
                No customer reviews added yet.
              </div>
            )}
          </div>

          <hr className="border-[#F3EFE6]" />

          {/* Related Sellers Selling Same Food */}
          <div>
            <h3 className="font-['Outfit'] font-bold text-lg text-[#1C1917] mb-3">
              Other Food Sellers You Might Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedSellers.map((rs) => (
                <button
                  key={rs.id}
                  onClick={() => {
                    onClose();
                  }}
                  className="p-3 bg-[#FAF6F0] hover:bg-[#FF5E1E]/10 rounded-2xl border border-[#F3EFE6] transition-colors text-left group"
                >
                  <img src={rs.image} alt={rs.name} className="w-full h-24 rounded-xl object-cover mb-2 border border-[#F3EFE6]" />
                  <div className="text-xs font-bold text-[#1C1917] group-hover:text-[#FF5E1E] truncate">{rs.name}</div>
                  <div className="text-[11px] text-[#78716C]">{rs.location}</div>
                  <div className="text-xs font-bold text-amber-600 mt-1">★ {rs.rating}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SellerDetailModal;
