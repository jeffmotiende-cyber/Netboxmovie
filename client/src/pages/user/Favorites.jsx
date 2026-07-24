import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import MovieCard from '../../components/MovieCard';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';

export default function Favorites() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const { data } = await api.get('/users/favorites');
      const ids = data.favorites || [];
      if (ids.length === 0) {
        setMovies([]);
        return;
      }
      const promises = ids.slice(0, 20).map((id) =>
        api.get(`/movies/${id}`).catch(() => null)
      );
      const results = await Promise.all(promises);
      setMovies(results.filter((r) => r !== null).map((r) => r.data));
    } catch {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (movieId) => {
    try {
      await api.delete(`/users/favorites/${movieId}`);
      setMovies((prev) => prev.filter((m) => m.id !== movieId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="page">
      <div className="container">
        <h1 className="section-title">My Favorites</h1>

        {movies.length === 0 ? (
          <EmptyState
            title="No favorites yet"
            message="Start adding movies to your favorites!"
            action={<Link to="/movies" className="btn btn-primary">Browse Movies</Link>}
          />
        ) : (
          <div className="grid grid-movies">
            {movies.map((movie) => (
              <div key={movie.id} style={{ position: 'relative' }}>
                <MovieCard movie={movie} />
                <button
                  onClick={() => removeFavorite(movie.id)}
                  className="btn btn-sm"
                  style={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    background: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    fontSize: '0.75rem',
                    padding: '4px 8px',
                    borderRadius: 4,
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
