'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import { Star, Email, Send } from '@mui/icons-material';
import { requestReviewToken } from '@/client/reviews';
import TokenSuccessModal from '@/components/shared/TokenSuccessModal';

interface ReviewInvitationProps {
  productName: string;
  productId: string;
  tenant: string;
}

export default function ReviewInvitation({ productName, productId, tenant }: ReviewInvitationProps) {
  const theme = useTheme();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOpenEmailModal = () => {
    setShowEmailModal(true);
    setError('');
    setEmail('');
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    setError('');
    setEmail('');
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleSubmitEmail = async () => {
    if (!email.trim()) {
      setError('Por favor ingresa tu email');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setLoading(true);
    setError('');

    try {
        console.log('data', {
            tenant,
            productId,
            customerEmail: email.trim(),
          })
      const data = await requestReviewToken({
        tenant,
        productId,
        customerEmail: email.trim(),
      });

        setShowEmailModal(false);
        setShowSuccessModal(true);
     
    } catch (error) {
      console.error('Error requesting review token:', error);
      setError(error instanceof Error ? error.message : 'Hubo un error al enviar el token. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ py: 6, px: 4 }}>
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}05 0%, ${theme.palette.primary.main}10 100%)`,
            border: `1px solid ${theme.palette.primary.main}20`,
            borderRadius: 3,
          }}
        >
          <Stack spacing={3} alignItems="center">
            {/* Icon */}
            <Box
              sx={{
                p: 2,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark || theme.palette.primary.main} 100%)`,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                             <Star sx={{ fontSize: 32 }} />
            </Box>

            {/* Title */}
            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
              ¿Compraste este producto?
            </Typography>

            {/* Description */}
            <Typography variant="body1" sx={{ maxWidth: 600, lineHeight: 1.6, color: 'text.secondary' }}>
              Si ya has comprado <strong>{productName}</strong>, nos encantaría conocer tu experiencia. 
              Tu opinión es muy valiosa para nosotros y ayuda a otros clientes a tomar decisiones informadas.
            </Typography>

            {/* CTA Button */}
            <Button
              variant="contained"
              size="large"
              onClick={handleOpenEmailModal}
              startIcon={<Email />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark || theme.palette.primary.main} 100%)`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark || theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Dejar mi comentario
            </Button>

            {/* Additional Info */}
            <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.8 }}>
              Solo necesitamos verificar tu compra para asegurar la autenticidad de las reseñas
            </Typography>
          </Stack>
        </Paper>
      </Box>

      {/* Email Modal */}
      <Dialog
        open={showEmailModal}
        onClose={handleCloseEmailModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark || theme.palette.primary.main} 100%)`,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Verificar tu compra
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
              Para poder dejar tu comentario, necesitamos verificar que realmente compraste este producto.
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
              Ingresa el email que usaste para hacer la compra y te enviaremos un token de autorización.
            </Typography>

            <TextField
              fullWidth
              label="Email de compra"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@email.com"
              variant="outlined"
              error={!!error}
              helperText={error}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {error}
              </Alert>
            )}

            <Box
              sx={{
                p: 3,
                background: `${theme.palette.primary.main}10`,
                border: `1px solid ${theme.palette.primary.main}30`,
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                <strong>Proceso de verificación:</strong>
                <br />
                1. Ingresa tu email de compra
                <br />
                2. Recibirás un token de autorización por email
                <br />
                3. Haz clic en el enlace del email para verificar tu identidad
                <br />
                4. Podrás dejar tu comentario sobre el producto
              </Typography>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={handleCloseEmailModal}
            disabled={loading}
            sx={{ px: 4, py: 1.5 }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitEmail}
            disabled={loading}
            startIcon={loading ? null : <Send />}
            sx={{
              px: 4,
              py: 1.5,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark || theme.palette.primary.main} 100%)`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark || theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
              },
            }}
          >
            {loading ? 'Enviando...' : 'Enviar token'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Token Success Modal */}
      <TokenSuccessModal
        open={showSuccessModal}
        onClose={handleCloseSuccessModal}
        productName={productName}
      />
    </>
  );
}
