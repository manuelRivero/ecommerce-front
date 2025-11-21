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

        // Obtener categoría inicial de searchParams
        const categoriesParam = searchParams.get("categories");
        if (categoriesParam) {
          // Si hay múltiples categorías, usar solo la primera para el dropdown
          const firstCategory = categoriesParam.split(',')[0];
          setSelectedCategory(firstCategory);
        }
      } catch (error: any) {
        console.error("Error al obtener categorías:", error);
      }
    };

    getData();
  }, [params.subdomain, searchParams]);

  const handleChangeCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // Construir URL con el parámetro categories
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    currentParams.set("categories", categoryId);
    // Limpiar página cuando se cambia de categoría
    currentParams.delete("page");
    
    router.push(`/productos?${currentParams.toString()}`, { scroll: false });
    const container = document.getElementById("product-container");
    container?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  const clearCategory = () => {
    setSelectedCategory("");

    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    currentParams.delete("categories");
    // Limpiar página cuando se limpia la categoría
    currentParams.delete("page");

    router.push(`/productos?${currentParams.toString()}`, { scroll: false });
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
