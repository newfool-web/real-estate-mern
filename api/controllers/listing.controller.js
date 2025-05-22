import Listing from '../model/listing.model.js';
import { errorHandler } from '../utils/errorHandler.js';

export const createListing = async (req, res, next) => {
    try {
      const listing = await Listing.create(req.body);
      return res.status(201).json(listing);
    } catch (error) {
      next(errorHandler(400, "Failed to create listing"));
    }
  };
