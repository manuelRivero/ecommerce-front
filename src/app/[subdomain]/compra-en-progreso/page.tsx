"use client";
import { cleanCart, useCart } from "@/context/cart";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

export default async function Success() {
  const { dispatch } = useCart();

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
          una vez completado el proceso de pago recibirás un correo electrónico
          con los detalles de tu pedido. Podras coordinar tu envío y recibiras
          tu producto en la brevedad posible
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
      </Paper>
    </Container>
  );
}
