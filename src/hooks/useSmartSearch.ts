import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  searchProducts, 
  getSearchSuggestions, 
  getPopularSearches,
  SearchParams, 
  SearchResult, 
  SearchSuggestion 
} from '@/client/search';
import { Product } from '@/interfaces/products';

// Función para transformar datos del backend al formato esperado por el frontend
const transformBackendSuggestions = (backendSuggestions: any[]): SearchSuggestion[] => {
  return backendSuggestions.map((item) => {
    // Si es un producto
    if (item.name && item.price !== undefined) {
      return {
        id: `product-${item._id}`,
        type: 'product' as const,
        text: item.name,
        relevance: item.relevanceScore || 0,
        metadata: {
          productId: item._id,
          imageUrl: item.images?.[0]?.url,
          price: item.price,
        },
      };
    }
    
    // Si es una categoría
    if (item.type === 'category' || (item.name && !item.price)) {
      return {
        id: `category-${item._id}`,
        type: 'category' as const,
        text: item.name,
        relevance: item.relevanceScore || 0,
        metadata: {
          categoryId: item._id,
          imageUrl: item.image?.url,
        },
      };
    }
    
    // Fallback
    return {
      id: `item-${item._id}`,
      type: 'product' as const,
      text: item.name || 'Sin nombre',
      relevance: item.relevanceScore || 0,
      metadata: {
        productId: item._id,
        imageUrl: item.images?.[0]?.url,
      },
    };
  });
};

export interface UseSmartSearchReturn {
  // Estado de la búsqueda
  query: string;
  suggestions: SearchSuggestion[];
  results: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  
  // Funciones de búsqueda
  search: (query: string) => Promise<void>;
  searchWithParams: (params: SearchParams) => Promise<void>;
  getSuggestions: (query: string) => Promise<void>;
  clearSearch: () => void;
  
  // Estado de la interfaz
  showSuggestions: boolean;
  showResults: boolean;
  hasSearched: boolean;
  
  // Funciones de control
  setQuery: (query: string) => void;
  toggleSuggestions: () => void;
  selectSuggestion: (suggestion: SearchSuggestion) => void;
  selectSuggestionAndSearch: (suggestion: SearchSuggestion) => void;
}

export interface UseSmartSearchOptions {
  debounceMs?: number;
  minQueryLength?: number;
  maxSuggestions?: number;
  autoSearch?: boolean;
  cacheResults?: boolean;
  tenant: string; // Agregar tenant requerido
}

const DEFAULT_OPTIONS: Partial<UseSmartSearchOptions> = {
  debounceMs: 300,
  minQueryLength: 2,
  maxSuggestions: 10,
  autoSearch: true,
  cacheResults: true,
};

