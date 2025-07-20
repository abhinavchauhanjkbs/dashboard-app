const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Ensure /data directory exists in current working directory
const dataDir = path.resolve(__dirname, 'data'); // Use __dirname for consistency
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('📁 /data directory created');
}

// Path to SQLite database inside /data
const dbPath = path.join(dataDir, 'users.db');

// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Failed to connect to SQLite:', err.message);
  } else {
    console.log('✅ Connected to SQLite at', dbPath);
  }
});

// Create 'users' table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('❌ Error creating users table:', err.message);
  } else {
    console.log('✅ Users table is ready.');
  }
});

module.exports = db;
