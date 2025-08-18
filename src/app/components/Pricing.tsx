'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  Chip,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  CheckCircle,
  Star,
  ArrowForward,
} from '@mui/icons-material';
import { getAllPlans, Plan } from '@/client/super-admin/plans';

const Pricing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await getAllPlans();
        console.log('Plans response:', response.data);
        setPlans(response.data.plans || []);
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError('Error al cargar los planes. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency || 'ARS',
    }).format(price);
  };

  const formatBillingCycle = (billingCycle: { frequency: number; frequencyType: string }) => {
    const { frequency, frequencyType } = billingCycle;
    if (frequency === 1) {
      return `/${frequencyType}`;
    }
    return `/${frequency} ${frequencyType}s`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'draft':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'draft':
        return 'Borrador';
      default:
        return status;
    }
  };

  const getPlanColor = (index: number) => {
    const colors = ['primary', 'secondary', 'info', 'success'] as const;
    return colors[index % colors.length];
  };

  // Helper function to extract feature information from different data formats
  const getFeatureInfo = (planFeature: any) => {
    // Format 1: planFeature.feature exists (like in first plan)
    if (planFeature.feature) {
      return {
        title: planFeature.feature.title || planFeature.feature.name,
        description: planFeature.feature.description,
        limits: planFeature.limits
      };
    }
    
    // Format 2: direct properties like planFeature.createProducts (like in second plan)
    const featureKeys = Object.keys(planFeature).filter(key => 
      key !== '_id' && key !== 'limits' && typeof planFeature[key] === 'object'
    );
    
    if (featureKeys.length > 0) {
      const featureKey = featureKeys[0];
      const feature = planFeature[featureKey];
      return {
        title: feature.title || featureKey,
        description: feature.description,
        limits: planFeature.limits || feature.limits
      };
    }
    
    return {
      title: 'Característica',
      description: 'Descripción no disponible',
      limits: planFeature.limits
    };
  };

  if (loading) {
    return (
      <Box
        id="pricing"
        sx={{
          py: 8,
          backgroundColor: 'background.default',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        id="pricing"
        sx={{
          py: 8,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  if (plans.length === 0) {
    return (
      <Box
        id="pricing"
        sx={{
          py: 8,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" color="text.secondary">
              No hay planes disponibles en este momento.
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      id="pricing"
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
            Planes y Precios
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Elige el plan que mejor se adapte a tu negocio
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => {
            const planColor = getPlanColor(index);
            const isPopular = index === 1; // El segundo plan como más popular

            return (
              <Grid item xs={12} md={4} key={plan._id}>
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    transform: isPopular ? 'scale(1.05)' : 'scale(1)',
                    '&:hover': {
                      transform: isPopular ? 'scale(1.05) translateY(-8px)' : 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    },
                    border: isPopular ? `2px solid ${theme.palette[planColor].main}` : '2px solid transparent',
                  }}
                  className="fade-in"
                >
                  {isPopular && (
                    <Chip
                      icon={<Star />}
                      label="Más Popular"
                      color={planColor as any}
                      sx={{
                        position: 'absolute',
                        top: -12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                        fontWeight: 600,
                      }}
                    />
                  )}

                  <CardContent sx={{ p: 4, height: '100%' }}>
                    <Stack spacing={3} sx={{ height: '100%' }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="h3"
                          sx={{
                            mb: 1,
                            fontWeight: 700,
                            color: `${planColor}.main`,
                          }}
                        >
                          {plan.name}
                        </Typography>
                        
                        <Typography
                          variant="h2"
                          sx={{
                            mb: 0.5,
                            fontWeight: 700,
                            color: 'text.primary',
                          }}
                        >
                          {formatPrice(plan.price, plan.currency)}
                        </Typography>
                        
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {formatBillingCycle(plan.billingCycle)}
                        </Typography>
                        
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ lineHeight: 1.6, mb: 2 }}
                        >
                          {plan.description}
                        </Typography>

                        <Chip
                          label={getStatusLabel(plan.status)}
                          color={getStatusColor(plan.status) as any}
                          size="small"
                          sx={{ mb: 2 }}
                        />
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Stack spacing={2}>
                          {plan.features.map((planFeature, featureIndex) => {
                            console.log('Plan feature:', planFeature);
                            const featureInfo = getFeatureInfo(planFeature);
                            
                            return (
                              <Stack
                                key={featureIndex}
                                direction="row"
                                spacing={2}
                                alignItems="center"
                              >
                                <CheckCircle
                                  sx={{
                                    fontSize: 20,
                                    color: `${planColor}.main`,
                                    flexShrink: 0,
                                  }}
                                />
                                <Box sx={{ flex: 1 }}>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      color: 'text.primary',
                                      lineHeight: 1.5,
                                      fontWeight: 500,
                                    }}
                                  >
                                    {featureInfo.title}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ lineHeight: 1.4 }}
                                  >
                                    {featureInfo.description}
                                  </Typography>
                                  {featureInfo.limits && (
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      sx={{ 
                                        display: 'block',
                                        mt: 0.5,
                                        fontStyle: 'italic'
                                      }}
                                    >
                                                                             {(() => {
                                         const { min, max, unlimited } = featureInfo.limits;
                                         
                                         // Si es ilimitado, mostrar "Ilimitado" (sin importar min/max)
                                         if (unlimited) {
                                           return 'Ilimitado';
                                         }
                                         
                                         // Si min es 0, solo mostrar el máximo
                                         if (min === 0 || min === null) {
                                           if (max === null || max === undefined) {
                                             return 'Sin límite';
                                           }
                                           return `Hasta ${max}`;
                                         }
                                         
                                         // Si min y max son iguales, mostrar solo un número
                                         if (min === max) {
                                           return `${min}`;
                                         }
                                         
                                         // Si hay rango válido, mostrar min - max
                                         if (min !== null && max !== null) {
                                           return `${min} - ${max}`;
                                         }
                                         
                                         // Caso por defecto
                                         return 'Disponible';
                                       })()}
                                    </Typography>
                                  )}
                                </Box>
                              </Stack>
                            );
                          })}
                        </Stack>
                      </Box>

                      <Box sx={{ textAlign: 'center' }}>
                        <Button
                          variant={isPopular ? 'contained' : 'outlined'}
                          size="large"
                          fullWidth
                          endIcon={<ArrowForward />}
                          disabled={plan.status.toLowerCase() !== 'active'}
                          sx={{
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            backgroundColor: isPopular ? `${planColor}.main` : 'transparent',
                            color: isPopular ? 'white' : `${planColor}.main`,
                            borderColor: `${planColor}.main`,
                            '&:hover': {
                              backgroundColor: isPopular ? `${planColor}.dark` : `${planColor}.50`,
                            },
                            '&:disabled': {
                              backgroundColor: 'grey.300',
                              color: 'grey.500',
                              borderColor: 'grey.300',
                            },
                          }}
                        >
                          {plan.status.toLowerCase() === 'active' 
                            ? (isPopular ? 'Comenzar Ahora' : 'Elegir Plan')
                            : 'No Disponible'
                          }
                        </Button>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            ¿Necesitas un plan personalizado?
          </Typography>
          <Button
            variant="outlined"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
            }}
          >
            Contactar Ventas
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Pricing; 