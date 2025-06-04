import { NextResponse } from "next/server";
import fetch from "node-fetch";

type RFPItem = {
  Id: string;
  ProcurementNumber: string;
  Title: string;
  Status: string;
  CloseDate: string;
  Description: string;
};

export async function GET() {
  const apiUrl = "https://hosting.portseattle.org/sopsapi/Solicitations?$orderby=SolicitationStatus/Name%20desc,BidDueDateTime%20desc&$skip=0&$count=true&$filter=DisplayFutureList%20eq%20false%20and%20(SolicitationStatus/Name%20eq%20%27Open%27%20or%20SolicitationStatus/Name%20eq%20%27Future%27)&$expand=SolicitationCategory($select=Name,Id),SolicitationStatus($select=Name,Id),%20%20%20%20Tags($expand=TagCategory($select=Name);$select=Name,Id)&$select=Id,ProcurementNumber,ProcurementTitle";
  const res = await fetch(apiUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
      "Accept": "application/json, text/plain, */*",
      "Referer": "https://hosting.portseattle.org/sops/",
      "Origin": "https://hosting.portseattle.org",
    },
  });
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Response text:", text.slice(0, 500)); // Print first 500 chars for debugging

  try {
    const data = JSON.parse(text);
    if (!data.value || !Array.isArray(data.value)) {
      return NextResponse.json({ error: "No data returned from Port of Seattle API" }, { status: 500 });
    }
    const rfps = data.value.map((item: unknown) => {
      const rfp = item as RFPItem;
      return {
        id: rfp.Id,
        number: rfp.ProcurementNumber,
        title: rfp.Title,
        status: rfp.Status,
        closeDate: rfp.CloseDate,
        description: rfp.Description,
      };
    });
    return NextResponse.json(rfps);
  } catch (e) {
    return NextResponse.json({ error: "Response was not JSON", details: text.slice(0, 500) }, { status: 500 });
  }
}
