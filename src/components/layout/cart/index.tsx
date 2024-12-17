"use client";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Button,
  ClickAwayListener,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CartItemCard from "@/components/shared/CartItemCard";
import Link from "next/link";
import { useCart } from "@/context/cart";
import { CartProduct } from "@/interfaces/products";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const [{ products }] = useCart();
  const [open, setOpen] = useState<boolean>(false);
  const [showBadged, setShowBadged] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(false);
    router.push("/checkout");
  };

  const handleOpen = () => {
    setOpen(true);
    setShowBadged(false);
  };

  useEffect(() => {
    if (products.length > 0) {
      setShowBadged(true);
    }
  }, [products.length]);

  return (
    <Box sx={{ color: "#fff", position: "relative" }}>
      <IconButton onClick={handleOpen} sx={{ color: "#fff" }}>
        <ShoppingCartIcon color="inherit" />
      </IconButton>
      {showBadged && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          sx={(theme) => ({
            width: 20,
            height: 20,
            borderRadius: 9999,
            background: theme.palette.error.main,
            right: 0,
            top: 0,
          })}
        >
          {products.length}
        </Stack>
      )}
      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper
            sx={{
              padding: 2,
              width: { xs: 300, md: 350 },
              position: "absolute",
              bottom: 0,
              transform: "translateY(100%)",
              right: 0,
              zIndex: 9999,
            }}
          >
            {products.map((product: CartProduct) => (
              <Box key={product._id} sx={{ marginBottom: 2 }}>
                <CartItemCard data={product} />
              </Box>
            ))}
            {products.length === 0 && (
              <Typography>El carrito está vacío</Typography>
            )}
            {products.length > 0 && (
              <>
                <Divider />
                <Box sx={{ marginTop: 2 }}>
                  <Typography textAlign="right">
                    Subtotal:{" "}
                    <strong>
                      $
                      {products.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )}
                    </strong>
                  </Typography>
                </Box>
              </>
            )}
            {products.length > 0 && (
              <Stack
                sx={{ marginTop: 2 }}
                direction="row"
                justifyContent="flex-end"
              >
                <Button onClick={handleClick} variant="contained">
                  Comprar
                </Button>
              </Stack>
            )}
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
}
