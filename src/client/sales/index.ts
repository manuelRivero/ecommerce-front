import { AxiosResponse } from "axios";
import { axiosInstance } from "..";
import { ISalesForm } from "@/components/checkout/form";
import { CartProduct } from "@/interfaces/products";

interface SalePayload extends ISalesForm {
  products: CartProduct[];
}

export const createSale = (data: SalePayload, tenant: string): Promise<AxiosResponse> => {
  return axiosInstance.post(`/sale/create-sale?tenant=${tenant}`, data);
};

export const getSaleDetail = (id: string): Promise<AxiosResponse> => {
    return axiosInstance.get("/sale/detail/web", {
      params:{
        id
      }
    });
  };

export const markOrderAsReceived = (payment_id: string, tenant: string): Promise<AxiosResponse> => {
  return axiosInstance.put(`/sale/mark-received/${payment_id}?tenant=${tenant}`);
};