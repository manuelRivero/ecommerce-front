"use client";
import CartItemCard from "@/components/shared/CartItemCard";
import { CartProduct, Product } from "@/interfaces/products";
import {
  Box,
  Button,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { useCart } from "@/context/cart";
import { products } from "@/mocks/product";

export default function ProductsDetail() {
  return (
    <>
      {products
        .map((mockProduct: Product) => ({ ...mockProduct, quantity: 2 }))
        .map((product: CartProduct) => (
          <>
            <Box key={product._id} sx={{ marginBottom: 2 }}>
              <CartItemCard hasDelete={false} data={product} />
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
