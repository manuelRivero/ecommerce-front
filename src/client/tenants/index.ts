import { AxiosResponse } from 'axios';
import { axiosInstance } from '..';

export interface Tenant {
  _id: string;
  subdomain: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TenantsResponse {
  tenants: Tenant[];
  total: number;
}

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

/**
 * Obtiene todos los tenants activos
 */
export const getActiveTenants = async (): Promise<Tenant[]> => {
  try {
    const response = await axiosInstance.get('/tenants/active');
    return response.data.tenants || [];
  } catch (error) {
    console.error('Error fetching active tenants:', error);
    return [];
  }
};

/**
 * Obtiene un tenant específico por subdomain
 */
export const getTenantBySubdomain = async (subdomain: string): Promise<Tenant | null> => {
  try {
    const response = await axiosInstance.get(`/tenants/${subdomain}`);
    return response.data.tenant || null;
  } catch (error) {
    console.error(`Error fetching tenant ${subdomain}:`, error);
    return null;
  }
};

/**
 * Crea una nueva tienda (tenant)
 */
export const createStore = async (storeData: CreateStoreRequest): Promise<AxiosResponse<CreateStoreResponse>> => {
  return axiosInstance.post<CreateStoreResponse>('/tenant/create-tenant', storeData);
};
