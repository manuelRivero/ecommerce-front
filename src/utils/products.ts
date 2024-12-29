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

  export function compareProducts(original: CartProduct[], updated: Product[]): boolean {
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
      const groupedUpdateFeatures = updatedProduct.features.reduce((acc, feature) => {
        const { color, size, stock, _id } = feature;
        if (color) {
          if (!acc[color]) {
            acc[color] = [];
          }
          acc[color].push({ size, stock, _id });
        }
        return acc;
      }, {} as Record<string, { size: string | undefined; stock: string; _id?: string }[]>);
  
      // Comparar propiedades básicas del producto
      const basicComparison =
        o.name === updatedProduct.name &&
        o.price === updatedProduct.price &&
        o.discount === updatedProduct.discount;
  
      if (!basicComparison) return false;
  
      // Validar que la feature seleccionada existe y tiene stock válido
      const updatedFeaturesForColor = groupedUpdateFeatures[selectedOriginalFeature.color] || [];
      const matchingFeature = updatedFeaturesForColor.find(
        (feature) => feature.size === selectedOriginalFeature.size
      );
  
      // Si no se encuentra la feature correspondiente o su stock es 0, retornar false
      if (!matchingFeature || matchingFeature.stock === "0") {
        return false;
      }
  
      return true;
    });
  }
  
  
  
  
  
  


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
