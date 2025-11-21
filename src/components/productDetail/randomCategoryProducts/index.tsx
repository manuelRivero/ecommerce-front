"use client";
import ProductCard from "@/components/shared/productCard";
import { Category } from "@/interfaces/categories";
import { Product } from "@/interfaces/products";
import { alpha, Button, Box, IconButton, Paper, Typography, useMediaQuery, Stack } from "@mui/material";
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
  category: Category;
}

export default function RandomCategoryProducts({ products, category }: Props) {
  const isMobile = useMediaQuery("(max-width:600px)");
  console.log("products", products[0]?.categoryDetail[0]);
  return products.length > 0 ? (
    <Box sx={{ marginY: 2 }}>
      <Stack direction="row" sx={{ marginBottom: 4 }} spacing={2} alignItems="baseline" justifyContent="space-between">
        <Typography variant="h3">
          Otros productos en <Link href={`/productos?categories=${category._id}`} style={{ color: "inherit", textDecoration: "underline" }}>{category.name}</Link>
        </Typography>
        <Link href={`/productos?categories=${category._id}`} style={{ color: "inherit" }}>Ver más</Link>
      </Stack>
      <Box sx={{ paddingX: { md: 10 }, position: "relative" }}>

        <Swiper
          modules={[Navigation, Pagination]}
          pagination={true}
          navigation={{
            prevEl: `.ramdon-prev`,
            nextEl: `.ramdon-next`,
          }}
          spaceBetween={50}
          slidesPerView={1}
          breakpoints={{
            600: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
          style={{ position: "relative", zIndex: 0, paddingBottom: "0px !importan" }}
        >
          {products.map((product: Product) => (
            <SwiperSlide
              key={product._id}
              style={{ position: "relative", zIndex: 0, maxWidth: 300 }}
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
              className={`ramdon-prev`}
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
              className={`ramdon-next`}
              sx={{
                position: "absolute",
                top: "50%",
                right: 10,
                transform: "translateY(-50%) ",
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
            Explorá todos los productos en {category.name} y encontrá tu próximo favorito.
          </Typography>
          <Button variant="contained" component={Link} href={`/productos?categories=${category._id}`}>
            Ver todos los productos en {category.name}
          </Button>
        </>
      </Box>
    </Box>
  ) : null;
}
