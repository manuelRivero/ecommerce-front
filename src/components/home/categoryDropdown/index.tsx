"use client";

import React, { useEffect, useState } from "react";
import { getCategories } from "@/client/categories";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";

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
        const { data: dataCategories } = await getCategories(params.subdomain as string);
        setCategories(dataCategories.categories);

        const initialCategory = searchParams.get("category");
        if (initialCategory) {
          setSelectedCategory(initialCategory);
        }
      } catch (error: any) {
        console.error("Error al obtener categorías:", error);
      }
    };

    getData();
  }, [searchParams]);

  const handleChangeCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    currentParams.set("category", categoryId);

    router.push(`?${currentParams.toString()}`, { scroll: false });
  };

  const clearCategory = () => {
    setSelectedCategory('');

    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    currentParams.delete('category');

    router.push(`?${currentParams.toString()}`, { scroll: false });
    const container = document.getElementById("product-container");
    container?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  return (
    <Stack direction={"row"} spacing={1} alignItems={"center"}>
      {selectedCategory && (
        <IconButton
          onClick={clearCategory}
          sx={{
            color: "red",
            width: '40px',
            height: '40px',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              borderRadius: '100%',
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}
      <FormControl variant="outlined" style={{ minWidth: 200 }}>
        <InputLabel id="category-label">Categoría</InputLabel>
        <Select
          labelId="category-label"
          label="Categoría"
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
    </Stack>
  );
}
