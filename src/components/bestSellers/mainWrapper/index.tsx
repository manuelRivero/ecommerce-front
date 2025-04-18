"use client";
import { getBestSellers } from "@/client/products";
import { Product } from "@/interfaces/products";
import { Pagination, Stack } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductGrid from "@/components/shared/ProductGrid";
import BackButton from "@/components/shared/BackButton";

interface Props {
  data: Product[];
  totalPages: number;
}
export default function MainWrapper({ data, totalPages }: Props) {
  const params = useParams();
  const [page, setPage] = useState<number | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>(data);
  const [total, setTotal] = useState<number>(totalPages);

  useEffect(() => {
    const getData = async () => {
      if (page) {
        try {
          const { data } = await getBestSellers(
            params.subdomain as string,
            0,
            6
          );

          setProducts(data.products);
          setTotal(data.totalPages);
          const container = document.getElementById("grid-container");
          container?.scrollIntoView({
            block: "start",
            behavior: "smooth",
          });
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
      <BackButton />
      <ProductGrid title="Más vendidos" data={products} />
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
