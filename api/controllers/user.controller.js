import { uploadOnCloudinary } from '../utils/clodinary.js';
import bcrypt from 'bcrypt';
import User from '../model/user.model.js';
import { errorHandler } from '../utils/errorHandler.js';

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
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'You can only update your own account!'));
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
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