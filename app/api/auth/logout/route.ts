import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/owner-auth";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/en", request.url));
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: new URL(request.url).protocol === "https:",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
