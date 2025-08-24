'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp,
  Store,
  Smartphone,
  Cloud,
  CheckCircle,
  ArrowForward,
} from '@mui/icons-material';

const Benefits = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const benefits = [
    {
      icon: <CheckCircle sx={{ fontSize: 40, color: 'success.main' }} />,
      title: '0% Comisión por Ventas',
      description: 'Mantén el 100% de tus ganancias. No cobramos comisiones por transacciones.',
      metrics: ['Sin comisiones ocultas', '100% de ganancias', 'Transparencia total'],
      color: 'success',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Aumento de Ventas',
      description: 'Optimización de conversiones y reducción de abandonos de carrito.',
      metrics: ['+150% conversiones', '+200% alcance', '+300% rentabilidad'],
      color: 'success',
    },
    {
      icon: <Store sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Gestión Completa',
      description: 'Control total de productos, inventario y promociones desde un solo lugar.',
      metrics: ['Catálogo de productos', 'Gestión de stock', 'Promociones', 'Banners publicitarios'],
      color: 'primary',
    },
    {
      icon: <Smartphone sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Experiencia Móvil',
      description: 'Diseño responsive que funciona perfectamente en todos los dispositivos.',
      metrics: ['100% responsive', 'Experiencia de usuario fluida'],
      color: 'secondary',
    },
    {
      icon: <Cloud sx={{ fontSize: 40, color: 'info.main' }} />,
      title: 'Escalabilidad',
      description: 'Crece con tu negocio sin preocuparte por nada',
      metrics: ['Escalado a demanda', 'Alta disponibilidad'],
      color: 'info',
    },
  ];

  return (
    <Box
      id="benefits"
      sx={{
        py: 8,
        backgroundColor: 'grey.50',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Beneficios del Sistema
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Transforma tu negocio y maximiza tus resultados
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  },
                }}
                className="fade-in"
              >
                <CardContent sx={{ p: 4, height: '100%' }}>
                  <Stack spacing={3} sx={{ height: '100%' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      {benefit.icon}
                    </Box>
                    
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          mb: 2,
                          fontWeight: 600,
                          textAlign: 'center',
                        }}
                      >
                        {benefit.title}
                      </Typography>
                      
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          textAlign: 'center',
                          lineHeight: 1.6,
                          fontSize: '1.1rem',
                        }}
                      >
                        {benefit.description}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 'auto' }}>
                      <Stack spacing={2}>
                        {benefit.metrics.map((metric, metricIndex) => (
                          <Stack
                            key={metricIndex}
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{
                              p: 2,
                              backgroundColor: `${benefit.color}.50`,
                              borderRadius: 2,
                              border: `1px solid ${theme.palette[benefit.color as keyof typeof theme.palette].main}20`,
                            }}
                          >
                            <CheckCircle
                              sx={{
                                fontSize: 20,
                                color: `${benefit.color}.main`,
                              }}
                            />
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 500,
                                color: 'text.primary',
                              }}
                            >
                              {metric}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            ¿Listo para transformar tu negocio?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 4,
              fontSize: '1.1rem',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Únete a cientos de empresarios que ya han transformado sus negocios con nuestra plataforma
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Benefits; 