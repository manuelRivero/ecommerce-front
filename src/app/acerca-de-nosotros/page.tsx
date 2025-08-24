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
  Avatar,
} from '@mui/material';
import {
  Business,
  Lightbulb,
  Favorite,
  Security,
  Star,
  Group,
  EmojiEvents,
  Public,
  Handshake,
  Psychology,
  Flag,
  Support,
  School,
  Science,
  Rocket,
  FavoriteBorder,
  FlagCircle,
} from '@mui/icons-material';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const AcercaDeNosotrosPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const sections = [
    {
      id: 'nuestra-historia',
      title: 'Nuestra Historia',
      icon: <Business sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
            En el corazón de la revolución digital argentina, nació <strong>TiendaPro</strong> con una misión clara: 
            democratizar el comercio electrónico y empoderar a emprendedores y empresas para que conquisten el mundo digital.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
            Fundada por un equipo apasionado de desarrolladores, diseñadores y expertos en e-commerce, 
            TiendaPro surgió de la necesidad de crear una plataforma que fuera más que un simple software. 
            Queríamos construir un <strong>ecosistema completo</strong> que transformara la manera en que los argentinos hacen negocios online.
          </Typography>
          <Box sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            p: 3, 
            borderRadius: 3, 
            color: 'white',
            textAlign: 'center'
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              "Transformando el comercio digital argentino, una tienda a la vez"
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'nuestra-vision',
      title: 'Nuestra Visión',
      icon: <Lightbulb sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
            Imaginamos un futuro donde <strong>cada emprendedor argentino</strong> tenga las herramientas necesarias 
            para crear tiendas online profesionales, sin importar su nivel de experiencia técnica. 
            Un futuro donde el comercio digital sea accesible, intuitivo y rentable para todos.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
            <strong>TiendaPro aspira a ser la plataforma líder en Argentina</strong> que impulse la transformación 
            digital del comercio, conectando a millones de comerciantes con sus clientes de manera eficiente, 
            segura y rentable.
          </Typography>
          <Box sx={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
            p: 3, 
            borderRadius: 3, 
            color: 'white',
            textAlign: 'center'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              "El futuro del comercio es digital. El futuro es TiendaPro."
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'nuestra-mision',
      title: 'Nuestra Misión',
      icon: <FlagCircle sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}>
            Facilitar el éxito digital de los comerciantes argentinos
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
            Proporcionamos una plataforma integral de e-commerce que combine simplicidad, potencia y rentabilidad. 
            Nos comprometemos a:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white',
                height: '100%'
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    🚀 Simplificar
                  </Typography>
                  <Typography variant="body2">
                    El proceso de creación de tiendas online
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
                color: 'white',
                height: '100%'
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    ⚡ Potenciar
                  </Typography>
                  <Typography variant="body2">
                    Las ventas con herramientas avanzadas
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
                color: 'white',
                height: '100%'
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    🔒 Garantizar
                  </Typography>
                  <Typography variant="body2">
                    La seguridad y confiabilidad de cada transacción
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', 
                color: 'white',
                height: '100%'
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    🤝 Soporte
                  </Typography>
                  <Typography variant="body2">
                    Continuo para el crecimiento de nuestros clientes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', 
                color: 'white',
                height: '100%'
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    💰 Transparencia
                  </Typography>
                  <Typography variant="body2">
                    0% comisión por ventas. Mantén el 100% de tus ganancias
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      ),
    },
    {
      id: 'nuestros-valores',
      title: 'Nuestros Valores',
      icon: <Favorite sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', border: '2px solid #667eea' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rocket sx={{ color: '#667eea', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#667eea' }}>
                      Innovación Constante
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    Creamos soluciones que anticipan las necesidades del mercado digital, 
                    siempre a la vanguardia de las últimas tecnologías.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', border: '2px solid #f093fb' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Handshake sx={{ color: '#f093fb', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#f093fb' }}>
                      Compromiso con el Cliente
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    Cada decisión que tomamos está centrada en el éxito de nuestros comerciantes. 
                    Su crecimiento es nuestro crecimiento.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', border: '2px solid #4facfe' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Security sx={{ color: '#4facfe', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#4facfe' }}>
                      Seguridad y Confianza
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    Protegemos cada transacción y dato con los más altos estándares de seguridad, 
                    construyendo relaciones duraderas basadas en la confianza.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', border: '2px solid #43e97b' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Star sx={{ color: '#43e97b', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#43e97b' }}>
                      Excelencia
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    Buscamos la perfección en cada detalle, desde la experiencia del usuario 
                    hasta el rendimiento de la plataforma.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', border: '2px solid #ff6b35' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <FavoriteBorder sx={{ color: '#ff6b35', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#ff6b35' }}>
                      Transparencia Total
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    No cobramos comisiones por ventas. Creemos en un modelo de negocio transparente 
                    donde nuestros clientes mantienen el 100% de sus ganancias.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ border: '2px solid #ff6b6b' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Flag sx={{ color: '#ff6b6b', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#ff6b6b' }}>
                      Orgullo Argentino
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    Desarrollamos tecnología de clase mundial desde Argentina, contribuyendo al crecimiento 
                    de nuestro ecosistema digital local.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      ),
    },
    {
      id: 'nuestro-equipo',
      title: 'Nuestro Equipo',
      icon: <Group sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
            Detrás de TiendaPro hay un equipo apasionado y talentoso que trabaja incansablemente 
            para hacer realidad nuestra visión de democratizar el comercio digital.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <Business />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Líderes Visionarios
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    Nuestro equipo ejecutivo combina décadas de experiencia en tecnología, 
                    e-commerce y desarrollo de negocios digitales.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                      <Rocket />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Desarrolladores Apasionados
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    Ingenieros talentosos que transforman ideas innovadoras en soluciones 
                    tecnológicas robustas y escalables.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                      <Psychology />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Diseñadores Creativos
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    Artistas digitales que crean experiencias de usuario intuitivas 
                    y visualmente atractivas.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                      <Support />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Especialistas en Soporte
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    Profesionales dedicados que aseguran que cada comerciante reciba 
                    la atención y el apoyo que necesita para triunfar.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      ),
         },
     {
      id: 'nuestro-impacto',
      title: 'Nuestro Impacto',
      icon: <Public sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Business sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    En la Economía Digital
                  </Typography>
                  <Typography variant="body2">
                    TiendaPro ha contribuido significativamente al crecimiento del e-commerce en Argentina, 
                    facilitando que miles de comerciantes ingresen al mundo digital.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Group sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    En las Comunidades
                  </Typography>
                  <Typography variant="body2">
                    Cada tienda exitosa representa empleos creados, familias sostenidas y sueños cumplidos. 
                    Somos parte del tejido económico que fortalece nuestro país.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Lightbulb sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    En la Innovación
                  </Typography>
                  <Typography variant="body2">
                    Nuestras soluciones han establecido nuevos estándares en la industria, 
                    inspirando a otras empresas a mejorar sus servicios.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      ),
    },
    {
      id: 'nuestro-compromiso',
      title: 'Nuestro Compromiso',
      icon: <Handshake sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}>
                    Con Nuestros Clientes
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="• Soporte 24/7 para resolver cualquier consulta" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• Capacitación continua para maximizar el éxito" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• Actualizaciones regulares con nuevas funcionalidades" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• Comunidad activa de comerciantes para networking" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'secondary.main' }}>
                    Con la Sociedad
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="• Inclusión digital para emprendedores de todos los niveles" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• Sostenibilidad en nuestras operaciones" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• Educación en comercio electrónico" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• Desarrollo del ecosistema tecnológico argentino" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'success.main' }}>
                    Con el Futuro
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="• Investigación constante en nuevas tecnologías" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• Expansión a nuevos mercados" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• Innovación en productos y servicios" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• Liderazgo en la transformación digital" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      ),
    },
    {
      id: 'nuestra-promesa',
      title: 'Nuestra Promesa',
      icon: <FavoriteBorder sx={{ fontSize: 24, color: 'primary.main' }} />,
      content: (
        <Box>
          <Box sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            p: 4, 
            borderRadius: 3, 
            color: 'white',
            textAlign: 'center',
            mb: 4
          }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
              En TiendaPro, no solo vendemos software.
            </Typography>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Vendemos sueños, oportunidades y éxito.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Cada línea de código, cada función desarrollada, cada soporte brindado está diseñado 
              con un propósito: hacer que el comercio digital sea accesible, rentable y exitoso 
              para todos los argentinos.
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
            Nos comprometemos a ser <strong>más que una plataforma</strong>. Somos 
            <strong> socios estratégicos</strong> en el viaje hacia el éxito digital de cada 
            comerciante que confía en nosotros.
          </Typography>
          
          {/* Mensaje destacado sobre 0% comisión */}
          <Box sx={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
            p: 4, 
            borderRadius: 3, 
            color: 'white',
            textAlign: 'center',
            mb: 3,
            border: '2px solid #10b981'
          }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
              💰 Nuestro Compromiso de Transparencia
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              0% Comisión por Ventas
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              A diferencia de otras plataformas, <strong>no cobramos comisiones por transacciones</strong>. 
              Creemos que nuestros clientes deben mantener el 100% de sus ganancias. 
              Nuestro éxito está en tu éxito.
            </Typography>
          </Box>
          <Box sx={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
            p: 3, 
            borderRadius: 3, 
            color: 'white',
            textAlign: 'center'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              "El futuro del comercio es digital. El futuro es TiendaPro."
            </Typography>
          </Box>
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
                <Business sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }} />
              </Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  fontSize: { xs: '2rem', md: '3.5rem' },
                }}
              >
                Acerca de Nosotros
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
              Conoce la historia, misión y valores que impulsan TiendaPro hacia el futuro del comercio digital
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

export default AcercaDeNosotrosPage;
