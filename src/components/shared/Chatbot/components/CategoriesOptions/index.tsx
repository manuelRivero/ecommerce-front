"use client";
import { getCategories } from "@/client/categories";
import { Button, CircularProgress, Stack } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategoriesOptions = ({ actionProvider }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [options, setOptions] = useState<any[]>([]);
  const params = useParams();
  const handleOptionClick = (id: string) => {
    router.push(`/productos/${id}`, { scroll: false });
    actionProvider.handleCategorySelection(id);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getCategories(params.subdomain as string, 0);
        console.log("data", data);
        setOptions(data.categories);
      } catch (error) {
        console.log("category options error", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <div className="options-container">
      {loading && (
        <Stack direction="row" justifyContent="center" mb={2}>
          <CircularProgress size="2rem" />
        </Stack>
      )}
      {!loading &&
        options.map((option: any) => (
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            key={option.id}
            onClick={() => handleOptionClick(option._id)}
          >
            {`${option.name} (${option.productCount})`}
          </Button>
        ))}
      {!loading && (
        <Button
          variant="contained"
          sx={{ margin: 1 }}
          onClick={() => router.push("/productos")}
        >
          Ver todo
        </Button>
      )}
    </div>
  );
};

export default CategoriesOptions;
