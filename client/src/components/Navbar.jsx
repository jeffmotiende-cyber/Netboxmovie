import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiSun, FiMoon, FiMenu, FiX, FiUser, FiHeart, FiBookmark } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { debounce } from '../utils/helpers';
import api from '../api/axios';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const searchRef = useRef(null);

  const fetchSuggestions = debounce(async (q) => {
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const { data } = await api.get('/search/movie', { params: { query: q } });
      setSuggestions(data.results?.slice(0, 5) || []);
      setShowSuggestions(true);
    } catch {
      setSuggestions([]);
    }
  }, 300);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
      setQuery('');
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    fetchSuggestions(val);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/movies', label: 'Movies' },
    { to: '/genres', label: 'Genres' },
    { to: '/movies?sort=top_rated', label: 'Top Rated' },
    { to: '/movies?sort=trending', label: 'Trending' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background 0.3s',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: 64, gap: 20 }}>
        {/* Logo */}
        <Link to="/" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          NetBox
        </Link>

{/* Desktop Nav Links */}
        <div className="nav-links flex gap-sm">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: 6,
                fontSize: '0.9rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div ref={searchRef} style={{ position: 'relative', flex: 1, maxWidth: 400, minWidth: 150 }}>
          <form onSubmit={handleSearch} style={{ display: 'flex' }}>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search movies..."
              style={{
                width: '100%',
                padding: '8px 36px 8px 12px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              <FiSearch size={18} />
            </button>
          </form>
          {showSuggestions && suggestions.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                marginTop: 4,
                overflow: 'hidden',
                zIndex: 100,
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              {suggestions.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  onClick={() => { setShowSuggestions(false); setQuery(''); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 12px',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-input)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : '/placeholder-poster.svg'}
                    alt=""
                    style={{ width: 36, height: 54, borderRadius: 4, objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{movie.title}</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                      {movie.release_date?.slice(0, 4) || ''}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex-center" style={{ gap: 8, marginLeft: 'auto' }}>
          <button className="btn btn-ghost" onClick={toggleTheme} title="Toggle theme">
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {user ? (
            <>
              <Link to="/favorites" className="btn btn-ghost" title="Favorites">
                <FiHeart size={18} />
              </Link>
              <Link to="/wishlist" className="btn btn-ghost" title="Wishlist">
                <FiBookmark size={18} />
              </Link>
              <div style={{ position: 'relative' }}>
                <Link to="/profile" className="btn btn-ghost" title="Profile">
                  <FiUser size={18} />
                </Link>
              </div>
              {user.role === 'admin' && (
                <Link to="/admin" className="btn btn-sm btn-secondary" style={{ fontSize: '0.8rem' }}>
                  Admin
                </Link>
              )}
              <button className="btn btn-sm btn-ghost" onClick={logout} style={{ fontSize: '0.8rem' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-ghost" style={{ fontSize: '0.85rem' }}>Login</Link>
              <Link to="/register" className="btn btn-sm btn-primary" style={{ fontSize: '0.85rem' }}>Register</Link>
            </>
          )}

{/* Mobile menu toggle */}
          <button className="btn btn-ghost mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenu(false)}
              style={{ display: 'block', padding: '10px 0', color: 'var(--text-secondary)', textDecoration: 'none' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
