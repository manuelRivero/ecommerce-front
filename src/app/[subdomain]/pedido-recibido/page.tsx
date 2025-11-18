import { getSaleDetail, markOrderAsReceived } from "@/client/sales";
import ProductsDetail from "@/components/successPage/productsDetail";
import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { CheckCircle, ErrorOutline } from "@mui/icons-material";

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

const markOrderAsReceivedHandler = async (payment_id: string, subdomain: string) => {
  try {
    await markOrderAsReceived(payment_id, subdomain);
    return { success: true };
  } catch (error) {
    console.log("error marking order as received", error);
    return { success: false, error };
  }
};

export default async function OrderReceived({ searchParams, params }: any) {
  const { payment_id } = await searchParams;
  const { subdomain } = await params;
  const { detail } = await getData(payment_id);
  const confirmationResult = await markOrderAsReceivedHandler(payment_id, subdomain);
  console.log("detail", detail);
  console.log("confirmationResult", confirmationResult);

  return (
    <Container sx={{ marginY: 6 }}>
      <Breadcrumb 
        items={[
          { 
            label: 'Pedido Recibido', 
            icon: confirmationResult.success ? 
              <CheckCircle sx={{ fontSize: 16 }} /> : 
              <ErrorOutline sx={{ fontSize: 16 }} />
          }
        ]} 
      />
      <Paper sx={{ padding: 4, marginY: 4 }}>
        {confirmationResult.success ? (
          <>
            <Typography variant="h2" sx={{ marginBottom: 2, color: 'success.main' }}>
              ¡Gracias por confirmar la recepción de tu pedido!
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              Hemos registrado tu confirmación exitosamente. Tu pedido ha sido marcado como recibido 
              y el proceso de entrega se ha completado. ¡Esperamos que disfrutes tus productos!
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h2" sx={{ marginBottom: 2, color: 'error.main' }}>
              Error al confirmar la recepción
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              Hubo un problema al procesar tu confirmación. Por favor, intenta nuevamente o 
              contacta a nuestro servicio al cliente si el problema persiste.
            </Typography>
          </>
        )}

        <Typography variant="h2" sx={{ marginBottom: 2 }}>
          Detalles de tu pedido
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Consulta aquí un resumen de los productos adquiridos y los datos de facturación. También puedes
          revisar esta información en tu correo electrónico.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Numero de order: <strong>{detail._id}</strong>
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
        <Typography sx={{ marginBottom: 2 }}>
          Dirección: <strong>{`${detail.address}`}</strong>
        </Typography>
      
        <ProductsDetail 
          hasButton={false} 
          products={detail.products} 
          orderId={detail._id} 
          coupon={detail.coupon}
        />
      </Paper>
    </Container>
  );
}
