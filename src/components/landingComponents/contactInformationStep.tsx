'use client';

import React from 'react';
import {
  Typography,
  TextField,
  Grid,
  InputAdornment,
  Alert,
  Box,
} from '@mui/material';

interface ContactInformationStepProps {
  formData: {
    config: {
      email: string;
      phone: string;
      firstName: string;
      lastName: string;
      cuil: string;
    };
    password: string;
    confirmPassword: string;
  };
  errors: {[key: string]: string};
  onInputChange: (field: string, value: any) => void;
}

const ContactInformationStep: React.FC<ContactInformationStepProps> = ({
  formData,
  errors,
  onInputChange,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Información de Contacto
        </Typography>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            📧 Importante sobre tu email:
          </Typography>
          <Box component="ul" sx={{ mt: 1, pl: 2, mb: 0 }}>
            <Box component="li">
              <Typography variant="body2">
                Será tu <strong>usuario para acceder al dashboard</strong> de administración
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                Recibirás <strong>todas las notificaciones</strong> relacionadas con tu tienda
              </Typography>
            </Box>
          </Box>
        </Alert>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Nombre"
          value={formData.config.firstName}
          onChange={(e) => onInputChange('config.firstName', e.target.value)}
          error={!!errors['config.firstName']}
          helperText={errors['config.firstName']}
          placeholder="Juan"
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Apellido"
          value={formData.config.lastName}
          onChange={(e) => onInputChange('config.lastName', e.target.value)}
          error={!!errors['config.lastName']}
          helperText={errors['config.lastName']}
          placeholder="Pérez"
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Email (Usuario del Dashboard)"
          type="email"
          value={formData.config.email}
          onChange={(e) => onInputChange('config.email', e.target.value)}
          error={!!errors['config.email']}
          helperText={errors['config.email'] || "Este será tu usuario para acceder al panel de administración"}
          placeholder="admin@mitienda.com"
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Teléfono"
          value={formData.config.phone}
          onChange={(e) => {
            // Solo permitir números
            const numericValue = e.target.value.replace(/\D/g, '');
            onInputChange('config.phone', numericValue);
          }}
          error={!!errors['config.phone']}
          helperText={errors['config.phone'] || "+54"}
          placeholder="11 1234-5678"
          InputProps={{
            startAdornment: <InputAdornment position="start">+54</InputAdornment>,
          }}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="CUIL"
          value={formData.config.cuil}
          onChange={(e) => {
            // Remove all non-numeric characters
            const numericValue = e.target.value.replace(/\D/g, '');
            
            // Format as XX-XXXXXXXX-X
            let formattedValue = '';
            if (numericValue.length > 0) {
              formattedValue = numericValue.substring(0, 2);
            }
            if (numericValue.length > 2) {
              formattedValue += '-' + numericValue.substring(2, 10);
            }
            if (numericValue.length > 10) {
              formattedValue += '-' + numericValue.substring(10, 11);
            }
            
            onInputChange('config.cuil', formattedValue);
          }}
          error={!!errors['config.cuil']}
          helperText={errors['config.cuil']}
          placeholder="20-12345678-9"
          required
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          value={formData.password}
          onChange={(e) => onInputChange('password', e.target.value)}
          error={!!errors.password}
          helperText={errors.password || "Mínimo 8 caracteres"}
          placeholder="••••••••"
          required
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Confirmar Contraseña"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => onInputChange('confirmPassword', e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword || "Repite tu contraseña"}
          placeholder="••••••••"
          required
        />
      </Grid>
    </Grid>
  );
};

export default ContactInformationStep;
