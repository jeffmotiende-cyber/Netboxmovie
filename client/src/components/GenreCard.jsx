import { Link } from 'react-router-dom';

export default function GenreCard({ genre }) {
  return (
    <Link
      to={`/genres/${genre.id}`}
      className="card"
      style={{
        textDecoration: 'none',
        color: 'inherit',
        padding: '24px 20px',
        textAlign: 'center',
        border: '1px solid var(--border-color)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow)';
      }}
    >
      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{genre.name}</h3>
    </Link>
  );
}
