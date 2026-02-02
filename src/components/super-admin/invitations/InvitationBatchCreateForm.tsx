import React from 'react';
import {
  Alert,
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
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { InvitationBatch } from '@/client';
import { useInvitationBatchFormState } from '@/hooks/super-admin/useInvitationBatchFormState';
import { useInvitationBatchCreation } from '@/hooks/super-admin/useInvitationBatchCreation';
import { useRouter } from 'next/navigation';

interface InvitationBatchCreateFormProps {
  onBatchCreated?: (batch: InvitationBatch) => void;
}

const InvitationBatchCreateForm: React.FC<InvitationBatchCreateFormProps> = ({
  onBatchCreated,
}) => {
  const router = useRouter();
  const {
    isSubmitting,
    error,
    createBatch,
    clearError,
  } = useInvitationBatchCreation({ onBatchCreated });
  const {
    planKey,
    quantity,
    prefix,
    expiresAt,
    metadata,
    formError,
    fieldErrors,
    createdBatch,
    showSuccessModal,
    planKeyValidation,
    handlePlanKeyChange,
    handleQuantityChange,
    handlePrefixChange,
    handleExpiresAtChange,
    handleMetadataChange,
    handleValidatePlanKey,
    handleSubmit,
    resetForm,
    closeSuccessModal,
  } = useInvitationBatchFormState({
    onCreateBatch: createBatch,
    onClearExternalError: clearError,
  });

  const errors = [error, formError].filter(Boolean) as string[];

  return (
    <>
      <Card>
      <CardContent>
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
              <TextField
                label="planKey"
                value={planKey}
                onChange={(event) => handlePlanKeyChange(event.target.value)}
                fullWidth
                helperText={fieldErrors.planKey || 'Formato: [a-z0-9_-] en minúsculas'}
                error={Boolean(fieldErrors.planKey)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Cantidad"
                type="number"
                value={quantity}
                onChange={(event) => handleQuantityChange(event.target.value)}
                fullWidth
                inputProps={{ min: 1, max: 5000 }}
                helperText={fieldErrors.quantity || 'Máximo 5000'}
                error={Boolean(fieldErrors.quantity)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Prefijo (opcional)"
                value={prefix}
                onChange={(event) => handlePrefixChange(event.target.value)}
                fullWidth
                helperText="Se normaliza a MAYÚSCULAS"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Fecha de expiración (opcional)"
                type="date"
                value={expiresAt}
                onChange={(event) => handleExpiresAtChange(event.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Metadata (opcional)"
                value={metadata}
                onChange={(event) => handleMetadataChange(event.target.value)}
                fullWidth
                multiline
                minRows={3}
                helperText={fieldErrors.metadata || 'JSON válido si se usa'}
                error={Boolean(fieldErrors.metadata)}
              />
            </Grid>
          </Grid>

          {planKeyValidation.error && <Alert severity="warning">{planKeyValidation.error}</Alert>}
          {planKeyValidation.available === true && (
            <Alert severity="success">
              planKey disponible: {planKeyValidation.normalized ?? planKey}
            </Alert>
          )}
          {planKeyValidation.available === false && (
            <Alert severity="error">
              El planKey {planKeyValidation.normalized ?? planKey} no está disponible.
            </Alert>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="outlined"
              onClick={handleValidatePlanKey}
              disabled={planKeyValidation.isChecking}
            >
              {planKeyValidation.isChecking ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularProgress size={16} />
                  <span>Validando</span>
                </Stack>
              ) : (
                'Validar planKey'
              )}
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
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
