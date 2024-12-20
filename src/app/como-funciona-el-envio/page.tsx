"use client";
import { useCart } from "@/context/cart";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function DeliveryInfo() {
  const [{ products }] = useCart();
  return (
    <Container>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Envíos desde la ciudad de Rosario
        </Typography>
        <Typography variant="body1" paragraph>
          Realizamos los envíos a través de <strong>Correo Argentino</strong> o{" "}
          <strong>Andreani</strong>, garantizando seguridad y cobertura
          nacional.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          ¿Cómo funciona?
        </Typography>
        <Typography variant="body1" paragraph>
          1. <strong>Compra:</strong> Todas las compras se realizan de forma
          segura a través de <strong>Mercado Pago</strong>, brindándote
          confianza y protección en cada transacción.
        </Typography>
        <Typography variant="body1" paragraph>
          2. <strong>Coordinación del envío:</strong> Una vez confirmado el
          pago, el vendedor se pondrá en contacto contigo para coordinar el
          envío según tus necesidades.
        </Typography>
        <Typography variant="body1" paragraph>
          3. <strong>Devolución:</strong> En caso de no llegar a un acuerdo
          sobre el envío, puedes solicitar una devolución directamente a través
          de Mercado Pago, asegurando una solución justa para ambas partes.
        </Typography>
        <Typography variant="body1" paragraph>
          Te ofrecemos un servicio confiable, directo desde la ciudad de
          Rosario, para que tus productos lleguen a destino de manera rápida y
          segura.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Si tienes consultas adicionales sobre los métodos de envío, tiempos
          estimados o el proceso de devolución, no dudes en contactarnos.
          Estamos aquí para ayudarte.
        </Typography>
        {products.length > 0 && (
          <Stack direction="row" justifyContent="center" sx={{ marginTop: 4 }}>
            <Button component={Link} href="/checkout" variant="contained">
              Terminar mi compra
            </Button>
          </Stack>
        )}
      </Paper>
    </Container>
  );
}
