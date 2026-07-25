import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        padding: '40px 20px 24px',
        marginTop: 60,
        background: 'var(--bg-secondary)',
      }}
    >
      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', textDecoration: 'none' }}>
              NetBox
            </Link>
            <p className="text-secondary" style={{ marginTop: 8, fontSize: '0.9rem', lineHeight: 1.6 }}>
              Your ultimate destination for streaming movies. Discover, watch, and save your favorites.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ marginBottom: 12, fontWeight: 600 }}>Browse</h4>
            <div className="flex-col gap-sm">
              <Link to="/movies" className="text-secondary" style={{ fontSize: '0.9rem' }}>Movies</Link>
              <Link to="/genres" className="text-secondary" style={{ fontSize: '0.9rem' }}>Genres</Link>
              <Link to="/movies?sort=trending" className="text-secondary" style={{ fontSize: '0.9rem' }}>Trending</Link>
              <Link to="/movies?sort=top_rated" className="text-secondary" style={{ fontSize: '0.9rem' }}>Top Rated</Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h4 style={{ marginBottom: 12, fontWeight: 600 }}>Account</h4>
            <div className="flex-col gap-sm">
              <Link to="/profile" className="text-secondary" style={{ fontSize: '0.9rem' }}>Profile</Link>
              <Link to="/favorites" className="text-secondary" style={{ fontSize: '0.9rem' }}>Favorites</Link>
              <Link to="/wishlist" className="text-secondary" style={{ fontSize: '0.9rem' }}>Wishlist</Link>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 32,
            paddingTop: 16,
            borderTop: '1px solid var(--border-color)',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <p style={{ marginTop: 4 }}>&copy; {new Date().getFullYear()} NetBox. All rights reserved. Developed by <a href="https://github.com/jeffmotiende-cyber?tab=repositories" target="_blank">
    jeffotiende
</a></p>
        </div>
      </div>
    </footer>
  );
}
