"use client";
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  return (
    <div style={{ maxWidth: 500, margin: '3rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', padding: 40, textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <button onClick={() => router.push('/dashboard')} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Back to Dashboard</button>
        <button onClick={() => router.push('/')} style={{ background: '#e6f4ea', color: '#2563eb', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Landing Page</button>
      </div>
      <h2 style={{ marginBottom: 24 }}>Settings</h2>
      <div style={{ color: '#6b7280' }}>Settings options coming soon.</div>
    </div>
  );
} 