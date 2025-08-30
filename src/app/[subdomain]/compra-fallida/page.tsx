"use client";
import React from "react";
import { useITheme } from "@/components/themeProvider";
import {
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Error } from "@mui/icons-material";

export default function InProgressSale() {
    const { state } = useITheme();
  return (
    <Container>
      <Breadcrumb 
        items={[
          { label: 'Compra Fallida', icon: <Error sx={{ fontSize: 16 }} /> }
        ]} 
      />
      <Paper sx={{ padding: 4, marginY: 4 }}>
        <Typography variant="h2" sx={{ marginBottom: 2 }}>
          Tu compra no pudo completarse
        </Typography>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Algo salió mal, pero no te preocupes
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Lamentamos informarte que la transacción no se pudo procesar. Esto
          puede deberse a varios motivos, como fondos insuficientes, problemas
          con el método de pago o un error en la conexión. Te recomendamos
          verificar los detalles de tu tarjeta o intentar nuevamente con otro
          método de pago. Si el problema persiste, contáctanos para que podamos
          ayudarte.
        </Typography>
        
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button
            variant="contained"
            component={Link}
            href="/"
            sx={{ marginTop: 2 }}
          >
            Ir al inicio
          </Button>
          <Button
            variant="contained"
            component={Link}
            href={`https://wa.me/${state.config.phone}?text=Hola, estoy escribiendo desde el enlace de la página web de ${state.config.name} y tengo una consulta`}

            sx={{ marginTop: 2 }}
          >
            Contactar a soporte
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
