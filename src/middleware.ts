// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|super-admin|subdomain-not-found|[\\w-]+\\.\\w+).*)",
    "/sitemap.xml",
    "/robots.txt",
  ],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";
  const path = url.pathname;
  
  console.log('=== MIDDLEWARE START ===');
  console.log('Request URL:', req.url);
  console.log('Host:', host);
  console.log('Path:', path);

  // 🔹 Si ya estamos en subdomain-not-found, no procesar
  if (path.startsWith("/subdomain-not-found")) {
    console.log('Already on subdomain-not-found, skipping middleware');
    console.log('=== MIDDLEWARE END ===');
    return NextResponse.next();
  }

  // 🔹 Lista de dominios principales válidos
  const allowedMainDomains = [
    "tiendapro.com.ar",    // Producción
    "www.tiendapro.com.ar",
    "localhost:3000",      // Desarrollo
    "localhost:8080",      // Desarrollo alternativo
    "staging.tiendapro.com.ar" // Staging (opcional)
  ];

  const isMainDomain = allowedMainDomains.includes(host);

  // Determinar el dominio base según el entorno
  let baseDomain = 'tiendapro.com.ar';
  let protocol = 'https';
  
  if (host.includes('localhost')) {
    baseDomain = 'localhost:8080';
    protocol = 'http';
  }

  // 🔹 Manejar rutas de sitemap y robots para subdominios
  if (path === "/sitemap.xml" || path === "/robots.txt") {
    console.log('Sitemap or robots route detected');
    console.log('isMainDomain:', isMainDomain);
    console.log('host.endsWith check:', host.endsWith(`.${baseDomain}`));
    console.log('baseDomain:', baseDomain);
    
    // Si es un subdominio, redirigir a la API correspondiente
    if (!isMainDomain && host.endsWith(`.${baseDomain}`)) {
      const subdomain = host.replace(`.${baseDomain}`, "");
      console.log(`Redirecting sitemap/robots for subdomain: ${subdomain}`);
      console.log('=== MIDDLEWARE END ===');
      
      if (path === "/sitemap.xml") {
        const apiUrl = new URL('/api/sitemap-rewrite', req.url);
        console.log('Rewriting to API URL:', apiUrl.toString());
        const response = NextResponse.rewrite(apiUrl);
        response.headers.set('x-subdomain', subdomain);
        return response;
      } else if (path === "/robots.txt") {
        const apiUrl = new URL('/api/robots-rewrite', req.url);
        console.log('Rewriting to API URL:', apiUrl.toString());
        const response = NextResponse.rewrite(apiUrl);
        response.headers.set('x-subdomain', subdomain);
        return response;
      }
    }
    
    // Si es dominio principal, continuar normalmente
    console.log('Main domain sitemap/robots, proceeding normally');
    console.log('=== MIDDLEWARE END ===');
    return NextResponse.next();
  }

  // Caso 1: super admin -> dominio principal/super-admin
  if (isMainDomain && path.startsWith("/super-admin")) {
    console.log('Main domain with super-admin path');
    url.pathname = `/super-admin${path.replace("/super-admin", "")}`;
    console.log('=== MIDDLEWARE END ===');
    return NextResponse.rewrite(url);
  }

  // Caso 2: dominio principal
  if (isMainDomain) {
    console.log('Main domain detected, proceeding');
    console.log('=== MIDDLEWARE END ===');
    return NextResponse.next();
  }
  
  console.log('baseDomain:', baseDomain);
  console.log('host.endsWith check:', host.endsWith(`.${baseDomain}`));

  // Caso 3: subdominio -> *.tiendapro.com.ar
  if (host.endsWith(`.${baseDomain}`)) {
    const subdomain = host.replace(`.${baseDomain}`, "");
    console.log("Subdomain detected:", subdomain);
    
    if (subdomain) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tenant/verify-tenant?subdomain=${subdomain}`
        );
        
        if (response.ok) {
          console.log("Valid subdomain detected, rewriting URL");
          console.log('=== MIDDLEWARE END ===');
          return NextResponse.rewrite(
            new URL(`/${subdomain}${url.pathname}${url.search}`, req.url)
          );
        } else {
          console.log('Subdomain validation failed, redirecting to subdomain-not-found');
          console.log('=== MIDDLEWARE END ===');
          return NextResponse.redirect(new URL('/subdomain-not-found', req.url));
        }
      } catch (error) {
        console.error("Error fetching tenant:", error);
        console.log('API error, redirecting to subdomain-not-found');
        console.log('=== MIDDLEWARE END ===');
        return NextResponse.redirect(new URL('/subdomain-not-found', req.url));
      }
    }
  }

  // Caso 4: Otros dominios (incluyendo localhost) -> redirigir al dominio principal
  console.log('No valid subdomain detected, redirecting to subdomain-not-found');
  console.log('=== MIDDLEWARE END ===');
  return NextResponse.redirect(new URL('/subdomain-not-found', req.url));
}