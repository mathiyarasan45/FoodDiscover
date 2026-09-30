-- Food Discover Database Seed Script (Phase 2 - Step 1)

-- 1. Seed Sample User
INSERT OR REPLACE INTO users (id, email, full_name, phone, avatar_url, default_location, dietary_preference, discovery_notifications, offer_notifications, privacy_location_sharing)
VALUES (
    'usr-1',
    'alex.morgan@fooddiscover.app',
    'Alex Morgan',
    '+91 98765 43210',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    'RS Puram, Coimbatore',
    'All Cravings',
    1, 1, 1
);

-- 2. Seed Seller Types
INSERT OR REPLACE INTO seller_types (id, name, icon, description, count) VALUES
('st-hotels', 'Hotels', '🏨', 'Heritage vegetarian and non-veg dining hotels', '12 Listed'),
('st-mess', 'Traditional Mess', '🍛', 'Authentic homely South Indian mess and eateries', '18 Listed'),
('st-cafes', 'Cafes & Bakeries', '☕', 'Specialty coffee shops, artisanal bakeries', '15 Listed'),
('st-juice', 'Juice & Fruit Lounge', '🍹', 'Cold pressed juices, smoothies & fruit bowls', '9 Listed'),
('st-gelato', 'Artisan Ice Cream', '🍨', 'Handcrafted ice creams and gourmet desserts', '8 Listed');

