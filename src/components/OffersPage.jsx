import React, { useState, useEffect } from 'react';
import { Search, Tag, Filter, Star, MapPin, Store, ChevronRight, X, Clock, Sparkles, Loader2 } from 'lucide-react';
import { offerFilterTypes } from '../data/foodData';
import { getOffersByCategory, getOffersByType } from '../services/api';

export const OffersPage = ({ onSelectFood, onSelectSeller }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeOfferDetail, setActiveOfferDetail] = useState(null);

  const [offersList, setOffersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadOffers() {
      try {
        setIsLoading(true);
        const data = await getOffersByType(selectedFilter);
        if (isMounted) {
          setOffersList(data || []);
        }
      } catch (err) {
        console.error('Error fetching offers:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadOffers();
    return () => { isMounted = false; };
  }, [selectedFilter]);

  // Filter offers based on search
  const filteredOffers = offersList.filter(offer => {
    const matchesSearch = searchQuery.trim() === '' || 
      offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (offer.description && offer.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (offer.targetCuisine && offer.targetCuisine.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (offer.sellerName && offer.sellerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (offer.targetSeller && offer.targetSeller.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  const cuisinesOffers = filteredOffers.filter(o => o.categoryType === 'Cuisines' || o.type === 'Cuisine Offer');
  const foodSellersOffers = filteredOffers.filter(o => o.categoryType === 'Food Sellers' || o.type === 'Seller Offer');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Search Bar & Page Header */}
      <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#F3EFE6] shadow-soft space-y-5">
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#FF5E1E]/10 text-[#FF5E1E] px-3.5 py-1 rounded-full text-xs font-extrabold uppercase mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>EXCLUSIVE FOOD DISCOVERY OFFERS</span>
          </div>
          <h1 className="font-['Outfit'] font-extrabold text-3xl sm:text-4xl text-[#1C1917]">
            Discover Today's Food Offers & Deals
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] font-medium mt-1">
            Filter by Buy 1 Get 1, Combo Deals, One Day Special Discounts, and Hotel Specific Offers
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-[#FAF6F0] p-2 rounded-2xl border border-[#F3EFE6] flex items-center space-x-3 px-4">
          <Search className="w-5 h-5 text-[#FF5E1E] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search offers by food item (Biryani, Pizza...) or seller name (Annapoorna...)"
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#1C1917] placeholder-[#78716C] focus:outline-none py-1.5"
          />
        </div>

        {/* 4.3 LIGHTWEIGHT OFFER FILTER CHIPS */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-extrabold text-[#78716C] uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-[#FF5E1E]" />
            <span>Filter Offer Types</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {offerFilterTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedFilter(type)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedFilter === type
                    ? 'bg-[#FF5E1E] text-white shadow-orange-glow'
                    : 'bg-[#FAF6F0] text-[#1C1917] hover:bg-[#F3EFE6] border border-[#F3EFE6]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TWO SECTIONS: 4.1 CUISINES OFFERS + 4.2 FOOD SELLERS OFFERS */}

      {/* 4.1 CUISINES OFFERS SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
          <div>
            <span className="text-xs font-extrabold text-[#FF5E1E] uppercase tracking-wider">SECTION 4.1</span>
            <h2 className="font-['Outfit'] font-extrabold text-2xl text-[#1C1917]">
              Cuisines Offers (Food Item Deals)
            </h2>
          </div>
          <span className="text-xs font-bold text-[#78716C]">{cuisinesOffers.length} Item Offers Found</span>
        </div>

        {cuisinesOffers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cuisinesOffers.map((offer) => (
              <div
                key={offer.id}
                onClick={() => setActiveOfferDetail(offer)}
                className="group bg-[#FFFDF9] hover:bg-[#FAF6F0] rounded-3xl border border-[#F3EFE6] hover:border-[#FF5E1E]/40 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-4"
              >
                <div className="space-y-3">
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-stone-100">
                    <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-3 left-3 bg-[#FF5E1E] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase shadow-md">
                      {offer.offerFilter}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg">
                      {offer.discount}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5E1E]">Cuisine: {offer.targetCuisine}</span>
                    <h3 className="font-['Outfit'] font-bold text-base text-[#1C1917] group-hover:text-[#FF5E1E] line-clamp-1 mt-0.5">
                      {offer.title}
                    </h3>
                    <div className="text-xs text-[#78716C] flex items-center gap-1 mt-1 font-semibold">
                      <Store className="w-3.5 h-3.5 text-[#FF5E1E]" />
                      <span>{offer.sellerName}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#78716C] font-medium line-clamp-2">
                    {offer.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F3EFE6] flex items-center justify-between">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-['Outfit'] font-extrabold text-xl text-[#FF5E1E]">₹{offer.offerPrice}</span>
                    <span className="text-xs font-semibold text-[#78716C] line-through">₹{offer.originalPrice}</span>
                  </div>
                  <span className="text-xs font-extrabold text-[#1C1917] group-hover:text-[#FF5E1E]">View Offer Details →</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#F3EFE6] text-center text-sm font-medium text-[#78716C]">
            No cuisine offers match the current filter selection.
          </div>
        )}
      </section>

      {/* 4.2 FOOD SELLERS OFFERS SECTION */}
      <section className="space-y-6 pt-6">
        <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
          <div>
            <span className="text-xs font-extrabold text-[#FF5E1E] uppercase tracking-wider">SECTION 4.2</span>
            <h2 className="font-['Outfit'] font-extrabold text-2xl text-[#1C1917]">
              Food Sellers Offers (Hotel & Shop Specific Deals)
            </h2>
          </div>
          <span className="text-xs font-bold text-[#78716C]">{foodSellersOffers.length} Seller Offers Found</span>
        </div>

        {foodSellersOffers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {foodSellersOffers.map((offer) => (
              <div
                key={offer.id}
                onClick={() => setActiveOfferDetail(offer)}
                className="group bg-[#FFFDF9] hover:bg-[#FAF6F0] rounded-3xl border border-[#F3EFE6] hover:border-[#FF5E1E]/40 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-4"
              >
                <div className="space-y-3">
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-stone-100">
                    <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-3 left-3 bg-[#1C1917] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase">
                      {offer.targetSeller}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-[#FF5E1E] text-white text-xs font-extrabold px-2.5 py-1 rounded-lg">
                      {offer.discount}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-['Outfit'] font-bold text-base text-[#1C1917] group-hover:text-[#FF5E1E] line-clamp-2">
                      {offer.title}
                    </h3>
                    <div className="text-xs text-[#78716C] flex items-center gap-1 mt-1 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#FF5E1E]" />
                      <span>{offer.validity}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#78716C] font-medium line-clamp-2">
                    {offer.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F3EFE6] flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#FF5E1E]">{offer.offerFilter}</span>
                  <span className="text-xs font-extrabold text-[#1C1917] group-hover:text-[#FF5E1E]">View Seller Offer →</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#F3EFE6] text-center text-sm font-medium text-[#78716C]">
            No seller offers match the current filter selection.
          </div>
        )}
      </section>

      {/* OFFER DETAIL MODAL VIEW */}
      {activeOfferDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-[#FFFDF9] rounded-3xl shadow-2xl overflow-hidden border border-[#F3EFE6] p-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="bg-[#FF5E1E] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                {activeOfferDetail.offerFilter}
              </span>
              <button
                onClick={() => setActiveOfferDetail(null)}
                className="p-2 rounded-full bg-[#FAF6F0] border border-[#F3EFE6] text-[#1C1917] hover:bg-[#FF5E1E] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-52 rounded-2xl overflow-hidden border border-[#F3EFE6]">
              <img src={activeOfferDetail.image} alt={activeOfferDetail.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2">
              <h2 className="font-['Outfit'] font-extrabold text-xl text-[#1C1917]">
                {activeOfferDetail.title}
              </h2>
              <div className="text-xs font-bold text-[#FF5E1E]">
                Target: {activeOfferDetail.sellerName || activeOfferDetail.targetSeller}
              </div>
              <p className="text-sm text-[#78716C] font-medium leading-relaxed">
                {activeOfferDetail.description}
              </p>
            </div>

            <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#F3EFE6] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#78716C] uppercase">Offer Discount</span>
                <div className="font-['Outfit'] font-extrabold text-2xl text-[#FF5E1E]">{activeOfferDetail.discount}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-[#78716C] uppercase">Validity Info</span>
                <div className="text-xs font-bold text-[#1C1917]">{activeOfferDetail.validity}</div>
              </div>
            </div>

            <div className="flex gap-3">
              {activeOfferDetail.foodItem && (
                <button
                  onClick={() => {
                    const item = activeOfferDetail.foodItem;
                    setActiveOfferDetail(null);
                    onSelectFood(item);
                  }}
                  className="flex-1 bg-[#FF5E1E] text-white font-extrabold py-3 rounded-2xl text-sm shadow-orange-glow hover:bg-[#E04D12] transition-colors"
                >
                  View Food Item Details
                </button>
              )}
              {activeOfferDetail.seller && (
                <button
                  onClick={() => {
                    const sel = activeOfferDetail.seller;
                    setActiveOfferDetail(null);
                    onSelectSeller(sel);
                  }}
                  className="flex-1 bg-[#1C1917] text-white font-extrabold py-3 rounded-2xl text-sm hover:bg-[#38322E] transition-colors"
                >
                  View Seller Profile & Menu
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default OffersPage;
