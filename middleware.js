import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import isRecipeAuthor from "@middleware/isRecipeAuthor";

export default withAuth(
  async function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/api/recipes")) {
      if (req.method == "DELETE" && req.nextUrl.pathname.includes("/reviews")) {
        const isAuthorized =
          req?.nextauth?.token?.user_id ===
          req.nextUrl.searchParams.get("author_id");
        // console.log(isAuthorized);
        if (isAuthorized) {
          return NextResponse.next();
        } else {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }
        // Allow deletion of any recipe by the author of recipe
        // const isAuthorized = false;
      }
      if (req.method == "PUT") {
        const data = await req.json();
        const isAuthotrized = isRecipeAuthor(
          data?.author,
          req?.nextauth?.token?.user_id
        );
        if (isAuthotrized) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/not-authorized", req.url));
        }
      }
      if (req.method == "DELETE") {
        // Allow deletion of any recipe by the author of recipe
        const isAuthorized =
          req?.nextauth?.token?.user_id ===
          req.nextUrl.searchParams.get("author_id");
        // const isAuthorized = false;
        if (isAuthorized) {
          return NextResponse.next();
        } else {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }
      }
    } else if (req.nextUrl.pathname.startsWith("/api/users")) {
      if (req.method == "PUT") {
        const data = await req.json();
        const isAuthotrized = data?.email === req?.nextauth?.token?.email;
        if (isAuthotrized) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/not-authorized", req.url));
        }
      } else {
        return NextResponse.next();
      }
    } else {
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/api/:path*"],
};
