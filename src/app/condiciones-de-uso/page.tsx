'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  Security,
  Payment,
  Store,
  Support,
  Gavel,
  Info,
} from '@mui/icons-material';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const CondicionesDeUso = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const sections = [
    {
      title: 'Aceptación de las Condiciones',
      icon: <CheckCircle />,
      content: 'Al acceder y utilizar TiendaPro, usted acepta estar sujeto a estas Condiciones de Uso. Si no está de acuerdo con alguna parte de estas condiciones, le recomendamos no utilizar nuestros servicios.',
    },
    {
      title: 'Descripción del Servicio',
      icon: <Store />,
      content: 'TiendaPro es una plataforma que permite a comerciantes crear y gestionar tiendas online personalizadas con subdominios personalizados, panel de administración completo, integración con MercadoPago y herramientas de gestión de productos.',
      items: [
        'Creación de tiendas con subdominios personalizados',
        'Panel de administración completo',
        'Integración con MercadoPago para procesamiento de pagos',
        'Herramientas de gestión de productos y categorías',
        'Personalización de diseño y configuración',
      ],
    },
    {
      title: 'Registro y Cuenta de Usuario',
      icon: <Security />,
      content: 'Para utilizar nuestros servicios, debe tener al menos 18 años de edad, capacidad legal para celebrar contratos y proporcionar información veraz y actualizada.',
      items: [
        'Información personal completa (nombre, apellido, CUIL)',
        'Datos de contacto (email, teléfono)',
        'Dirección comercial',
        'Token de MercadoPago válido',
        'Subdominio deseado para su tienda',
      ],
    },
    {
      title: 'Uso Aceptable',
      icon: <Info />,
      content: 'Puede crear y gestionar tiendas online legítimas, vender productos y servicios legales, y utilizar las herramientas de administración proporcionadas.',
      items: [
        'Vender productos ilegales o prohibidos por ley',
        'Utilizar la plataforma para actividades fraudulentas',
        'Intentar acceder a cuentas de otros usuarios',
        'Transmitir malware o contenido dañino',
        'Realizar spam o marketing no solicitado',
        'Violar derechos de propiedad intelectual',
      ],
      warning: true,
    },
    {
      title: 'Pagos y Facturación',
      icon: <Payment />,
      content: 'La plataforma utiliza MercadoPago para procesar pagos. Los pagos se procesan directamente a su cuenta de MercadoPago y TiendaPro no retiene comisiones sobre las ventas.',
      items: [
        'Mantener un token de MercadoPago válido',
        'Configurar correctamente su cuenta de MercadoPago',
        'Cumplir con los términos y condiciones de MercadoPago',
        'Resolver disputas de pago con sus clientes',
      ],
    },
    {
      title: 'Limitación de Responsabilidad',
      icon: <Warning />,
      content: 'TiendaPro proporciona la plataforma "tal como está". No somos responsables por pérdidas de beneficios o daños indirectos.',
      items: [
        'Problemas de conectividad de internet',
        'Errores en la configuración de MercadoPago',
        'Contenido generado por usuarios',
        'Actos de terceros o fuerza mayor',
      ],
    },
    {
      title: 'Suspensión y Terminación',
      icon: <Gavel />,
      content: 'Podemos suspender o terminar su cuenta si detectamos actividad sospechosa, recibe quejas sobre su tienda, o viola estas condiciones.',
    },
    {
      title: 'Contacto y Soporte',
      icon: <Support />,
      content: 'Proporcionamos soporte técnico durante horarios comerciales y nos esforzamos por responder en un plazo razonable.',
      items: [
        'Email: soporte@tiendapro.com.ar',
        'Horarios: Lunes a Viernes de 9:00 a 18:00 (GMT-3)',
      ],
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
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: 'white',
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 2,
            }}
          >
            Condiciones de Uso
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Conozca los términos y condiciones que rigen el uso de nuestra plataforma
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
                         {sections.map((section, index) => (
               <Card
                 key={index}
                 id={`section-${index}`}
                 sx={{
                   mb: 3,
                   borderRadius: 3,
                   boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                   backdropFilter: 'blur(10px)',
                   backgroundColor: 'rgba(255, 255, 255, 0.95)',
                 }}
               >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: section.warning ? 'warning.light' : 'primary.light',
                        color: section.warning ? 'warning.contrastText' : 'primary.contrastText',
                        mr: 2,
                      }}
                    >
                      {section.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                      }}
                    >
                      {section.title}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      mb: section.items ? 2 : 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {section.content}
                  </Typography>

                  {section.items && (
                    <List sx={{ mt: 2 }}>
                      {section.items.map((item, itemIndex) => (
                        <ListItem key={itemIndex} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                backgroundColor: section.warning ? 'warning.main' : 'primary.main',
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            sx={{
                              '& .MuiListItemText-primary': {
                                fontSize: '0.95rem',
                                color: 'text.secondary',
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Sidebar */}
          {!isMobile && (
            <Box sx={{ width: 300 }}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  position: 'sticky',
                  top: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  Índice
                </Typography>
                <List sx={{ py: 0 }}>
                  {sections.map((section, index) => (
                    <ListItem
                      key={index}
                      button
                      sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        '&:hover': {
                          backgroundColor: 'primary.light',
                          color: 'primary.contrastText',
                        },
                      }}
                      onClick={() => {
                        const element = document.getElementById(`section-${index}`);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <ListItemText
                        primary={section.title}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontSize: '0.9rem',
                            fontWeight: 500,
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    textAlign: 'center',
                    fontStyle: 'italic',
                  }}
                >
                  Última actualización: {new Date().toLocaleDateString('es-AR')}
                </Typography>
              </Paper>
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Para consultas sobre estas condiciones, contacte a soporte@tiendapro.com.ar
          </Typography>
                 </Box>
       </Container>
     </Box>
     <Footer />
   </>
 );
};

export default CondicionesDeUso;
