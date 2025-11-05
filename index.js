const express=require('express')
const app=express()
const cors =require("cors") ;
const cookieParser = require("cookie-parser");
require('dotenv').config()
const connectDb=require('./config/db')
const userroute=require('./Route/userRoute')
const taskRoute=require('./Route/taskRoute')
connectDb()
const allowedOrigins = [
  "https://module-5-assignment-fe-hbfc.vercel.app", // ✅ your live frontend
  "http://localhost:5173" // ✅ for local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('welcome to task management system system')


})

app.use('/api/auth',userroute)
app.use('/api/task',taskRoute)
app.listen(process.env.PORT , () => {
  console.log(`server is running on ${process.env.PORT}`);
})