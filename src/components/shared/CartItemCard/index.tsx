import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CartProduct } from "@/interfaces/products";
import { removeProductToCart, useCart } from "@/context/cart";
import { finalPrice } from "@/utils/products";

interface Props {
  data: CartProduct;
  hasDelete?: boolean;
}
export default function CartItemCard({ data, hasDelete = true }: Props) {
  const [, dispatch] = useCart();
  const handleDelete = () => {
    removeProductToCart(dispatch, data._id);
  };
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <img
          style={{ objectFit: "cover", maxWidth: 100, maxHeight: 100 }}
          src={data.images[0].url}
          alt="Imagen del producto"
        />
        <Box sx={{ width: "100%" }}>
          <Typography variant="h5">{data.name}</Typography>
          <Typography variant="body1" fontWeight="bold">
          ${finalPrice(data.price, data.discount) * data.quantity }
          </Typography>
          <Typography variant="body1">
            Cant. <strong>{data.quantity}</strong>
          </Typography>
          <Typography variant="body1">
            Color: <strong>{data.color}</strong>
          </Typography>
          {data.size && <Typography variant="body1">
            Talla: <strong>{data.size}</strong>
          </Typography>}
          {hasDelete && (
            <Stack direction="row" justifyContent="flex-end">
              <IconButton onClick={handleDelete}>
                <DeleteForeverIcon />
              </IconButton>
            </Stack>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
