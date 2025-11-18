import { AxiosResponse } from "axios";
import { axiosInstance } from "..";

export const validateCoupon = (
  couponCode: string,
  orderAmount: number,
  tenant?: string
): Promise<AxiosResponse> => {
  const params: any = {
    code: couponCode,
    orderAmount: orderAmount,
  };

  return axiosInstance.post(`/coupons/validate?tenant=${tenant}`, params);
};

