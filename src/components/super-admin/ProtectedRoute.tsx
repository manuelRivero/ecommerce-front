'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSuperAdminAuth } from '@/context/super-admin-auth';
import { Box, CircularProgress, Typography } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, isClient } = useSuperAdminAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('ProtectedRoute - State:', { isClient, isLoading, isAuthenticated });
    
    if (isClient && !isLoading && !isAuthenticated) {
      console.log('ProtectedRoute - Redirecting to auth');
      router.replace('/super-admin/auth');
    }
  }, [isAuthenticated, isLoading, isClient, router]);

  // Don't render anything until we're on the client side
  if (!isClient) {
    console.log('ProtectedRoute - Not client yet');
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Cargando...
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    console.log('ProtectedRoute - Loading auth');
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Verificando autenticación...
        </Typography>
      </Box>
    );
  }

  // If not authenticated, show loading while redirecting
  if (!isAuthenticated) {
    console.log('ProtectedRoute - Not authenticated, showing redirect message');
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Redirigiendo al login...
        </Typography>
      </Box>
    );
  }

  console.log('ProtectedRoute - Authenticated, rendering children');
  return <>{children}</>;
};
