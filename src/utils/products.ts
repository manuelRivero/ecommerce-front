import { CartProduct, Product } from "@/interfaces/products";

export function offPercentage(price: number, discount: number): number {
  if (price <= 0) {
    throw new Error("El precio original debe ser mayor a 0");
  }
  const porcentaje = (discount / price) * 100;
  return parseFloat(porcentaje.toFixed(1));
}

export function finalPrice(price: number, percentage: number): number {
  if (price <= 0) {
    throw new Error("El precio original debe ser mayor a 0");
  }
  if (percentage < 0 || percentage > 100) {
    throw new Error("El porcentaje de descuento debe estar entre 0 y 100");
  }

  const discount = (price * percentage) / 100;
  const finalPrice = price - discount;
  return parseFloat(finalPrice.toFixed(2)); // Redondea a 2 decimales
}

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function compareProducts(
  original: CartProduct[],
  updated: Product[]
): boolean {
  if (original.length !== updated.length) return false;

  return original.every((o) => {
    const updatedProduct = updated.find((u) => u._id === o._id);
    if (!updatedProduct) return false;

    // Simplificar las features seleccionadas del producto original
    const selectedOriginalFeature = {
      color: o.color,
      size: o.size,
    };

    // Agrupar las features del producto actualizado
    const groupedUpdateFeatures = updatedProduct.features.reduce(
      (acc, feature) => {
        // Extraer el nombre del color (puede ser string o objeto)
        const colorName = typeof feature.color === 'string' 
          ? feature.color 
          : feature.color?.name;
        // Extraer el nombre del size (puede ser string o objeto)
        const sizeName = typeof feature.size === 'string' 
          ? feature.size 
          : feature.size?.name;
        const { stock, _id } = feature;
        
        if (colorName) {
          if (!acc[colorName]) {
            acc[colorName] = [];
          }
          acc[colorName].push({ size: sizeName, stock, _id });
        }
        return acc;
      },
      {} as Record<
        string,
        { size: string | undefined; stock: string; _id?: string }[]
      >
    );

    // Comparar propiedades básicas del producto
    const basicComparison =
      o.name === updatedProduct.name && o.price === updatedProduct.price;

    if (!basicComparison) return false;

    // Validar que la feature seleccionada existe y tiene stock válido
    const updatedFeaturesForColor =
      groupedUpdateFeatures[selectedOriginalFeature.color] || [];

    const matchingFeature = updatedFeaturesForColor.find(
      (feature) => feature.size === selectedOriginalFeature.size
    );

    if (!matchingFeature) return false;

    const stockNumber = Number(matchingFeature.stock) || 0;

    // Verificar que el stock no sea 0 y que la cantidad pedida no sea mayor al stock
    if (stockNumber === 0 || o.quantity > stockNumber) {
      return false;
    }

    return true;
  });
}

export const chunkArray = (array: Product[], size: number): Product[][] => {
  const chunks: Product[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

// export  function compareProducts (original: Product[], updated: Product[]): boolean  {
//   if (original.length !== updated.length) return false;

//   return original.every((o) => {
//     const updatedProduct = updated.find((u) => u._id === o._id);
//     if (!updatedProduct) return false;

//     // Compara cada campo del producto
//     return (
//       o.name === updatedProduct.name &&
//       o.price === updatedProduct.price &&
//       o.stock === updatedProduct.stock &&
//       o.discount === updatedProduct.discount
//     );
//   });
// };

/**
 * Limpia HTML de una cadena de texto para usar en metadatos
 * @param htmlString - Cadena que puede contener HTML
 * @param maxLength - Longitud máxima del texto resultante (opcional)
 * @returns Texto limpio sin HTML
 */
export function cleanHtmlForMetadata(htmlString: string, maxLength?: number): string {
  if (!htmlString) return '';
  
  // Remover etiquetas HTML
  const cleanText = htmlString
    .replace(/<[^>]*>/g, '') // Remover todas las etiquetas HTML
    .replace(/&nbsp;/g, ' ') // Reemplazar &nbsp; con espacios
    .replace(/&amp;/g, '&') // Reemplazar &amp; con &
    .replace(/&lt;/g, '<') // Reemplazar &lt; con <
    .replace(/&gt;/g, '>') // Reemplazar &gt; con >
    .replace(/&quot;/g, '"') // Reemplazar &quot; con "
    .replace(/&#39;/g, "'") // Reemplazar &#39; con '
    .replace(/\s+/g, ' ') // Reemplazar múltiples espacios con uno solo
    .trim();
  
  // Limitar longitud si se especifica
  if (maxLength && cleanText.length > maxLength) {
    return cleanText.substring(0, maxLength).trim() + '...';
  }
  
  return cleanText;
}
