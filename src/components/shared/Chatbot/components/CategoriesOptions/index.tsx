"use client";
import { getCategories } from "@/client/categories";
import { Button, CircularProgress } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategoriesOptions = ({ actionProvider }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [options, setOptions] = useState<any[]>([]);
  const params = useParams();
  const handleOptionClick = (id: string) => {
    const queryString = new URLSearchParams({ category: id }).toString();

    router.push(`/?${queryString}`, { scroll: false});
    actionProvider.handleCategorySelection(id);
    const container = document.getElementById("product-container")
    container?.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    })
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getCategories(params.subdomain as string, 1);
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
      {loading && <CircularProgress />}
      {!loading &&
        options.map((option: any) => (
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            key={option.id}
            onClick={() => handleOptionClick(option._id)}
          >
            {option.name}
          </Button>
        ))}
    </div>
  );
};

export default CategoriesOptions;
