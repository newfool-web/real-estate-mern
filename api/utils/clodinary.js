import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});

import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("No file path provided");
        }

        // Check if file exists
        if (!fs.existsSync(localFilePath)) {
            throw new Error("File does not exist");
        }

        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "profile_pictures", // Organize uploads in a folder
            max_file_size: 2 * 1024 * 1024 // 2MB limit
        });

        // Remove the locally saved temporary file
        fs.unlinkSync(localFilePath);
        
        return {
            url: response.secure_url,
            public_id: response.public_id
        };

    } catch (error) {
        // Remove the locally saved temporary file if it exists
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
};

export { uploadOnCloudinary };