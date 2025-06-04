"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Opportunity {
  id: string;
  title: string;
  source: string;
  status: string;
  amount?: string | null;
  link: string;
  audience?: string | null;
  sector?: string | null;
  activity?: string | null;
  openDate?: string | null;
  closeDate?: string | null;
}

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#f7fafc", color: "#183a4a", fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 1rem 2rem 1rem", background: "#e6f4ea" }}>
        <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16, textAlign: "center" }}>
          Find the Right Grants for Your Mission
        </h1>
        <p style={{ fontSize: 22, maxWidth: 600, textAlign: "center", marginBottom: 32 }}>
          BOSMOND matches nonprofits and businesses with thousands of funding opportunities tailored to your goals.
        </p>
        <a href="/api/auth/login?returnTo=/dashboard" style={{ background: "#3bb273", color: "#fff", padding: "16px 48px", borderRadius: 10, fontWeight: 700, fontSize: 20, textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section style={{ display: "flex", justifyContent: "center", gap: 32, margin: "3rem 0" }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 32, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", maxWidth: 260 }}>
          <h3 style={{ color: "#2563eb", fontWeight: 700, fontSize: 20 }}>Personalized Grant Matching</h3>
          <p style={{ marginTop: 12 }}>See only the opportunities that fit your mission and interests.</p>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, padding: 32, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", maxWidth: 260 }}>
          <h3 style={{ color: "#3bb273", fontWeight: 700, fontSize: 20 }}>Thousands of Opportunities</h3>
          <p style={{ marginTop: 12 }}>Access a growing database of grants and funding sources.</p>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, padding: 32, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", maxWidth: 260 }}>
          <h3 style={{ color: "#183a4a", fontWeight: 700, fontSize: 20 }}>Easy Application Process</h3>
          <p style={{ marginTop: 12 }}>Apply yourself or let BOSMOND help you every step of the way.</p>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, padding: 32, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", maxWidth: 260 }}>
          <h3 style={{ color: "#b5e0c7", fontWeight: 700, fontSize: 20 }}>Expert Support</h3>
          <p style={{ marginTop: 12 }}>Get guidance from our team of grant experts and advisors.</p>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ maxWidth: 900, margin: "0 auto 3rem auto", padding: 24, background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#2563eb", marginBottom: 20, textAlign: "center" }}>How It Works</h2>
        <ol style={{ fontSize: 18, color: "#183a4a", lineHeight: 1.7, maxWidth: 700, margin: "0 auto" }}>
          <li style={{ marginBottom: 12 }}><b>Sign up</b> and tell us your mission and interests.</li>
          <li style={{ marginBottom: 12 }}><b>Get matched</b> with relevant grants and funding opportunities.</li>
          <li><b>Apply</b> with confidence—on your own or with BOSMOND's help.</li>
        </ol>
      </section>

      {/* Testimonials */}
      <section style={{ background: "#e6f4ea", padding: "3rem 0" }}>
        <h2 style={{ textAlign: "center", fontSize: 26, fontWeight: 700, color: "#183a4a", marginBottom: 32 }}>What Our Users Say</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 28, maxWidth: 340, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <p style={{ fontStyle: "italic", marginBottom: 12 }}>
              "BOSMOND helped us find and win a grant that made a real difference for our food program."
            </p>
            <div style={{ fontWeight: 600 }}>— Sarah, Nonprofit Director</div>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 28, maxWidth: 340, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <p style={{ fontStyle: "italic", marginBottom: 12 }}>
              "The personalized dashboard is a game changer. We only see grants that matter to us."
            </p>
            <div style={{ fontWeight: 600 }}>— James, Community Leader</div>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 28, maxWidth: 340, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <p style={{ fontStyle: "italic", marginBottom: 12 }}>
              "I love how easy it is to apply. BOSMOND's support team is fantastic!"
            </p>
            <div style={{ fontWeight: 600 }}>— Priya, Small Business Owner</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: 32, color: "#6b7280", background: "none", fontSize: 16 }}>
        <span>Contact | Privacy | Terms</span>
      </footer>
    </div>
  );
}
