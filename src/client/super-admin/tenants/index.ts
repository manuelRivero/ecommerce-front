import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/client';

export interface PlanDetails {
  name: string;
  price: number;
  currency: string;
  billingCycle: {
    frequency: number;
    frequencyType: string;
  };
}

export interface CurrentUserAction {
  action: string | null;
  status: string | null;
  date: string | null;
}

export interface SubscriptionDetails {
  _id: string;
  paymentStatus: string;
  preapprovalStatus: string;
  startDate: string;
  lastPaymentDate: string;
  currentUserAction: CurrentUserAction;
  userEmail: string;
  mpSubscriptionId: string;
  planDetails: PlanDetails;
}

export interface SubscriptionStats {
  totalSubscriptions: number;
  activeSubscriptions: number;
  cancelledSubscriptions: number;
  pausedSubscriptions: number;
}

export interface ConfigMetadata {
  title: string;
  description: string;
  logo: string;
}

export interface TenantConfig {
  phone: string;
  email: string;
  address: string;
  province: string;
  postalCode: string;
  locality: string;
  cuil: string;
  metadata: ConfigMetadata;
}

export interface Tenant {
  _id: string;
  subdomain: string;
  createdAt: string;
  updatedAt: string;
  hasConfig: boolean;
  hasActiveSubscription: boolean;
  subscriptionStatus: string;
  planName: string;
  subscriptionDetails?: SubscriptionDetails;
  subscriptionStats: SubscriptionStats;
  config: TenantConfig;
}

export interface TenantsResponse {
  tenants: Tenant[];
}

export const getAllTenants = async (): Promise<AxiosResponse<TenantsResponse>> => {
  return axiosInstance.get<TenantsResponse>('/tenant/get-tenants/');
};

export const getTenantById = async (tenantId: string): Promise<AxiosResponse<{tenant: Tenant}>> => {
  return axiosInstance.get<{tenant: Tenant}>(`/tenant/get-tenant-detail/${tenantId}`);
};

export const updateTenant = async (tenantId: string, tenantData: Partial<Tenant>): Promise<AxiosResponse<{tenant: Tenant}>> => {
  return axiosInstance.put<{tenant: Tenant}>(`/tenant/${tenantId}`, tenantData);
};
