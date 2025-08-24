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
        console.log('checkAuth - User data received:', userData.user);
        setUser(userData.user);
        return true;
      } else {
        console.log('checkAuth - API call failed, removing token');
        localStorage.removeItem('super-admin-token');
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('checkAuth - Error:', error);
      localStorage.removeItem('super-admin-token');
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
        setUser(data.user);
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
    setUser(null);
  };

  useEffect(() => {
    console.log('SuperAdminAuthProvider - useEffect triggered');
    // Mark as client-side rendered
    setIsClient(true);
    console.log('SuperAdminAuthProvider - Set isClient to true');
    
    const initAuth = async () => {
      console.log('SuperAdminAuthProvider - Starting initAuth');
      await checkAuth();
      console.log('SuperAdminAuthProvider - checkAuth completed, setting isLoading to false');
      setIsLoading(false);
    };

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
