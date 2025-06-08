"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <Box sx={{ maxWidth: 700, mx: "auto", my: 6, bgcolor: "#fff", borderRadius: 3, boxShadow: 2, p: 4 }}>
      <Typography variant="h3" sx={{ color: "#2563eb", fontWeight: 900, mb: 2 }}>Cookie Policy</Typography>
      <Typography sx={{ mb: 2, color: '#183a4a', fontSize: 18 }}>
        Bosmond uses cookies and similar technologies to enhance your experience, analyze site usage, and assist in our marketing efforts. This page explains what cookies are, how we use them, and your choices regarding cookies.
      </Typography>
      <Typography variant="h5" sx={{ mt: 3, mb: 1, color: '#2563eb', fontWeight: 700 }}>What are cookies?</Typography>
      <Typography sx={{ mb: 2 }}>
        Cookies are small text files stored on your device by your browser. They help websites remember your preferences, login status, and other information to improve your experience.
      </Typography>
      <Typography variant="h5" sx={{ mt: 3, mb: 1, color: '#2563eb', fontWeight: 700 }}>How does Bosmond use cookies?</Typography>
      <ul style={{ marginLeft: 24, color: '#183a4a', fontSize: 17 }}>
        <li>To keep you logged in and remember your preferences</li>
        <li>To analyze site traffic and usage patterns</li>
        <li>To support marketing and customer service efforts</li>
        <li>To improve our website and services</li>
      </ul>
      <Typography variant="h5" sx={{ mt: 3, mb: 1, color: '#2563eb', fontWeight: 700 }}>Your choices</Typography>
      <Typography sx={{ mb: 2 }}>
        You can manage your cookie preferences at any time using your browser settings or our <Link href="/cookie-preferences" style={{ color: '#2563eb', textDecoration: 'underline' }}>Cookie Preferences</Link> page. Please note that disabling cookies may affect your experience on our site.
      </Typography>
      <Typography sx={{ mt: 4, color: '#6b7280', fontSize: 16 }}>
        For more information, see our <Link href="/privacy" style={{ color: '#2563eb', textDecoration: 'underline' }}>Privacy Notice</Link> and <Link href="/terms" style={{ color: '#2563eb', textDecoration: 'underline' }}>Terms of Service</Link>.
      </Typography>
    </Box>
  );
} 