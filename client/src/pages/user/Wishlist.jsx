import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import MovieCard from '../../components/MovieCard';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';

export default function Wishlist() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const { data } = await api.get('/users/wishlist');
      const ids = data.wishlist || [];
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

  const removeFromWishlist = async (movieId) => {
    try {
      await api.delete(`/users/wishlist/${movieId}`);
      setMovies((prev) => prev.filter((m) => m.id !== movieId));
    } catch (err) {
      console.error(err);
    }
  };

  const moveToFavorites = async (movieId) => {
    try {
      await api.post(`/users/wishlist/${movieId}/move-to-favorites`);
      setMovies((prev) => prev.filter((m) => m.id !== movieId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="page">
      <div className="container">
        <h1 className="section-title">My Wishlist</h1>

        {movies.length === 0 ? (
          <EmptyState
            title="Your wishlist is empty"
            message="Save movies to watch later!"
            action={<Link to="/movies" className="btn btn-primary">Browse Movies</Link>}
          />
        ) : (
          <div className="grid grid-movies">
            {movies.map((movie) => (
              <div key={movie.id} style={{ position: 'relative' }}>
                <MovieCard movie={movie} />
                <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 4 }}>
                  <button
                    onClick={() => moveToFavorites(movie.id)}
                    className="btn btn-sm"
                    style={{ background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.7rem', padding: '4px 6px', borderRadius: 4 }}
                  >
                    Fav
                  </button>
                  <button
                    onClick={() => removeFromWishlist(movie.id)}
                    className="btn btn-sm"
                    style={{ background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.7rem', padding: '4px 6px', borderRadius: 4 }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
