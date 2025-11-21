"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/interfaces/products";
import { finalPrice, formatCurrency } from "@/utils/products";
import { Box, Button, Paper, Stack, Typography, Rating } from "@mui/material";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // Corregí el import

interface Props {
  data: Product;
}

export default function ProductCard({ data }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (hovering && data.images.length > 1) {
      // Cambiamos de imagen inmediatamente
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);

      // Luego empieza el intervalo normal
      interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % data.images.length
        );
      }, 1500);
    } else {
      setCurrentImageIndex(0);
    }

    return () => clearInterval(interval);
  }, [hovering, data.images.length]);

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
        {((data.discount ?? 0) + (data.offerDiscount ?? 0)) > 0 && (
          <>
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
              <Box
                sx={(theme) => ({
                  padding: 0.5,
                  borderRadius: 2,
                  color: theme.palette.primary.contrastText,
                  background: theme.palette.error.main,
                  width: "fit-content",
                })}
              >
                <Typography variant="body1" sx={{ fontSize: 10 }}>
                  {(data.discount ?? 0) + (data.offerDiscount ?? 0)}% Off
                </Typography>
              </Box>
            </Box>
          </>
        )}
        {(data.offerDiscount ?? 0) > 0 && <Box
          sx={{
            position: "absolute",
            top: 35,
            right: 10,
            flexDirection: "column",
            display: "flex",
            alignItems: "end",
            gap: 1,
            zIndex: 2,
          }}
        >
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
              Oferta por tiempo limitado
            </Typography>
          </Box>
        </Box>}

        <Box
          sx={{ overflow: "hidden", position: "relative", height: { xs: 200, md: 300 } }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <Link href={"/detalle-producto/" + data._id}>
            <AnimatePresence mode="wait">
              <motion.img
                key={data.images[currentImageIndex]?.url}
                src={data.images[currentImageIndex]?.url}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  maxHeight: 300,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </AnimatePresence>
          </Link>
        </Box>

        <Stack
          sx={{ padding: 2, flexGrow: 1 }}
          justifyContent={"space-between"}
        >
          {/* Info del producto */}
          <Box>
            {data.categoryDetail?.[0] && (
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

            {/* Rating */}
            {data.averageRating !== undefined && data.averageRating > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                <Rating
                  value={data.averageRating}
                  precision={0.1}
                  size="small"
                  readOnly
                  sx={{ fontSize: '1rem' }}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: '0.75rem' }}
                >
                  ({data.totalReviews || 0})
                </Typography>
              </Box>
            )}

            <Stack direction={{ sx: "column", md: "row" }} spacing={1} alignItems="baseline">
              {(data.discount ?? 0) > 0 && (
                <Typography
                  variant="body1"
                  color="#97a2aa"
                  sx={{ textDecoration: "line-through" }}
                >
                  {formatCurrency(data.price)}
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
                  {formatCurrency(
                    finalPrice(
                      data.price,
                      (data.discount ?? 0) + (data.offerDiscount ?? 0)
                    )
                  )}
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
