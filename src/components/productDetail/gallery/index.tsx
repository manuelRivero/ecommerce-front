"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/thumbs";
import { Box, Stack } from "@mui/material";

interface Props {
  images: string[];
}
export default function Gallery({ images }: Props) {
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
        {images.map((image: string) => (
          <SwiperSlide key={image}>
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
                  src={image}
                />
              </Box>
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box sx={{ marginTop: 4 }}>
        <Swiper
          onSwiper={(swiper: any) => (thumbsRef.current = swiper)}
          spaceBetween={10}
          slidesPerView={"auto"}
          modules={[Thumbs]}
        >
          {images.map((image: string, index:number) => (
            <SwiperSlide style={{ width: "fit-content" }} key={image}>
              <Box
                sx={(theme) => ({
                  border: "solid 2px",
                  borderColor:
                    activeSlide === index
                      ? theme.palette.primary.main
                      : "transparent",

                  height: 96,
                  width: 96,
                  borderRadius: 4,
                  overflow: "hidden",
                  backgroundImage:
                    `url(${image})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                })}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
