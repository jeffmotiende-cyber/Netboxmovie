const axios = require('axios');

const tmdbClient = axios.create({
  baseURL: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'en-US',
  },
});

const fetchFromTMDB = async (endpoint, params = {}) => {
  try {
    const { data } = await tmdbClient.get(endpoint, { params });
    return data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw new Error(`TMDB API error: ${error.response?.status} - ${error.message}`);
  }
};

const getGenreList = async () => {
  const data = await fetchFromTMDB('/genre/movie/list');
  return data?.genres || [];
};

const getMoviesByGenre = async (genreId, page = 1) => {
  return fetchFromTMDB('/discover/movie', {
    with_genres: genreId,
    sort_by: 'popularity.desc',
    page,
  });
};

module.exports = { fetchFromTMDB, getGenreList, getMoviesByGenre, tmdbClient };

