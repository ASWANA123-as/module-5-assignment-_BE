require('dotenv').config()
const bcrypt=require('bcrypt')
var jwt=require('jsonwebtoken')
const user=require('../Model/authModel')
const User = require('../Model/authModel')
//create new user
exports.createuser=async(req,res)=>{
    try{
        const{firstname,lastname,email,password,userType}=req.body
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new user({
            firstname,lastname,email,password:hashedPassword,userType
        })
        await newUser.save()
        res.status(200).json({message:'user registerd successfully',user:newUser})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
//login in user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // ✅ no userType from frontend
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" });
    }

    //  sign token with user info
    const token = jwt.sign(
      {
        id: user._id,
        userType: user.userType, // matches your schema
        email: user.email,
      },
      process.env.secretkey
    );

    // send role and token to frontend
    return res.status(200).json({
      message: "login successful",
      token,
      userType: user.userType, // frontend will read this
      email: user.email,
      firstname: user.firstname,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//logout
exports.logoutuser=(req,res)=>{
    res.clearCookie("token");
    console.log(res.cookie.token);
    res.status(200).json({message:"logged out successfully"});
};
 