import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import { products } from "@/mocks/product";
import { Box, Pagination, Stack } from "@mui/material";
import React from "react";

export default function MainWrapper() {
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
        {products.map((product: Product) => (
          <ProductCard data={product} key={product._id} />
        ))}
      </Box>
      <Stack direction="row" justifyContent="center" sx={{ marginTop: 4 }}>
        <Pagination count={10} color="primary" />
      </Stack>
    </>
  );
}
