import Wishlist from '../models/wishlist.js'


 
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }
    res.json(wishlist);
  } catch (error) {
    console.error('Error getting wishlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 




export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      // If no wishlist exists, create a new one
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    // Add the product to the wishlist
    wishlist.products.push(productId);
    await wishlist.save();
    
    res.json(wishlist);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}   




export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }
    
    // Remove the product from the wishlist
    wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}   
