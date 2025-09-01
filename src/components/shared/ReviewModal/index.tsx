'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Rating,
  Stack,
  IconButton,
  Alert,
  useTheme,
} from '@mui/material';
import { Close, Star } from '@mui/icons-material';

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
  onSubmit: (rating: number, comment: string) => void;
  loading?: boolean;
}

export default function ReviewModal({
  open,
  onClose,
  productName,
  onSubmit,
  loading = false,
}: ReviewModalProps) {
  const theme = useTheme();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [errors, setErrors] = useState<{ rating?: string; comment?: string }>({});

  const handleSubmit = () => {
    const newErrors: { rating?: string; comment?: string } = {};

    if (rating === 0) {
      newErrors.rating = 'Por favor califica el producto';
    }

    if (!comment.trim()) {
      newErrors.comment = 'Por favor escribe un comentario';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(rating, comment.trim());
  };

  const handleClose = () => {
    setRating(0);
    setComment('');
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Califica tu experiencia
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
            {productName}
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{ color: 'white', minWidth: 'auto' }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <Stack spacing={3}>
          {/* Rating Section */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, mt: 2 }}>
              ¿Cómo calificarías este producto?
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                             <Rating
                 value={rating}
                 onChange={(_, newValue) => {
                   setRating(newValue || 0);
                   if (errors.rating) {
                     setErrors(prev => ({ ...prev, rating: undefined }));
                   }
                 }}
                 size="large"
                 sx={{
                   '& .MuiRating-iconFilled': {
                     color: theme.palette.primary.main,
                   },
                   '& .MuiRating-iconHover': {
                     color: theme.palette.primary.main,
                   },
                 }}
               />
              <Typography variant="body2" color="text.secondary">
                {rating > 0 && `(${rating} ${rating === 1 ? 'estrella' : 'estrellas'})`}
              </Typography>
            </Box>
            {errors.rating && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errors.rating}
              </Alert>
            )}
          </Box>

          {/* Comment Section */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Comparte tu experiencia
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                if (errors.comment) {
                  setErrors(prev => ({ ...prev, comment: undefined }));
                }
              }}
              placeholder="Cuéntanos qué te pareció el producto, su calidad, entrega, etc..."
              variant="outlined"
              error={!!errors.comment}
              helperText={errors.comment}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

                     {/* Info Box */}
           <Box
             sx={{
               p: 3,
               background: `${theme.palette.primary.main}10`,
               border: `1px solid ${theme.palette.primary.main}30`,
               borderRadius: 2,
             }}
           >
            <Typography variant="body2" color="text.secondary">
              Tu opinión es muy importante para nosotros y ayuda a otros clientes a tomar decisiones informadas.
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          disabled={loading}
          sx={{ px: 4, py: 1.5 }}
        >
          Cancelar
        </Button>
                 <Button
           variant="contained"
           onClick={handleSubmit}
           disabled={loading}
           sx={{ 
             px: 4, 
             py: 1.5,
             background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark || theme.palette.primary.main} 100%)`,
             '&:hover': {
               background: `linear-gradient(135deg, ${theme.palette.primary.dark || theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
             },
           }}
         >
          {loading ? 'Enviando...' : 'Enviar calificación'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
