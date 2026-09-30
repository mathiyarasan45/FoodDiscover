import React, { useState, useEffect } from 'react';
import { X, Star, MapPin, Heart, Store, ChevronRight, Play, Eye, Sparkles } from 'lucide-react';
import { getFoodSellerById, getReviewsByFood, getRelatedFoods, getRelatedSellers } from '../services/api';

export const FoodDetailModal = ({ food, onClose, onSelectFood, onSelectSeller, isWishlisted, onToggleWishlist }) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const [seller, setSeller] = useState(null);
  const [reviews, setReviews] = useState(food?.reviews || []);
  const [relatedFoods, setRelatedFoods] = useState([]);
  const [relatedShops, setRelatedShops] = useState([]);

  useEffect(() => {
    if (!food) return;
    let isMounted = true;
    async function loadModalData() {
      try {
        const [sellerData, revData, relFoods, relSellers] = await Promise.all([
          getFoodSellerById(food.sellerId),
          getReviewsByFood(food.id),
          getRelatedFoods(food.id),
          getRelatedSellers(food.sellerId)
        ]);
        if (isMounted) {
          if (sellerData) setSeller(sellerData);
          if (revData && revData.length > 0) setReviews(revData);
          if (relFoods) setRelatedFoods(relFoods);
          if (relSellers) setRelatedShops(relSellers);
        }
      } catch (err) {
        console.error('Error fetching modal data:', err);
      }
    }
    loadModalData();
    return () => { isMounted = false; };
  }, [food]);

  if (!food) return null;

  const images = food.images && food.images.length > 0 ? food.images : [food.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#FFFDF9] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col border border-[#F3EFE6]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-[#F3EFE6]">
          <div className="flex items-center space-x-2">
            <span className="bg-[#FF5E1E]/10 text-[#FF5E1E] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {food.cuisine}
            </span>
            {food.isVeg ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Pure Veg
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span> Non-Veg
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Wishlist Heart Toggle */}
            <button
              onClick={() => onToggleWishlist(food)}
              className={`p-2.5 rounded-full border transition-all ${
                isWishlisted(food.id)
                  ? 'bg-rose-50 border-rose-200 text-rose-500 shadow-sm'
                  : 'bg-white border-[#F3EFE6] text-[#78716C] hover:text-rose-500'
              }`}
              title={isWishlisted(food.id) ? "Remove from Wishlist" : "Save to Wishlist"}
            >
              <Heart className={`w-5 h-5 ${isWishlisted(food.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#FAF6F0] border border-[#F3EFE6] text-[#1C1917] hover:bg-[#FF5E1E] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          
          {/* Main Top Grid: Gallery + Core Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Swipeable / Gallery Images */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#F3EFE6] shadow-md bg-stone-100 aspect-4/3">
                <img
                  src={images[selectedImageIdx]}
                  alt={food.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {food.badge && (
                  <span className="absolute top-3 left-3 bg-[#FF5E1E] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                    {food.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImageIdx === idx ? 'border-[#FF5E1E] scale-105 shadow-sm' : 'border-[#F3EFE6] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Food Title, Pricing, Shop Details & Rating */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <h2 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-[#1C1917] leading-tight">
                  {food.name}
                </h2>
                
                {/* Shop / Seller Card Link */}
                <button
                  onClick={() => {
                    onClose();
                    onSelectSeller(seller);
                  }}
                  className="mt-2 group flex items-center space-x-2 text-left bg-[#FAF6F0] hover:bg-[#FF5E1E]/10 p-2.5 rounded-xl border border-[#F3EFE6] transition-colors w-full"
                >
                  <Store className="w-5 h-5 text-[#FF5E1E] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#78716C] uppercase">Sold By:</div>
                    <div className="text-sm font-extrabold text-[#1C1917] group-hover:text-[#FF5E1E] truncate">
                      {food.sellerName}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#78716C] group-hover:text-[#FF5E1E]" />
                </button>
              </div>

              {/* Pricing & Rating Row */}
              <div className="flex items-center justify-between p-4 bg-[#FAF6F0] rounded-2xl border border-[#F3EFE6]">
                <div>
                  <div className="text-xs font-bold text-[#78716C] uppercase">Estimated Price</div>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-['Outfit'] font-extrabold text-3xl text-[#FF5E1E]">₹{food.price}</span>
                    {food.originalPrice && (
                      <span className="text-sm font-semibold text-[#78716C] line-through">₹{food.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-extrabold text-sm text-stone-900">{food.rating}</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#78716C] mt-1">
                    {food.reviewsCount} Discovered Reviews
                  </div>
                </div>
              </div>

              {/* Location Badge */}
              <div className="flex items-center space-x-2 text-sm font-semibold text-[#78716C]">
                <MapPin className="w-4 h-4 text-[#FF5E1E] shrink-0" />
                <span>{food.location}</span>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-[#78716C] uppercase tracking-wider mb-1.5">Description</h4>
                <p className="text-sm text-[#1C1917] leading-relaxed font-medium">
                  {food.description}
                </p>
              </div>

            </div>

          </div>

          <hr className="border-[#F3EFE6]" />

          {/* Rating Breakdown Section */}
          <div>
            <h3 className="font-['Outfit'] font-bold text-lg text-[#1C1917] mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF5E1E]" />
              <span>Taste & Quality Rating Breakdown</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#F3EFE6] text-center">
                <div className="text-xs font-bold text-[#78716C] uppercase">Price Value</div>
                <div className="text-xl font-extrabold text-[#1C1917] mt-1">{food.ratingBreakdown?.price || 4.7} ★</div>
              </div>
              <div className="bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#F3EFE6] text-center">
                <div className="text-xs font-bold text-[#78716C] uppercase">Taste & Quality</div>
                <div className="text-xl font-extrabold text-[#FF5E1E] mt-1">{food.ratingBreakdown?.quality || 4.9} ★</div>
              </div>
              <div className="bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#F3EFE6] text-center">
                <div className="text-xs font-bold text-[#78716C] uppercase">Portion Quantity</div>
                <div className="text-xl font-extrabold text-[#1C1917] mt-1">{food.ratingBreakdown?.quantity || 4.8} ★</div>
              </div>
              <div className="bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#F3EFE6] text-center">
                <div className="text-xs font-bold text-[#78716C] uppercase">Overall Score</div>
                <div className="text-xl font-extrabold text-emerald-600 mt-1">{food.ratingBreakdown?.overall || 4.8} ★</div>
              </div>
            </div>
          </div>

          <hr className="border-[#F3EFE6]" />

          {/* Reviews & Customer Photos / Videos */}
          <div>
            <h3 className="font-['Outfit'] font-bold text-lg text-[#1C1917] mb-4">
              Discovered Reviews & Food Photos ({food.reviews?.length || 0})
            </h3>

            {food.reviews && food.reviews.length > 0 ? (
              <div className="space-y-4">
                {food.reviews.map((rev) => (
                  <div key={rev.id} className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#F3EFE6] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={rev.avatar} alt={rev.user} className="w-9 h-9 rounded-full object-cover border border-[#F3EFE6]" />
                        <div>
                          <div className="text-sm font-bold text-[#1C1917]">{rev.user}</div>
                          <div className="text-[11px] font-medium text-[#78716C]">{rev.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg text-xs font-bold text-stone-900">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{rev.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#1C1917] font-medium leading-relaxed">
                      "{rev.comment}"
                    </p>

                    {/* Review Photo or Video */}
                    <div className="flex gap-3 pt-1">
                      {rev.photo && (
                        <div className="relative group rounded-xl overflow-hidden border border-[#F3EFE6] w-24 h-20 bg-stone-200">
                          <img src={rev.photo} alt="Customer photo" className="w-full h-full object-cover" />
                          <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                            <Eye className="w-3 h-3" /> Photo
                          </span>
                        </div>
                      )}
                      {rev.video && (
                        <div className="relative group rounded-xl overflow-hidden border border-[#F3EFE6] w-28 h-20 bg-stone-900 flex items-center justify-center">
                          <video src={rev.video} className="w-full h-full object-cover opacity-80" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <div className="w-8 h-8 rounded-full bg-[#FF5E1E] flex items-center justify-center text-white shadow-md">
                              <Play className="w-4 h-4 fill-white ml-0.5" />
                            </div>
                          </div>
                          <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Video Review
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#F3EFE6] text-center text-sm font-medium text-[#78716C]">
                Be the first food lover to discover and review {food.name}!
              </div>
            )}
          </div>

          <hr className="border-[#F3EFE6]" />

          {/* Related Sellers Selling Same Food / Cuisine */}
          <div>
            <h3 className="font-['Outfit'] font-bold text-lg text-[#1C1917] mb-3">
              Related Shops Selling Similar Food
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedShops.map((shop) => (
                <button
                  key={shop.id}
                  onClick={() => {
                    onClose();
                    onSelectSeller(shop);
                  }}
                  className="flex items-center space-x-3 p-3 bg-[#FAF6F0] hover:bg-[#FF5E1E]/10 rounded-2xl border border-[#F3EFE6] transition-colors text-left group"
                >
                  <img src={shop.image} alt={shop.name} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#F3EFE6]" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-[#1C1917] group-hover:text-[#FF5E1E] truncate">{shop.name}</div>
                    <div className="text-xs text-[#78716C] truncate">{shop.location}</div>
                    <div className="text-xs font-bold text-amber-600 mt-0.5">★ {shop.rating} ({shop.reviewsCount})</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Related Food Items */}
          {relatedFoods.length > 0 && (
            <div>
              <h3 className="font-['Outfit'] font-bold text-lg text-[#1C1917] mb-3">
                Related Food Discoveries
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relatedFoods.map((rf) => (
                  <button
                    key={rf.id}
                    onClick={() => {
                      setSelectedImageIdx(0);
                      onSelectFood(rf);
                    }}
                    className="p-2.5 bg-[#FAF6F0] hover:bg-[#FF5E1E]/10 rounded-2xl border border-[#F3EFE6] transition-all text-left group"
                  >
                    <img src={rf.image} alt={rf.name} className="w-full h-24 rounded-xl object-cover mb-2 border border-[#F3EFE6]" />
                    <div className="text-xs font-bold text-[#1C1917] group-hover:text-[#FF5E1E] line-clamp-1">{rf.name}</div>
                    <div className="text-[11px] text-[#78716C]">{rf.sellerName}</div>
                    <div className="text-xs font-extrabold text-[#FF5E1E] mt-1">₹{rf.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default FoodDetailModal;
