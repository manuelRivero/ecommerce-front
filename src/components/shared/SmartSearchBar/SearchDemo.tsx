'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SmartSearchBar from './index';

export default function SearchDemo() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSearch = (query: string) => {
    console.log('🔍 Búsqueda realizada:', query);
    // Aquí puedes implementar la navegación o mostrar resultados
  };

  const handleSuggestionSelect = (suggestion: any) => {
    console.log('💡 Sugerencia seleccionada:', suggestion);
    // Aquí puedes implementar la navegación según el tipo
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={4}>
          <Box textAlign="center">
            <Typography variant="h4" component="h1" gutterBottom>
              🚀 Demo de Búsqueda Inteligente
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Prueba la funcionalidad de búsqueda con algoritmos de similitud
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Barra de Búsqueda Principal
            </Typography>
            <SmartSearchBar
              tenant="demo-tenant"
              placeholder="Escribe para buscar productos..."
              onSearch={handleSearch}
              onSuggestionSelect={handleSuggestionSelect}
              size={isMobile ? 'small' : 'medium'}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                  },
                  '&.Mui-focused': {
                    boxShadow: theme.shadows[6],
                  },
                },
              }}
            />
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Búsqueda Compacta
            </Typography>
            <SmartSearchBar
              tenant="demo-tenant"
              placeholder="Búsqueda compacta..."
              size="small"
              fullWidth={false}
              sx={{ width: 300 }}
            />
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Búsqueda con Estilo Personalizado
            </Typography>
            <SmartSearchBar
              tenant="demo-tenant"
              placeholder="Estilo personalizado..."
              variant="filled"
              sx={{
                '& .MuiFilledInput-root': {
                  backgroundColor: theme.palette.grey[100],
                  '&:hover': {
                    backgroundColor: theme.palette.grey[200],
                  },
                  '&.Mui-focused': {
                    backgroundColor: theme.palette.primary[50],
                  },
                },
              }}
            />
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              💡 <strong>Características:</strong> Debounce automático, sugerencias en tiempo real, 
              algoritmo de Levenshtein, cache inteligente, responsive design
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
