// src/app/api/rfps/port-of-seattle/route.ts
import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET() {
  // Replace with the actual API endpoint you find in DevTools
  const apiUrl = "https://hosting.portseattle.org/sops/api/solicitations";
  const res = await fetch(apiUrl);
  const data = await res.json();

  // Optionally, map/filter the data to only include fields you want
  const rfps = data.map((item: any) => ({
    id: item.id,
    title: item.title,
    status: item.status,
    dueDate: item.dueDate,
    link: `https://hosting.portseattle.org/sops/#/Solicitation/${item.id}`,
    // ...add more fields as needed
  }));

  return NextResponse.json(rfps);
}
