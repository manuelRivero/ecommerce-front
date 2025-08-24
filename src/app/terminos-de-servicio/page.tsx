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
  Gavel,
  Security,
  Payment,
  Business,
  ContactSupport,
  Description,
} from '@mui/icons-material';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const TerminosDeServicioPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const sections = [
    {
      id: 'aceptacion',
      title: 'Aceptación de los Términos',
      icon: <Gavel sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Typography variant="body1" sx={{ mb: 2 }}>
          Al utilizar TiendaPro (en adelante, "el Servicio"), usted acepta estar sujeto a estos Términos de Servicio. 
          Si no está de acuerdo con alguna parte de estos términos, le recomendamos no utilizar nuestros servicios.
        </Typography>
      ),
    },
    {
      id: 'definiciones',
      title: 'Definiciones',
      icon: <Description sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Para efectos de estos términos, se entiende por:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText 
                primary="Servicio" 
                secondary="Se refiere a la plataforma TiendaPro y todos sus componentes" 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Usuario" 
                secondary="Cualquier persona que utilice el Servicio" 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Comerciante" 
                secondary="Usuario que crea y gestiona una tienda a través del Servicio" 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Cliente" 
                secondary="Usuario que realiza compras en las tiendas creadas a través del Servicio" 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Contenido" 
                secondary="Cualquier información, datos, texto, imágenes, videos o materiales subidos al Servicio" 
              />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'descripcion-servicio',
      title: 'Descripción del Servicio',
      icon: <Business sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            TiendaPro es una plataforma de software como servicio (SaaS) que permite a los comerciantes:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Crear y personalizar tiendas online" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Gestionar productos, categorías y inventario" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Procesar pagos a través de MercadoPago" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Administrar pedidos y envíos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Acceder a herramientas de análisis y reportes" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Personalizar el diseño y configuración de la tienda" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'elegibilidad',
      title: 'Elegibilidad y Registro',
      icon: <Security sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Requisitos de Elegibilidad
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Debe tener al menos 18 años de edad" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Tener capacidad legal para celebrar contratos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Proporcionar información veraz y actualizada" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Cumplir con todas las leyes aplicables" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Proceso de Registro
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Debe completar el formulario de registro con información precisa" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Verificar la disponibilidad del subdominio elegido" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Configurar correctamente la integración con MercadoPago" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Aceptar estos términos y la política de privacidad" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'uso-servicio',
      title: 'Uso del Servicio',
      icon: <Business sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Uso Permitido
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Crear y gestionar tiendas online legítimas" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Vender productos y servicios legales" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Utilizar las herramientas de administración proporcionadas" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Personalizar el diseño de su tienda" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Procesar pagos de forma segura" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'error.main' }}>
            Uso Prohibido
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: 'error.main' }}>
            Está estrictamente prohibido:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText 
                primary="• Vender productos ilegales o prohibidos por ley" 
                sx={{ color: 'error.main' }}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="• Utilizar el Servicio para actividades fraudulentas" 
                sx={{ color: 'error.main' }}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="• Intentar acceder a cuentas de otros usuarios" 
                sx={{ color: 'error.main' }}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="• Transmitir malware o contenido dañino" 
                sx={{ color: 'error.main' }}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="• Realizar spam o marketing no solicitado" 
                sx={{ color: 'error.main' }}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="• Violar derechos de propiedad intelectual" 
                sx={{ color: 'error.main' }}
              />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'responsabilidades-comerciante',
      title: 'Responsabilidades del Comerciante',
      icon: <Business sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Contenido y Productos
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Es responsable de todo el contenido que publique en su tienda" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Debe asegurar que el contenido sea legal, preciso y no infrinja derechos de terceros" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Es responsable de la calidad y seguridad de sus productos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Debe cumplir con todas las leyes aplicables (consumidor, comercio, etc.)" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Configuración de Pagos
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Debe mantener un token de MercadoPago válido" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Es responsable de configurar correctamente su cuenta de MercadoPago" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Debe cumplir con los términos y condiciones de MercadoPago" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Es responsable de resolver disputas de pago con sus clientes" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Seguridad de la Cuenta
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Es responsable de mantener la confidencialidad de sus credenciales" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Debe notificar inmediatamente cualquier uso no autorizado" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Es responsable de todas las actividades realizadas en su cuenta" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'responsabilidades-tipro',
      title: 'Responsabilidades de TiendaPro',
      icon: <Business sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Disponibilidad del Servicio
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Nos esforzamos por mantener el Servicio disponible 24/7" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Puede haber interrupciones temporales por mantenimiento" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• No garantizamos disponibilidad ininterrumpida" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Soporte Técnico
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Proporcionamos soporte técnico durante horarios comerciales" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Nos esforzamos por responder en un plazo razonable" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• El soporte se proporciona según la disponibilidad de recursos" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Seguridad
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Implementamos medidas de seguridad para proteger los datos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Monitoreamos el Servicio para detectar actividades sospechosas" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• No garantizamos seguridad absoluta" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'pagos-facturacion',
      title: 'Pagos y Facturación',
      icon: <Payment sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Integración con MercadoPago
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• El Servicio utiliza MercadoPago para procesar pagos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Los pagos se procesan directamente a la cuenta de MercadoPago del comerciante" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• TiendaPro no retiene comisiones sobre las ventas" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• El comerciante es responsable de las comisiones de MercadoPago" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Tarifas del Servicio
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Las tarifas se establecen según el plan contratado" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Los precios pueden cambiar con notificación previa" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• El pago se realiza por adelantado según el ciclo de facturación" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'privacidad-datos',
      title: 'Privacidad y Datos',
      icon: <Security sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Protección de Datos
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Recopilamos y procesamos datos según nuestra Política de Privacidad" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Utilizamos medidas de seguridad para proteger la información" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• No compartimos datos personales con terceros sin consentimiento" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Datos de Clientes
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• El comerciante es responsable de manejar los datos de sus clientes según la ley" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Debe obtener consentimiento para el procesamiento de datos personales" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Debe implementar medidas de seguridad apropiadas" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'propiedad-intelectual',
      title: 'Propiedad Intelectual',
      icon: <Gavel sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Derechos de TiendaPro
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• TiendaPro conserva todos los derechos sobre la plataforma" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• El software y la tecnología son propiedad de TiendaPro" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Los comerciantes no adquieren derechos sobre la plataforma" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Contenido del Usuario
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Los comerciantes conservan los derechos sobre su contenido" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Al usar el Servicio, otorgan licencia para mostrar su contenido" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• TiendaPro no reclama propiedad sobre el contenido del usuario" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'limitacion-responsabilidad',
      title: 'Limitación de Responsabilidad',
      icon: <Security sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Alcance de la Responsabilidad
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• TiendaPro proporciona el Servicio 'tal como está'" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• No somos responsables por pérdidas de beneficios o daños indirectos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Nuestra responsabilidad máxima está limitada al monto pagado por el servicio" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Exclusiones
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            No somos responsables por:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Problemas de conectividad de internet" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Errores en la configuración de MercadoPago" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Contenido generado por usuarios" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Actos de terceros o fuerza mayor" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Pérdida de datos por causas ajenas a nuestro control" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'suspension-terminacion',
      title: 'Suspensión y Terminación',
      icon: <Security sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Suspensión
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Podemos suspender su cuenta temporalmente si:
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Detectamos actividad sospechosa" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Recibimos quejas sobre su tienda" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Usted viola estos términos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Es necesario para el mantenimiento del Servicio" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Terminación
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Podemos terminar su cuenta si:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Viola repetidamente estos términos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Realiza actividades ilegales" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• No paga las tarifas correspondientes" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Causa daño a la reputación del Servicio" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• No utiliza el Servicio por un período prolongado" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'cambios-terminos',
      title: 'Cambios en los Términos',
      icon: <Description sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Notificación de Cambios
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Podemos actualizar estos términos ocasionalmente" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Le notificaremos sobre cambios significativos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• El uso continuado implica aceptación de los cambios" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Versión Vigente
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• La versión más reciente siempre está disponible en la plataforma" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Se recomienda revisar periódicamente los términos" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'resolucion-disputas',
      title: 'Resolución de Disputas',
      icon: <Gavel sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Ley Aplicable
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Estos términos se rigen por las leyes de Argentina" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Cualquier disputa se resolverá en los tribunales competentes de Argentina" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Proceso de Resolución
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Intentaremos resolver las disputas de manera amistosa" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Si no es posible, se recurrirá a los tribunales competentes" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• El comerciante acepta la jurisdicción de los tribunales argentinos" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'disposiciones-generales',
      title: 'Disposiciones Generales',
      icon: <Description sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Acuerdo Completo
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Estos términos constituyen el acuerdo completo entre usted y TiendaPro respecto al uso del Servicio.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Separabilidad
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• Si alguna cláusula es declarada inválida, las demás permanecen vigentes" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Las cláusulas inválidas serán reemplazadas por disposiciones válidas similares" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Renuncia
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText primary="• La falta de ejercicio de un derecho no constituye renuncia" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Las renuncias deben ser por escrito para ser efectivas" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Cesión
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Usted no puede ceder estos términos sin nuestro consentimiento" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• TiendaPro puede ceder estos términos a cualquier momento" />
            </ListItem>
          </List>
        </Box>
      ),
    },
    {
      id: 'contacto',
      title: 'Contacto',
      icon: <ContactSupport sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Información de Contacto
          </Typography>
          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemText 
                primary="Email Legal" 
                secondary="legal@tiendapro.com.ar" 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Soporte Técnico" 
                secondary="soporte@tiendapro.com.ar" 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Dirección" 
                secondary="[Dirección de la empresa]" 
              />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Notificaciones
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Las notificaciones se enviarán por email a la dirección registrada" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Se considerarán recibidas 24 horas después del envío" />
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
                <Gavel sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }} />
              </Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  fontSize: { xs: '2rem', md: '3.5rem' },
                }}
              >
                Términos de Servicio
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
              Condiciones legales que rigen el uso de nuestra plataforma TiendaPro
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

export default TerminosDeServicioPage;
