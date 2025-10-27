'use client';

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  InputAdornment,
} from '@mui/material';

interface StoreInformationStepProps {
  formData: {
    subdomain: string;
    config: {
      metadata: {
        title: string;
        description: string;
        logo: string;
      };
    };
  };
  errors: {[key: string]: string};
  subdomainError: string | null;
  subdomainVerified: boolean;
  verifyingSubdomain: boolean;
  onInputChange: (field: string, value: any) => void;
  onVerifySubdomain: () => void;
}

const StoreInformationStep: React.FC<StoreInformationStepProps> = ({
  formData,
  errors,
  subdomainError,
  subdomainVerified,
  verifyingSubdomain,
  onInputChange,
  onVerifySubdomain,
}) => {
  // Función para filtrar caracteres inválidos del subdominio
  const handleSubdomainChange = (value: string) => {
    // Convertir a minúsculas y filtrar caracteres inválidos
    const filteredValue = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '') // Solo letras minúsculas, números y guiones
      .replace(/\./g, ''); // Eliminar puntos
    
    onInputChange('subdomain', filteredValue);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Información Básica de tu Tienda
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Subdominio"
          value={formData.subdomain}
          onChange={(e) => handleSubdomainChange(e.target.value)}
          error={!!errors.subdomain || !!subdomainError}
          helperText={
            subdomainError || 
            errors.subdomain || 
            (subdomainVerified ? '✅ Subdominio disponible' : 'Solo letras minúsculas, números y guiones. Sin puntos.')
          }
          InputProps={{
            endAdornment: <InputAdornment position="end">.tiendapro.com.ar</InputAdornment>,
          }}
          placeholder="mi-tienda"
        />
        <Button
          variant="outlined"
          onClick={onVerifySubdomain}
          disabled={verifyingSubdomain || !formData.subdomain.trim() || !/^[a-z0-9-]+$/.test(formData.subdomain) || formData.subdomain.length < 3}
          startIcon={verifyingSubdomain ? <CircularProgress size={16} /> : null}
          sx={{ mt: 1, width: '100%' }}
        >
          {verifyingSubdomain ? 'Verificando...' : 'Verificar Disponibilidad'}
        </Button>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Nombre de la Tienda"
          value={formData.config.metadata.title}
          onChange={(e) => onInputChange('config.metadata.title', e.target.value)}
          error={!!errors['config.metadata.title']}
          helperText={errors['config.metadata.title']}
          placeholder="Mi Tienda Online"
        />
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Descripción de la Tienda"
          multiline
          rows={3}
          value={formData.config.metadata.description}
          onChange={(e) => onInputChange('config.metadata.description', e.target.value)}
          placeholder="Describe brevemente tu tienda y los productos que vendes..."
        />
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="URL del Logo (opcional)"
          value={formData.config.metadata.logo}
          onChange={(e) => onInputChange('config.metadata.logo', e.target.value)}
          placeholder="https://ejemplo.com/logo.png"
          helperText="Puedes agregar tu logo más tarde desde el panel de administración"
        />
      </Grid>
    </Grid>
  );
};

export default StoreInformationStep;
