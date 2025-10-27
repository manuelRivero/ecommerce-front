'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAllPlanFeatures, Feature } from '@/client';

export default function FeatureDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const featureId = searchParams.get('id');
  
  const [feature, setFeature] = useState<Feature | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    if (featureId) {
      loadFeature();
    }
  }, [featureId]);

  const loadFeature = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getAllPlanFeatures();
      const foundFeature = response.data.data.find(f => f._id === featureId);
      
      if (foundFeature) {
        setFeature(foundFeature);
      } else {
        setError('Característica no encontrada.');
        setShowErrorModal(true);
      }
    } catch (error: any) {
      console.error('Error loading feature:', error);
      setError('Error al cargar la característica. Por favor, intenta de nuevo.');
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (feature) {
      router.push(`/super-admin/create-feature?id=${feature._id}`);
    }
  };

  const handleBack = () => {
    router.push('/super-admin/features');
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!feature) {
    return (
      <Box sx={{ maxWidth: 800, margin: '0 auto', p: 3 }}>
        <Typography variant="h5" color="error" textAlign="center">
          Característica no encontrada
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="outlined" onClick={handleBack}>
            Volver a la lista
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Volver
          </Button>
          <Typography variant="h4">
            Detalle de Característica
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={handleEdit}
        >
          Editar
        </Button>
      </Box>

      {/* Feature Details */}
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Información Básica
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Nombre
                </Typography>
                <Typography variant="h6" fontWeight="medium">
                  {feature.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Título
                </Typography>
                <Typography variant="h6" fontWeight="medium">
                  {feature.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Tipo de Característica
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={feature.featureType === 'binary' ? 'Binaria' : 'Contable'}
                    color={feature.featureType === 'binary' ? 'primary' : 'secondary'}
                    variant="outlined"
                  />
                  <Typography variant="body2" color="text.secondary">
                    {feature.featureType === 'binary' ? 'Sí/No' : 'Con límites'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Estado
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={feature.enabled ? 'Habilitada' : 'Deshabilitada'}
                    color={feature.enabled ? 'success' : 'error'}
                    variant="outlined"
                  />
                  <Chip
                    label={feature.isActive ? 'Activa' : 'Inactiva'}
                    color={feature.isActive ? 'success' : 'error'}
                    variant="outlined"
                  />
                  <Chip
                    label={feature.hidden ? 'Oculta' : 'Visible'}
                    color={feature.hidden ? 'secondary' : 'primary'}
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Descripción
                </Typography>
                <Typography variant="body1">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Descripción Extendida
                </Typography>
                {feature.extendedDescription ? (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.extendedDescription.headline}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {feature.extendedDescription.intro}
                    </Typography>
                    
                    <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                      Beneficios:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {feature.extendedDescription.benefits.map((benefit, index) => (
                        <Typography key={index} component="li" variant="body1">
                          {benefit}
                        </Typography>
                      ))}
                    </Box>
                    
                    <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                      Razones de Pérdida:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {feature.extendedDescription.lossReasons.map((reason, index) => (
                        <Typography key={index} component="li" variant="body1">
                          {reason}
                        </Typography>
                      ))}
                    </Box>
                    
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      {feature.extendedDescription.closing}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body1">
                    No disponible
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Status Information */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              Estado y Configuración
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Estado
                </Typography>
                <Chip
                  label={feature.isActive ? 'Activa' : 'Inactiva'}
                  color={feature.isActive ? 'success' : 'default'}
                  variant="outlined"
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Habilitada
                </Typography>
                <Chip
                  label={feature.enabled ? 'Sí' : 'No'}
                  color={feature.enabled ? 'success' : 'error'}
                  variant="outlined"
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Timestamps */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              Información Temporal
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Fecha de Creación
                </Typography>
                <Typography variant="body1">
                  {formatDate(feature.createdAt)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Última Actualización
                </Typography>
                <Typography variant="body1">
                  {formatDate(feature.updatedAt)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Error Modal */}
      <Dialog open={showErrorModal} onClose={() => setShowErrorModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: 'error.main' }}>
          Error
        </DialogTitle>
        <DialogContent>
          <Typography color="error">
            {error}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowErrorModal(false)}
            variant="outlined"
            color="primary"
          >
            Cerrar
          </Button>
          <Button
            onClick={() => {
              setShowErrorModal(false);
              loadFeature();
            }}
            variant="contained"
            color="primary"
          >
            Reintentar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 