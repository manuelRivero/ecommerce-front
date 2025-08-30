import { MetadataRoute } from 'next';
import { getMainDomainUrls, getBaseUrl } from '@/client/sitemap';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const mainDomainUrls = getMainDomainUrls(`https://${baseUrl}`);
  
  return mainDomainUrls;
}
