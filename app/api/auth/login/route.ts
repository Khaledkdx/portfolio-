import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createAdminSession,
  safeReturnPath,
  verifyAdminCredentials,
} from "@/lib/owner-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
    returnTo?: string;
  };
  if (
    !(await verifyAdminCredentials(
      String(body.email ?? ""),
      String(body.password ?? ""),
    ))
  ) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 },
    );
  }

  const session = await createAdminSession();
  const response = NextResponse.json({
    ok: true,
    returnTo: safeReturnPath(body.returnTo),
  });
  response.cookies.set(ADMIN_COOKIE, session.token, {
    httpOnly: true,
    secure: new URL(request.url).protocol === "https:",
    sameSite: "strict",
    path: "/",
    expires: session.expires,
  });
  return response;
}
