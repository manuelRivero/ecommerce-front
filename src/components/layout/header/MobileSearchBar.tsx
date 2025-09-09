'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  Collapse,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useSmartSearch } from '@/hooks/useSmartSearch';
import SearchSuggestions from '@/components/shared/SmartSearchBar/SearchSuggestions';

interface MobileSearchBarProps {
  tenant: string;
  onSearch: (query: string) => void;
  onSuggestionSelect: (suggestion: any) => void;
  onClose: () => void;
}

export default function MobileSearchBar({ 
  tenant, 
  onSearch, 
  onSuggestionSelect, 
  onClose 
}: MobileSearchBarProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  
  const {
    query,
    suggestions,
    loading,
    setQuery,
    getSuggestions,
    clearSearch,
  } = useSmartSearch({
    tenant,
    debounceMs: 300,
    minQueryLength: 2,
    maxSuggestions: 6,
    autoSearch: true,
    cacheResults: true,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    
    if (newQuery.length > 0) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      onClose();
    }
  };

  const handleSuggestionSelect = (suggestion: any) => {
    onSuggestionSelect(suggestion);
    onClose();
  };

  const handleClear = () => {
    clearSearch();
    setExpanded(false);
  };

  return (
    <Box sx={{ 
      width: '100%',
      position: 'relative',
    }}>
      <form onSubmit={handleSubmit}>
        <TextField
          value={query}
          onChange={handleInputChange}
          placeholder="Buscar productos..."
          fullWidth
          size="small"
          variant="outlined"
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={onClose}
                  aria-label="Cerrar búsqueda"
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '&.Mui-focused': {
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[2],
              },
            },
          }}
        />
      </form>

      {/* Sugerencias colapsables */}
      <Collapse in={expanded && suggestions.length > 0}>
        <Box sx={{ 
          mt: 1,
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: theme.zIndex.modal,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: theme.shadows[4],
          border: `1px solid ${theme.palette.divider}`,
          maxHeight: '70vh',
          overflowY: 'auto',
        }}>
          <SearchSuggestions
            suggestions={suggestions}
            onSelect={handleSuggestionSelect}
            onSearch={(searchQuery) => {
              onSearch(searchQuery);
              onClose();
            }}
            query={query}
            loading={loading}
          />
        </Box>
      </Collapse>
    </Box>
  );
}
