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
  hidden: boolean;
  featureType: 'binary' | 'countable';
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

export interface CreateFeatureRequest {
  name: string;
  enabled: boolean;
  title: string;
  description: string;
  extendedDescription: ExtendedDescription;
  isActive: boolean;
  hidden: boolean;
  featureType: 'binary' | 'countable';
}

export interface CreateFeatureResponse {
  success: boolean;
  data: Feature;
  message?: string;
}

export const getPlanFeatureById = async (featureId: string): Promise<AxiosResponse<{data:Feature}>> => {
    return axiosInstance.get<Feature>(`/plan-features/${featureId}`);       
  };

/**
 * Crea una nueva característica de plan
 * @param featureData - Datos de la característica a crear
 * @returns Promise con la respuesta del servidor
 */
export const createFeature = async (featureData: CreateFeatureRequest): Promise<AxiosResponse<CreateFeatureResponse>> => {
  return axiosInstance.post<CreateFeatureResponse>('/plan-features', featureData);
};

/**
 * Actualiza una característica de plan existente
 * @param featureId - ID de la característica a actualizar
 * @param featureData - Datos de la característica actualizados
 * @returns Promise con la respuesta del servidor
 */
export const updateFeature = async (featureId: string, featureData: CreateFeatureRequest): Promise<AxiosResponse<CreateFeatureResponse>> => {
  return axiosInstance.put<CreateFeatureResponse>(`/plan-features/${featureId}`, featureData);
}; 