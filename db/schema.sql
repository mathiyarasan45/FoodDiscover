-- Food Discover Database Schema (Phase 2 - Step 1)
-- Enable Foreign Key constraints in SQLite
PRAGMA foreign_keys = ON;

-- 1. Users Table (Profile, Settings & Preferences)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    default_location TEXT DEFAULT 'RS Puram, Coimbatore',
    dietary_preference TEXT DEFAULT 'All Cravings',
    discovery_notifications BOOLEAN DEFAULT 1,
    offer_notifications BOOLEAN DEFAULT 1,
    privacy_location_sharing BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Seller Types Table (Hotels, Mess, Juice Shops, etc.)
CREATE TABLE IF NOT EXISTS seller_types (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    icon TEXT,
    description TEXT,
    count TEXT
);

-- 3. Cuisines Table (South Indian, Biryani, Italian, etc.)
CREATE TABLE IF NOT EXISTS cuisines (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    icon TEXT,
    description TEXT,
    image_url TEXT
);

-- 4. Food Sellers Table (Restaurants & Food Outlets)
CREATE TABLE IF NOT EXISTS food_sellers (
    id TEXT PRIMARY KEY,
    type_id TEXT NOT NULL,
    type_name TEXT NOT NULL,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    short_description TEXT,
    full_description TEXT,
    hero_image_url TEXT NOT NULL,
    ambience_image_urls TEXT, -- JSON array string of image URLs
    rating_overall REAL DEFAULT 0.0,
    rating_price REAL DEFAULT 0.0,
    rating_quality REAL DEFAULT 0.0,
    rating_quantity REAL DEFAULT 0.0,
    reviews_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (type_id) REFERENCES seller_types(id) ON DELETE CASCADE
);

-- 5. Food Items Table (Individual Food Dishes)
CREATE TABLE IF NOT EXISTS food_items (
    id TEXT PRIMARY KEY,
    seller_id TEXT NOT NULL,
    seller_name TEXT NOT NULL,
    cuisine_id TEXT NOT NULL,
    cuisine TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    original_price REAL,
    location TEXT NOT NULL,
    is_veg BOOLEAN DEFAULT 1,
    badge TEXT,
    hero_image_url TEXT NOT NULL,
    gallery_image_urls TEXT, -- JSON array string of image URLs
    rating_overall REAL DEFAULT 0.0,
    rating_price REAL DEFAULT 0.0,
    rating_quality REAL DEFAULT 0.0,
    rating_quantity REAL DEFAULT 0.0,
    reviews_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES food_sellers(id) ON DELETE CASCADE,
    FOREIGN KEY (cuisine_id) REFERENCES cuisines(id) ON DELETE CASCADE
);

-- 6. Offers Table (Discounts and Deals)
CREATE TABLE IF NOT EXISTS offers (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    offer_filter_type TEXT NOT NULL CHECK (
        offer_filter_type IN (
            'Buy One Get One',
            'Combo Offer',
            'One Day Offer',
            'Limited Offer',
            'Percentage Discount',
            'Special Offer'
        )
    ),
    category_type TEXT NOT NULL CHECK (category_type IN ('Cuisines', 'Food Sellers')),
    target_food_id TEXT,
    target_seller_id TEXT,
    target_cuisine TEXT,
    target_seller TEXT,
    seller_name TEXT,
    original_price REAL,
    offer_price REAL,
    discount_badge TEXT NOT NULL,
    banner_image_url TEXT NOT NULL,
    validity_info TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (target_food_id) REFERENCES food_items(id) ON DELETE SET NULL,
    FOREIGN KEY (target_seller_id) REFERENCES food_sellers(id) ON DELETE SET NULL
);

-- 7. Wishlists Table (Saved Food Items ONLY per User)
CREATE TABLE IF NOT EXISTS wishlists (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    food_id TEXT NOT NULL,
    saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES food_items(id) ON DELETE CASCADE,
    CONSTRAINT unique_user_food_wishlist UNIQUE (user_id, food_id)
);

-- 8. Reviews Table (Customer Reviews with Photos/Videos)
CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    avatar_url TEXT,
    food_id TEXT,
    seller_id TEXT,
    rating REAL NOT NULL CHECK (rating >= 1.0 AND rating <= 5.0),
    comment TEXT NOT NULL,
    photo_url TEXT,
    video_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES food_items(id) ON DELETE CASCADE,
    FOREIGN KEY (seller_id) REFERENCES food_sellers(id) ON DELETE CASCADE
);
