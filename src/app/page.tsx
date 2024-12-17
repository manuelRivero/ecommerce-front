import { getProducts } from "@/client/products";
import MainWrapper from "@/components/home/mainWrapper";
import { Container, Paper, Typography } from "@mui/material";

export const dynamic = 'force-dynamic'

const getData = async () => {
  try {
    const { data } = await getProducts();

    return {products: data.products, totalPages: data.totalPages};
  } catch (error: any) {
    console.log("error", error)
    throw error
  }
};
export default async function Home() {
  const {products, totalPages} = await getData();
  return (
    <Container sx={{ marginBottom: 4 }}>
      <Typography variant="h1" textAlign="center">
        Nombre de la tienda
      </Typography>
      <Paper sx={{ padding: 4, marginTop: 4 }}>
        <MainWrapper data={products} totalPages={totalPages} />
      </Paper>
    </Container>
  );
}
