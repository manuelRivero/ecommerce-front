"use client";
import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CategoryDropdown from "../categoryDropdown";
import EmptyProducts from "../emptyProducts";
import { motion } from "motion/react";

interface Props {
  data: Product[];
  totalPages: number;
  categoryDetail: any;
}
export default function MainProducts({
  data,
  totalPages,
  categoryDetail,
}: Props) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") as string;
  const [page, setPage] = useState<number | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      if (page) {
        try {
          router.push(`/productos/${params.id ?? ""}?page=${page}`);
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
        <Typography variant="h2">{`${
          categoryDetail
            ? "Productos en" + " " + categoryDetail.name
            : "Todos nuestros productos"
        } `}</Typography>
        <CategoryDropdown />
      </Stack>

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
          {data.map((product: Product) => (
            <motion.div
              key={product._id}
              initial={{ transform: "translateY(100px)", opacity: 0 }}
              whileInView={{ transform: "translateY(0)", opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{maxWidth: 300, width: "100%",}}
            >
              <ProductCard data={product} />
            </motion.div>
          ))}
        </Box>
        {data.length === 0 && <EmptyProducts />}
        <Stack direction="row" justifyContent="center" sx={{ marginTop: 4 }}>
          <Pagination
            count={totalPages}
            color="primary"
            page={pageParam ? Number(pageParam) : 1}
            onChange={(_, newPage) => setPage(newPage)}
          />
        </Stack>
      </>
    </Box>
  );
}
