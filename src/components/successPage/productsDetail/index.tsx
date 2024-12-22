"use client";
import CartItemCard from "@/components/shared/CartItemCard";
import { Product } from "@/interfaces/products";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  products: any[]
}
export default function ProductsDetail({products}: Props) {
  return (
    <>
      {products
        .map((product: any) => (
          <>
            <Box key={product._id} sx={{ marginBottom: 2 }}>
              <CartItemCard hasDelete={false} data={{quantity: product.quantity, ...product.data}} />
            </Box>
          </>
        ))}
      <Divider />
      <Box sx={{ marginTop: 2 }}>
        <Typography textAlign="right">
          Total:{" "}
          <strong>
            $
            {products
              .map((mockProduct: Product) => ({ ...mockProduct, quantity: 2 }))
              .reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </strong>
        </Typography>
      </Box>{" "}
      <Stack
        direction="row"
        justifyContent={"flex-end"}
        alignItems="center"
        spacing={1}
        sx={{ marginTop: 2 }}
      >
        <Button variant="contained">Coordinar envío</Button>
      </Stack>
      {products.length === 0 && <Typography>El carrito está vacío</Typography>}
    </>
  );
}
