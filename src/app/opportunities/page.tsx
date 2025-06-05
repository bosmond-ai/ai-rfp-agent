"use client";

import Link from "next/link";
import { FaHandHoldingUsd, FaFileContract, FaCity } from "react-icons/fa";

const grantSamples = [
  { title: "Community Impact Grant" },
  { title: "Youth Empowerment Fund" },
  { title: "Green Spaces Initiative" },
];

const contractSamples = [
  { title: "Park Maintenance Contract" },
  { title: "Local IT Services" },
  { title: "Community Event Support" },
];

const authoritySamples = [
  { title: "City of Springfield" },
  { title: "County Development Office" },
  { title: "Regional Transit Authority" },
];

export default function Opportunities() {
  return (
    <div style={{ minHeight: "100vh", background: "#f7fafc", padding: "2rem 0" }}>
      <h1 style={{ textAlign: "center", fontSize: 36, fontWeight: 800, color: "#2563eb", marginBottom: 40 }}>
        Explore Opportunities
      </h1>
      <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", maxWidth: 1200, margin: "0 auto" }}>
        {/* GRANT */}
        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", padding: 32, minWidth: 320, flex: 1, maxWidth: 350, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FaHandHoldingUsd size={40} color="#3bb273" style={{ marginBottom: 16 }} />
          <h2 style={{ color: "#3bb273", fontWeight: 700, fontSize: 24, marginBottom: 16 }}>GRANT</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, width: '100%' }}>
            {grantSamples.map((g, i) => (
              <li key={i} style={{ marginBottom: 10, fontSize: 17, color: '#183a4a' }}>• {g.title}</li>
            ))}
          </ul>
          <Link href="/opportunities/grants" style={{ marginTop: 20, color: "#2563eb", fontWeight: 600, textDecoration: "underline", fontSize: 16 }}>MORE</Link>
        </div>
        {/* SMALL CONTRACT */}
        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", padding: 32, minWidth: 320, flex: 1, maxWidth: 350, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FaFileContract size={40} color="#2563eb" style={{ marginBottom: 16 }} />
          <h2 style={{ color: "#2563eb", fontWeight: 700, fontSize: 24, marginBottom: 16 }}>SMALL CONTRACT</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, width: '100%' }}>
            {contractSamples.map((c, i) => (
              <li key={i} style={{ marginBottom: 10, fontSize: 17, color: '#183a4a' }}>• {c.title}</li>
            ))}
          </ul>
          <Link href="/opportunities/contracts" style={{ marginTop: 20, color: "#2563eb", fontWeight: 600, textDecoration: "underline", fontSize: 16 }}>MORE</Link>
        </div>
        {/* LOCAL AUTHORITIES */}
        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", padding: 32, minWidth: 320, flex: 1, maxWidth: 350, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FaCity size={40} color="#b5e0c7" style={{ marginBottom: 16 }} />
          <h2 style={{ color: "#b5e0c7", fontWeight: 700, fontSize: 24, marginBottom: 16 }}>LOCAL AUTHORITIES</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, width: '100%' }}>
            {authoritySamples.map((a, i) => (
              <li key={i} style={{ marginBottom: 10, fontSize: 17, color: '#183a4a' }}>• {a.title}</li>
            ))}
          </ul>
          <Link href="/opportunities/authorities" style={{ marginTop: 20, color: "#2563eb", fontWeight: 600, textDecoration: "underline", fontSize: 16 }}>MORE</Link>
        </div>
      </div>
    </div>
  );
} 