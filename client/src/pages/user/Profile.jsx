import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiUser, FiHeart, FiBookmark, FiClock, FiSettings, FiLogOut } from 'react-icons/fi';

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 800 }}>
        <div className="card" style={{ padding: 32, marginBottom: 24 }}>
          <div className="flex-center" style={{ gap: 20, flexDirection: 'column', textAlign: 'center' }}>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                color: '#fff',
                fontWeight: 700,
              }}
            >
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{user.name}</h1>
              <p className="text-secondary">@{user.username}</p>
              <p className="text-secondary">{user.email}</p>
              {user.role === 'admin' && (
                <span className="badge badge-primary" style={{ marginTop: 8 }}>Admin</span>
              )}
            </div>
          </div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          <Link to="/favorites" className="card" style={{ padding: 24, textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
            <FiHeart size={24} style={{ color: 'var(--primary)', marginBottom: 8 }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Favorites</h3>
            <p className="text-secondary" style={{ fontSize: '0.85rem' }}>View your favorite movies</p>
          </Link>
          <Link to="/wishlist" className="card" style={{ padding: 24, textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
            <FiBookmark size={24} style={{ color: 'var(--primary)', marginBottom: 8 }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Wishlist</h3>
            <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Movies you want to watch</p>
          </Link>
          <Link to="/settings" className="card" style={{ padding: 24, textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
            <FiSettings size={24} style={{ color: 'var(--primary)', marginBottom: 8 }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Settings</h3>
            <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Edit your profile</p>
          </Link>
          <button className="card" onClick={logout} style={{ padding: 24, textAlign: 'center', background: 'var(--bg-card)', border: 'none', cursor: 'pointer' }}>
            <FiLogOut size={24} style={{ color: 'var(--error)', marginBottom: 8 }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Logout</h3>
            <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Sign out of your account</p>
          </button>
        </div>
      </div>
    </div>
  );
}
