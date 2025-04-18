"use client";
import { Product } from "@/interfaces/products";
import { Stack } from "@mui/material";
import React from "react";
import ProductGrid from "@/components/shared/ProductGrid";
import BackButton from "@/components/shared/BackButton";
import { Offer } from "@/interfaces/offers";

interface Props {
  data: Product[];
  detail: Offer;
}
export default function MainWrapper({ data, detail }: Props) {
  return (
    <>
      <BackButton />
      <ProductGrid title={`${detail.name} ${detail.discount}% off por tiempo limitado`} data={data} />
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ marginTop: 4 }}
      ></Stack>
    </>
  );
}
