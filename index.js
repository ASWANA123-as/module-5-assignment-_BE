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
  origin: [
    "https://module-5-assignment-fe-ouek.vercel.app",
    "http://localhost:5173"
  ],
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