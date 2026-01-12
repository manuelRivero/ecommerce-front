import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
});

// Interceptor para agregar token de autenticación automáticamente
axiosInstance.interceptors.request.use(
    (config) => {
        console.log('[Axios Interceptor] Request interceptor - URL:', config.url);
        console.log('[Axios Interceptor] Request interceptor - Method:', config.method);
        console.log('[Axios Interceptor] Request interceptor - Base URL:', config.baseURL);
        console.log('[Axios Interceptor] Request interceptor - Params:', config.params);
        
        // Solo en el cliente (navegador)
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('super-admin-token');
            console.log('[Axios Interceptor] Request interceptor - Token disponible:', !!token);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                console.log('[Axios Interceptor] Request interceptor - Header Authorization agregado');
            } else {
                console.warn('[Axios Interceptor] Request interceptor - No hay token disponible');
            }
        } else {
            console.log('[Axios Interceptor] Request interceptor - Ejecutándose en servidor (SSR)');
        }
        
        console.log('[Axios Interceptor] Request interceptor - Headers finales:', config.headers);
        return config;
    },
    (error) => {
        console.error('[Axios Interceptor] Request interceptor - Error:', error);
        return Promise.reject(error);
    }
);

// Interceptor para respuestas (para logging de errores)
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('[Axios Interceptor] Response interceptor - Status:', response.status);
        console.log('[Axios Interceptor] Response interceptor - URL:', response.config.url);
        return response;
    },
    (error) => {
        console.error('[Axios Interceptor] Response interceptor - Error capturado:', error);
        console.error('[Axios Interceptor] Response interceptor - Error message:', error?.message);
        console.error('[Axios Interceptor] Response interceptor - Error response status:', error?.response?.status);
        console.error('[Axios Interceptor] Response interceptor - Error response data:', error?.response?.data);
        return Promise.reject(error);
    }
);

// Export super-admin features
export * from './super-admin/features';
export * from './super-admin/plans';
export * from './super-admin/tenants';
export * from './super-admin/announcements';
export * from './tenants';

// Export super-admin plans
export * from './super-admin/plans';
