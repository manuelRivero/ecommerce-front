"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/thumbs";
import { Box, Stack } from "@mui/material";

export default function Gallery() {
  const thumbsRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  return (
    <>
      <Swiper
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsRef.current }}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper: any) => setActiveSlide(swiper.activeIndex)}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Stack direction="row" justifyContent="center">
            <Box
              sx={{
                borderRadius: 4,
                maxHeight: 400,
                maxWidth: 400,
                overflow: "hidden",
              }}
            >
              <img
                style={{ objectFit: "cover", maxWidth: "100%" }}
                src="https://swiperjs.com/demos/images/nature-1.jpg"
              />
            </Box>
          </Stack>
        </SwiperSlide>
        <SwiperSlide>
          <Stack direction="row" justifyContent="center">
            <Box
              sx={{
                borderRadius: 4,
                maxHeight: 400,
                maxWidth: 400,
                overflow: "hidden",
              }}
            >
              <img
                style={{ objectFit: "cover", maxWidth: "100%" }}
                src="https://swiperjs.com/demos/images/nature-1.jpg"
              />
            </Box>
          </Stack>
        </SwiperSlide>
        <SwiperSlide>
          <Stack direction="row" justifyContent="center">
            <Box
              sx={{
                borderRadius: 4,
                maxHeight: 400,
                maxWidth: 400,
                overflow: "hidden",
              }}
            >
              <img
                style={{ objectFit: "cover", maxWidth: "100%" }}
                src="https://swiperjs.com/demos/images/nature-1.jpg"
              />
            </Box>
          </Stack>
        </SwiperSlide>
      </Swiper>
      <Box sx={{ marginTop: 4 }}>
        <Swiper
          onSwiper={(swiper: any) => (thumbsRef.current = swiper)}
          spaceBetween={10}
          slidesPerView={"auto"}
          modules={[Thumbs]}
        >
          <SwiperSlide style={{ width: "fit-content" }}>
            <Box
              sx={(theme)=>({
                border: "solid 2px",
                borderColor: activeSlide === 0 ? theme.palette.primary.main : "transparent",

                height: 96,
                width: 96,
                borderRadius: 4,
                overflow: "hidden",
                backgroundImage:
                  "url(https://swiperjs.com/demos/images/nature-1.jpg)",
                backgroundPosition: "center",
                backgroundSize: "contain",
              })}
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: "fit-content" }}>
            <Box
              sx={(theme)=>({
                border: "solid 2px",
                borderColor: activeSlide === 1 ? theme.palette.primary.main : "transparent",

                height: 96,
                width: 96,
                borderRadius: 4,
                overflow: "hidden",
                backgroundImage:
                  "url(https://swiperjs.com/demos/images/nature-1.jpg)",
                backgroundPosition: "center",
                backgroundSize: "contain",
              })}
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: "fit-content" }}>
            <Box
              sx={(theme)=>({
                border: "solid 2px",
                borderColor: activeSlide === 2 ? theme.palette.primary.main : "transparent",

                height: 96,
                width: 96,
                borderRadius: 4,
                overflow: "hidden",
                backgroundImage:
                  "url(https://swiperjs.com/demos/images/nature-1.jpg)",
                backgroundPosition: "center",
                backgroundSize: "contain",
              })}
            />
          </SwiperSlide>
        </Swiper>
      </Box>
    </>
  );
}
