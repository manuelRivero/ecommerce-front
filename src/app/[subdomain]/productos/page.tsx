import { getCategoryDetail } from "@/client/categories";
import { getProducts } from "@/client/products";
import { getProductFilters } from "@/client/filters";
import MainProducts from "@/components/home/mainProdutcs";
import CategoryDropdown from "@/components/home/categoryDropdown";
import { Container, Box } from "@mui/material";
import React from "react";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Category, Search, ShoppingBag } from "@mui/icons-material";
import ProductFiltersWrapper from "@/components/shared/ProductFilters/ProductFiltersWrapper";

const getData = async (subdomain: string, category: string, page = '1', search?: string, searchParams?: any) => {
  console.log('get data page', page, 'search', search, 'searchParams', searchParams);

  // Extraer filtros de los parámetros de URL
  const filters = {
    minPrice: searchParams?.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams?.maxPrice ? Number(searchParams.maxPrice) : undefined,
    colors: searchParams?.colors ? searchParams.colors.split(',').filter(Boolean) : undefined,
    sizes: searchParams?.sizes ? searchParams.sizes.split(',').filter(Boolean) : undefined,
    categories: searchParams?.categories ? searchParams.categories.split(',').filter(Boolean) : undefined,
    hasDiscount: searchParams?.hasDiscount === 'true',
  };

  try {
    const [mainProductData, categoryDetailData, filtersData] = await Promise.all([
      getProducts(subdomain, (Number(page) - 1), 6, category ?? undefined, search, filters),
      category
        ? getCategoryDetail(subdomain, category)
        : Promise.resolve({ data: { category: null } }),
      getProductFilters(subdomain, category ?? undefined, search),
    ]);
    return {
      mainProducts: {
        products: mainProductData.data.products,
        totalPages: mainProductData.data.totalPages,
        categoryDetail: categoryDetailData.data.category,
      },
      filters: filtersData.data.filters,
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
  const page = (parseParams.page as string) || '1';
  const data = await getData(subdomain, id, page, search, parseParams);

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

      {/* Selector de categorías - solo cuando hay id en la ruta y no hay búsqueda */}
      {id && !search && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <CategoryDropdown />
        </Box>
      )}

      <ProductFiltersWrapper
        filters={data.filters}
        subdomain={subdomain}
        category={id}
        search={search}
      >
        <MainProducts
          data={data.mainProducts.products}
          categoryDetail={data.mainProducts.categoryDetail}
          totalPages={data.mainProducts.totalPages}
          searchQuery={search}
          resultsCount={data.mainProducts.products.length}
        />
      </ProductFiltersWrapper>
    </Container>
  );
}
