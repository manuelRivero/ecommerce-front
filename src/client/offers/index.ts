import { AxiosResponse } from "axios";
import { axiosInstance } from "..";

export const getOffers = (
  tenant: string,
  page = 0,
  limit: number = 10
): Promise<AxiosResponse> => {
  return axiosInstance.get("/offers/get-offers-web", {
    params: {
      tenant,
      page,
      limit,
    },
  });
}

export const getOfferDetail = (
  id:string,
  tenant: string,
  page = 0,
  limit: number = 10
): Promise<AxiosResponse> => {
  return axiosInstance.get(`/offers/get-offer-detail-web/${id}`, {
    params: {
      tenant,
      page,
      limit,
    },
  });
}