import ProductsDetail from "@/components/successPage/productsDetail";
import { Container, Paper, Typography } from "@mui/material";
import React from "react";

export default function Success() {
  return (
    <Container>
      <Paper sx={{ padding: 4, marginY: 4 }}>
        <Typography variant="h2" sx={{marginBottom: 2}}>
          Tu pedido ha sido procesado con éxito
        </Typography>
        <Typography sx={{marginBottom: 2}}>
          Hemos recibido tu compra y ya estamos trabajando para prepararla. En
          breve, recibirás un correo electrónico con los detalles de tu pedido.
        </Typography>

        <Typography  variant="h2" sx={{marginBottom: 2}}>Detalles de tu pedido</Typography>
        <Typography sx={{marginBottom: 2}}>
          Consulta aquí un resumen de los productos adquiridos. También puedes
          revisar esta información en tu correo electrónico.
        </Typography>
        <ProductsDetail />
      </Paper>
    </Container>
  );
}
