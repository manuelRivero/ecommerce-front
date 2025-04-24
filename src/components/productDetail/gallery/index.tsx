"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import { Box, IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface Props {
  images: string[];
}
export default function Gallery({ images }: Props) {
  const thumbsRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  return (
    <>
      <Swiper
        modules={[Thumbs, Navigation]}
        thumbs={{ swiper: thumbsRef.current }}
        navigation={{
          prevEl: ".prev-detail",
          nextEl: ".next-detail",
        }}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper: any) => setActiveSlide(swiper.activeIndex)}
        onSwiper={(swiper) => console.log(swiper)}
        style={{ position: "relative", zIndex: 0 }}
      >
        {images.map((image: string) => (
          <SwiperSlide key={image} style={{ position: "relative", zIndex: 0 }}>
            <Stack
              direction="row"
              justifyContent="center"
              style={{ position: "relative", zIndex: 0 }}
            >
              <Box
                sx={{
                  borderRadius: 4,
                  maxHeight: 400,
                  maxWidth: 400,
                  overflow: "hidden",
                }}
                style={{ position: "relative", zIndex: 0 }}
              >
                <img
                  style={{
                    objectFit: "contain",
                    height: "100%",
                    width: "100%",
                    maxWidth: "100%",
                  }}
                  src={image}
                />
              </Box>
            </Stack>
          </SwiperSlide>
        ))}
          {images.length > 1 &&  (
        <>
          <IconButton
            className="prev-detail"
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
            className="next-detail"
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
      </Swiper>
      <Box sx={{ marginTop: 4 }}>
        <Swiper
          onSwiper={(swiper: any) => (thumbsRef.current = swiper)}
          spaceBetween={10}
          slidesPerView={"auto"}
          modules={[Thumbs]}
        >
          {images.map((image: string, index: number) => (
            <SwiperSlide style={{ width: "fit-content" }} key={image}>
              <Box
                sx={(theme) => ({
                  border: "solid 3px",
                  borderColor:
                    activeSlide === index
                      ? theme.palette.primary.main
                      : "transparent",

                  height: 96,
                  width: 96,
                  borderRadius: 4,
                  overflow: "hidden",
                  backgroundImage: `url(${image})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                })}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
