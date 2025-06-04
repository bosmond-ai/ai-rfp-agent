import { getSession } from '@auth0/nextjs-auth0';
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "POST") {
    const { mission, tags } = req.body;
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
    return res.status(200).json(user);
  }

  res.status(405).end();
}
