'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    console.log("filters", filters)
  const [filterState, setFilterState] = useState<FilterState>({
    priceRange: [filters.priceRange.min, filters.priceRange.max],
    selectedColors: [],
    selectedSizes: [],
    selectedCategories: [],
    hasDiscount: false,
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    colors: true,
    sizes: true,
    categories: true,
    discount: true,
  });

  // Inicializar filtros si se proporcionan
  useEffect(() => {
    if (initialFilters) {
      setFilterState(initialFilters);
    }
  }, [initialFilters]);

  // Notificar cambios de filtros
  useEffect(() => {
    onFiltersChange(filterState);
  }, [filterState, onFiltersChange]);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setFilterState(prev => ({
      ...prev,
      priceRange: newValue as [number, number],
    }));
  };

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
      priceRange: [filters.priceRange.min, filters.priceRange.max],
      selectedColors: [],
      selectedSizes: [],
      selectedCategories: [],
      hasDiscount: false,
    });
  };

  const hasActiveFilters = () => {
    return (
      filterState.priceRange[0] !== filters.priceRange.min ||
      filterState.priceRange[1] !== filters.priceRange.max ||
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

  const FilterSection = ({ title, children, sectionKey }: { title: string; children: React.ReactNode; sectionKey: keyof typeof expandedSections }) => (
    <Accordion
      expanded={expandedSections[sectionKey]}
      onChange={() => toggleSection(sectionKey)}
      sx={(theme)=>({
        boxShadow: 'none',
        border: `1px solid ${theme.palette.divider}`,
        '&:before': { display: 'none' },
        '&.Mui-expanded': {
          margin: 0,
        },
      })}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          minHeight: 48,
          '&.Mui-expanded': {
            minHeight: 48,
          },
          '& .MuiAccordionSummary-content': {
            margin: '12px 0',
            '&.Mui-expanded': {
              margin: '12px 0',
            },
          },
        }}
      >
        <Typography variant="subtitle2" fontWeight={600}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );

  const FilterContent = () => (
    <Box sx={{ p: 2 }}>
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
        {/* Rango de precios */}
        <FilterSection title="Rango de precios" sectionKey="price">
          <Box sx={{ px: 1 }}>
            <Slider
              value={filterState.priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={filters.priceRange.min}
              max={filters.priceRange.max}
              step={100}
              valueLabelFormat={formatPrice}
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
                {formatPrice(filterState.priceRange[0])}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatPrice(filterState.priceRange[1])}
              </Typography>
            </Box>
          </Box>
        </FilterSection>

        {/* Colores */}
        {filters.colors.length > 0 && (
          <FilterSection title="Colores" sectionKey="colors">
            <Stack spacing={1}>
              {filters.colors.map((color) => (
                 <FormControlLabel
                   key={color.value || `color-${Math.random()}`}
                  control={
                    <Checkbox
                      checked={filterState.selectedColors.includes(color.value)}
                      onChange={() => handleColorToggle(color.value)}
                      size="small"
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                       <Box
                         sx={{
                           width: 16,
                           height: 16,
                           borderRadius: '50%',
                           backgroundColor: color.value?.toLowerCase() || '#ccc',
                           border: `1px solid ${theme.palette.divider}`,
                         }}
                       />
                       <Typography variant="body2">
                         {color.value || 'Sin nombre'} ({color.count || 0})
                       </Typography>
                    </Box>
                  }
                />
              ))}
            </Stack>
          </FilterSection>
        )}

        {/* Tallas */}
        {filters.sizes.length > 0 && (
          <FilterSection title="Tallas" sectionKey="sizes">
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {filters.sizes.map((size) => (
                <Chip
                  key={size.value || `size-${Math.random()}`}
                   label={`${size.value || 'Sin talla'} (${size.count || 0})`}
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
          <FilterSection title="Categorías" sectionKey="categories">
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
          <FilterSection title="Ofertas" sectionKey="discount">
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
    </Box>
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
              <FilterContent />
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
      <FilterContent />
    </Box>
  );
}
