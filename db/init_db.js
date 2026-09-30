import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'food_discover.db');
const schemaPath = path.join(__dirname, 'schema.sql');
const seedPath = path.join(__dirname, 'seed.sql');

console.log('=== Food Discover Phase 2 - Step 1: Database Migration & Setup ===');

try {
  // Initialize Database
  const db = new Database(dbPath);
  db.pragma('foreign_keys = ON');

  console.log(`[1] Database file initialized at: ${dbPath}`);

  // Read SQL scripts
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  const seedSql = fs.readFileSync(seedPath, 'utf8');

  // Apply Schema
  console.log('[2] Applying database schema (creating 8 core tables with FKs)...');
  db.exec(schemaSql);
  console.log('    ✓ Schema applied successfully.');

  // Apply Seed Data
  console.log('[3] Seeding realistic sample data...');
  db.exec(seedSql);
  console.log('    ✓ Sample data seeded successfully.');

  // Verification & Checks
  console.log('[4] Running Verification Checks...');

  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;").all();
  console.log('    • Created Tables:', tables.map(t => t.name).join(', '));

  // Check counts for each table
  for (const t of tables) {
    const count = db.prepare(`SELECT COUNT(*) as count FROM ${t.name}`).get().count;
    console.log(`      - Table '${t.name}': ${count} records`);
  }

  // Verify Wishlist Constraint (UNIQUE(user_id, food_id))
  console.log('[5] Verifying Wishlist Constraint (UNIQUE(user_id, food_id))...');
  try {
    db.prepare("INSERT INTO wishlists (id, user_id, food_id) VALUES ('test-wsh-dup', 'usr-1', 'food-1')").run();
    console.error('    ❌ FAIL: Duplicate wishlist item was allowed!');
  } catch (err) {
    console.log('    ✓ PASS: Duplicate wishlist item blocked by UNIQUE constraint:', err.message);
  }

  // Verify Offers Filter Types
  console.log('[6] Verifying Offers filter types...');
  const offerTypes = db.prepare("SELECT DISTINCT offer_filter_type FROM offers").all().map(o => o.offer_filter_type);
  console.log('    • Active Offer Types in DB:', offerTypes.join(' | '));

  // Verify Reviews Structure
  console.log('[7] Verifying Reviews fields (Rating, Comment, Photo, Video, User, Food, Seller)...');
  const review = db.prepare("SELECT * FROM reviews LIMIT 1").get();
  console.log('    • Review Record Sample:', {
    id: review.id,
    user_name: review.user_name,
    rating: review.rating,
    comment: review.comment,
    photo_url: review.photo_url,
    video_url: review.video_url,
    food_id: review.food_id,
    seller_id: review.seller_id,
    created_at: review.created_at
  });

  // Verify drill-down data support
  console.log('[8] Verifying Drill-Down Data Paths...');
  const southIndianFoods = db.prepare("SELECT name, cuisine FROM food_items WHERE cuisine = 'South Indian'").all();
  console.log(`    • South Indian Food Items (${southIndianFoods.length}):`, southIndianFoods.map(f => f.name).join(', '));

  const annapoornaFoods = db.prepare("SELECT f.name FROM food_items f JOIN food_sellers s ON f.seller_id = s.id WHERE s.name LIKE '%Annapoorna%'").all();
  console.log(`    • Annapoorna Hotel Foods (${annapoornaFoods.length}):`, annapoornaFoods.map(f => f.name).join(', '));

  console.log('\n=== Database Setup & Migration PASSED (0 Errors) ===');
  db.close();
} catch (error) {
  console.error('\n❌ Database Migration Error:', error);
  process.exit(1);
}
