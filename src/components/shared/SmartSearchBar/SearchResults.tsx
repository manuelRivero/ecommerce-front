'use client';

import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  useTheme,
  IconButton,
  Rating,
} from '@mui/material';
import {
  Close as CloseIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { SearchProduct } from '@/interfaces/products';
import { finalPrice, formatNumber } from '@/utils/products';

interface SearchResultsProps {
  results: SearchProduct[];
  query: string;
  onClose: () => void;
  onNavigateToResults?: (query: string) => void;
}

export default function SearchResults({ results, query, onClose, onNavigateToResults }: SearchResultsProps) {
  const theme = useTheme();
  const router = useRouter();

  const handleProductClick = (product: SearchProduct) => {
    // Navegar al detalle del producto
    router.push(`/detalle-producto/${product._id}`);
    onClose();
  };


  return (
    <Box>
      {/* Header con resultados y botón de cerrar */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="subtitle2" color="text.primary">
            Resultados para "{query}"
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {results.length} producto{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
        
        <IconButton
          size="small"
          onClick={onClose}
          sx={{ color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Lista de resultados */}
      <List sx={{ py: 0, maxHeight: '400px', overflow: 'auto' }}>
        {results.map((product, index) => (
          <React.Fragment key={product._id}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleProductClick(product)}
                sx={{
                  py: 1.5,
                  px: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemAvatar sx={{ minWidth: 56 }}>
                  <Avatar
                    variant="rounded"
                    src={product.images[0]?.url}
                    alt={product.name}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1,
                    }}
                  />
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: 'text.primary',
                        mb: 0.5,
                      }}
                    >
                      {product.name}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        {product.categoryDetail?.name ? `Categoría: ${product.categoryDetail.name}` : 'Sin categoría'}
                      </Typography>
                      
                      {/* Rating */}
                      {product.averageRating !== undefined && product.averageRating > 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                          <Rating
                            value={product.averageRating}
                            precision={0.1}
                            size="small"
                            readOnly
                            sx={{ fontSize: '0.875rem' }}
                          />
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: '0.75rem' }}
                          >
                            ({product.totalReviews || 0})
                          </Typography>
                        </Box>
                      )}
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {product.discount && product.discount > 0 && (
                          <Typography
                            variant="caption"
                            sx={{
                              textDecoration: 'line-through',
                              color: 'text.disabled',
                            }}
                          >
                            ${formatNumber(product.price)}
                          </Typography>
                        )}
                        
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: 'primary.main',
                          }}
                        >
                          ${formatNumber(finalPrice(product.price, product.discount ?? 0 + (product.offerDiscount ?? 0)))}
                        </Typography>
                        
                        {product.discount && product.discount > 0 && (
                          <Chip
                            label={`-${product.discount}%`}
                            size="small"
                            color="error"
                            sx={{ height: 20, fontSize: '0.75rem' }}
                          />
                        )}
                      </Box>
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
            
            {index < results.length - 1 && (
              <Divider component="li" sx={{ my: 0.5 }} />
            )}
          </React.Fragment>
        ))}
      </List>

      {/* Footer con acción de ver todos */}
      {results.length > 0 && (
        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 1.5,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
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
                transform: 'translateY(-1px)',
              },
            }}
            onClick={() => {
              if (onNavigateToResults) {
                onNavigateToResults(query);
              }
              onClose();
            }}
          >
            <SearchIcon sx={{ fontSize: '1.1rem' }} />
            Ver todos los resultados ({results.length})
          </Box>
        </Box>
      )}
    </Box>
  );
}
