"use client";

const grantTypeResources = [
  {
    type: "Education & Youth",
    color: "#2563eb",
    links: [
      { label: "Best Starts for Kids (King County)", url: "https://beststartsblog.com/funding/" },
      { label: "Grants.gov (Federal Grants)", url: "https://www.grants.gov/" },
    ],
  },
  {
    type: "Arts & Culture",
    color: "#a259e6",
    links: [
      { label: "King County 4Culture Grants", url: "https://www.4culture.org/grants/" },
      { label: "Seattle Office of Arts & Culture", url: "https://www.seattle.gov/arts/programs/grants" },
    ],
  },
  {
    type: "Seniors & Aging",
    color: "#eab308",
    links: [
      { label: "King County Community Services Grants", url: "https://kingcounty.gov/depts/community-human-services/grants.aspx" },
    ],
  },
  {
    type: "Health & Wellness",
    color: "#3bb273",
    links: [
      { label: "Seattle Foundation Current Grant Opportunities", url: "https://www.seattlefoundation.org/current-grant-opportunities/" },
    ],
  },
  {
    type: "Environment & Sustainability",
    color: "#10b981",
    links: [
      { label: "Washington State Department of Commerce Grants", url: "https://www.commerce.wa.gov/open-grants-loans/" },
    ],
  },
  {
    type: "Small Business & Entrepreneurship",
    color: "#f97316",
    links: [
      { label: "Seattle Office of Economic Development Grants", url: "https://www.seattle.gov/economic-development/grants-and-funding" },
      { label: "SBA Federal Contracting", url: "https://www.sba.gov/federal-contracting" },
      { label: "Washington PTAC (Procurement Technical Assistance Center)", url: "https://www.washingtonptac.org/" },
    ],
  },
  {
    type: "Community Development",
    color: "#f43f5e",
    links: [
      { label: "Seattle Grants and Funding Portal", url: "https://www.seattle.gov/grants-and-funding" },
      { label: "Philanthropy Northwest Grant Opportunities", url: "https://philanthropynw.org/resources/grant-opportunities" },
    ],
  },
  {
    type: "Diversity & Inclusion",
    color: "#6366f1",
    links: [
      { label: "WA OMWBE Certification (Minority/Women-Owned)", url: "https://omwbe.wa.gov/certification" },
    ],
  },
  {
    type: "General / Multi-sector",
    color: "#64748b",
    links: [
      { label: "King County Vendor & Contracting Opportunities", url: "https://kingcounty.gov/depts/finance-business-operations/procurement/for-business.aspx" },
      { label: "City of Seattle Contracting Opportunities", url: "https://www.seattle.gov/contracting" },
    ],
  },
];

const localAuthorities = [
  { label: "King County Government", url: "https://kingcounty.gov/" },
  { label: "City of Seattle", url: "https://www.seattle.gov/" },
  { label: "Snohomish County", url: "https://www.snohomishcountywa.gov/" },
  { label: "City of Bellevue", url: "https://www.bellevuewa.gov/" },
  { label: "City of Redmond", url: "https://www.redmond.gov/" },
  { label: "WA City & Town Profiles (MRSC)", url: "https://mrsc.org/Home/Research-Tools/Washington-City-and-Town-Profiles.aspx" },
];

export default function Resources() {
  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", padding: 40, fontFamily: 'Inter, sans-serif', color: '#183a4a' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 32, color: '#2563eb' }}>Grant Resources by Type</h1>
      {grantTypeResources.map(({ type, color, links }) => (
        <section key={type} style={{ marginBottom: 36 }}>
          <h2 style={{ color, fontSize: 24, fontWeight: 700, marginBottom: 16 }}>{type}</h2>
          <ul style={{ fontSize: 18, marginLeft: 24 }}>
            {links.map(link => (
              <li key={link.url} style={{ marginBottom: 8 }}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: color, textDecoration: 'underline' }}>{link.label}</a>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ color: '#3bb273', fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Local Authorities</h2>
        <ul style={{ fontSize: 18, marginLeft: 24 }}>
          {localAuthorities.map(link => (
            <li key={link.url} style={{ marginBottom: 8 }}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>{link.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
} 