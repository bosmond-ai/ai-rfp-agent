import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET() {
  const apiUrl ="https://hosting.portseattle.org/sopsapi/Solicitations?$orderby=SolicitationStatus/Name%20desc,BidDueDateTime%20desc&$skip=0&$count=true&$filter=DisplayFutureList%20eq%20false%20and%20(SolicitationStatus/Name%20eq%20%27Open%27%20or%20SolicitationStatus/Name%20eq%20%27Future%27)&$expand=SolicitationCategory($select=Name,Id),SolicitationStatus($select=Name,Id),%20%20%20%20Tags($expand=TagCategory($select=Name);$select=Name,Id)&$select=Id,ProcurementNumber,ProcurementTitle,Bid";
  const res = await fetch(apiUrl);
  const data = await res.json();

  // Map the data to a simpler structure for your frontend
  const rfps = data.value.map((item: any) => ({
    id: item.Id,
    number: item.ProcurementNumber,
    title: item.ProcurementTitle,
    status: item.SolicitationStatus?.Name,
    bidDueDate: item.BidDueDateTime,
    category: item.SolicitationCategory?.Name,
    link: `https://hosting.portseattle.org/sops/#/Solicitation/${item.Id}`,
  }));

  return NextResponse.json(rfps);
}
   // ... existing code to fetch or define `rfps` array ...

   rfps.sort((a, b) => a.number.localeCompare(b.number));

   return Response.json(rfps);
