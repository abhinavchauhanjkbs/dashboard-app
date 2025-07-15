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
  origin: ['http://localhost:5173',
    'https://dashboard-kt4o.onrender.com'
   ], // Add your frontend origins
  methods: ['GET', 'POST'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(helmet());
app.use(bodyParser.json());

// ✅ Mount the /auth route
app.use('/auth', authRoutes);

// Serve frontend only in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

// ✅ Catch-all route to serve React frontend for non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// ✅ Health check route (useful for monitoring)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
