"use client";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import logo from "./../../../assets/images/amate-logo.png";
import React from "react";
import Link from "next/link";
import { useITheme } from "@/components/themeProvider";
import TenantLogo from "@/components/shared/TenantLogo";

export default function Footer() {
  const { state } = useITheme();

  return (
    <footer>
      <Box
        sx={(theme) => ({ background: theme.palette.primary.main, padding: 4 })}
      >
        <Stack direction="row" alignItems="center" justifyContent="center">
          <TenantLogo
            width={120}
            height={120}
            borderRadius={9999}
            alt={state.config.name}
          />
        </Stack>
        <Grid container>


          <Grid item xs={12} md={3} sx={{ marginBottom: { xs: 2, md: 0 }, padding: 2 }}>
            <Typography
              color="#fff"
              variant="h4"
              align="center"
              sx={{
                marginBottom: 2,
                fontWeight: "bold",
              }}
            >
              Recursos y Guías
            </Typography>
            <Typography
              color="#fff"
              component={Link}
              href="/blogs"
              align="center"
              sx={{
                display: "block",
                textDecoration: "none",
                opacity: 0.9,
                transition: "opacity 0.3s ease",
                "&:hover": {
                  opacity: 1
                }
              }}
            >
              Aprende con nosotros
            </Typography>
          </Grid>

          <Grid item xs={12} md={3} sx={{ marginBottom: { xs: 2, md: 0 }, padding: 2 }}>
            <Typography
              color="#fff"
              variant="h4"
              align="center"
              sx={{
                marginBottom: 2,
                fontWeight: "bold",
              }}
            >
              Legal
            </Typography>
            <Stack spacing={1}>
              <Typography
                color="#fff"
                component={Link}
                href="/politicas"
                align="center"
                sx={{
                  display: "block",
                  textDecoration: "none",
                  opacity: 0.9,
                  transition: "opacity 0.3s ease",
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
                align="center"
                sx={{
                  display: "block",
                  textDecoration: "none",
                  opacity: 0.9,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 1
                  }
                }}
              >
                Terminos y condiciones
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3} sx={{ marginBottom: { xs: 2, md: 0 }, padding: 2 }}>
            <Typography
              color="#fff"
              variant="h4"
              align="center"
              sx={{
                marginBottom: 2,
                fontWeight: "bold",
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
                align="center"
                sx={{
                  display: "block",
                  textDecoration: "none",
                  opacity: 0.9,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 1
                  }
                }}
              >
                Whatsapp: {state.config.phone}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3} sx={{ marginBottom: { xs: 2, md: 0 }, padding: 2 }}>
            {(state.config.socialMedia?.instagram || state.config.socialMedia?.facebook) && (
              <>
                <Typography
                  color="#fff"
                  variant="h4"
                  sx={{
                    marginBottom: 2,
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  Nuestras redes sociales
                </Typography>
                <Stack spacing={1}>
                  {state.config.socialMedia.instagram && (
                    <Typography
                      color="#fff"
                      component={Link}
                      href={state.config.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      align="center"
                      sx={{
                        display: "block",
                        textDecoration: "none",
                        opacity: 0.9,
                        transition: "opacity 0.3s ease",
                        "&:hover": {
                          opacity: 1
                        }
                      }}
                    >
                      Instagram
                    </Typography>
                  )}
                  {state.config.socialMedia.facebook && (
                    <Typography
                      color="#fff"
                      component={Link}
                      href={state.config.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      align="center"
                      sx={{
                        display: "block",
                        textDecoration: "none",
                        opacity: 0.9,
                        transition: "opacity 0.3s ease",
                        "&:hover": {
                          opacity: 1
                        }
                      }}
                    >
                      Facebook
                    </Typography>
                  )}
                </Stack>
              </>
            )}
          </Grid>


        </Grid>

        {/* Nueva sección de feedback */}
        {state.config.hasStoreAds && (
          <Box sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            marginTop: 4,
            paddingTop: 4,
            textAlign: "center"
          }}>
            <Typography
              color="#fff"
              variant="h2"
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
            <Box >

              <Button
                variant="contained"
                color="inherit"
                href="https://tiendapro.com.ar"
                target="_blank"
                sx={(theme) => ({ backgroundColor: theme.palette.primary.contrastText, color: theme.palette.primary.main, marginBottom: 3 })}

              >
                Crear mi tienda online
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </footer>
  );
}
