'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterState } from '@/interfaces/filters';

export const useProductFilters = (defaultPriceRange?: { min: number; max: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const defaultMin = defaultPriceRange?.min || 0;
  const defaultMax = defaultPriceRange?.max || 100000;
  
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [defaultMin, defaultMax],
    selectedColors: [],
    selectedSizes: [],
    selectedCategories: [],
    hasDiscount: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Inicializar filtros desde URL
  useEffect(() => {
    const urlFilters: FilterState = {
      priceRange: [
        Number(searchParams.get('minPrice')) || defaultMin,
        Number(searchParams.get('maxPrice')) || defaultMax,
      ],
      selectedColors: searchParams.get('colors')?.split(',').filter(Boolean) || [],
      selectedSizes: searchParams.get('sizes')?.split(',').filter(Boolean) || [],
      selectedCategories: searchParams.get('categories')?.split(',').filter(Boolean) || [],
      hasDiscount: searchParams.get('hasDiscount') === 'true',
    };
    
    setFilters(urlFilters);
  }, [searchParams, defaultMin, defaultMax]);

  // Actualizar URL cuando cambien los filtros
  const updateURL = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Limpiar parámetros de filtros existentes
    params.delete('minPrice');
    params.delete('maxPrice');
    params.delete('colors');
    params.delete('sizes');
    params.delete('categories');
    params.delete('hasDiscount');
    
    // Agregar nuevos parámetros si tienen valores (solo si no son los valores por defecto)
    if (newFilters.priceRange[0] > defaultMin) {
      params.set('minPrice', newFilters.priceRange[0].toString());
    }
    if (newFilters.priceRange[1] < defaultMax) {
      params.set('maxPrice', newFilters.priceRange[1].toString());
    }
    if (newFilters.selectedColors.length > 0) {
      params.set('colors', newFilters.selectedColors.join(','));
    }
    if (newFilters.selectedSizes.length > 0) {
      params.set('sizes', newFilters.selectedSizes.join(','));
    }
    if (newFilters.selectedCategories.length > 0) {
      params.set('categories', newFilters.selectedCategories.join(','));
    }
    if (newFilters.hasDiscount) {
      params.set('hasDiscount', 'true');
    }
    
    // Actualizar URL
    const newURL = `${window.location.pathname}?${params.toString()}`;
    router.push(newURL, { scroll: false });
  }, [router, searchParams]);

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    updateURL(newFilters);
  }, [updateURL]);

  const clearFilters = useCallback(() => {
    const defaultFilters: FilterState = {
      priceRange: [defaultMin, defaultMax],
      selectedColors: [],
      selectedSizes: [],
      selectedCategories: [],
      hasDiscount: false,
    };
    
    setFilters(defaultFilters);
    updateURL(defaultFilters);
  }, [updateURL, defaultMin, defaultMax]);

  return {
    filters,
    handleFiltersChange,
    clearFilters,
    isLoading,
    setIsLoading,
  };
};
