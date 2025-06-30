"use client";
import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface Props {
  products: Product[];
}

export default function RandomCategoryProducts({ products }: Props) {
  const isMobile = useMediaQuery("(max-width:600px)");

  return products.length > 0 ? (
    <Box sx={{ marginY: 2 }}>
      <Typography variant="h3" sx={{ marginBottom: 4 }}>
        Productos que te pueden interesar
      </Typography>
      <Swiper
        modules={[Navigation]}
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
            style={{ position: "relative", zIndex: 0,width: "100%",  }}
          >
            <Box sx={{ width: "100%", maxWidth: 300 }}>
              <ProductCard data={product} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      {products.length > 1 && !isMobile && (
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
  ) : null;
}
