"use client";
import { getProductsById } from "@/client/products";
import CartList from "@/components/shared/cartList";
import { setCart, useCart } from "@/context/cart";
import { Features, Product } from "@/interfaces/products";
import { compareProducts, finalPrice, formatCurrency } from "@/utils/products";
import { Typography, TextField, Button, Box, Alert } from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { validateCoupon } from "@/client/coupons";
import { useITheme } from "@/components/themeProvider";

interface CheckoutCartProps {
  appliedCoupon?: {
    code: string;
    discount: number;
    type: string;
    name: string;
    value?: number;
    maximumDiscount?: number;
    minimumAmount?: number;
  } | null;
  onCouponApplied?: (coupon: {
    code: string;
    discount: number;
    type: string;
    name: string;
    value?: number;
    maximumDiscount?: number;
    minimumAmount?: number;
  } | null) => void;
  onDeliveryTypeChange?: (deliveryType: 'DELIVERY' | 'PICK-UP') => void;
}

export default function CheckoutCart({ appliedCoupon, onCouponApplied, onDeliveryTypeChange }: CheckoutCartProps) {
  const [{ products }, dispatch] = useCart();
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const params = useParams();
  const [couponCode, setCouponCode] = useState<string>("");
  const [validatingCoupon, setValidatingCoupon] = useState<boolean>(false);
  const [couponMessage, setCouponMessage] = useState<{
    type: "success" | "error";
    text: string;
    minimumAmount?: number;
    currentAmount?: number;
  } | null>(null);

  // Calcular el total de la compra
  const orderAmount = useMemo(() => {
    return products.reduce(
      (acc, item) =>
        acc +
        finalPrice(
          item.price,
          (item.discount || 0) + (item.offerDiscount || 0)
        ) *
        item.quantity,
      0
    );
  }, [products]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getProductsById(
        products.map((product) => product._id)
      );

      const mergedProducts = products.map((localProduct) => {
        const backendProduct = data.products.find(
          (bp: Product) => bp._id === localProduct._id
        );

        return backendProduct
          ? { ...localProduct, ...backendProduct }
          : localProduct;
      });

      // Verificar si algún producto tiene stock 0 solo en la variante seleccionada
      const updatedProducts = mergedProducts.filter((product) => {
        const { color: selectedColor, size: selectedSize } = product;
        const localFeatures = product.features || [];

        // Buscar la feature seleccionada
        const selectedFeature = localFeatures.find(
          (feature: Features) => {
            // Extraer el nombre del color (puede ser string o objeto)
            const featureColor = typeof feature.color === 'string'
              ? feature.color
              : feature.color?.name;
            // Extraer el nombre del size (puede ser string o objeto)
            const featureSize = typeof feature.size === 'string'
              ? feature.size
              : feature.size?.name;

            return featureColor === selectedColor && featureSize === selectedSize;
          }
        );

        // Validar que exista la feature y tenga stock suficiente
        const stock = Number(selectedFeature?.stock) || 0;

        return selectedFeature && stock > 0 && product.quantity <= stock;
      });

      console.log("updatedProducts", updatedProducts);
      console.log("mergedProducts", mergedProducts);

      // Compara los productos locales con los del backend
      const changesDetected = !compareProducts(products, mergedProducts);
      setHasChanges(changesDetected);

      // Actualizar el carrito solo con los productos que tengan stock disponible
      setCart(dispatch, updatedProducts);
    };

    if (products.length > 0) {
      getData();
    }
  }, []);

  const handleValidateCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMessage({ type: "error", text: "Por favor ingresa un código de cupón" });
      return;
    }

    try {
      setValidatingCoupon(true);
      setCouponMessage(null);
      const response = await validateCoupon(
        couponCode.trim(),
        orderAmount,
        params.subdomain as string
      );

      // Guardar el cupón aplicado
      if (response.data?.ok && response.data?.coupon) {
        const coupon = response.data.coupon;
        const discount = response.data.discount || 0;
        const maximumDiscount = coupon.maximumDiscount;
        const isMaxDiscountReached = maximumDiscount && discount >= maximumDiscount;

        const newCoupon = {
          code: coupon.code,
          discount: discount,
          type: coupon.type,
          name: coupon.name,
          value: coupon.value,
          maximumDiscount: maximumDiscount,
          minimumAmount: coupon.minimumAmount,
        };
        onCouponApplied?.(newCoupon);

        // Mensaje mejorado con información del cupón
        let successMessage = `Cupón "${coupon.code}" aplicado correctamente`;
        if (coupon.type === 'percentage' && coupon.value) {
          successMessage += ` (${coupon.value}% de descuento`;
          if (isMaxDiscountReached && maximumDiscount) {
            successMessage += `, máximo ${formatCurrency(maximumDiscount)} aplicado)`;
          } else {
            successMessage += ')';
          }
        }
        setCouponMessage({ type: "success", text: successMessage });
      } else {
        setCouponMessage({ type: "success", text: "Cupón válido aplicado correctamente" });
      }

      console.log("Coupon response:", response.data);
    } catch (error: any) {
      // Limpiar cupón aplicado si hay error
      onCouponApplied?.(null);

      // Manejar errores de validación del backend
      const errorData = error.response?.data;
      let errorMessage = "El cupón no es válido o ha expirado";

      if (errorData) {
        // Priorizar el campo 'error' si existe, luego 'message'
        errorMessage = errorData.error || errorData.message || errorMessage;
      }

      // Si existe minimumAmount, incluir información adicional
      const minimumAmount = errorData?.minimumAmount;
      const currentAmount = errorData?.currentAmount;

      setCouponMessage({
        type: "error",
        text: errorMessage,
        ...(minimumAmount !== undefined && { minimumAmount }),
        ...(currentAmount !== undefined && { currentAmount }),
      });
    } finally {
      setValidatingCoupon(false);
    }
  };

  return (
    <>
      {products.length === 0 ? (
        <>
          <Typography color="#97a2aa">El carrito está vacío</Typography>
          {hasChanges && (
            <Typography color="#97a2aa" sx={{ marginY: 2 }}>
              Parece que ha pasado mucho tiempo y los productos de tu carrito ya
              no están disponibles, esto puede suceder si el stock se ha agotado o si
              el producto ya no está disponible.
            </Typography>
          )}
          <Typography color="#97a2aa" sx={{ marginTop: 2 }}>
            Cuando agregues algún producto lo verás aquí y podrás continuar con
            la compra
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Tú compra
          </Typography>

          {/* Sección de cupón */}
          <Box sx={{ marginBottom: 2 }}>
            <Box sx={{ display: "flex", gap: 1, marginBottom: 1 }}>
              <TextField
                fullWidth
                label="Código de cupón"
                variant="outlined"
                size="small"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  setCouponMessage(null);
                  // Limpiar cupón aplicado si el usuario cambia el código
                  if (appliedCoupon) {
                    onCouponApplied?.(null);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleValidateCoupon();
                  }
                }}
                disabled={validatingCoupon}
              />
              <Button
                variant="contained"
                onClick={handleValidateCoupon}
                disabled={validatingCoupon || !couponCode.trim()}
                sx={{ whiteSpace: "nowrap" }}
              >
                {validatingCoupon ? "Validando..." : "Validar"}
              </Button>
            </Box>
            {couponMessage && (
              <Alert
                severity={couponMessage.type}
                sx={{ marginTop: 1 }}
                onClose={() => setCouponMessage(null)}
              >
                <Box>
                  <Typography variant="body2" sx={{ marginBottom: (couponMessage.minimumAmount !== undefined || appliedCoupon) ? 1 : 0 }}>
                    {couponMessage.text}
                  </Typography>

                  {/* Información adicional del cupón aplicado exitosamente */}
                  {couponMessage.type === 'success' && appliedCoupon && (
                    <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid rgba(46, 125, 50, 0.2)' }}>
                      <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                        Detalles del cupón:
                      </Typography>
                      {appliedCoupon.type === 'percentage' && appliedCoupon.value && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Descuento: <strong>{appliedCoupon.value}%</strong>
                          {appliedCoupon.maximumDiscount && (
                            <span> (máximo {formatCurrency(appliedCoupon.maximumDiscount)})</span>
                          )}
                        </Typography>
                      )}
                      <Typography variant="body2" color="text.secondary">
                        Descuento aplicado: <strong>{formatCurrency(appliedCoupon.discount)}</strong>
                        {appliedCoupon.maximumDiscount &&
                          appliedCoupon.discount >= appliedCoupon.maximumDiscount && (
                            <span style={{ color: 'var(--mui-palette-success-main)', fontWeight: 600 }}>
                              {' '}• Máximo alcanzado
                            </span>
                          )}
                      </Typography>
                    </Box>
                  )}

                  {/* Información de error con minimumAmount */}
                  {couponMessage.minimumAmount !== undefined && (
                    <Box sx={{ mt: 1, pt: 1, borderTop: `1px solid ${couponMessage.type === 'error' ? 'rgba(211, 47, 47, 0.2)' : 'rgba(46, 125, 50, 0.2)'}` }}>
                      <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                        Información del cupón:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Monto mínimo requerido: <strong>{formatCurrency(couponMessage.minimumAmount)}</strong>
                      </Typography>
                      {couponMessage.currentAmount !== undefined && (
                        <>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Monto actual de tu compra: <strong>{formatCurrency(couponMessage.currentAmount)}</strong>
                          </Typography>
                          <Typography variant="body2" color="primary.main" sx={{ mt: 0.5, fontWeight: 600 }}>
                            Te faltan: <strong>{formatCurrency(couponMessage.minimumAmount - couponMessage.currentAmount)}</strong>
                          </Typography>
                        </>
                      )}
                    </Box>
                  )}
                </Box>
              </Alert>
            )}
          </Box>

          {hasChanges && (
            <Typography color="#97a2aa" sx={{ marginY: 2 }}>
              Parece que ha pasado mucho tiempo y la información de algunos
              productos ha cambiado, lee detalladamente la información y
              asegurate de estar conforme antes de continuar con tu compra.
            </Typography>
          )}
          <CartList appliedCoupon={appliedCoupon} onDeliveryTypeChange={onDeliveryTypeChange} />

          <Typography color="#97a2aa" sx={{ marginTop: 2 }}>
            Asegúrate de que todos los detalles de tu compra sean correctos
            antes de continuar.
          </Typography>
        </>
      )}
    </>
  );
}
