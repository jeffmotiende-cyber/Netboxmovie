const router = require('express').Router();
const { searchMovie, searchMulti } = require('../controllers/searchController');

router.get('/movie', searchMovie);
router.get('/multi', searchMulti);

module.exports = router;

