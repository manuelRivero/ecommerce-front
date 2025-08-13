'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPlanFeatures, Feature, createSubscriptionPlan, getPlanById, updateSubscriptionPlan, Plan } from '@/client';

interface FeatureLimit {
  max: number;
  min: number;
  unlimited: boolean;
}

interface PlanFeature {
  feature: Feature;
  limits: FeatureLimit;
}

interface PlanFormData {
  name: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: {
    frequency: number;
    frequencyType: string;
  };
  status: string;
  features: PlanFeature[];
}

// Service function to fetch features from API
const fetchFeatures = async (): Promise<Feature[]> => {
  try {
    const response = await getPlanFeatures();
    return response.data.data;
  } catch (error) {
    console.error('Error fetching features:', error);
    throw error;
  }
};

const defaultValues: PlanFormData = {
  name: '',
  description: '',
  price: 0,
  currency: 'ARS',
  billingCycle: {
    frequency: 1,
    frequencyType: 'days',
  },
  status: 'active',
  features: [],
};

export default function CreatePlanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('id');
  
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);

  const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<PlanFormData>({
    defaultValues,
  });

  const { fields, update } = useFieldArray({
    control,
    name: "features"
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        
        // Load features first
        const fetchedFeatures = await fetchFeatures();
        setFeatures(fetchedFeatures);
        
        // If we have a planId, load the existing plan
        if (planId) {
          setIsEditing(true);
          const planResponse = await getPlanById(planId);
          const plan = planResponse.data.data;
          setCurrentPlan(plan);
          
          // Populate form with existing plan data
          setValue('name', plan.name);
          setValue('description', plan.description);
          setValue('price', plan.price);
          setValue('currency', plan.currency);
          setValue('billingCycle', plan.billingCycle);
          setValue('status', plan.status);
          
          // Map existing plan features to form features
          const mappedFeatures: PlanFeature[] = fetchedFeatures.map(feature => {
            const existingPlanFeature = plan.features.find(pf => pf.feature._id === feature._id);
            if (existingPlanFeature) {
              return {
                feature: { ...feature, enabled: true },
                limits: existingPlanFeature.limits
              };
            } else {
              return {
                feature: { ...feature, enabled: false },
                limits: {
                  max: 0,
                  min: 0,
                  unlimited: false
                }
              };
            }
          });
          
          setValue('features', mappedFeatures);
        } else {
          // Initialize features array with default values for new plan
          const initialFeatures: PlanFeature[] = fetchedFeatures.map(feature => ({
            feature: { ...feature },
            limits: {
              max: 0,
              min: 0,
              unlimited: false
            }
          }));
          
          setValue('features', initialFeatures);
        }
      } catch (error: any) {
        console.error('Error loading data:', error);
        setError('Error al cargar los datos. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [planId, setValue]);

  const handleFeatureToggle = (index: number, enabled: boolean) => {
    const currentFeatures = watch('features');
    const updatedFeatures = [...currentFeatures];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      feature: {
        ...updatedFeatures[index].feature,
        enabled
      }
    };
    setValue('features', updatedFeatures);
  };

  const handleLimitChange = (index: number, field: keyof FeatureLimit, value: any) => {
    const currentFeatures = watch('features');
    const updatedFeatures = [...currentFeatures];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      limits: {
        ...updatedFeatures[index].limits,
        [field]: value
      }
    };
    setValue('features', updatedFeatures);
  };

  const onSubmit = async (data: PlanFormData) => {
    try {
      setSubmitting(true);
      setSubmitError('');
      
      let response;
      
      if (isEditing && planId) {
        // Update existing plan
        response = await updateSubscriptionPlan(planId, data);
      } else {
        // Create new plan
        response = await createSubscriptionPlan(data);
      }
      
      if (response.data.success) {
        setShowSuccessModal(true);
        
        if (!isEditing) {
          // Reset form after successful creation
          reset(defaultValues);
          // Reset features to initial state (all disabled with 0 limits)
          const resetFeatures: PlanFeature[] = features.map(feature => ({
            feature: { ...feature, enabled: false },
            limits: {
              max: 0,
              min: 0,
              unlimited: false
            }
          }));
          setValue('features', resetFeatures);
        }
      } else {
        setSubmitError(response.data.message || `Error al ${isEditing ? 'actualizar' : 'crear'} el plan`);
        setShowErrorModal(true);
      }
    } catch (error: any) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} plan:`, error);
      setSubmitError(`Error al ${isEditing ? 'actualizar' : 'crear'} el plan. Por favor, intenta de nuevo.`);
      setShowErrorModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography>Cargando características...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
          Crear Nuevo Plan de Suscripción
        </Typography>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 2,
            py: 4 
          }}>
            <Typography variant="h6" color="error">
              Error al cargar las características
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {error}
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => window.location.reload()}
              sx={{ mt: 2 }}
            >
              Reintentar
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        {isEditing ? 'Editar Plan de Suscripción' : 'Crear Nuevo Plan de Suscripción'}
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Información Básica del Plan */}
          <Typography variant="h6" gutterBottom>
            Información Básica
          </Typography>
                    <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'El nombre es requerido' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre del Plan"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{ required: 'La descripción es requerida' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Descripción"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* Precio y Moneda */}
          <Typography variant="h6" gutterBottom>
            Precio y Facturación
          </Typography>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Controller
                name="price"
                control={control}
                rules={{ required: 'El precio es requerido', min: { value: 0, message: 'El precio debe ser mayor a 0' } }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Precio"
                    type="number"
                    fullWidth
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Moneda</InputLabel>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Moneda">
                      <MenuItem value="ARS">ARS (Peso Argentino)</MenuItem>
                      <MenuItem value="USD">USD (Dólar Estadounidense)</MenuItem>
                      <MenuItem value="EUR">EUR (Euro)</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Estado">
                      <MenuItem value="active">Activo</MenuItem>
                      <MenuItem value="inactive">Inactivo</MenuItem>
                      <MenuItem value="draft">Borrador</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          {/* Ciclo de Facturación */}
          <Typography variant="h6" gutterBottom>
            Ciclo de Facturación
          </Typography>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Controller
                name="billingCycle.frequency"
                control={control}
                rules={{ required: 'La frecuencia es requerida', min: { value: 1, message: 'La frecuencia debe ser mayor a 0' } }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Frecuencia"
                    type="number"
                    fullWidth
                    error={!!errors.billingCycle?.frequency}
                    helperText={errors.billingCycle?.frequency?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Frecuencia</InputLabel>
                <Controller
                  name="billingCycle.frequencyType"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Tipo de Frecuencia">
                      <MenuItem value="days">Días</MenuItem>
                      <MenuItem value="weeks">Semanas</MenuItem>
                      <MenuItem value="months">Meses</MenuItem>
                      <MenuItem value="years">Años</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>



          {/* Características del Plan */}
          <Typography variant="h6" gutterBottom>
            Características del Plan
          </Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <List>
                {watch('features')?.map((planFeature, index) => (
                  <React.Fragment key={planFeature.feature._id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="subtitle1" fontWeight="medium">
                              {planFeature.feature.title}
                            </Typography>
                            {planFeature.feature.enabled && (
                              <Chip 
                                label="Activo" 
                                color="success" 
                                size="small" 
                                variant="outlined" 
                              />
                            )}
                          </Box>
                        }
                                                 secondary={
                           <Box>
                             {planFeature.feature.enabled && (
                              <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12} md={4}>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={planFeature.limits.unlimited}
                                        onChange={(e) => handleLimitChange(index, 'unlimited', e.target.checked)}
                                        size="small"
                                      />
                                    }
                                    label="Sin límites"
                                  />
                                </Grid>
                                {!planFeature.limits.unlimited && (
                                  <>
                                    <Grid item xs={12} md={4}>
                                      <TextField
                                        label="Mínimo"
                                        type="number"
                                        value={planFeature.limits.min}
                                        onChange={(e) => handleLimitChange(index, 'min', parseInt(e.target.value) || 0)}
                                        size="small"
                                        fullWidth
                                      />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                      <TextField
                                        label="Máximo"
                                        type="number"
                                        value={planFeature.limits.max}
                                        onChange={(e) => handleLimitChange(index, 'max', parseInt(e.target.value) || 0)}
                                        size="small"
                                        fullWidth
                                      />
                                    </Grid>
                                  </>
                                )}
                              </Grid>
                            )}
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={planFeature.feature.enabled}
                          onChange={(e) => handleFeatureToggle(index, e.target.checked)}
                          color="primary"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < watch('features')?.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
            <Button 
              variant="outlined" 
              color="secondary" 
              disabled={submitting}
              onClick={() => router.push('/super-admin/plans')}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={submitting}
              startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {submitting 
                ? (isEditing ? 'Actualizando Plan...' : 'Creando Plan...') 
                : (isEditing ? 'Actualizar Plan' : 'Crear Plan')
              }
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Modal de Éxito */}
      <Dialog open={showSuccessModal} onClose={() => setShowSuccessModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: 'success.main' }}>
          ¡{isEditing ? 'Plan Actualizado' : 'Plan Creado'} Exitosamente!
        </DialogTitle>
        <DialogContent>
          <Typography>
            El plan de suscripción ha sido {isEditing ? 'actualizado' : 'creado'} correctamente y está listo para ser utilizado.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              setShowSuccessModal(false);
              router.push('/super-admin/plans');
            }} 
            variant="contained" 
            color="primary"
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Error */}
      <Dialog open={showErrorModal} onClose={() => setShowErrorModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: 'error.main' }}>
          Error al Crear Plan
        </DialogTitle>
        <DialogContent>
          <Typography color="error">
            {submitError}
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
              // Aquí podrías agregar lógica para reintentar
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