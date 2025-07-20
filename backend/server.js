const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./db'); // ✅ DB connection
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
const corsOptions = {
  origin: ['https://dashboard-kt4o.onrender.com'], // Your frontend URL
  methods: ['GET', 'POST'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());

// ✅ Auth routes
app.use('/auth', authRoutes);

// ✅ Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ✅ Debug route to list users (for development/testing only)
app.get('/auth/debug-users', (req, res) => {
  db.all('SELECT id, email FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
