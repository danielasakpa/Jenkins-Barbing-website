import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth"; // Adjust the path to your auth options

const adminRoutes = ["/dashboard"];
const userOnlyRoutes = ["/bookings", "/appointment"];
const protectedRoutes = [...adminRoutes, "/bookings"];

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
      authorized: ({ token }) => !!token, // Require authentication for all protected routes
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
