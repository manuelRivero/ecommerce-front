"use client";
import { getProducts } from "@/client/products";
import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
interface Props {
  data: Product[];
  totalPages: number;
}
export default function MainWrapper({ data, totalPages }: Props) {
  const params = useParams();
  const [page, setPage] = useState<number | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>(data);
  console.log("data", data);
  useEffect(() => {
    const getData = async () => {
      if (page) {
        try {
          const { data } = await getProducts(
            params.subdomain as string,
            page - 1
          );

          setProducts(data.products);
        } catch (error: any) {
          console.log("error", error);
        }
      }
    };
    if (page) {
      getData();
    }
  }, [page]);

  return (
    <>
      <Typography variant="h2">Nustros productos más vendidos</Typography>
      <Box
        sx={{
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "center" },
          marginTop: 4,
        }}
      >
        {products.map((product: Product) => (
          <ProductCard data={product} key={product._id} />
        ))}
      </Box>
      <Stack direction="row" justifyContent="center" sx={{ marginTop: 4 }}>
        <Pagination
          count={totalPages}
          color="primary"
          onChange={(_, newPage) => setPage(newPage)}
        />
      </Stack>
    </>
  );
}
