"use client";
import { getProducts } from "@/client/products";
import PageLoader from "@/components";
import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import { Box, Stack, Typography } from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CategoryDropdown from "../categoryDropdown";
import EmptyProducts from "../emptyProducts";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface Props {
  data: Product[];
  totalPages: number;
}
export default function HotSales({ data, totalPages }: Props) {
  console.log("hot sales", data, totalPages);

  return (
    <Box
      id="hot-sales-container"
      sx={{ position: "relative", minHeight: "60vh" }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h2">Ofertas</Typography>
      </Stack>

      <Box sx={{ paddingX: { md: 10 } }}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".prev-hot-sales",
            nextEl: ".next-hot-sales",
          }}
          spaceBetween={25}
          slidesPerView={1}
          style={{ position: "relative", zIndex: 0 }}
          breakpoints={{
            600: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 3,
            },
          }}
        >
          {data.map((product: Product) => (
            <SwiperSlide
              key={product._id}
              style={{ position: "relative", zIndex: 0 }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ProductCard data={product} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <IconButton
        className="prev-hot-sales"
        sx={(theme) => ({
          position: "absolute",
          top: "50%",
          left: 10,
          transform: "translateY(-50%)",
          border: { xs: `2px solid ${theme.palette.primary.main}` },
        })}
      >
        <ChevronLeft sx={(theme) => ({ color: theme.palette.primary.main })} />
      </IconButton>
      <IconButton
        className="next-hot-sales"
        sx={(theme) => ({
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
          border: { xs: `2px solid ${theme.palette.primary.main}` },
        })}
      >
        <ChevronRight sx={(theme) => ({ color: theme.palette.primary.main })} />
      </IconButton>
    </Box>
  );
}
