import express from 'express';
import { updateUser, uploadProfilePicture, deleteUser, getUserListings, getUser } from '../controllers/user.controller.js';
import { handleMulterUpload } from '../middleware/multer.middleware.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/upload', handleMulterUpload, uploadProfilePicture);
router.post('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.get('/listings/:userId', verifyToken, getUserListings);
router.get('/:userId', verifyToken, getUser);

export default router;