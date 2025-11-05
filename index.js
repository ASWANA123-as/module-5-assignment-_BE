const express=require('express')
const app=express()
const cors =require("cors") ;
const cookieParser = require("cookie-parser");
require('dotenv').config()
const connectDb=require('./config/db')
const userroute=require('./Route/userRoute')
const taskRoute=require('./Route/taskRoute')
connectDb()
app.use(cors({
  origin: "http://localhost:5173",  // or "*" for all origins (not recommended for production)
  credentials: true
}));
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