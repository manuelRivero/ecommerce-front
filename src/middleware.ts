// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|super-admin|subdomain-not-found|[\\w-]+\\.\\w+).*)",
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

  // Determinar el dominio base según el entorno
  let baseDomain = 'tiendapro.com.ar';
  let protocol = 'https';
  
  if (host.includes('localhost')) {
    baseDomain = 'localhost:8080';
    protocol = 'http';
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
          return NextResponse.redirect(new URL('/subdomain-not-found', `${protocol}://${baseDomain}`));
        }
      } catch (error) {
        console.error("Error fetching tenant:", error);
        console.log('API error, redirecting to subdomain-not-found');
        console.log('=== MIDDLEWARE END ===');
        return NextResponse.redirect(new URL('/subdomain-not-found', `${protocol}://${baseDomain}`));
      }
    }
  }

  // Caso 4: Otros dominios (incluyendo localhost) -> redirigir al dominio principal
  console.log('No valid subdomain detected, redirecting to subdomain-not-found');
  console.log('=== MIDDLEWARE END ===');
  return NextResponse.redirect(new URL('/subdomain-not-found', `${protocol}://${baseDomain}`));
}