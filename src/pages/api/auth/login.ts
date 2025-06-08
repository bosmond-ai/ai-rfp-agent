import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

  try {
    // Auth0 Resource Owner Password Grant
    const tokenRes = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'password',
        username: email,
        password,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        scope: 'openid profile email',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
      }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) {
      return res.status(401).json({ error: tokenData.error_description || tokenData.error || 'Invalid credentials' });
    }
    // Optionally, set a session cookie here (for now, just return success)
    // In production, use secure cookies and proper session management
    return res.status(200).json({ success: true, access_token: tokenData.access_token, id_token: tokenData.id_token });
  } catch (e: unknown) {
    console.error(e);
    return res.status(500).json({ error: e instanceof Error ? e.message : 'Login failed' });
  }
} 