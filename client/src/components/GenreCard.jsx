import { Link } from 'react-router-dom';

const genreColors = [
  '#E53935', '#D81B60', '#8E24AA', '#5E35B1', '#3949AB',
  '#1E88E5', '#039BE5', '#00ACC1', '#00897B', '#43A047',
  '#7CB342', '#C0CA33', '#FDD835', '#FFB300', '#FB8C00',
  '#F4511E', '#6D4C41', '#757575', '#546E7A',
];

export default function GenreCard({ genre, index = 0 }) {
  const color = genreColors[index % genreColors.length];

  return (
    <Link
      to={`/genres/${genre.id}`}
      className="card"
      style={{
        textDecoration: 'none',
        color: 'inherit',
        padding: '24px 20px',
        textAlign: 'center',
        background: `linear-gradient(135deg, ${color}22, ${color}44)`,
        border: `1px solid ${color}33`,
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 4px 20px ${color}44`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow)';
      }}
    >
      <h3 style={{ fontSize: '1rem', fontWeight: 600, color }}>{genre.name}</h3>
    </Link>
  );
}
