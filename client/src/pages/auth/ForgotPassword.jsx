import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      setMessage(data.resetUrl ? `Reset link (dev): ${data.resetUrl}` : 'Check your email for reset link');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page flex-center">
      <div className="card" style={{ width: '100%', maxWidth: 420, padding: 32 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Forgot Password</h1>
        <p className="text-secondary text-center mb-lg" style={{ fontSize: '0.9rem' }}>
          Enter your email and we'll send you a reset link.
        </p>

        {error && <div style={{ background: 'var(--error)', color: '#fff', padding: '10px 16px', borderRadius: 6, marginBottom: 16, fontSize: '0.9rem' }}>{error}</div>}
        {message && <div style={{ background: 'var(--success)', color: '#fff', padding: '10px 16px', borderRadius: 6, marginBottom: 16, fontSize: '0.9rem' }}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div style={{ marginTop: 16, textAlign: 'center', fontSize: '0.9rem' }}>
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
