import { AxiosResponse } from "axios";
import { axiosInstance } from "..";


export const getProducts = (tenant: string): Promise<AxiosResponse> => {
    return axiosInstance.get("/products/web", {params:{
      tenant
    }});
  };


  export const getProductDetail = (id: string): Promise<AxiosResponse> => {
    return axiosInstance.get("/products/detail/web", {
      params:{
        id
      }
    });
  };

  export const getProductsById = (productIds: string[]): Promise<AxiosResponse> => {
    return axiosInstance.get("/products/get-products-by-id", {
      params:{
        productIds
      }
    });
  };