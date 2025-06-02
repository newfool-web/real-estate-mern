import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:listingId', verifyToken, deleteListing);
router.post('/update/:listingId', verifyToken, updateListing);
router.get('/get/:listingId', getListing);
router.get('/get', getListings);

export default router;
