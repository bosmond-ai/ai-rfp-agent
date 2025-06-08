"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email && password && confirmPassword && password === confirmPassword && !loading;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f7f9fa", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Logo and Title */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Image src="/bosmond-logo.png" alt="Bosmond Logo" width={72} height={72} style={{ margin: "0 auto" }} />
        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: 1, mt: 2, color: "#183a4a" }}>Bosmond</Typography>
        <Typography variant="subtitle1" sx={{ color: "#2563eb", fontWeight: 700, letterSpacing: 2, mt: 0.5 }}>
          Making opportunity accessible, transparent, and achievable for all
        </Typography>
      </Box>
      {/* Signup Card */}
      <Box sx={{ width: 400, maxWidth: "90vw", bgcolor: "#fff", borderRadius: 3, boxShadow: 2, p: 4, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}>Sign up with Email</Typography>
        <Typography sx={{ color: "#6b7280", mb: 3, textAlign: "center" }}>Create your Bosmond account</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            type="email"
            required
          />
          <TextField
            label="Password"
            placeholder="Create a password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            type="password"
            required
          />
          <TextField
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            type="password"
            required
            error={!!confirmPassword && password !== confirmPassword}
            helperText={!!confirmPassword && password !== confirmPassword ? "Passwords do not match" : ""}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: isFormValid ? "#2563eb" : undefined, fontWeight: 700, fontSize: 18, py: 1.5, mb: 2, boxShadow: "none" }} disabled={!isFormValid}>
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : "Sign Up"}
          </Button>
        </form>
        {error && <Typography sx={{ color: "#e53e3e", mt: 1, textAlign: "center" }}>{error}</Typography>}
        {success && <Typography sx={{ color: "#3bb273", mt: 1, textAlign: "center" }}>Check your email to activate your account!</Typography>}
        <Typography sx={{ textAlign: "center", mt: 2 }}>
          <Link href="/login" style={{ color: "#5a6acb", fontWeight: 600, textDecoration: "none" }}>Already have an account?</Link>
        </Typography>
      </Box>
    </Box>
  );
} 