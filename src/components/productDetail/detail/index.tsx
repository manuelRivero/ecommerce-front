"use client";
import React, { useEffect, useState } from "react";
import QuantitySelector from "@/components/shared/quantitySelector";
import { setProductToCart, useCart } from "@/context/cart";
import { Product } from "@/interfaces/products";
import { products } from "@/mocks/product";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { finalPrice } from "@/utils/products";

interface Props {
  data: Product;
}
export default function Detail({ data }: Props) {
  const [, dispatch] = useCart();
  const [quantity, setQuantity] = useState<string>("1");
  const [formAlert, setFormAlert] = useState<boolean>(false);
  useEffect(() => {
    setFormAlert(false);
  }, [quantity]);
  return (
    <Box>
      <Typography variant="h3">{data.name}</Typography>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ marginTop: 2 }}
      >
        {data.discount > 0 && (
          <Typography variant="body1" sx={{ textDecoration: "line-through" }}>
            ${data.price}
          </Typography>
        )}
        <Box sx={{ position: "relative" }}>
          <Typography variant="body1" sx={(theme) =>({ fontSize: 32, fontWeight: "bold", color: theme.palette.primary.contrastText })}>
            ${finalPrice(data.price, data.discount)}
          </Typography>
          {data.discount > 0 && (
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
                {data.discount}% off
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>
      <Typography variant="body1">{data.description}</Typography>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body1" textAlign="right">
          Stock disponble: <strong>{data.stock} unidades</strong>
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ marginTop: 2 }}>
        <QuantitySelector
          setValue={setQuantity}
          value={quantity}
          max={data.stock}
        />
      </Stack>
      <Divider sx={{ marginTop: 4 }} />
      <Stack direction="row" justifyContent="flex-end" sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          onClick={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
            setFormAlert(true);
            setProductToCart(dispatch, {
              ...data,
              quantity: Number(quantity),
            });
          }}
        >
          Agregar al carrito
        </Button>
      </Stack>
      {formAlert && (
        <>
        <Typography textAlign="right" sx={{ marginTop: 2 }}>
          El producto se agregó al carrito, cantidad: <strong>{quantity}</strong>
        </Typography>
        <Typography textAlign="right" sx={{ marginTop: 2 }}>
          Revisa tu carrito para finalizar la compra
        </Typography>
        </>
      )}
    </Box>
  );
}
