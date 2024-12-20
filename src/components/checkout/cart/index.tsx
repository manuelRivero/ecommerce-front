"use client"
import CartList from "@/components/shared/cartList";
import { useCart } from "@/context/cart";
import { Typography } from "@mui/material";
import React from "react";

export default function CheckoutCart() {
  const [{ products }] = useCart();

  return (
    <>
      {products.length === 0 ? (
        <>
        <Typography color="#97a2aa">El carrito está vacío</Typography>
        <Typography color="#97a2aa" sx={{ marginTop: 2 }}>Cuando agregues algún producto lo verás aquí y podrás continuar con la compra</Typography>

        </>
      ) : (
        <>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Tú compra
          </Typography>
          <CartList />

          <Typography color="#97a2aa" sx={{ marginTop: 2 }}>
            Asegúrate de que todos los detalles de tu compra sean correctos
            antes de continuar.
          </Typography>
        </>
      )}
    </>
  );
}