export function useSmartSearch(options: UseSmartSearchOptions): UseSmartSearchReturn {
  const config = { 
    debounceMs: 300,
    minQueryLength: 2,
    maxSuggestions: 10,
    autoSearch: true,
    cacheResults: true,
    ...options 
  };
  
  // Estados principales
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [results, setResults] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estados de la interfaz
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  
  // Refs para control
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isSelectingSuggestionRef = useRef<boolean>(false);
  const previousQueryRef = useRef<string>('');
  
  // Cache de resultados
  const resultsCache = useRef<Map<string, SearchResult>>(new Map());
  const suggestionsCache = useRef<Map<string, SearchSuggestion[]>>(new Map());
  
  /**
   * Limpiar búsqueda actual
   */
  const clearSearch = useCallback(() => {
    setQuery('');
    setSuggestions([]);
    setResults([]);
    setTotal(0);
    setError(null);
    setShowSuggestions(false);
    setShowResults(false);
    setHasSearched(false);
    isSelectingSuggestionRef.current = false; // Resetear ref
    previousQueryRef.current = ''; // Resetear query anterior
    
    // Limpiar timeout y abort controller
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);
  
  /**
   * Obtener sugerencias de búsqueda
   */
  const getSuggestions = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < config.minQueryLength) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    try {
      // Verificar cache
      const cacheKey = `suggestions:${searchQuery}`;
      if (config.cacheResults && suggestionsCache.current.has(cacheKey)) {
        const cached = suggestionsCache.current.get(cacheKey)!;
        setSuggestions(cached);
        setShowSuggestions(true);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      // Crear nuevo abort controller
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      
      const response = await getSearchSuggestions(searchQuery, config.tenant, config.maxSuggestions || 10);
      
      if (response.ok && response.data.suggestions) {
        // Transformar las sugerencias del backend al formato esperado
        const transformedSuggestions = transformBackendSuggestions(response.data.suggestions);
        setSuggestions(transformedSuggestions);
        setShowSuggestions(true);
        
        // Guardar en cache
        if (config.cacheResults) {
          suggestionsCache.current.set(cacheKey, transformedSuggestions);
        }
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error getting suggestions:', error);
        setError(error.message);
        setSuggestions([]);
      }
    } finally {
      setLoading(false);
    }
  }, [config.minQueryLength, config.maxSuggestions, config.cacheResults, config.tenant]);
  
  /**
   * Búsqueda principal con parámetros
   */
  const searchWithParams = useCallback(async (params: SearchParams) => {
    if (!params.query || params.query.length < config.minQueryLength) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      setShowSuggestions(false);
      
      // Verificar cache
      const cacheKey = `search:${JSON.stringify(params)}`;
      if (config.cacheResults && resultsCache.current.has(cacheKey)) {
        const cached = resultsCache.current.get(cacheKey)!;
        setResults(cached.products);
        setTotal(cached.total);
        setShowResults(true);
        setHasSearched(true);
        return;
      }
      
      // Crear nuevo abort controller
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      
      const response = await searchProducts(params);
      
      if (response.ok && response.data) {
        const { products, total: totalResults } = response.data;
        setResults(products);
        setTotal(totalResults);
        setShowResults(true);
        setHasSearched(true);
        
        // Guardar en cache
        if (config.cacheResults) {
          resultsCache.current.set(cacheKey, {
            products,
            total: totalResults,
            query: response.data.query,
            executionTime: response.data.executionTime,
            searchType: response.data.searchType
          });
        }
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error searching products:', error);
        setError(error.message);
        setResults([]);
        setTotal(0);
      }
    } finally {
      setLoading(false);
    }
  }, [config.minQueryLength, config.cacheResults]);
  
  /**
   * Búsqueda simple por query
   */
  const search = useCallback(async (searchQuery: string) => {
    await searchWithParams({ 
      query: searchQuery,
      tenant: config.tenant,
      type: 'full'
    });
  }, [searchWithParams, config.tenant]);
  
  /**
   * Seleccionar una sugerencia (solo actualiza el query, no hace búsqueda)
   */
  const selectSuggestion = useCallback((suggestion: SearchSuggestion) => {
    // Activar flag para prevenir búsqueda automática
    isSelectingSuggestionRef.current = true;
    
    setQuery(suggestion.text);
    // Cerrar completamente el dropdown
    setShowSuggestions(false);
    setShowResults(false);
    
    // Resetear el flag después de un pequeño delay
    setTimeout(() => {
      isSelectingSuggestionRef.current = false;
    }, 100);
    
    // NO realizar búsqueda automática al seleccionar sugerencia
    // La navegación se maneja en el componente padre
  }, []);

  /**
   * Seleccionar una sugerencia Y hacer búsqueda completa
   */
  const selectSuggestionAndSearch = useCallback((suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    // Cerrar completamente el dropdown
    setShowSuggestions(false);
    setShowResults(false);
    
    // Realizar búsqueda completa
    search(suggestion.text);
  }, [search]);
  
  /**
   * Toggle de sugerencias
   */
  const toggleSuggestions = useCallback(() => {
    setShowSuggestions(prev => !prev);
  }, []);
  
  /**
   * Efecto para limpiar sugerencias cuando el query está vacío
   */
  useEffect(() => {
    if (query.length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      setShowResults(false);
      setHasSearched(false);
    }
  }, [query]);

  /**
   * Efecto para limpiar resultados cuando se cambia la query
   */
  useEffect(() => {
    // Solo limpiar si la query realmente cambió y no estamos seleccionando una sugerencia
    if (query !== previousQueryRef.current && !isSelectingSuggestionRef.current) {
      // Limpiar resultados de búsqueda anterior
      setResults([]);
      setTotal(0);
      setShowResults(false);
      setHasSearched(false);
    }
    
    // Actualizar la query anterior
    previousQueryRef.current = query;
  }, [query]);

  /**
   * Efecto para búsqueda automática con debounce
   */
  useEffect(() => {
    if (!config.autoSearch || query.length < config.minQueryLength || isSelectingSuggestionRef.current) {
      return;
    }
    
    // Limpiar timeout anterior
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    // Crear nuevo timeout
    debounceRef.current = setTimeout(() => {
      getSuggestions(query);
    }, config.debounceMs);
    
    // Cleanup
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, config.autoSearch, config.minQueryLength, config.debounceMs, getSuggestions]);
  
  /**
   * Cleanup al desmontar
   */
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  
  return {
    // Estado
    query,
    suggestions,
    results,
    total,
    loading,
    error,
    
    // Funciones
    search,
    searchWithParams,
    getSuggestions,
    clearSearch,
    
    // Estado de la interfaz
    showSuggestions,
    showResults,
    hasSearched,
    
    // Funciones de control
    setQuery,
    toggleSuggestions,
    selectSuggestion,
    selectSuggestionAndSearch,
  };
}
