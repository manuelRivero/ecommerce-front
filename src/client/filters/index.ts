import { AxiosResponse } from "axios";
import { axiosInstance } from "..";
import { FiltersResponse } from "@/interfaces/filters";

export const getProductFilters = (
  tenant: string,
  category?: string,
  search?: string
): Promise<AxiosResponse<FiltersResponse>> => {
  return axiosInstance.get("/products/filters", {
    params: {
      tenant,
      category,
      search,
    },
  });
};
