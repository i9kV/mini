import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // ❌ ไม่มี token → เด้งออก
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

    const { payload } = await jwtVerify(token, secret);

    const role = payload.role as string;

    console.log("ROLE:", role);

    // ถ้าเข้า /admin แต่ไม่ใช่ admin → เด้ง
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*"],
};
