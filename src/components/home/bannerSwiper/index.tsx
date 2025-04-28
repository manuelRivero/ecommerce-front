"use client";
import { useITheme } from "@/components/themeProvider";
import React, { useId } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, useMediaQuery } from "@mui/material";

interface Props {
  section: string;
}

export default function BannerSwiper({ section }: Props) {
  const { state } = useITheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const slides = state.config.banners
    .filter((banner: any) => banner.section === section && banner.active)
    .filter((banner: any) =>
      isMobile ? banner.type === "0" : banner.type === "1"
    );

  return slides.length > 0 ? (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: `.banner-${section}-prev`,
          nextEl: `.banner-${section}-next`,
        }}
        autoplay
        spaceBetween={50}
        slidesPerView={1}
        style={{ position: "relative", zIndex: 0 }}
      >
        {slides
          .filter((banner: any) => banner.section === section)
          .filter((banner: any) => banner.active)

          .map((banner: any) => (
            <SwiperSlide
              key={banner._id}
              style={{ position: "relative", zIndex: 0 }}
            >
              <img
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  aspectRatio: isMobile ? "" : "3/1",
                  objectFit: isMobile ? "contain" : "cover",
                  borderRadius: "1rem",
                }}
                src={banner.url}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      {slides.length > 1 && !isMobile && (
        <>
          <IconButton
            className={`banner-${section}-prev`}
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
            className={`banner-${section}-next`}
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
    </>
  ) : null;
}
