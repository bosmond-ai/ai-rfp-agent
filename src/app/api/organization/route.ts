import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// For demo: get userId from query or body (replace with session logic in production)
function getUserId(req: NextRequest) {
  if (req.method === 'GET') {
    return req.nextUrl.searchParams.get('userId');
  } else {
    // POST
    return undefined; // We'll get from body
  }
}

export async function GET(req: NextRequest) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  // Find the user's org (assume user has organizationId field)
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.organizationId) return NextResponse.json({});
  const org = await prisma.organization.findUnique({ where: { id: user.organizationId } });
  return NextResponse.json(org || {});
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // For demo: require org id or userId in body
  const { id, userId, ...orgData } = body;
  let org;
  if (id) {
    // Update existing org
    org = await prisma.organization.update({ where: { id }, data: orgData });
  } else if (userId) {
    // Create new org and link to user
    org = await prisma.organization.create({ data: orgData });
    await prisma.user.update({ where: { id: userId }, data: { organizationId: org.id } });
  } else {
    return NextResponse.json({ error: 'Missing org id or userId' }, { status: 400 });
  }
  return NextResponse.json(org);
} 