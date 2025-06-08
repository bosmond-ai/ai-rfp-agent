import React, { useState } from 'react';

const FREQUENCIES = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('weekly');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, frequency }),
      });
      if (!res.ok) throw new Error('Failed to sign up');
      setSuccess(true);
      setEmail('');
    } catch (e: any) {
      setError(e.message || 'Error signing up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#f7fafc', border: '1px solid #e0e7ef', borderRadius: 12, padding: 24, maxWidth: 420, margin: '32px auto 0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 20, color: '#2563eb', marginBottom: 4 }}>Subscribe to Our Grant Newsletter</div>
      <div style={{ color: '#64748b', fontSize: 15, marginBottom: 8 }}>Get the top new opportunities for WA organizations in your inbox.</div>
      <input
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #e0e7ef', fontSize: 16 }}
      />
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 15, color: '#183a4a' }}>Frequency:</span>
        {FREQUENCIES.map(f => (
          <label key={f.value} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 15 }}>
            <input
              type="radio"
              name="frequency"
              value={f.value}
              checked={frequency === f.value}
              onChange={() => setFrequency(f.value)}
              style={{ marginRight: 4 }}
            />
            {f.label}
          </label>
        ))}
      </div>
      <button type="submit" disabled={loading || !email} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 0', fontWeight: 700, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 8 }}>
        {loading ? 'Signing up...' : 'Subscribe'}
      </button>
      {success && <div style={{ color: '#3bb273', fontWeight: 600 }}>Thank you for subscribing!</div>}
      {error && <div style={{ color: '#e53e3e', fontWeight: 600 }}>{error}</div>}
    </form>
  );
} 