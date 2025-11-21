"use client";
import { getOfferDetail } from "@/client/offers";
import { Product } from "@/interfaces/products";
import { Pagination, Stack } from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductGrid from "@/components/shared/ProductGrid";
import BackButton from "@/components/shared/BackButton";
import { Offer } from "@/interfaces/offers";

interface Props {
  data: Product[];
  detail: Offer;
  totalPages: number;
}
export default function MainWrapper({ data, detail, totalPages }: Props) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") as string;
  const [page, setPage] = useState<number | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>(data);
  const [total, setTotal] = useState<number>(totalPages);

  // Sincronizar estado local con props cuando cambien los datos del servidor
  useEffect(() => {
    setProducts(data);
    setTotal(totalPages);
  }, [data, totalPages]);

  useEffect(() => {
    const getData = async () => {
      if (page) {
        try {
          // Construir URL manteniendo todos los parámetros de búsqueda actuales
          const urlParams = new URLSearchParams(searchParams.toString());
          urlParams.set('page', page.toString());
          router.push(`/ofertas?${urlParams.toString()}`);
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
    <>
      <BackButton />
      <ProductGrid 
        title={`${detail.name} ${detail.discount}% off por tiempo limitado`} 
        data={products} 
      />
      {total > 1 && (
        <Stack direction="row" justifyContent="center" sx={{ marginTop: 4 }}>
          <Pagination
            count={total}
            color="primary"
            page={pageParam ? Number(pageParam) : 1}
            onChange={(_, newPage) => setPage(newPage)}
          />
        </Stack>
      )}
    </>
  );
}
