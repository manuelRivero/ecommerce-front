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
  console.log("data", data.features[0].stock);

  const groupedFeatures = data.features.reduce((acc, feature) => {
    const { color, size, stock, _id } = feature;

    // Asegurarnos de que color no sea undefined antes de usarlo
    if (color) {
      if (!acc[color]) {
        acc[color] = [];
      }

      acc[color].push({ size, stock, _id });
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

  console.log("groupedFeatures", groupedFeatures);

  return (
    <Box>
      <Typography variant="h3">{data.name}</Typography>
      <Stack
        direction="row"
        spacing={1}
        alignItems="baseline"
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
              color: theme.palette.primary.main,
            })}
          >
            ${finalPrice(data.price, data.discount + (data.offerDiscount || 0))}
          </Typography>
          {(data.discount > 0 || data.offerDiscount > 0) && (
            <Box
              sx={(theme) => ({
                position: "absolute",
                top: 0,
                right: -10,
                transform: "translateX(100%)",
                padding: 0.5,
                borderRadius: 2,
                color: theme.palette.primary.contrastText,
                background: theme.palette.primary.main,
                width: "max-content",
              })}
            >
              <Typography variant="body1" sx={{ fontSize: 10 }}>
                {data.discount + (data.offerDiscount || 0)}% off
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>
      <Typography variant="body1">{data.description}</Typography>
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
                      label={`Talle: ${feature.size} ${
                        Number(feature.stock) === 0 ? "(Sin stock)" : ""
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
