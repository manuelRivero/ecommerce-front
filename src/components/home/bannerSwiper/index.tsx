"use client";
import { useITheme } from "@/components/themeProvider";
import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function BannerSwiper() {
  const { state } = useITheme();
  return (
    <>
      <Swiper
        modules={[Navigation]}
        navigation={{ enabled: true }}
        spaceBetween={50}
        slidesPerView={1}
        style={{ position: "relative", zIndex: 0 }}
      >
        {state.config.banners
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
                  aspectRatio: "3/1",
                  objectFit: 'cover'
                }}
                src={banner.url}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
