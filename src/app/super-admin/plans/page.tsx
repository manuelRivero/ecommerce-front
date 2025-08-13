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
import { getAllPlans, Plan } from '@/client';

export default function PlansListPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getAllPlans();
      setPlans(response.data.plans);
    } catch (error: any) {
      console.error('Error loading plans:', error);
      setError('Error al cargar los planes. Por favor, intenta de nuevo.');
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (planId: string) => {
    router.push(`/super-admin/create-plan?id=${planId}`);
  };

  const handleView = (plan: Plan) => {
    router.push(`/super-admin/plan-detail?id=${plan._id}`);
  };

  const handleToggleStatus = async (planId: string, currentStatus: string) => {
    try {
      // TODO: Implement toggle API call
      // await togglePlanStatus(planId, currentStatus === 'active' ? 'inactive' : 'active');
      
      // Update local state for now
      setPlans(prev => prev.map(plan => 
        plan._id === planId 
          ? { ...plan, status: currentStatus === 'active' ? 'inactive' : 'active' }
          : plan
      ));
    } catch (error: any) {
      console.error('Error toggling plan status:', error);
      setError('Error al cambiar el estado del plan.');
      setShowErrorModal(true);
    }
  };

  const handleCreateNew = () => {
    router.push('/super-admin/create-plan');
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

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency || 'ARS'
    }).format(price);
  };

  const formatBillingCycle = (billingCycle: { frequency: number; frequencyType: string }) => {
    const { frequency, frequencyType } = billingCycle;
    const frequencyTypeMap: { [key: string]: string } = {
      'days': 'días',
      'weeks': 'semanas',
      'months': 'meses',
      'years': 'años'
    };
    
    return `${frequency} ${frequencyTypeMap[frequencyType] || frequencyType}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
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
          Planes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateNew}
        >
          Crear Nuevo Plan
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Ciclo de Facturación</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Características</TableCell>
                <TableCell>Fecha Creación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan._id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {plan.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 200 }}>
                      {plan.description.length > 100 
                        ? `${plan.description.substring(0, 100)}...`
                        : plan.description
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {formatPrice(plan.price, plan.currency)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatBillingCycle(plan.billingCycle)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={plan.status === 'active'}
                          onChange={() => handleToggleStatus(plan._id, plan.status)}
                          size="small"
                        />
                      }
                      label=""
                    />
                    <Chip
                      label={getStatusLabel(plan.status)}
                      color={getStatusColor(plan.status) as any}
                      size="small"
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {plan.features.length} características
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(plan.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleView(plan)}
                        color="info"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(plan._id)}
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
              loadPlans();
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