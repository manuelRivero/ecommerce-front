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
} from '@mui/material';
import {
  Edit,
  ArrowBack,
  Business,
  Email,
  Phone,
  LocationOn,
  Payment,
  Settings,
  CalendarToday,
  AccountCircle,
  Assessment,
  Info,
} from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import { getTenantById, Tenant } from '@/client/super-admin/tenants';
import TenantLogo from '@/components/shared/TenantLogo';

const TenantDetailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTenant = async () => {
      if (!id) {
        setError('ID de tenant no proporcionado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await getTenantById(id);
        setTenant(response.data.tenant);
      } catch (err: any) {
        console.error('Error fetching tenant:', err);
        setError('Error al cargar los datos del tenant. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [id]);

  const handleEdit = () => {
    if (tenant) {
      router.push(`/super-admin/edit-tenant?id=${tenant._id}`);
    }
  };

  const handleBack = () => {
    router.push('/super-admin/tenants');
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'No disponible';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSubscriptionStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return { label: 'Aprobado', color: 'success' as const };
      case 'pending':
        return { label: 'Pendiente', color: 'warning' as const };
      case 'rejected':
        return { label: 'Rechazado', color: 'error' as const };
      case 'cancelled':
        return { label: 'Cancelado', color: 'error' as const };
      default:
        return { label: 'Desconocido', color: 'default' as const };
    }
  };

  const getPaymentStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return { label: 'Aprobado', color: 'success' as const };
      case 'pending':
        return { label: 'Pendiente', color: 'warning' as const };
      case 'rejected':
        return { label: 'Rechazado', color: 'error' as const };
      case 'cancelled':
        return { label: 'Cancelado', color: 'error' as const };
      default:
        return { label: 'Desconocido', color: 'default' as const };
    }
  };

  const getPreapprovalStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'authorized':
        return { label: 'Autorizado', color: 'success' as const };
      case 'pending':
        return { label: 'Pendiente', color: 'warning' as const };
      case 'cancelled':
        return { label: 'Cancelado', color: 'error' as const };
      default:
        return { label: 'Desconocido', color: 'default' as const };
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
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

  if (error || !tenant) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error || 'Tenant no encontrado'}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleBack}
        >
          Volver a Tenants
        </Button>
      </Container>
    );
  }

  const subscriptionStatus = getSubscriptionStatus(tenant.subscriptionStatus || '');
  const paymentStatus = getPaymentStatus(tenant.subscriptionDetails?.paymentStatus || '');
  const preapprovalStatus = getPreapprovalStatus(tenant.subscriptionDetails?.preapprovalStatus || '');

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handleBack}
              size="small"
            >
              Volver
            </Button>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Detalle del Tenant
            </Typography>
          </Stack>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={handleEdit}
            sx={{ fontWeight: 600 }}
          >
            Editar
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Información Principal */}
        <Grid item xs={12} md={8}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Business sx={{ fontSize: 32, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {tenant.config?.metadata?.title || tenant.subdomain}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Subdominio: {tenant.subdomain}
                  </Typography>
                </Box>
              </Stack>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Email sx={{ color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {tenant.config?.email || 'No configurado'}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Phone sx={{ color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Teléfono
                      </Typography>
                      <Typography variant="body1">
                        {tenant.config?.phone || 'No configurado'}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LocationOn sx={{ color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Dirección
                      </Typography>
                      <Typography variant="body1">
                        {tenant.config?.address || 'No configurado'}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LocationOn sx={{ color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Provincia
                      </Typography>
                      <Typography variant="body1">
                        {tenant.config?.province || 'No configurado'}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LocationOn sx={{ color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Localidad
                      </Typography>
                      <Typography variant="body1">
                        {tenant.config?.locality || 'No configurado'}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LocationOn sx={{ color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Código Postal
                      </Typography>
                      <Typography variant="body1">
                        {tenant.config?.postalCode || 'No configurado'}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <AccountCircle sx={{ color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        CUIL
                      </Typography>
                      <Typography variant="body1">
                        {tenant.config?.cuil || 'No configurado'}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Estado y Configuración */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Estado de Suscripción
                </Typography>
                <Chip
                  label={subscriptionStatus.label}
                  color={subscriptionStatus.color}
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Última actualización: {formatDate(tenant.updatedAt)}
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Configuración
                </Typography>
                <Stack spacing={1}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Configurado
                    </Typography>
                    <Chip
                      label={tenant.hasConfig ? 'Sí' : 'No'}
                      color={tenant.hasConfig ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Suscripción Activa
                    </Typography>
                    <Chip
                      label={tenant.hasActiveSubscription ? 'Sí' : 'No'}
                      color={tenant.hasActiveSubscription ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Detalles de Suscripción */}
        {tenant.subscriptionDetails && (
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <Payment sx={{ fontSize: 24, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Detalles de Suscripción
                  </Typography>
                </Stack>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Plan
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {tenant.subscriptionDetails.planDetails.name}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Precio
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {new Intl.NumberFormat('es-AR', {
                          style: 'currency',
                          currency: tenant.subscriptionDetails.planDetails.currency,
                        }).format(tenant.subscriptionDetails.planDetails.price)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Estado de Pago
                      </Typography>
                      <Chip
                        label={paymentStatus.label}
                        color={paymentStatus.color}
                        size="small"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Preaprobación
                      </Typography>
                      <Chip
                        label={preapprovalStatus.label}
                        color={preapprovalStatus.color}
                        size="small"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Fecha de Inicio
                      </Typography>
                      <Typography variant="body1">
                        {formatDate(tenant.subscriptionDetails.startDate)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Último Pago
                      </Typography>
                      <Typography variant="body1">
                        {formatDate(tenant.subscriptionDetails.lastPaymentDate)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Email de Usuario
                      </Typography>
                      <Typography variant="body1">
                        {tenant.subscriptionDetails.userEmail}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        ID Suscripción MP
                      </Typography>
                      <Typography variant="body1">
                        {tenant.subscriptionDetails.mpSubscriptionId}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Estadísticas de Suscripción */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Assessment sx={{ fontSize: 24, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Estadísticas de Suscripción
                </Typography>
              </Stack>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {tenant.subscriptionStats.totalSubscriptions}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total de Suscripciones
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                      {tenant.subscriptionStats.activeSubscriptions}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Suscripciones Activas
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>
                      {tenant.subscriptionStats.cancelledSubscriptions}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Suscripciones Canceladas
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                      {tenant.subscriptionStats.pausedSubscriptions}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Suscripciones Pausadas
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Metadatos de Configuración */}
        {tenant.config?.metadata && (
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <Info sx={{ fontSize: 24, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Información de la Empresa
                  </Typography>
                </Stack>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Título
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {tenant.config.metadata.title}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Logo
                      </Typography>
                      <Typography variant="body1">
                        <TenantLogo 
                          width={200} 
                          height={40}
                          alt="Logo"
                          showFallback={true}
                        />
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Descripción
                      </Typography>
                      <Typography variant="body1">
                        {tenant.config.metadata.description || 'No disponible'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default TenantDetailPage;
