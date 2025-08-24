'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Security,
  DataUsage,
  Share,
  Storage,
  Gavel,
  Cookie,
  ChildCare,
  Public,
  Update,
  ContactSupport,
  Business,
  Shield,
  Description,
  Lock,
} from '@mui/icons-material';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const PoliticasDePrivacidadPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const sections = [
    {
      id: 'informacion-general',
      title: 'Información General',
      icon: <Lock sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Typography variant="body1" sx={{ mb: 2 }}>
          TiendaPro ("nosotros", "nuestro", "la Plataforma") se compromete a proteger la privacidad de sus usuarios. 
          Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos su información 
          personal cuando utiliza nuestros servicios.
        </Typography>
      ),
    },
    {
      id: 'informacion-recopilada',
      title: 'Información que Recopilamos',
      icon: <DataUsage sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Información Personal
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Datos de identificación: Nombre, apellido, CUIL/CUIT" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Información de contacto: Email, número de teléfono" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Datos comerciales: Dirección comercial, información de facturación" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Datos de la tienda: Subdominio elegido, configuración" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Información Técnica
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Datos de navegación: IP, navegador, sistema operativo" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Cookies y tecnologías similares" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Datos de uso: Páginas visitadas, tiempo de permanencia" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Información de Transacciones
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Datos de pago: Integración con MercadoPago" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Historial de transacciones para facturación" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'uso-informacion',
      title: 'Cómo Utilizamos su Información',
      icon: <Business sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Propósitos Principales
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Provisión de servicios: Crear y gestionar su tienda online" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Comunicación: Notificaciones importantes y soporte técnico" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Facturación: Procesar pagos y generar facturas" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Mejoras: Analizar el uso para mejorar nuestros servicios" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Propósitos Secundarios
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Marketing: Enviar ofertas y novedades (con consentimiento)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Análisis: Generar estadísticas y reportes agregados" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Seguridad: Detectar y prevenir actividades fraudulentas" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'comparticion-informacion',
      title: 'Compartición de Información',
      icon: <Share sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Terceros de Servicio
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• MercadoPago: Para procesamiento de pagos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Proveedores de hosting: Para alojamiento de la plataforma" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Servicios de análisis: Para mejorar la experiencia" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Requisitos Legales
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Autoridades competentes: Cuando sea requerido por ley" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Protección de derechos: Para proteger nuestros derechos" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'success.main' }}>
            No Vendemos Información
          </Typography>
          <Typography variant="body1" sx={{ color: 'success.main' }}>
            TiendaPro no vende, alquila ni comercializa su información personal a terceros.
          </Typography>
        </Box>
      ),
    },
    {
      id: 'almacenamiento-seguridad',
      title: 'Almacenamiento y Seguridad',
      icon: <Storage sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Ubicación de Datos
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Los datos se almacenan en servidores seguros en Argentina" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Cumplimos con las regulaciones locales de protección de datos" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Medidas de Seguridad
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Encriptación: Datos sensibles encriptados en tránsito y reposo" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Acceso restringido: Solo personal autorizado" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Monitoreo continuo: Sistemas de detección de intrusiones" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Copias de seguridad: Respaldo regular de datos" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Retención de Datos
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Datos activos: Mientras mantenga una cuenta activa" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Datos de facturación: Según requerimientos legales (5 años)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Datos de navegación: Hasta 2 años para análisis" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'derechos-usuario',
      title: 'Sus Derechos',
      icon: <Gavel sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Acceso y Rectificación
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Acceso: Solicitar copia de sus datos personales" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Rectificación: Corregir información inexacta" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Actualización: Mantener su información actualizada" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Cancelación y Portabilidad
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Cancelación: Solicitar la eliminación de su cuenta" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Portabilidad: Recibir sus datos en formato estructurado" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Limitación: Restringir el procesamiento de sus datos" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Oposición y Revocación
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Oposición: Oponerse al procesamiento de datos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Revocación: Retirar el consentimiento en cualquier momento" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Marketing: Cancelar suscripciones a comunicaciones" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'cookies-tecnologias',
      title: 'Cookies y Tecnologías Similares',
      icon: <Cookie sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Tipos de Cookies
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Esenciales: Necesarias para el funcionamiento de la plataforma" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Funcionales: Para recordar preferencias y configuraciones" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Analíticas: Para entender el uso de la plataforma" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Marketing: Para mostrar contenido relevante" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Gestión de Cookies
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Puede configurar su navegador para rechazar cookies" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Algunas funciones pueden no estar disponibles sin cookies" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Utilizamos tecnologías similares como localStorage" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'datos-menores',
      title: 'Datos de Menores de Edad',
      icon: <ChildCare sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Protección de Menores
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• No recopilamos intencionalmente datos de menores de 18 años" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Si detectamos datos de menores, los eliminamos inmediatamente" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Los padres pueden solicitar la eliminación de datos de sus hijos" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'transferencias-internacionales',
      title: 'Transferencias Internacionales',
      icon: <Public sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Alcance de Transferencias
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Los datos se procesan principalmente en Argentina" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Algunos servicios de terceros pueden estar en otros países" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Garantizamos protección adecuada en todas las transferencias" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'cambios-politica',
      title: 'Cambios en la Política',
      icon: <Update sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Notificación de Cambios
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Notificaremos cambios significativos por email" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• La fecha de última actualización se actualiza automáticamente" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• El uso continuado implica aceptación de los cambios" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Versiones Anteriores
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Las versiones anteriores están disponibles a solicitud" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Se recomienda revisar periódicamente esta política" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'contacto-derechos',
      title: 'Contacto y Ejercicio de Derechos',
      icon: <ContactSupport sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Oficial de Privacidad
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText 
                primary="Email" 
                secondary="privacidad@tiendapro.com.ar" 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Dirección" 
                secondary="[Dirección de la empresa]" 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Horarios" 
                secondary="Lunes a Viernes de 9:00 a 18:00 (GMT-3)" 
              />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Proceso de Solicitudes
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Respondemos solicitudes dentro de 30 días" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Puede ejercer sus derechos gratuitamente" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Requerimos verificación de identidad para solicitudes sensibles" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Autoridad de Control
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Puede presentar reclamos ante la autoridad de protección de datos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• En Argentina: Dirección Nacional de Protección de Datos Personales" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'disposiciones-especificas',
      title: 'Disposiciones Específicas',
      icon: <Description sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Comerciantes
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Los comerciantes son responsables de manejar datos de sus clientes" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Deben cumplir con las leyes de protección de datos aplicables" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Recomendamos implementar políticas de privacidad propias" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Clientes de Tiendas
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Los datos de compra se comparten con el comerciante correspondiente" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• El comerciante es responsable de la protección de estos datos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• TiendaPro no es responsable del uso que hagan los comerciantes" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'medidas-cumplimiento',
      title: 'Medidas de Cumplimiento',
      icon: <Shield sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Auditorías Regulares
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Realizamos auditorías internas de privacidad" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Evaluamos y mejoramos nuestras prácticas continuamente" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Capacitamos a nuestro personal en protección de datos" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Respuesta a Incidentes
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Tenemos procedimientos para responder a violaciones de datos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Notificaremos incidentes según lo requiera la ley" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Tomaremos medidas correctivas inmediatas" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'disposiciones-finales',
      title: 'Disposiciones Finales',
      icon: <Gavel sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Ley Aplicable
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Esta política se rige por las leyes argentinas. Cualquier disputa se resolverá en los tribunales competentes.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Acuerdo Completo
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Esta política constituye el acuerdo completo sobre privacidad y reemplaza cualquier acuerdo anterior sobre el tema.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Separabilidad
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Si alguna cláusula es inválida, las demás permanecen vigentes" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Las cláusulas inválidas serán reemplazadas por disposiciones válidas" />
            </ListItem>
          </List>
        </Box>
      ),
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
                                 <Lock sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }} />
              </Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  fontSize: { xs: '2rem', md: '3.5rem' },
                }}
              >
                Políticas de Privacidad
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
              Protegiendo su privacidad y datos personales en nuestra plataforma TiendaPro
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
            {/* Main Content */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ space: 4 }}>
                {sections.map((section, index) => (
                  <Card
                    key={section.id}
                    id={section.id}
                    sx={{
                      mb: 4,
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 3,
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        {section.icon}
                        <Typography variant="h4" sx={{ fontWeight: 600 }}>
                          {section.title}
                        </Typography>
                      </Box>
                      <Divider sx={{ mb: 3 }} />
                      {section.content}
                    </CardContent>
                  </Card>
                ))}
              </Box>
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
                    {sections.map((section) => (
                      <ListItem
                        key={section.id}
                        component="button"
                        onClick={() => scrollToSection(section.id)}
                        sx={{
                          borderRadius: 1,
                          mb: 0.5,
                          textAlign: 'left',
                          width: '100%',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: 'primary.light',
                            color: 'primary.contrastText',
                          },
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

          {/* Footer Section */}
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
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  TiendaPro - Plataforma de E-commerce
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                  Facilitando el comercio digital en Argentina
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Última actualización: {new Date().toLocaleDateString('es-AR')}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default PoliticasDePrivacidadPage;
