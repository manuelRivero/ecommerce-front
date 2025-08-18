'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const footerSections = [
    {
      title: 'Producto',
      links: [
        { text: 'Características', href: '#features' },
        { text: 'Beneficios', href: '#benefits' },
        { text: 'Precios', href: '#pricing' },
        { text: 'Demo', href: '#demo' },
      ],
    },
    {
      title: 'Soporte',
      links: [
        { text: 'Centro de Ayuda', href: '#help' },
        { text: 'Documentación', href: '#docs' },
        { text: 'Contacto', href: '#contact' },
        { text: 'Estado del Sistema', href: '#status' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { text: 'Acerca de Nosotros', href: '#about' },
        { text: 'Blog', href: '#blog' },
        { text: 'Carreras', href: '#careers' },
        { text: 'Prensa', href: '#press' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Términos de Servicio', href: '#terms' },
        { text: 'Política de Privacidad', href: '#privacy' },
        { text: 'Cookies', href: '#cookies' },
        { text: 'GDPR', href: '#gdpr' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook />, href: '#', label: 'Facebook' },
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <Instagram />, href: '#', label: 'Instagram' },
    { icon: <LinkedIn />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <Box
      id="contact"
      sx={{
        backgroundColor: 'grey.900',
        color: 'white',
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Ecommerce Platform
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: 'grey.300',
                  lineHeight: 1.6,
                }}
              >
                Transformamos negocios en tiendas online profesionales y rentables. 
                Maximiza tus ventas con nuestra plataforma completa de ecommerce.
              </Typography>
              
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Email sx={{ color: 'grey.400' }} />
                  <Typography variant="body2" color="grey.300">
                    contacto@ecommerceplatform.com
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Phone sx={{ color: 'grey.400' }} />
                  <Typography variant="body2" color="grey.300">
                    +54 11 1234-5678
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LocationOn sx={{ color: 'grey.400' }} />
                  <Typography variant="body2" color="grey.300">
                    Buenos Aires, Argentina
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: 'white',
                  }}
                >
                  {section.title}
                </Typography>
                <Stack spacing={2}>
                  {section.links.map((link, linkIndex) => (
                    <Typography
                      key={linkIndex}
                      component="a"
                      href={link.href}
                      variant="body2"
                      sx={{
                        color: 'grey.300',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease-in-out',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {link.text}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: 'grey.700', my: 4 }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            color="grey.400"
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            © 2024 Ecommerce Platform. Todos los derechos reservados.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: { xs: 'center', md: 'flex-end' } }}
          >
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                component="a"
                href={social.href}
                sx={{
                  minWidth: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'grey.800',
                  color: 'grey.300',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
                aria-label={social.label}
              >
                {social.icon}
              </Button>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 