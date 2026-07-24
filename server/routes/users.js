const router = require('express').Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  updateAvatar,
  changePassword,
  getFavorites,
  addFavorite,
  removeFavorite,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  moveToFavorites,
  addToWatchHistory,
  getWatchHistory,
} = require('../controllers/userController');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/avatar', protect, updateAvatar);

router.put(
  '/password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  validate,
  changePassword
);

router.get('/favorites', protect, getFavorites);
router.post('/favorites/:movieId', protect, addFavorite);
router.delete('/favorites/:movieId', protect, removeFavorite);

router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/:movieId', protect, addToWishlist);
router.delete('/wishlist/:movieId', protect, removeFromWishlist);
router.post('/wishlist/:movieId/move-to-favorites', protect, moveToFavorites);

router.post('/watch-history', protect, addToWatchHistory);
router.get('/watch-history', protect, getWatchHistory);

module.exports = router;

