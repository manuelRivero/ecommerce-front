import { getProducts } from "@/client/products";
import MainWrapper from "@/components/home/mainWrapper";
import { Box, Container } from "@mui/material";
import banner from "@/assets/images/banner.png";

export const dynamic = "force-dynamic";

const getData = async (subdomain: string) => {
  try {
    const { data } = await getProducts(subdomain);

    return { products: data.products, totalPages: data.totalPages };
  } catch (error: any) {
    console.log("error", error);
    throw "error";
  }
};
export default async function Home({
  params,
}: {
  params: Promise<any>;
}){
  const {subdomain} = await params
  const { products, totalPages } = await getData(subdomain);
  return (
    <Container sx={{ marginY: 6 }}>
      <Box
        sx={{
          maxWidth: "100%",
          marginBottom: 2,
          borderRadius: { xs: 4, md: 10 },
          overflow: "hidden",
        }}
      >
        <img
          src={banner.src}
          alt="banner"
          style={{ width: "100%", maxWidth: "100%", objectFit: "contain" }}
        />
      </Box>
      <MainWrapper data={products} totalPages={totalPages} />
    </Container>
  );
}
