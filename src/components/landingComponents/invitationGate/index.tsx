import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { CheckCircle, Key } from '@mui/icons-material';

interface InvitationGateProps {
  isChecking: boolean;
  checkError?: string | null;
  inviteCode: string;
  validationError?: string | null;
  isValidating: boolean;
  showSuccessModal: boolean;
  onInviteCodeChange: (value: string) => void;
  onValidate: () => void;
  onProceed: () => void;
  onRetryCheck: () => void;
}

const InvitationGate = ({
  isChecking,
  checkError,
  inviteCode,
  validationError,
  isValidating,
  showSuccessModal,
  onInviteCodeChange,
  onValidate,
  onProceed,
  onRetryCheck,
}: InvitationGateProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        pt: { xs: 8, md: 10 },
        pb: 6,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={24}
          sx={{
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: { xs: 56, md: 64 },
                  height: { xs: 56, md: 64 },
                  borderRadius: '50%',
                  background: 'rgba(102, 126, 234, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Key sx={{ fontSize: { xs: 28, md: 32 }, color: '#667eea' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Acceso por invitación
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Para crear tu tienda necesitas un código de invitación. Ingresa tu
                código de promoción para continuar con el formulario.
              </Typography>
            </Box>

            {isChecking ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Verificando acceso...
                </Typography>
              </Box>
            ) : (
              <>
                {checkError && (
                  <Alert severity="warning" sx={{ mb: 3 }}>
                    {checkError}
                    <Box sx={{ mt: 1 }}>
                      <Button size="small" variant="outlined" onClick={onRetryCheck}>
                        Reintentar
                      </Button>
                    </Box>
                  </Alert>
                )}

                <TextField
                  fullWidth
                  label="Código de invitación"
                  value={inviteCode}
                  onChange={(event) => onInviteCodeChange(event.target.value)}
                  placeholder="Ej: INVITACION-2026"
                  error={Boolean(validationError)}
                  helperText={validationError || ' '}
                  sx={{ mb: 2 }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={onValidate}
                  disabled={isValidating || !inviteCode.trim()}
                  startIcon={isValidating ? <CircularProgress size={20} /> : <CheckCircle />}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                    },
                  }}
                >
                  {isValidating ? 'Validando...' : 'Validar código'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Container>

      <Dialog
        open={showSuccessModal}
        onClose={onProceed}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            border: '2px solid #4caf50',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: '#4caf50',
            fontWeight: 600,
            pb: 1,
          }}
        >
          <CheckCircle sx={{ fontSize: 28 }} />
          Código validado correctamente
        </DialogTitle>
        <DialogContent sx={{ pt: 0 }}>
          <Typography variant="body1">
            Tu código de invitación es válido. Ya puedes continuar con la creación de tu tienda.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={onProceed}
            variant="contained"
            endIcon={<CheckCircle />}
            sx={{
              background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #45a049 0%, #3d8b40 100%)',
              },
            }}
          >
            Continuar al formulario
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InvitationGate;
