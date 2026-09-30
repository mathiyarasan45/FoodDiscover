import React, { useState, useEffect } from 'react';
import { User, Settings, Bell, Shield, MapPin, Heart, HelpCircle, LogOut, CheckCircle2, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
import { currentLocationName } from '../data/foodData';
import { getUserById } from '../services/api';

export const AccountPage = ({ wishlistCount, onNavigateTab }) => {
  const [activeSubTab, setActiveSubTab] = useState('profile');
  
  // User Profile state from API
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Settings State Mockups
  const [dietaryPref, setDietaryPref] = useState('All Cravings');
  const [discoveryNotifications, setDiscoveryNotifications] = useState(true);
  const [offerNotifications, setOfferNotifications] = useState(true);
  const [privacyLocation, setPrivacyLocation] = useState(true);
  const [showLogoutNotice, setShowLogoutNotice] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadUserProfile() {
      try {
        setIsLoading(true);
        const u = await getUserById('usr-1');
        if (isMounted && u) {
          setUserData(u);
          if (u.dietary_preference) setDietaryPref(u.dietary_preference);
          setDiscoveryNotifications(Boolean(u.discovery_notifications));
          setOfferNotifications(Boolean(u.offer_notifications));
          setPrivacyLocation(Boolean(u.privacy_location_sharing));
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadUserProfile();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Account Profile Header Card */}
      <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FAF6F0] to-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#F3EFE6] shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4 sm:space-x-6 text-center sm:text-left">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
              alt="Profile Avatar"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white" title="Active Food Discovery Enthusiast"></span>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-[#FF5E1E]/10 text-[#FF5E1E] px-3 py-0.5 rounded-full text-xs font-extrabold uppercase">
              <Sparkles className="w-3 h-3" />
              <span>Pro Food Discoverer</span>
            </div>
            <h1 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-[#1C1917]">
              Alex Morgan
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C] font-medium">
              alex.morgan@fooddiscover.app • Joined Kovai Taste Trail
            </p>
          </div>
        </div>

        {/* Quick Wishlist Stat Pill */}
        <button
          onClick={() => onNavigateTab('wishlist')}
          className="bg-white hover:bg-rose-50 border border-[#F3EFE6] hover:border-rose-200 px-5 py-3 rounded-2xl flex items-center space-x-3 transition-colors shadow-2xs"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-500">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-[#78716C] uppercase">Saved Items</div>
            <div className="text-lg font-extrabold text-[#1C1917]">{wishlistCount} Saved Foods</div>
          </div>
        </button>
      </div>

      {/* Account Settings Layout: Left Navigation + Right Settings Form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Settings Sidebar */}
        <div className="md:col-span-4 bg-[#FFFDF9] p-3 rounded-3xl border border-[#F3EFE6] shadow-sm space-y-1">
          
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition-all ${
              activeSubTab === 'profile'
                ? 'bg-[#FF5E1E] text-white shadow-orange-glow'
                : 'text-[#1C1917] hover:bg-[#FAF6F0]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <User className="w-4 h-4" />
              <span>Profile & Account</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>

          <button
            onClick={() => setActiveSubTab('preferences')}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition-all ${
              activeSubTab === 'preferences'
                ? 'bg-[#FF5E1E] text-white shadow-orange-glow'
                : 'text-[#1C1917] hover:bg-[#FAF6F0]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Settings className="w-4 h-4" />
              <span>App & Dietary Preferences</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>

          <button
            onClick={() => setActiveSubTab('notifications')}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition-all ${
              activeSubTab === 'notifications'
                ? 'bg-[#FF5E1E] text-white shadow-orange-glow'
                : 'text-[#1C1917] hover:bg-[#FAF6F0]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Bell className="w-4 h-4" />
              <span>Notification Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>

          <button
            onClick={() => setActiveSubTab('privacy')}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition-all ${
              activeSubTab === 'privacy'
                ? 'bg-[#FF5E1E] text-white shadow-orange-glow'
                : 'text-[#1C1917] hover:bg-[#FAF6F0]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-4 h-4" />
              <span>Privacy & Security</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>

          <button
            onClick={() => setActiveSubTab('location')}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition-all ${
              activeSubTab === 'location'
                ? 'bg-[#FF5E1E] text-white shadow-orange-glow'
                : 'text-[#1C1917] hover:bg-[#FAF6F0]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4" />
              <span>Location Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>

          <button
            onClick={() => setActiveSubTab('help')}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition-all ${
              activeSubTab === 'help'
                ? 'bg-[#FF5E1E] text-white shadow-orange-glow'
                : 'text-[#1C1917] hover:bg-[#FAF6F0]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <HelpCircle className="w-4 h-4" />
              <span>Help & Support</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>

          <div className="pt-3 border-t border-[#F3EFE6] mt-2">
            <button
              onClick={() => setShowLogoutNotice(true)}
              className="w-full flex items-center space-x-3 p-3.5 rounded-2xl font-bold text-sm text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

        </div>

        {/* Right Content Panels */}
        <div className="md:col-span-8 bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#F3EFE6] shadow-sm space-y-6">
          
          {/* Panel 1: Profile & Account */}
          {activeSubTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="font-['Outfit'] font-extrabold text-xl text-[#1C1917]">
                Personal Profile Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#78716C] uppercase">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Alex Morgan"
                    className="w-full bg-[#FAF6F0] p-3 rounded-xl border border-[#F3EFE6] text-sm font-semibold text-[#1C1917]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#78716C] uppercase">Email Address</label>
                  <input
                    type="email"
                    defaultValue="alex.morgan@fooddiscover.app"
                    className="w-full bg-[#FAF6F0] p-3 rounded-xl border border-[#F3EFE6] text-sm font-semibold text-[#1C1917]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#78716C] uppercase">Phone Number</label>
                  <input
                    type="text"
                    defaultValue="+91 98765 43210"
                    className="w-full bg-[#FAF6F0] p-3 rounded-xl border border-[#F3EFE6] text-sm font-semibold text-[#1C1917]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#78716C] uppercase">Primary Discovery Zone</label>
                  <input
                    type="text"
                    defaultValue={currentLocationName}
                    readOnly
                    className="w-full bg-[#FAF6F0] p-3 rounded-xl border border-[#F3EFE6] text-sm font-semibold text-[#1C1917]"
                  />
                </div>
              </div>

              <button className="bg-[#1C1917] text-white hover:bg-[#FF5E1E] font-bold text-sm px-6 py-3 rounded-xl transition-colors">
                Save Account Changes
              </button>
            </div>
          )}

          {/* Panel 2: App Preferences */}
          {activeSubTab === 'preferences' && (
            <div className="space-y-6">
              <h3 className="font-['Outfit'] font-extrabold text-xl text-[#1C1917]">
                Food Discovery Preferences
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#78716C] uppercase block mb-2">Dietary Preference Filter</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['All Cravings', 'Pure Veg Only', 'Non-Veg Lover'].map((pref) => (
                      <button
                        key={pref}
                        onClick={() => setDietaryPref(pref)}
                        className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                          dietaryPref === pref
                            ? 'bg-[#FF5E1E] text-white border-[#FF5E1E]'
                            : 'bg-[#FAF6F0] text-[#1C1917] border-[#F3EFE6]'
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Panel 3: Notifications */}
          {activeSubTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="font-['Outfit'] font-extrabold text-xl text-[#1C1917]">
                Notification Preferences
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#FAF6F0] rounded-2xl border border-[#F3EFE6]">
                  <div>
                    <div className="text-sm font-bold text-[#1C1917]">New Food Discovery Alerts</div>
                    <div className="text-xs text-[#78716C]">Get notified when new food items are added in your area</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={discoveryNotifications}
                    onChange={(e) => setDiscoveryNotifications(e.target.checked)}
                    className="w-5 h-5 accent-[#FF5E1E] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#FAF6F0] rounded-2xl border border-[#F3EFE6]">
                  <div>
                    <div className="text-sm font-bold text-[#1C1917]">Special Offer Digests</div>
                    <div className="text-xs text-[#78716C]">Receive notifications about Buy 1 Get 1 & discount offers</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={offerNotifications}
                    onChange={(e) => setOfferNotifications(e.target.checked)}
                    className="w-5 h-5 accent-[#FF5E1E] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Panel 4: Privacy */}
          {activeSubTab === 'privacy' && (
            <div className="space-y-6">
              <h3 className="font-['Outfit'] font-extrabold text-xl text-[#1C1917]">
                Privacy & Data Settings
              </h3>

              <div className="flex items-center justify-between p-4 bg-[#FAF6F0] rounded-2xl border border-[#F3EFE6]">
                <div>
                  <div className="text-sm font-bold text-[#1C1917]">Location Sharing Privacy</div>
                  <div className="text-xs text-[#78716C]">Use precise location only for discovering nearby food sellers</div>
                </div>
                <input
                  type="checkbox"
                  checked={privacyLocation}
                  onChange={(e) => setPrivacyLocation(e.target.checked)}
                  className="w-5 h-5 accent-[#FF5E1E] cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Panel 5: Location */}
          {activeSubTab === 'location' && (
            <div className="space-y-6">
              <h3 className="font-['Outfit'] font-extrabold text-xl text-[#1C1917]">
                Default Discovery Location
              </h3>

              <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#F3EFE6] space-y-2">
                <div className="text-xs font-bold text-[#78716C] uppercase">Current Configured Zone</div>
                <div className="text-base font-extrabold text-[#1C1917] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#FF5E1E]" />
                  {currentLocationName}
                </div>
                <p className="text-xs text-[#78716C]">
                  Food Discover displays foods, sellers, and special offers available in this zone.
                </p>
              </div>
            </div>
          )}

          {/* Panel 6: Help & Support */}
          {activeSubTab === 'help' && (
            <div className="space-y-6">
              <h3 className="font-['Outfit'] font-extrabold text-xl text-[#1C1917]">
                Food Discover Help & Support
              </h3>

              <div className="space-y-3">
                <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#F3EFE6] space-y-1">
                  <h4 className="font-bold text-sm text-[#1C1917]">What is Food Discover?</h4>
                  <p className="text-xs text-[#78716C]">
                    Food Discover is a food discovery platform designed to help food lovers explore authentic food items, seller details, reviews, rating breakdowns, and special offers in their region.
                  </p>
                </div>
                <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#F3EFE6] space-y-1">
                  <h4 className="font-bold text-sm text-[#1C1917]">Contact Support Team</h4>
                  <p className="text-xs text-[#78716C]">
                    Email us at: support@fooddiscover.app
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Logout Notice Modal */}
      {showLogoutNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFDF9] p-6 rounded-3xl max-w-sm w-full text-center space-y-4 border border-[#F3EFE6]">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto font-bold text-xl">
              🚪
            </div>
            <h3 className="font-bold text-lg text-[#1C1917]">Logout of Food Discover?</h3>
            <p className="text-xs text-[#78716C]">You can return anytime to discover fresh food items and offers.</p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowLogoutNotice(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#F3EFE6] font-bold text-xs text-[#1C1917]"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowLogoutNotice(false)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AccountPage;
