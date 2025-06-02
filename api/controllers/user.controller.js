import { uploadOnCloudinary } from '../utils/clodinary.js';
import bcrypt from 'bcrypt';
import User from '../model/user.model.js';
import { errorHandler } from '../utils/errorHandler.js';
import Listing from '../model/listing.model.js';

export const uploadProfilePicture = async (req, res) => {
    try {
        // Check if file exists in request
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Get the local file path
        const localFilePath = req.file.path;

        // Upload to Cloudinary
        const result = await uploadOnCloudinary(localFilePath);

        if (!result) {
            return res.status(500).json({ error: "Error uploading to Cloudinary" });
        }

        // Return the URL
        return res.status(200).json({
            url: result.url,
            message: "File uploaded successfully"
        });

    } catch (error) {
        console.error("Error in uploadProfilePicture:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const updateUser = async (req, res, next) => {
  //Ye req.user.id is the id of the user who is logged in
  //req.params.id is the id of the user who is being updated
  //If the id of the user who is logged in is not equal to the id of the user who is being updated, then return an error
  //This is to prevent any user from updating another user's account
  //Aur ye user.id verifyUser.js se aa rhi hai
    if (req.user.id !== req.params.userId)
      return next(errorHandler(401, 'You can only update your own account!'));
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return next(errorHandler(404, 'User not found'));
      }

      const {password, ...userData} = updatedUser._doc;
      res.status(200).json(userData);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId)
    return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.clearCookie('accessToken');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.userId) {
    try {
      const listings = await Listing.find({ userRef: req.params.userId });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return next(errorHandler(404, 'User not found!'));
    const {password, ...rest} = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};