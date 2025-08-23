'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
  Stack,
  Divider,
  InputAdornment,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  Store,
  Business,
  ContactMail,
  LocationOn,
  CheckCircle,
  ArrowForward,
  ArrowBack,
  Payment,
  Security,
  Close,
  Error,
  OpenInNew,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { createStore } from '@/client/tenants';
import MobileStepper from '@/components/landingComponents/mobileStepper';

const steps = [
  'Información de la Tienda',
  'Información de Contacto',
  'Dirección',
  'Configuración de Pagos',
  'Revisar y Crear'
];

const CreateStorePage = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [verifyingSubdomain, setVerifyingSubdomain] = useState(false);
  const [subdomainVerified, setSubdomainVerified] = useState(false);
  const [subdomainError, setSubdomainError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    subdomain: '',
    config: {
      phone: '',
      email: '',
      firstName: '',
      lastName: '',
      cuil: '',
      address: '',
      province: '',
      postalCode: '',
      locality: '',
      metadata: {
        title: '',
        description: '',
        logo: '',
      },
    },
    mercadoPagoToken: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const parts = field.split('.');
      setFormData(prev => {
        const newData = { ...prev };
        let current: any = newData;
        
        // Navigate to the nested object
        for (let i = 0; i < parts.length - 1; i++) {
          current = current[parts[i]];
        }
        
        // Set the final value
        current[parts[parts.length - 1]] = value;
        
        return newData;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Reset subdomain verification when subdomain changes
    if (field === 'subdomain') {
      setSubdomainVerified(false);
      setSubdomainError(null);
    }
  };

  const verifySubdomain = async () => {
    if (!formData.subdomain.trim()) {
      setSubdomainError('Ingresa un subdominio para verificar');
      return;
    }

    try {
      setVerifyingSubdomain(true);
      setSubdomainError(null);
      setSubdomainVerified(false);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenant/verify-available-tenant?subdomain=${formData.subdomain}`);
      const data = await response.json();
      
      if (response.ok) {
        if (data.available) {
          // El subdominio está disponible
          setSubdomainVerified(true);
          setSubdomainError(null);
        } else {
          // El subdominio no está disponible
          setSubdomainError(data.message || 'Este nombre de tienda ya está en uso. Por favor, elige otro subdominio.');
          setSubdomainVerified(false);
        }
      } else {
        // Error en la respuesta
        setSubdomainError(data.message || 'Error al verificar el subdominio. Por favor, intenta de nuevo.');
        setSubdomainVerified(false);
      }
    } catch (error) {
      console.error('Error verifying subdomain:', error);
      setSubdomainError('Error de conexión. Por favor, verifica tu conexión e intenta de nuevo.');
      setSubdomainVerified(false);
    } finally {
      setVerifyingSubdomain(false);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};

    switch (step) {
      case 0: // Información de la Tienda
        if (!formData.subdomain.trim()) {
          newErrors.subdomain = 'El subdominio es requerido';
        } else if (!/^[a-z0-9-]+$/.test(formData.subdomain)) {
          newErrors.subdomain = 'Solo letras minúsculas, números y guiones';
        } else if (formData.subdomain.length < 3) {
          newErrors.subdomain = 'Mínimo 3 caracteres';
        } else if (!subdomainVerified) {
          newErrors.subdomain = 'Debes verificar que el subdominio esté disponible';
        }
        if (!formData.config.metadata.title.trim()) {
          newErrors['config.metadata.title'] = 'El nombre de la tienda es requerido';
        }
        break;

                           case 1: // Información de Contacto
          if (!formData.config.email.trim()) {
            newErrors['config.email'] = 'El email es requerido';
          } else if (!/\S+@\S+\.\S+/.test(formData.config.email)) {
            newErrors['config.email'] = 'Email inválido';
          }
          if (!formData.config.phone.trim()) {
            newErrors['config.phone'] = 'El teléfono es requerido';
          }
          if (!formData.config.firstName.trim()) {
            newErrors['config.firstName'] = 'El nombre es requerido';
          }
          if (!formData.config.lastName.trim()) {
            newErrors['config.lastName'] = 'El apellido es requerido';
          }
          if (!formData.config.cuil.trim()) {
            newErrors['config.cuil'] = 'El CUIL es requerido';
          } else if (!/^\d{2}-\d{8}-\d{1}$/.test(formData.config.cuil)) {
            newErrors['config.cuil'] = 'Formato inválido. Use: XX-XXXXXXXX-X';
          } else if (formData.config.cuil.replace(/-/g, '').length !== 11) {
            newErrors['config.cuil'] = 'El CUIL debe tener 11 dígitos';
          }
          if (!formData.password.trim()) {
            newErrors.password = 'La contraseña es requerida';
          } else if (formData.password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
          }
          if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirma tu contraseña';
          } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
          }
          break;

             case 2: // Dirección
         if (!formData.config.address.trim()) {
           newErrors['config.address'] = 'La dirección es requerida';
         }
         if (!formData.config.province.trim()) {
           newErrors['config.province'] = 'La provincia es requerida';
         }
         if (!formData.config.locality.trim()) {
           newErrors['config.locality'] = 'La localidad es requerida';
         }
         if (!formData.config.postalCode.trim()) {
           newErrors['config.postalCode'] = 'El código postal es requerido';
         }
         break;

       case 3: // Configuración de Pagos
         if (!formData.mercadoPagoToken.trim()) {
           newErrors.mercadoPagoToken = 'El token de MercadoPago es requerido';
         } else if (!/^TEST-[a-zA-Z0-9]{32}$|^APP_USR-[a-zA-Z0-9]{32}$/.test(formData.mercadoPagoToken)) {
           newErrors.mercadoPagoToken = 'Formato de token inválido';
         }
         break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Función para verificar si un step está completo
  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 0: // Información de la Tienda
        return formData.subdomain.trim() !== '' && 
               /^[a-z0-9-]+$/.test(formData.subdomain) && 
               formData.subdomain.length >= 3 &&
               subdomainVerified &&
               formData.config.metadata.title.trim() !== '';
      
             case 1: // Información de Contacto
         return formData.config.email.trim() !== '' && 
                /\S+@\S+\.\S+/.test(formData.config.email) &&
                formData.config.phone.trim() !== '' &&
                formData.config.firstName.trim() !== '' &&
                formData.config.lastName.trim() !== '' &&
                formData.config.cuil.trim() !== '' &&
                /^\d{2}-\d{8}-\d{1}$/.test(formData.config.cuil) &&
                formData.config.cuil.replace(/-/g, '').length === 11 &&
                formData.password.trim() !== '' &&
                formData.password.length >= 8 &&
                formData.confirmPassword.trim() !== '' &&
                formData.password === formData.confirmPassword;
      
      case 2: // Dirección
        return formData.config.address.trim() !== '' &&
               formData.config.province.trim() !== '' &&
               formData.config.locality.trim() !== '' &&
               formData.config.postalCode.trim() !== '';
      
      case 3: // Configuración de Pagos
        return formData.mercadoPagoToken.trim() !== '' &&
               /^TEST-[a-zA-Z0-9]{32}$|^APP_USR-[a-zA-Z0-9]{32}$/.test(formData.mercadoPagoToken);
      
      default:
        return false;
    }
  };

  // Función para navegar a un step específico
  const handleStepClick = (step: number) => {
    // Solo permitir navegación a steps completos o al step actual
    if (step <= activeStep || isStepComplete(step)) {
      setActiveStep(step);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(activeStep)) return;

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Llamada a la API para crear la tienda
      const response = await createStore(formData);
      
             // Verificar si la respuesta es exitosa (200 OK o 201 Created)
       if (response.data && (response.status === 200 || response.status === 201)) {
         setSuccess('¡Tu tienda ha sido creada exitosamente!');
         setShowSuccessModal(true);
       } else {
         // Si hay un error en la respuesta
         const errorMessage = response.data?.error || 'Error al crear la tienda. Por favor, intenta de nuevo.';
         setError(errorMessage);
       }
      
    } catch (err: any) {
      console.error('Error creating store:', err);
      
             // Manejar diferentes tipos de errores
       let errorMessage = '';
       if (err.response?.data?.error) {
         // Error específico del backend
         errorMessage = err.response.data.error;
       } else if (err.response?.status === 409) {
         // Conflicto - subdominio ya existe
         errorMessage = 'Este nombre de tienda ya está en uso. Por favor, elige otro subdominio.';
       } else if (err.response?.status === 400) {
         // Error de validación
         errorMessage = 'Los datos ingresados no son válidos. Por favor, revisa la información.';
       } else if (err.response?.status === 500) {
         // Error del servidor
         errorMessage = 'Error interno del servidor. Por favor, intenta de nuevo más tarde.';
       } else {
         // Error genérico
         errorMessage = 'Error al crear la tienda. Por favor, intenta de nuevo.';
       }
       
       setError(errorMessage);
       setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
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
                onChange={(e) => handleInputChange('subdomain', e.target.value.toLowerCase())}
                error={!!errors.subdomain || !!subdomainError}
                helperText={
                  subdomainError || 
                  errors.subdomain || 
                  (subdomainVerified ? '✅ Subdominio disponible' : `${formData.subdomain}.tiendapro.com.ar`)
                }
                InputProps={{
                  endAdornment: <InputAdornment position="end">.tiendapro.com.ar</InputAdornment>,
                }}
                placeholder="mi-tienda"
              />
              <Button
                variant="outlined"
                onClick={verifySubdomain}
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
                onChange={(e) => handleInputChange('config.metadata.title', e.target.value)}
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
                onChange={(e) => handleInputChange('config.metadata.description', e.target.value)}
                placeholder="Describe brevemente tu tienda y los productos que vendes..."
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL del Logo (opcional)"
                value={formData.config.metadata.logo}
                onChange={(e) => handleInputChange('config.metadata.logo', e.target.value)}
                placeholder="https://ejemplo.com/logo.png"
                helperText="Puedes agregar tu logo más tarde desde el panel de administración"
              />
            </Grid>
          </Grid>
        );

             case 1:
         return (
           <Grid container spacing={3}>
             <Grid item xs={12}>
               <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                 Información de Contacto
               </Typography>
             </Grid>
             
             <Grid item xs={12} md={6}>
               <TextField
                 fullWidth
                 label="Nombre"
                 value={formData.config.firstName}
                 onChange={(e) => handleInputChange('config.firstName', e.target.value)}
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
                 onChange={(e) => handleInputChange('config.lastName', e.target.value)}
                 error={!!errors['config.lastName']}
                 helperText={errors['config.lastName']}
                 placeholder="Pérez"
               />
             </Grid>
             
             <Grid item xs={12} md={6}>
               <TextField
                 fullWidth
                 label="Email de Contacto"
                 type="email"
                 value={formData.config.email}
                 onChange={(e) => handleInputChange('config.email', e.target.value)}
                 error={!!errors['config.email']}
                 helperText={errors['config.email']}
                 placeholder="contacto@mitienda.com"
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
                   handleInputChange('config.phone', numericValue);
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
                  onChange={(e) => handleInputChange('config.cuil', e.target.value)}
                  error={!!errors['config.cuil']}
                  helperText={errors['config.cuil'] || "Formato: XX-XXXXXXXX-X"}
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
                  onChange={(e) => handleInputChange('password', e.target.value)}
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
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword || "Repite tu contraseña"}
                  placeholder="••••••••"
                  required
                />
              </Grid>
            </Grid>
          );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Dirección de la Empresa
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dirección"
                value={formData.config.address}
                onChange={(e) => handleInputChange('config.address', e.target.value)}
                error={!!errors['config.address']}
                helperText={errors['config.address']}
                placeholder="Av. Corrientes 1234"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Provincia"
                value={formData.config.province}
                onChange={(e) => handleInputChange('config.province', e.target.value)}
                error={!!errors['config.province']}
                helperText={errors['config.province']}
                placeholder="Buenos Aires"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Localidad"
                value={formData.config.locality}
                onChange={(e) => handleInputChange('config.locality', e.target.value)}
                error={!!errors['config.locality']}
                helperText={errors['config.locality']}
                placeholder="Ciudad Autónoma de Buenos Aires"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Código Postal"
                value={formData.config.postalCode}
                onChange={(e) => handleInputChange('config.postalCode', e.target.value)}
                error={!!errors['config.postalCode']}
                helperText={errors['config.postalCode']}
                placeholder="1001"
              />
            </Grid>
          </Grid>
                 );

       case 3:
         return (
           <Grid container spacing={3}>
             <Grid item xs={12}>
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                 <Payment sx={{ fontSize: 28, color: 'primary.main' }} />
                 <Typography variant="h6" sx={{ fontWeight: 600 }}>
                   Configuración de Pagos - MercadoPago
                 </Typography>
               </Box>
               <Alert severity="info" sx={{ mb: 3 }}>
                 <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                   ⚠️ IMPORTANTE: Este paso es fundamental para recibir pagos
                 </Typography>
                 <Typography variant="body2">
                   Necesitamos tu token de MercadoPago para conectar tu cuenta y que puedas recibir 
                   el dinero de las ventas directamente en tu cuenta bancaria.
                 </Typography>
               </Alert>
             </Grid>
             
             <Grid item xs={12}>
               <Card variant="outlined" sx={{ mb: 3 }}>
                 <CardContent>
                   <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                     📋 Cómo obtener tu Token de MercadoPago:
                   </Typography>
                   <Box component="ol" sx={{ pl: 2, mb: 2 }}>
                     <Box component="li" sx={{ mb: 1 }}>
                       <Typography variant="body2">
                         Ve a <strong>mercadopago.com.ar</strong> e inicia sesión en tu cuenta
                       </Typography>
                     </Box>
                     <Box component="li" sx={{ mb: 1 }}>
                       <Typography variant="body2">
                         Haz clic en tu nombre en la esquina superior derecha
                       </Typography>
                     </Box>
                     <Box component="li" sx={{ mb: 1 }}>
                       <Typography variant="body2">
                         Selecciona <strong>"Configuración"</strong> en el menú
                       </Typography>
                     </Box>
                     <Box component="li" sx={{ mb: 1 }}>
                       <Typography variant="body2">
                         Ve a la sección <strong>"Credenciales"</strong>
                       </Typography>
                     </Box>
                     <Box component="li" sx={{ mb: 1 }}>
                       <Typography variant="body2">
                         Copia tu <strong>"Access Token"</strong> (empieza con APP_USR-)
                       </Typography>
                     </Box>
                     <Box component="li">
                       <Typography variant="body2">
                         Pégala en el campo de abajo
                       </Typography>
                     </Box>
                   </Box>
                   <Alert severity="warning" sx={{ mt: 2 }}>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                       <Security sx={{ fontSize: 20 }} />
                       <Typography variant="body2" sx={{ fontWeight: 600 }}>
                         Seguridad: Tu token es privado y seguro. Solo lo usamos para conectar tu cuenta.
                       </Typography>
                     </Box>
                   </Alert>
                 </CardContent>
               </Card>
             </Grid>
             
             <Grid item xs={12}>
               <TextField
                 fullWidth
                 label="Token de MercadoPago"
                 value={formData.mercadoPagoToken}
                 onChange={(e) => handleInputChange('mercadoPagoToken', e.target.value)}
                 error={!!errors.mercadoPagoToken}
                 helperText={errors.mercadoPagoToken || "Ejemplo: APP_USR-12345678901234567890123456789012"}
                 placeholder="APP_USR-"
                 InputProps={{
                   startAdornment: <InputAdornment position="start">🔑</InputAdornment>,
                 }}
               />
             </Grid>
             
             <Grid item xs={12}>
               <Alert severity="success" sx={{ mt: 2 }}>
                 <Typography variant="body2">
                   <strong>✅ Beneficios de conectar MercadoPago:</strong>
                 </Typography>
                 <Box component="ul" sx={{ mt: 1, pl: 2 }}>
                   <Box component="li">
                     <Typography variant="body2">Recibirás pagos directamente en tu cuenta bancaria</Typography>
                   </Box>
                   <Box component="li">
                     <Typography variant="body2">Acceso a todas las formas de pago (tarjetas, efectivo, transferencias)</Typography>
                   </Box>
                   <Box component="li">
                     <Typography variant="body2">Reportes detallados de ventas y comisiones</Typography>
                   </Box>
                   <Box component="li">
                     <Typography variant="body2">Soporte técnico especializado de MercadoPago</Typography>
                   </Box>
                 </Box>
               </Alert>
             </Grid>
           </Grid>
         );

       case 4:
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
                     <Typography variant="body1">
                       {formData.config.address}, {formData.config.locality}, {formData.config.province} ({formData.config.postalCode})
                     </Typography>
                   </CardContent>
                 </Card>
               </Grid>
               
               <Grid item xs={12} md={6}>
                 <Card variant="outlined">
                   <CardContent>
                     <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                       Configuración de Pagos
                     </Typography>
                     <Box>
                       <Typography variant="body2" color="text.secondary">MercadoPago Token:</Typography>
                       <Typography variant="body1" sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                         {formData.mercadoPagoToken ? `${formData.mercadoPagoToken.substring(0, 20)}...` : 'No configurado'}
                       </Typography>
                     </Box>
                   </CardContent>
                 </Card>
               </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: { xs: 2, md: 4 }, textAlign: 'center' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: { xs: 50, md: 60 },
                height: { xs: 50, md: 60 },
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Store sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }} />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: 'white',
                fontSize: { xs: '1.75rem', md: '3rem' },
              }}
            >
              Crea tu Tienda
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: 600,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Configura tu tienda online en minutos y comienza a vender
          </Typography>
        </Box>

        <Card
          elevation={24}
          sx={{
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            {/* Mobile Stepper */}
            <MobileStepper
              steps={steps}
              activeStep={activeStep}
              onStepClick={handleStepClick}
              onBack={handleBack}
              isStepComplete={isStepComplete}
              showBackButton={activeStep > 0}
            />
            
            {/* Desktop Stepper */}
            <Box sx={{ mb: 4, display: { xs: 'none', md: 'block' } }}>
               <Stepper activeStep={activeStep} alternativeLabel>
                 {steps.map((label, index) => (
                   <Step key={label}>
                     <StepLabel
                       onClick={() => handleStepClick(index)}
                       sx={{
                         cursor: (index <= activeStep || isStepComplete(index)) ? 'pointer' : 'default',
                         '&:hover': {
                           color: (index <= activeStep || isStepComplete(index)) ? 'primary.main' : 'inherit',
                         },
                         '& .MuiStepLabel-label': {
                           cursor: (index <= activeStep || isStepComplete(index)) ? 'pointer' : 'default',
                           '&:hover': {
                             color: (index <= activeStep || isStepComplete(index)) ? 'primary.main' : 'inherit',
                           },
                         },
                       }}
                     >
                       {label}
                     </StepLabel>
                   </Step>
                 ))}
               </Stepper>
             </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            {/* Step Content */}
            <Box sx={{ mb: { xs: 2, md: 4 } }}>
              {renderStepContent(activeStep)}
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBack />}
                sx={{ visibility: activeStep === 0 ? 'hidden' : 'visible' }}
              >
                Anterior
              </Button>

              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
                    endIcon={<ArrowForward />}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      },
                    }}
                  >
                    {loading ? 'Creando Tienda...' : 'Crear Mi Tienda'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={activeStep === 0 && !subdomainVerified}
                    endIcon={<ArrowForward />}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      },
                      '&:disabled': {
                        background: 'rgba(0, 0, 0, 0.12)',
                        color: 'rgba(0, 0, 0, 0.38)',
                      },
                    }}
                  >
                    {activeStep === 0 && !subdomainVerified ? 'Verifica el subdominio primero' : 'Siguiente'}
                  </Button>
                )}
              </Box>
            </Box>
          </CardContent>
                 </Card>
       </Container>

               {/* Modal de Error */}
        <Dialog
          open={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              border: '2px solid #f44336',
            }
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            color: '#f44336',
            fontWeight: 600,
            pb: 1
          }}>
            <Error sx={{ fontSize: 28 }} />
            Error al Crear la Tienda
            <IconButton
              onClick={() => setShowErrorModal(false)}
              sx={{ ml: 'auto', color: 'text.secondary' }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 0 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {error}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button
              onClick={() => setShowErrorModal(false)}
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Cerrar
            </Button>
            <Button
              onClick={() => {
                setShowErrorModal(false);
                setError(null);
              }}
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
              }}
            >
              Intentar de Nuevo
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal de Éxito */}
        <Dialog
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              border: '2px solid #4caf50',
            }
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            color: '#4caf50',
            fontWeight: 600,
            pb: 1
          }}>
            <CheckCircle sx={{ fontSize: 28 }} />
            ¡Tienda Creada Exitosamente!
            <IconButton
              onClick={() => setShowSuccessModal(false)}
              sx={{ ml: 'auto', color: 'text.secondary' }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 0 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              ¡Felicitaciones! Tu tienda <strong>{formData.config.metadata.title}</strong> ha sido creada exitosamente.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Tu tienda estará disponible en: <strong>{formData.subdomain}.tiendapro.com.ar</strong>
            </Typography>
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Próximos pasos:</strong>
              </Typography>
              <Box component="ul" sx={{ mt: 1, pl: 2, mb: 0 }}>
                <Box component="li">
                  <Typography variant="body2">Configura tus productos y categorías</Typography>
                </Box>
                <Box component="li">
                  <Typography variant="body2">Personaliza el diseño de tu tienda</Typography>
                </Box>
                <Box component="li">
                  <Typography variant="body2">Configura métodos de envío y pago</Typography>
                </Box>
                <Box component="li">
                  <Typography variant="body2">¡Comienza a vender!</Typography>
                </Box>
              </Box>
            </Alert>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button
              onClick={() => setShowSuccessModal(false)}
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Cerrar
            </Button>
            <Button
              onClick={() => {
                setShowSuccessModal(false);
                window.location.href = `https://${formData.subdomain}.admin.tiendapro.com.ar`;
              }}
              variant="contained"
              startIcon={<OpenInNew />}
              sx={{
                background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #45a049 0%, #3d8b40 100%)',
                },
              }}
            >
              Ir al Panel de Administración
            </Button>
          </DialogActions>
        </Dialog>
     </Box>
   );
 };

export default CreateStorePage;
