"use client";
import React from "react";
import { Product } from "@/interfaces/products";
import { finalPrice, formatNumber } from "@/utils/products";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { motion } from "motion/react";

interface Props {
  data: Product;
}
export default function ProductCard({ data }: Props) {
  console.log("product data", data);
  return (
    <Paper
      sx={{
        maxWidth: 300,
        width: "100%",
        borderRadius: 0,
        marginTop: 0,
        height: "100%",
      }}
    >
      <Stack sx={{ width: "100%", position: "relative", height: "100%" }}>
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
              zIndex: 2,
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
                  {data.offerDiscount + (data.discount || 0)}% Off tiempo
                  limitado
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
        <Box sx={{ overflow: "hidden" }}>
          <Link href={"/detalle-producto/" + data._id}>
            <motion.img
              style={{
                width: "100%",
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: 300,
              }}
              src={data.images[0].url}
              whileHover={{ scale: 1.05, zIndex: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </Box>
        <Stack
          sx={{ padding: 2, flexGrow: 1 }}
          justifyContent={"space-between"}
        >
          <Box>
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
                <Typography variant="body1" sx={{ fontSize: 12 }}>
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
                  ${formatNumber(data.price)}
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
                  {formatNumber(finalPrice(
                    data.price,
                    data.discount + (data.offerDiscount || 0)
                  ))}
                </strong>
              </Typography>
            </Stack>
          </Box>
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
        </Stack>
      </Stack>
    </Paper>
  );
}
