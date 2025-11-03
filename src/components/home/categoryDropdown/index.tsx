"use client";

import React, { useEffect, useState } from "react";
import { getCategories } from "@/client/categories";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useParams, useSearchParams, useRouter } from "next/navigation";
interface Category {
  _id: string;
  name: string;
  tenant: string;
}

export default function CategoryDropdown() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: dataCategories } = await getCategories(
          params.subdomain as string,
          0,
          50
        );
        setCategories(dataCategories.categories);

        const initialCategory = params.id as string;
        if (initialCategory) {
          setSelectedCategory(initialCategory);
        }
      } catch (error: any) {
        console.error("Error al obtener categorías:", error);
      }
    };

    getData();
  }, [params.id]);

  const handleChangeCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    router.push(`/productos/${categoryId}`, { scroll: false });
  };

  const clearCategory = () => {
    setSelectedCategory("");

    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    currentParams.delete("category");

    router.push(`/productos`, { scroll: false });
    const container = document.getElementById("product-container");
    container?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={1}
      alignItems={{xs:"center", md:"flex-end"}}
    >
      <FormControl variant="outlined" style={{ minWidth: 200 }}>
        <InputLabel id="category-label">Buscar por categoría</InputLabel>
        <Select
          labelId="category-label"
          label="Buscar por categoría"
          value={selectedCategory}
          onChange={(e) => handleChangeCategory(e.target.value)}
          style={{
            backgroundColor: "#FFF",
            minWidth: "200px",
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedCategory && (
        <Button sx={{ padding: 2 }} variant="contained" onClick={clearCategory}>
          <Typography>Ver todos los productos</Typography>
        </Button>
      )}
    </Stack>
  );
}
