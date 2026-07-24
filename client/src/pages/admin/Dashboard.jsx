import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Loader from '../../components/Loader';
import { FiUsers, FiUserCheck, FiUserX, FiFilm } from 'react-icons/fi';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/dashboard');
        setStats(data);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  const cards = [
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: FiUsers, color: '#1E88E5' },
    { label: 'Active Users', value: stats?.activeUsers || 0, icon: FiUserCheck, color: '#43A047' },
    { label: 'Inactive Users', value: stats?.inactiveUsers || 0, icon: FiUserX, color: '#FB8C00' },
    { label: 'Suspended', value: stats?.suspendedUsers || 0, icon: FiUserX, color: '#E53935' },
  ];

  return (
    <div className="page">
      <div className="container">
        <div className="flex-between mb-lg" style={{ flexWrap: 'wrap', gap: 12 }}>
          <h1 className="section-title" style={{ marginBottom: 0 }}>Admin Dashboard</h1>
          <div className="flex gap-sm">
            <Link to="/admin/users" className="btn btn-secondary btn-sm">Users</Link>
            <Link to="/admin/analytics" className="btn btn-secondary btn-sm">Analytics</Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {cards.map((card) => (
            <div key={card.label} className="card" style={{ padding: 24 }}>
              <div className="flex-between">
                <div>
                  <p className="text-secondary" style={{ fontSize: '0.85rem' }}>{card.label}</p>
                  <p style={{ fontSize: '2rem', fontWeight: 700 }}>{card.value}</p>
                </div>
                <card.icon size={32} style={{ color: card.color, opacity: 0.6 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Top Viewed */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16 }}>Most Viewed Movies</h2>
          {stats?.topViewed?.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>Title</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>Views</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topViewed.map((movie, i) => (
                    <tr key={movie.movieId}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>{movie.title || `Movie #${movie.movieId}`}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)', textAlign: 'right' }}>{movie.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-secondary">No data yet. Start by browsing movies.</p>
          )}
        </div>
      </div>
    </div>
  );
}
