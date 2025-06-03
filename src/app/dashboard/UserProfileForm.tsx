"use client";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0";

const ORG_TYPES = [
  "Nonprofit",
  "Business",
  "Government",
  "Individual",
  "Other",
];
const BUDGETS = [
  "< $100k",
  "$100k–$500k",
  "$500k–$1M",
  "$1M+",
];
const FOCUS_AREAS = [
  "Education",
  "Health",
  "Environment",
  "Arts & Culture",
  "Social Services",
  "Technology",
  "Other",
];
const HEAR_ABOUT = [
  "Web search",
  "Referral",
  "Social media",
  "Event/Conference",
  "Other",
];
const TOTAL_STEPS = 3;

interface UserProfile {
  name?: string;
  orgType?: string;
  location?: string;
  website?: string;
  budget?: string;
  employees?: string;
  focusAreas?: string[];
  focusOther?: string;
  mission?: string;
  tags?: string[];
  priorities?: string;
  hearAbout?: string;
  hearOther?: string;
  alerts?: boolean;
  avatar?: string; // base64 string
}

interface UserProfileFormProps {
  initialProfile: UserProfile;
}

function Stepper({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 32 }}>
      {[1, 2, 3].map((s) => (
        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", background: step === s ? "#2563eb" : "#e0e7ef",
            color: step === s ? "#fff" : "#183a4a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18
          }}>{s}</div>
          <div style={{ fontSize: 13, marginTop: 4, color: step === s ? "#2563eb" : "#6b7280" }}>
            {s === 1 ? "Info" : s === 2 ? "Focus" : "More"}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function UserProfileForm({ initialProfile }: UserProfileFormProps) {
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({ ...initialProfile });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [completed, setCompleted] = useState(false);
  const [unsaved, setUnsaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("bosmond_profile_draft");
    if (saved) setProfile((p) => ({ ...p, ...JSON.parse(saved) }));
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    if (!completed) {
      localStorage.setItem("bosmond_profile_draft", JSON.stringify(profile));
      setUnsaved(true);
    }
  }, [profile, completed]);

  // Warn on unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (unsaved) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes.";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [unsaved]);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (step === 1) {
      if (!profile.name) errs.name = "Name is required.";
      if (!profile.orgType) errs.orgType = "Organization type is required.";
      if (!profile.location) errs.location = "Location is required.";
    }
    if (step === 2) {
      if (!profile.focusAreas || !profile.focusAreas.length) errs.focusAreas = "Select at least one focus area.";
      if (!profile.mission) errs.mission = "Mission statement is required.";
    }
    return errs;
  };

  const handleChange = (field: keyof UserProfile, value: any) => {
    setProfile((p) => ({ ...p, [field]: value }));
  };

  const handleFocusAreaChange = (area: string) => {
    const arr = profile.focusAreas || [];
    if (arr.includes(area)) {
      handleChange("focusAreas", arr.filter((a) => a !== area));
    } else {
      handleChange("focusAreas", [...arr, area]);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        handleChange("avatar", ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSaving(true);
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...profile,
        tags: profile.tags ? profile.tags.map((t) => t.trim()) : [],
        focusAreas: profile.focusAreas?.includes("Other") && profile.focusOther ? [...(profile.focusAreas?.filter(f => f !== "Other") || []), profile.focusOther] : profile.focusAreas,
        hearAbout: profile.hearAbout === "Other" ? profile.hearOther : profile.hearAbout,
      }),
    });
    setSaving(false);
    setCompleted(true);
    setUnsaved(false);
    localStorage.removeItem("bosmond_profile_draft");
  };

  if (!user) return <div>Loading...</div>;
  if (completed) {
    return (
      <div style={{ maxWidth: 500, margin: "3rem auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", padding: 40, textAlign: "center" }}>
        <h2>Welcome, {profile.name || user.name || user.email}!</h2>
        <div style={{ margin: "24px 0" }}>
          <img src={profile.avatar || "/default-avatar.png"} alt="Profile" style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover", marginBottom: 16 }} />
          <div style={{ fontSize: 18, color: "#2563eb", fontWeight: 600 }}>Your profile is set up.</div>
        </div>
        <div style={{ fontSize: 16, marginBottom: 24 }}>Start exploring grant opportunities tailored to your mission and interests!</div>
        <a href="/dashboard" style={{ background: "#2563eb", color: "#fff", padding: "12px 32px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 18 }}>Go to Dashboard</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "2rem auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", padding: 32 }}>
      <Stepper step={step} />
      {/* Step 1: Organization Info */}
      {step === 1 && (
        <>
          <h3>Organization/Individual Information</h3>
          <div style={{ marginBottom: 16, textAlign: "center" }}>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            <div style={{ display: "inline-block", cursor: "pointer" }} onClick={() => fileInputRef.current?.click()}>
              <img
                src={profile.avatar || "/default-avatar.png"}
                alt="Avatar"
                style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "2px solid #e0e7ef" }}
              />
              <div style={{ fontSize: 13, color: "#2563eb", marginTop: 8 }}>Upload Logo/Avatar</div>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Name<span style={{ color: "#e53e3e" }}>*</span></label>
            <input type="text" value={profile.name || ""} onChange={e => handleChange("name", e.target.value)} style={{ width: "100%" }} />
            {errors["name"] && <div style={{ color: "#e53e3e" }}>{errors["name"]}</div>}
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Organization Type<span style={{ color: "#e53e3e" }}>*</span></label>
            <select value={profile.orgType || ""} onChange={e => handleChange("orgType", e.target.value)} style={{ width: "100%" }}>
              <option value="">Select type</option>
              {ORG_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
            {errors["orgType"] && <div style={{ color: "#e53e3e" }}>{errors["orgType"]}</div>}
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Location (City, State)<span style={{ color: "#e53e3e" }}>*</span></label>
            <input type="text" value={profile.location || ""} onChange={e => handleChange("location", e.target.value)} style={{ width: "100%" }} />
            {errors["location"] && <div style={{ color: "#e53e3e" }}>{errors["location"]}</div>}
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Website <span style={{ color: "#6b7280", fontWeight: 400 }}>(optional)</span></label>
            <input type="url" value={profile.website || ""} onChange={e => handleChange("website", e.target.value)} style={{ width: "100%" }} placeholder="https://yourorg.org" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Annual Budget <span style={{ color: "#6b7280", fontWeight: 400 }}>(optional)</span></label>
            <select value={profile.budget || ""} onChange={e => handleChange("budget", e.target.value)} style={{ width: "100%" }}>
              <option value="">Select budget</option>
              {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Number of Employees/Volunteers <span style={{ color: "#6b7280", fontWeight: 400 }}>(optional)</span></label>
            <input type="number" min={0} value={profile.employees || ""} onChange={e => handleChange("employees", e.target.value)} style={{ width: "100%" }} />
          </div>
        </>
      )}
      {/* Step 2: Focus & Interests */}
      {step === 2 && (
        <>
          <h3>Focus & Interests</h3>
          <div style={{ marginBottom: 16 }}>
            <label>Primary Focus Area(s)<span style={{ color: "#e53e3e" }}>*</span></label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
              {FOCUS_AREAS.map(area => (
                <label key={area} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <input
                    type="checkbox"
                    checked={profile.focusAreas?.includes(area) || false}
                    onChange={() => handleFocusAreaChange(area)}
                  />
                  {area}
                </label>
              ))}
            </div>
            {profile.focusAreas?.includes("Other") && (
              <input type="text" value={profile.focusOther || ""} onChange={e => handleChange("focusOther", e.target.value)} style={{ width: "100%", marginTop: 8 }} placeholder="Please specify" />
            )}
            {errors["focusAreas"] && <div style={{ color: "#e53e3e" }}>{errors["focusAreas"]}</div>}
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Mission Statement<span style={{ color: "#e53e3e" }}>*</span></label>
            <textarea value={profile.mission || ""} onChange={e => handleChange("mission", e.target.value)} rows={4} style={{ width: "100%" }} />
            {errors["mission"] && <div style={{ color: "#e53e3e" }}>{errors["mission"]}</div>}
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Interests/Tags <span style={{ color: "#6b7280", fontWeight: 400 }}>(comma separated, optional)</span></label>
            <input type="text" value={profile.tags?.join(", ") || ""} onChange={e => handleChange("tags", e.target.value.split(","))} style={{ width: "100%" }} placeholder="e.g. climate, youth, STEM" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Top Funding Priorities This Year <span style={{ color: "#6b7280", fontWeight: 400 }}>(optional)</span></label>
            <textarea value={profile.priorities || ""} onChange={e => handleChange("priorities", e.target.value)} rows={3} style={{ width: "100%" }} />
          </div>
        </>
      )}
      {/* Step 3: Additional Info */}
      {step === 3 && (
        <>
          <h3>Additional Information</h3>
          <div style={{ marginBottom: 16 }}>
            <label>How did you hear about BOSMOND?</label>
            <select value={profile.hearAbout || ""} onChange={e => handleChange("hearAbout", e.target.value)} style={{ width: "100%" }}>
              <option value="">Select</option>
              {HEAR_ABOUT.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
            {profile.hearAbout === "Other" && (
              <input type="text" value={profile.hearOther || ""} onChange={e => handleChange("hearOther", e.target.value)} style={{ width: "100%", marginTop: 8 }} placeholder="Please specify" />
            )}
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={profile.alerts || false} onChange={e => handleChange("alerts", e.target.checked)} />
              I would like to receive grant alerts and updates
            </label>
          </div>
        </>
      )}
      {/* Stepper Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
        {step > 1 && (
          <button type="button" onClick={() => setStep(step - 1)} style={{ background: "#e0e7ef", color: "#183a4a", fontWeight: 600, border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 16, cursor: "pointer" }}>Back</button>
        )}
        {step < TOTAL_STEPS && (
          <button type="button" onClick={() => {
            const errs = validate();
            setErrors(errs);
            if (Object.keys(errs).length === 0) setStep(step + 1);
          }} style={{ background: "#2563eb", color: "#fff", fontWeight: 700, border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 16, cursor: "pointer", marginLeft: "auto" }}>Next</button>
        )}
        {step === TOTAL_STEPS && (
          <button type="submit" disabled={saving} style={{ background: "#2563eb", color: "#fff", fontWeight: 700, border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 16, cursor: "pointer", marginLeft: "auto" }}>
            {saving ? "Saving..." : "Save Profile"}
          </button>
        )}
      </div>
      <div style={{ marginTop: 16, textAlign: "right", fontSize: 13, color: unsaved ? "#e53e3e" : "#3bb273" }}>
        {unsaved ? "Unsaved changes" : "All changes saved"}
      </div>
    </form>
  );
}
