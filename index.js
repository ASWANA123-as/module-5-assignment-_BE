const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDb = require('./config/db');
const userroute = require('./Route/userRoute');
const taskRoute = require('./Route/taskRoute');

connectDb();

const allowedOrigins = [
  "https://module-5-assignment-fe-hbfc.vercel.app", // ✅ live frontend
  "http://localhost:5173" // ✅ local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Important: Handle preflight (OPTIONS) requests globally
app.options("*", cors());

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Welcome to Task Management System backend');
});

app.use('/api/auth', userroute);
app.use('/api/task', taskRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
