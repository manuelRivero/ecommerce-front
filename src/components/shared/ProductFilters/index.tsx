'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Slider,
  Chip,
  Stack,
  Divider,
  Button,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';
import { ProductFilters, FilterState } from '@/interfaces/filters';
import FilterSection from './FilterSection';

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ProductFiltersComponent({
  filters,
  onFiltersChange,
  initialFilters,
  isMobile = false,
  isOpen = false,
  onClose,
}: ProductFiltersProps) {
  const theme = useTheme();
  
  const [filterState, setFilterState] = useState<FilterState>({
    priceRange: {
      min: filters.priceRange.min,
      max: filters.priceRange.max,
    },
    selectedColors: [],
    selectedSizes: [],
    selectedCategories: [],
    hasDiscount: false,
  });
  
  // Estado local para feedback visual del slider (array para MUI Slider)
  const [priceRange, setPriceRange] = useState<[number, number]>([filters.priceRange.min, filters.priceRange.max]);
  // Ref para evitar que el useEffect interfiera cuando actualizamos desde onChangeCommitted
  const isUpdatingFromCommitRef = useRef(false);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    colors: true,
    sizes: true,
    categories: true,
    discount: true,
  });

  // Ref para evitar notificaciones durante la inicialización
  const isInitializingRef = useRef(true);
  const hasInitializedRef = useRef(false);

  // Inicializar filtros si se proporcionan (solo una vez)
  useEffect(() => {
    if (initialFilters && !hasInitializedRef.current) {
      isInitializingRef.current = true;
      setFilterState(initialFilters);
      setPriceRange([initialFilters.priceRange.min, initialFilters.priceRange.max]);
      hasInitializedRef.current = true;
      // Permitir notificaciones después de un pequeño delay
      setTimeout(() => {
        isInitializingRef.current = false;
      }, 100);
    } else if (!initialFilters && !hasInitializedRef.current) {
      // Si no hay initialFilters, inicializar con valores por defecto
      hasInitializedRef.current = true;
      isInitializingRef.current = false;
    }
  }, [initialFilters]);

  // Sincronizar priceRange con filterState.priceRange cuando cambia desde otras fuentes
  // NO cuando el cambio viene de onChangeCommitted (para evitar loops)
  useEffect(() => {
    if (isUpdatingFromCommitRef.current) {
      isUpdatingFromCommitRef.current = false;
      return; // Ignorar este cambio, ya que viene de onChangeCommitted
    }
    const { min: newMin, max: newMax } = filterState.priceRange;
    setPriceRange(prev => {
      const [prevMin, prevMax] = prev;
      // Solo actualizar si los valores realmente cambiaron
      if (prevMin !== newMin || prevMax !== newMax) {
        return [newMin, newMax];
      }
      return prev;
    });
  }, [filterState.priceRange.min, filterState.priceRange.max]);

  // Notificar cambios de filtros (solo cuando no está inicializando)
  useEffect(() => {
    if (!isInitializingRef.current && hasInitializedRef.current) {
      onFiltersChange(filterState);
    }
  }, [filterState, onFiltersChange]);


  const handleColorToggle = (color: string) => {
    setFilterState(prev => ({
      ...prev,
      selectedColors: prev.selectedColors.includes(color)
        ? prev.selectedColors.filter(c => c !== color)
        : [...prev.selectedColors, color],
    }));
  };

  const handleSizeToggle = (size: string) => {
    setFilterState(prev => ({
      ...prev,
      selectedSizes: prev.selectedSizes.includes(size)
        ? prev.selectedSizes.filter(s => s !== size)
        : [...prev.selectedSizes, size],
    }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFilterState(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter(c => c !== categoryId)
        : [...prev.selectedCategories, categoryId],
    }));
  };

  const handleDiscountToggle = () => {
    setFilterState(prev => ({
      ...prev,
      hasDiscount: !prev.hasDiscount,
    }));
  };

  const clearAllFilters = () => {
    setFilterState({
      priceRange: {
        min: filters.priceRange.min,
        max: filters.priceRange.max,
      },
      selectedColors: [],
      selectedSizes: [],
      selectedCategories: [],
      hasDiscount: false,
    });
  };

  const hasActiveFilters = () => {
    return (
      filterState.priceRange.min !== filters.priceRange.min ||
      filterState.priceRange.max !== filters.priceRange.max ||
      filterState.selectedColors.length > 0 ||
      filterState.selectedSizes.length > 0 ||
      filterState.selectedCategories.length > 0 ||
      filterState.hasDiscount
    );
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Contenido de filtros unificado para móvil y desktop
  const renderFiltersContent = () => (
    <>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Filtros
        </Typography>
        {hasActiveFilters() && (
          <Button
            size="small"
            startIcon={<ClearIcon />}
            onClick={clearAllFilters}
            sx={{ textTransform: 'none' }}
          >
            Limpiar
          </Button>
        )}
      </Box>

      {/* Total de productos */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {filters.totalProducts} productos encontrados
      </Typography>

      <Stack spacing={2}>
        {/* Rango de precios - Sin Accordion para evitar interferencias */}
        <Box sx={(theme) => ({
          boxShadow: 'none',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          overflow: 'hidden',
        })}>
          <Box
            onClick={() => toggleSection('price')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: 48,
              px: 2,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              Rango de precios
            </Typography>
            <ExpandMoreIcon
              sx={{
                transform: expandedSections.price ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </Box>
          {expandedSections.price && (
            <Box sx={{ px: 2, pb: 2 }}>
              <Slider
                value={priceRange}
                onChange={(_, newValue) => {
                  setPriceRange(newValue as [number, number]);
                }}
                onChangeCommitted={(_, newValue) => {
                  // Actualizar los filtros solo cuando suelta
                  const [min, max] = newValue as number[];
                  isUpdatingFromCommitRef.current = true; // Marcar que viene de aquí
                  setFilterState(prev => ({
                    ...prev,
                    priceRange: { min, max },
                  }));
                }}
                valueLabelDisplay="auto"
                min={filters.priceRange.min}
                max={filters.priceRange.max}
                step={1}
                disableSwap
                sx={{
                  color: theme.palette.primary.main,
                  '& .MuiSlider-thumb': {
                    width: 20,
                    height: 20,
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {formatPrice(priceRange[0])}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatPrice(priceRange[1])}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {/* Colores */}
        {filters.colors.filter(color => color.value && color.value.trim() !== '').length > 0 && (
          <FilterSection 
            title="Colores" 
            sectionKey="colors"
            expanded={expandedSections.colors}
            onToggle={() => toggleSection('colors')}
          >
            <Stack spacing={1}>
              {filters.colors
                .filter(color => color.value && color.value.trim() !== '')
                .map((color) => (
                 <FormControlLabel
                   key={color.value}
                  control={
                    <Checkbox
                      checked={filterState.selectedColors.includes(color.value)}
                      onChange={() => handleColorToggle(color.value)}
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      {color.value} ({color.count || 0})
                    </Typography>
                  }
                />
              ))}
            </Stack>
          </FilterSection>
        )}

        {/* Tallas */}
        {filters.sizes.filter(size => size.value && size.value.trim() !== '').length > 0 && (
          <FilterSection 
            title="Tallas" 
            sectionKey="sizes"
            expanded={expandedSections.sizes}
            onToggle={() => toggleSection('sizes')}
          >
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {filters.sizes
                .filter(size => size.value && size.value.trim() !== '')
                .map((size) => (
                <Chip
                  key={size.value}
                  label={`${size.value} (${size.count || 0})`}
                  variant={filterState.selectedSizes.includes(size.value) ? 'filled' : 'outlined'}
                  onClick={() => handleSizeToggle(size.value)}
                  size="small"
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                />
              ))}
            </Stack>
          </FilterSection>
        )}

        {/* Categorías */}
        {filters.categories.length > 0 && (
          <FilterSection 
            title="Categorías" 
            sectionKey="categories"
            expanded={expandedSections.categories}
            onToggle={() => toggleSection('categories')}
          >
            <Stack spacing={1}>
              {filters.categories.map((category) => (
                <FormControlLabel
                  key={category._id}
                  control={
                    <Checkbox
                      checked={filterState.selectedCategories.includes(category._id)}
                      onChange={() => handleCategoryToggle(category._id)}
                      size="small"
                    />
                  }
                  label={
                     <Typography variant="body2">
                       {category.name || 'Sin nombre'} ({category.count || 0})
                     </Typography>
                  }
                />
              ))}
            </Stack>
          </FilterSection>
        )}

        {/* Descuentos */}
        {filters.hasDiscount && (
          <FilterSection 
            title="Ofertas" 
            sectionKey="discount"
            expanded={expandedSections.discount}
            onToggle={() => toggleSection('discount')}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterState.hasDiscount}
                  onChange={handleDiscountToggle}
                  size="small"
                />
              }
              label={
                <Typography variant="body2">
                  Solo productos con descuento
                </Typography>
              }
            />
          </FilterSection>
        )}
      </Stack>
    </>
  );

  if (isMobile) {
    return (
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: theme.zIndex.modal - 1, // Por debajo del search bar
            display: 'flex',
            alignItems: 'flex-end',
          }}
          onClick={onClose}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              width: '100%',
              maxHeight: '80vh',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header móvil */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Filtros
              </Typography>
              <IconButton onClick={onClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Contenido con scroll */}
            <Box sx={{ maxHeight: 'calc(80vh - 80px)', overflowY: 'auto' }}>
              <Box sx={{ p: 2 }}>
                {renderFiltersContent()}
              </Box>
            </Box>
          </Box>
        </Box>
      </Collapse>
    );
  }

  return (
    <Box
      sx={{
        width: 280,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'sticky',
        top: 20,
        maxHeight: 'calc(100vh - 40px)',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ p: 2 }}>
        {renderFiltersContent()}
      </Box>
    </Box>
  );
}
