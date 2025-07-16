const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') }); // ✅ Load .env safely from backend

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
const corsOptions = {
  origin: [
    'http://localhost:5173',                // Local dev frontend
    'https://dashboard-kt4o.onrender.com'   // Deployed frontend
  ],
  methods: ['GET', 'POST'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(helmet());
app.use(bodyParser.json());

// ✅ Mount your auth routes
app.use('/auth', authRoutes);

// ✅ Health check endpoint (optional but useful)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
