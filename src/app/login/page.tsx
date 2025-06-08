"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      // On success, redirect to dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email && password && !loading;

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
      {/* Login Card */}
      <Box sx={{ width: 400, maxWidth: "90vw", bgcolor: "#fff", borderRadius: 3, boxShadow: 2, p: 4, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}>Log in to Bosmond</Typography>
        <Typography sx={{ color: "#6b7280", mb: 3, textAlign: "center" }}>Enter your email and password</Typography>
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
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            type="password"
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: isFormValid ? "#2563eb" : undefined, fontWeight: 700, fontSize: 18, py: 1.5, mb: 2, boxShadow: "none" }} disabled={!isFormValid}>
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : "Log In"}
          </Button>
        </form>
        {error && <Typography sx={{ color: "#e53e3e", mt: 1, textAlign: "center" }}>{error}</Typography>}
        <Typography sx={{ textAlign: "center", mt: 2 }}>
          <Link href="/signup" style={{ color: "#5a6acb", fontWeight: 600, textDecoration: "none" }}>Don&apos;t have an account? Sign up</Link>
        </Typography>
      </Box>
    </Box>
  );
} 