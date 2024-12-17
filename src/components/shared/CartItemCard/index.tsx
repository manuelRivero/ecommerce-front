import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CartProduct } from "@/interfaces/products";

interface Props {
  data: CartProduct;
  hasDelete?: boolean;
}
export default function CartItemCard({ data, hasDelete = true }: Props) {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <img style={{ objectFit: "cover", maxWidth: 90 }} src={data.image} />
        <Box sx={{ width: "100%" }}>
          <Typography variant="h5">{data.name}</Typography>
          <Typography variant="body1" fontWeight="bold">
            ${data.price}
          </Typography>
          <Typography variant="body1">
            Cant. <strong>{data.quantity}</strong>
          </Typography>
          {hasDelete && (
            <Stack direction="row" justifyContent="flex-end">
              <DeleteForeverIcon />
            </Stack>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
