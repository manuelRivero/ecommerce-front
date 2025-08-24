'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Stack,
  Paper,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Send,
  Business,
  Support,
  Schedule,
  CheckCircle,
} from '@mui/icons-material';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const ContactoPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      // Envío real al backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.',
          severity: 'success',
        });
                 setFormData({
           name: '',
           email: '',
           phone: '',
           subject: '',
           message: '',
         });
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Email',
      value: 'contacto@tiendapro.com.ar',
      description: 'Escríbenos para cualquier consulta',
    },
    {
      icon: <Phone sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Teléfono',
      value: '+54 11 1234-5678',
      description: 'Lunes a Viernes de 9:00 a 18:00',
    },
    {
      icon: <LocationOn sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Oficina',
      value: 'Buenos Aires, Argentina',
      description: 'Zona centro, CABA',
    },
  ];

  const supportFeatures = [
    {
      icon: <Support sx={{ fontSize: 30, color: 'primary.main' }} />,
      title: 'Soporte Técnico',
      description: 'Asistencia especializada para resolver cualquier problema técnico',
    },
    {
      icon: <Business sx={{ fontSize: 30, color: 'secondary.main' }} />,
      title: 'Consultoría',
      description: 'Asesoramiento personalizado para optimizar tu tienda online',
    },
    {
      icon: <Schedule sx={{ fontSize: 30, color: 'success.main' }} />,
      title: 'Respuesta Rápida',
      description: 'Respondemos en menos de 24 horas hábiles',
    },
  ];

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          pt: { xs: 8, md: 10 },
          pb: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                mb: 3,
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
                <Email sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }} />
              </Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  fontSize: { xs: '2rem', md: '3.5rem' },
                }}
              >
                Contacto
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: 800,
                mx: 'auto',
                fontSize: { xs: '1.1rem', md: '1.5rem' },
              }}
            >
              Estamos aquí para ayudarte. ¡Contáctanos y transforma tu negocio digital!
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Información de contacto - OCULTA */}
            <Grid item xs={12} md={4} sx={{ display: 'none' }}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 4,
                      fontWeight: 600,
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Información de Contacto
                  </Typography>

                  <Stack spacing={4}>
                    {contactInfo.map((info, index) => (
                      <Box key={index} sx={{ textAlign: 'center' }}>
                        <Box sx={{ mb: 2 }}>
                          {info.icon}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 1,
                            fontWeight: 600,
                            color: 'text.primary',
                          }}
                        >
                          {info.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 1,
                            fontWeight: 500,
                            color: 'primary.main',
                          }}
                        >
                          {info.value}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {info.description}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>

                  <Box sx={{ mt: 4, p: 3, background: 'rgba(103, 126, 234, 0.1)', borderRadius: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: 600,
                        color: 'primary.main',
                        textAlign: 'center',
                      }}
                    >
                      Horarios de Atención
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Lunes a Viernes:</strong> 9:00 - 18:00
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Sábados:</strong> 9:00 - 13:00
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Domingos:</strong> Cerrado
                      </Typography>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Formulario de contacto */}
            <Grid item xs={12} md={12}>
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 4,
                      fontWeight: 600,
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Envíanos un Mensaje
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                                             <Grid item xs={12} sm={6}>
                         <TextField
                           fullWidth
                           label="Nombre completo"
                           value={formData.name}
                           onChange={handleInputChange('name')}
                           required
                           variant="outlined"
                         />
                       </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange('email')}
                          required
                          variant="outlined"
                        />
                      </Grid>
                                             <Grid item xs={12} sm={6}>
                         <TextField
                           fullWidth
                           label="Teléfono"
                           value={formData.phone}
                           onChange={handleInputChange('phone')}
                           variant="outlined"
                         />
                       </Grid>
                                             <Grid item xs={12} sm={6}>
                         <TextField
                           fullWidth
                           label="Asunto"
                           value={formData.subject}
                           onChange={handleInputChange('subject')}
                           required
                           variant="outlined"
                         />
                       </Grid>
                                             <Grid item xs={12}>
                         <TextField
                           fullWidth
                           label="Mensaje"
                           multiline
                           rows={6}
                           value={formData.message}
                           onChange={handleInputChange('message')}
                           required
                           variant="outlined"
                           placeholder="Cuéntanos cómo podemos ayudarte..."
                         />
                       </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            endIcon={loading ? null : <Send />}
                            sx={{
                              px: 6,
                              py: 1.5,
                              fontSize: '1.1rem',
                              fontWeight: 600,
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                              },
                            }}
                          >
                            {loading ? 'Enviando...' : 'Enviar Mensaje'}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Características del soporte */}
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h3"
              sx={{
                mb: 4,
                fontWeight: 700,
                textAlign: 'center',
                color: 'white',
              }}
            >
              ¿Por qué elegir nuestro soporte?
            </Typography>

            <Grid container spacing={3}>
              {supportFeatures.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 3,
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box sx={{ mb: 3 }}>
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 2,
                          fontWeight: 600,
                          color: 'text.primary',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Mensaje de confianza */}
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
                  <CheckCircle sx={{ color: 'success.main', fontSize: 32 }} />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: 'success.main',
                    }}
                  >
                    Tu éxito es nuestra prioridad
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
                >
                  En TiendaPro, cada consulta es importante para nosotros. Nuestro equipo de expertos 
                  está comprometido en brindarte la mejor atención y soluciones personalizadas 
                  para que tu tienda online alcance su máximo potencial.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
      <Footer />

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ContactoPage;
