import { AxiosResponse } from "axios";
import { axiosInstance } from "..";

export const getCategories = (tenant: string, page=1): Promise<AxiosResponse> => {
    return axiosInstance.get("/categories/get-categories-web", {params:{
      tenant,
      page
    }});
  };
