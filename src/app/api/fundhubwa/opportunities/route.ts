export const runtime = "nodejs";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const payload = new URLSearchParams({
      action: "wa_funding_results",
      paged: "1",
      nonce: "3b9792de8c", // update if needed
    });

    const { data } = await axios.post(
      "https://fundhub.wa.gov/wp-admin/admin-ajax.php",
      payload.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Referer": "https://fundhub.wa.gov/funding-opportunities/",
          "Origin": "https://fundhub.wa.gov",
          "X-Requested-With": "XMLHttpRequest"
        }
      }
    );

    // Just return the data as-is
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching FundHubWA opportunities:", error);
    return NextResponse.json({ error: "Failed to fetch opportunities" }, { status: 500 });
  }
}
