'use client';

import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Autocomplete,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { fetchProvinces, fetchLocalities } from '@/client/geo';

interface AddressInformationStepProps {
  formData: {
    config: {
      address: string;
      province: string;
      postalCode: string;
      locality: string;
    };
  };
  errors: {[key: string]: string};
  onInputChange: (field: string, value: any) => void;
}

interface Province {
  id: string;
  nombre: string;
}

interface Locality {
  id: string;
  nombre: string;
}

const AddressInformationStep: React.FC<AddressInformationStepProps> = ({
  formData,
  errors,
  onInputChange,
}) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [localities, setLocalities] = useState<Locality[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingLocalities, setLoadingLocalities] = useState(false);

  // Load provinces on component mount
  useEffect(() => {
    const loadProvinces = async () => {
      try {
        setLoadingProvinces(true);
        const data = await fetchProvinces();
        setProvinces(data);
      } catch (error) {
        console.error('Error loading provinces:', error);
      } finally {
        setLoadingProvinces(false);
      }
    };

    loadProvinces();
  }, []);

  // Load localities when province changes
  useEffect(() => {
    if (formData.config.province) {
      // Find the province ID from the province name
      const selectedProvince = provinces.find(p => p.nombre === formData.config.province);
      if (selectedProvince) {
        const loadLocalities = async () => {
          try {
            setLoadingLocalities(true);
            const data = await fetchLocalities(selectedProvince.id);
            setLocalities(data);
          } catch (error) {
            console.error('Error loading localities:', error);
          } finally {
            setLoadingLocalities(false);
          }
        };

        loadLocalities();
      }
    } else {
      setLocalities([]);
    }
  }, [formData.config.province, provinces]);

  const handleProvinceChange = (provinceId: string, provinceName: string) => {
    onInputChange('config.province', provinceName);
    // Clear locality when province changes
    onInputChange('config.locality', '');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Dirección de la Empresa
        </Typography>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            🚚 Importante sobre tu dirección:
          </Typography>
          <Box component="ul" sx={{ mt: 1, pl: 2, mb: 0 }}>
            <Box component="li">
              <Typography variant="body2">
                Se utilizará como <strong>base para calcular los costos de envío</strong> a tus clientes
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                Es importante que sea <strong>precisa y completa</strong> para cálculos correctos
              </Typography>
            </Box>
          </Box>
        </Alert>
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Dirección"
          value={formData.config.address}
          onChange={(e) => onInputChange('config.address', e.target.value)}
          error={!!errors['config.address']}
          helperText={errors['config.address']}
          placeholder="Av. Corrientes 1234"
          required
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Autocomplete
          options={provinces}
          getOptionLabel={(option) => option.nombre}
          value={provinces.find(p => p.nombre === formData.config.province) || null}
          onChange={(_, newValue) => {
            if (newValue) {
              handleProvinceChange(newValue.id, newValue.nombre);
            } else {
              handleProvinceChange('', '');
            }
          }}
          loading={loadingProvinces}
          disabled={loadingProvinces}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Provincia"
              required
              error={!!errors['config.province']}
              helperText={errors['config.province']}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingProvinces ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {option.nombre}
            </li>
          )}
          noOptionsText="No hay provincias disponibles"
          loadingText="Cargando provincias..."
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Autocomplete
          options={localities}
          getOptionLabel={(option) => option.nombre}
          value={localities.find(l => l.nombre === formData.config.locality) || null}
          onChange={(_, newValue) => {
            if (newValue) {
              onInputChange('config.locality', newValue.nombre);
            } else {
              onInputChange('config.locality', '');
            }
          }}
          loading={loadingLocalities}
          disabled={!formData.config.province || loadingLocalities}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Localidad"
              required
              error={!!errors['config.locality']}
              helperText={errors['config.locality']}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingLocalities ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {option.nombre}
            </li>
          )}
          noOptionsText={!formData.config.province ? "Selecciona una provincia primero" : "No hay localidades disponibles"}
          loadingText="Cargando localidades..."
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Código Postal"
          value={formData.config.postalCode}
          onChange={(e) => onInputChange('config.postalCode', e.target.value)}
          error={!!errors['config.postalCode']}
          helperText={errors['config.postalCode']}
          placeholder="1001"
          required
        />
      </Grid>
    </Grid>
  );
};

export default AddressInformationStep;
