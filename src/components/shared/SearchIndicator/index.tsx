'use client';

import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Close as CloseIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface SearchIndicatorProps {
  searchQuery: string;
  resultsCount?: number;
  onClearSearch?: () => void;
}

export default function SearchIndicator({ 
  searchQuery, 
  resultsCount, 
  onClearSearch 
}: SearchIndicatorProps) {
  const theme = useTheme();
  const router = useRouter();

  const handleClearSearch = () => {
    if (onClearSearch) {
      onClearSearch();
    } else {
      // Navegar a la página de productos sin parámetro de búsqueda
      router.push('/productos');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        mb: 3,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Mostrando resultados para: <strong>"{searchQuery}"</strong>
          {resultsCount !== undefined && (
            <span> • {resultsCount} producto{resultsCount !== 1 ? 's' : ''} encontrado{resultsCount !== 1 ? 's' : ''}</span>
          )}
        </Typography>
      </Box>

      <IconButton
        onClick={handleClearSearch}
        sx={{
          color: 'text.secondary',
          '&:hover': {
            backgroundColor: 'action.hover',
            color: 'text.primary',
          },
        }}
        title="Ver todos los productos"
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
