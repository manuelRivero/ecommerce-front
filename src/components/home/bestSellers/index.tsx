"use client";

import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Paper,
  alpha,
  Stack,
} from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import ProductGrid from "@/components/shared/ProductGrid";

interface Props {
  data: Product[];
  totalPages: number;
}

export default function BestSellers({ data }: Props) {
  const isMobile = useMediaQuery("(max-width:1200px)");
  console.log("BestSellers", data);
  return data.length === 0 ? null : (
    <Box id="best-seller-container" sx={{ position: "relative" }}>
      {isMobile && (
        <>
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
                    href={"/descuentos"}
                  >
                    Ver todos los productos
                  </Button>
                </Box>
              </SwiperSlide>
            </Swiper>
          </Box>
        </>
      )}

      {!isMobile && (
        <>
          <ProductGrid title="Más vendidos" data={data} />
        </>
      )}
      <Paper
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 4,
          marginTop: 4,

          backgroundImage: `linear-gradient(300deg, ${alpha(
            theme.palette.primary.main,
            0.2
          )} 60%, transparent 40%)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        })}
      >
        <>
          <Typography variant="h2" sx={{ marginBottom: 2 }}>
            ¿Te gustaron estos productos?
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Explorá todos los más vendidos y encontrá tu próximo favorito.
          </Typography>
          <Button variant="contained" component={Link} href={"/mas-vendidos"}>
            Ver todos los más vendidos
          </Button>
        </>
      </Paper>
    </Box>
  );
}
