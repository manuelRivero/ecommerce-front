import { getPublicBlogs } from '../blogs';
import { getProducts } from '../products';
import { getActiveTenants } from '../tenants';

export interface SitemapUrl {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}





/**
 * Genera URLs estáticas para el dominio principal
 */
export const getMainDomainUrls = (baseUrl: string): SitemapUrl[] => {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/crear-tienda`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/acerca-de-nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/politicas-de-privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terminos-de-servicio`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/condiciones-de-uso`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
};

/**
 * Genera URLs estáticas para un subdominio
 */
export const getSubdomainStaticUrls = (subdomain: string, baseUrl: string): SitemapUrl[] => {
  return [
    {
      url: `https://${subdomain}.${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `https://${subdomain}.${baseUrl}/productos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `https://${subdomain}.${baseUrl}/ofertas`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `https://${subdomain}.${baseUrl}/descuentos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `https://${subdomain}.${baseUrl}/mas-vendidos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `https://${subdomain}.${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `https://${subdomain}.${baseUrl}/politicas`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `https://${subdomain}.${baseUrl}/como-funciona-el-envio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
};

/**
 * Genera URLs dinámicas de productos para un subdominio
 */
export const getSubdomainProductUrls = async (subdomain: string, baseUrl: string): Promise<SitemapUrl[]> => {
  try {
    const response = await getProducts(subdomain, 0, 100); // Obtener hasta 100 productos
    const products = response.data?.products || [];
    
    return products.map((product: any) => ({
      url: `https://${subdomain}.${baseUrl}/detalle-producto/${product._id}`,
      lastModified: new Date(product.updatedAt || product.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error(`Error fetching products for subdomain ${subdomain}:`, error);
    return [];
  }
};

/**
 * Genera URLs dinámicas de blogs para un subdominio
 */
export const getSubdomainBlogUrls = async (subdomain: string, baseUrl: string): Promise<SitemapUrl[]> => {
  try {
    const blogsResponse = await getPublicBlogs(subdomain, 0, 100); // Obtener hasta 100 blogs
    const blogs = blogsResponse.data?.blogs || [];
    
    return blogs.map((blog: any) => ({
      url: `https://${subdomain}.${baseUrl}/detalle-del-blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error(`Error fetching blogs for subdomain ${subdomain}:`, error);
    return [];
  }
};

import { getSubdomainBaseUrl } from '@/config/environment';

/**
 * Obtiene el dominio base desde las variables de entorno
 */
export const getBaseUrl = (): string => {
  return getSubdomainBaseUrl();
};
