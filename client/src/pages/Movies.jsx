import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../api/axios';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const sort = searchParams.get('sort') || 'popular';
  const genre = searchParams.get('genre') || '';
  const page = parseInt(searchParams.get('page')) || 1;

  const sortOptions = [
    { value: 'popular', label: 'Popularity' },
    { value: 'top_rated', label: 'Rating' },
    { value: 'upcoming', label: 'Release Date' },
    { value: 'trending', label: 'Trending' },
    { value: 'now_playing', label: 'Now Playing' },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let endpoint, params = { page };

        switch (sort) {
          case 'trending':
            endpoint = '/movies/trending';
            params.timeWindow = 'week';
            break;
          case 'top_rated':
            endpoint = '/movies/top-rated';
            break;
          case 'upcoming':
            endpoint = '/movies/upcoming';
            break;
          case 'now_playing':
            endpoint = '/movies/now-playing';
            break;
          default:
            endpoint = '/movies/popular';
        }

        if (genre) {
          endpoint = '/movies/discover';
          params.with_genres = genre;
          params.sort_by = sort === 'top_rated' ? 'vote_average.desc' : 'popularity.desc';
        }

        const { data } = await api.get(endpoint, { params });
        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch (err) {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [sort, genre, page]);

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (val) params.set(key, val);
      else params.delete(key);
    });
    if (updates.sort !== undefined || updates.genre !== undefined) {
      params.delete('page');
    }
    setSearchParams(params);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="flex-between mb-lg" style={{ flexWrap: 'wrap', gap: 12 }}>
          <h1 className="section-title" style={{ marginBottom: 0 }}>Movies</h1>
          <select
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="form-input"
            style={{ width: 'auto', minWidth: 160 }}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <Loader />
        ) : movies.length === 0 ? (
          <EmptyState title="No movies found" message="Try adjusting your filters." />
        ) : (
          <>
            <div className="grid grid-movies">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => updateParams({ page: p })} />
          </>
        )}
      </div>
    </div>
  );
}
