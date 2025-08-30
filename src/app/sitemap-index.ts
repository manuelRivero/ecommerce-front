import { MetadataRoute } from 'next';
import { getActiveTenants } from '@/client/tenants';
import { getBaseUrl } from '@/client/sitemap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  
  try {
    // Obtener todos los tenants activos
    const tenants = await getActiveTenants();
    
    // Crear entrada para el sitemap principal
    const sitemaps = [
      {
        url: `https://${baseUrl}/sitemap.xml`,
        lastModified: new Date(),
      },
    ];
    
    // Agregar sitemaps de cada subdominio activo
    tenants.forEach(tenant => {
      sitemaps.push({
        url: `https://${tenant.subdomain}.${baseUrl}/sitemap.xml`,
        lastModified: new Date(),
      });
    });
    
    return sitemaps;
  } catch (error) {
    console.error('Error generating sitemap index:', error);
    
    // En caso de error, devolver solo el sitemap principal
    return [
      {
        url: `https://${baseUrl}/sitemap.xml`,
        lastModified: new Date(),
      },
    ];
  }
}
