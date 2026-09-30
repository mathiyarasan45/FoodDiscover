import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, ArrowLeft, Star, MapPin, Heart, Store, Utensils, Grid, Loader2 } from 'lucide-react';
import { getCuisines, getFoodSellerTypes, getFoodItemsByCuisine, getFoodSellersByType } from '../services/api';

export const CategoriesPage = ({ onSelectFood, onSelectSeller, isWishlisted, onToggleWishlist }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Drill-down states
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [selectedSellerType, setSelectedSellerType] = useState(null);

  // Active section tab: 'cuisines' or 'sellers' or 'all'
  const [activeCategoryTab, setActiveCategoryTab] = useState('cuisines');

  // Async data states
  const [cuisines, setCuisines] = useState([]);
  const [sellerTypesList, setSellerTypesList] = useState([]);
  const [cuisineFoods, setCuisineFoods] = useState([]);
  const [sellersOfCategory, setSellersOfCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial load: Cuisines & Seller Types
  useEffect(() => {
    let isMounted = true;
    async function loadCategoryData() {
      try {
        setIsLoading(true);
        const [cData, stData] = await Promise.all([
          getCuisines(),
          getFoodSellerTypes()
        ]);
        if (isMounted) {
          setCuisines(cData || []);
          setSellerTypesList(stData || []);
        }
      } catch (err) {
        console.error('Error loading categories:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadCategoryData();
    return () => { isMounted = false; };
  }, []);

  // Fetch foods when a cuisine is selected
  useEffect(() => {
    if (!selectedCuisine) return;
    let isMounted = true;
    async function loadCuisineFoods() {
      try {
        setIsLoading(true);
        const foods = await getFoodItemsByCuisine(selectedCuisine.id);
        if (isMounted) setCuisineFoods(foods || []);
      } catch (err) {
        console.error('Error loading cuisine foods:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadCuisineFoods();
    return () => { isMounted = false; };
  }, [selectedCuisine]);

  // Fetch sellers when a seller type is selected
  useEffect(() => {
    if (!selectedSellerType) return;
    let isMounted = true;
    async function loadSellersByType() {
      try {
        setIsLoading(true);
        const sellers = await getFoodSellersByType(selectedSellerType.name);
        if (isMounted) setSellersOfCategory(sellers || []);
      } catch (err) {
        console.error('Error loading sellers by type:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadSellersByType();
    return () => { isMounted = false; };
  }, [selectedSellerType]);

  // Filtered lists based on search bar
  const filteredCuisines = cuisines.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredSellerTypes = sellerTypesList.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // -------------------------------------------------------------
  // DRILL-DOWN VIEW 1: Cuisine Food Items Page (e.g., South Indian -> South Indian Food Items)
  // -------------------------------------------------------------
  if (selectedCuisine) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSelectedCuisine(null)}
            className="flex items-center space-x-2 bg-[#FFFDF9] hover:bg-[#FF5E1E] hover:text-white border border-[#F3EFE6] px-4 py-2.5 rounded-xl font-bold text-sm text-[#1C1917] transition-all shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Categories</span>
          </button>
          <div className="text-xs font-bold text-[#78716C] flex items-center gap-1">
            <span>Categories</span> <ChevronRight className="w-3.5 h-3.5" />
            <span>Cuisines</span> <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#FF5E1E]">{selectedCuisine.name}</span>
          </div>
        </div>

        {/* Cuisine Header */}
        <div className="bg-gradient-to-r from-[#FFFDF9] to-[#FAF6F0] p-6 sm:p-8 rounded-3xl border border-[#F3EFE6] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-3xl mb-2 block">{selectedCuisine.icon}</span>
            <h1 className="font-['Outfit'] font-extrabold text-3xl sm:text-4xl text-[#1C1917]">
              {selectedCuisine.name} Food Items
            </h1>
            <p className="text-sm text-[#78716C] font-medium mt-1 max-w-xl">
              {selectedCuisine.description}. Discover all available {selectedCuisine.name} dishes across Coimbatore.
            </p>
          </div>
          <span className="hidden sm:block bg-[#FF5E1E]/10 text-[#FF5E1E] text-xs font-extrabold px-4 py-2 rounded-full uppercase">
            {cuisineFoods.length} Dishes Found
          </span>
        </div>

        {/* South Indian Food Items List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cuisineFoods.length > 0 ? (
            cuisineFoods.map((food) => (
              <div
                key={food.id}
                onClick={() => onSelectFood(food)}
                className="group bg-[#FFFDF9] hover:bg-[#FAF6F0] rounded-3xl border border-[#F3EFE6] hover:border-[#FF5E1E]/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(food);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                      isWishlisted(food.id) ? 'bg-white text-rose-500 shadow-md' : 'bg-black/30 text-white hover:bg-white hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted(food.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  <span className="absolute bottom-3 left-3 bg-white/95 text-[#1C1917] text-xs font-extrabold px-2.5 py-1 rounded-xl shadow-xs flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {food.rating} ({food.reviewsCount})
                  </span>
                </div>

                <div className="p-5 space-y-2">
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
                    <span className="text-[10px] text-[#78716C] uppercase font-bold">Price</span>
                    <div className="font-['Outfit'] font-extrabold text-xl text-[#FF5E1E]">₹{food.price}</div>
                  </div>
                  <span className="text-xs font-extrabold text-[#1C1917] group-hover:text-[#FF5E1E]">View Details →</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-[#FFFDF9] p-8 rounded-3xl border border-[#F3EFE6] text-center text-sm font-medium text-[#78716C]">
              No food items listed for {selectedCuisine.name} currently.
            </div>
          )}
        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // DRILL-DOWN VIEW 2: Food Seller Type List Page (e.g., Hotels -> Hotel List Page)
  // -------------------------------------------------------------
  if (selectedSellerType) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSelectedSellerType(null)}
            className="flex items-center space-x-2 bg-[#FFFDF9] hover:bg-[#FF5E1E] hover:text-white border border-[#F3EFE6] px-4 py-2.5 rounded-xl font-bold text-sm text-[#1C1917] transition-all shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Categories</span>
          </button>
          <div className="text-xs font-bold text-[#78716C] flex items-center gap-1">
            <span>Categories</span> <ChevronRight className="w-3.5 h-3.5" />
            <span>Food Sellers</span> <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#FF5E1E]">{selectedSellerType.name}</span>
          </div>
        </div>

        {/* Seller Type Header */}
        <div className="bg-gradient-to-r from-[#FFFDF9] to-[#FAF6F0] p-6 sm:p-8 rounded-3xl border border-[#F3EFE6] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-3xl mb-2 block">{selectedSellerType.icon}</span>
            <h1 className="font-['Outfit'] font-extrabold text-3xl sm:text-4xl text-[#1C1917]">
              {selectedSellerType.name} List
            </h1>
            <p className="text-sm text-[#78716C] font-medium mt-1 max-w-xl">
              Explore all registered {selectedSellerType.name} in Coimbatore. Click any seller card to view all available food items.
            </p>
          </div>
          <span className="hidden sm:block bg-[#FF5E1E]/10 text-[#FF5E1E] text-xs font-extrabold px-4 py-2 rounded-full uppercase">
            {sellersOfCategory.length} Listings
          </span>
        </div>

        {/* Seller Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sellersOfCategory.length > 0 ? (
            sellersOfCategory.map((seller) => (
              <div
                key={seller.id}
                onClick={() => onSelectSeller(seller)}
                className="group bg-[#FFFDF9] hover:bg-[#FAF6F0] rounded-3xl border border-[#F3EFE6] hover:border-[#FF5E1E]/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img src={seller.image} alt={seller.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-3 left-3 bg-[#1C1917] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase">
                    {seller.typeName}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/95 text-[#1C1917] text-xs font-extrabold px-2.5 py-1 rounded-xl shadow-xs flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {seller.rating}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-['Outfit'] font-bold text-lg text-[#1C1917] group-hover:text-[#FF5E1E]">
                    {seller.name}
                  </h3>
                  <p className="text-xs text-[#78716C] font-medium line-clamp-2">
                    {seller.shortDescription}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#78716C]">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5E1E] shrink-0" />
                    <span>{seller.location}</span>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-[#F3EFE6] flex items-center justify-between text-xs font-extrabold text-[#FF5E1E]">
                  <span>View All Food Items of this Hotel</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-[#FFFDF9] p-8 rounded-3xl border border-[#F3EFE6] text-center text-sm font-medium text-[#78716C]">
              No listings under {selectedSellerType.name} at the moment.
            </div>
          )}
        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN CATEGORIES VIEW: Search Bar + TWO SECTIONS (1. Cuisines, 2. Food Sellers)
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Search Bar */}
      <div className="bg-[#FFFDF9] p-4 sm:p-6 rounded-3xl border border-[#F3EFE6] shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-[#1C1917]">
              Browse Categories & Sellers
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C]">Select a cuisine variety or food seller type to explore items</p>
          </div>
        </div>

        <div className="bg-[#FAF6F0] p-2 rounded-2xl border border-[#F3EFE6] flex items-center space-x-3 px-4">
          <Search className="w-5 h-5 text-[#FF5E1E] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cuisines (South Indian, Biryani...) or sellers (Hotels, Juice Shops...)"
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#1C1917] placeholder-[#78716C] focus:outline-none py-1.5"
          />
        </div>

        {/* Main Section Filter Tabs */}
        <div className="flex items-center space-x-2 pt-2">
          <button
            onClick={() => setActiveCategoryTab('cuisines')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeCategoryTab === 'cuisines'
                ? 'bg-[#FF5E1E] text-white shadow-orange-glow'
                : 'bg-[#FAF6F0] text-[#1C1917] hover:bg-[#F3EFE6]'
            }`}
          >
            1. Cuisines ({filteredCuisines.length})
          </button>
          <button
            onClick={() => setActiveCategoryTab('sellers')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeCategoryTab === 'sellers'
                ? 'bg-[#FF5E1E] text-white shadow-orange-glow'
                : 'bg-[#FAF6F0] text-[#1C1917] hover:bg-[#F3EFE6]'
            }`}
          >
            2. Food Sellers ({filteredSellerTypes.length})
          </button>
          <button
            onClick={() => setActiveCategoryTab('all')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeCategoryTab === 'all'
                ? 'bg-[#1C1917] text-white'
                : 'bg-[#FAF6F0] text-[#78716C] hover:bg-[#F3EFE6]'
            }`}
          >
            Show Both Sections
          </button>
        </div>
      </div>

      {/* SECTION 1: CUISINES */}
      {(activeCategoryTab === 'cuisines' || activeCategoryTab === 'all') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
            <div>
              <span className="text-xs font-extrabold text-[#FF5E1E] uppercase tracking-wider">SECTION 1</span>
              <h2 className="font-['Outfit'] font-extrabold text-2xl text-[#1C1917]">
                Cuisines & Food Varieties
              </h2>
            </div>
            <span className="text-xs font-bold text-[#78716C]">Click any cuisine to view all dish items</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredCuisines.map((cuisine) => (
              <div
                key={cuisine.id}
                onClick={() => setSelectedCuisine(cuisine)}
                className="group bg-[#FFFDF9] hover:bg-[#FAF6F0] rounded-3xl border border-[#F3EFE6] hover:border-[#FF5E1E]/40 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-36 rounded-2xl overflow-hidden mb-3 bg-stone-100">
                  <img src={cuisine.image} alt={cuisine.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-2 left-2 text-2xl bg-white/90 p-1 rounded-xl shadow-xs">
                    {cuisine.icon}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-['Outfit'] font-bold text-base text-[#1C1917] group-hover:text-[#FF5E1E]">
                    {cuisine.name}
                  </h3>
                  <p className="text-xs text-[#78716C] font-medium line-clamp-2">
                    {cuisine.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#F3EFE6] flex items-center justify-between text-xs font-bold text-[#FF5E1E]">
                  <span>Explore Items</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: FOOD SELLERS */}
      {(activeCategoryTab === 'sellers' || activeCategoryTab === 'all') && (
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
            <div>
              <span className="text-xs font-extrabold text-[#FF5E1E] uppercase tracking-wider">SECTION 2</span>
              <h2 className="font-['Outfit'] font-extrabold text-2xl text-[#1C1917]">
                Food Sellers & Shop Types
              </h2>
            </div>
            <span className="text-xs font-bold text-[#78716C]">Click any seller type to view seller list</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
            {filteredSellerTypes.map((st) => (
              <div
                key={st.id}
                onClick={() => setSelectedSellerType(st)}
                className="group bg-[#FFFDF9] hover:bg-[#FAF6F0] rounded-3xl border border-[#F3EFE6] hover:border-[#FF5E1E]/40 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-36 rounded-2xl overflow-hidden mb-3 bg-stone-100">
                  <img src={st.image} alt={st.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-2 left-2 text-2xl bg-white/90 p-1 rounded-xl shadow-xs">
                    {st.icon}
                  </span>
                  <span className="absolute bottom-2 right-2 bg-[#1C1917] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                    {st.count}
                  </span>
                </div>

                <div>
                  <h3 className="font-['Outfit'] font-bold text-base text-[#1C1917] group-hover:text-[#FF5E1E]">
                    {st.name}
                  </h3>
                  <p className="text-xs text-[#78716C] font-medium">
                    Hotels, cafes, mess & specialty shops
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#F3EFE6] flex items-center justify-between text-xs font-bold text-[#FF5E1E]">
                  <span>View Seller List</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default CategoriesPage;
