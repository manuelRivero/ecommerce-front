"use client";

import { Box } from "@mui/material";
import BestSellers from "../bestSellers";
import HotSales from "../hotSale";
import MainProducts from "../mainProdutcs";
import { Product } from "@/interfaces/products";
import Offers from "../offers";
import Categories from "../categories";
import { Category } from "@/interfaces/categories";
import { Offer } from "@/interfaces/offers";
interface Props {
  data: {
    hotSales: Data;
    bestSellers: Data;
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
  console.log("MainWrapper", data);
  return (
    <>
      <Box>
        <Offers data={data.offers.offers} />
      </Box>
      <Box sx={{ marginY: 4 }}>
        <Categories data={data.categories} />
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
    </>
  );
}