-- 3. Seed Cuisines
INSERT OR REPLACE INTO cuisines (id, name, icon, description, image_url) VALUES
('c-south-indian', 'South Indian', '🥟', 'Authentic Dosa, Idli, Vada & Tiffin items across Kovai', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80'),
('c-biryani', 'Biryani', '🍲', 'Seeraga Samba, Dum Biryani & authentic meat preparations', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'),
('c-parotta', 'Parotta', '🫓', 'Flaky Madurai Bun Parotta, Kothu Parotta & Salna', 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=600&q=80'),
('c-italian', 'Pizza & Italian', '🍕', 'Woodfired sourdough pizzas, creamy pasta & sides', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'),
('c-fast-food', 'Burgers & Fast Food', '🍔', 'Smash burgers, loaded fries & crispy snacks', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'),
('c-ice-cream', 'Ice Cream & Desserts', '🍨', 'Artisan gelatos, badam milkshakes & traditional sweets', 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80'),
('c-healthy', 'Healthy Food', '🥗', 'Organic salad bowls, fruit smoothies & detox juices', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80');

-- 4. Seed Food Sellers
INSERT OR REPLACE INTO food_sellers (
    id, type_id, type_name, name, location, short_description, full_description, hero_image_url, ambience_image_urls,
    rating_overall, rating_price, rating_quality, rating_quantity, reviews_count
) VALUES
(
    'sel-annapoorna',
    'st-hotels',
    'Hotels',
    'Annapoorna Heritage Hotel',
    'RS Puram, Coimbatore',
    'Coimbatore''s legendary South Indian dining house famous for Crispy Ghee Roast & Filter Coffee.',
    'Serving authentic Kovai flavors since 1968. Famous for traditional Ghee Roast Dosa, Sambar Vada, Mini Tiffin, and signature Kovai Brass Filter Coffee.',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80","https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"]',
    4.8, 4.7, 4.9, 4.8, 1420
),
(
    'sel-biryani-hub',
    'st-hotels',
    'Hotels',
    'Kovai Seeraga Samba Biryani Hub',
    'Gandhipuram, Coimbatore',
    'Traditional wood-fired Seeraga Samba Mutton & Chicken Dum Biryani cooked with farm-fresh spices.',
    'Specialized in aromatic Kongu-style Seeraga Samba Mutton Dum Biryani cooked slow over wood fire. Tender mutton cuts infused with fresh green herbs and homegrown spices.',
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80","https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"]',
    4.9, 4.6, 4.9, 4.8, 2150
),
(
    'sel-bun-parotta',
    'st-mess',
    'Traditional Mess',
    'Madurai Bun Parotta Grill & Street Mess',
    'Peelamedu, Coimbatore',
    'Flaky Madurai style soft bun parottas served with rich spicy mutton salna gravy.',
    'Brings Madurai street food mastery to Peelamedu. Multi-layered bun parottas fried in ghee, served with rich aromatic chicken curry and spicy gravy.',
    'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=600&q=80"]',
    4.7, 4.8, 4.7, 4.9, 870
),
(
    'sel-oasis',
    'st-juice',
    'Juice & Fruit Lounge',
    'The Oasis Fresh Juice & Fruit Lounge',
    'Race Course, Coimbatore',
    '100% natural cold-pressed fruit juices, organic detox smoothies, and badam milkshakes.',
    'Located near Race Course walking park. Offers fresh cold-pressed fruit juices with no added water or preservatives. Famous for Watermelon Mojito & Badam Milkshake.',
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"]',
    4.8, 4.7, 4.9, 4.7, 620
);

-- 5. Seed Food Items
INSERT OR REPLACE INTO food_items (
    id, seller_id, seller_name, cuisine_id, cuisine, name, description, price, original_price, location, is_veg, badge, hero_image_url, gallery_image_urls,
    rating_overall, rating_price, rating_quality, rating_quantity, reviews_count
) VALUES
(
    'food-1',
    'sel-annapoorna',
    'Annapoorna Heritage Hotel',
    'c-south-indian',
    'South Indian',
    'Crispy Ghee Roast Sambar Dosa',
    'Crispy golden rice crepe roasted generously in pure ghee, served with hot authentic Kovai drumstick sambar & 3 varieties of fresh coconut chutney.',
    120.00, 140.00,
    'RS Puram, Coimbatore',
    1,
    'BESTSELLER',
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80"]',
    4.8, 4.7, 4.9, 4.8, 1420
),
(
    'food-2',
    'sel-biryani-hub',
    'Kovai Seeraga Samba Biryani Hub',
    'c-biryani',
    'Biryani',
    'Seeraga Samba Mutton Dum Biryani',
    'Traditional Kongu-style aromatic Seeraga Samba rice biryani slow cooked over firewood with tender succulent mutton pieces and farm-fresh herbs.',
    320.00, 360.00,
    'Gandhipuram, Coimbatore',
    0,
    'TOP RATED',
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"]',
    4.9, 4.6, 4.9, 4.8, 2150
),
(
    'food-3',
    'sel-bun-parotta',
    'Madurai Bun Parotta Grill & Street Mess',
    'c-parotta',
    'Parotta',
    'Madurai Soft Bun Parotta Set',
    'Two fluffy, multi-layered golden bun parottas fried with pure ghee, served with rich spicy mutton salna gravy and onion raita.',
    160.00, 180.00,
    'Peelamedu, Coimbatore',
    0,
    'TRENDING',
    'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=800&q=80"]',
    4.7, 4.8, 4.7, 4.9, 870
),
(
    'food-4',
    'sel-oasis',
    'The Oasis Fresh Juice & Fruit Lounge',
    'c-healthy',
    'Healthy Food',
    'Cold-Pressed Watermelon Mojito',
    'Refreshing 100% natural cold-pressed watermelon juice muddled with fresh mint leaves, lime juice, and rock salt.',
    90.00, 110.00,
    'Race Course, Coimbatore',
    1,
    'HEALTHY PICK',
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"]',
    4.8, 4.7, 4.9, 4.7, 620
),
(
    'food-7',
    'sel-annapoorna',
    'Annapoorna Heritage Hotel',
    'c-south-indian',
    'South Indian',
    'Special Mini Tiffin Combo Set',
    'Combination platter containing 1 mini ghee roast, 2 soft button idlis, 1 medu vada, kesari sweet, drumstick sambar, and 3 chutneys.',
    140.00, 160.00,
    'RS Puram, Coimbatore',
    1,
    'POPULAR COMBO',
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80"]',
    4.8, 4.8, 4.9, 4.8, 920
),
(
    'food-8',
    'sel-annapoorna',
    'Annapoorna Heritage Hotel',
    'c-south-indian',
    'South Indian',
    'Authentic Kovai Brass Filter Coffee',
    'Freshly brewed dark roasted chicory coffee blended with frothy boiled whole milk, served in traditional brass davarah tumbler.',
    35.00, 40.00,
    'RS Puram, Coimbatore',
    1,
    'ICONIC BEVERAGE',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    '["https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"]',
    4.9, 4.9, 4.9, 4.8, 3100
);

-- 6. Seed Offers
INSERT OR REPLACE INTO offers (
    id, title, description, offer_filter_type, category_type, target_food_id, target_seller_id, target_cuisine, target_seller, seller_name,
    original_price, offer_price, discount_badge, banner_image_url, validity_info
) VALUES
(
    'off-1',
    'Buy 1 Get 1 Free Ghee Roast Dosa',
    'Order 1 Crispy Ghee Roast Sambar Dosa at Annapoorna Heritage Hotel and get another Ghee Roast completely free.',
    'Buy One Get One',
    'Cuisines',
    'food-1',
    'sel-annapoorna',
    'South Indian',
    'Annapoorna Heritage Hotel',
    'Annapoorna Heritage Hotel',
    240.00, 120.00,
    'BUY 1 GET 1 BOGO',
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    'Valid Today Only'
),
(
    'off-2',
    'Kovai Biryani Hub - BOGO Mutton & Chicken Feast',
    'Buy any family bucket at Kovai Dum Biryani Hub and get a free chicken starter dish.',
    'Buy One Get One',
    'Food Sellers',
    'food-2',
    'sel-biryani-hub',
    'Biryani',
    'Kovai Seeraga Samba Biryani Hub',
    'Kovai Seeraga Samba Biryani Hub',
    450.00, 320.00,
    'BUY 1 GET 1 BOGO',
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    'Valid on weekends'
),
(
    'off-3',
    'The Oasis Juices - 1+1 Free Badam Milkshake',
    'Buy 1 Saffron Royal Badam Milkshake and get 1 extra Badam Shake completely free!',
    'One Day Offer',
    'Food Sellers',
    'food-4',
    'sel-oasis',
    'Healthy Food',
    'The Oasis Fresh Juice & Fruit Lounge',
    'The Oasis Fresh Juice & Fruit Lounge',
    180.00, 90.00,
    '1+1 BOGO OFFER',
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    'Valid 4 PM - 8 PM'
),
(
    'off-4',
    'Annapoorna Hotel Special - Heritage Breakfast Fest',
    'Discover all breakfast items at Annapoorna RS Puram with special festive pricing & complimentary filter coffee.',
    'Special Offer',
    'Food Sellers',
    'food-1',
    'sel-annapoorna',
    'South Indian',
    'Annapoorna Heritage Hotel',
    'Annapoorna Heritage Hotel',
    160.00, 120.00,
    'HERITAGE FEST DEAL',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    'Valid this week'
),
(
    'off-5',
    'Flat 25% Off on Madurai Bun Parotta Combo',
    'Enjoy 25% flat discount on Madurai Bun Parotta with Mutton Salna across Peelamedu branch.',
    'Percentage Discount',
    'Cuisines',
    'food-3',
    'sel-bun-parotta',
    'Parotta',
    'Madurai Bun Parotta Grill & Street Mess',
    'Madurai Bun Parotta Grill & Street Mess',
    200.00, 150.00,
    '25% OFF',
    'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=800&q=80',
    'Limited Period Deal'
),
(
    'off-6',
    'Weekend Special Mini Tiffin Family Combo',
    'Special discount price on Mini Tiffin combo set including 1 free Kovai Brass Filter Coffee.',
    'Combo Offer',
    'Cuisines',
    'food-7',
    'sel-annapoorna',
    'South Indian',
    'Annapoorna Heritage Hotel',
    'Annapoorna Heritage Hotel',
    175.00, 135.00,
    'COMBO DEAL',
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    'Valid Every Saturday & Sunday'
);

-- 7. Seed Wishlists (Saved Food Items ONLY)
INSERT OR REPLACE INTO wishlists (id, user_id, food_id) VALUES
('wsh-1', 'usr-1', 'food-1'),
('wsh-2', 'usr-1', 'food-2');

-- 8. Seed Reviews
INSERT OR REPLACE INTO reviews (
    id, user_id, user_name, avatar_url, food_id, seller_id, rating, comment, photo_url, video_url
) VALUES
(
    'rev-1',
    'usr-1',
    'Kavitha Sundaram',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    'food-1',
    'sel-annapoorna',
    5.0,
    'The ghee roast at Annapoorna is unmatched in Coimbatore! Perfectly crispy on the outside, soft inside, and the drumstick sambar is divine.',
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80',
    NULL
),
(
    'rev-2',
    'usr-1',
    'Rajesh Kumar',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    'food-2',
    'sel-biryani-hub',
    4.9,
    'Best Seeraga Samba Mutton Biryani in Kovai. Meat is super tender and cooked over wood fire. Smells amazing!',
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80',
    NULL
);
