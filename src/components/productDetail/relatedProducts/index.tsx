"use client";
import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface Props {
  products: Product[];
}

export default function RelatedProducts({ products }: Props) {
  return products.length > 0 ? (
    <Box sx={{ marginY: 2 }}>
      <Typography variant="h3" sx={{ marginBottom: 4 }}>
        Productos relacionados
      </Typography>
      <Swiper
        modules={[Navigation]}
        navigation={{ enabled: true }}
        spaceBetween={50}
        slidesPerView={"auto"}
        style={{ position: "relative", zIndex: 0 }}
      >
        {products.map((product: Product) => (
          <SwiperSlide
            key={product._id}
            style={{ position: "relative", zIndex: 0, width: "fit-content" }}
          >
            <ProductCard data={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  ) : null;
}
