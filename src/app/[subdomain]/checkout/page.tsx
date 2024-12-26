import CheckoutCart from "@/components/checkout/cart";
import Form from "@/components/checkout/form";
import { Box, Container, Grid, Paper } from "@mui/material";

export default function Checkout() {
  return (
    <Container sx={{ marginY: 4 }}>
      <Box>
        <Grid
          container
          sx={{ gap: { sx: 4, md: 0 } }}
          spacing={{ xs: 0, md: 4 }}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: { xs: 2, md: 4 } }}>
              <Form />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sx={{ position: "relative" }}>
            <Paper
              sx={{ padding: { xs: 2, md: 4 }, position: "sticky", top: 20 }}
            >
              <CheckoutCart />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
