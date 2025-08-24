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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import {
  CheckCircle,
  Star,
  ArrowForward,
  Info,
  Close,
} from '@mui/icons-material';
import { getAllPlans, Plan } from '@/client/super-admin/plans';

const Pricing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await getAllPlans({searchAvailable:true});
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
    
    // Función para traducir el tipo de frecuencia
    const translateFrequencyType = (type: string) => {
      switch (type.toLowerCase()) {
        case 'day':
        case 'days':
          return 'día';
        case 'week':
        case 'weeks':
          return 'semana';
        case 'month':
        case 'months':
          return 'mes';
        case 'year':
        case 'years':
          return 'año';
        default:
          return type;
      }
    };

    const translatedType = translateFrequencyType(frequencyType);
    
    if (frequency === 1) {
      return `/${translatedType}`;
    }
    
    // Manejar plurales en español
    const pluralType = frequency > 1 ? `${translatedType}es` : translatedType;
    return `/${frequency} ${pluralType}`;
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

  const handleOpenModal = (plan: Plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPlan(null);
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
            sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}
          >
            Conoce nuestros planes y sus características
          </Typography>

          {/* Nota informativa sobre activación */}
          <Box
            sx={{
              p: 2,
              background: 'rgba(25, 118, 210, 0.1)',
              border: '1px solid rgba(25, 118, 210, 0.3)',
              borderRadius: 2,
              maxWidth: 600,
              mx: 'auto',
              mb: 4,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <Info sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography
                variant="body2"
                sx={{
                  color: 'primary.main',
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                Los planes se activan desde el panel de administración una vez creada tu tienda
              </Typography>
            </Stack>
          </Box>

          {/* Mensaje destacado de 0% comisión */}
          <Box
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: 3,
              border: '2px solid #10b981',
              maxWidth: 500,
              mx: 'auto',
              mb: 4,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
              <CheckCircle sx={{ color: 'white', fontSize: 28 }} />
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                ¡0% comisión por ventas! - Mantén el 100% de tus ganancias
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                mt: 1,
              }}
            >
              Sin comisiones ocultas ni cargos adicionales por transacciones
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => {
            const planColor = getPlanColor(index);
            const isPopular = index === 1; // El segundo plan como más popular

            return (
              <Grid item xs={12} md={4} key={plan._id}>
                <Card
                  sx={{
                    overflow: 'visible',
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
                      </Box>

                      {/* Espacio para mantener la estructura */}
                      <Box sx={{ flex: 1 }} />

                      <Box sx={{ textAlign: 'center' }}>
                        <Button
                          variant={isPopular ? 'contained' : 'outlined'}
                          size="large"
                          fullWidth
                          endIcon={<ArrowForward />}
                          onClick={() => handleOpenModal(plan)}
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
                          }}
                        >
                          Ver Detalles
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

      {/* Modal con información detallada del plan */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
          },
        }}
      >
        {selectedPlan && (
          <>
            <DialogTitle
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {selectedPlan.name}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {formatPrice(selectedPlan.price, selectedPlan.currency)}
                  {formatBillingCycle(selectedPlan.billingCycle)}
                </Typography>
              </Box>
              <Button
                onClick={handleCloseModal}
                sx={{ color: 'white', minWidth: 'auto' }}
              >
                <Close />
              </Button>
            </DialogTitle>

            <DialogContent sx={{ p: 4 }}>
              <Stack spacing={4}>
                {/* Descripción */}
                <Box>
                  <Typography variant="h6" sx={{ mt: 2, mb: 2, fontWeight: 600 }}>
                    Descripción del Plan
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    {selectedPlan.description}
                  </Typography>
                </Box>

                {/* Características */}
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Características Incluidas
                  </Typography>
                  <List>
                    {selectedPlan.features.map((planFeature, index) => {
                      const featureInfo = getFeatureInfo(planFeature);
                      
                      return (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckCircle sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {featureInfo.title}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body2" color="text.secondary">
                                {featureInfo.description}
                              </Typography>
                            }
                          />
                          {featureInfo.limits && (
                            <Chip
                              label={(() => {
                                const { min, max, unlimited } = featureInfo.limits;
                                
                                if (unlimited) {
                                  return 'Ilimitado';
                                }
                                
                                if (min === 0 || min === null) {
                                  if (max === null || max === undefined) {
                                    return 'Sin límite';
                                  }
                                  return `Hasta ${max}`;
                                }
                                
                                if (min === max) {
                                  return `${min}`;
                                }
                                
                                if (min !== null && max !== null) {
                                  return `${min} - ${max}`;
                                }
                                
                                return 'Disponible';
                              })()}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          )}
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>



                {/* Nota sobre activación */}
                <Box
                  sx={{
                    p: 3,
                    background: 'rgba(25, 118, 210, 0.1)',
                    border: '1px solid rgba(25, 118, 210, 0.3)',
                    borderRadius: 2,
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Info sx={{ color: 'primary.main', fontSize: 24 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        ¿Cómo activar este plan?
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        1. Crea tu tienda usando el formulario de registro
                        <br />
                        2. Accede al panel de administración
                        <br />
                        3. Selecciona y activa el plan que mejor se adapte a tus necesidades
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleCloseModal}
                sx={{ px: 4, py: 1.5 }}
              >
                Cerrar
              </Button>
              <Button
                variant="contained"
                component="a"
                href="/crear-tienda"
                sx={{ px: 4, py: 1.5 }}
              >
                Crear Mi Tienda
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Pricing; 