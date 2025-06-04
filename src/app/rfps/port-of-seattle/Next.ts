// src/app/api/rfps/port-of-seattle/route.ts
import { NextResponse } from "next/server";
import fetch from "node-fetch";

interface RFPItem {
  id: string;
  title: string;
  status: string;
  dueDate: string;
}

export async function GET() {
  // Replace with the actual API endpoint you find in DevTools
  const apiUrl = "https://hosting.portseattle.org/sops/api/solicitations";
  const res = await fetch(apiUrl);
  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("Expected data to be an array");
  }

  // Optionally, map/filter the data to only include fields you want
  const rfps = (data as unknown[]).map((item: unknown) => {
    const rfp = item as RFPItem;
    return {
      id: rfp.id,
      title: rfp.title,
      status: rfp.status,
      dueDate: rfp.dueDate,
      link: `https://hosting.portseattle.org/sops/#/Solicitation/${rfp.id}`,
      // ...add more fields as needed
    };
  });

  return NextResponse.json(rfps);
}
