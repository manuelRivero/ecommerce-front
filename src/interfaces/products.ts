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
}

export interface CartProduct extends Product {
  quantity: number;
}
