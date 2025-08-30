"use client";
import { Box, Grid, Stack, Typography } from "@mui/material";
import logo from "./../../../assets/images/amate-logo.png";
import React from "react";
import Link from "next/link";
import { useITheme } from "@/components/themeProvider";

export default function Footer() {
  const { state } = useITheme();

  return (
    <footer>
      <Box
        sx={(theme) => ({ background: theme.palette.primary.main, padding: 4 })}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} sx={{ marginBottom: { xs: 2, md: 0 } }}>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Box sx={{ width: 120 }}>
                <img
                  src={state.config.metadata.logo}
                  alt="Logo"
                  style={{
                    maxWidth: "100%",
                    borderRadius: 9999,
                    overflow: "hideen",
                  }}
                />
              </Box>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={3} sx={{ marginBottom: { xs: 2, md: 0 } }}>
            <Typography
              color="#fff"
              variant="h5"
              sx={{ 
                marginBottom: 2,
                fontWeight: "bold",
                textAlign: { xs: "center", md: "left" }
              }}
            >
              Recursos y Guías
            </Typography>
            <Typography
                color="#fff"
                component={Link}
                href="/politicas"
                sx={{ 
                  display: "block",
                  textDecoration: "none",
                  opacity: 0.9,
                  transition: "opacity 0.3s ease",
                  textAlign: { xs: "center", md: "left" },
                  "&:hover": {
                    opacity: 1
                  }
                }}
              >
                Aprende con nosotros
              </Typography>
          </Grid>
          
          <Grid item xs={12} md={3} sx={{ marginBottom: { xs: 2, md: 0 } }}>
            <Typography
              color="#fff"
              variant="h5"
              sx={{ 
                marginBottom: 2,
                fontWeight: "bold",
                textAlign: { xs: "center", md: "left" }
              }}
            >
              Legal
            </Typography>
            <Stack spacing={1}>
              <Typography
                color="#fff"
                component={Link}
                href="/politicas"
                sx={{ 
                  display: "block",
                  textDecoration: "none",
                  opacity: 0.9,
                  transition: "opacity 0.3s ease",
                  textAlign: { xs: "center", md: "left" },
                  "&:hover": {
                    opacity: 1
                  }
                }}
              >
                Políticas de privacidad
              </Typography>
              <Typography
                color="#fff"
                component={Link}
                href="/politicas"
                sx={{ 
                  display: "block",
                  textDecoration: "none",
                  width: "fit-content",
                  opacity: 0.9,
                  transition: "opacity 0.3s ease",
                  textAlign: { xs: "center", md: "left" },
                  "&:hover": {
                    opacity: 1
                  }
                }}
              >
                Terminos y condiciones
              </Typography>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography
              color="#fff"
              variant="h5"
              sx={{ 
                marginBottom: 2,
                fontWeight: "bold",
                textAlign: { xs: "center", md: "left" }
              }}
            >
              Contacto
            </Typography>
            <Stack spacing={1}>
              <Typography
                color="#fff"
                target="_blank"
                component={Link}
                href={`https://wa.me/${state.config.phone}?text=Hola, estoy escribiendo desde el enlace de la página web de ${state.config.name} y tengo una consulta`}
                sx={{ 
                  display: "block",
                  textDecoration: "none",
                  opacity: 0.9,
                  transition: "opacity 0.3s ease",
                  textAlign: { xs: "center", md: "left" },
                  "&:hover": {
                    opacity: 1
                  }
                }}
              >
                Whatsapp: {state.config.phone}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        
        {/* Nueva sección de feedback */}
        <Box sx={{ 
          borderTop: "1px solid rgba(255, 255, 255, 0.2)", 
          marginTop: 4, 
          paddingTop: 4,
          textAlign: "center"
        }}>
          <Typography
            color="#fff"
            variant="h5"
            sx={{ 
              marginBottom: 2,
              fontWeight: "medium"
            }}
          >
            ¿Te gustó nuestra tienda?
          </Typography>
          <Typography
            color="#fff"
            variant="body1"
            sx={{ 
              marginBottom: 3,
              opacity: 0.9,
              maxWidth: 600,
              margin: "0 auto 24px auto"
            }}
          >
            Si te gustó lo que viste, te invitamos a crear tu propia tienda online con nosotros
          </Typography>
          <Typography
            color="#fff"
            component={Link}
            href="https://tiendapro.com.ar"
            target="_blank"
            sx={{ 
              display: "inline-block",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: "12px 24px",
              borderRadius: 2,
              textDecoration: "none",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderColor: "rgba(255, 255, 255, 0.5)",
                transform: "translateY(-2px)"
              }
            }}
          >
            Crear mi tienda online
          </Typography>
        </Box>
      </Box>
    </footer>
  );
}
