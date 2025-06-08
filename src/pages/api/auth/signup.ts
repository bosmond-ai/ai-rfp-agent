import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

  try {
    // Get Auth0 Management API token
    const tokenRes = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) {
      // DEBUG: Print Auth0 token error for troubleshooting. Remove before production.
      console.error('Auth0 token error:', tokenData);
      throw new Error(tokenData.error_description || tokenData.error || 'Failed to get Auth0 token');
    }
    if (!tokenData.access_token) throw new Error('Failed to get Auth0 token');

    // Create user in Auth0
    const createRes = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify({
        email,
        password,
        connection: 'Username-Password-Authentication',
        email_verified: false,
        verify_email: true,
      }),
    });
    const createData = await createRes.json();
    if (!createRes.ok) throw new Error(createData.message || 'Signup failed');
    return res.status(200).json({ success: true });
  } catch (e: unknown) {
    console.error(e);
    return res.status(500).json({ error: e instanceof Error ? e.message : 'Signup failed' });
  }
} 