"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const ORG_FIELDS = [
  { name: "name", label: "Organization Name", required: true },
  { name: "website", label: "Website", required: true },
  { name: "email", label: "Email", required: true },
  { name: "phone", label: "Phone" },
  { name: "address", label: "Address", required: true },
  { name: "city", label: "City" },
  { name: "state", label: "State" },
  { name: "zip", label: "ZIP" },
  { name: "country", label: "Country" },
  { name: "ein", label: "EIN", required: true },
  { name: "description", label: "Description", multiline: true },
  { name: "mission", label: "Mission Statement", multiline: true, required: true },
  { name: "foundedYear", label: "Founded Year", type: "number" },
  { name: "orgType", label: "Organization Type" },
  { name: "size", label: "Organization Size" },
  { name: "linkedinUrl", label: "LinkedIn URL" },
  { name: "logoUrl", label: "Logo URL" },
  { name: "boardMembers", label: "Board Members (comma separated)" },
  { name: "keyPeople", label: "Key People (comma separated)" },
  { name: "financials", label: "Financials (JSON)" },
  { name: "tags", label: "Tags (comma separated)" },
];

export default function EditOrganizationPage() {
  const router = useRouter();
  const [org, setOrg] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch org data (replace with real API call)
    fetch("/api/organization")
      .then(res => res.json())
      .then(data => {
        setOrg(data || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (field: string, value: any) => {
    setOrg((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/organization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(org),
      });
      if (!res.ok) throw new Error("Failed to save organization profile");
      setSuccess(true);
      setTimeout(() => router.push("/dashboard/profile"), 1200);
    } catch (e: any) {
      setError(e.message || "Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", my: 6, bgcolor: "#fff", borderRadius: 3, boxShadow: 2, p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, color: "#2563eb", fontWeight: 800 }}>Edit Organization Profile</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {ORG_FIELDS.map(field => (
            <Grid item xs={12} sm={field.multiline ? 12 : 6} key={field.name}>
              <TextField
                label={field.label}
                value={org[field.name] || ""}
                onChange={e => handleChange(field.name, e.target.value)}
                fullWidth
                required={!!field.required}
                multiline={!!field.multiline}
                minRows={field.multiline ? 3 : undefined}
                type={field.type || "text"}
              />
            </Grid>
          ))}
        </Grid>
        {error && <Typography sx={{ color: "#e53e3e", mt: 2 }}>{error}</Typography>}
        {success && <Typography sx={{ color: "#3bb273", mt: 2 }}>Profile saved!</Typography>}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, fontWeight: 700 }} disabled={saving}>
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </Box>
  );
} 