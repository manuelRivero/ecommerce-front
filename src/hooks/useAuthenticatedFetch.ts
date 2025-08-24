import { useSuperAdminAuth } from '@/context/super-admin-auth';

export const useAuthenticatedFetch = () => {
  const { checkAuth } = useSuperAdminAuth();

  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('super-admin-token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    // If token is expired or invalid, try to refresh or redirect to login
    if (response.status === 401) {
      localStorage.removeItem('super-admin-token');
      await checkAuth();
      throw new Error('Authentication expired. Please login again.');
    }

    return response;
  };

  return { authenticatedFetch };
};
