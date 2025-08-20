import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/client';

export interface CreateStoreRequest {
  subdomain: string;
  config: {
    phone: string;
    email: string;
    firstName: string;
    lastName: string;
    cuil: string;
    address: string;
    province: string;
    postalCode: string;
    locality: string;
    metadata: {
      title: string;
      description?: string;
      logo?: string;
    };
  };
  mercadoPagoToken: string;
  password: string;
  confirmPassword: string;
}

export interface CreateStoreResponse {
  tenant?: {
    _id: string;
    subdomain: string;
    createdAt: string;
    updatedAt: string;
    hasConfig: boolean;
    hasActiveSubscription: boolean;
    subscriptionStatus: string;
    planName: string;
    subscriptionDetails?: any;
    subscriptionStats: any;
    config: {
      phone: string;
      email: string;
      firstName: string;
      lastName: string;
      cuil: string;
      address: string;
      province: string;
      postalCode: string;
      locality: string;
      metadata: {
        title: string;
        description: string;
        logo: string;
      };
    };
  };
  message?: string;
  error?: string;
}

export const createStore = async (storeData: CreateStoreRequest): Promise<AxiosResponse<CreateStoreResponse>> => {
  return axiosInstance.post<CreateStoreResponse>('/tenant/create-tenant', storeData);
};
