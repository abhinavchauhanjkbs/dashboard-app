const db = require('../db');

const createUser = (email, password, callback) => {
  const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
  db.run(query, [email, password], function(err) {
    callback(err, this?.lastID);
  });
};

const findUserByEmail = (email, callback) => {
  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
    callback(err, row);
  });
};

module.exports = {
  createUser,
  findUserByEmail
};