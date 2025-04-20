"use client";

import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";

interface Props {
  data: Product[];
  totalPages: number;
}
export default function BestSellers({ data }: Props) {
  const isMobile = useMediaQuery("(max-width:1200px)");

  return (
    <Box
      id="best-seller-container"
      sx={{ position: "relative", minHeight: "60vh" }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h2">Más vendidos</Typography>
      </Stack>

      <Box sx={{ paddingX: { md: 10 } }}>
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={true}
          navigation={{
            prevEl: ".prev-best-seller",
            nextEl: ".next-best-seller",
          }}
          spaceBetween={25}
          slidesPerView={1}
          style={{ position: "relative", zIndex: 0 }}
          breakpoints={{
            600: {
              slidesPerView: 2,
            },
            1200: {
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
          <SwiperSlide style={{ height: "auto" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Button
                variant="contained"
                component={Link}
                href={"/mas-vendidos"}
              >
                Ver todos los más vendidos
              </Button>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>
      {data.length > 1 && !isMobile && (
        <>
          <IconButton
            className="prev-best-seller"
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
            className="next-best-seller"
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
  );
}
