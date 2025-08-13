'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  Switch,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getPlanFeatureById, Feature, ExtendedDescription } from '@/client';

interface FeatureFormData {
  name: string;
  enabled: boolean;
  title: string;
  description: string;
  extendedDescription: ExtendedDescription;
  isActive: boolean;
}

const defaultValues: FeatureFormData = {
  name: '',
  enabled: true,
  title: '',
  description: '',
  extendedDescription: {
    headline: '',
    intro: '',
    benefits: [],
    lossReasons: [],
    closing: '',
  },
  isActive: true,
};

export default function CreateFeaturePage() {
  const searchParams = useSearchParams();
  const featureId = searchParams.get('id');
  const isEditing = !!featureId;

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<FeatureFormData>({
    defaultValues,
  });

  const watchedBenefits = watch('extendedDescription.benefits');
  const watchedLossReasons = watch('extendedDescription.lossReasons');

  // Load feature data if editing
  useEffect(() => {
    if (isEditing && featureId) {
      loadFeatureData(featureId);
    }
  }, [isEditing, featureId]);

  const loadFeatureData = async (id: string) => {
    try {
      setLoading(true);
      
      const response = await getPlanFeatureById(id);
      const feature = response.data.data;
      console.log('feature', feature);
      
      // Set form values
      setValue('name', feature.name);
      setValue('enabled', feature.enabled);
      setValue('title', feature.title);
      setValue('description', feature.description);
      setValue('extendedDescription.headline', feature.extendedDescription.headline);
      setValue('extendedDescription.intro', feature.extendedDescription.intro);
      setValue('extendedDescription.benefits', feature.extendedDescription.benefits);
      setValue('extendedDescription.lossReasons', feature.extendedDescription.lossReasons);
      setValue('extendedDescription.closing', feature.extendedDescription.closing);
      setValue('isActive', feature.isActive);
      
    } catch (error: any) {
      console.error('Error loading feature:', error);
      setSubmitError('Error al cargar la característica. Por favor, intenta de nuevo.');
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const addBenefit = () => {
    const currentBenefits = watchedBenefits || [];
    setValue('extendedDescription.benefits', [...currentBenefits, '']);
  };

  const removeBenefit = (index: number) => {
    const currentBenefits = watchedBenefits || [];
    const updatedBenefits = currentBenefits.filter((_, i) => i !== index);
    setValue('extendedDescription.benefits', updatedBenefits);
  };

  const updateBenefit = (index: number, value: string) => {
    const currentBenefits = watchedBenefits || [];
    const updatedBenefits = [...currentBenefits];
    updatedBenefits[index] = value;
    setValue('extendedDescription.benefits', updatedBenefits);
  };

  const addLossReason = () => {
    const currentLossReasons = watchedLossReasons || [];
    setValue('extendedDescription.lossReasons', [...currentLossReasons, '']);
  };

  const removeLossReason = (index: number) => {
    const currentLossReasons = watchedLossReasons || [];
    const updatedLossReasons = currentLossReasons.filter((_, i) => i !== index);
    setValue('extendedDescription.lossReasons', updatedLossReasons);
  };

  const updateLossReason = (index: number, value: string) => {
    const currentLossReasons = watchedLossReasons || [];
    const updatedLossReasons = [...currentLossReasons];
    updatedLossReasons[index] = value;
    setValue('extendedDescription.lossReasons', updatedLossReasons);
  };

  const onSubmit = async (data: FeatureFormData) => {
    try {
      setSubmitting(true);
      setSubmitError('');
      
      if (isEditing) {
        // TODO: Implement updateFeature API call
        console.log('Updating feature with ID:', featureId, 'Data:', data);
        // const response = await updateFeature(featureId, data);
      } else {
        // TODO: Implement createFeature API call
        console.log('Creating new feature:', data);
        // const response = await createFeature(data);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowSuccessModal(true);
      // Reset form after successful submission
      reset(defaultValues);
    } catch (error: any) {
      console.error('Error saving feature:', error);
      setSubmitError(`Error al ${isEditing ? 'actualizar' : 'crear'} la característica. Por favor, intenta de nuevo.`);
      setShowErrorModal(true);
    } finally {
      setSubmitting(false);
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
    <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        {isEditing ? 'Editar Característica' : 'Crear Nueva Característica'}
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Información Básica */}
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
                    label="Nombre de la Característica"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'El título es requerido' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Título"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
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

          {/* Estados */}
          <Typography variant="h6" gutterBottom>
            Estados
          </Typography>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Controller
                    name="enabled"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onChange={field.onChange}
                        color="primary"
                      />
                    )}
                  />
                }
                label="Habilitada"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onChange={field.onChange}
                        color="primary"
                      />
                    )}
                  />
                }
                label="Activa"
              />
            </Grid>
          </Grid>

          {/* Descripción Extendida */}
          <Typography variant="h6" gutterBottom>
            Descripción Extendida
          </Typography>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <Controller
                name="extendedDescription.headline"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Título Principal"
                    fullWidth
                    placeholder="Ej: Potencia tu negocio con..."
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="extendedDescription.intro"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Introducción"
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Describe brevemente la característica..."
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* Beneficios */}
          <Typography variant="h6" gutterBottom>
            Beneficios
          </Typography>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1">
                  Lista de Beneficios
                </Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={addBenefit}
                  variant="outlined"
                  size="small"
                >
                  Agregar Beneficio
                </Button>
              </Box>
              <List>
                {watchedBenefits?.map((benefit, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <TextField
                          value={benefit}
                          onChange={(e) => updateBenefit(index, e.target.value)}
                          placeholder={`Beneficio ${index + 1}`}
                          fullWidth
                          size="small"
                        />
                      }
                    />
                    <IconButton
                      onClick={() => removeBenefit(index)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
                {(!watchedBenefits || watchedBenefits.length === 0) && (
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="body2" color="text.secondary">
                          No hay beneficios agregados
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>

          {/* Razones de Pérdida */}
          <Typography variant="h6" gutterBottom>
            Razones de Pérdida
          </Typography>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1">
                  Lista de Razones de Pérdida
                </Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={addLossReason}
                  variant="outlined"
                  size="small"
                >
                  Agregar Razón
                </Button>
              </Box>
              <List>
                {watchedLossReasons?.map((reason, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <TextField
                          value={reason}
                          onChange={(e) => updateLossReason(index, e.target.value)}
                          placeholder={`Razón ${index + 1}`}
                          fullWidth
                          size="small"
                        />
                      }
                    />
                    <IconButton
                      onClick={() => removeLossReason(index)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
                {(!watchedLossReasons || watchedLossReasons.length === 0) && (
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="body2" color="text.secondary">
                          No hay razones de pérdida agregadas
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>

          {/* Cierre */}
          <Typography variant="h6" gutterBottom>
            Cierre
          </Typography>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <Controller
                name="extendedDescription.closing"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Mensaje de Cierre"
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Mensaje final para convencer al usuario..."
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* Botones de Acción */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
            <Button variant="outlined" color="secondary" disabled={submitting}>
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
                ? (isEditing ? 'Actualizando...' : 'Creando...') 
                : (isEditing ? 'Actualizar Característica' : 'Crear Característica')
              }
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Modal de Éxito */}
      <Dialog open={showSuccessModal} onClose={() => setShowSuccessModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: 'success.main' }}>
          ¡Característica {isEditing ? 'Actualizada' : 'Creada'} Exitosamente!
        </DialogTitle>
        <DialogContent>
          <Typography>
            La característica ha sido {isEditing ? 'actualizada' : 'creada'} correctamente y está lista para ser utilizada en los planes de suscripción.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowSuccessModal(false)} 
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
          Error al {isEditing ? 'Actualizar' : 'Crear'} Característica
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