"use client";

import React, { useEffect, useState } from "react";
import QuantitySelector from "@/components/shared/quantitySelector";
import { setProductToCart, useCart } from "@/context/cart";
import { Product } from "@/interfaces/products";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { finalPrice } from "@/utils/products";

interface Props {
  data: Product;
}

export default function Detail({ data }: Props) {
  const [, dispatch] = useCart();
  const [quantity, setQuantity] = useState<string>("1");
  const [formAlert, setFormAlert] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [stock, setStock] = useState<string | null>(null);

  // Agrupar las características del producto por color
  const groupedFeatures = data.features.reduce((acc, feature) => {
    const { color, size, stock, _id } = feature;

    if (!acc[color]) {
      acc[color] = [];
    }

    acc[color].push({ size, stock, _id });
    return acc;
  }, {} as Record<string, { size: string; stock: string; _id?: string }[]>);

  // Verificar si el producto tiene solo variantes de color
  const isColorOnlyProduct = Object.keys(groupedFeatures).every(
    (color) => groupedFeatures[color].every((feature) => !feature.size)
  );

  // Actualizar el stock disponible basado en la selección de talla y color
  const updateStock = () => {
    if (!selectedColor) {
      setStock(null);
      return;
    }

    const selectedFeature = groupedFeatures[selectedColor].find(
      (feature) => feature.size === selectedSize
    );

    setStock(selectedFeature ? selectedFeature.stock : null);
  };

  useEffect(() => {
    updateStock();
  }, [selectedSize, selectedColor]);

  useEffect(() => {
    setFormAlert(false);
  }, [quantity]);

  const handleAddToCart = () => {
    // Validar que se haya seleccionado un color (y talla si aplica)
    if (!selectedColor) {
      alert("Por favor selecciona un color.");
      return;
    }

    if (!isColorOnlyProduct && !selectedSize) {
      alert("Por favor selecciona una talla.");
      return;
    }

    setFormAlert(true);
    setProductToCart(dispatch, {
      ...data,
      color: selectedColor,
      size: selectedSize ?? null,
      quantity: Number(quantity),
    });
  };

  const isFormValid = () => {
    if (!selectedColor) return false; // El color es obligatorio
    if (!isColorOnlyProduct && !selectedSize) return false; // La talla es obligatoria si no es solo color
    return true;
  };

  console.log("groupedFeatures", groupedFeatures);

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
          <Typography
            variant="body1"
            sx={(theme) => ({
              fontSize: 32,
              fontWeight: "bold",
              color: theme.palette.primary.contrastText,
            })}
          >
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
      <Box>
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
          {selectedColor &&
            !isColorOnlyProduct &&
            groupedFeatures[selectedColor].map((feature) => (
              <FormControlLabel
                key={feature.size}
                control={
                  <Checkbox
                    checked={selectedSize === feature.size}
                    onChange={() => setSelectedSize(feature.size)}
                  />
                }
                label={`Talle: ${feature.size}`}
              />
            ))}
        </Box>
      </Box>
      {stock && (
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
        <>
          <Typography textAlign="right" sx={{ marginTop: 2 }}>
            El producto se agregó al carrito, cantidad:{" "}
            <strong>{quantity}</strong>
          </Typography>
          <Typography textAlign="right" sx={{ marginTop: 2 }}>
            Revisa tu carrito para finalizar la compra
          </Typography>
        </>
      )}
    </Box>
  );
}
