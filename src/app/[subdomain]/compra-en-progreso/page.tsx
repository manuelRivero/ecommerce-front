"use client";
import { useITheme } from "@/components/themeProvider";
import { cleanCart, useCart } from "@/context/cart";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";

export default function InProgressSale() {
  const [, dispatch] = useCart();
    const { state } = useITheme();

  useEffect(() => {
    cleanCart(dispatch);
  }, []);
  return (
    <Container>
      <Paper sx={{ padding: 4, marginY: 4 }}>
        <Typography variant="h2" sx={{ marginBottom: 2 }}>
          Tu pedido está siendo procesado, completa el proceso de pago
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          El siguiente paso de la compra se ha abierto en una nueva pestaña. Si
          no ves la ventana de pago, es posible que tu navegador la haya
          bloqueado. En ese caso, revisa la barra de direcciones y habilita las
          ventanas emergentes para continuar con la compra.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Una vez completado el proceso de pago, recibirás un correo electrónico
          con los detalles de tu pedido. Podrás coordinar tu envío y recibirás
          tu producto en la brevedad posible.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
        Cuando hayas recibido el correo de confirmación, puedes cerrar esta página con seguridad.
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Box
            sx={{
              height: 4,
              width: 130,
              background:
                "no-repeat linear-gradient(#6100ee 0 0), no-repeat linear-gradient(#6100ee 0 0), #d7b8fc",
              backgroundSize: "60% 100%",
              animation: "progressAnimation 3s infinite",
              "@keyframes progressAnimation": {
                "0%": {
                  backgroundPosition: "-150% 0, -150% 0",
                },
                "66%": {
                  backgroundPosition: "250% 0, -150% 0",
                },
                "100%": {
                  backgroundPosition: "250% 0, 250% 0",
                },
              },
            }}
          ></Box>
        </Stack>
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
