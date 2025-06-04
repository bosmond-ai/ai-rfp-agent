"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCamera } from 'react-icons/fa';

const bannerUrl = "/profile-banner.jpg";
const defaultAvatar = "/default-avatar.png";

export default function EditProfilePage() {
  const router = useRouter();
  // Placeholder for user data (replace with real data/fetch in production)
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [mission, setMission] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      // router.push('/dashboard/profile'); // Uncomment to redirect after save
    }, 1200);
  };

  return (
    <div style={{ maxWidth: 700, margin: '3rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 40px 0 40px' }}>
        <button onClick={() => router.push('/dashboard/profile')} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Back to Profile</button>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => router.push('/dashboard')} style={{ background: '#e6f4ea', color: '#2563eb', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Dashboard</button>
          <button onClick={() => router.push('/')} style={{ background: '#e6f4ea', color: '#2563eb', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Landing Page</button>
        </div>
      </div>
      {/* Banner */}
      <div style={{ position: 'relative', height: 180, background: `url(${bannerUrl}) center/cover, #e6f4ea` }}>
        {/* Avatar Upload */}
        <div style={{ position: 'absolute', left: 40, bottom: -60, zIndex: 2 }}>
          <label style={{ cursor: 'pointer', position: 'relative', display: 'inline-block' }}>
            <img
              src={avatar || defaultAvatar}
              alt="avatar"
              style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            />
            <span style={{ position: 'absolute', right: 8, bottom: 8, background: '#2563eb', color: '#fff', borderRadius: '50%', padding: 6, border: '2px solid #fff', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaCamera />
            </span>
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
          </label>
          <div style={{ textAlign: 'center', marginTop: 8, color: '#2563eb', fontWeight: 600, fontSize: 14 }}>Change Photo</div>
        </div>
        {/* Banner overlay for visual clarity */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg,rgba(0,0,0,0.04) 60%,rgba(0,0,0,0.10) 100%)', zIndex: 1 }} />
      </div>
      {/* Edit Form */}
      <form onSubmit={handleSave} style={{ padding: '80px 40px 40px 40px' }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24, textAlign: 'center' }}>Edit Profile</h2>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600 }}>Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e0e7ef', marginTop: 6 }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600 }}>Organization</label>
          <input type="text" value={organization} onChange={e => setOrganization(e.target.value)} placeholder="Your Organization" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e0e7ef', marginTop: 6 }} />
        </div>
        <div style={{ marginBottom: 20, display: 'flex', gap: 16 }}>
          <div style={{ flex: 2 }}>
            <label style={{ fontWeight: 600 }}>City</label>
            <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Seattle" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e0e7ef', marginTop: 6 }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 600 }}>State</label>
            <input type="text" value={state} onChange={e => setState(e.target.value)} placeholder="WA" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e0e7ef', marginTop: 6 }} />
          </div>
        </div>
        <div style={{ marginBottom: 28 }}>
          <label style={{ fontWeight: 600 }}>Mission Statement</label>
          <textarea value={mission} onChange={e => setMission(e.target.value)} placeholder="Our mission is to make a difference." rows={4} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e0e7ef', marginTop: 6 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button type="button" onClick={() => router.push('/dashboard/profile')} style={{ background: '#e6f4ea', color: '#2563eb', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Cancel</button>
          <button type="submit" disabled={saving} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', minWidth: 120 }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        {success && <div style={{ color: '#3bb273', marginTop: 18, textAlign: 'center', fontWeight: 600 }}>Profile updated successfully!</div>}
      </form>
    </div>
  );
} 