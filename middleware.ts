import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const PublicRoutes = ["/", "/auth/signIn", "/auth/signUp"];
  const UserRoutes = ["/createNotes", "/deleteNote", "/notes"];
  const AdminRoutes = ["/admin"];
  // const isPublicPath = path === "/auth/signIn" || path === "/auth/signUp";
  const token = request.cookies.get("token")?.value || "";
  const role = request.cookies.get("role")?.value || "";

  if (PublicRoutes.includes(path) && token) {
    if (role === "user") {
      return NextResponse.redirect(new URL("/notes", request.url));
    }
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }
  if (role === "user" && token && AdminRoutes.includes(path)) {
    return NextResponse.redirect(new URL("notAuthorize", request.url));
  }
  if (role === "admin" && token && UserRoutes.includes(path)) {
    return NextResponse.redirect(new URL("notAuthorize", request.url));
  }
  if (!PublicRoutes.includes(path) && !token) {
    return NextResponse.redirect(new URL("/auth/signIn", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/auth/signIn",
    "/auth/signUp",
    "/createNotes/:path*",
    "/deleteNote/:path*",
    "/notes",
    "/admin",
  ],
};
