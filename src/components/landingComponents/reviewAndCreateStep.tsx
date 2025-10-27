'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
} from '@mui/material';

interface ReviewAndCreateStepProps {
  formData: {
    subdomain: string;
    config: {
      metadata: {
        title: string;
        description: string;
      };
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      cuil: string;
      address: string;
      province: string;
      locality: string;
      postalCode: string;
    };
    password: string;
  };
  provinces?: Array<{ id: string; nombre: string }>;
}

const ReviewAndCreateStep: React.FC<ReviewAndCreateStepProps> = ({
  formData,
  provinces = [],
}) => {
  const getProvinceName = (provinceId: string) => {
    if (!provinceId) return 'No seleccionado';
    if (provinces.length === 0) return 'Cargando provincias...';
    
    const province = provinces.find(p => p.id === provinceId);
    return province ? province.nombre : `ID: ${provinceId}`;
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Revisa la información de tu tienda
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Información de la Tienda
              </Typography>
              <Stack spacing={1}>
                <Box>
                  <Typography variant="body2" color="text.secondary">URL:</Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                    {formData.subdomain}.tiendapro.com.ar
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Nombre:</Typography>
                  <Typography variant="body1">{formData.config.metadata.title}</Typography>
                </Box>
                {formData.config.metadata.description && (
                  <Box>
                    <Typography variant="body2" color="text.secondary">Descripción:</Typography>
                    <Typography variant="body1">{formData.config.metadata.description}</Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Información de Contacto
              </Typography>
              <Stack spacing={1}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Nombre:</Typography>
                  <Typography variant="body1">{formData.config.firstName} {formData.config.lastName}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Email:</Typography>
                  <Typography variant="body1">{formData.config.email}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Teléfono:</Typography>
                  <Typography variant="body1">{formData.config.phone}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">CUIL:</Typography>
                  <Typography variant="body1">{formData.config.cuil}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Contraseña:</Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                    {formData.password ? '••••••••' : 'No configurada'}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Dirección
              </Typography>
              <Stack spacing={1}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Dirección:</Typography>
                  <Typography variant="body1">{formData.config.address}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Provincia:</Typography>
                  <Typography variant="body1">{getProvinceName(formData.config.province)}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Localidad:</Typography>
                  <Typography variant="body1">{formData.config.locality}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Código Postal:</Typography>
                  <Typography variant="body1">{formData.config.postalCode}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewAndCreateStep;
