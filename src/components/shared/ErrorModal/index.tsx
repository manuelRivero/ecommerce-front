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
import { Error, Refresh } from '@mui/icons-material';

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  onRetry?: () => void;
  title?: string;
  message?: string;
}

export default function ErrorModal({
  open,
  onClose,
  onRetry,
  title = 'Error al enviar calificación',
  message = 'Hubo un problema al enviar tu calificación. Por favor, intenta de nuevo.',
}: ErrorModalProps) {
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
          background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark || theme.palette.error.main} 100%)`,
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
          <Error 
            sx={{ 
              fontSize: 80, 
              color: theme.palette.error.main,
            }} 
          />
        </Box>
        
        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
          {message}
        </Typography>
        
        <Box
          sx={{
            p: 3,
            background: `${theme.palette.error.main}10`,
            border: `1px solid ${theme.palette.error.main}30`,
            borderRadius: 2,
            mt: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Si el problema persiste, puedes intentar más tarde o contactar con nuestro soporte.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ px: 4, py: 1.5 }}
        >
          Cerrar
        </Button>
        {onRetry && (
          <Button
            variant="contained"
            onClick={onRetry}
            startIcon={<Refresh />}
            sx={{ 
              px: 4, 
              py: 1.5,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark || theme.palette.primary.main} 100%)`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark || theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
              },
            }}
          >
            Intentar de nuevo
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
