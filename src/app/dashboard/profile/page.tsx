"use client";
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import Image from 'next/image';

const bannerUrl = "/profile-banner.jpg"; // Use a default or user-uploaded banner

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  // Placeholder for recent activity
  const recentActivity = [
    { type: "applied", label: "Community Development Block Grants", date: "2024-06-01" },
    { type: "saved", label: "HEAR Program", date: "2024-05-28" },
  ];
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div style={{ maxWidth: 700, margin: '3rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
      {/* Banner */}
      <div style={{ position: 'relative', height: 180, background: '#e6f4ea' }}>
        <Image 
          src={bannerUrl} 
          alt="Profile banner" 
          width={1200} 
          height={180} 
          className="profile-banner" 
          style={{ objectFit: 'cover' }} 
        />
        {/* Avatar */}
        <Image 
          src={user.picture || '/default-avatar.png'}
          alt="Profile avatar"
          width={120}
          height={120}
          className="profile-avatar"
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid #fff',
            position: 'absolute',
            left: 40,
            bottom: -60,
            background: '#fff',
          }}
        />
        {/* Edit Profile Button */}
        <button
          onClick={() => router.push('/dashboard/profile/edit')}
          style={{ position: 'absolute', right: 40, bottom: 20, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', cursor: 'pointer' }}
        >
          <FaEdit /> Edit Profile
        </button>
      </div>
      {/* Main Card Content */}
      <div style={{ padding: '80px 40px 40px 40px' }}>
        <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>{user.name || user.email}</div>
        <div style={{ color: '#2563eb', fontWeight: 600, marginBottom: 8 }}>Your Organization or Role</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6b7280' }}><FaEnvelope /> {user.email}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6b7280' }}><FaMapMarkerAlt /> City, State</span>
        </div>
        <div style={{ marginBottom: 24, color: '#183a4a', fontSize: 17, lineHeight: 1.6 }}>
          <b>Mission:</b> <span style={{ fontWeight: 400 }}>Your mission statement goes here. (Editable in profile setup)</span>
        </div>
        {/* Recent Activity Section */}
        <div style={{ marginTop: 32 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#2563eb' }}>Recent Activity</h3>
          {recentActivity.length === 0 ? (
            <div style={{ color: '#6b7280' }}>No recent activity yet.</div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {recentActivity.map((act, i) => (
                <li key={i} style={{ marginBottom: 10, fontSize: 16 }}>
                  {act.type === 'applied' ? (
                    <>Applied to <b>{act.label}</b> <span style={{ color: '#6b7280', fontSize: 13 }}>({act.date})</span></>
                  ) : (
                    <>Saved <b>{act.label}</b> <span style={{ color: '#6b7280', fontSize: 13 }}>({act.date})</span></>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 