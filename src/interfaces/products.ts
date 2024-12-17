export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  finalPrice: number;
  stock: number;
  image: string;
}

export interface CartProduct extends Product {
  quantity: number
}