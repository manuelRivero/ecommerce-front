import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import { Box, Pagination, Stack } from "@mui/material";
import React from "react";
interface Props {
  data: Product[];
  totalPages: number;
}
export default function MainWrapper({ data, totalPages }: Props) {
  console.log("data", data);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {data.map((product: Product) => (
          <ProductCard data={product} key={product._id} />
        ))}
      </Box>
      <Stack direction="row" justifyContent="center" sx={{ marginTop: 4 }}>
        <Pagination count={totalPages} color="primary" />
      </Stack>
    </>
  );
}
