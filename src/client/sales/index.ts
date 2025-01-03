import { AxiosResponse } from "axios";
import { axiosInstance } from "..";
import { ISalesForm } from "@/components/checkout/form";
import { CartProduct } from "@/interfaces/products";

interface SalePayload extends ISalesForm {
  products: CartProduct[];
}

export const createSale = (data: SalePayload): Promise<AxiosResponse> => {
  return axiosInstance.post("/sale/create-sale", data);
};

export const getSaleDetail = (id: string): Promise<AxiosResponse> => {
    return axiosInstance.get("/sale/detail/web", {
      params:{
        id
      }
    });
  };