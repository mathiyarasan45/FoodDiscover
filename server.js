import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection & auto-setup for production
const dbDir = path.join(__dirname, 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}
const dbPath = path.join(dbDir, 'food_discover.db');
const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

// Auto-seed database if schema tables do not exist
try {
  const tableCheck = db.prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").get();
  if (!tableCheck || tableCheck.count === 0) {
    const schemaSql = fs.readFileSync(path.join(dbDir, 'schema.sql'), 'utf8');
    const seedSql = fs.readFileSync(path.join(dbDir, 'seed.sql'), 'utf8');
    db.exec(schemaSql);
    db.exec(seedSql);
    console.log('[API Server] Database schema and sample seed data auto-initialized.');
  }
} catch (e) {
  console.error('[API Server] Database auto-initialization check:', e.message);
}

const allowedOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

// Helper: parse JSON string fields safely
const parseJsonField = (fieldStr, fallback = []) => {
  if (!fieldStr) return fallback;
  try {
    return JSON.parse(fieldStr);
  } catch (e) {
    return fallback;
  }
};

// Format Food Item Record
const formatFoodItem = (item) => {
  if (!item) return null;
  return {
    ...item,
    price: Number(item.price),
    originalPrice: item.original_price ? Number(item.original_price) : null,
    rating: Number(item.rating_overall),
    reviewsCount: item.reviews_count,
    isVeg: Boolean(item.is_veg),
    image: item.hero_image_url,
    images: parseJsonField(item.gallery_image_urls, [item.hero_image_url]),
    sellerId: item.seller_id,
    sellerName: item.seller_name,
    cuisineId: item.cuisine_id,
    ratingBreakdown: {
      price: Number(item.rating_price || 4.7),
      quality: Number(item.rating_quality || 4.9),
      quantity: Number(item.rating_quantity || 4.8),
      overall: Number(item.rating_overall || 4.8)
    }
  };
};

// Format Seller Record
const formatSeller = (seller) => {
  if (!seller) return null;
  return {
    ...seller,
    rating: Number(seller.rating_overall),
    reviewsCount: seller.reviews_count,
    image: seller.hero_image_url,
    ambienceImages: parseJsonField(seller.ambience_image_urls, [seller.hero_image_url]),
    shortDescription: seller.short_description,
    fullDescription: seller.full_description,
    typeName: seller.type_name,
    type: seller.type_name,
    ratingBreakdown: {
      price: Number(seller.rating_price || 4.7),
      quality: Number(seller.rating_quality || 4.9),
      quantity: Number(seller.rating_quantity || 4.8),
      overall: Number(seller.rating_overall || 4.8)
    }
  };
};

// -------------------------------------------------------------
// REST API ENDPOINTS
// -------------------------------------------------------------

