import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import MovieCard from '../components/MovieCard';
import GenreCard from '../components/GenreCard';
import Loader from '../components/Loader';
import { getBackdropUrl, truncateText } from '../utils/helpers';

export default function Home() {
  const [data, setData] = useState({
    trending: [],
    popular: [],
    topRated: [],
    upcoming: [],
    nowPlaying: [],
    genres: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [trending, popular, topRated, upcoming, nowPlaying, genres] = await Promise.all([
          api.get('/movies/trending', { params: { timeWindow: 'week' } }),
          api.get('/movies/popular'),
          api.get('/movies/top-rated'),
          api.get('/movies/upcoming'),
          api.get('/movies/now-playing'),
          api.get('/genres'),
        ]);

        setData({
          trending: trending.data.results?.slice(0, 10) || [],
          popular: popular.data.results?.slice(0, 10) || [],
          topRated: topRated.data.results?.slice(0, 10) || [],
          upcoming: upcoming.data.results?.slice(0, 10) || [],
          nowPlaying: nowPlaying.data.results?.slice(0, 10) || [],
          genres: genres.data.genres || [],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="page"><p className="text-secondary">Failed to load data.</p></div>;

  const heroMovie = data.trending[0];

  const Section = ({ title, movies, link }) => (
    <section style={{ marginBottom: 40 }}>
      <div className="flex-between mb-md">
        <h2 className="section-title" style={{ marginBottom: 0 }}>{title}</h2>
        {link && (
          <Link to={link} className="btn btn-ghost btn-sm">
            View All
          </Link>
        )}
      </div>
      <div className="grid grid-movies">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );

  return (
    <div>
      {/* Hero Banner */}
      {heroMovie && (
        <section
          style={{
            position: 'relative',
            height: '70vh',
            minHeight: 400,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${getBackdropUrl(heroMovie.backdrop_path)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.4)',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1, padding: '0 20px', maxWidth: 700 }}>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, marginBottom: 12 }}>
              {heroMovie.title}
            </h1>
            <p className="text-secondary" style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: 20 }}>
              {truncateText(heroMovie.overview, 200)}
            </p>
            <div className="flex gap-md">
              <Link to={`/movie/${heroMovie.id}`} className="btn btn-primary btn-lg">
                View Details
              </Link>
              <Link to="/movies" className="btn btn-secondary btn-lg">
                Browse All
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="container" style={{ paddingTop: 40 }}>
        {/* Trending */}
        <Section title="Trending Now" movies={data.trending} link="/movies?sort=trending" />

        {/* Popular */}
        <Section title="Popular Movies" movies={data.popular} link="/movies?sort=popular" />

        {/* Top Rated */}
        <Section title="Top Rated" movies={data.topRated} link="/movies?sort=top_rated" />

        {/* Genres */}
        <section style={{ marginBottom: 40 }}>
          <h2 className="section-title">Browse by Genre</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 12 }}>
            {data.genres.slice(0, 12).map((genre, i) => (
              <GenreCard key={genre.id} genre={genre} index={i} />
            ))}
          </div>
        </section>

        {/* Upcoming */}
        <Section title="Upcoming Releases" movies={data.upcoming} link="/movies?sort=upcoming" />

        {/* Now Playing */}
        <Section title="Now Playing" movies={data.nowPlaying} link="/movies?sort=now_playing" />
      </div>
    </div>
  );
}
