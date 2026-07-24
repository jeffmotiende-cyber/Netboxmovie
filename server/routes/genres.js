const router = require('express').Router();
const { getGenres, getMoviesByGenreId } = require('../controllers/genreController');

router.get('/', getGenres);
router.get('/:id/movies', getMoviesByGenreId);

module.exports = router;

