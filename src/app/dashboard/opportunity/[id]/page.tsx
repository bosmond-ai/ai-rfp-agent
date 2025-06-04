import { notFound } from "next/navigation";
import opportunities from "../../opportunities-data"; // You may want to load this from a real source or API

export default function Page({ params }: { params: { id: string } }) {
  // For now, use a static list or fetch from API
  const opportunity = opportunities.find((opp) => opp.id === params.id);
  if (!opportunity) return notFound();

  // Placeholder for AI-powered analysis
  const aiSummary = "(AI-generated summary of requirements, scope, total fund, timeline, etc. will appear here.)";

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>{opportunity.title}</h1>
      <div style={{ color: "#2563eb", fontWeight: 600, marginBottom: 24 }}>{opportunity.status}</div>
      <div style={{ marginBottom: 24 }}>
        <b>Amount:</b> {opportunity.amount}<br />
        <b>Audience:</b> {opportunity.audience}<br />
        <b>Sector:</b> {opportunity.sector}<br />
        <b>Activity:</b> {opportunity.activity}<br />
        <b>Open Date:</b> {opportunity.openDate || "TBD"}<br />
        <b>Close Date:</b> {opportunity.closeDate || "TBD"}<br />
      </div>
      <h3>Requirements & Scope of Work</h3>
      <div style={{ marginBottom: 24 }}>
        {/* Placeholder for requirements/scope, could be expanded with real data */}
        <p>{opportunity.requirements || "Detailed requirements and scope of work will be shown here."}</p>
      </div>
      <h3>AI-Powered Key Content Extraction</h3>
      <div style={{ background: "#f7fafc", borderRadius: 8, padding: 20, marginBottom: 24, color: "#2563eb" }}>
        {aiSummary}
      </div>
      <a href={opportunity.link || "#"} target="_blank" rel="noopener noreferrer" style={{ background: "#2563eb", color: "#fff", padding: "12px 32px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 18, marginRight: 16 }}>View Official Opportunity</a>
      <button style={{ background: "#2563eb", color: "#fff", padding: "12px 32px", borderRadius: 8, fontWeight: 700, fontSize: 18, border: "none", cursor: "pointer" }} onClick={() => alert('Application flow coming soon!')}>Apply</button>
    </div>
  );
} 