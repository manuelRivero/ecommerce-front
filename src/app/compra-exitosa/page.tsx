import { getSaleDetail } from "@/client/sales";
import ProductsDetail from "@/components/successPage/productsDetail";
import { Container, Paper, Typography } from "@mui/material";
import React from "react";

const getData = async (payment_id: string) => {
  console.log("payment_id", payment_id);
  try {
    const { data } = await getSaleDetail(payment_id);
    console.log('data', data)
    return { detail: data.data };
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export default async function Success({ searchParams }: any) {
  const { payment_id } = await searchParams;
  const { detail } = await getData(payment_id);
  console.log("detail", detail);

  return (
    <Container>
      <Paper sx={{ padding: 4, marginY: 4 }}>
        <Typography variant="h2" sx={{ marginBottom: 2 }}>
          Tu pedido ha sido procesado con éxito
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Hemos recibido tu compra y ya estamos trabajando para prepararla. En
          breve, recibirás un correo electrónico con los detalles de tu pedido.
        </Typography>

        <Typography variant="h2" sx={{ marginBottom: 2 }}>
          Detalles de tu pedido
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Consulta aquí un resumen de los productos adquiridos y los datos de facturación. También puedes
          revisar esta información en tu correo electrónico.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Nombre: <strong>{`${detail.name} ${detail.lastName}`}</strong>
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Email: <strong>{detail.user}</strong>
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          DNI: <strong>{`${detail.dni}`}</strong>
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Télefono: <strong>{`${detail.phone}`}</strong>
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Código postal: <strong>{`${detail.postalCode}`}</strong>
        </Typography>
      
        <ProductsDetail products={detail.products} />
      </Paper>
    </Container>
  );
}
