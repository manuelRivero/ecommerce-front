import { NextRequest, NextResponse } from 'next/server';
import { 
  getSubdomainStaticUrls, 
  getSubdomainProductUrls, 
  getSubdomainBlogUrls
} from '@/client/sitemap';

export async function GET(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const subdomain = request.headers.get("x-subdomain");
  
  console.log('=== SITEMAP REWRITE API ===');
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
    console.log('Generating sitemap for subdomain:', subdomain);
    console.log('Subdomain base URL:', subdomainBaseUrl);
    
    // Obtener URLs estáticas del subdominio
    const staticUrls = getSubdomainStaticUrls(subdomain, subdomainBaseUrl);
    
    // Obtener URLs dinámicas de productos
    const productUrls = await getSubdomainProductUrls(subdomain, subdomainBaseUrl);
    
    // Obtener URLs dinámicas de blogs
    const blogUrls = await getSubdomainBlogUrls(subdomain, subdomainBaseUrl);
    
    // Combinar todas las URLs
    const allUrls = [
      ...staticUrls,
      ...productUrls,
      ...blogUrls,
    ];
    
    console.log(`Generated ${allUrls.length} URLs for subdomain ${subdomain}`);
    
    // Generar XML del sitemap
    const xml = generateSitemapXML(allUrls);
    
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
    
  } catch (error) {
    console.error(`Error generating sitemap for subdomain ${subdomain}:`, error);
    
    // En caso de error, devolver solo las URLs estáticas
    const staticUrls = getSubdomainStaticUrls(subdomain, subdomainBaseUrl);
    const xml = generateSitemapXML(staticUrls);
    
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}

function generateSitemapXML(urls: any[]): string {
  const xmlUrls = urls.map(url => `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified.toISOString()}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlUrls}
</urlset>`;
}
