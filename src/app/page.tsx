import { getProducts } from "@/client/products";
import MainWrapper from "@/components/home/mainWrapper";
import { Box, Container } from "@mui/material";
import banner from "./../assets/images/banner.png"

export const dynamic = 'force-dynamic'

const getData = async () => {
  try {
    const { data } = await getProducts();

    return {products: data.products, totalPages: data.totalPages};
  } catch (error: any) {
    console.log("error", error)
    throw "error"
  }
};
export default async function Home() {
  const {products, totalPages} = await getData();
  return (
    <Container sx={{ marginY: 6 }}>
      <Box sx={{maxWidth: '100%', marginBottom: 2, borderRadius: 10, overflow: 'hidden'}}>
      <img src={banner.src} alt="banner" style={{ width: '100%', maxWidth: '100%', objectFit: 'contain', maxHeight: 200}} />

      </Box>
        <MainWrapper data={products} totalPages={totalPages} />
    </Container>
  );
}
