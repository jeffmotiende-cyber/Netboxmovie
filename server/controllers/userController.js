const User = require('../models/User');

const getProfile = async (req, res) => {
  res.json({ user: req.user });
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, username, email } = req.body;
    const fields = {};
    if (name) fields.name = name;
    if (username) fields.username = username;
    if (email) fields.email = email;

    const user = await User.findByIdAndUpdate(req.user._id, fields, {
      new: true,
      runValidators: true,
    });

    res.json({ user, message: 'Profile updated' });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true }
    );
    res.json({ user, message: 'Avatar updated' });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};

const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ favorites: user.favorites || [] });
  } catch (error) {
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const movieId = parseInt(req.params.movieId);
    const user = await User.findById(req.user._id);

    if (user.favorites.includes(movieId)) {
      return res.status(400).json({ message: 'Movie already in favorites' });
    }

    user.favorites.push(movieId);
    await user.save();

    res.json({ favorites: user.favorites, message: 'Added to favorites' });
  } catch (error) {
    next(error);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const movieId = parseInt(req.params.movieId);
    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter((id) => id !== movieId);
    await user.save();

    res.json({ favorites: user.favorites, message: 'Removed from favorites' });
  } catch (error) {
    next(error);
  }
};

const getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ wishlist: user.wishlist || [] });
  } catch (error) {
    next(error);
  }
};

const addToWishlist = async (req, res, next) => {
  try {
    const movieId = parseInt(req.params.movieId);
    const user = await User.findById(req.user._id);

    if (user.wishlist.includes(movieId)) {
      return res.status(400).json({ message: 'Movie already in wishlist' });
    }

    user.wishlist.push(movieId);
    await user.save();

    res.json({ wishlist: user.wishlist, message: 'Added to wishlist' });
  } catch (error) {
    next(error);
  }
};

const removeFromWishlist = async (req, res, next) => {
  try {
    const movieId = parseInt(req.params.movieId);
    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter((id) => id !== movieId);
    await user.save();

    res.json({ wishlist: user.wishlist, message: 'Removed from wishlist' });
  } catch (error) {
    next(error);
  }
};

const moveToFavorites = async (req, res, next) => {
  try {
    const movieId = parseInt(req.params.movieId);
    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter((id) => id !== movieId);
    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
    }
    await user.save();

    res.json({
      favorites: user.favorites,
      wishlist: user.wishlist,
      message: 'Moved to favorites',
    });
  } catch (error) {
    next(error);
  }
};

const addToWatchHistory = async (req, res, next) => {
  try {
    const { movieId, title, posterPath } = req.body;
    const user = await User.findById(req.user._id);

    user.watchHistory = user.watchHistory.filter((item) => item.movieId !== movieId);
    user.watchHistory.unshift({ movieId, title, posterPath });

    if (user.watchHistory.length > 50) {
      user.watchHistory = user.watchHistory.slice(0, 50);
    }

    await user.save();
    res.json({ watchHistory: user.watchHistory });
  } catch (error) {
    next(error);
  }
};

const getWatchHistory = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ watchHistory: user.watchHistory || [] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};

