import { useState, useEffect } from 'react';
import api from '../api/axios';
import GenreCard from '../components/GenreCard';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await api.get('/genres');
        setGenres(data.genres || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="page"><ErrorState message={error} /></div>;

  return (
    <div className="page">
      <div className="container">
        <h1 className="section-title">Genres</h1>
        <p className="text-secondary mb-lg">Browse movies by genre</p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
          {genres.map((genre, i) => (
            <GenreCard key={genre.id} genre={genre} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
