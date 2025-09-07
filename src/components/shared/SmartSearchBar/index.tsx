'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Popper,
  Paper,
  ClickAwayListener,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Mic as MicIcon,
} from '@mui/icons-material';
import { useSmartSearch } from '@/hooks/useSmartSearch';
import SearchSuggestions from './SearchSuggestions';
import SearchResults from './SearchResults';

interface SmartSearchBarProps {
  placeholder?: string;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled' | 'standard';
  tenant: string; // Agregar tenant requerido
  onSearch?: (query: string) => void;
  onSuggestionSelect?: (suggestion: any) => void;
  className?: string;
  sx?: any;
}

export default function SmartSearchBar({
  placeholder = 'Buscar productos...',
  fullWidth = true,
  size = 'medium',
  variant = 'outlined',
  tenant,
  onSearch,
  onSuggestionSelect,
  className,
  sx,
}: SmartSearchBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Hook de búsqueda inteligente
  const {
    query,
    suggestions,
    results,
    loading,
    error,
    search,
    clearSearch,
    showSuggestions,
    showResults,
    hasSearched,
    setQuery,
    selectSuggestion,
  } = useSmartSearch({
    debounceMs: 300,
    minQueryLength: 2,
    maxSuggestions: 8,
    autoSearch: true,
    cacheResults: true,
    tenant, // Pasar el tenant requerido
  });
  
  // Estados del componente
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [focused, setFocused] = useState(false);
  const [showPopper, setShowPopper] = useState(false);
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calcular posición del popper
  useEffect(() => {
    if (inputRef.current) {
      setAnchorEl(inputRef.current);
    }
  }, []);
  
  // Controlar visibilidad del popper
  useEffect(() => {
    const shouldShow = (showSuggestions && suggestions.length > 0) || 
                      (showResults && results.length > 0) ||
                      (focused && query.length > 0) ||
                      (hasSearched && results.length > 0);
    setShowPopper(shouldShow);
  }, [showSuggestions, showResults, suggestions.length, results.length, focused, query, hasSearched]);
  
  // Manejar cambios en el input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    // No llamar onSearch aquí, solo cuando se hace submit
  };
  
  // Manejar envío de búsqueda
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      // Llamar a la función de búsqueda del hook
      search(query.trim());
      // Llamar a la función de navegación del padre
      if (onSearch) {
        onSearch(query.trim());
      }
      // NO cerrar el dropdown para mostrar los resultados
      // setFocused(false); // Comentado para mantener dropdown abierto
    }
  };
  
  // Manejar selección de sugerencia
  const handleSuggestionSelect = (suggestion: any) => {
    selectSuggestion(suggestion);
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    }
    // Cerrar completamente el dropdown
    setFocused(false);
    setShowPopper(false);
  };
  
  // Manejar click fuera del componente
  const handleClickAway = () => {
    setFocused(false);
    setShowPopper(false);
  };
  
  // Manejar focus del input
  const handleFocus = () => {
    setFocused(true);
    if (query.length > 0) {
      setShowPopper(true);
    }
  };
  
  // Limpiar búsqueda
  const handleClear = () => {
    clearSearch();
    inputRef.current?.focus();
  };
  
  // Búsqueda por voz (placeholder para futura implementación)
  const handleVoiceSearch = () => {
    // TODO: Implementar búsqueda por voz
    console.log('Búsqueda por voz no implementada aún');
  };
  
  return (
    <Box
      ref={containerRef}
      className={className}
      sx={{
        position: 'relative',
        width: fullWidth ? '100%' : 'auto',
        ...sx,
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          fullWidth={fullWidth}
          size={size}
          variant={variant}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {loading && <CircularProgress size={20} />}
                {query.length > 0 && !loading && (
                  <IconButton
                    size="small"
                    onClick={handleClear}
                    aria-label="Limpiar búsqueda"
                  >
                    <ClearIcon />
                  </IconButton>
                )}
                <IconButton
                  size="small"
                  onClick={handleVoiceSearch}
                  aria-label="Búsqueda por voz"
                  sx={{ ml: 0.5 }}
                >
                  <MicIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={(theme)=>({
            color: theme.palette.text.primary,
            '& .MuiOutlinedInput-root': {
              borderRadius: isMobile ? 2 : 3,
              backgroundColor: theme.palette.background.paper,
              '&.Mui-focused': {
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[4],
              },
            },
          })}
        />
      </form>
      
      {/* Popper con sugerencias y resultados */}
      <ClickAwayListener onClickAway={handleClickAway}>
        <Popper
          open={showPopper}
          anchorEl={anchorEl}
          placement="bottom-start"
          style={{ zIndex: theme.zIndex.modal }}
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 8],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
              },
            },
          ]}
        >
          <Paper
            elevation={8}
            sx={{
              width: anchorEl ? anchorEl.offsetWidth : 'auto',
              maxHeight: isMobile ? '60vh' : '70vh',
              overflow: 'auto',
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            {/* Sugerencias */}
            {showSuggestions && suggestions.length > 0 && (
              <SearchSuggestions
                suggestions={suggestions}
                onSelect={handleSuggestionSelect}
                onSearch={(searchQuery) => {
                  search(searchQuery);
                  // NO navegar aquí, solo mostrar resultados en dropdown
                  // La navegación se hace desde "Ver todos los resultados"
                }}
                query={query}
                loading={loading}
              />
            )}
            
            {/* Resultados de búsqueda */}
            {showResults && results.length > 0 && (
              <SearchResults
                results={results}
                query={query}
                onClose={() => setShowPopper(false)}
                onNavigateToResults={(searchQuery) => {
                  if (onSearch) {
                    onSearch(searchQuery);
                  }
                }}
              />
            )}
            
            {/* Estado vacío */}
            {hasSearched && results.length === 0 && !loading && (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Box
                  component="img"
                  src="/no-results.png"
                  alt="No se encontraron resultados"
                  sx={{ width: 80, height: 80, opacity: 0.6, mb: 2 }}
                />
                <Box sx={{ color: 'text.secondary' }}>
                  No se encontraron productos para "{query}"
                </Box>
                <Box sx={{ color: 'text.secondary', fontSize: '0.875rem', mt: 1 }}>
                  Intenta con otras palabras o revisa la ortografía
                </Box>
              </Box>
            )}
            
            {/* Error */}
            {error && (
              <Box sx={{ p: 2, color: 'error.main', textAlign: 'center' }}>
                {error}
              </Box>
            )}
          </Paper>
        </Popper>
      </ClickAwayListener>
    </Box>
  );
}
