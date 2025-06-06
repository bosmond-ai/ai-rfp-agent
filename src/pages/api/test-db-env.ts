import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json({ DATABASE_URL: process.env.DATABASE_URL });
} 