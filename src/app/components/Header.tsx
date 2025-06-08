"use client";
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import UserMenu from './UserMenu';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Opportunities', href: '/opportunities' },
  { label: 'Federal Grants', href: '/federal-grants' },
  { label: 'Resources', href: '/resources' },
];

export default function Header() {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();

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
          <UserMenu user={user} isAdmin={user.role === 'admin'} />
        ) : (
          <Link href="/login" style={{ background: '#2563eb', color: '#fff', padding: '8px 24px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>Login / Sign Up</Link>
        )}
      </div>
    </header>
  );
} 