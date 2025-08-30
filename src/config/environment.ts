/**
 * Configuración de variables de entorno
 */
export const config = {
  // URL base de la aplicación
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'localhost:8080',
  
  // URL de la API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  
  // Entorno de desarrollo
  isDevelopment: process.env.NODE_ENV === 'development',
  
  // Entorno de producción
  isProduction: process.env.NODE_ENV === 'production',
};

/**
 * Obtiene la URL base completa con protocolo
 */
export const getFullBaseUrl = (): string => {
  const protocol = config.isDevelopment ? 'http' : 'https';
  return `${protocol}://${config.baseUrl}`;
};

/**
 * Obtiene la URL base para subdominios
 */
export const getSubdomainBaseUrl = (): string => {
  return config.baseUrl;
};
