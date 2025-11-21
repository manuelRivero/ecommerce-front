"use client";
import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import { Box, Pagination, Stack, Typography, IconButton } from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import EmptyProducts from "../emptyProducts";
import { motion } from "motion/react";
import { Close as CloseIcon } from "@mui/icons-material";

interface Props {
  data: Product[];
  totalPages: number;
  categoryDetail: any;
  searchQuery?: string;
  resultsCount?: number;
}
export default function MainProducts({
  data,
  totalPages,
  categoryDetail,
  searchQuery,
  resultsCount,
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
          // Construir URL manteniendo todos los parámetros de búsqueda actuales
          const params = new URLSearchParams(searchParams.toString());
          params.set('page', page.toString());
          router.push(`/productos?${params.toString()}`);
        } catch (error: any) {
          console.log("error", error);
        }
      }
    };
    if (page) {
      getData();
    }
  }, [page, router, searchParams]);

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
          searchQuery
            ? `Resultados para "${searchQuery}"`
            : categoryDetail
            ? "Productos en" + " " + categoryDetail.name
            : "Productos"
        } `}</Typography>
      </Stack>

      {/* Indicador de búsqueda - Información complementaria */}
      {searchQuery && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Mostrando resultados para: <strong>"{searchQuery}"</strong>
              {resultsCount !== undefined && (
                <span> • {resultsCount} producto{resultsCount !== 1 ? 's' : ''} encontrado{resultsCount !== 1 ? 's' : ''}</span>
              )}
            </Typography>
          </Box>

          <IconButton
            onClick={() => router.push('/productos')}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
                color: 'text.primary',
              },
            }}
            title="Ver todos los productos"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: 2,
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
