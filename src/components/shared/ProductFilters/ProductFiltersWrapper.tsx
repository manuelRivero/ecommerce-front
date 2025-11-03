'use client';

import React, { useState, useRef } from 'react';
import { Box, Grid, IconButton, Fab, useMediaQuery, useTheme, Button } from '@mui/material';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import ProductFiltersComponent from './index';
import { ProductFilters } from '@/interfaces/filters';
import { useProductFilters } from '@/hooks/useProductFilters';

interface ProductFiltersWrapperProps {
  filters: ProductFilters;
  subdomain: string;
  category?: string;
  search?: string;
  children: React.ReactNode;
}

export default function ProductFiltersWrapper({
  filters,
  subdomain,
  category,
  search,
  children,
}: ProductFiltersWrapperProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const { filters: filterState, handleFiltersChange } = useProductFilters({
    min: filters.priceRange.min,
    max: filters.priceRange.max,
  });
  
  // Preparar initialFilters solo una vez cuando se monta el componente
  const initialFiltersRef = useRef<typeof filterState | null>(null);
  if (initialFiltersRef.current === null) {
    initialFiltersRef.current = filterState;
  }
  const initialFilters = initialFiltersRef.current;

  const handleFiltersToggle = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleFiltersClose = () => {
    setIsFiltersOpen(false);
  };

  if (isMobile) {
    return (
      <Box>
        {/* FAB para abrir filtros en móvil */}
        <Fab
          color="primary"
          aria-label="filtros"
          onClick={handleFiltersToggle}
          sx={(theme) => ({
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,  
            position: 'fixed',
            bottom: 90,
            right: 20,
            zIndex: theme.zIndex.speedDial, // Usar z-index específico para FABs
          })}
        >
          <FilterListIcon />
        </Fab>

        {/* Filtros en modal móvil */}
        <ProductFiltersComponent
          filters={filters}
          onFiltersChange={handleFiltersChange}
          initialFilters={initialFilters}
          isMobile={true}
          isOpen={isFiltersOpen}
          onClose={handleFiltersClose}
        />

        {/* Contenido principal */}
        <Box sx={{ pb: 8 }}>
          {children}
        </Box>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {/* Sidebar de filtros - Desktop */}
      <Grid item xs={12} md={3}>
        <ProductFiltersComponent
          filters={filters}
          onFiltersChange={handleFiltersChange}
          initialFilters={initialFilters}
          isMobile={false}
        />
      </Grid>

      {/* Contenido principal - Desktop */}
      <Grid item xs={12} md={9}>
        {children}
      </Grid>
    </Grid>
  );
}
