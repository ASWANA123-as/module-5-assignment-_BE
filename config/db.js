const mongoose=require('mongoose')
require('dotenv').config();
const mongodbURI=process.env.mongodbURI

const connectdb=async()=>{
try{
    const connect=await mongoose.connect(mongodbURI)
    console.log(`connection success ${connect.connection.name}`)
}
catch(error){
console.log(error)
}
}
module.exports=connectdb