import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (search) params.search = search;
      const { data } = await api.get('/admin/users', { params });
      setUsers(data.users || []);
      setTotalPages(data.pages || 1);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleStatusChange = async (userId, status) => {
    try {
      await api.put(`/admin/users/${userId}/status`, { status });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  return (
    <div className="page">
      <div className="container">
        <div className="flex-between mb-lg" style={{ flexWrap: 'wrap', gap: 12 }}>
          <h1 className="section-title" style={{ marginBottom: 0 }}>User Management</h1>
          <Link to="/admin" className="btn btn-secondary btn-sm">Dashboard</Link>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              className="form-input"
              placeholder="Search by name, email, or username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: 400 }}
            />
            <button className="btn btn-primary btn-sm" type="submit">Search</button>
          </div>
        </form>

        {loading ? (
          <Loader />
        ) : (
          <div className="card" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid var(--border-color)' }}>User</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid var(--border-color)' }}>Email</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid var(--border-color)' }}>Role</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid var(--border-color)' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid var(--border-color)' }}>Joined</th>
                  <th style={{ textAlign: 'right', padding: '12px', borderBottom: '1px solid var(--border-color)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>
                      <div style={{ fontWeight: 600 }}>{u.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.8rem' }}>@{u.username}</div>
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>{u.email}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>
                      <span className={`badge ${u.role === 'admin' ? 'badge-primary' : ''}`}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>
                      <span style={{
                        color: u.status === 'active' ? 'var(--success)' : u.status === 'suspended' ? 'var(--error)' : 'var(--warning)',
                        fontWeight: 600,
                      }}>
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', textAlign: 'right' }}>
                      <div className="flex-center" style={{ gap: 4, justifyContent: 'flex-end' }}>
                        {u.status !== 'active' && (
                          <button className="btn btn-sm" style={{ background: 'var(--success)', color: '#fff', fontSize: '0.75rem' }}
                            onClick={() => handleStatusChange(u._id, 'active')}>Activate</button>
                        )}
                        {u.status !== 'suspended' && (
                          <button className="btn btn-sm" style={{ background: 'var(--warning)', color: '#000', fontSize: '0.75rem' }}
                            onClick={() => handleStatusChange(u._id, 'suspended')}>Suspend</button>
                        )}
                        <button className="btn btn-sm" style={{ background: 'var(--error)', color: '#fff', fontSize: '0.75rem' }}
                          onClick={() => handleDelete(u._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ padding: 24, textAlign: 'center' }} className="text-secondary">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
