-- Cloudflare D1 Database Schema for Amberleaf Restaurant
CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT,
  rating REAL DEFAULT 4.8,
  popular INTEGER DEFAULT 0,
  signature INTEGER DEFAULT 0,
  chefs_pick INTEGER DEFAULT 0,
  vegetarian INTEGER DEFAULT 0,
  image TEXT,
  is_available INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
