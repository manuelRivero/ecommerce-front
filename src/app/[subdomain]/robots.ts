import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/client/sitemap';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/super-admin/',
          '/api/',
          '/_next/',
          '/checkout/',
          '/compra-en-progreso/',
          '/compra-exitosa/',
          '/compra-fallida/',
        ],
      },
    ],
    sitemap: [
      `https://${baseUrl}/sitemap.xml`,
    ],
  };
}
