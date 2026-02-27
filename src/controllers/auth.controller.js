const userModel=require("../models/user.model");
const jwt=require("jsonwebtoken")

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

}

module.exports={
    userRegisterController,

}