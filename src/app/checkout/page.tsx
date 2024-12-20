import CheckoutCart from "@/components/checkout/cart";
import Form from "@/components/checkout/form";
import CartList from "@/components/shared/cartList";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

export default function Checkout() {
  return (
    <Container sx={{ marginBottom: 4 }}>
      <Box>
        <Grid container sx={{ marginTop: 2 }} spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 4 }}>
              <Form />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sx={{ position: "relative" }}>
            <Paper sx={{ padding: 4, position: "sticky", top: 20 }}>
              <CheckoutCart />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
