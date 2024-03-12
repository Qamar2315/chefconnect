import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    if (req.nextUrl.pathname.startsWith('/api/recipes')) {
      if (req.method === 'GET') {
        return NextResponse.next();
      }
      if (req.method == 'POST' || req.method == 'PUT' || req.method == 'DELETE') {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        !!token
      },
    },
  }
);

export const config = {
  matcher: [
    "/api/:path*"
  ]
};