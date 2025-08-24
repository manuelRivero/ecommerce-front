import { axiosInstance } from '@/client';
import { AxiosResponse } from 'axios';
import { Feature } from '../features';

export interface FeatureLimit {
  max: number;
  min: number;
  unlimited: boolean;
}

export interface PlanFeature {
  feature: Feature;
  limits: FeatureLimit;
}

export interface CreatePlanRequest {
  name: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: {
    frequency: number;
    frequencyType: string;
  };
  status: string;
  features: PlanFeature[];
}

export interface Plan {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: {
    frequency: number;
    frequencyType: string;
  };
  status: string;
  features: PlanFeature[];
  mpPlanId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlanResponse {
  success: boolean;
  data: Plan;
  message?: string;
}

export interface PlansResponse {
  success: boolean;
  data: Plan[];
  message?: string;
}

/**
 * Crea un nuevo plan de suscripción
 * @param planData - Datos del plan a crear
 * @returns Promise con la respuesta del servidor
 */
export const createSubscriptionPlan = async (planData: CreatePlanRequest): Promise<AxiosResponse<CreatePlanResponse>> => {
  return axiosInstance.post<CreatePlanResponse>('/mercado-pago/create-subscription-plan', planData);
};

/**
 * Obtiene todos los planes de suscripción
 * @returns Promise con todos los planes
 */
export const getAllPlans = async ({searchAvailable}:{searchAvailable:boolean}): Promise<AxiosResponse<{plans: Plan[]}>> => {
  return axiosInstance.get<{plans: Plan[]}>('/plans/get-plans/', {params: {searchAvailable}});
};

/**
 * Obtiene un plan específico por ID
 * @param planId - ID del plan
 * @returns Promise con el plan específico
 */
export const getPlanById = async (planId: string): Promise<AxiosResponse<{plan: Plan}>> => {
  return axiosInstance.get<{plan: Plan}>(`/plans/get-plan-by-id/${planId}`);
};

/**
 * Actualiza un plan de suscripción existente
 * @param planId - ID del plan a actualizar
 * @param planData - Datos del plan actualizados
 * @returns Promise con la respuesta del servidor
 */
export const updateSubscriptionPlan = async (planId: string, planData: CreatePlanRequest): Promise<AxiosResponse<CreatePlanResponse>> => {
  return axiosInstance.put<CreatePlanResponse>(`/plans/edit/${planId}`, planData);
}; 