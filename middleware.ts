import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.set("clear-pay-callback-url", req.nextUrl.pathname);
  return NextResponse.next({ headers });
}
