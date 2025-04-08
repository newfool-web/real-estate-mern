import User from "../model/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const signup = async (req, res, next) => {
    const {username, email, password} =req.body;
    if ([email, username, password].some((field) => field?.trim() === "")) {   
        return next(errorHandler(400, "All fields are required"));
      }

      const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })
    // Agar tum ye check nhi lagaoge toh bhi vo accept nhi krega kyuki tumne userModel mein Unique kiya hai email and userName ko but fir vo error bs vo console mein dikhayega user ko nhi.
    if(existedUser){
        return next(errorHandler(404, "User ALready Exists"));
    }

    const user = await User.create({        
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password" //Jo nhi chahiye use isi tarh same syntax mein likh do
    )
    
    if(!createdUser){
        return next(errorHandler(500, "Something went wrong"));
    }
    
    return res.status(201).json(
        (200, "User Created Successfully")
    )
}

export const signin = async (req,res,next) => {
    //req.body -> data
    // Username or email based login
    // Find the user
    // If user found, check password
    // If password is right then generate access and refresh tokens
    //send cookies
   const{identifier, password} = req.body
   try {   
 
     if(!identifier){
         return next(errorHandler(400, "Username or email is required"))
     }
 
     if(!password){
         return next(errorHandler(400, "Password is required"))
     }
 
     const validUser = await User.findOne({
         $or: [
             { email: identifier },
             { username: identifier }
           ]
     })
 
     if(!validUser){
         return next(errorHandler(404, "Invalid Username or Email"))
     }
 
     const validPassword = await bcrypt.compare(password, validUser.password);
 
     if(!validPassword){
         return next(errorHandler(401, "Password is Incorrect"))
     }
 
     const accessToken = jwt.sign(
         {
             _id: validUser._id,           
         },
         process.env.ACCESS_TOKEN_SECRET,
         {
             expiresIn: process.env.ACCESS_TOKEN_EXPIRY
         }
     )
 
     const loggedInUser = await User.findById(validUser._id).select("-password")
 
     const options = {
         httpOnly: true,
         secure: true
     }
 
     res
     .status(200)
     .cookie("accessToken", accessToken, options)    
     .json(loggedInUser)
   } catch (error) {
    next(error);
   }    
}