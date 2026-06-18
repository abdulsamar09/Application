require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./data/db');

const app = express();

// Connect to Database (MongoDB or JSON fallback)
db.connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Root endpoint for simple healthcheck
app.get('/', (req, res) => {
  res.send('ICU Counseling App API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
