'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Edit,
  ArrowBack,
  AttachMoney,
  Description,
  Schedule,
  CheckCircle,
  Settings,
  CalendarToday,
  Info,
  Star,
  Security,
  Speed,
  Storage,
} from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPlanById, Plan } from '@/client/super-admin/plans';

const PlanDetailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      if (!id) {
        setError('ID de plan no proporcionado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await getPlanById(id);
        console.log('Plan response:', response.data); // Debug log
        setPlan(response.data.plan);
      } catch (err: any) {
        console.error('Error fetching plan:', err);
        setError('Error al cargar los datos del plan. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  const handleEdit = () => {
    if (plan) {
      router.push(`/super-admin/create-plan?id=${plan._id}`);
    }
  };

  const handleBack = () => {
    router.push('/super-admin/plans');
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const formatBillingCycle = (billingCycle: { frequency: number; frequencyType: string }) => {
    if (!billingCycle) return 'N/A';
    const { frequency, frequencyType } = billingCycle;
    const typeMap: { [key: string]: string } = {
      'monthly': 'mensual',
      'yearly': 'anual',
      'weekly': 'semanal',
      'daily': 'diario',
    };
    
    return `Cada ${frequency || 1} ${typeMap[frequencyType] || frequencyType || 'mes'}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
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
    switch (status) {
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

  const getFeatureIcon = (featureName: string) => {
    if (!featureName) return <CheckCircle />;
    const name = featureName.toLowerCase();
    if (name.includes('storage') || name.includes('almacenamiento')) return <Storage />;
    if (name.includes('speed') || name.includes('velocidad')) return <Speed />;
    if (name.includes('security') || name.includes('seguridad')) return <Security />;
    if (name.includes('premium') || name.includes('pro')) return <Star />;
    return <CheckCircle />;
  };

  const formatFeatureLimit = (limits: { max: number; min: number; unlimited: boolean }) => {
    if (!limits) return 'N/A';
    if (limits.unlimited) {
      return 'Ilimitado';
    }
    if (limits.max === limits.min) {
      return limits.max.toString();
    }
    return `${limits.min} - ${limits.max}`;
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Volver a Planes
        </Button>
      </Container>
    );
  }

  if (!plan) {
    return (
      <Container maxWidth="lg">
        <Alert severity="warning" sx={{ mt: 2 }}>
          Plan no encontrado
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Volver a Planes
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleBack}
            sx={{ minWidth: 'auto' }}
          >
            Volver
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Detalle del Plan
          </Typography>
        </Stack>
        
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {plan.name}
          </Typography>
          <Chip
            label={getStatusLabel(plan.status)}
            color={getStatusColor(plan.status) as any}
            variant="outlined"
          />
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Información Principal */}
        <Grid item xs={12} md={8}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Info sx={{ fontSize: 24, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Información General
                </Typography>
              </Stack>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Descripción
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {plan.description || 'Sin descripción'}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      ID del Plan
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>
                      {plan._id}
                    </Typography>
                  </Box>
                </Grid>

                {plan.mpPlanId && (
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        ID Mercado Pago
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>
                        {plan.mpPlanId}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>

          {/* Características del Plan */}
          <Card variant="outlined" sx={{ mt: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Settings sx={{ fontSize: 24, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Características Incluidas
                </Typography>
              </Stack>

              {plan.features && plan.features.length > 0 ? (
                <List>
                  {plan.features.map((planFeature, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          {getFeatureIcon(planFeature?.feature?.name || '')}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {planFeature?.feature?.title || 'Característica sin nombre'}
                              </Typography>
                              <Chip
                                label={planFeature?.feature?.featureType === 'binary' ? 'Binaria' : 'Contable'}
                                color={planFeature?.feature?.featureType === 'binary' ? 'primary' : 'secondary'}
                                size="small"
                                variant="outlined"
                              />
                              <Chip
                                label={planFeature?.enabled ? 'Habilitada' : 'Deshabilitada'}
                                color={planFeature?.enabled ? 'success' : 'error'}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          }
                          secondary={
                            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                              {planFeature?.limits && (
                                <Chip
                                  label={formatFeatureLimit(planFeature.limits)}
                                  size="small"
                                  variant="outlined"
                                  color="primary"
                                />
                              )}
                            </Stack>
                          }
                        />
                      </ListItem>
                      {index < plan.features.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No hay características configuradas para este plan.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Panel Lateral */}
        <Grid item xs={12} md={4}>
          {/* Precio y Facturación */}
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <AttachMoney sx={{ fontSize: 24, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Precio y Facturación
                </Typography>
              </Stack>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Precio
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {formatPrice(plan.price, plan.currency)}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Ciclo de Facturación
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatBillingCycle(plan.billingCycle)}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Estado
                  </Typography>
                  <Chip
                    label={getStatusLabel(plan.status)}
                    color={getStatusColor(plan.status) as any}
                    variant="filled"
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Fechas */}
          <Card variant="outlined" sx={{ mt: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <CalendarToday sx={{ fontSize: 24, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Fechas
                </Typography>
              </Stack>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Creado
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatDate(plan.createdAt)}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Última Actualización
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatDate(plan.updatedAt)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Acciones */}
          <Card variant="outlined" sx={{ mt: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Edit sx={{ fontSize: 24, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Acciones
                </Typography>
              </Stack>

              <Button
                variant="contained"
                fullWidth
                startIcon={<Edit />}
                onClick={handleEdit}
                sx={{ mb: 2 }}
              >
                Editar Plan
              </Button>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<ArrowBack />}
                onClick={handleBack}
              >
                Volver a Planes
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlanDetailPage;
