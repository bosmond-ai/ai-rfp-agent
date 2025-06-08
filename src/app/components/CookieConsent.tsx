'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'bosmond_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const adjustPreferences = () => {
    // For demo: just close the banner. In production, show a preferences modal.
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', background: '#f5f6fa', color: '#222', padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 9999, boxShadow: '0 -2px 12px rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 1100, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ fontSize: 17, textAlign: 'center', color: '#222', fontWeight: 400, lineHeight: 1.6 }}>
          This website uses cookies and similar technologies to collect information you provide and information about your interactions with our sites to improve your experience, analyze performance and traffic on our website and assist our marketing efforts and customer service. We may share this information with our third-party partners. You can change your <Link href="/cookie-preferences" style={{ color: '#222', textDecoration: 'underline' }}>cookie preferences here</Link>. By continuing to browse, you agree to our use of these tools in accordance with our <Link href="/privacy" style={{ color: '#222', textDecoration: 'underline' }}>Privacy Notice</Link> and you agree to the terms of our <Link href="/terms" style={{ color: '#222', textDecoration: 'underline' }}>Terms of Service</Link>.
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          <button onClick={acceptCookies} style={{ background: '#222', color: '#fff', border: 'none', borderRadius: 3, padding: '10px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>OK, got it</button>
          <button onClick={adjustPreferences} style={{ background: '#fff', color: '#222', border: '1px solid #222', borderRadius: 3, padding: '10px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Adjust preferences</button>
          <Link href="/cookie-policy" style={{ color: '#222', fontWeight: 500, fontSize: 16, alignSelf: 'center', textDecoration: 'underline' }}>Read our Cookie Policy</Link>
        </div>
      </div>
    </div>
  );
} 