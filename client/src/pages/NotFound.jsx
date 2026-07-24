import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page flex-center flex-col" style={{ minHeight: '70vh', gap: 16, textAlign: 'center' }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>404</h1>
      <h2 style={{ fontSize: '1.5rem' }}>Page Not Found</h2>
      <p className="text-secondary" style={{ maxWidth: 400 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 8 }}>
        Go Home
      </Link>
    </div>
  );
}
