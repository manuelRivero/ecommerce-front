"use client";
import React, { useState } from "react";
import QuantitySelector from "@/components/shared/quantitySelector";
import { setProductToCart, useCart } from "@/context/cart";
import { Product } from "@/interfaces/products";
import { products } from "@/mocks/product";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function Detail() {
  const { id } = useParams();
  const [, dispatch] = useCart();
  const [quantity, setQuantity] = useState<string>("1");
  const targetProduct = products.findIndex(
    (product: Product) => product._id === id
  );
  return (
    <Box>
      <Typography variant="h3">Nombre del producto</Typography>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ marginTop: 2 }}
      >
        <Typography variant="body1" sx={{ textDecoration: "line-through" }}>
          $250
        </Typography>
        <Box sx={{ position: "relative" }}>
          <Typography variant="body1" sx={{ fontSize: 32, fontWeight: "bold" }}>
            $155.40
          </Typography>
          <Box
            sx={(theme) => ({
              position: "absolute",
              top: 0,
              right: 0,
              transform: "translateX(100%)",
              padding: 0.5,
              borderRadius: 2,
              color: theme.palette.primary.contrastText,
              background: theme.palette.primary.main,
            })}
          >
            <Typography variant="body1" sx={{ fontSize: 10 }}>
              40% off
            </Typography>
          </Box>
        </Box>
      </Stack>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
        egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales
        id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra.
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body1" textAlign="right">
          Stock disponble: <strong>16 unidades</strong>
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ marginTop: 2 }}>
        <QuantitySelector setValue={setQuantity} value={quantity} />
      </Stack>
      <Divider sx={{ marginTop: 4 }} />
      <Stack direction="row" justifyContent="flex-end" sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          onClick={() =>
            setProductToCart(dispatch, {
              ...products[targetProduct],
              quantity: Number(quantity),
            })
          }
        >
          Agregar al carrito
        </Button>
      </Stack>
    </Box>
  );
}
