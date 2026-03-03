const userModel=require("../models/user.model");
const jwt=require("jsonwebtoken")
const emailService=require("../services/email.service")

// user register controller => POST /api/auth/register
const userRegisterController=async(req,res)=>{
    const {name,email,password}=req.body;

    const userExists=await userModel.findOne({email})
    if(userExists){
        return res.status(422).json({
            message:"User already exists with email",
            status:"failed"
        })
    }

    const user=await userModel.create({name,email,password});

    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"});

    res.cookie("token",token);
    
    res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        }
    })

    await emailService.sendRegistrationEmail(user.email,user.name);

}

// user login controller => POST api/auth/login
const userLoginController=async(req,res)=>{
    const {email,password}=req.body;

    const user=await userModel.findOne({email}).select("+password");
    
    if(!user){
        return res.status(401).json({message:"Invalid credentials"})
    }

    const isValid = await user.comparePassword(String(password));

    if(!isValid){
        return res.status(401).json({mesage:"Invalid credentials"})
    }

    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"});

    res.cookie("token",token);
    
    res.status(200).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        }
    })
}

module.exports={
    userRegisterController,
    userLoginController

}