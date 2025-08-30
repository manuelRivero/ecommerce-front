import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const subdomain = request.headers.get("x-subdomain");
  
  console.log('=== ROBOTS REWRITE API ===');
  console.log('Host:', host);
  console.log('Subdomain from header:', subdomain);
  
  if (!subdomain) {
    console.log('No subdomain provided, returning error');
    return new NextResponse('Subdomain header is required', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
  
  // Determinar el dominio base según el entorno
  let baseDomain = 'tiendapro.com.ar';
  
  if (host.includes('localhost')) {
    baseDomain = 'localhost:8080';
  }
  
  // Construir la URL base del subdominio
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const subdomainBaseUrl = `${protocol}://${subdomain}.${baseDomain}`;
  
  try {
    console.log('Generating robots.txt for subdomain:', subdomain);
    console.log('Subdomain base URL:', subdomainBaseUrl);
    
    // Generar robots.txt para el subdominio
    const robotsContent = generateRobotsTxt(subdomainBaseUrl);
    
    return new NextResponse(robotsContent, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    
  } catch (error) {
    console.error(`Error generating robots.txt for subdomain ${subdomain}:`, error);
    
    // En caso de error, devolver un robots.txt básico
    const robotsContent = generateRobotsTxt(subdomainBaseUrl);
    
    return new NextResponse(robotsContent, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

function generateRobotsTxt(baseUrl: string): string {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and API routes
Disallow: /super-admin/
Disallow: /api/
Disallow: /_next/
Disallow: /_static/

# Allow important pages
Allow: /productos/
Allow: /blogs/
Allow: /ofertas/
Allow: /descuentos/
Allow: /mas-vendidos/
Allow: /politicas/
Allow: /como-funciona-el-envio/
Allow: /checkout/
Allow: /compra-exitosa/
Allow: /compra-fallida/
Allow: /compra-en-progreso/
`;
}
