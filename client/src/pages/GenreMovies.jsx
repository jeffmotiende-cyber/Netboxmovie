import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

export default function GenreMovies() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const page = parseInt(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || 'popularity.desc';

  const sortOptions = [
    { value: 'popularity.desc', label: 'Popularity' },
    { value: 'vote_average.desc', label: 'Rating' },
    { value: 'primary_release_date.desc', label: 'Release Date' },
    { value: 'original_title.asc', label: 'Alphabetical' },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [genreRes, moviesRes] = await Promise.all([
          api.get('/genres'),
          api.get('/movies/discover', { params: { with_genres: id, sort_by: sort, page } }),
        ]);
        const genre = genreRes.data.genres?.find((g) => g.id === parseInt(id));
        setGenreName(genre?.name || 'Genre');
        setMovies(moviesRes.data.results || []);
        setTotalPages(Math.min(moviesRes.data.total_pages || 1, 500));
      } catch {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [id, sort, page]);

  return (
    <div className="page">
      <div className="container">
        <div className="flex-between mb-lg" style={{ flexWrap: 'wrap', gap: 12 }}>
          <h1 className="section-title" style={{ marginBottom: 0 }}>{genreName} Movies</h1>
          <select
            value={sort}
            onChange={(e) => setSearchParams({ sort: e.target.value, page: '1' })}
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
          <EmptyState title="No movies found" message="Try a different filter." />
        ) : (
          <>
            <div className="grid grid-movies">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => setSearchParams({ sort, page: p })} />
          </>
        )}
      </div>
    </div>
  );
}
