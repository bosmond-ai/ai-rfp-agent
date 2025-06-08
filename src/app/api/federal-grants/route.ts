import { NextRequest, NextResponse } from 'next/server';

const GRANTS_API_URL = 'https://api.grants.gov/v1/api/search2';
const LOCAL_KEYWORDS = [
  'Washington', 'Seattle', 'Tacoma', 'Olympia', 'Pierce County', 'King County',
  'Pacific Northwest', 'Spokane', 'Everett', 'Bellevue', 'Thurston County', 'Snohomish County'
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('keyword') || '';
  const eligibility = searchParams.get('eligibility') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const rows = 20;
  const startRecordNum = (page - 1) * rows;

  // Build the search keyword string
  let searchKeyword = LOCAL_KEYWORDS.join(' OR ');
  if (keyword) {
    searchKeyword = `${keyword} OR ${searchKeyword}`;
  }

  // Build the POST body for Grants.gov API (v1)
  const body: unknown = {
    startRecordNum,
    rows,
    sortBy: '',
    oppStatuses: 'forecasted|posted',
    keyword: searchKeyword,
  };

  // Eligibility filtering (e.g., 'nonprofit', 'company')
  if (eligibility) {
    body.eligibilities = eligibility;
  }

  try {
    const response = await fetch(GRANTS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch grants' }, { status: 500 });
    }
    const data = await response.json();
    // Return oppHits and hitCount for pagination
    return NextResponse.json({
      grants: data.data?.oppHits || [],
      hitCount: data.data?.hitCount || 0,
      page,
      rows
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching grants', details: error }, { status: 500 });
  }
} 