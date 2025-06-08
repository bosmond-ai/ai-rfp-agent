import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, frequency } = await req.json();
  // TODO: Integrate with Mailchimp API
  console.log('Newsletter signup:', { email, frequency });
  return NextResponse.json({ success: true });
} 