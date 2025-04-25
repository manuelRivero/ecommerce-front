"use client";

import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import OffersCard from "../offersCard";
import { Offer } from "@/interfaces/offers";
import { Product } from "@/interfaces/products";
import { finalPrice } from "@/utils/products";
import { alpha } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Countdown from "react-countdown";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import moment from "moment-timezone";

import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
interface Props {
  data: Offer[];
}
export default function Offers({ data }: Props) {
  const isMobile = useMediaQuery("(max-width:1200px)");
  const [completed, setCompleted] = useState(false);
  return data.length > 0 ? (
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
        {data.length > 1 && !isMobile && (
          <>
            <IconButton
              className="prev-offers"
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
              className="next-offers"
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
        <Swiper
          modules={[Pagination, Navigation]}
          navigation={{
            prevEl: ".prev-offers",
            nextEl: ".next-offers",
          }}
          pagination={true}
          direction={"horizontal"}
          spaceBetween={25}
          slidesPerView={1}
          style={{
            width: "100%",
          }}
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
                  modules={[Pagination, Autoplay]}
                  autoplay
                  loop
                  pagination={true}
                  direction={isMobile ? "horizontal" : "vertical"}
                  spaceBetween={25}
                  slidesPerView={1}
                  autoHeight={false}
                  style={{
                    maxHeight: isMobile ? 600 : 400,
                    width: "100%",
                  }}
                >
                  {offer.products.map((product: Product) => (
                    <SwiperSlide
                      key={product._id}
                      style={{
                        display: "flex",
                        justifyContent: "center",
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
                          width: "100%",
                          minWidth: { xs: 300, md: 400 },
                          flexDirection: { xs: "column", md: "row" },
                        }}
                      >
                        <img
                          src={product.images[0].url}
                          alt="image"
                          style={{ maxWidth: "250px", maxHeight: "250px" }}
                        />
                        <Box width="100%">
                          <Typography variant={isMobile ? "h5" : "h3"}>
                            {product.name}
                          </Typography>
                          <Box
                            display="flex"
                            alignItems="baseline"
                            sx={{ gap: 1 }}
                          >
                            {product.discount > 0 && (
                              <Typography
                                variant={isMobile ? "body1" : "h3"}
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
                                $
                                {finalPrice(
                                  product.price,
                                  product.discount + product.offerDiscount
                                )}
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
                              href={"/detalle-producto/" + product._id}
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
                      {!completed && (
                        <>
                          <Typography
                            variant="h5"
                            textAlign="center"
                            sx={(theme) => ({
                              color: theme.palette.primary.main,
                            })}
                          >
                            Finaliza en:
                          </Typography>
                          <Countdown
                            date={moment(offer.endDate)
                              .set("hour", 23)
                              .set("minute", 59)
                              .toDate()}
                            renderer={({
                              days,
                              hours,
                              minutes,
                              seconds,
                              completed,
                            }) => {
                              if (completed) {
                                setCompleted(completed);
                              }
                              return (
                                <Typography
                                  variant="h3"
                                  textAlign="center"
                                  mb={2}
                                >
                                  {String(days).padStart(2, "0")}:
                                  {String(hours).padStart(2, "0")}:
                                  {String(minutes).padStart(2, "0")}:
                                  {String(seconds).padStart(2, "0")}
                                </Typography>
                              );
                            }}
                          />
                        </>
                      )}
                    </>
                  )}

                  <Stack direction="row" justifyContent="center">
                    <Button
                      variant="contained"
                      component={Link}
                      href={"/ofertas"}
                    >
                      Ver productos
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  ) : null;
}
