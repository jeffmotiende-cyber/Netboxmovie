const { fetchFromTMDB, getGenreList, getMoviesByGenre } = require('../config/tmdb');

const getGenres = async (req, res, next) => {
  try {
    const genres = await getGenreList();
    res.json({ genres });
  } catch (error) {
    next(error);
  }
};

const getMoviesByGenreId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = 1, sort_by = 'popularity.desc' } = req.query;
    const data = await fetchFromTMDB('/discover/movie', {
      with_genres: id,
      sort_by,
      page,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getGenres, getMoviesByGenreId };

