'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Switch,
  FormControlLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation';
import { getAllPlanFeatures, Feature, FeaturesResponse } from '@/client';

export default function FeaturesListPage() {
  const router = useRouter();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getAllPlanFeatures();
      setFeatures(response.data.data);
    } catch (error: any) {
      console.error('Error loading features:', error);
      setError('Error al cargar las características. Por favor, intenta de nuevo.');
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (featureId: string) => {
    router.push(`/super-admin/create-feature?id=${featureId}`);
  };

  const handleView = (feature: Feature) => {
    router.push(`/super-admin/feature-detail?id=${feature._id}`);
  };

  const handleToggleEnabled = async (featureId: string, currentEnabled: boolean) => {
    try {
      // TODO: Implement toggle API call
      // await toggleFeature(featureId, !currentEnabled);
      
      // Update local state for now
      setFeatures(prev => prev.map(feature => 
        feature._id === featureId 
          ? { ...feature, enabled: !currentEnabled }
          : feature
      ));
    } catch (error: any) {
      console.error('Error toggling feature:', error);
      setError('Error al cambiar el estado de la característica.');
      setShowErrorModal(true);
    }
  };

  const handleCreateNew = () => {
    router.push('/super-admin/create-feature');
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Características
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateNew}
        >
          Crear Nueva Característica
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Activa</TableCell>
                <TableCell>Oculta</TableCell>
                <TableCell>Fecha Creación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {features.map((feature) => (
                <TableRow key={feature._id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {feature.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {feature.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={feature.featureType === 'binary' ? 'Binaria' : 'Contable'}
                      color={feature.featureType === 'binary' ? 'primary' : 'secondary'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 200 }}>
                      {feature.description.length > 100 
                        ? `${feature.description.substring(0, 100)}...`
                        : feature.description
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={feature.enabled}
                          onChange={() => handleToggleEnabled(feature._id, feature.enabled)}
                          size="small"
                        />
                      }
                      label=""
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={feature.isActive ? 'Activa' : 'Inactiva'}
                      color={feature.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={feature.hidden ? 'Oculta' : 'Visible'}
                      color={feature.hidden ? 'secondary' : 'primary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(feature.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleView(feature)}
                        color="info"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(feature._id)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Modal de Error */}
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
              loadFeatures();
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