'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SuperAdminUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  tenant: string;
}

interface SuperAdminAuthContextType {
  user: SuperAdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isClient: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const SuperAdminAuthContext = createContext<SuperAdminAuthContextType | undefined>(undefined);

export const useSuperAdminAuth = () => {
  const context = useContext(SuperAdminAuthContext);
  if (context === undefined) {
    throw new Error('useSuperAdminAuth must be used within a SuperAdminAuthProvider');
  }
  return context;
};

interface SuperAdminAuthProviderProps {
  children: ReactNode;
}

export const SuperAdminAuthProvider: React.FC<SuperAdminAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<SuperAdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Función para recuperar el token del localStorage de forma síncrona
  const getStoredToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem('super-admin-token');
    } catch (error) {
      console.error('Error al leer el token del localStorage:', error);
      return null;
    }
  };

  // Función para guardar los datos del usuario en localStorage
  const saveUserToStorage = (user: SuperAdminUser): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('super-admin-user', JSON.stringify(user));
    } catch (error) {
      console.error('Error al guardar el usuario en localStorage:', error);
    }
  };

  // Función para recuperar los datos del usuario del localStorage
  const getUserFromStorage = (): SuperAdminUser | null => {
    if (typeof window === 'undefined') return null;
    try {
      const userStr = localStorage.getItem('super-admin-user');
      if (userStr) {
        return JSON.parse(userStr) as SuperAdminUser;
      }
      return null;
    } catch (error) {
      console.error('Error al leer el usuario del localStorage:', error);
      return null;
    }
  };

  // Función para limpiar los datos del usuario del localStorage
  const clearUserFromStorage = (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem('super-admin-user');
    } catch (error) {
      console.error('Error al limpiar el usuario del localStorage:', error);
    }
  };

  const checkAuth = async (): Promise<boolean> => {
    try {
      console.log('checkAuth - Starting authentication check');
      const token = localStorage.getItem('super-admin-token');
      console.log('checkAuth - Token found:', !!token);
      
      if (!token) {
        console.log('checkAuth - No token found, setting user to null');
        setUser(null);
        return false;
      }

      console.log('checkAuth - Making API call to verify token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/super-admin/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('checkAuth - API response status:', response.status);

      if (response.ok) {
        const userData = await response.json();
        console.log('checkAuth - Full response data:', userData);
        
        // Manejar diferentes estructuras de respuesta
        // Puede venir como { user: {...} } o directamente como { ...userData }
        const user = userData.user || userData;
        
        if (user && (user.id || user._id || user.email)) {
          console.log('checkAuth - User data valid, setting user:', user);
          setUser(user);
          return true;
        } else {
          console.warn('checkAuth - User data invalid, structure:', userData);
          localStorage.removeItem('super-admin-token');
          setUser(null);
          return false;
        }
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        console.log('checkAuth - API call failed, status:', response.status, 'error:', errorData);
        
        // Si el endpoint no existe (404), no eliminamos el token
        // El token se validará en las siguientes peticiones autenticadas
        if (response.status === 404) {
          console.warn('checkAuth - Endpoint /super-admin/me no existe (404). El token se validará en peticiones futuras.');
          // Mantener el usuario del localStorage si existe
          const storedUser = getUserFromStorage();
          if (storedUser) {
            console.log('checkAuth - Manteniendo usuario del localStorage');
            setUser(storedUser);
            return true; // Considerar autenticado basado en localStorage
          }
          return false;
        }
        
        // Para otros errores (401, 403, etc.), limpiar el token
        localStorage.removeItem('super-admin-token');
        clearUserFromStorage();
        setUser(null);
        return false;
      }
    } catch (error: any) {
      console.error('checkAuth - Error:', error);
      console.error('checkAuth - Error details:', {
        message: error?.message,
        stack: error?.stack,
        name: error?.name
      });
      // Solo remover el token si es un error de red o similar
      // No remover si es un error de parsing JSON que podría ser temporal
      if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
        console.warn('checkAuth - Network error, keeping token for retry');
      } else {
        localStorage.removeItem('super-admin-token');
      }
      setUser(null);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('login - Starting login process');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/super-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('login - Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('login - Login successful, setting token and user');
        localStorage.setItem('super-admin-token', data.token);
        // Guardar el usuario en localStorage también
        if (data.user) {
          saveUserToStorage(data.user);
          setUser(data.user);
        }
        return true;
      } else {
        const errorData = await response.json();
        console.log('login - Login failed:', errorData);
        throw new Error(errorData.message || 'Error de autenticación');
      }
    } catch (error) {
      console.error('login - Error:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('logout - Logging out user');
    localStorage.removeItem('super-admin-token');
    clearUserFromStorage();
    setUser(null);
  };

  useEffect(() => {
    console.log('SuperAdminAuthProvider - useEffect triggered');
    
    // Marcar como cliente inmediatamente
    setIsClient(true);
    console.log('SuperAdminAuthProvider - Set isClient to true');
    
    // Inicializar autenticación: recuperar token y datos del usuario
    const initAuth = async () => {
      try {
        console.log('SuperAdminAuthProvider - Starting initAuth');
        
        // Primero, verificar si hay un token almacenado
        const storedToken = getStoredToken();
        console.log('SuperAdminAuthProvider - Token en localStorage:', !!storedToken);
        
        if (storedToken) {
          // Si hay token, recuperar los datos del usuario del localStorage primero
          // Esto permite que la app se inicialice rápidamente sin esperar al API
          const storedUser = getUserFromStorage();
          
          if (storedUser) {
            console.log('SuperAdminAuthProvider - Usuario encontrado en localStorage, restaurando sesión');
            setUser(storedUser);
            // Nota: La verificación del token con el API se puede hacer en background
            // pero no bloquea la inicialización de la app
          } else {
            console.log('SuperAdminAuthProvider - No hay usuario en localStorage, pero hay token');
            // Si hay token pero no hay usuario guardado, intentar verificar con el API
            // Solo si el endpoint existe. Si no existe, asumimos que el token es válido
            // y dejamos que la primera petición autenticada lo verifique
          }
        } else {
          // Si no hay token, limpiar también el usuario almacenado
          console.log('SuperAdminAuthProvider - No hay token almacenado, usuario no autenticado');
          clearUserFromStorage();
          setUser(null);
        }
      } catch (error: any) {
        console.error('SuperAdminAuthProvider - Error en initAuth:', error);
        console.error('SuperAdminAuthProvider - Error details:', {
          message: error?.message,
          stack: error?.stack
        });
        setUser(null);
      } finally {
        console.log('SuperAdminAuthProvider - initAuth completed, setting isLoading to false');
        setIsLoading(false);
      }
    };

    // Ejecutar inmediatamente al montar el componente
    initAuth();
  }, []);

  const value: SuperAdminAuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isClient,
    login,
    logout,
    checkAuth,
  };

  console.log('SuperAdminAuthProvider - Current state:', { 
    user: !!user, 
    isAuthenticated: !!user, 
    isLoading, 
    isClient 
  });

  return (
    <SuperAdminAuthContext.Provider value={value}>
      {children}
    </SuperAdminAuthContext.Provider>
  );
};
