"use client";
import CartItemCard from "@/components/shared/CartItemCard";
import { useITheme } from "@/components/themeProvider";
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
  products: any[];
  orderId: string
  hasButton?: boolean
  coupon?: {
    code: string | null;
    couponId: string | null;
    discount: number;
    totalBeforeCoupon: number | null;
  } | null;
}
export default function ProductsDetail({products, orderId, hasButton = true, coupon}: Props) {
  const { state } = useITheme();

  const WhatsAppLinkWithExternalURL = () => {
    const phoneNumber = state.config.phone; // Número con código de país, sin símbolos
    const message = `Hola. Acabo de realizar una compra (Nº de pedido: ${orderId}). Necesito coordinar el envío a mi dirección. Por favor, indícame cómo proceder.`;
  
    // Construir enlace de WhatsApp
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
    
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
        {/* Calcular subtotal */}
        {(() => {
          const subtotal = products.reduce((acc, item) => {
            console.log('item', item);
            return acc + finalPrice(
              item.data.price,
              ((item.details[0].discount ?? 0) + (item.details[0].offerDiscount ?? 0))
            ) * item.quantity;
          }, 0);
          console.log('coupon', coupon);
          const couponDiscount = coupon?.discount || 0;
          const total = subtotal - couponDiscount;
          
          return (
            <>
              {/* Subtotal */}
              <Typography textAlign="right" sx={{ mb: coupon && coupon.discount > 0 ? 1 : 0 }}>
                Subtotal:{" "}
                <strong>${subtotal.toFixed(2)}</strong>
              </Typography>
              
              {/* Descuento del cupón */}
              {coupon && coupon.discount > 0 && coupon.code && (
                <Box sx={{ mb: 1 }}>
                  <Typography 
                    textAlign="right" 
                    sx={{ 
                      color: "success.main",
                      fontWeight: 500
                    }}
                  >
                    Descuento ({coupon.code}):{" "}
                    <strong>-${coupon.discount.toFixed(2)}</strong>
                  </Typography>
                  {/* Información adicional del cupón si está disponible */}
                  {coupon.totalBeforeCoupon && (
                    <Typography 
                      textAlign="right" 
                      variant="caption"
                      sx={{ 
                        color: "text.secondary",
                        display: "block",
                        mt: 0.5
                      }}
                    >
                      Aplicado sobre ${coupon.totalBeforeCoupon.toFixed(2)}
                    </Typography>
                  )}
                </Box>
              )}
              
              {/* Total */}
              <Typography textAlign="right" sx={{ mt: coupon && coupon.discount > 0 ? 1 : 0 }}>
                Total:{" "}
                <strong>${total.toFixed(2)}</strong>
              </Typography>
            </>
          );
        })()}
      </Box>{" "}
      {hasButton && <Stack
        direction="row"
        justifyContent={"flex-end"}
        alignItems="center"
        spacing={1}
        sx={{ marginTop: 2 }}
      >
        <Button component="a" target="_blank" variant="contained" href={WhatsAppLinkWithExternalURL()}>Coordinar envío</Button>
      </Stack>}
      {products.length === 0 && <Typography>El carrito está vacío</Typography>}
    </>
  );
}
