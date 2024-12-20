"use client";
import { useCart } from "@/context/cart";
import { CartProduct } from "@/interfaces/products";
import { Box, Divider, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import CartItemCard from "../CartItemCard";
import HelpIcon from "@mui/icons-material/Help";
import Link from "next/link";
import { finalPrice } from "@/utils/products";

export default function CartList() {
  const [{ products }] = useCart();
  return (
    <>
      {products.map((product: CartProduct) => (
        <>
          <Box key={product._id} sx={{ marginBottom: 2 }}>
            <CartItemCard data={product} />
          </Box>
        </>
      ))}
      <Divider />

      <>
        <Stack
          direction="row"
          justifyContent={"flex-end"}
          alignItems="center"
          spacing={1}
          sx={{ marginTop: 2 }}
        >
          <Typography sx={{ textAlign: "right" }}>
            Envío : <strong>Coordinar con el vendedor</strong>
          </Typography>
          <Tooltip title="Una vez completada tu compra pordrás coordinar tu envío con el vendedor">
            <HelpIcon />
          </Tooltip>
        </Stack>{" "}
        <Box sx={{ marginTop: 2 }}>
          <Typography textAlign="right">
            Total:{" "}
            <strong>
              $
              {products.reduce(
                (acc, item) => acc + finalPrice(item.price, item.discount)  * item.quantity,
                0
              )}
            </strong>
          </Typography>
          <Link href="/como-funciona-el-envio">
            <Typography sx={{ textAlign: "right", marginTop: 2 }}>
              ¿Como funciona el envío?
            </Typography>
          </Link>
        </Box>
      </>
    </>
  );
}
