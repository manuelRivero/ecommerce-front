'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { CheckCircle, Email } from '@mui/icons-material';

interface TokenSuccessModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
}

export default function TokenSuccessModal({ open, onClose, productName }: TokenSuccessModalProps) {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark || theme.palette.success.main} 100%)`,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          ¡Token enviado exitosamente!
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          {/* Success Icon */}
          <Box
            sx={{
              p: 3,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark || theme.palette.success.main} 100%)`,
              color: 'white',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <CheckCircle sx={{ fontSize: 48 }} />
          </Box>

          {/* Success Message */}
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.success.main, fontWeight: 600 }}>
            Verificación enviada
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
            Hemos enviado un email de verificación a tu correo electrónico para confirmar tu compra de{' '}
            <strong>{productName}</strong>.
          </Typography>

          {/* Instructions */}
          <Box
            sx={{
              p: 3,
              background: `${theme.palette.success.main}10`,
              border: `1px solid ${theme.palette.success.main}30`,
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography variant="body1" sx={{ mb: 2, fontWeight: 600, color: theme.palette.success.main }}>
              Sigue estos pasos:
            </Typography>
            
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: theme.palette.success.main,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    mr: 2,
                  }}
                >
                  1
                </Box>
                Revisa tu bandeja de entrada
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: theme.palette.success.main,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    mr: 2,
                  }}
                >
                  2
                </Box>
                Busca el email con el asunto "Verificación de compra"
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: theme.palette.success.main,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    mr: 2,
                  }}
                >
                  3
                </Box>
                Haz clic en el enlace de verificación
              </Typography>
              
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: theme.palette.success.main,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    mr: 2,
                  }}
                >
                  4
                </Box>
                Podrás dejar tu comentario sobre el producto
              </Typography>
            </Box>
          </Box>

          {/* Additional Info */}
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            Si no encuentras el email, revisa tu carpeta de spam o correo no deseado.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={onClose}
          startIcon={<Email />}
          sx={{
            px: 4,
            py: 1.5,
            background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark || theme.palette.success.main} 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.success.dark || theme.palette.success.main} 0%, ${theme.palette.success.main} 100%)`,
            },
          }}
        >
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  );
}
