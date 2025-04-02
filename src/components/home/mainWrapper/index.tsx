"use client";

import { Box } from "@mui/material";
import BestSellers from "../bestSellers";
import HotSales from "../hotSale";
import MainProducts from "../mainProdutcs";
import { Product } from "@/interfaces/products";
interface Props {
  data: {
    mainProducts: Data;
    hotSales: Data;
    bestSellers: Data;
  };
}

interface Data {
    products: Product[];
    totalPages: number;
}
export default function MainWrapper({ data }: Props) {
  console.log('MainWrapper', data)
  return (
    <>
      <Box sx={{ marginY: 4 }}>
        <MainProducts data={data.mainProducts.products} totalPages={data.mainProducts.totalPages} />
      </Box>
      <Box sx={{ marginY: 4 }}>
        <BestSellers data={data.bestSellers.products} totalPages={data.bestSellers.totalPages} />
      </Box>
      <Box sx={{ marginY: 4 }}>
        <HotSales data={data.hotSales.products} totalPages={data.hotSales.totalPages} />
      </Box>
    </>
  );
}
