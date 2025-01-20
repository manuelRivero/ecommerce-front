import { getProducts } from "@/client/products";
import MainWrapper from "@/components/home/mainWrapper";
import { Box, Container } from "@mui/material";
import BannerSwiper from "@/components/home/bannerSwiper";

export const dynamic = "force-dynamic";

const getData = async (subdomain: string, category: string) => {
  try {
    const { data } = await getProducts(subdomain, 0, category);

    return { products: data.products, totalPages: data.totalPages };
  } catch (error: any) {
    console.log("error", error);
    throw "error";
  }
};
export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<any>;
  searchParams: Promise<any> ;
}) {
  const { category } = await searchParams;
  const { subdomain } = await params;
  const { products, totalPages } = await getData(subdomain, category as string);
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
        <BannerSwiper />
      </Box>
      <MainWrapper data={products} totalPages={totalPages} />
    </Container>
  );
}
