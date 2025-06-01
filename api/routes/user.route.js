import express from 'express';
import { updateUser, uploadProfilePicture, deleteUser, getUserListings, getUser } from '../controllers/user.controller.js';
import { handleMulterUpload } from '../middleware/multer.middleware.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

// Route for uploading profile picture
router.post('/upload', handleMulterUpload, uploadProfilePicture);
// router.post('/update/:id', verifyToken, updateUser)
// router.delete('/delete/:id', verifyToken, deleteUser)
// router.get('/listings/:id', verifyToken, getUserListings)
// router.get('/:id', verifyToken, getUser)

export default router;