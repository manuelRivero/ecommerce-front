export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  offerDiscount?: number;
  stock: number;
  totalSales?: number;
  images: {
    url: string;
    _id: string;
  }[];
  mainImage?: string;
  status: {
    available: boolean;
  };
  features: Features[];
  categoryDetail: {
    _id: string;
    name: string;
    tenant: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    image?: {
      url: string;
    };
  }[];
  category?: string;
  tenant: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  deleted?: boolean;
  relevanceScore?: number;
  averageRating?: number;
  totalReviews?: number;
}

export interface Features {
  color: string | {
    _id: string;
    name: string;
    hexCode?: string | null;
    tenant: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  size: string | {
    _id: string;
    name: string;
    order?: number;
    tenant: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  stock: number;
  _id: string;
  colorData?: Array<{
    _id: string;
    name: string;
    hexCode?: string | null;
    tenant: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }>;
  sizeData?: Array<{
    _id: string;
    name: string;
    order?: number;
    tenant: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }>;
}
export interface CartProduct extends Product {
  quantity: number;
  color: string | null;
  size: string | null;
}

// Interfaz específica para productos de búsqueda
export interface SearchProduct extends Omit<Product, 'categoryDetail'> {
  categoryDetail: {
    _id: string;
    name: string;
    tenant: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    image?: {
      url: string;
    };
  };
}
