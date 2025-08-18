'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ArrowForward, PlayArrow } from '@mui/icons-material';

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h1"
                sx={{
                  color: 'white',
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                }}
              >
                Transforma tu negocio en una{' '}
                <span className="gradient-text" style={{ color: 'white' }}>
                  tienda online
                </span>{' '}
                profesional
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 4,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  lineHeight: 1.6,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                Sistema completo de ecommerce que maximiza ventas, optimiza operaciones y genera confianza en los clientes.
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'grey.100',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Comenzar Ahora
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Ver Demo
                </Button>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-end' },
                mt: { xs: 4, md: 0 },
              }}
            >
              <Box
                sx={{
                  width: { xs: '100%', md: '80%' },
                  maxWidth: 500,
                  height: 400,
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 4,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 100,
                    height: 100,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 60,
                    height: 60,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 600,
                    zIndex: 1,
                  }}
                >
                  🛒 Ecommerce Platform
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero; 