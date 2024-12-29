"use client";

import React, { useMemo, useReducer, useContext, ReactNode, JSX } from "react";
import CartReducer from "./reducer";
import { CartProduct } from "@/interfaces/products";
import { useITheme } from "@/components/themeProvider";

// Definición del estado inicial y tipos
export type State = {
  products: CartProduct[];
  themeConfig?: any;
};

type Props = {
  children: ReactNode;
};

const initialState: State = {
  products: [],
};

const CartContext = React.createContext<[State, React.Dispatch<any>] | undefined>(undefined);

export const CartProvider: React.FC<Props> = ({ children }) => {
  const {state:ThemeState} = useITheme(); // Obtiene la configuración del tema desde el proveedor de tema
  const [state, dispatch] = useReducer(CartReducer, {
    ...initialState,
    themeConfig: ThemeState.config,
  });

  const value: [State, React.Dispatch<any>] = useMemo(
    () => [{ ...state }, dispatch],
    [state]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook para consumir el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser utilizado dentro de un CartProvider");
  }
  return context;
};

// Funciones auxiliares para interactuar con el carrito
export async function setProductToCart(
  dispatch: React.Dispatch<any>,
  product: CartProduct
) {
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

export async function setCart(
  dispatch: React.Dispatch<any>,
  data: CartProduct[]
) {
  dispatch({
    type: "SET_CART",
    payload: data,
  });
}

export async function cleanCart(dispatch: React.Dispatch<any>) {
  dispatch({
    type: "CLEAN_CART",
  });
}
