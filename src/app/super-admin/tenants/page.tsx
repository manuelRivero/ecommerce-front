'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Stack,
} from '@mui/material';
import {
  Visibility,
  Edit,
  Add,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { getAllTenants, Tenant } from '@/client/super-admin/tenants';

const TenantsPage = () => {
  const router = useRouter();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllTenants();
        setTenants(response.data.tenants || []);
      } catch (err: any) {
        console.error('Error fetching tenants:', err);
        setError('Error al cargar los tenants. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  const handleView = (tenant: Tenant) => {
    router.push(`/super-admin/tenant-detail?id=${tenant._id}`);
  };

  const handleEdit = (tenant: Tenant) => {
    router.push(`/super-admin/edit-tenant?id=${tenant._id}`);
  };

  const handleCreate = () => {
    router.push('/super-admin/create-tenant');
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'No disponible';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Tenants
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreate}
            sx={{ fontWeight: 600 }}
          >
            Crear Tenant
          </Button>
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Gestiona todos los tenants del sistema
        </Typography>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
                         <TableHead>
               <TableRow>
                 <TableCell sx={{ fontWeight: 600 }}>Subdominio</TableCell>
                 <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                 <TableCell sx={{ fontWeight: 600 }}>Teléfono</TableCell>
                 <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
                 <TableCell sx={{ fontWeight: 600 }}>Estado Suscripción</TableCell>
                 <TableCell sx={{ fontWeight: 600 }}>Estado Pago</TableCell>
                 <TableCell sx={{ fontWeight: 600 }}>Configurado</TableCell>
                 <TableCell sx={{ fontWeight: 600 }}>Acciones</TableCell>
               </TableRow>
             </TableHead>
            <TableBody>
                             {tenants.length === 0 ? (
                 <TableRow>
                   <TableCell colSpan={8} sx={{ textAlign: 'center', py: 4 }}>
                     <Typography variant="body1" color="text.secondary">
                       No hay tenants registrados
                     </Typography>
                   </TableCell>
                 </TableRow>
                               ) : (
                  tenants.map((tenant) => {
                    const subscriptionStatus = getSubscriptionStatus(tenant.subscriptionStatus || '');
                    const paymentStatus = getPaymentStatus(tenant.subscriptionDetails?.paymentStatus || '');
                    
                    return (
                      <TableRow key={tenant._id} hover>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {tenant.subdomain}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {tenant.config?.email || 'No configurado'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {tenant.config?.phone || 'No configurado'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {tenant.subscriptionDetails?.planDetails?.name || tenant.planName || 'Sin plan'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {tenant.hasActiveSubscription ? (
                            <Chip
                              label={subscriptionStatus.label}
                              color={subscriptionStatus.color}
                              size="small"
                            />
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              Sin suscripción
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {tenant.subscriptionDetails ? (
                            <Chip
                              label={paymentStatus.label}
                              color={paymentStatus.color}
                              size="small"
                            />
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              Sin datos
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={tenant.hasConfig ? 'Sí' : 'No'}
                            color={tenant.hasConfig ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              size="small"
                              onClick={() => handleView(tenant)}
                              sx={{ color: 'primary.main' }}
                            >
                              <Visibility />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(tenant)}
                              sx={{ color: 'secondary.main' }}
                            >
                              <Edit />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default TenantsPage;
