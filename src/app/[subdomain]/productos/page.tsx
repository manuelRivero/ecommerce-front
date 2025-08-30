import { getCategoryDetail } from "@/client/categories";
import { getProducts } from "@/client/products";
import MainProducts from "@/components/home/mainProdutcs";
import { Container } from "@mui/material";
import React from "react";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Category } from "@mui/icons-material";

const getData = async (subdomain: string, category: string, page = '1') => {
  console.log('get data page', page);
  try {
    const [mainProductData, categoryDetailData] = await Promise.all([
      getProducts(subdomain, (Number(page) - 1), 6,  category ?? undefined,),
      category
        ? getCategoryDetail(subdomain, category)
        : Promise.resolve({ data: { category: null } }),
    ]);
    return {
      mainProducts: {
        products: mainProductData.data.products,
        totalPages: mainProductData.data.totalPages,
        categoryDetail: categoryDetailData.data.category,
      },
    };
  } catch (error: any) {
    console.log("error", error);
    throw "error";
  }
};

export default async function Categories({
  params,
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
  params: Promise<any>;
}) {
  const parseParams = await searchParams;
  const { subdomain, id } = await params;
  const data = await getData(subdomain, id, parseParams["?page"] as string);
  return (
    <Container sx={{ marginY: 4 }}>
      <Breadcrumb 
        items={[
          { 
            label: data.mainProducts.categoryDetail?.name || 'Productos', 
            icon: <Category sx={{ fontSize: 16 }} /> 
          }
        ]} 
      />
      <MainProducts
        data={data.mainProducts.products}
        categoryDetail={data.mainProducts.categoryDetail}
        totalPages={data.mainProducts.totalPages}
      />
    </Container>
  );
}
