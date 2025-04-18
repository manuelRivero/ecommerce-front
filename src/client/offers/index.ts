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