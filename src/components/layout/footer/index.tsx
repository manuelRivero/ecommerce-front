"use client";
import { Box, Grid, Stack, Typography } from "@mui/material";
import logo from "./../../../assets/images/amate-logo.png";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <Box
        sx={(theme) => ({ background: theme.palette.primary.main, padding: 4 })}
      >
        <Grid container>
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Box sx={{ width: 120 }}>
                <img
                  src={logo.src}
                  alt="Logo"
                  style={{
                    maxWidth: "100%",
                    borderRadius: 9999,
                    overflow: "hideen",
                  }}
                />
              </Box>
            </Stack>
            <Typography color="#fff" textAlign="center">
              A-MATE
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography color="#fff" variant="h4" sx={{ marginBottom: 2 }}>
              Legal
            </Typography>
            <Typography
              color="#fff"
              component={Link}
              href="/politicas"
              sx={{ display: "block" }}
            >
              Políticas de privacidad
            </Typography>
            <Typography
              color="#fff"
              component={Link}
              href="/politicas"
              sx={{ display: "block" }}
            >
              Terminos y condiciones
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography color="#fff" variant="h4" sx={{ marginBottom: 2 }}>
              Contacto
            </Typography>
            <Typography
              color="#fff"
              target="_blank"
              component={Link}
              href="https://wa.me/%2B1234567890?text=Hola A-MATE, tengo una duda, escribo desde el enlace de la pagina web"
              sx={{ display: "block" }}
            >
              Whatsapp: 341123123
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
}
