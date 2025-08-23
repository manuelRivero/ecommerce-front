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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ShoppingCart,
  Payment,
  Analytics,
  Security,
  Speed,
  Support,
  TrendingUp,
  Store,
  Smartphone,
  Cloud,
  CheckCircle,
} from '@mui/icons-material';

const Features = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <ShoppingCart sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Experiencia de Compra Optimizada',
      description: 'Navegación intuitiva, carrito inteligente y checkout simplificado para maximizar conversiones.',
      benefits: ['Banners promocionales', 'Categorías organizadas', 'Productos destacados'],
    },
    {
      icon: <Payment sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Proceso de Pago Seguro',
      description: 'Integración con Mercado Pago para transacciones seguras y confiables.',
      benefits: ['Pagos seguros', 'Protección al comprador'],
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Seguridad y Confiabilidad',
      description: 'Protección de datos y altas normativas de seguridad.',
      benefits: ['Datos protegidos', 'Encriptación',],
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Rendimiento Optimizado',
      description: 'Carga rápida y experiencia fluida en todos los dispositivos.',
      benefits: ['Carga rápida', 'Responsive design', 'Optimización móvil'],
    },
  ];

  return (
    <Box
      id="features"
      sx={{
        py: 8,
        backgroundColor: 'background.default',
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
            Características Principales
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Todo lo que necesitas para crear una tienda online exitosa
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
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
                <CardContent sx={{ p: 3, height: '100%' }}>
                  <Stack spacing={3} sx={{ height: '100%' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      {feature.icon}
                    </Box>
                    
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 2,
                          fontWeight: 600,
                          textAlign: 'center',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          textAlign: 'center',
                          lineHeight: 1.6,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 'auto' }}>
                      <Stack spacing={1}>
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <Stack
                            key={benefitIndex}
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <CheckCircle
                              sx={{
                                fontSize: 16,
                                color: 'success.main',
                              }}
                            />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {benefit}
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
      </Container>
    </Box>
  );
};

export default Features; 