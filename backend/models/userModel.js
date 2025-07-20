const db = require('../db');

// 👤 Create new user
const createUser = (email, password, callback) => {
  console.log("📨 Registering user:", email);
  const query = `INSERT INTO users (email, password) VALUES (?, ?)`;

  db.run(query, [email, password], function (err) {
    if (err) {
      console.error('❌ Error inserting user:', err.message);
      return callback(err);
    }
    console.log('✅ New user inserted with ID:', this.lastID);
    callback(null, this.lastID);
  });
};

// 🔍 Find user by email
const findUserByEmail = (email, callback) => {
  console.log("🔍 Searching for user:", email);
  const query = `SELECT * FROM users WHERE email = ?`;

  db.get(query, [email], (err, row) => {
    if (err) {
      console.error('❌ Error finding user:', err.message);
      return callback(err);
    }
    if (row) {
      console.log('✅ User found:', row.email);
    } else {
      console.log('ℹ️ No user found with that email.');
    }
    callback(null, row);
  });
};

module.exports = {
  createUser,
  findUserByEmail,
};
