import { 
  cuisineCategories, 
  sellerTypes, 
  foodItemsData, 
  foodSellersData, 
  offersData 
} from '../data/foodData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Helper for HTTP fetch with timeout and fallback
async function fetchApi(endpoint, options = {}, fallbackData = null) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP error status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`API Server fallback for ${endpoint}:`, err.message);
    return fallbackData;
  }
}

// -------------------------------------------------------------
// REQUIRED DATA SERVICE LAYER FUNCTIONS
// -------------------------------------------------------------

// 1. Users / Profile
export async function getUsers() {
  return fetchApi('/users', {}, [{
    id: 'usr-1',
    email: 'alex.morgan@fooddiscover.app',
    full_name: 'Alex Morgan',
    phone: '+91 98765 43210',
    default_location: 'RS Puram, Coimbatore',
    dietary_preference: 'All Cravings',
    discovery_notifications: 1,
    offer_notifications: 1,
    privacy_location_sharing: 1
  }]);
}

export async function getUserById(id) {
  return fetchApi(`/users/${id}`, {}, {
    id: id || 'usr-1',
    email: 'alex.morgan@fooddiscover.app',
    full_name: 'Alex Morgan',
    phone: '+91 98765 43210',
    default_location: 'RS Puram, Coimbatore',
    dietary_preference: 'All Cravings',
    discovery_notifications: 1,
    offer_notifications: 1,
    privacy_location_sharing: 1
  });
}

// 2. Cuisines
export async function getCuisines() {
  return fetchApi('/cuisines', {}, cuisineCategories);
}

export async function getCuisineById(id) {
  const fallback = cuisineCategories.find(c => c.id === id) || cuisineCategories[0];
  return fetchApi(`/cuisines/${id}`, {}, fallback);
}

// 3. Food Items by Cuisine
export async function getFoodItemsByCuisine(cuisineId) {
  const fallback = foodItemsData.filter(item => 
    item.cuisineId === cuisineId || 
    item.cuisine.toLowerCase() === cuisineId.toLowerCase()
  );
  return fetchApi(`/food-items?cuisine_id=${encodeURIComponent(cuisineId)}`, {}, fallback);
}

// 4. Food Item by ID
export async function getFoodItemById(id) {
  const fallback = foodItemsData.find(item => item.id === id) || foodItemsData[0];
  return fetchApi(`/food-items/${id}`, {}, fallback);
}

// 5. Food Seller Types
export async function getFoodSellerTypes() {
  return fetchApi('/seller-types', {}, sellerTypes);
}

// 6. Food Sellers by Type
export async function getFoodSellersByType(typeId) {
  const fallback = foodSellersData.filter(s => 
    s.type === typeId || 
    s.typeName === typeId
  );
  return fetchApi(`/food-sellers?type_id=${encodeURIComponent(typeId)}`, {}, fallback);
}

// 7. Food Seller by ID
export async function getFoodSellerById(id) {
  const fallback = foodSellersData.find(s => s.id === id) || foodSellersData[0];
  return fetchApi(`/food-sellers/${id}`, {}, fallback);
}

// 8. Food Items by Seller
export async function getFoodItemsBySeller(sellerId) {
  const fallback = foodItemsData.filter(item => item.sellerId === sellerId);
  return fetchApi(`/food-items?seller_id=${encodeURIComponent(sellerId)}`, {}, fallback);
}

// 9. Offers by Category (Cuisines vs Food Sellers)
export async function getOffersByCategory(categoryType) {
  const fallback = offersData.filter(o => 
    categoryType === 'All' || o.categoryType === categoryType
  );
  return fetchApi(`/offers?category_type=${encodeURIComponent(categoryType)}`, {}, fallback);
}

// 10. Offers by Filter Type (Buy 1 Get 1, Combo, etc.)
export async function getOffersByType(filterType) {
  const fallback = offersData.filter(o => 
    filterType === 'All' || o.offerFilter === filterType
  );
  return fetchApi(`/offers?offer_filter_type=${encodeURIComponent(filterType)}`, {}, fallback);
}

// 11. Wishlist Items for User
export async function getWishlistItems(userId = 'usr-1') {
  return fetchApi(`/wishlists/${userId}`, {}, [foodItemsData[0], foodItemsData[1]]);
}

// 12. Wishlist-Only Search (Searches ONLY within user's saved wishlist items)
export async function searchWishlistItems(userId = 'usr-1', query = '') {
  if (!query || query.trim() === '') {
    return getWishlistItems(userId);
  }
  const fallbackAll = await getWishlistItems(userId);
  const filtered = fallbackAll.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.cuisine.toLowerCase().includes(query.toLowerCase()) ||
    item.sellerName.toLowerCase().includes(query.toLowerCase()) ||
    item.location.toLowerCase().includes(query.toLowerCase())
  );
  return fetchApi(`/wishlists/${userId}?query=${encodeURIComponent(query)}`, {}, filtered);
}

// 13. Reviews by Food
export async function getReviewsByFood(foodId) {
  const food = foodItemsData.find(f => f.id === foodId);
  return fetchApi(`/reviews?food_id=${foodId}`, {}, food?.reviews || []);
}

// 14. Reviews by Seller
export async function getReviewsBySeller(sellerId) {
  const seller = foodSellersData.find(s => s.id === sellerId);
  return fetchApi(`/reviews?seller_id=${sellerId}`, {}, seller?.reviews || []);
}

// 15. Related Foods
export async function getRelatedFoods(foodId) {
  const target = foodItemsData.find(f => f.id === foodId);
  const fallback = foodItemsData.filter(f => f.id !== foodId && f.cuisineId === target?.cuisineId).slice(0, 4);
  return fetchApi(`/related-foods/${foodId}`, {}, fallback);
}

// 16. Related Sellers
export async function getRelatedSellers(sellerId) {
  const fallback = foodSellersData.filter(s => s.id !== sellerId).slice(0, 3);
  return fetchApi(`/related-sellers/${sellerId}`, {}, fallback);
}
