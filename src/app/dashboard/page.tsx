"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/navigation";
import opportunities from "./opportunities-data";

const summaryCards = [
  { label: "Active Grants", value: 24 },
  { label: "Applications in Progress", value: 3 },
  { label: "Total Awarded", value: "$1,200,000" },
];

interface UserProfile {
  mission: string;
  tags: string[];
  [key: string]: any;
}

interface UserProfileFormProps {
  initialProfile: UserProfile | null;
  onSave: () => void;
}

function UserProfileForm({ initialProfile, onSave }: UserProfileFormProps) {
  const [mission, setMission] = useState(initialProfile?.mission || "");
  const [tags, setTags] = useState(initialProfile?.tags?.join(", ") || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mission,
        tags: tags.split(",").map((t: string) => t.trim()),
      }),
    });
    setSaving(false);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "2rem auto" }}>
      <h2>Set Up Your Profile</h2>
      <div>
        <label>Mission Statement</label>
        <textarea
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          rows={4}
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <label>Interests/Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>
      <button type="submit" disabled={saving} style={{ marginTop: 16 }}>
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}

const STATUS_COLORS: Record<string, string> = {
  "Active": "#3bb273",
  "Closed": "#e53e3e",
  "In Progress": "#2563eb",
};

export default function Dashboard() {
  const [theme, setTheme] = useState("light");
  const [showModal, setShowModal] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<any>(null);
  const { user, isLoading } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const router = useRouter();

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleApply = (opp: any) => {
    setSelectedOpp(opp);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOpp(null);
  };

  // Fetch user profile after login
  useEffect(() => {
    if (!user) return;
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        setProfile(data && data.id ? data : null);
        setLoadingProfile(false);
      });
  }, [user]);

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch =
      opp.title.toLowerCase().includes(search.toLowerCase()) ||
      (opp.sector && opp.sector.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = filterStatus ? opp.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const handleBookmark = (id: string) => {
    setBookmarked(bm => bm.includes(id) ? bm.filter(b => b !== id) : [...bm, id]);
    setRecentActivity(ra => [
      { type: "bookmark", oppId: id, time: new Date().toLocaleString() },
      ...ra.slice(0, 9)
    ]);
  };

  const handleApplyQuick = (opp: any) => {
    setRecentActivity(ra => [
      { type: "apply", oppId: opp.id, time: new Date().toLocaleString() },
      ...ra.slice(0, 9)
    ]);
    handleApply(opp);
  };

  if (isLoading || loadingProfile) return <div>Loading...</div>;
  if (!profile) return <UserProfileForm initialProfile={null} onSave={() => window.location.reload()} />;

  return (
    <div className={theme === "dark" ? "dashboard dark" : "dashboard light"} style={{ minHeight: "100vh", background: theme === "dark" ? "#1a2327" : "#f7fafc" }}>
      {/* Top Navigation Bar */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem", background: theme === "dark" ? "#e6f4ea" : "#e6f4ea", borderBottom: "1px solid #e0e7ef" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image src="/bosmond-logo.png" alt="Bosmond Logo" width={48} height={48} />
          <span style={{ fontWeight: 700, fontSize: 24, color: theme === "dark" ? "#183a4a" : "#183a4a" }}>BOSMOND</span>
        </div>
        <div style={{ position: "relative" }}>
          <button onClick={() => setUserMenuOpen(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 600 }}>{user?.name || user?.email || "User"}</span>
            <span style={{ fontSize: 20 }}>▼</span>
          </button>
          {userMenuOpen && (
            <div style={{ position: "absolute", right: 0, top: 36, background: "#fff", border: "1px solid #e0e7ef", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", minWidth: 160, zIndex: 10 }}>
              <a href="/dashboard/profile" style={{ display: "block", padding: "12px 20px", color: "#183a4a", textDecoration: "none", borderBottom: "1px solid #e0e7ef" }}>Profile</a>
              <a href="/dashboard/settings" style={{ display: "block", padding: "12px 20px", color: "#183a4a", textDecoration: "none", borderBottom: "1px solid #e0e7ef" }}>Settings</a>
              <a href="/api/auth/logout" style={{ display: "block", padding: "12px 20px", color: "#e53e3e", textDecoration: "none" }}>Logout</a>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: 1200, margin: "2rem auto", padding: 24, display: "flex", gap: 32 }}>
        <div style={{ flex: 3 }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <input
              type="text"
              placeholder="Search opportunities..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 2, padding: 8, borderRadius: 6, border: "1px solid #e0e7ef" }}
            />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #e0e7ef" }}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
          {/* Opportunities Table */}
          <div style={{ background: theme === "dark" ? "#f7fafc" : "#fff", borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.04)", padding: 24 }}>
            {filteredOpportunities.length === 0 ? (
              <div style={{ textAlign: "center", color: "#6b7280", padding: 40 }}>
                <Image src="/empty-state.svg" alt="No opportunities" width={120} height={120} style={{ marginBottom: 16 }} />
                <div style={{ fontSize: 20, fontWeight: 600 }}>No opportunities found</div>
                <div style={{ marginTop: 8 }}>Try adjusting your search or filters.</div>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ color: theme === "dark" ? "#183a4a" : "#183a4a" }}>
                    <th style={{ textAlign: "left", padding: 8 }}>Title</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Status</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Amount</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Audience</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Sector</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Activity</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOpportunities.map(opp => (
                    <tr key={opp.id} style={{ borderBottom: "1px solid #e0e7ef" }}>
                      <td style={{ padding: 8 }}>{opp.title}</td>
                      <td style={{ padding: 8 }}>
                        <span style={{ background: STATUS_COLORS[opp.status] || "#e0e7ef", color: "#fff", borderRadius: 6, padding: "4px 12px", fontWeight: 600, fontSize: 14 }}>
                          {opp.status}
                        </span>
                      </td>
                      <td style={{ padding: 8 }}>{opp.amount}</td>
                      <td style={{ padding: 8 }}>{opp.audience}</td>
                      <td style={{ padding: 8 }}>{opp.sector}</td>
                      <td style={{ padding: 8 }}>{opp.activity}</td>
                      <td style={{ padding: 8, display: "flex", gap: 8 }}>
                        <button onClick={() => router.push(`/dashboard/opportunity/${opp.id}`)} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "6px 16px", fontWeight: 600, cursor: "pointer" }}>Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {/* Recent Activity Sidebar */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ background: theme === "dark" ? "#f7fafc" : "#fff", borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.04)", padding: 20, marginBottom: 24 }}>
            <h4 style={{ marginBottom: 12, color: "#2563eb" }}>Recent Activity</h4>
            {recentActivity.length === 0 ? (
              <div style={{ color: "#6b7280" }}>No recent activity yet.</div>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {recentActivity.map((act, i) => (
                  <li key={i} style={{ marginBottom: 10, fontSize: 15 }}>
                    {act.type === "bookmark" ? (
                      <>Bookmarked opportunity <b>{act.oppId}</b> <span style={{ color: "#6b7280", fontSize: 12 }}>({act.time})</span></>
                    ) : (
                      <>Applied to opportunity <b>{act.oppId}</b> <span style={{ color: "#6b7280", fontSize: 12 }}>({act.time})</span></>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
