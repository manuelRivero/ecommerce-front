import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {
  CreateInvitationBatchRequest,
  InvitationBatch,
  PlanSearchResult,
  searchPlans,
} from '@/client';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useInvitationBatchCreation } from '@/hooks/super-admin/useInvitationBatchCreation';
import { useRouter } from 'next/navigation';

interface InvitationBatchFormValues {
  searchValue: string;
  planId: string;
  planName: string;
  quantity: number;
  prefix: string;
  expiresAt: string;
  metadata: string;
}

const defaultValues: InvitationBatchFormValues = {
  searchValue: '',
  planId: '',
  planName: '',
  quantity: 100,
  prefix: '',
  expiresAt: '',
  metadata: '',
};

const schema = yup.object({
  searchValue: yup.string().default('').defined(),
  planId: yup.string().required('Selecciona un plan del listado.').defined(),
  planName: yup.string().default('').defined(),
  quantity: yup
    .number()
    .typeError('La cantidad es obligatoria.')
    .integer('La cantidad debe ser un número entero.')
    .min(1, 'La cantidad debe ser mayor a 0.')
    .max(5000, 'La cantidad máxima es 5000.')
    .required('La cantidad es obligatoria.')
    .defined(),
  prefix: yup.string().default('').defined(),
  expiresAt: yup.string().default('').defined(),
  metadata: yup
    .string()
    .test('json', 'El metadata debe ser un JSON válido.', (value: string | undefined) => {
      if (!value?.trim()) {
        return true;
      }
      try {
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    })
    .default('')
    .defined(),
}).required();

const InvitationBatchCreateForm: React.FC = () => {
  const router = useRouter();
  const {
    isSubmitting,
    error,
    createBatch,
    clearError,
  } = useInvitationBatchCreation();

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors: fieldErrors },
  } = useForm<InvitationBatchFormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [createdBatch, setCreatedBatch] = useState<InvitationBatch | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [planOptions, setPlanOptions] = useState<PlanSearchResult[]>([]);
  const [planSearchLoading, setPlanSearchLoading] = useState(false);
  const [planSearchError, setPlanSearchError] = useState<string | null>(null);
  const [planKeyInput, setPlanKeyInput] = useState('');
  const [isEditingPlanKey, setIsEditingPlanKey] = useState(true);
  const isSelectingRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const planName = watch('planName');
  const errors = [error, formError, planSearchError].filter(Boolean) as string[];

  useEffect(() => {
    if (planKeyInput.trim().toLowerCase() !== planName.trim().toLowerCase()) {
      setPlanSearchError(null);
    }
  }, [planKeyInput, planName]);

  useEffect(() => {
    const subscription = watch(() => {
      clearError();
      setFormError(null);
    });

    return () => subscription.unsubscribe();
  }, [clearError, watch]);

  useEffect(() => {
    if (!isEditingPlanKey) {
      return;
    }
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }

    const trimmed = planKeyInput.trim();
    if (trimmed.length < 1) {
      setPlanOptions([]);
      setPlanSearchLoading(false);
      setPlanSearchError(null);
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setPlanSearchLoading(true);
      setPlanSearchError(null);

      try {
        const response = await searchPlans({
          search: trimmed,
          page: 0,
          limit: 10,
          signal: controller.signal,
        });
        setPlanOptions(response.data.plans ?? []);
      } catch (err: any) {
        if (err?.name === 'CanceledError' || err?.name === 'AbortError') {
          return;
        }
        console.error('Error buscando planes:', err);
        setPlanSearchError('No se pudo cargar el listado de planes.');
        setPlanOptions([]);
      } finally {
        if (!controller.signal.aborted) {
          setPlanSearchLoading(false);
        }
      }
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [isEditingPlanKey, planKeyInput]);

  const normalizePayload = useCallback(
    (data: InvitationBatchFormValues): CreateInvitationBatchRequest => {
    const payload: CreateInvitationBatchRequest = {
      planId: data.planId,
      quantity: data.quantity,
    };

    if (data.prefix.trim()) {
      payload.prefix = data.prefix.trim().toUpperCase();
    }

    if (data.expiresAt) {
      const date = new Date(data.expiresAt);
      if (!Number.isNaN(date.getTime())) {
        payload.expiresAt = date.toISOString();
      }
    }

    if (data.metadata.trim()) {
      payload.metadata = JSON.parse(data.metadata);
    }

    return payload;
  }, []);

  const onSubmit = useCallback(
    async (data: InvitationBatchFormValues) => {
      setFormError(null);
      const payload = normalizePayload(data);
      try {
        const batch = await createBatch(payload);
        setCreatedBatch(batch);
        setShowSuccessModal(true);
      } catch {
        // El error externo ya se gestiona en el hook orquestador
      }
    },
    [createBatch, normalizePayload],
  );

  const resetForm = useCallback(() => {
    reset(defaultValues);
    setFormError(null);
    setIsEditingPlanKey(true);
    setPlanKeyInput('');
    setPlanOptions([]);
    clearError();
  }, [clearError, reset]);

  const closeSuccessModal = useCallback(() => {
    setShowSuccessModal(false);
  }, []);

  return (
    <>
      <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Crear lote de códigos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Genera códigos únicos asociados a un plan específico.
            </Typography>
          </Box>

          {errors.map((message, index) => (
            <Alert severity="error" key={`${message}-${index}`}>
              {message}
            </Alert>
          ))}

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            { isEditingPlanKey ? (<Controller
                name="searchValue"
                control={control}
                render={({ field }) =>(
                  <Autocomplete
                  options={planOptions}
                  filterOptions={(options) => options}
                  getOptionLabel={(option) => option.name ?? ''}
                  loading={planSearchLoading}
                  open={field.value.trim().length > 0}
                  onOpen={() => {
                    if (!planKeyInput) {
                      setPlanKeyInput(field.value ?? '');
                    }
                  }}
                  inputValue={field.value}
                  onInputChange={(_, newValue, reason) => {
                    console.log('value', newValue);
                    if (reason === 'input') {
                      field.onChange(newValue.toLowerCase());
                      setPlanKeyInput(newValue.toLowerCase());
                    }
                    if (reason === 'clear') {
                      setPlanKeyInput('');
                      field.onChange('');

                    }
                  }}
                  onChange={(_, selected) => {
                    if (selected) {
                      field.onChange(selected.name ?? '');
                      setValue('planId', selected._id ?? '', { shouldValidate: true });
                      setValue('planName', selected.name ?? '', { shouldValidate: true });
                      setPlanKeyInput(selected.name ?? '');
                      setIsEditingPlanKey(false);
                      setPlanOptions([]);
                    } else {
                      field.onChange('');
                      setValue('planId', '', { shouldValidate: true });
                      setValue('planName', '', { shouldValidate: true });
                      setPlanKeyInput('');
                    }
                  }}
                  renderOption={(props, option) => (
                    <li {...props} key={option._id ?? option.name ?? 'plan-option'}>
                      <Stack>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {option.name}
                        </Typography>
                      </Stack>
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Plan"
                      fullWidth
                      helperText={
                        fieldErrors.planId?.message ||
                        planSearchError ||
                        'Selecciona un plan del listado'
                      }
                      error={Boolean(fieldErrors.planId || planSearchError)}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {planSearchLoading ? <CircularProgress size={16} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
                )}
              />) :
              (<Controller
                name="planName"
                control={control}
                render={({ field }) =>(
                  <TextField
                    {...field}
                    label="Plan"
                    type="text"
                    onChange={(event) => field.onChange(event.target.value)}
                    fullWidth
                    helperText={fieldErrors.planId?.message || 'Selecciona un plan del listado'}
                    error={Boolean(fieldErrors.planId)}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                          <IconButton
                          aria-label="Editar plan"
                          onClick={() => {
                            setIsEditingPlanKey(true);
                            setPlanKeyInput(field.value ?? '');
                            setPlanOptions([]);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />)} 
            </Grid>
            <Grid item xs={12} md={3}>
              <Controller
                name="quantity"
                control={control}
                rules={{
                  required: 'La cantidad es obligatoria.',
                  min: { value: 1, message: 'La cantidad debe ser mayor a 0.' },
                  max: { value: 5000, message: 'La cantidad máxima es 5000.' },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Cantidad"
                    type="number"
                    onChange={(event) => field.onChange(Number(event.target.value))}
                    fullWidth
                    inputProps={{ min: 1, max: 5000 }}
                    helperText={fieldErrors.quantity?.message || 'Máximo 5000'}
                    error={Boolean(fieldErrors.quantity)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Controller
                name="prefix"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Prefijo (opcional)"
                    onChange={(event) => field.onChange(event.target.value.toUpperCase())}
                    fullWidth
                    helperText="Se normaliza a MAYÚSCULAS"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="expiresAt"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha de expiración (opcional)"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="metadata"
                control={control}
                rules={{
                  validate: (value) => {
                    if (!value?.trim()) {
                      return true;
                    }
                    try {
                      JSON.parse(value);
                      return true;
                    } catch {
                      return 'El metadata debe ser un JSON válido.';
                    }
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Metadata (opcional)"
                    fullWidth
                    multiline
                    minRows={3}
                    helperText={fieldErrors.metadata?.message || 'JSON válido si se usa'}
                    error={Boolean(fieldErrors.metadata)}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Stack justifyContent="flex-end" direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularProgress size={16} color="inherit" />
                  <span>Creando</span>
                </Stack>
              ) : (
                'Crear lote'
              )}
            </Button>
            <Button variant="text" color="inherit" onClick={resetForm}>
              Limpiar
            </Button>
          </Stack>
        </Stack>
        </form>
      </CardContent>
      </Card>
      <Dialog open={showSuccessModal} onClose={closeSuccessModal} maxWidth="sm" fullWidth>
      <DialogTitle>¡Lote creado con éxito!</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          Ya puedes gestionar los códigos generados en el detalle del lote.
        </Typography>
        {createdBatch && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              ID del lote
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              {createdBatch._id}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeSuccessModal} color="inherit">
          Cerrar
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            if (createdBatch) {
              router.push(`/super-admin/invitations/batches/${createdBatch._id}`);
            }
          }}
          disabled={!createdBatch}
        >
          Ver detalle
        </Button>
      </DialogActions>
      </Dialog>
    </>
  );
};

export default InvitationBatchCreateForm;
