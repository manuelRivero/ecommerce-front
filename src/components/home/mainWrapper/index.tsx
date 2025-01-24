"use client";
import { getCategories } from "@/client/categories";
import { getProducts } from "@/client/products";
import PageLoader from "@/components";
import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import { Box, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, Stack, TextField, Typography } from "@mui/material";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
interface Props {
  data: Product[];
  totalPages: number;
}
export default function MainWrapper({ data, totalPages }: Props) {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const [categoryParam, setCategoryParam] = useState<string | null>(null);
  const [page, setPage] = useState<number | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>(data);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>('');
  const [total, setTotal] = useState<number>(totalPages);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const getData = async () => {
        try {
          const { data: dataCategories } = await getCategories(
            params.subdomain as string,
          );
          setCategories(dataCategories.categories)
          const initialCategory = searchParams.get('category');
          if (initialCategory) {            
            setCategoryParam(initialCategory);
            setSelectedCategory(initialCategory);
          }
        } catch (error: any) {
          console.log("error", error);
        }
    };
    
    getData();
  }, []);

  useEffect(() => {
    const initialCategory = searchParams.get('category');
    if (initialCategory && categories.length > 0) {
      setCategoryParam(initialCategory);
      setSelectedCategory(initialCategory);
    }
  }, [searchParams]);
  
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

  useEffect(() => {
    setProducts(data);
    setTotal(totalPages);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [data, totalPages]);

  const handleChangeCategory = (category: any) => {
    setSelectedCategory(category);    
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    currentParams.set('category', category);

    router.push(`?${currentParams.toString()}`);
  };

  const clearCategory = () => {
    setSelectedCategory('');

    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    currentParams.delete('category');

    router.push(`?${currentParams.toString()}`);
  };

  return (
    <Box id="product-container" sx={{ position: "relative", minHeight: '60vh' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h2">Nustros productos más vendidos</Typography>
        <Stack direction={"row"}>
          {selectedCategory && (
            <IconButton onClick={clearCategory} sx={{ color: 'red', marginRight: 1 }}>
              <DeleteIcon />
            </IconButton>
          )}
          <FormControl variant="outlined" style={{ minWidth: 200 }}>
              <InputLabel id="category-label">Categoría</InputLabel>
              <Select
                  labelId="category-label"
                  label="Categoría"
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
                  value={selectedCategory}
                  onChange={(e) => handleChangeCategory(e.target.value)}
                  style={{
                      backgroundColor: '#FFF',
                      minWidth: '200px',
                  }}
              >
                {categories.map(category => (
                  <MenuItem
                  key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
        </Stack>
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
      )}
    </Box>
  );
}
