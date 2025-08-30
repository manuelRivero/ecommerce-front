import { MetadataRoute } from 'next';
import { 
  getSubdomainStaticUrls, 
  getSubdomainProductUrls, 
  getSubdomainBlogUrls, 
  getBaseUrl 
} from '@/client/sitemap';

export default async function sitemap({ 
  params 
}: { 
  params: Promise<{ subdomain: string }> 
}): Promise<MetadataRoute.Sitemap> {
  const { subdomain } = await params;
  const baseUrl = getBaseUrl();
  
  console.log('=== SUBDOMAIN SITEMAP ===');
  console.log('Subdomain:', subdomain);
  console.log('Base URL:', baseUrl);
  
  try {
    // Obtener URLs estáticas del subdominio
    const staticUrls = getSubdomainStaticUrls(subdomain, baseUrl);
    
    // Obtener URLs dinámicas de productos
    const productUrls = await getSubdomainProductUrls(subdomain, baseUrl);
    
    // Obtener URLs dinámicas de blogs
    const blogUrls = await getSubdomainBlogUrls(subdomain, baseUrl);
    
    // Combinar todas las URLs
    const allUrls = [
      ...staticUrls,
      ...productUrls,
      ...blogUrls,
    ];
    
    return allUrls;
  } catch (error) {
    console.error(`Error generating sitemap for subdomain ${subdomain}:`, error);
    
    // En caso de error, devolver solo las URLs estáticas
    return getSubdomainStaticUrls(subdomain, baseUrl);
  }
}
