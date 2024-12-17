import Form from "@/components/checkout/form";
import CartList from "@/components/shared/cartList";
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Tooltip,
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
              <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Tú compra
              </Typography>
              <CartList />
             
              <Typography color="#97a2aa" sx={{ marginTop: 2 }}>
                Asegúrate de que todos los detalles de tu compra sean correctos
                antes de continuar.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
