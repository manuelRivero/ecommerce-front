"use client";
import { getProductsById } from "@/client/products";
import CartList from "@/components/shared/cartList";
import { setCart, useCart } from "@/context/cart";
import { compareProducts } from "@/utils/products";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function CheckoutCart() {
  const [{ products }, dispatch] = useCart();
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getProductsById(
        products.map((product) => product._id)
      );

      const mergedProducts = products.map((localProduct) => {
        const backendProduct = data.products.find(
          (bp: any) => bp._id === localProduct._id
        );

        return backendProduct
          ? { ...localProduct, ...backendProduct }
          : localProduct;
      });

      const changesDetected = !compareProducts(products, mergedProducts);
      setHasChanges(changesDetected);
      setCart(dispatch, mergedProducts);
    };
    if (products.length > 0) {
      getData();
    }
  }, []);

  return (
    <>
      {products.length === 0 ? (
        <>
          <Typography color="#97a2aa">El carrito está vacío</Typography>
          <Typography color="#97a2aa" sx={{ marginTop: 2 }}>
            Cuando agregues algún producto lo verás aquí y podrás continuar con
            la compra
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Tú compra
          </Typography>
          {hasChanges && (
            <Typography color="#97a2aa" sx={{ marginY: 2 }}>
              Parece que ha pasado mucho tiempo y la información de algunos
              productos ha cambiado, lee detalladamente la información y
              asegurate de estar conforme antes de continuar con tu compra.
            </Typography>
          )}
          <CartList />

          <Typography color="#97a2aa" sx={{ marginTop: 2 }}>
            Asegúrate de que todos los detalles de tu compra sean correctos
            antes de continuar.
          </Typography>
        </>
      )}
    </>
  );
}
