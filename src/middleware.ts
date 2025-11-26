import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only handle the login page redirect if already authenticated
  if (pathname === '/admin/login') {
    const isAuthenticated = request.cookies.get('isAdminAuthenticated')?.value === 'true';
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Let ProtectedRoute component handle authentication for all other admin routes
  // since we're using localStorage (client-side only)
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};