"use client";

import React, { useEffect, useState } from "react";
import QuantitySelector from "@/components/shared/quantitySelector";
import { setProductToCart, toggleCart, useCart } from "@/context/cart";
import { Product } from "@/interfaces/products";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { finalPrice } from "@/utils/products";
import { formatNumber } from "@/utils/products";
import { ProductReviewsResponse } from "@/client/reviews";
import { Rating } from "@mui/material";

interface Props {
  data: Product;
  reviews?: ProductReviewsResponse['data'];
}

export default function Detail({ data, reviews }: Props) {
  const [, dispatch] = useCart();
  const [quantity, setQuantity] = useState<string>("1");
  const [formAlert, setFormAlert] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [stock, setStock] = useState<string | null>(null);
  console.log("data", data.features[0].stock);

  const groupedFeatures = data.features.reduce((acc, feature) => {
    // Extraer el nombre del color (puede ser string o objeto)
    const colorName = typeof feature.color === 'string'
      ? feature.color
      : feature.color?.name;
    // Extraer el nombre del size (puede ser string o objeto)
    const sizeName = typeof feature.size === 'string'
      ? feature.size
      : feature.size?.name;
    const { stock, _id } = feature;

    // Asegurarnos de que colorName no sea undefined antes de usarlo
    if (colorName) {
      if (!acc[colorName]) {
        acc[colorName] = [];
      }

      acc[colorName].push({ size: sizeName, stock, _id });
    }

    return acc;
  }, {} as Record<string, { size: string | undefined; stock: string; _id?: string }[]>);

  const isColorOnlyProduct = Object.keys(groupedFeatures).every((color) =>
    groupedFeatures[color].every((feature) => !feature.size)
  );
  const isUniqueProduct = Object.keys(groupedFeatures).length === 0;

  const updateStock = () => {
    if (!selectedColor && !isUniqueProduct) {
      setStock(null);
      return;
    }

    if (selectedColor) {
      const selectedFeature = groupedFeatures[selectedColor].find(
        (feature) => feature.size === selectedSize
      );
      console.log("selectedFeature", selectedFeature);
      setStock(selectedFeature ? selectedFeature.stock : null);
    } else if (isUniqueProduct) {
      const selectedFeature = data.features[0];
      setStock(selectedFeature ? selectedFeature.stock : null);
    }
  };

  useEffect(() => {
    updateStock();
  }, [selectedSize, selectedColor]);

  const handleAddToCart = () => {
    // Validar que se haya seleccionado un color (y talla si aplica)
    setStock((Number(stock) - Number(quantity)).toString());
    setFormAlert(true);
    if (isUniqueProduct) {
      setProductToCart(dispatch, {
        ...data,
        color: null,
        size: null,
        quantity: Number(quantity),
      });
    } else {
      setProductToCart(dispatch, {
        ...data,
        color: selectedColor!,
        size: selectedSize ?? null,
        quantity: Number(quantity),
      });
    }
  };

  const isFormValid = () => {
    if (isUniqueProduct && Number(stock) < 0) return false;
    if (isColorOnlyProduct && !selectedColor && !isUniqueProduct) return false; // El color es obligatorio
    if (!isColorOnlyProduct && !selectedSize && !isUniqueProduct) return false;
    if (Number(stock) <= 0) return false; // La talla es obligatoria si no es solo color
    return true;
  };

  const handleScroll = () => {
    toggleCart(dispatch, true);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    setFormAlert(false);
  }, [quantity]);

  console.log("data", data);

  return (
    <Box>
      {/* Rating promedio del producto - ENCIMA del nombre */}
      {reviews && reviews.statistics.totalReviews > 0 && (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <Rating
            value={reviews.statistics.averageRating}
            precision={0.1}
            readOnly
            size="large"
            sx={{
              '& .MuiRating-iconFilled': {
                color: (theme) => theme.palette.warning.main,
              },
              '& .MuiRating-iconHover': {
                color: (theme) => theme.palette.warning.main,
              }
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {reviews.statistics.averageRating.toFixed(1)}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ({reviews.statistics.totalReviews} reseña{reviews.statistics.totalReviews !== 1 ? 's' : ''})
          </Typography>
        </Stack>
      )}

      {/* Total de ventas del producto */}
      {(data.totalSales ?? 0) > 0 && (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ marginBottom: 2 }}>
          <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            🏆 <strong>{data.totalSales}</strong> unidades vendidas
          </Typography>
        </Stack>
      )}

      <Stack
        direction="row"
        spacing={1}
        alignItems="start"
        justifyContent={"space-between"}
        sx={{ marginTop: 2 }}
      >
        <Typography variant="h3">{data.name}</Typography>
        <IconButton
          component={"a"}
          href={"https://www.facebook.com/sharer/sharer.php?u=" + window.location.href} // aquí necesito el hostname
          target="_blank"
        >
          <ShareIcon />
        </IconButton>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        alignItems="baseline"
        sx={{ marginTop: 2 }}
      >
        {(data.discount ?? 0) > 0 && (
          <Typography variant="body1" sx={{ textDecoration: "line-through" }}>
            ${formatNumber(data.price)}
          </Typography>
        )}
        <Box sx={{ position: "relative" }}>
          <Typography
            variant="body1"
            sx={(theme) => ({
              fontSize: 32,
              fontWeight: "bold",
              color: theme.palette.primary.main,
            })}
          >
            ${formatNumber(finalPrice(data.price, data.discount ?? 0 + (data.offerDiscount ?? 0)))}
          </Typography>
          {((data.offerDiscount ?? 0)) > 0 && (
            <>
              <Box
                sx={(theme) => ({
                  position: "absolute",
                  top: 0,
                  right: -10,
                  transform: "translateX(100%)",
                  padding: 0.5,
                  borderRadius: 2,
                  color: theme.palette.primary.contrastText,
                  background: theme.palette.error.main,
                  width: "max-content",
                })}
              >
                <Typography variant="body1" sx={{ fontSize: 10 }}>
                  {data.discount ?? 0 + (data.offerDiscount ?? 0)}% off
                </Typography>
              </Box>
              <Box
                sx={(theme) => ({
                  position: "absolute",
                  top: 0,
                  right: -60,
                  transform: "translateX(100%)",
                  padding: 0.5,
                  borderRadius: 2,
                  color: theme.palette.primary.contrastText,
                  background: theme.palette.primary.main,
                  width: "max-content",
                })}
              >
                <Typography variant="body1" sx={{ fontSize: 10 }}>
                  Oferta por tiempo limitado
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Stack>
      <div dangerouslySetInnerHTML={{ __html: data.description }} />
      <Divider sx={{ marginY: 2 }} />
      <Box>
        {Object.keys(groupedFeatures).length > 0 && (
          <>
            <Typography variant="body1">Color</Typography>

            <Stack direction="row">
              {Object.keys(groupedFeatures).map((color) => (
                <FormControlLabel
                  key={color}
                  control={
                    <Checkbox
                      checked={selectedColor === color}
                      onChange={() => {
                        setSelectedColor(color);
                        setSelectedSize(null); // Reiniciar la talla al cambiar de color
                      }}
                    />
                  }
                  label={color}
                />
              ))}
            </Stack>
            <Box>
              {selectedColor && !isColorOnlyProduct && (
                <>
                  <Typography variant="body1">Talle</Typography>
                  {groupedFeatures[selectedColor].map((feature) => (
                    <FormControlLabel
                      key={feature.size}
                      control={
                        <Checkbox
                          checked={selectedSize === feature.size}
                          onChange={() => setSelectedSize(feature.size ?? null)}
                        />
                      }
                      label={`Talle: ${feature.size} ${Number(feature.stock) === 0 ? "(Sin stock)" : ""
                        } `}
                    />
                  ))}
                </>
              )}
            </Box>
          </>
        )}
      </Box>
      {Number(stock) > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body1" textAlign="right">
            Stock disponible: <strong>{stock || "N/A"} unidades</strong>
          </Typography>
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ marginTop: 2 }}
          >
            <QuantitySelector
              setValue={setQuantity}
              value={quantity}
              max={Number(stock) || 0}
            />
          </Stack>
        </Box>
      )}
      <Divider sx={{ marginTop: 4 }} />
      <Stack direction="row" justifyContent="flex-end" sx={{ marginTop: 4 }}>
        <Button
          disabled={!isFormValid()}
          variant="contained"
          onClick={handleAddToCart} // Usamos la función de validación al agregar al carrito
        >
          Agregar al carrito
        </Button>
      </Stack>
      {formAlert && (
        <Stack direction="column" alignItems="flex-end">
          <Typography textAlign="right" sx={{ marginTop: 2 }}>
            El producto se agregó al carrito, cantidad:{" "}
            <strong>{quantity}</strong>
          </Typography>
          <Typography textAlign="right" sx={{ marginTop: 2 }}>
            Revisa tu carrito para finalizar la compra
          </Typography>
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            onClick={handleScroll}
          >
            Ver mi carrito
          </Button>
        </Stack>
      )}
    </Box>
  );
}
