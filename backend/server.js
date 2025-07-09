const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Explicit CORS Options
const corsOptions = {
  origin: ['http://localhost:3000', 'https://dashboard-frontend-ksjib.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// ✅ Enable CORS + Preflight
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ✅ Security & Body Parser
app.use(helmet());
app.use(bodyParser.json());

// ✅ Routes
app.use('/api/auth', authRoutes);

// ✅ Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
