"use client";
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { usePathname, useRouter } from 'next/navigation';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Opportunities', href: '/opportunities' },
  { label: 'Resources', href: '/resources' },
];

export default function Header() {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#fff',
      borderBottom: '1px solid #e0e7ef',
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/">
          <Image src="/bosmond-logo.png" alt="Bosmond Logo" width={40} height={40} style={{ cursor: 'pointer' }} />
        </Link>
        <span style={{ fontWeight: 700, fontSize: 22, color: '#2563eb', letterSpacing: 1, cursor: 'pointer' }} onClick={() => router.push('/')}>BOSMOND</span>
      </div>
      {/* Nav Links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {navLinks.map(link => (
          <Link key={link.href} href={link.href} style={{
            color: pathname === link.href ? '#2563eb' : '#183a4a',
            fontWeight: pathname === link.href ? 700 : 500,
            fontSize: 17,
            textDecoration: 'none',
            borderBottom: pathname === link.href ? '2px solid #2563eb' : '2px solid transparent',
            paddingBottom: 2,
            transition: 'color 0.2s',
          }}>{link.label}</Link>
        ))}
      </nav>
      {/* User Menu */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12 }}>
        {user ? (
          <>
            <button onClick={() => setMenuOpen(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              {user.picture ? (
                <Image src={user.picture} alt="avatar" width={32} height={32} style={{ borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: 32, color: '#2563eb' }}><FaUserCircle /></span>
              )}
              <span style={{ fontWeight: 600 }}>{user.name || user.email || 'User'}</span>
            </button>
            {menuOpen && (
              <div style={{ position: 'absolute', right: 0, top: 44, background: '#fff', border: '1px solid #e0e7ef', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', minWidth: 180, zIndex: 10 }}>
                <Link href="/dashboard/profile" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', color: '#183a4a', textDecoration: 'none', borderBottom: '1px solid #e0e7ef' }}><FaUserCircle /> Profile</Link>
                <Link href="/api/auth/logout" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', color: '#e53e3e', textDecoration: 'none' }}><FaSignOutAlt /> Logout</Link>
              </div>
            )}
          </>
        ) : (
          <Link href="/api/auth/login?returnTo=/dashboard" style={{ background: '#2563eb', color: '#fff', padding: '8px 24px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>Login / Sign Up</Link>
        )}
      </div>
    </header>
  );
} 