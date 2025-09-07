'use client';

import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Search,
  Category as CategoryIcon,
  LocalOffer as TagIcon,
} from '@mui/icons-material';
import { SearchSuggestion } from '@/client/search';
import { formatNumber } from '@/utils/products';

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  onSelect: (suggestion: SearchSuggestion) => void;
  onSearch?: (query: string) => void;
  query?: string;
  loading?: boolean;
}

export default function SearchSuggestions({ suggestions, onSelect, onSearch, query, loading = false }: SearchSuggestionsProps) {
  const theme = useTheme();

  const getIcon = (type: string) => {
    switch (type) {
      case 'product':
        return <Search color="primary" />;
      case 'category':
        return <CategoryIcon color="secondary" />;
      case 'tag':
        return <TagIcon color="info" />;
      default:
        return <Search color="action" />;
    }
  };

  const getSecondaryText = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'product' && suggestion.metadata?.price) {
      return `$${formatNumber(suggestion.metadata.price)}`;
    }
    if (suggestion.type === 'category') {
      return 'Categoría';
    }
    return suggestion.type;
  };

  if (loading) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Buscando sugerencias...
        </Typography>
      </Box>
    );
  }

  if (suggestions.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No hay sugerencias disponibles
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="subtitle2" color="text.secondary">
          Sugerencias ({suggestions.length})
        </Typography>
      </Box>
      
      <List sx={{ py: 0, maxHeight: '300px', overflow: 'auto' }}>
        {suggestions.map((suggestion, index) => (
          <React.Fragment key={suggestion.id}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => onSelect(suggestion)}
                sx={{
                  py: 1.5,
                  px: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {getIcon(suggestion.type)}
                </ListItemIcon>
                
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: 'text.primary',
                      }}
                    >
                      {suggestion.text}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {getSecondaryText(suggestion)}
                    </Typography>
                  }
                />
                
                {suggestion.metadata?.imageUrl && (
                  <Box
                    component="img"
                    src={suggestion.metadata.imageUrl}
                    alt={suggestion.text}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      objectFit: 'cover',
                      ml: 1,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
            
            {index < suggestions.length - 1 && (
              <Divider component="li" sx={{ my: 0.5 }} />
            )}
          </React.Fragment>
        ))}
      </List>
      
      {/* Botón "Buscar" - Fuera del scroll */}
      {suggestions.length > 0 && onSearch && query && (
        <>
          <Divider sx={{ my: 0 }} />
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 3,
                py: 1.5,
                backgroundColor: 'primary.main',
                color: 'white',
                borderRadius: 2,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: theme.shadows[2],
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  boxShadow: theme.shadows[4],
                },
              }}
              onClick={() => onSearch(query)}
            >
              <Search sx={{ fontSize: '1.1rem', color: 'white' }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Buscar "{query}"
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
