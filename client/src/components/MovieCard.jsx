import { Link } from 'react-router-dom';
import { getImageUrl, getYear, ratingColor, truncateText } from '../utils/helpers';

export default function MovieCard({ movie }) {
  const { id, title, poster_path, vote_average, release_date, overview } = movie;

  return (
    <Link to={`/movie/${id}`} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden' }}>
        <img
          src={getImageUrl(poster_path)}
          alt={title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s',
          }}
          className="movie-card-img"
          onError={(e) => { e.target.src = '/placeholder-poster.svg'; }}
        />
        {vote_average > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: ratingColor(vote_average),
              color: '#fff',
              padding: '2px 6px',
              borderRadius: 4,
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            {vote_average.toFixed(1)}
          </span>
        )}
      </div>
      <div style={{ padding: '10px 12px 12px' }}>
        <h3
          style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: 4,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </h3>
        <p className="text-secondary" style={{ fontSize: '0.8rem' }}>
          {getYear(release_date)}
        </p>
      </div>
    </Link>
  );
}
