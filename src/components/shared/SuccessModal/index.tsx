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
import { CheckCircle } from '@mui/icons-material';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function SuccessModal({
  open,
  onClose,
  title = '¡Calificación enviada!',
  message = 'Gracias por compartir tu experiencia con nosotros. Tu opinión es muy valiosa para mejorar nuestros productos y servicios.',
}: SuccessModalProps) {
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
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark || theme.palette.primary.main} 100%)`,
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <CheckCircle 
            sx={{ 
              fontSize: 80, 
              color: theme.palette.success.main,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                },
                '50%': {
                  transform: 'scale(1.1)',
                },
                '100%': {
                  transform: 'scale(1)',
                },
              },
            }} 
          />
        </Box>
        
        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
          {message}
        </Typography>
        
        <Box
          sx={{
            p: 3,
            background: `${theme.palette.primary.main}10`,
            border: `1px solid ${theme.palette.primary.main}30`,
            borderRadius: 2,
            mt: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Tu calificación ayudará a otros clientes a tomar decisiones informadas sobre nuestros productos.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ 
            px: 4, 
            py: 1.5,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark || theme.palette.primary.main} 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark || theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
            },
          }}
        >
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
