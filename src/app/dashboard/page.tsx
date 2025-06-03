"use client";
import { useState } from "react";
import Image from "next/image";

const summaryCards = [
  { label: "Active Grants", value: 24 },
  { label: "Applications in Progress", value: 3 },
  { label: "Total Awarded", value: "$1,200,000" },
];

const opportunities = [
  {
    id: "1",
    title: "Community Development Block Grants",
    status: "Active",
    amount: "$1 - $2,000,000",
    audience: "Local Government",
    sector: "Infrastructure, Energy Efficiency",
    activity: "Efficiency Improvements, Financial Assistance",
    openDate: "",
    closeDate: "",
    link: "#",
  },
  {
    id: "2",
    title: "State Home Electrification and Appliance Rebate Program (HEAR)",
    status: "Active",
    amount: "$1 - $77,600,000",
    audience: "Businesses, Individuals, Local Government, Nonprofits, Tribes, Utilities",
    sector: "Buildings & Infrastructure, Energy Efficiency, Residential",
    activity: "Efficiency Improvements, Financial Assistance",
    openDate: "",
    closeDate: "",
    link: "#",
  },
];

export default function Dashboard() {
  const [theme, setTheme] = useState("light");
  const [showModal, setShowModal] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<any>(null);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleApply = (opp: any) => {
    setSelectedOpp(opp);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOpp(null);
  };

  return (
    <div className={theme === "dark" ? "dashboard dark" : "dashboard light"} style={{ minHeight: "100vh", background: theme === "dark" ? "#1a2327" : "#f7fafc" }}>
      {/* Top Navigation Bar */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem", background: theme === "dark" ? "#183a4a" : "#e6f4ea", borderBottom: "1px solid #e0e7ef" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image src="/bosmond-logo.png" alt="Bosmond Logo" width={48} height={48} />
          <span style={{ fontWeight: 700, fontSize: 24, color: theme === "dark" ? "#fff" : "#183a4a" }}>BOSMOND</span>
        </div>
        <button onClick={toggleTheme} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: theme === "dark" ? "#fff" : "#183a4a" }}>
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: 1200, margin: "2rem auto", padding: 24 }}>
        <h2 style={{ color: theme === "dark" ? "#fff" : "#183a4a", marginBottom: 8 }}>Welcome to your Grant Dashboard</h2>
        <p style={{ color: theme === "dark" ? "#b5e0c7" : "#3a6351", marginBottom: 32 }}>Find opportunities that fit your mission and apply with confidence.</p>
        {/* Summary Cards */}
        <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
          {summaryCards.map(card => (
            <div key={card.label} style={{ flex: 1, background: theme === "dark" ? "#244b3c" : "#e6f4ea", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", color: theme === "dark" ? "#b5e0c7" : "#183a4a" }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{card.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>{card.value}</div>
            </div>
          ))}
        </div>
        {/* Opportunities Table */}
        <div style={{ background: theme === "dark" ? "#22313a" : "#fff", borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.04)", padding: 24 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ color: theme === "dark" ? "#b5e0c7" : "#183a4a" }}>
                <th style={{ textAlign: "left", padding: 8 }}>Title</th>
                <th style={{ textAlign: "left", padding: 8 }}>Status</th>
                <th style={{ textAlign: "left", padding: 8 }}>Amount</th>
                <th style={{ textAlign: "left", padding: 8 }}>Audience</th>
                <th style={{ textAlign: "left", padding: 8 }}>Sector</th>
                <th style={{ textAlign: "left", padding: 8 }}>Activity</th>
                <th style={{ textAlign: "left", padding: 8 }}>Apply</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map(opp => (
                <tr key={opp.id} style={{ borderBottom: "1px solid #e0e7ef" }}>
                  <td style={{ padding: 8 }}>{opp.title}</td>
                  <td style={{ padding: 8 }}>{opp.status}</td>
                  <td style={{ padding: 8 }}>{opp.amount}</td>
                  <td style={{ padding: 8 }}>{opp.audience}</td>
                  <td style={{ padding: 8 }}>{opp.sector}</td>
                  <td style={{ padding: 8 }}>{opp.activity}</td>
                  <td style={{ padding: 8 }}>
                    <button onClick={() => handleApply(opp)} style={{ background: theme === "dark" ? "#3bb273" : "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "8px 20px", fontWeight: 600, cursor: "pointer" }}>Apply</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Apply Modal */}
      {showModal && selectedOpp && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: theme === "dark" ? "#22313a" : "#fff", borderRadius: 16, padding: 32, minWidth: 400, maxWidth: "90vw", boxShadow: "0 4px 32px rgba(0,0,0,0.12)", color: theme === "dark" ? "#b5e0c7" : "#183a4a" }}>
            <h3 style={{ marginBottom: 12 }}>{selectedOpp.title}</h3>
            <p style={{ marginBottom: 16 }}>Grant Requirements: (placeholder for requirements and details)</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button onClick={() => alert("User will apply themselves")}
                style={{ background: theme === "dark" ? "#2563eb" : "#3bb273", color: "#fff", border: "none", borderRadius: 6, padding: "10px 0", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
                Apply Myself
              </button>
              <button onClick={() => window.location.href = `/apply-with-bosmond?opp=${encodeURIComponent(selectedOpp.id)}`}
                style={{ background: theme === "dark" ? "#3bb273" : "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "10px 0", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
                Apply with BOSMOND
              </button>
              <button onClick={closeModal} style={{ background: "none", color: theme === "dark" ? "#b5e0c7" : "#183a4a", border: "none", marginTop: 8, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer style={{ textAlign: "center", padding: 24, color: theme === "dark" ? "#b5e0c7" : "#6b7280", background: "none" }}>
        <span>Contact | Privacy | Terms</span>
      </footer>
    </div>
  );
}
