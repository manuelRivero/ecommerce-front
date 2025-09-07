import { getCategoryDetail } from "@/client/categories";
import { getProducts } from "@/client/products";
import MainProducts from "@/components/home/mainProdutcs";
import { Container } from "@mui/material";
import React from "react";
import Breadcrumb from "@/components/shared/Breadcrumb";
import SearchIndicator from "@/components/shared/SearchIndicator";
import { Category, Search, ShoppingBag } from "@mui/icons-material";

const getData = async (subdomain: string, category: string, page = '1', search?: string) => {
  console.log('get data page', page, 'search', search);
  try {
    const [mainProductData, categoryDetailData] = await Promise.all([
      getProducts(subdomain, (Number(page) - 1), 6, category ?? undefined, search),
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
  const search = parseParams.search as string;
  const data = await getData(subdomain, id, parseParams["?page"] as string, search);
  return (
    <Container sx={{ marginY: 4 }}>
      <Breadcrumb 
        items={[
          { 
            label: 'Productos', 
            icon: <ShoppingBag sx={{ fontSize: 16 }} /> 
          },
          ...(search ? [{
            label: `Búsqueda: "${search}"`,
            icon: <Search sx={{ fontSize: 16 }} />
          }] : []),
          ...(data.mainProducts.categoryDetail && !search ? [{
            label: data.mainProducts.categoryDetail.name,
            icon: <Category sx={{ fontSize: 16 }} />
          }] : [])
        ]} 
      />
      
      <MainProducts
        data={data.mainProducts.products}
        categoryDetail={data.mainProducts.categoryDetail}
        totalPages={data.mainProducts.totalPages}
        searchQuery={search}
        resultsCount={data.mainProducts.products.length}
      />
    </Container>
  );
}
