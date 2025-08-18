import { AxiosResponse } from "axios";
import { axiosInstance } from "..";

export const getProducts = (
  tenant: string,
  page = 0,
  limit: number = 10,
  category?: string,
): Promise<AxiosResponse> => {
  return axiosInstance.get("/products/web", {
    params: {
      tenant,
      page,
      category,
      limit,
    },
  });
};

export const getProductDetail = (id: string): Promise<AxiosResponse> => {
  return axiosInstance.get("/products/detail/web", {
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
  return axiosInstance.get("/products/best-sallers", {
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