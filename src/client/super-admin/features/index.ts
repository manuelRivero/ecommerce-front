import { axiosInstance } from '@/client';
import axios, { AxiosResponse } from 'axios';

export interface ExtendedDescription {
  headline: string;
  intro: string;
  benefits: string[];
  lossReasons: string[];
  closing: string;
}

export interface Feature {
  _id: string;
  name: string;
  enabled: boolean;
  title: string;
  description: string;
  extendedDescription: ExtendedDescription;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FeaturesResponse {
  success: boolean;
  data: Feature[];
  message?: string;
}

/**
 * Obtiene todas las características de planes habilitadas
 * @returns Promise con las características disponibles
 */
export const getPlanFeatures = async (): Promise<AxiosResponse<FeaturesResponse>> => {
  return axiosInstance.get<FeaturesResponse>(`/plan-features?enabled=true`);
};

/**
 * Obtiene todas las características de planes (habilitadas y deshabilitadas)
 * @returns Promise con todas las características
 */
export const getAllPlanFeatures = async (): Promise<AxiosResponse<FeaturesResponse>> => {
  return axiosInstance.get<FeaturesResponse>(`/plan-features`);       
}; 

export const getPlanFeatureById = async (featureId: string): Promise<AxiosResponse<{data:Feature}>> => {
    return axiosInstance.get<Feature>(`/plan-features/${featureId}`);       
  }; 