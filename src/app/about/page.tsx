"use client";

import { FaHandsHelping, FaHandshake, FaUsers } from "react-icons/fa";

export default function About() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #e6f4ea 0%, #f7fafc 100%)", padding: "0 0 40px 0" }}>
      {/* Hero Section */}
      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 1rem 2rem 1rem" }}>
        <div style={{ background: "#fff", borderRadius: 100, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
          <FaHandsHelping size={56} color="#3bb273" />
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 900, marginBottom: 12, color: "#2563eb", textAlign: "center", letterSpacing: 1 }}>About Us</h1>
        <p style={{ fontSize: 22, color: "#2563eb", maxWidth: 600, textAlign: "center", marginBottom: 0, fontWeight: 500 }}>
          Empowering nonprofits, small businesses, and local agencies to bridge the gap and build stronger communities.
        </p>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: 800, margin: "2rem auto", background: "#fff", borderRadius: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", padding: 48, fontFamily: 'Inter, sans-serif', color: '#183a4a', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <FaUsers size={28} color="#2563eb" />
          <span style={{ fontSize: 20, fontWeight: 700, color: '#2563eb' }}>Who We Are</span>
        </div>
        <p style={{ fontSize: 19, marginBottom: 24 }}>
          We are a team of long-term community volunteers, small business owners, and local government professionals who have all experienced firsthand the challenges of running a nonprofit, winning government contracts, and securing public funding.
        </p>
        <div style={{ borderTop: '1px solid #e0e7ef', margin: '32px 0' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <FaHandshake size={26} color="#3bb273" />
          <span style={{ fontSize: 20, fontWeight: 700, color: '#3bb273' }}>Our Perspective</span>
        </div>
        <p style={{ fontSize: 18, marginBottom: 18 }}>
          As <b>nonprofit leaders</b>, we deeply understand how hard it is to find the right resources, apply for grants, and keep your mission alive. As <b>small business owners</b>, we know the struggle of navigating complex government bids and contracts. As <b>local city agency staff</b>, we have seen how difficult it can be to access federal funds to support our communities.
        </p>
        <p style={{ fontSize: 18, marginBottom: 18 }}>
          We were all once in your shoes. That&apos;s why we created this platform: to fix these issues, fill the gaps, and build a bridge between those who need support and the opportunities that exist.
        </p>
        <div style={{ borderTop: '1px solid #e0e7ef', margin: '32px 0' }} />
        <div style={{ background: '#e6f4ea', borderRadius: 12, padding: 24, marginBottom: 32, textAlign: 'center', boxShadow: '0 2px 8px rgba(59,178,115,0.06)' }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#3bb273' }}>
            Our mission is simple:
          </span>
          <br />
          <span style={{ fontSize: 20, color: '#2563eb', fontWeight: 600 }}>
            Bosmond&apos;s mission is to level the playing field for small businesses and nonprofits by using AI to make applying for grants and RFPs as easy and effective as it is for large organizations with dedicated proposal teams.
          </span>
          <br />
          <span style={{ fontSize: 17, color: '#183a4a', fontWeight: 400 }}>
            We empower local organizations to discover, understand, and win funding opportunities—no matter their size or resources. Our platform uses advanced technology to guide users through the application process, suggest answers, and help draft proposals, so every organization can compete for funding on equal footing.
          </span>
        </div>
        <p style={{ fontSize: 18, marginBottom: 18 }}>
          Whether you are a nonprofit seeking grants, a business looking for government contracts, or a city agency searching for federal support, we are here to help you every step of the way.
        </p>
        <p style={{ fontSize: 18, marginBottom: 0, textAlign: 'center', fontWeight: 700, color: '#2563eb' }}>
          Together, we can build stronger communities and create lasting impact.
        </p>
      </div>
    </div>
  );
} 