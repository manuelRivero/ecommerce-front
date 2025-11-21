"use client";

import { Box, Paper, Typography } from "@mui/material";
import BestSellers from "@/components/home/bestSellers";
import HotSales from "@/components/home/hotSale";
import MoreRecents from "@/components/home/moreRecents";
import { Product } from "@/interfaces/products";
import Offers from "@/components/home/offers";
import Categories from "@/components/home/categories";
import HomeCTA from "@/components/home/homeCTA";
import { Category } from "@/interfaces/categories";
import { Offer } from "@/interfaces/offers";
import { useITheme } from "@/components/adminThemeProvider";
import { useEffect } from "react";
interface Props {
  data: {
    hotSales: Data;
    bestSellers: Data;
    moreRecents: Data;
    categories: Category[];
    offers: {
      offers: Offer[];
    };
  };
}

interface Data {
  products: Product[];
  totalPages: number;
}
export default function MainWrapper({ data }: Props) {
  console.log("MainWrapper", data.moreRecents);
  const { state, setState } = useITheme();


  // Verificar si toda la tienda está vacía
  const isStoreEmpty =
    data.offers.offers.length === 0 &&
    data.categories.length === 0 &&
    data.moreRecents.products.length === 0 &&
    data.bestSellers.products.length === 0 &&
    data.hotSales.products.length === 0;

  if (isStoreEmpty) {
    return (
      <Box sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4
      }}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.1)",
            maxWidth: 600,
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 3,
              color: "text.primary",
              fontWeight: "bold"
            }}
          >
            🚧 Tienda en Construcción
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: "text.secondary",
              lineHeight: 1.6
            }}
          >
            Estamos trabajando arduamente para traerte una experiencia de compra increíble.
            Muy pronto tendrás acceso a productos únicos, ofertas especiales y mucho más.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontStyle: "italic"
            }}
          >
            ¡Vuelve pronto y descubre todo lo que tenemos preparado para ti!
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Offers data={data.offers.offers} />
      </Box>
      <Box sx={{ marginY: 4 }}>
        <Categories data={data.categories} />
      </Box>
      <Box sx={{ marginY: 4 }}>
        <MoreRecents
          data={data.moreRecents.products}
          totalPages={data.moreRecents.totalPages}
        />
      </Box>
      <Box sx={{ marginY: 4 }}>
        <BestSellers
          data={data.bestSellers.products}
          totalPages={data.bestSellers.totalPages}
        />
      </Box>
      <Box sx={{ marginY: 4 }}>
        <HotSales
          data={data.hotSales.products}
          totalPages={data.hotSales.totalPages}
        />
      </Box>
      <Box sx={{ marginY: 4 }}>
        <HomeCTA />
      </Box>
    </>
  );
}
