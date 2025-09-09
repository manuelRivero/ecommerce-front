import { AxiosResponse } from "axios";
import { axiosInstance } from "..";

export const getProducts = (
  tenant: string,
  page = 0,
  limit: number = 10,
  category?: string,
  search?: string,
  filters?: {
    minPrice?: number;
    maxPrice?: number;
    colors?: string[];
    sizes?: string[];
    categories?: string[];
    hasDiscount?: boolean;
  }
): Promise<AxiosResponse> => {
  const params: any = {
    tenant,
    page,
    category,
    limit,
    search,
  };

  // Agregar filtros si existen
  if (filters) {
    if (filters.minPrice !== undefined) params.minPrice = filters.minPrice;
    if (filters.maxPrice !== undefined) params.maxPrice = filters.maxPrice;
    if (filters.colors && filters.colors.length > 0) params.colors = filters.colors.join(',');
    if (filters.sizes && filters.sizes.length > 0) params.sizes = filters.sizes.join(',');
    if (filters.categories && filters.categories.length > 0) params.categories = filters.categories.join(',');
    if (filters.hasDiscount) params.hasDiscount = filters.hasDiscount;
  }

  return axiosInstance.get("/products/web", { params });
};

export const getProductDetail = (id: string): Promise<AxiosResponse> => {
  return axiosInstance.get("/products/detail/web?bestSellers=true", {
    params: {
      id,
    },
  });
};

export const getProductsById = (
  productIds: string[]
): Promise<AxiosResponse> => {
  return axiosInstance.get("/products/get-products-by-id", {
    params: {
      productIds,
    },
  });
};

export const getRelatedProducts = (
  tenant: string,
  category: string,
  page = 0,
  excludeId: string
): Promise<AxiosResponse> => {
  return axiosInstance.get("/products/get-related-products", {
    params: {
      tenant,
      page,
      category,
      excludeId,
    },
  });
};

export const getHotSales = (
  tenant: string,
  page = 0,
  limit: number = 10
): Promise<AxiosResponse> => {
  return axiosInstance.get("/products/hot-sales", {
    params: {
      tenant,
      page,
      limit,
    },
  });
}

export const getBestSellers = (
  tenant: string,
  page = 0,
  limit: number = 10
): Promise<AxiosResponse> => {
  return axiosInstance.get("/products/best-sellers", {
    params: {
      tenant,
      page,
      limit,
    },
  });
}

export const getRandomCategoryProducts = (
  tenant: string,
  category: string,
): Promise<AxiosResponse> => {
  return axiosInstance.get("/products/random-category-products", {
    params: {
      tenant,
      category,
    },
  });
};