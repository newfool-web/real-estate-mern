import User from "../model/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req, res) => {
    const {username, email, password} =req.body;
    if ([email, username, password].some((field) => field?.trim() === "")) {   
        throw new errorHandler(400, "All fields are required");
      }

      const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })
    // Agar tum ye check nhi lagaoge toh bhi vo accept nhi krega kyuki tumne userModel mein Unique kiya hai email and userName ko but fir vo error bs vo console mein dikhayega user ko nhi.
    if(existedUser){
        throw new errorHandler(409, "User already existed")
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
        throw new errorHandler(500, "Something went wrong")
    }
    
    return res.status(201).json(
        (200, "User Created Successfully")
    )
}