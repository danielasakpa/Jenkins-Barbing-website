import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth";

const adminRoutes = ["/dashboard"];
const userOnlyRoutes = ["/bookings"];
const protectedRoutes = [...adminRoutes, "/bookings"];
const publicRoutes = ["/", "/appointment", "/gallery", "/contact"];

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const isAdmin = req.nextauth.token?.isAdmin;

    // Admin access check
    if (adminRoutes.some((route) => pathname.startsWith(route)) && !isAdmin) {
      return NextResponse.rewrite(new URL("/", req.url));
    }

    // User-only access check (redirect admins)
    if (userOnlyRoutes.some((route) => pathname.startsWith(route)) && isAdmin) {
      return NextResponse.rewrite(new URL("/", req.url));
    }

    // Allow access for other cases
    return NextResponse.next();
  },
  {
    ...authConfig,
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        // Allow access to public routes
        if (publicRoutes.some((route) => pathname.startsWith(route))) {
          return true;
        }
        // Require authentication for protected routes
        return !!token;
      },
    },
    pages: {
      signIn: "/sign-in",
      signOut: "/sign-out",
      error: "/error",
    },
  }
);

export const config = {
  matcher: protectedRoutes.map((route) => `${route}/:path*`),
};
