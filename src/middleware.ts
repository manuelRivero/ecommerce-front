import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Subdomain handling for tenant stores
  if (pathname === '/') {
    const hostname = request.headers.get('host') || '';
    const subdomain = hostname.split('.')[0];
    
    // Skip for localhost and known domains
    if (hostname.includes('localhost') || hostname.includes('vercel.app') || hostname.includes('yourdomain.com')) {
      return NextResponse.next();
    }
    
    // If there's a subdomain, redirect to the subdomain route
    if (subdomain && subdomain !== 'www' && subdomain !== 'api') {
      return NextResponse.redirect(new URL(`/${subdomain}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};