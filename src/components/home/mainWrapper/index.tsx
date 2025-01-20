"use client";
import { getProducts } from "@/client/products";
import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
interface Props {
  data: Product[];
  totalPages: number;
}
export default function MainWrapper({ data, totalPages }: Props) {
  const searchParams = useSearchParams();
  const params = useParams();
  const categoryParam = searchParams.get("category") ?? null;
  const [page, setPage] = useState<number | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>(data);
  const [total, setTotal] = useState<number>(totalPages);
  useEffect(() => {
    const getData = async () => {
      if (page) {
        try {
          const { data } = await getProducts(
            params.subdomain as string,
            page - 1,
            categoryParam ?? undefined
          );

          setProducts(data.products);
          setTotal(data.totalPages);
        } catch (error: any) {
          console.log("error", error);
        }
      }
    };
    if (page) {
      getData();
    }
  }, [page]);
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       setPage(0);
  //       const { data } = await getProducts(
  //         params.subdomain as string,
  //         0,
  //         categoryParam as string
  //       );
  //       setTotal(data.totalPages);
  //       setProducts(data.products);
  //     } catch (error: any) {
  //       console.log("error", error);
  //     }
  //   };
  //   if (categoryParam) {
  //     getData();
  //   } else {
  //     console.log("no hay category param", categoryParam);
  //   }
  // }, [categoryParam]);

  useEffect(() => {
    setProducts(data);
    setTotal(totalPages);
  }, [data, totalPages]);

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
      {products.length === 0 && (
        <Typography variant="body1" sx={{ marginY: 4 }}>
          No hay resultados
        </Typography>
      )}
      <Stack direction="row" justifyContent="center" sx={{ marginTop: 4 }}>
        <Pagination
          count={total}
          color="primary"
          onChange={(_, newPage) => setPage(newPage)}
        />
      </Stack>
    </>
  );
}
