import MainWrapper from "@/components/home/mainWrapper";
import { Container, Paper, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{marginBottom: 4}}>
      <Typography variant="h1" textAlign="center">
        Nombre de la tienda
      </Typography>
      <Paper sx={{padding: 4, marginTop: 4}}>
        <MainWrapper />
      </Paper>
    </Container>
  );
}
