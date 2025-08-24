import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Skip for localhost and known domains
  if (hostname.includes('localhost') || hostname.includes('vercel.app') || hostname.includes('yourdomain.com')) {
    return NextResponse.next();
  }

  // Handle tenant store subdomains (e.g., margarita.tiendapro.com.ar)
  // These should NOT redirect, let the app handle the subdomain internally
  if (hostname.includes('tiendapro.com.ar') && !hostname.startsWith('www.') && !hostname.startsWith('api.')) {
    // This is a tenant store subdomain, don't redirect - let the app handle it
    return NextResponse.next();
  }

  // Handle other subdomains for main app
  if (pathname === '/') {
    const subdomain = hostname.split('.')[0];
    
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