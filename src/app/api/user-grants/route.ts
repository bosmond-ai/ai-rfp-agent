import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const GRANTS_API_URL = 'https://api.grants.gov/v1/api/fetchOpportunity';

export async function POST(req: NextRequest) {
  // Get user session
  // Note: NextRequest is not compatible with getSession directly; use cookies if needed
  // For demonstration, assume userId is sent in body (replace with real session logic in production)
  const { grantId, userId } = await req.json();
  if (!userId || !grantId) {
    return NextResponse.json({ error: 'Missing userId or grantId' }, { status: 400 });
  }

  // Fetch full grant details from Grants.gov
  let details;
  let title = '';
  let agency = '';
  let openDate = null;
  let closeDate = null;
  try {
    const res = await fetch(GRANTS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ opportunityId: grantId }),
    });
    if (!res.ok) throw new Error('Failed to fetch grant details');
    const data = await res.json();
    details = data.data || {};
    title = details.opportunityTitle || '';
    agency = details.agencyName || '';
    openDate = details.openDate ? new Date(details.openDate) : null;
    closeDate = details.closeDate ? new Date(details.closeDate) : null;
  } catch {
    return NextResponse.json({ error: 'Failed to fetch grant details' }, { status: 500 });
  }

  // Save to UserGrant table
  try {
    await prisma.userGrant.create({
      data: {
        userId,
        grantId,
        title,
        agency,
        openDate,
        closeDate,
        details,
      },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save grant' }, { status: 500 });
  }
} 