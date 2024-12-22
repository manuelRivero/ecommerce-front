"use client";

import React, { JSX, useMemo } from "react";
import CartReducer from "./reducer";
import { CartProduct } from "@/interfaces/products";



export type State = {
  products: CartProduct[]
};

type Props = {
  children: JSX.Element;
};
const initialState: State = {
  products: []
};

const CartContext = React.createContext<[State, React.Dispatch<any>]>([
  initialState,
  () => {},
]);

export const CartProvider: React.FC<Props> = (props) => {
  const [state, dispatch] = React.useReducer(CartReducer, initialState);
  const value: [State, React.Dispatch<any>] = useMemo(()=>([state, dispatch]), [state]);

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useContext debe estar dentro del proveedor CartContext");
  }

  return context;
};

export async function setProductToCart(
  dispatch: React.Dispatch<any>,
  product: CartProduct
) {
  console.log('dispatch')
  dispatch({
    type: "SET_PRODUCT_TO_CART",
    payload: product,
  });
}

export async function removeProductToCart(
  dispatch: React.Dispatch<any>,
  id: string
) {
  dispatch({
    type: "REMOVE_PRODUCT_TO_CART",
    payload: id,
  });
}

export async function cleanCart(
  dispatch: React.Dispatch<any>,
) {
  dispatch({
    type: "CLEAN_CART",
  });
}
