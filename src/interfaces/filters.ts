export interface FilterOption {
  value: string;
  count: number;
}

export interface CategoryFilter {
  _id: string;
  name: string;
  count: number;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface ProductFilters {
  priceRange: PriceRange;
  colors: FilterOption[];
  sizes: FilterOption[];
  categories: CategoryFilter[];
  hasDiscount: boolean;
  totalProducts: number;
}

export interface FiltersResponse {
  ok: boolean;
  filters: ProductFilters;
}

export interface FilterState {
  priceRange: {
    min: number;
    max: number;
  };
  selectedColors: string[];
  selectedSizes: string[];
  selectedCategories: string[];
  hasDiscount: boolean;
}
