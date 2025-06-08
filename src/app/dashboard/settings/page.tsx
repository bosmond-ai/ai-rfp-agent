"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useUser } from '@auth0/nextjs-auth0';

export default function SettingsPage() {
  const { user } = useUser();
  const [form, setForm] = useState({ name: "", email: "", address: "", phone: "", title: "" });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [pwStatus, setPwStatus] = useState<{ success?: string; error?: string }>({});

  useEffect(() => {
    // Fetch current user profile
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          setForm(f => ({
            ...f,
            name: data.name || "",
            email: data.email || "",
            address: data.address || "",
            phone: data.phone || "",
            title: data.title || "",
          }));
        }
      });
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          address: form.address,
          phone: form.phone,
          title: form.title,
        }),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    setPwStatus({});
    try {
      const res = await fetch("/api/auth/send-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      if (!res.ok) throw new Error("Failed to send password reset email");
      setPwStatus({ success: "Password reset email sent!" });
    } catch (e: unknown) {
      setPwStatus({ error: e instanceof Error ? e.message : "Failed to send password reset email" });
    }
  };

  const isDbUser = user?.sub?.startsWith('auth0|');
  const isSocialUser = user && !isDbUser;

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", my: 6, bgcolor: "#fff", borderRadius: 3, boxShadow: 2, p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, color: "#2563eb", fontWeight: 800 }}>Settings</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" value={form.name} onChange={e => handleChange("name", e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Email" value={form.email} onChange={e => handleChange("email", e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Title" value={form.title} onChange={e => handleChange("title", e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Phone Number" value={form.phone} onChange={e => handleChange("phone", e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Address" value={form.address} onChange={e => handleChange("address", e.target.value)} fullWidth sx={{ mb: 2 }} />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
        {success && <Typography sx={{ color: "#3bb273", mt: 2 }}>Settings saved!</Typography>}
        {error && <Typography sx={{ color: "#e53e3e", mt: 2 }}>{error}</Typography>}
      </form>
      <Box sx={{ mt: 4 }}>
        {isDbUser && (
          <>
            <Button variant="outlined" color="secondary" onClick={handlePasswordReset} sx={{ mt: 2 }}>
              Change Password
            </Button>
            {pwStatus.success && <Typography sx={{ color: "#3bb273", mt: 1 }}>{pwStatus.success}</Typography>}
            {pwStatus.error && <Typography sx={{ color: "#e53e3e", mt: 1 }}>{pwStatus.error}</Typography>}
          </>
        )}
        {isSocialUser && (
          <Typography sx={{ color: "#6b7280", mt: 2 }}>
            You signed in with a social provider (Google, Facebook, etc). To change your password, please visit your provider&apos;s account settings.
          </Typography>
        )}
      </Box>
    </Box>
  );
} 