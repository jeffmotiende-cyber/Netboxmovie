const { fetchFromTMDB, getGenreList, getMoviesByGenre } = require('../config/tmdb');
const MovieCache = require('../models/MovieCache');

const getTrending = async (req, res, next) => {
  try {
    const { timeWindow = 'day', page = 1 } = req.query;
    const data = await fetchFromTMDB(`/trending/movie/${timeWindow}`, { page });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getPopular = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const data = await fetchFromTMDB('/movie/popular', { page });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getTopRated = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const data = await fetchFromTMDB('/movie/top_rated', { page });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getUpcoming = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const data = await fetchFromTMDB('/movie/upcoming', { page });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getNowPlaying = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const data = await fetchFromTMDB('/movie/now_playing', { page });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getMovieDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await fetchFromTMDB(`/movie/${id}`, { append_to_response: 'credits,videos,recommendations,similar' });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Increment view count
    try {
      await MovieCache.findOneAndUpdate(
        { movieId: parseInt(id) },
        { $inc: { views: 1 } },
        { upsert: true }
      );
    } catch (cacheError) {
      // Non-critical, continue
    }

    res.json(movie);
  } catch (error) {
    next(error);
  }
};

const getMovieCredits = async (req, res, next) => {
  try {
    const data = await fetchFromTMDB(`/movie/${req.params.id}/credits`);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getMovieVideos = async (req, res, next) => {
  try {
    const data = await fetchFromTMDB(`/movie/${req.params.id}/videos`);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getRecommendations = async (req, res, next) => {
  try {
    const data = await fetchFromTMDB(`/movie/${req.params.id}/recommendations`);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getSimilar = async (req, res, next) => {
  try {
    const data = await fetchFromTMDB(`/movie/${req.params.id}/similar`);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const discoverMovies = async (req, res, next) => {
  try {
    const { with_genres, sort_by, page = 1, 'vote_count.gte': voteCount } = req.query;
    const params = { page, sort_by: sort_by || 'popularity.desc' };
    if (with_genres) params.with_genres = with_genres;
    if (voteCount) params['vote_count.gte'] = voteCount;

    const data = await fetchFromTMDB('/discover/movie', params);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getNowPlaying,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getRecommendations,
  getSimilar,
  discoverMovies,
};

