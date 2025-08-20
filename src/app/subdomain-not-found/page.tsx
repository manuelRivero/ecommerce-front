'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Divider,
  Fade,
} from '@mui/material';
import {
  Store,
  Email,
  CheckCircle,
  ArrowForward,
} from '@mui/icons-material';
import { useSearchParams } from 'next/navigation';

const SubdomainNotFoundPage = () => {
  const searchParams = useSearchParams();
  const [subdomain, setSubdomain] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Obtener el subdominio del hostname
    const hostname = window.location.hostname;
    const extractedSubdomain = hostname.split('.')[0];
    setSubdomain(extractedSubdomain);
    setMounted(true);
  }, []);

  const handleContact = () => {
    // Redirigir a la página de crear tienda
    window.location.href = '/crear-tienda';
  };

  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Fade in={mounted} timeout={800}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
              },
            }}
          >
            {/* Icono principal */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 4,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                }}
              >
                <Store sx={{ fontSize: 40, color: 'white' }} />
              </Box>
            </Box>

            {/* Título principal */}
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              ¡Nombre Disponible!
            </Typography>

            {/* Subdominio destacado */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 3,
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                mb: 3,
                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
              }}
            >
              <CheckCircle sx={{ fontSize: 20 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontFamily: 'monospace',
                }}
              >
                {subdomain}.tiendapro.com.ar
              </Typography>
            </Box>

            {/* Descripción */}
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 4,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Este nombre de tienda está disponible para registrarse. 
              Crea tu tienda online profesional en minutos y comienza a vender.
            </Typography>

            <Divider sx={{ my: 4, opacity: 0.3 }} />

            {/* Beneficios */}
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={3}
              sx={{ mb: 5 }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  🚀 Configuración Rápida
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tu tienda lista en menos de 5 minutos
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  💳 Pagos Seguros
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Integración completa con MercadoPago
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  📱 Responsive
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Perfecta en todos los dispositivos
                </Typography>
              </Box>
            </Stack>

            {/* Botón de contacto */}
            <Button
              variant="contained"
              size="large"
              startIcon={<Email />}
              endIcon={<ArrowForward />}
              onClick={handleContact}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                },
              }}
            >
                             Crear Mi Tienda
            </Button>

            {/* Información adicional */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 4,
                opacity: 0.7,
              }}
            >
              ¿Tienes preguntas? Nuestro equipo está aquí para ayudarte
            </Typography>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default SubdomainNotFoundPage;
