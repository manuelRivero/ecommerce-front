import { AxiosResponse } from "axios";
import { axiosInstance } from "..";

export const getCategories = (
  tenant: string,
  page = 0,
  limit = 10
): Promise<AxiosResponse> => {
  return axiosInstance.get("/categories/get-categories-web", {
    params: {
      tenant,
      page,
      limit,
    },
  });
};

export const getCategoryDetail = (
  tenant: string,
  id: string
): Promise<AxiosResponse> => {
  return axiosInstance.get("/categories/get-category-detail/" + id, {
    params: {
      tenant,
    },
  });
};
