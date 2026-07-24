const router = require('express').Router();
const {
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
} = require('../controllers/movieController');

router.get('/trending', getTrending);
router.get('/popular', getPopular);
router.get('/top-rated', getTopRated);
router.get('/upcoming', getUpcoming);
router.get('/now-playing', getNowPlaying);
router.get('/discover', discoverMovies);
router.get('/:id', getMovieDetails);
router.get('/:id/credits', getMovieCredits);
router.get('/:id/videos', getMovieVideos);
router.get('/:id/recommendations', getRecommendations);
router.get('/:id/similar', getSimilar);

module.exports = router;

