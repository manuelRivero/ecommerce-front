'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  CircularProgress,
  Alert,
  Stack,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Save,
} from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import { getTenantById, updateTenant, Tenant } from '@/client/super-admin/tenants';

const EditTenantPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    subdomain: '',
    hasConfig: false,
    hasActiveSubscription: false,
    subscriptionStatus: '',
    planName: '',
    config: {
      phone: '',
      email: '',
      address: '',
      province: '',
      postalCode: '',
      locality: '',
      cuil: '',
      metadata: {
        title: '',
        description: '',
        logo: '',
      },
    },
  });

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
        const tenantData = response.data.tenant;
        setTenant(tenantData);
        
        // Pre-fill form with existing data
        setFormData({
          subdomain: tenantData.subdomain || '',
          hasConfig: tenantData.hasConfig || false,
          hasActiveSubscription: tenantData.hasActiveSubscription || false,
          subscriptionStatus: tenantData.subscriptionStatus || '',
          planName: tenantData.planName || '',
          config: {
            phone: tenantData.config?.phone || '',
            email: tenantData.config?.email || '',
            address: tenantData.config?.address || '',
            province: tenantData.config?.province || '',
            postalCode: tenantData.config?.postalCode || '',
            locality: tenantData.config?.locality || '',
            cuil: tenantData.config?.cuil || '',
            metadata: {
              title: tenantData.config?.metadata?.title || '',
              description: tenantData.config?.metadata?.description || '',
              logo: tenantData.config?.metadata?.logo || '',
            },
          },
        });
      } catch (err: any) {
        console.error('Error fetching tenant:', err);
        setError('Error al cargar los datos del tenant. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [id]);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const parts = field.split('.');
      setFormData(prev => {
        const newData = { ...prev };
        let current: any = newData;
        
        // Navigate to the nested object
        for (let i = 0; i < parts.length - 1; i++) {
          current = current[parts[i]];
        }
        
        // Set the final value
        current[parts[parts.length - 1]] = value;
        
        return newData;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tenant) return;

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      const updateData = {
        ...formData,
        // Preserve fields that shouldn't be updated
        _id: tenant._id,
        createdAt: tenant.createdAt,
        updatedAt: tenant.updatedAt,
        subscriptionDetails: tenant.subscriptionDetails,
        subscriptionStats: tenant.subscriptionStats,
      };

      await updateTenant(tenant._id, updateData);
      
      setSuccess('Tenant actualizado exitosamente');
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/super-admin/tenants');
      }, 2000);
      
    } catch (err: any) {
      console.error('Error updating tenant:', err);
      setError('Error al actualizar el tenant. Por favor, intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/super-admin/tenants');
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

  if (error && !tenant) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleBack}
            size="small"
          >
            Volver
          </Button>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Editar Tenant
          </Typography>
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Modifica la información del tenant
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 4 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Información Básica */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Información Básica
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Subdominio"
                      value={formData.subdomain}
                      onChange={(e) => handleInputChange('subdomain', e.target.value)}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Plan Name"
                      value={formData.planName}
                      onChange={(e) => handleInputChange('planName', e.target.value)}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={formData.config.email}
                      onChange={(e) => handleInputChange('config.email', e.target.value)}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Teléfono"
                      value={formData.config.phone}
                      onChange={(e) => handleInputChange('config.phone', e.target.value)}
                      required
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Configuración */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Configuración
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.hasConfig}
                          onChange={(e) => handleInputChange('hasConfig', e.target.checked)}
                        />
                      }
                      label="Tiene Configuración"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.hasActiveSubscription}
                          onChange={(e) => handleInputChange('hasActiveSubscription', e.target.checked)}
                        />
                      }
                      label="Tiene Suscripción Activa"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Estado de Suscripción"
                      value={formData.subscriptionStatus}
                      onChange={(e) => handleInputChange('subscriptionStatus', e.target.value)}
                      select
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">Seleccionar estado</option>
                      <option value="approved">Aprobado</option>
                      <option value="pending">Pendiente</option>
                      <option value="rejected">Rechazado</option>
                      <option value="cancelled">Cancelado</option>
                    </TextField>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Dirección */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Dirección
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Dirección"
                      value={formData.config.address}
                      onChange={(e) => handleInputChange('config.address', e.target.value)}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Provincia"
                      value={formData.config.province}
                      onChange={(e) => handleInputChange('config.province', e.target.value)}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Localidad"
                      value={formData.config.locality}
                      onChange={(e) => handleInputChange('config.locality', e.target.value)}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Código Postal"
                      value={formData.config.postalCode}
                      onChange={(e) => handleInputChange('config.postalCode', e.target.value)}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="CUIL"
                      value={formData.config.cuil}
                      onChange={(e) => handleInputChange('config.cuil', e.target.value)}
                      placeholder="XX-XXXXXXXX-X"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Metadatos de la Empresa */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Información de la Empresa
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Título de la Empresa"
                      value={formData.config.metadata.title}
                      onChange={(e) => handleInputChange('config.metadata.title', e.target.value)}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="URL del Logo"
                      value={formData.config.metadata.logo}
                      onChange={(e) => handleInputChange('config.metadata.logo', e.target.value)}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Descripción"
                      multiline
                      rows={3}
                      value={formData.config.metadata.description}
                      onChange={(e) => handleInputChange('config.metadata.description', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Botones de Acción */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={submitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                disabled={submitting}
                sx={{ fontWeight: 600 }}
              >
                {submitting ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditTenantPage;
