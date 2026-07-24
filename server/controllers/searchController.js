const { fetchFromTMDB } = require('../config/tmdb');

const searchMovie = async (req, res, next) => {
  try {
    const { query, page = 1 } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    const data = await fetchFromTMDB('/search/movie', { query, page });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const searchMulti = async (req, res, next) => {
  try {
    const { query, page = 1 } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    const data = await fetchFromTMDB('/search/multi', { query, page });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { searchMovie, searchMulti };

