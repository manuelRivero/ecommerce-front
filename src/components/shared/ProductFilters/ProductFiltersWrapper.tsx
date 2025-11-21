'use client';

import React, { useState, useRef } from 'react';
import { Box, Grid, IconButton, Fab, useMediaQuery, useTheme, Button } from '@mui/material';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import { useSearchParams } from 'next/navigation';
import ProductFiltersComponent from './index';
import { ProductFilters, FilterState } from '@/interfaces/filters';
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
  const searchParams = useSearchParams();

  const { filters: filterState, handleFiltersChange } = useProductFilters({
    min: filters.priceRange.min,
    max: filters.priceRange.max,
  });
  
  // Preparar initialFilters solo una vez cuando se monta el componente
  // Leer directamente de los parámetros de la URL para asegurar que se inicialicen correctamente
  const initialFiltersRef = useRef<FilterState | null>(null);
  if (initialFiltersRef.current === null) {
    const defaultMin = filters.priceRange.min || 0;
    const defaultMax = filters.priceRange.max || 100000;
    
    initialFiltersRef.current = {
      priceRange: {
        min: Number(searchParams.get('minPrice')) || defaultMin,
        max: Number(searchParams.get('maxPrice')) || defaultMax,
      },
      selectedColors: searchParams.get('colors')?.split(',').filter(Boolean) || [],
      selectedSizes: searchParams.get('sizes')?.split(',').filter(Boolean) || [],
      selectedCategories: searchParams.get('categories')?.split(',').filter(Boolean) || [],
      hasDiscount: searchParams.get('hasDiscount') === 'true',
    };
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
