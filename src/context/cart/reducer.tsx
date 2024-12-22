import { CartProduct } from "@/interfaces/products";
import { State } from ".";

export default function registerReducer(
  state: State,
  action: { type: string; payload: any }
): State {
  switch (action.type) {
    case "SET_PRODUCT_TO_CART": {
      const { _id, quantity } = action.payload as CartProduct;
      const productList = [...state.products];
      const targetProductIndex = productList.findIndex(
        (product) => product._id === _id
      );

      if (targetProductIndex >= 0) {
        // Actualizar cantidad si el producto ya está en el carrito
        productList[targetProductIndex] = {
          ...productList[targetProductIndex],
          quantity: productList[targetProductIndex].quantity + quantity,
        };
      } else {
        // Agregar un nuevo producto al carrito
        productList.push(action.payload);
      }

      return {
        ...state,
        products: productList,
      };
    }

    case "REMOVE_PRODUCT_TO_CART": {
      const productId = action.payload as string;
      return {
        ...state,
        products: state.products.filter((product) => product._id !== productId),
      };
    }
    case "CLEAN_CART":{
      return {
        ...state,
        products: []
      }
    }
    default:
      return state;
  }
}
