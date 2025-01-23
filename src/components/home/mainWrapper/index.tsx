"use client";
import { getCategories } from "@/client/categories";
import { getProducts } from "@/client/products";
import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import { Box, MenuItem, Pagination, Select, Stack, TextField, Typography } from "@mui/material";
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
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  console.log("data", data);
  useEffect(() => {
    const getData = async () => {
        try {
          const { data: dataCategories } = await getCategories(
            params.subdomain as string,
          );
          console.log("dataCategories", dataCategories);
          
        } catch (error: any) {
          console.log("error", error);
        }
    };
    
    getData();
  }, []);
  
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
    <Box sx={{ marginTop: 4 }}>
      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
        <Typography variant="h2">Nuestros productos más vendidos</Typography>
        <Select
          MenuProps={{
              anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
              },
              transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
              },
          }}
          variant="outlined"
          value={"field.value"}
          label="Category"
          style={{
              backgroundColor: '#FFF',
              minWidth: '200px',
          }}
      >
                  <MenuItem
                      value={"Hola"}
                  >
                      Hola
                  </MenuItem>
      </Select>
      </Stack>
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
    </Box>
  );
}
