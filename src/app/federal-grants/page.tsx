'use client';
import React, { useEffect, useState } from 'react';
import { FaUniversity, FaRegLightbulb } from 'react-icons/fa';
import Link from 'next/link';
import NewsletterSignup from '../components/NewsletterSignup';
import { useUser } from '@auth0/nextjs-auth0';

const ELIGIBILITY_OPTIONS = [
  { label: 'Nonprofit', value: '25' }, // 25 = Nonprofits (from Grants.gov eligibility codes)
  { label: 'Company', value: '11' },   // 11 = For-profit organizations other than small businesses
];

const LOCAL_KEYWORDS = [
  'Washington', 'Seattle', 'Tacoma', 'Olympia', 'Pierce County', 'King County',
  'Pacific Northwest', 'Spokane', 'Everett', 'Bellevue', 'Thurston County', 'Snohomish County'
];

interface Grant {
  id?: string;
  opportunityId?: string;
  title?: string;
  opportunityTitle?: string;
  synopsis?: string;
  eligibility?: string;
  agencyName?: string;
  cfdaList?: { cfdaNumber: string }[];
  openDate?: string;
  closeDate?: string;
  [key: string]: any;
}

export default function FederalGrantsPage() {
  const [tab, setTab] = useState('25'); // Default to Nonprofit
  const [keyword, setKeyword] = useState('');
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hitCount, setHitCount] = useState(0);
  const rows = 20;

  useEffect(() => {
    async function fetchGrants() {
      setLoading(true);
      setError('');
      setGrants([]);
      try {
        const params = new URLSearchParams({ eligibility: tab, keyword, page: String(page) });
        const res = await fetch(`/api/federal-grants?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch grants');
        const data = await res.json();
        setGrants(data.grants);
        setHitCount(data.hitCount);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Error fetching grants');
      } finally {
        setLoading(false);
      }
    }
    fetchGrants();
  }, [tab, keyword, page]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e6f4ea 0%, #e0e7ef 100%)', padding: 0 }}>
      {/* Hero Section */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem 2rem 1rem', background: 'linear-gradient(135deg, #2563eb 0%, #3bb273 100%)', borderRadius: '0 0 32px 32px', boxShadow: '0 4px 24px rgba(37,99,235,0.08)' }}>
        <div style={{ background: '#fff', borderRadius: 100, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <FaUniversity size={56} color="#2563eb" />
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 900, marginBottom: 12, color: '#fff', textAlign: 'center', letterSpacing: 1 }}>Federal Grants</h1>
        <p style={{ fontSize: 22, color: '#fff', maxWidth: 600, textAlign: 'center', marginBottom: 24, fontWeight: 500 }}>
          Discover and apply for federal grant opportunities with Bosmond. Sourced directly from Grants.gov, tailored for nonprofits, businesses, and local agencies in Washington State.
        </p>
        <Link href="/signup" style={{ background: '#fff', color: '#2563eb', padding: '14px 40px', borderRadius: 10, fontWeight: 700, fontSize: 20, textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 8 }}>
          Sign Up to Get Matched
        </Link>
        <span style={{ color: '#e0e7ef', fontSize: 16, marginTop: 4 }}>Or browse opportunities below</span>
      </section>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10" style={{ marginTop: 40 }}>
        {/* Tabs and Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {ELIGIBILITY_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setTab(opt.value)}
                style={{
                  background: tab === opt.value ? '#2563eb' : '#e6f4ea',
                  color: tab === opt.value ? '#fff' : '#2563eb',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 20px',
                  fontSize: 16,
                  cursor: 'pointer',
                  boxShadow: tab === opt.value ? '0 2px 8px rgba(37,99,235,0.08)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search grants..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            style={{ flex: 1, padding: '8px 16px', borderRadius: 8, border: '1px solid #e0e7ef', fontSize: 16 }}
          />
        </div>
        {/* Loading/Error */}
        {loading && <div style={{ textAlign: 'center', color: '#2563eb', margin: '32px 0' }}>Loading grants...</div>}
        {error && <div style={{ textAlign: 'center', color: '#e53e3e', margin: '32px 0' }}>{error}</div>}
        {/* Grants List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
          {!loading && !error && grants.length === 0 && (
            <div className="text-gray-500 italic">No grants to display yet.</div>
          )}
          {grants.map((grant: Grant) => {
            const text = `${grant.title || grant.opportunityTitle} ${grant.synopsis || ''} ${grant.eligibility || ''}`.toLowerCase();
            const isLocal = LOCAL_KEYWORDS.some(k => text.includes(k.toLowerCase()));
            return (
              <div
                key={grant.id || grant.opportunityId}
                onClick={() => setSelected(grant.id || grant.opportunityId || null)}
                style={{
                  background: selected === (grant.id || grant.opportunityId) ? '#e6f4ea' : isLocal ? '#e0f7fa' : '#f7fafc',
                  border: selected === (grant.id || grant.opportunityId) ? '2px solid #2563eb' : isLocal ? '2px solid #3bb273' : '1px solid #e0e7ef',
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
              >
                <FaRegLightbulb size={32} color={isLocal ? '#3bb273' : '#2563eb'} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 20, color: '#2563eb' }}>{grant.title || grant.opportunityTitle}</div>
                  <div style={{ color: '#183a4a', fontSize: 16, margin: '6px 0' }}>{grant.agencyName}</div>
                  <div style={{ color: '#64748b', fontSize: 15 }}>CFDA: {grant.cfdaList?.map((c: { cfdaNumber: string }) => c.cfdaNumber).join(', ') || 'N/A'}</div>
                  <div style={{ color: '#64748b', fontSize: 15 }}>Open: {grant.openDate || grant.openDate?.split('T')[0]} | Close: {grant.closeDate || grant.closeDate?.split('T')[0]}</div>
                </div>
                <SaveGrantButton grant={grant} />
              </div>
            );
          })}
        </div>
        {/* Pagination Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, margin: '32px 0' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e0e7ef', background: page === 1 ? '#f1f5f9' : '#2563eb', color: page === 1 ? '#64748b' : '#fff', fontWeight: 700, cursor: page === 1 ? 'not-allowed' : 'pointer' }}>Prev</button>
          <span style={{ fontWeight: 600, fontSize: 16 }}>Page {page} of {Math.ceil(hitCount / rows) || 1}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page * rows >= hitCount} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e0e7ef', background: page * rows >= hitCount ? '#f1f5f9' : '#2563eb', color: page * rows >= hitCount ? '#64748b' : '#fff', fontWeight: 700, cursor: page * rows >= hitCount ? 'not-allowed' : 'pointer' }}>Next</button>
        </div>
      </main>

      {/* Testimonial Section */}
      <section style={{ background: '#e6f4ea', padding: '3rem 0', marginTop: 48 }}>
        <h2 style={{ textAlign: 'center', fontSize: 26, fontWeight: 700, color: '#2563eb', marginBottom: 32 }}>Why Use Bosmond for Federal Grants?</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, maxWidth: 340, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <p style={{ fontStyle: 'italic', marginBottom: 12 }}>
              "Bosmond made it so easy to find grants that fit our mission. The matching is spot on!"
            </p>
            <div style={{ fontWeight: 600, color: '#3bb273' }}>— Nonprofit Leader</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, maxWidth: 340, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <p style={{ fontStyle: 'italic', marginBottom: 12 }}>
              "We never knew about half these opportunities before. Bosmond is a game changer."
            </p>
            <div style={{ fontWeight: 600, color: '#2563eb' }}>— Small Business Owner</div>
          </div>
        </div>
      </section>
      <NewsletterSignup />
    </div>
  );
}

function SaveGrantButton({ grant }: { grant: Grant }) {
  const { user } = useUser();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaving(true);
    setError('');
    if (!user?.sub) {
      setError('You must be logged in to save grants.');
      setSaving(false);
      return;
    }
    try {
      const res = await fetch('/api/user-grants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grantId: grant.id || grant.opportunityId,
          userId: user.sub,
        }),
      });
      if (!res.ok) throw new Error('Failed to save grant');
      setSaved(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error saving grant');
    } finally {
      setSaving(false);
    }
  };

  if (saved) return <span style={{ color: '#3bb273', fontWeight: 600 }}>Saved!</span>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
      <button
        onClick={handleSave}
        disabled={saving}
        style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: 15, cursor: 'pointer', minWidth: 90 }}
      >
        {saving ? 'Saving...' : 'Save to Dashboard'}
      </button>
      {error && <span style={{ color: '#e53e3e', fontSize: 13 }}>{error}</span>}
    </div>
  );
} 