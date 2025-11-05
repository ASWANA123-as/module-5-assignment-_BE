const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDb = require('./config/db');
const userroute = require('./Route/userRoute');
const taskRoute = require('./Route/taskRoute');

const app = express();

// ✅ Safe CORS setup for both local + Vercel
const allowedOrigins = [
  "https://module-5-assignment-fe-hbfc.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        return callback(null, false); // 👈 Prevents crash
      }
    },
    credentials: true,
  })
);

app.options("*", cors());

app.use(cookieParser());
app.use(express.json());

// ✅ Base route
app.get('/', (req, res) => {
  res.status(200).send('✅ Task Management System Backend is running!');
});

// ✅ Database connection — safe for Vercel
connectDb().catch(err => {
  console.error("❌ MongoDB connection failed:", err);
});

// ✅ Routes
app.use('/api/auth', userroute);
app.use('/api/task', taskRoute);

// ✅ Error handler (prevents serverless crash)
app.use((err, req, res, next) => {
  console.error("💥 Internal error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Use Vercel’s default port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app; // ✅ required by Vercel
