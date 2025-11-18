"use client";
import { useCart } from "@/context/cart";
import { CartProduct } from "@/interfaces/products";
import { Box, Divider, Stack, Tooltip, Typography } from "@mui/material";
import React, { useMemo } from "react";
import CartItemCard from "../CartItemCard";
import HelpIcon from "@mui/icons-material/Help";
import Link from "next/link";
import { finalPrice } from "@/utils/products";

interface CartListProps {
  appliedCoupon?: {
    code: string;
    discount: number;
    type: string;
    name: string;
    value?: number;
    maximumDiscount?: number;
    minimumAmount?: number;
  } | null;
}

export default function CartList({ appliedCoupon }: CartListProps) {
  const [{ products }] = useCart();
  console.log('products', products);
  // Calcular subtotal
  const subtotal = useMemo(() => {
    return products.reduce(
      (acc, item) =>
        acc +
        finalPrice(
          item.price,
          (item.discount ?? 0) + (item.offerDiscount ?? 0)
        ) *
          item.quantity,
      0
    );
  }, [products]);

  // Calcular descuento del cupón
  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return appliedCoupon.discount;
  }, [appliedCoupon]);

  // Calcular total con descuento
  const total = useMemo(() => {
    return subtotal - couponDiscount;
  }, [subtotal, couponDiscount]);
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
        </Stack>
        <Box sx={{ marginTop: 2 }}>
          {/* Subtotal */}
          <Typography textAlign="right" sx={{ mb: appliedCoupon ? 1 : 0 }}>
            Subtotal:{" "}
            <strong>${subtotal.toFixed(2)}</strong>
          </Typography>
          
          {/* Descuento del cupón */}
          {appliedCoupon && couponDiscount > 0 && (
            <Box sx={{ mb: 1 }}>
              <Typography 
                textAlign="right" 
                sx={{ 
                  color: "success.main",
                  fontWeight: 500
                }}
              >
                Descuento ({appliedCoupon.code}):{" "}
                <strong>-${couponDiscount.toFixed(2)}</strong>
              </Typography>
              {/* Información adicional del cupón */}
              {appliedCoupon.type === 'percentage' && appliedCoupon.value && (
                <Typography 
                  textAlign="right" 
                  variant="caption"
                  sx={{ 
                    color: "text.secondary",
                    display: "block",
                    mt: 0.5
                  }}
                >
                  {appliedCoupon.value}% de descuento
                  {appliedCoupon.maximumDiscount && 
                    couponDiscount >= appliedCoupon.maximumDiscount && (
                    <span> • Máximo aplicado (${appliedCoupon.maximumDiscount})</span>
                  )}
                </Typography>
              )}
            </Box>
          )}
          
          {/* Total */}
          <Typography textAlign="right" sx={{ mt: appliedCoupon ? 1 : 0 }}>
            Total:{" "}
            <strong>${total.toFixed(2)}</strong>
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
