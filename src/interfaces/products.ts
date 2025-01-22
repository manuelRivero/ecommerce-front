export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  images: {
    url: string;
  }[];
  mainImage: string;
  status: {
    available: boolean;
  };
  features: Features[];
  categoryDetail:{
    _id: string;
    name: string;
  }[]
}

export interface Features {
  color: string | undefined;
  size: string | undefined;
  stock: string;
  _id: string;
}
export interface CartProduct extends Product {
  quantity: number;
  color: string;
  size: string | null;
}
