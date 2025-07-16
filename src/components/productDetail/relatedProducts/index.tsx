"use client";
import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import { alpha, Box, Button, IconButton, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface Props {
  products: Product[];
}

export default function RelatedProducts({ products }: Props) {
  const isMobile = useMediaQuery("(max-width:600px)");
  console.log("products", products);
  const categoryName = products[0]?.categoryDetail[0]?.name ?? '';
  const categoryId = products[0]?.categoryDetail[0]?._id ?? '';
  return products.length > 0 ? (
    <Box sx={{ marginY: 2 }}>
      <Stack direction="row" sx={{ marginBottom: 4 }} spacing={2} alignItems="baseline" justifyContent="space-between">
        <Typography variant="h3" >
          Otros productos en <Link href={`/categorias/${categoryId}`} style={{ color: "inherit", textDecoration: "underline" }}>{categoryId}</Link>
        </Typography>
        <Link href={`/categorias/${categoryId}`} style={{ color: "inherit" }}>Ver más</Link>
      </Stack>
      <Box sx={{ paddingX: { md: 10 }, position: "relative" }}>
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={true}

          navigation={{
            prevEl: `.related-prev`,
            nextEl: `.related-next`,
          }}
          spaceBetween={50}
          slidesPerView={"auto"}
          style={{ position: "relative", zIndex: 0 }}
        >
          {products.map((product: Product) => (
            <SwiperSlide
              key={product._id}
              style={{ position: "relative", zIndex: 0, width: "100%", }}
            >
              <Box sx={{ width: "100%", maxWidth: 300 }}>
                <ProductCard data={product} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        {products.length > 3 && !isMobile && (
          <>
            <IconButton
              className={`related-prev`}
              sx={{
                position: "absolute",
                top: "50%",
                left: 10,
                transform: "translateY(-50%)",
              }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              className={`related-next`}
              sx={{
                position: "absolute",
                top: "50%",
                right: 10,
                transform: "translateY(-50%)",
              }}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}
      </Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        })}
      >
        <>
          <Typography variant="h2" sx={{ marginBottom: 2 }}>
            ¿Te gustaron estos productos?
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Explorá todos los productos en {categoryName} y encontrá tu próximo favorito.
          </Typography>
          <Button variant="contained" component={Link} href={`/categorias/${categoryName}`}>
            Ver todos los productos en {categoryName}
          </Button>
        </>
      </Box>
    </Box>
  ) : null;
}
