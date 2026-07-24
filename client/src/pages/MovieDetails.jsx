import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiHeart, FiBookmark, FiShare2, FiPlay } from 'react-icons/fi';
import api from '../api/axios';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { useAuth } from '../context/AuthContext';
import { getImageUrl, getBackdropUrl, formatRuntime, formatDate, ratingColor } from '../utils/helpers';

export default function MovieDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await api.get(`/movies/${id}`);
        setMovie(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load movie');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleAddToFavorites = async () => {
    if (!user) return;
    try {
      await api.post(`/users/favorites/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) return;
    try {
      await api.post(`/users/wishlist/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: movie.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="page"><ErrorState message={error} /></div>;
  if (!movie) return <div className="page"><ErrorState message="Movie not found" /></div>;

  const {
    title, backdrop_path, poster_path, overview, genres, runtime,
    release_date, original_language, vote_average, vote_count, popularity,
    credits, videos, recommendations, similar, production_companies, tagline,
  } = movie;

  const trailer = videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
  const cast = credits?.cast?.slice(0, 12) || [];
  const director = credits?.crew?.find((c) => c.job === 'Director');
  const related = recommendations?.results?.slice(0, 8) || similar?.results?.slice(0, 8) || [];

  return (
    <div>
      {/* Backdrop */}
      <div
        style={{
          position: 'relative',
          height: '55vh',
          minHeight: 300,
          overflow: 'hidden',
        }}
      >
        <img
          src={getBackdropUrl(backdrop_path)}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '80px 20px 30px',
            background: 'linear-gradient(transparent, var(--bg-primary))',
          }}
        >
          <div className="container" style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
            <img
              src={getImageUrl(poster_path)}
              alt={title}
              style={{
                width: 150,
                borderRadius: 8,
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                display: 'none',
              }}
              className="poster-img"
            />
            <div>
              <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800 }}>{title}</h1>
              {tagline && <p className="text-secondary" style={{ marginTop: 4, fontStyle: 'italic' }}>{tagline}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: -40, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32 }}>
          {/* Main Content */}
          <div>
            {/* Meta */}
            <div className="flex-center" style={{ gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
              {vote_average > 0 && (
                <span style={{ background: ratingColor(vote_average), color: '#fff', padding: '4px 10px', borderRadius: 6, fontWeight: 700, fontSize: '1rem' }}>
                  {vote_average.toFixed(1)} / 10
                </span>
              )}
              {runtime && <span className="text-secondary">{formatRuntime(runtime)}</span>}
              {release_date && <span className="text-secondary">{formatDate(release_date)}</span>}
              {original_language && <span className="text-secondary">{original_language.toUpperCase()}</span>}
              {vote_count > 0 && <span className="text-secondary">{vote_count.toLocaleString()} votes</span>}
              {popularity > 0 && <span className="text-secondary">{Math.round(popularity)} popularity</span>}
            </div>

            {/* Genres */}
            {genres?.length > 0 && (
              <div className="flex gap-sm" style={{ marginBottom: 20, flexWrap: 'wrap' }}>
                {genres.map((g) => (
                  <Link key={g.id} to={`/genres/${g.id}`} className="badge badge-primary" style={{ textDecoration: 'none' }}>
                    {g.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Overview */}
            {overview && (
              <div style={{ marginBottom: 24 }}>
                <h2 className="section-title" style={{ fontSize: '1.2rem' }}>Overview</h2>
                <p className="text-secondary" style={{ lineHeight: 1.8 }}>{overview}</p>
              </div>
            )}

            {/* Cast */}
            {cast.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <h2 className="section-title" style={{ fontSize: '1.2rem' }}>Cast</h2>
                <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
                  {cast.map((person) => (
                    <div key={person.id} style={{ textAlign: 'center', minWidth: 100 }}>
                      <img
                        src={getImageUrl(person.profile_path, 'w185')}
                        alt={person.name}
                        style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 6 }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{person.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.7rem' }}>{person.character}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Director */}
            {director && (
              <div style={{ marginBottom: 24 }}>
                <h2 className="section-title" style={{ fontSize: '1.2rem' }}>Director</h2>
                <p>{director.name}</p>
              </div>
            )}

            {/* Trailer */}
            {trailer && (
              <div style={{ marginBottom: 24 }}>
                <h2 className="section-title" style={{ fontSize: '1.2rem' }}>Trailer</h2>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 8, overflow: 'hidden' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Trailer"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Related Movies */}
            {related.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <h2 className="section-title" style={{ fontSize: '1.2rem' }}>Related Movies</h2>
                <div className="grid grid-movies">
                  {related.map((m) => (
                    <MovieCard key={m.id} movie={m} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Action Buttons */}
            <div className="flex-col gap-sm" style={{ marginBottom: 24 }}>
              {user && (
                <>
                  <button className="btn btn-primary" onClick={handleAddToFavorites}>
                    <FiHeart /> Add to Favorites
                  </button>
                  <button className="btn btn-secondary" onClick={handleAddToWishlist}>
                    <FiBookmark /> Add to Wishlist
                  </button>
                </>
              )}
              <button className="btn btn-secondary" onClick={handleShare}>
                <FiShare2 /> Share
              </button>
            </div>

            {/* Production Companies */}
            {production_companies?.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>Production</h3>
                <div className="flex-col gap-sm">
                  {production_companies.map((c) => (
                    <div key={c.id} className="flex-center" style={{ gap: 8 }}>
                      {c.logo_path ? (
                        <img src={getImageUrl(c.logo_path)} alt={c.name} style={{ height: 24, objectFit: 'contain' }} />
                      ) : (
                        <span className="text-secondary" style={{ fontSize: '0.85rem' }}>{c.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>Stats</h3>
              <div className="text-secondary" style={{ fontSize: '0.85rem', lineHeight: 2 }}>
                <div>Popularity: {Math.round(popularity)}</div>
                <div>Vote Count: {vote_count?.toLocaleString()}</div>
                {release_date && <div>Release: {formatDate(release_date)}</div>}
                {runtime && <div>Runtime: {formatRuntime(runtime)}</div>}
                {original_language && <div>Language: {original_language.toUpperCase()}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
