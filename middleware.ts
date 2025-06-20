import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add paths that don't require authentication
<<<<<<< HEAD
const publicPaths = ["/login", "/register", "/forgot-password"];
=======
const publicPaths = ["/login", "/register", "/forgot-password", "/api"];
>>>>>>> 7bbc05a (fixing and updating broken functions)

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token");
  const { pathname } = request.nextUrl;

<<<<<<< HEAD
  // Allow access to public paths
  if (publicPaths.includes(pathname)) {
=======
  // Allow access to public paths and API routes
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Allow access to static files
  if (pathname.startsWith("/_next/") || pathname.startsWith("/favicon.ico")) {
>>>>>>> 7bbc05a (fixing and updating broken functions)
    return NextResponse.next();
  }

  // Redirect to login if no token is present
  if (!token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
<<<<<<< HEAD
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
=======
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|public/|api/).*)",
>>>>>>> 7bbc05a (fixing and updating broken functions)
  ],
};
