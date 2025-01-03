"use client";
import CartItemCard from "@/components/shared/CartItemCard";
import { Product } from "@/interfaces/products";
import { finalPrice } from "@/utils/products";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  products: any[]
}
export default function ProductsDetail({products}: Props) {

  const WhatsAppLinkWithExternalURL = () => {
    const phoneNumber = "513416694296"; // Número con código de país, sin símbolos
    const message = `Hola. Acabo de realizar una compra (Nº de pedido: 123131313132131). Compré el producto "Zapatos Verdes" en cantidad de 2 unidades. Necesito coordinar el envío a mi dirección. Por favor, indícame cómo proceder.`;
  
    // Construir enlace de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
    return (
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        Enviar mensaje a WhatsApp con enlace externo
      </a>
    );
  };
  return (
    <>
      {products
        .map((product: any) => (
          <>
            <Box key={product.details[0]._id} sx={{ marginBottom: 2 }}>
              <CartItemCard hasDelete={false} data={{quantity: product.quantity, color:product.data.color, size: product.data.size, ...product.details[0], price: product.data.price}} />
            </Box>
          </>
        ))}
      <Divider />
      <Box sx={{ marginTop: 2 }}>
        <Typography textAlign="right">
          Total:{" "}
          <strong>
            $
            {products
              .reduce((acc, item) => acc + finalPrice( item.data.price, item.data.discount) * item.quantity, 0)}
          </strong>
        </Typography>
      </Box>{" "}
      <Stack
        direction="row"
        justifyContent={"flex-end"}
        alignItems="center"
        spacing={1}
        sx={{ marginTop: 2 }}
      >
        <Button variant="contained" onClick={WhatsAppLinkWithExternalURL}>Coordinar envío</Button>
      </Stack>
      {products.length === 0 && <Typography>El carrito está vacío</Typography>}
    </>
  );
}
