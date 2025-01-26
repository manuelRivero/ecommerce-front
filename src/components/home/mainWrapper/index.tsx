"use client";
import { getProducts } from "@/client/products";
import PageLoader from "@/components";
import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CategoryDropdown from "../categoryDropdown";
import EmptyProducts from "../emptyProducts";
interface Props {
  data: Product[];
  totalPages: number;
}
export default function MainWrapper({ data, totalPages }: Props) {
  const searchParams = useSearchParams();
  const params = useParams();
  const [page, setPage] = useState<number | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>(data);
  const [total, setTotal] = useState<number>(totalPages);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      if (page) {
        try {
          const categoryParam = searchParams.get("category");
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

  useEffect(() => {
    setProducts(data);
    setTotal(totalPages);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [data, totalPages]);

  return (
    <Box
      id="product-container"
      sx={{ position: "relative", minHeight: "60vh" }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h2">Nustros productos</Typography>
        <CategoryDropdown />
      </Stack>
      {loading ? (
        <PageLoader position="relative" background="transparent" />
      ) : (
        <>
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
          {products.length === 0 && <EmptyProducts />}
          <Stack direction="row" justifyContent="center" sx={{ marginTop: 4 }}>
            <Pagination
              count={total}
              color="primary"
              onChange={(_, newPage) => setPage(newPage)}
            />
          </Stack>
        </>
      )}
    </Box>
  );
}
