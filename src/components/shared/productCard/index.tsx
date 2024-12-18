"use client";
import { Product } from "@/interfaces/products";
import { finalPrice, offPercentage } from "@/utils/products";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
interface Props {
  data: Product;
}
export default function ProductCard({ data }: Props) {

  return (
    <Paper sx={{ borderRadius: 0, marginTop: 0 }}>
      <Box sx={{ maxWidth: 300, width: "100%", position: "relative" }}>
        {data.discount > 0 && (
          <Box
            sx={(theme) => ({
              position: "absolute",
              top: 10,
              right: 10,
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
        <img
          style={{ objectFit: "cover", maxWidth: "100%", maxHeight: 300 }}
          src={data.images[0].url}
        />
        <Box sx={{ padding: 2 }}>
          <Typography variant="h5">{data.name}</Typography>
          <Stack direction="row" spacing={1} alignItems="baseline">
            {data.discount > 0  && (
              <Typography
                variant="body1"
                color="#97a2aa"
                sx={{ textDecoration: "line-through" }}
              >
                ${data.price}
              </Typography>
            )}
            <Typography
              variant="body1"
              sx={(theme) => ({
                fontSize: 20,
                color: theme.palette.primary.contrastText,
              })}
            >
              ${finalPrice(data.price, data.discount) }
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ marginTop: 2 }}
          >
            <Button
              variant="contained"
              component={Link}
              href={"detalle-producto/" + data._id}
            >
              Ver más
            </Button>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}
