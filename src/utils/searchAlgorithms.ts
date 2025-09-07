/**
 * Utilidades para búsqueda inteligente y algoritmos de similitud
 */

/**
 * Calcula la distancia de Levenshtein entre dos cadenas
 * @param str1 Primera cadena
 * @param str2 Segunda cadena
 * @returns Número de operaciones mínimas para transformar str1 en str2
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  // Inicializar matriz
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  // Calcular distancia
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,     // Sustitución
          matrix[i][j - 1] + 1,         // Inserción
          matrix[i - 1][j] + 1          // Eliminación
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Calcula la similitud entre dos cadenas (0 = idénticas, 1 = completamente diferentes)
 * @param str1 Primera cadena
 * @param str2 Segunda cadena
 * @returns Valor de similitud entre 0 y 1
 */
export function calculateSimilarity(str1: string, str2: string): number {
  if (str1 === str2) return 1;
  if (str1.length === 0 || str2.length === 0) return 0;
  
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  return 1 - (distance / maxLength);
}

/**
 * Búsqueda fuzzy que encuentra coincidencias parciales
 * @param query Texto de búsqueda
 * @param text Texto a comparar
 * @param threshold Umbral mínimo de similitud (0-1)
 * @returns true si la similitud supera el umbral
 */
export function fuzzyMatch(query: string, text: string, threshold: number = 0.3): boolean {
  const similarity = calculateSimilarity(query.toLowerCase(), text.toLowerCase());
  return similarity >= threshold;
}

/**
 * Búsqueda por coincidencia parcial (includes)
 * @param query Texto de búsqueda
 * @param text Texto a comparar
 * @returns true si query está contenido en text
 */
export function partialMatch(query: string, text: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

/**
 * Búsqueda por palabras clave
 * @param query Texto de búsqueda
 * @param text Texto a comparar
 * @returns true si al menos una palabra clave coincide
 */
export function keywordMatch(query: string, text: string): boolean {
  const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 2);
  const textLower = text.toLowerCase();
  
  return queryWords.some(word => textLower.includes(word));
}

/**
 * Calcula la puntuación de relevancia para un resultado de búsqueda
 * @param query Texto de búsqueda
 * @param product Nombre del producto
 * @param category Categoría del producto
 * @param rating Rating del producto (0-5)
 * @param popularity Popularidad del producto (0-1)
 * @returns Puntuación de relevancia entre 0 y 1
 */
export function calculateRelevanceScore(
  query: string,
  product: string,
  category: string,
  rating: number = 0,
  popularity: number = 0
): number {
  const productSimilarity = calculateSimilarity(query, product);
  const categorySimilarity = calculateSimilarity(query, category);
  
  // Peso de cada factor
  const productWeight = 0.6;
  const categoryWeight = 0.2;
  const ratingWeight = 0.1;
  const popularityWeight = 0.1;
  
  // Normalizar rating (0-5) a (0-1)
  const normalizedRating = rating / 5;
  
  const score = (
    productSimilarity * productWeight +
    categorySimilarity * categoryWeight +
    normalizedRating * ratingWeight +
    popularity * popularityWeight
  );
  
  return Math.min(1, Math.max(0, score));
}

/**
 * Encuentra la mejor coincidencia entre una query y una lista de textos
 * @param query Texto de búsqueda
 * @param texts Lista de textos a comparar
 * @param threshold Umbral mínimo de similitud
 * @returns Mejor coincidencia o null si no hay coincidencias
 */
export function findBestMatch(
  query: string,
  texts: string[],
  threshold: number = 0.3
): { text: string; similarity: number } | null {
  let bestMatch: { text: string; similarity: number } | null = null;
  
  for (const text of texts) {
    const similarity = calculateSimilarity(query, text);
    
    if (similarity >= threshold && (!bestMatch || similarity > bestMatch.similarity)) {
      bestMatch = { text, similarity };
    }
  }
  
  return bestMatch;
}

/**
 * Normaliza texto para búsqueda (elimina acentos, convierte a minúsculas)
 * @param text Texto a normalizar
 * @returns Texto normalizado
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^\w\s]/g, ' ') // Reemplazar caracteres especiales con espacios
    .replace(/\s+/g, ' ') // Múltiples espacios a uno solo
    .trim();
}

/**
 * Cache para almacenar resultados de similitud y evitar recálculos
 */
class SimilarityCache {
  private cache = new Map<string, number>();
  private maxSize = 1000;
  
  get(key: string): number | undefined {
    return this.cache.get(key);
  }
  
  set(key: string, value: number): void {
    if (this.cache.size >= this.maxSize) {
      // Eliminar la entrada más antigua
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
  
  clear(): void {
    this.cache.clear();
  }
}

// Instancia global del cache
export const similarityCache = new SimilarityCache();

/**
 * Versión cacheada de calculateSimilarity para mejor performance
 */
export function cachedSimilarity(str1: string, str2: string): number {
  const key = `${str1}|${str2}`;
  const cached = similarityCache.get(key);
  
  if (cached !== undefined) {
    return cached;
  }
  
  const result = calculateSimilarity(str1, str2);
  similarityCache.set(key, result);
  return result;
}
