// /middleware.ts
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const EMPLOYEE_IDS = [3, 4, 5, 6, 7, 8];

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const loginUrl = new URL("/login", req.url);
  const dashboardUrl = new URL("/dashboard", req.url);
  if (!token) return NextResponse.redirect(loginUrl);

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Only employees can access admin dashboard
    if (!EMPLOYEE_IDS.includes(payload.userId)) {
      return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/dashboard/admin/:path*"],
};
