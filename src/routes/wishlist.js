import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist }  from '../controllers/wishlist.js';
const router = express.Router();

router.get("/", getWishlist)
router.post("/:productId", addToWishlist)
router.delete("/:productId", removeFromWishlist)

export default router;
