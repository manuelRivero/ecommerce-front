"use client";
import { Product } from "@/interfaces/products";
import { finalPrice } from "@/utils/products";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
interface Props {
  data: Product;
}
export default function ProductCard({ data }: Props) {
  console.log("product data", data);
  return (
    <Paper sx={{ maxWidth: 300, width: "100%", borderRadius: 0, marginTop: 0 }}>
      <Box sx={{ width: "100%", position: "relative" }}>
        {(data.discount > 0 || data.offerDiscount > 0) && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              flexDirection: "column",
              display: "flex",
              alignItems: "end",
              gap: 1,
            }}
          >
            {data.offerDiscount > 0 && (
              <Box
                sx={(theme) => ({
                  padding: 0.5,
                  borderRadius: 2,
                  color: theme.palette.primary.contrastText,
                  background: theme.palette.primary.main,
                })}
              >
                <Typography variant="body1" sx={{ fontSize: 10 }}>
                  {data.offerDiscount + (data.discount || 0)}% Off tiempo limitado
                </Typography>
              </Box>
            )}
            {data.discount > 0 && !data.offerDiscount > 0 && (
              <Box
                sx={(theme) => ({
                  padding: 0.5,
                  borderRadius: 2,
                  color: theme.palette.primary.contrastText,
                  background: theme.palette.primary.main,
                  width: "fit-content",
                })}
              >
                <Typography variant="body1" sx={{ fontSize: 10 }}>
                  {data.discount + (data.offerDiscount || 0)}% Off
                </Typography>
              </Box>
            )}
          </Box>
        )}
        <Link href={"/detalle-producto/" + data._id}>
          <img
            style={{
              width: "100%",
              objectFit: "contain",
              maxWidth: "100%",
              maxHeight: 300,
            }}
            src={data.images[0].url}
          />
        </Link>
        <Box sx={{ padding: 2 }}>
          {data.categoryDetail && data.categoryDetail[0] && (
            <Box
              sx={(theme) => ({
                marginBottom: 1,
                width: "fit-content",
                paddingX: 1,
                borderRadius: 16,
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary.main,
              })}
            >
              <Typography variant="h5">
                {data.categoryDetail[0].name}
              </Typography>
            </Box>
          )}
          <Typography variant="h5">{data.name}</Typography>
          <Stack direction="row" spacing={1} alignItems="baseline">
            {data.discount > 0 && (
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
                color: theme.palette.primary.main,
              })}
            >
              <strong>
                $
                {finalPrice(
                  data.price,
                  data.discount + (data.offerDiscount || 0)
                )}
              </strong>
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ marginTop: 1 }}
          >
            <Button
              variant="contained"
              component={Link}
              href={"/detalle-producto/" + data._id}
            >
              Comprar
            </Button>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}
