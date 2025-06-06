import { getSession } from '@auth0/nextjs-auth0';
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession(req, res);
    console.log("Session:", session);
    if (!session?.user) {
      console.log("No user session found");
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "POST") {
      const { mission, tags } = req.body;
      console.log("POST body:", req.body);
      await prisma.user.upsert({
        where: { id: session.user.sub },
        update: { mission, tags },
        create: {
          id: session.user.sub,
          email: session.user.email,
          name: session.user.name,
          mission,
          tags,
        },
      });
      return res.status(200).json({ success: true });
    }

    if (req.method === "GET") {
      const user = await prisma.user.findUnique({
        where: { id: session.user.sub },
      });
      console.log("Fetched user:", user);
      return res.status(200).json(user);
    }

    // Test DB connectivity if ?testDb=1 is present
    if (req.method === 'GET' && req.query.testDb === '1') {
      try {
        // Try a simple query (list users, or count)
        const count = await prisma.user.count();
        return res.status(200).json({ db: 'ok', userCount: count });
      } catch (dbErr) {
        console.error('DB test error:', dbErr);
        return res.status(500).json({ db: 'error', details: dbErr instanceof Error ? dbErr.message : dbErr });
      }
    }

    res.status(405).end();
  } catch (error) {
    console.error("Error in /api/profile:", error);
    res.status(500).json({ error: "Internal Server Error", details: error instanceof Error ? error.message : error });
  }
}
