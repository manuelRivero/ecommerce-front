"use client";

import { Box, Button, Paper, Stack, Typography } from "@mui/material";

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
import OffersCard from "../offersCard";
import { Offer } from "@/interfaces/offers";
import { Product } from "@/interfaces/products";
import { finalPrice } from "@/utils/products";
import { alpha } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Props {
  data: Offer[];
}
export default function Offers({ data }: Props) {
  const isMobile = useMediaQuery("(max-width:1200px)");
  return (
    <Box id="offers-sales-container" sx={{ position: "relative" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h2">Ofertas por tiempo limitado</Typography>
      </Stack>

      <Box sx={{ paddingX: { md: 10 }, height: "100%" }}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".prev-hot-sales",
            nextEl: ".next-hot-sales",
          }}
          spaceBetween={25}
          slidesPerView={1}
          style={{ position: "relative", zIndex: 0, width: "100%" }}
        >
          {data.map((offer: Offer) => (
            <SwiperSlide key={offer._id}>
              <Paper
                sx={(theme) => ({
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  padding: { xs: 0, md: 4 },
                  backgroundImage: `linear-gradient(300deg, ${alpha(
                    theme.palette.primary.main,
                    0.2
                  )} 60%, transparent 40%)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                })}
              >
                <Swiper
                  modules={[Pagination]}
                  autoplay
                  loop
                  pagination={true}
                  direction={isMobile ? "horizontal" : "vertical"}
                  spaceBetween={25}
                  slidesPerView={1}
                  autoHeight={false}
                  style={{
                    height: isMobile ? 600 : 400,
                  }}
                >
                  {offer.products.map((product: Product) => (
                    <SwiperSlide
                      key={offer._id}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        padding: "1rem",
                        boxSizing: "border-box",
                      }}
                    >
                      <Paper
                        sx={{
                          padding: 4,
                          display: "flex",
                          gap: "1rem",
                          alignItems: "center",
                          boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)",
                          borderRadius: 2,
                          p: 2,
                          flexDirection: { xs: "column", md: "row" },
                        }}
                      >
                        <img
                          src={product.images[0].url}
                          alt="image"
                          style={{ maxWidth: "250px", maxHeight: "250px" }}
                        />
                        <Box width="100%">
                          <Typography variant={isMobile ? "h5" : "h3"}>{product.name}</Typography>
                          <Box
                            display="flex"
                            alignItems="baseline"
                            sx={{ gap: 1 }}
                          >
                            {product.discount > 0 && (
                              <Typography
                              variant={isMobile ? "body1" : "h1"}
                                color="#97a2aa"
                                sx={{ textDecoration: "line-through" }}
                              >
                                ${product.price}
                              </Typography>
                            )}
                            <Typography
                              variant={isMobile ? "body1" : "h1"}
                              sx={(theme) => ({
                                color: theme.palette.primary.main,
                              })}
                            >
                              <strong>
                                ${finalPrice(product.price, product.discount)}
                              </strong>
                            </Typography>
                          </Box>
                          <Typography
                            variant="body1"
                            sx={(theme) => ({
                              color: theme.palette.primary.main,
                            })}
                          >
                            {product.description}
                          </Typography>
                          <Stack direction="row" justifyContent="end">
                            <Button
                              sx={{ marginTop: 2 }}
                              variant="contained"
                              component={Link}
                              href={"/descuentos"}
                            >
                              Comprar
                            </Button>
                          </Stack>
                        </Box>
                      </Paper>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Box sx={{ padding: 4 }}>
                  <Typography
                    variant="h6"
                    mb={1}
                    textAlign="center"
                    sx={(theme) => ({ color: theme.palette.primary.main })}
                  >
                    {offer.name}
                  </Typography>
                  {offer.discount && (
                    <>
                      <Typography
                        variant="h2"
                        mb={1}
                        textAlign="center"
                        sx={(theme) => ({ color: theme.palette.primary.main })}
                      >
                        {offer.discount}% de descuento
                      </Typography>
                      <Typography
                        variant="body1"
                        mb={2}
                        textAlign="center"
                        sx={(theme) => ({ color: theme.palette.primary.main })}
                      >
                        En productos seleccionados
                      </Typography>
                    </>
                  )}

                  <Stack direction="row" justifyContent="center">
                    <Button
                      variant="contained"
                      component={Link}
                      href={"/descuentos"}
                    >
                      Ver productos
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </SwiperSlide>
          ))}

          {/* <SwiperSlide
            style={{
              height: "100%",
              display: "flex",
              background: 'red'
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button variant="contained" component={Link} href={"/descuentos"}>
                Ver todas las ofertas
              </Button>
            </Box>
          </SwiperSlide> */}
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
