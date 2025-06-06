import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  try {
    // Try a simple query: count users (change 'user' to your actual model name if needed)
    const count = await prisma.user.count();
    res.status(200).json({ userCount: count });
  } catch (error) {
    console.error('Test DB error:', error);
    res.status(500).json({ error: error.message });
  }
} 