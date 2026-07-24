import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Loader from '../../components/Loader';

export default function AdminAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data: analyticsData } = await api.get('/admin/analytics');
        setData(analyticsData);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <Loader />;
  if (!data) return <div className="page"><p className="text-secondary">Failed to load analytics.</p></div>;

  return (
    <div className="page">
      <div className="container">
        <div className="flex-between mb-lg">
          <h1 className="section-title" style={{ marginBottom: 0 }}>Analytics</h1>
          <Link to="/admin" className="btn btn-secondary btn-sm">Dashboard</Link>
        </div>

        {/* Overview cards */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          <div className="card" style={{ padding: 20 }}>
            <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Total Users</p>
            <p style={{ fontSize: '1.8rem', fontWeight: 700 }}>{data.totalUsers}</p>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Active Users</p>
            <p style={{ fontSize: '1.8rem', fontWeight: 700 }}>{data.activeUsers}</p>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Cached Movies</p>
            <p style={{ fontSize: '1.8rem', fontWeight: 700 }}>{data.totalCachedMovies}</p>
          </div>
        </div>

        {/* User Growth */}
        {data.userGrowth?.length > 0 && (
          <div className="card" style={{ padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16 }}>User Growth (Monthly)</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>Month</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>New Users</th>
                  </tr>
                </thead>
                <tbody>
                  {data.userGrowth.map((item) => (
                    <tr key={item._id}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>{item._id}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)', textAlign: 'right' }}>{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Most Viewed */}
        {data.mostViewed?.length > 0 && (
          <div className="card" style={{ padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16 }}>Most Viewed Movies</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>Movie</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>Views</th>
                  </tr>
                </thead>
                <tbody>
                  {data.mostViewed.map((movie) => (
                    <tr key={movie.movieId}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>{movie.title || `Movie #${movie.movieId}`}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)', textAlign: 'right' }}>{movie.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Favorite Genres */}
        {data.favoriteGenres?.length > 0 && (
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16 }}>Popular Genres</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>Genre</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>Movies</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>Total Views</th>
                  </tr>
                </thead>
                <tbody>
                  {data.favoriteGenres.map((genre) => (
                    <tr key={genre._id}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>{genre._id}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)', textAlign: 'right' }}>{genre.count}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)', textAlign: 'right' }}>{genre.totalViews}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
