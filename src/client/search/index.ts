import { axiosInstance } from '../index';
import { SearchProduct } from '@/interfaces/products';

export interface SearchSuggestion {
  id: string;
  type: 'product' | 'category' | 'tag';
  text: string;
  relevance: number;
  metadata?: {
    productId?: string;
    categoryId?: string;
    imageUrl?: string;
    price?: number;
  };
}

export interface SearchResult {
  products: SearchProduct[];
  suggestions?: SearchSuggestion[];
  total: number;
  query: string;
  executionTime: number;
  searchType: string;
}

export interface SearchParams {
  query: string;
  tenant: string;
  type: 'suggestions' | 'full' | 'category';
  limit?: number;
  offset?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
}

export interface SearchResponse {
  ok: boolean;
  data: {
    products: SearchProduct[];
    suggestions?: SearchSuggestion[];
    total: number;
    query: string;
    executionTime: number;
    searchType: string;
  };
}

/**
 * Búsqueda unificada - endpoint único para todos los tipos de búsqueda
 */
export const search = async (params: SearchParams): Promise<SearchResponse> => {
  try {
    const response = await axiosInstance.get('/search', { params });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al realizar búsqueda');
  }
};

/**
 * Buscar productos con parámetros avanzados (búsqueda completa)
 */
export const searchProducts = async (params: Omit<SearchParams, 'type'>): Promise<SearchResponse> => {
  return search({
    ...params,
    type: 'full'
  });
};

/**
 * Obtener sugerencias de búsqueda en tiempo real
 */
export const getSearchSuggestions = async (query: string, tenant: string, limit: number = 10): Promise<SearchResponse> => {
  return search({
    query,
    tenant,
    type: 'suggestions',
    limit
  });
};

/**
 * Buscar productos por categoría específica
 */
export const searchByCategory = async (categoryId: string, tenant: string, query?: string, limit: number = 20): Promise<SearchResponse> => {
  return search({
    query: query || '',
    tenant,
    type: 'category',
    category: categoryId,
    limit
  });
};

/**
 * Obtener búsquedas populares (endpoint separado para estadísticas)
 */
export const getPopularSearches = async (tenant: string, limit: number = 10): Promise<{ searches: string[] }> => {
  try {
    const response = await axiosInstance.get('/search/popular', {
      params: { tenant, limit }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al obtener búsquedas populares');
  }
};
