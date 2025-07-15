const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Resolve absolute path to the database file
const dbPath = path.resolve(__dirname, 'users.db');

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Failed to connect to SQLite database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database at', dbPath);
  }
});

// Create users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )
`, (err) => {
  if (err) {
    console.error('❌ Error creating users table:', err.message);
  } else {
    console.log('✅ Users table is ready.');
  }
});

module.exports = db;
