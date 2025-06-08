import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email' });

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
    if (!tokenData.access_token) throw new Error('Failed to get Auth0 token');

    // Call Auth0 to send password reset email
    const resetRes = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/tickets/password-change`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        email,
        connection_id: undefined, // optional: can specify DB connection
      }),
    });
    if (!resetRes.ok) {
      const err = await resetRes.text();
      throw new Error(err);
    }
    return res.status(200).json({ success: true });
  } catch (e: any) {
    return res.status(500).json({ error: e.message || 'Failed to send reset email' });
  }
} 