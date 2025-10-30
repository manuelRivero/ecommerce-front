import React from 'react';
import { Box, Avatar } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useITheme } from '@/components/themeProvider';

interface TenantLogoProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  alt?: string;
  sx?: any;
  showFallback?: boolean;
}

export default function TenantLogo({ 
  width = 45, 
  height = 45, 
  borderRadius = 9999, 
  alt = "Logo",
  sx = {},
  showFallback = true
}: TenantLogoProps) {
  const { state } = useITheme();
  const logoUrl = state.config?.metadata?.logo;

  // Si no hay logo y showFallback es true, mostrar el icono de casita
  if (!logoUrl && showFallback) {
    return (
      <Box
        sx={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'primary.main',
          borderRadius,
          ...sx
        }}
      >
        <Home sx={{ color: 'white', fontSize: width && typeof width === 'number' ? width * 0.6 : 24 }} />
      </Box>
    );
  }

  // Si hay logo, mostrarlo
  if (logoUrl) {
    return (
      <Box sx={{ width, height, ...sx }}>
        <img
          src={logoUrl}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
            overflow: 'hidden',
          }}
          onError={(e) => {
            // Si la imagen falla al cargar, mostrar el fallback
            if (showFallback) {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div style="
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--mui-palette-primary-main);
                    border-radius: ${typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius};
                  ">
                    <svg width="60%" height="60%" viewBox="0 0 24 24" fill="white">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                  </div>
                `;
              }
            }
          }}
        />
      </Box>
    );
  }

  // Si no hay logo y no se debe mostrar fallback, retornar null
  return null;
}

