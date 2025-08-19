import { NextResponse } from "next/server";
import { USERS_ADMIN_URLS } from "@/lib/end-points";

export async function POST(req) {
  const body = await req.json();
  const token = req.cookies.get("token")?.value;

  const res = await fetch(USERS_ADMIN_URLS.getAdmins, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Language: "1",
      Platform: "1",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