// 1. Users / Profile
app.get('/api/users', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// 2. Cuisines
app.get('/api/cuisines', (req, res) => {
  const cuisines = db.prepare('SELECT * FROM cuisines ORDER BY name ASC').all();
  res.json(cuisines);
});

app.get('/api/cuisines/:id', (req, res) => {
  const cuisine = db.prepare('SELECT * FROM cuisines WHERE id = ?').get(req.params.id);
  if (!cuisine) return res.status(404).json({ error: 'Cuisine not found' });
  res.json(cuisine);
});

// 3. Seller Types
app.get('/api/seller-types', (req, res) => {
  const types = db.prepare('SELECT * FROM seller_types').all();
  res.json(types);
});

// 4. Food Sellers
app.get('/api/food-sellers', (req, res) => {
  const { type_id, search } = req.query;
  let sql = 'SELECT * FROM food_sellers WHERE 1=1';
  const params = [];

  if (type_id) {
    sql += ' AND (type_id = ? OR type_name = ?)';
    params.push(type_id, type_id);
  }
  if (search) {
    sql += ' AND (name LIKE ? OR location LIKE ? OR short_description LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  const sellers = db.prepare(sql).all(...params);
  res.json(sellers.map(formatSeller));
});

app.get('/api/food-sellers/:id', (req, res) => {
  const seller = db.prepare('SELECT * FROM food_sellers WHERE id = ?').get(req.params.id);
  if (!seller) return res.status(404).json({ error: 'Seller not found' });

  // Attach reviews & foods
  const reviews = db.prepare('SELECT * FROM reviews WHERE seller_id = ?').all(seller.id);
  const foods = db.prepare('SELECT * FROM food_items WHERE seller_id = ?').all(seller.id).map(formatFoodItem);

  const formatted = formatSeller(seller);
  formatted.reviews = reviews.map(r => ({
    id: r.id,
    user: r.user_name,
    avatar: r.avatar_url,
    rating: Number(r.rating),
    comment: r.comment,
    photo: r.photo_url,
    video: r.video_url,
    date: r.created_at
  }));
  formatted.foods = foods;

  res.json(formatted);
});

// 5. Food Items
app.get('/api/food-items', (req, res) => {
  const { cuisine_id, seller_id, search } = req.query;
  let sql = 'SELECT * FROM food_items WHERE 1=1';
  const params = [];

  if (cuisine_id) {
    sql += ' AND (cuisine_id = ? OR cuisine = ?)';
    params.push(cuisine_id, cuisine_id);
  }
  if (seller_id) {
    sql += ' AND seller_id = ?';
    params.push(seller_id);
  }
  if (search) {
    sql += ' AND (name LIKE ? OR cuisine LIKE ? OR seller_name LIKE ? OR location LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  const items = db.prepare(sql).all(...params);
  res.json(items.map(formatFoodItem));
});

app.get('/api/food-items/:id', (req, res) => {
  const item = db.prepare('SELECT * FROM food_items WHERE id = ?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Food item not found' });

  const reviews = db.prepare('SELECT * FROM reviews WHERE food_id = ? OR seller_id = ?').all(item.id, item.seller_id);
  const formatted = formatFoodItem(item);
  formatted.reviews = reviews.map(r => ({
    id: r.id,
    user: r.user_name,
    avatar: r.avatar_url,
    rating: Number(r.rating),
    comment: r.comment,
    photo: r.photo_url,
    video: r.video_url,
    date: r.created_at
  }));

  res.json(formatted);
});

// 6. Offers
app.get('/api/offers', (req, res) => {
  const { category_type, offer_filter_type, search } = req.query;
  let sql = 'SELECT * FROM offers WHERE 1=1';
  const params = [];

  if (category_type && category_type !== 'All') {
    sql += ' AND category_type = ?';
    params.push(category_type);
  }
  if (offer_filter_type && offer_filter_type !== 'All') {
    sql += ' AND offer_filter_type = ?';
    params.push(offer_filter_type);
  }
  if (search) {
    sql += ' AND (title LIKE ? OR description LIKE ? OR target_cuisine LIKE ? OR seller_name LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  const offers = db.prepare(sql).all(...params);
  const formatted = offers.map(o => ({
    id: o.id,
    title: o.title,
    description: o.description,
    offerFilter: o.offer_filter_type,
    categoryType: o.category_type,
    targetCuisine: o.target_cuisine,
    targetSeller: o.target_seller,
    sellerName: o.seller_name,
    originalPrice: Number(o.original_price),
    offerPrice: Number(o.offer_price),
    discount: o.discount_badge,
    image: o.banner_image_url,
    validity: o.validity_info,
    targetFoodId: o.target_food_id,
    targetSellerId: o.target_seller_id
  }));

  res.json(formatted);
});

// 7. Wishlists (User Saved Items ONLY + Wishlist-only Search)
app.get('/api/wishlists/:userId', (req, res) => {
  const { userId } = req.params;
  const { query } = req.query;

  let sql = `
    SELECT f.* FROM food_items f
    JOIN wishlists w ON f.id = w.food_id
    WHERE w.user_id = ?
  `;
  const params = [userId];

  if (query && query.trim() !== '') {
    sql += ` AND (f.name LIKE ? OR f.cuisine LIKE ? OR f.seller_name LIKE ? OR f.location LIKE ?)`;
    const term = `%${query}%`;
    params.push(term, term, term, term);
  }

  const items = db.prepare(sql).all(...params);
  res.json(items.map(formatFoodItem));
});

app.post('/api/wishlists', (req, res) => {
  const { userId, foodId } = req.body;
  if (!userId || !foodId) return res.status(400).json({ error: 'userId and foodId required' });

  try {
    db.prepare('INSERT INTO wishlists (id, user_id, food_id) VALUES (?, ?, ?)').run(
      `wsh-${Date.now()}`, userId, foodId
    );
    res.json({ success: true, message: 'Added to wishlist' });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(200).json({ success: true, message: 'Already in wishlist' });
    }
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/wishlists/:userId/:foodId', (req, res) => {
  const { userId, foodId } = req.params;
  db.prepare('DELETE FROM wishlists WHERE user_id = ? AND food_id = ?').run(userId, foodId);
  res.json({ success: true, message: 'Removed from wishlist' });
});

// 8. Reviews
app.get('/api/reviews', (req, res) => {
  const { food_id, seller_id } = req.query;
  let sql = 'SELECT * FROM reviews WHERE 1=1';
  const params = [];

  if (food_id) {
    sql += ' AND food_id = ?';
    params.push(food_id);
  }
  if (seller_id) {
    sql += ' AND seller_id = ?';
    params.push(seller_id);
  }

  const reviews = db.prepare(sql).all(...params);
  res.json(reviews.map(r => ({
    id: r.id,
    user: r.user_name,
    avatar: r.avatar_url,
    rating: Number(r.rating),
    comment: r.comment,
    photo: r.photo_url,
    video: r.video_url,
    date: r.created_at
  })));
});

// 9. Related Foods & Sellers
app.get('/api/related-foods/:id', (req, res) => {
  const food = db.prepare('SELECT cuisine_id FROM food_items WHERE id = ?').get(req.params.id);
  if (!food) return res.json([]);

  const related = db.prepare('SELECT * FROM food_items WHERE cuisine_id = ? AND id != ? LIMIT 4').all(food.cuisine_id, req.params.id);
  res.json(related.map(formatFoodItem));
});

app.get('/api/related-sellers/:id', (req, res) => {
  const related = db.prepare('SELECT * FROM food_sellers WHERE id != ? LIMIT 3').all(req.params.id);
  res.json(related.map(formatSeller));
});

// Serve frontend static build files in production mode
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('/{*splat}', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[API Server] Food Discover running on port ${PORT}`);
});
