"use client";
import { useCart } from "@/context/cart";
import { CartProduct } from "@/interfaces/products";
import { Box, Divider, Stack, Tooltip, Typography, RadioGroup, Radio, FormControlLabel, FormControl } from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";
import CartItemCard from "../CartItemCard";
import HelpIcon from "@mui/icons-material/Help";
import Link from "next/link";
import { finalPrice, formatCurrency } from "@/utils/products";
import { useITheme } from "@/components/themeProvider";

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
  onDeliveryTypeChange?: (deliveryType: 'DELIVERY' | 'PICK-UP') => void;
}

export default function CartList({ appliedCoupon, onDeliveryTypeChange }: CartListProps) {
  const { state: { config } } = useITheme();
  const { locality, province, postalCode, address } = config
  const [{ products }] = useCart();
  const [deliveryType, setDeliveryType] = useState<'DELIVERY' | 'PICK-UP'>('PICK-UP');

  // Notificar cambios en deliveryType al componente padre
  useEffect(() => {
    onDeliveryTypeChange?.(deliveryType);
  }, [deliveryType, onDeliveryTypeChange]);
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
          direction="column"
          justifyContent={"flex-end"}
          alignItems="flex-start"
          spacing={1}
          sx={{ marginTop: 2 }}
        >
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={deliveryType}
              onChange={(e) => setDeliveryType(e.target.value as 'DELIVERY' | 'PICK-UP')}
            >
              <FormControlLabel
                value="PICK-UP"
                control={<Radio />}
                label="RETIRO EN LOCAL"
              />
              <FormControlLabel
                value="DELIVERY"
                control={<Radio />}
                label="DELIVERY"
              />
            </RadioGroup>
          </FormControl>

          {deliveryType === 'PICK-UP' && (
            <>
              <Typography>
                Metodo de entrega: Retiro en la tienda
              </Typography>
              <Typography >
                Dirección de entrega: <span style={{ textTransform: "uppercase" }}>{address}, {province}, {locality}, {postalCode}</span>
              </Typography>
            </>
          )}
          {/*<Tooltip title="Una vez completada tu compra pordrás coordinar tu envío con el vendedor">
            <HelpIcon />
          </Tooltip>*/}
        </Stack>
        <Box sx={{ marginTop: 2 }}>

          {deliveryType === 'DELIVERY' && <Link target="_blank" href="/como-funciona-el-envio">
            <Typography sx={{ marginTop: 2 }}>
              ¿Como funciona el delivery?
            </Typography>
          </Link>}

          {/* Subtotal */}
          <Typography textAlign="right" sx={{ mb: appliedCoupon ? 1 : 0 }}>
            Subtotal:{" "}
            <strong>{formatCurrency(subtotal)}</strong>
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
                <strong>-{formatCurrency(couponDiscount)}</strong>
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
            <strong>{formatCurrency(total)}</strong>
          </Typography>

        </Box>
      </>
    </>
  );
}
