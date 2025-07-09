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
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// ✅ API Routes
app.use('/api/auth', authRoutes);

// ✅ Serve frontend static files (React build)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// ✅ Catch-all route to serve React frontend for non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// ✅ Health check route (useful for monitoring)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
