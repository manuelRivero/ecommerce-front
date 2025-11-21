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

const getData = async (subdomain: string, page = '1', search?: string, searchParams?: any) => {
  console.log('get data page', page, 'search', search, 'searchParams', searchParams);

  // Extraer categorías de los parámetros de URL
  const categories = searchParams?.categories ? searchParams.categories.split(',').filter(Boolean) : [];
  const firstCategory = categories.length > 0 ? categories[0] : undefined;

  // Extraer filtros de los parámetros de URL
  const filters = {
    minPrice: searchParams?.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams?.maxPrice ? Number(searchParams.maxPrice) : undefined,
    colors: searchParams?.colors ? searchParams.colors.split(',').filter(Boolean) : undefined,
    sizes: searchParams?.sizes ? searchParams.sizes.split(',').filter(Boolean) : undefined,
    categories: categories.length > 0 ? categories : undefined,
    hasDiscount: searchParams?.hasDiscount === 'true',
  };

  try {
    const [mainProductData, categoryDetailData, filtersData] = await Promise.all([
      getProducts(subdomain, (Number(page) - 1), 6, undefined, search, filters),
      // Solo obtener detalle de categoría si hay exactamente una categoría
      firstCategory && categories.length === 1
        ? getCategoryDetail(subdomain, firstCategory)
        : Promise.resolve({ data: { category: null } }),
      getProductFilters(subdomain, firstCategory ?? undefined, search),
    ]);
    return {
      mainProducts: {
        products: mainProductData.data.products,
        totalPages: mainProductData.data.totalPages,
        categoryDetail: categoryDetailData.data.category,
      },
      filters: filtersData.data.filters,
      categories,
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
  const { subdomain } = await params;
  const search = parseParams.search as string;
  const page = (parseParams.page as string) || '1';
  const data = await getData(subdomain, page, search, parseParams);
  
  // Obtener categorías de searchParams
  const categories = parseParams.categories 
    ? (typeof parseParams.categories === 'string' 
        ? parseParams.categories.split(',').filter(Boolean)
        : Array.isArray(parseParams.categories) 
          ? parseParams.categories.filter(Boolean)
          : [])
    : [];
  const hasCategories = categories.length > 0;

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

      {/* Selector de categorías - solo cuando hay categorías en searchParams y no hay búsqueda */}
      {hasCategories && !search && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <CategoryDropdown />
        </Box>
      )}

      <ProductFiltersWrapper
        filters={data.filters}
        subdomain={subdomain}
        category={categories.length === 1 ? categories[0] : undefined}
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
