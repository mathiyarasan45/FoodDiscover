import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CategoriesPage } from './components/CategoriesPage';
import { OffersPage } from './components/OffersPage';
import { WishlistPage } from './components/WishlistPage';
import { AccountPage } from './components/AccountPage';
import { FoodDetailModal } from './components/FoodDetailModal';
import { SellerDetailModal } from './components/SellerDetailModal';
import { Footer } from './components/Footer';
import { getWishlistItems } from './services/api';

export function App() {
  // Navigation active tab: 'home' | 'categories' | 'offers' | 'wishlist' | 'account'
  const [activeTab, setActiveTab] = useState('home');

  // Wishlist state initialized from API service
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(true);

  // Modal states for rich drill-down details
  const [selectedFoodModal, setSelectedFoodModal] = useState(null);
  const [selectedSellerModal, setSelectedSellerModal] = useState(null);

  // Load wishlist items on mount
  useEffect(() => {
    let isMounted = true;
    async function loadInitialWishlist() {
      try {
        setIsWishlistLoading(true);
        const data = await getWishlistItems('usr-1');
        if (isMounted) {
          setWishlistItems(data || []);
        }
      } catch (err) {
        console.error('Failed to load wishlist:', err);
      } finally {
        if (isMounted) setIsWishlistLoading(false);
      }
    }
    loadInitialWishlist();
    return () => { isMounted = false; };
  }, []);

  // Helper: check if food is in wishlist
  const isWishlisted = (foodId) => {
    return wishlistItems.some(item => item.id === foodId);
  };

  // Helper: toggle wishlist state
  const handleToggleWishlist = (food) => {
    if (!food) return;
    if (isWishlisted(food.id)) {
      setWishlistItems(prev => prev.filter(item => item.id !== food.id));
    } else {
      setWishlistItems(prev => [...prev, food]);
    }
  };

  // Helper: remove item from wishlist
  const handleRemoveFromWishlist = (foodId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== foodId));
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1C1917] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#FF5E1E] selection:text-white flex flex-col justify-between">
      
      <div>
        {/* Sticky 5-Item Header Navbar */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Main Content Body */}
        <main>
          {activeTab === 'home' && (
            <HomePage 
              onSelectFood={(food) => setSelectedFoodModal(food)}
              onSelectSeller={(seller) => setSelectedSellerModal(seller)}
              onNavigateTab={(tabId) => {
                setActiveTab(tabId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              isWishlisted={isWishlisted}
              onToggleWishlist={handleToggleWishlist}
            />
          )}

          {activeTab === 'categories' && (
            <CategoriesPage 
              onSelectFood={(food) => setSelectedFoodModal(food)}
              onSelectSeller={(seller) => setSelectedSellerModal(seller)}
              isWishlisted={isWishlisted}
              onToggleWishlist={handleToggleWishlist}
            />
          )}

          {activeTab === 'offers' && (
            <OffersPage 
              onSelectFood={(food) => setSelectedFoodModal(food)}
              onSelectSeller={(seller) => setSelectedSellerModal(seller)}
            />
          )}

          {activeTab === 'wishlist' && (
            <WishlistPage 
              wishlistItems={wishlistItems}
              isLoading={isWishlistLoading}
              onRemoveFromWishlist={handleRemoveFromWishlist}
              onSelectFood={(food) => setSelectedFoodModal(food)}
              onNavigateTab={(tabId) => {
                setActiveTab(tabId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'account' && (
            <AccountPage 
              wishlistCount={wishlistItems.length}
              onNavigateTab={(tabId) => {
                setActiveTab(tabId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer 
        onNavigateTab={(tabId) => {
          setActiveTab(tabId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Rich Food Detail Modal */}
      {selectedFoodModal && (
        <FoodDetailModal 
          food={selectedFoodModal}
          onClose={() => setSelectedFoodModal(null)}
          onSelectFood={(food) => setSelectedFoodModal(food)}
          onSelectSeller={(seller) => setSelectedSellerModal(seller)}
          isWishlisted={isWishlisted}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Rich Seller / Hotel Detail Modal */}
      {selectedSellerModal && (
        <SellerDetailModal 
          seller={selectedSellerModal}
          onClose={() => setSelectedSellerModal(null)}
          onSelectFood={(food) => setSelectedFoodModal(food)}
          isWishlisted={isWishlisted}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

    </div>
  );
}

export default App;

