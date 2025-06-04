import { NextResponse } from "next/server";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function GET() {
  // Example: Replace with the actual URL you want to scrape
  const url = "https://ofm.wa.gov/funding/grants";
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  // Example: Adjust selectors to match the actual page structure
  const grants: unknown[] = [];
  $("table tbody tr").each((_, el) => {
    const tds = $(el).find("td");
    grants.push({
      title: $(tds[0]).text().trim(),
      agency: $(tds[1]).text().trim(),
      deadline: $(tds[2]).text().trim(),
      link: $(tds[0]).find("a").attr("href"),
    });
  });

  return NextResponse.json(grants);
}
