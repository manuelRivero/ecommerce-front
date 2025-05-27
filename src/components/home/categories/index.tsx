import { Category } from "@/interfaces/categories";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

interface Props {
  data: Category[];
}

function Categories({ data }: Props) {
  const isMobile = useMediaQuery("(max-width:1200px)");

  return data.length === 0 ? null : (
    <Box
      id="hot-categories-container"
      sx={{ position: "relative", minHeight: "60vh" }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h2">Categorías</Typography>
      </Stack>

      <Box sx={{ paddingX: { md: 10 } }}>
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={true}
          navigation={{
            prevEl: ".prev-categories",
            nextEl: ".next-categories",
          }}
          spaceBetween={25}
          slidesPerView={1}
          style={{ position: "relative", zIndex: 0 }}
          breakpoints={{
            600: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {data.map((category: Category) => (
            <SwiperSlide
              key={category._id}
              style={{ position: "relative", zIndex: 0, height: 300 }}
            >
              <Link
                href={`/productos/${category._id}`}
                style={{ width: "100%", height: "100%" }}
              >
                <Paper
                  sx={(theme) => ({
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  })}
                >
                  <Stack
                    direction="column"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        "&:hover": {
                          transform: "scale(1.2)",
                          transition: "transform .5s ease-in-out",
                          transformOrigin: "50% 50%",
                          backgroundColor: "red",
                        },
                      }}
                    >
                      <img
                        src={
                          category.image.url ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmiqR_gB1aE6SmGpJvgdi6j6MZYtLpcSittA&s"
                        }
                        alt="categoría"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          zIndex: 1,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h4"
                      textAlign="center"
                      sx={(theme) => ({
                        color: theme.palette.primary.contrastText,
                        backgroundColor: alpha(theme.palette.primary.main, 0.5),
                        width: "100%",
                        position: "relative",
                        zIndex: 10,
                      })}
                    >
                      {category.name}
                    </Typography>
                  </Stack>
                </Paper>
              </Link>
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
              <Button variant="contained" component={Link} href={"/productos"}>
                Ver todos los productos
              </Button>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>
      {data.length > 1 && !isMobile && (
        <>
          <IconButton
            className="prev-categories"
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
            className="next-categories"
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

export default Categories;
