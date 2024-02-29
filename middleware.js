import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token.role != "admin"
    ) {
      return NextResponse.rewrite(new URL("/not-authorized", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/api/users") &&
      req.nextauth.token.role != "admin"
    ) {
      return NextResponse.rewrite(new URL("/not-authorized", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin",
    "/api/users",
    "/api/recipes",
    "/api/recipes/:path*"
  ]
};