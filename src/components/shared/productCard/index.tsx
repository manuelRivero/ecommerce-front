"use client";
import { Product } from "@/interfaces/products";
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
          {data.discountPercentage && (
            <Typography variant="body1" sx={{ fontSize: 10 }}>
              {data.discountPercentage}% off
            </Typography>
          )}
        </Box>
        <img
          style={{ objectFit: "cover", maxWidth: "100%" }}
          src={data.image}
        />
        <Box sx={{ padding: 2 }}>
          <Typography variant="h5">{data.name}</Typography>
          <Typography variant="body1">${data.finalPrice}</Typography>
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
