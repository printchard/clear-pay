import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.cookies.set("clear-pay-callback-url", req.nextUrl.pathname, {
    httpOnly: true,
  });
  return res;
}
