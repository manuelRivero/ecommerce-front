import { getBestSellers, getHotSales, getProducts } from "@/client/products";
import MainWrapper from "@/components/home/mainWrapper";
import { Box, Container } from "@mui/material";
import BannerSwiper from "@/components/home/bannerSwiper";

export const dynamic = "force-dynamic";

const getData = async (subdomain: string, category: string) => {
  console.log("get data");
  try {
    const [mainProductData, hotSalesData, bestSellersData] = await Promise.all([
      getProducts(subdomain, 0, category, 6),
      getHotSales(subdomain, 0, 6),
      getBestSellers(subdomain, 0, 6),
    ]);
    return {
      mainProducts: {
        products: mainProductData.data.products,
        totalPages: mainProductData.data.totalPages,
      },
      hotSales: {
        products: hotSalesData.data.products,
        totalPages: hotSalesData.data.totalPages,
      },
      bestSellers: {
        products: bestSellersData.data.products,
        totalPages: bestSellersData.data.totalPages,
      },
    };
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
  searchParams: Promise<any>;
}) {
  const parseParams = await searchParams;
  const { subdomain } = await params;
  const products = await getData(
    subdomain,
    parseParams["?category"] as string
  );
  return (
    <Container sx={{ marginY: 6 }}>
      <Box
        sx={{
          maxWidth: "100%",
          marginBottom: 2,
          overflow: "hidden",
        }}
      >
        <BannerSwiper />
      </Box>
      <MainWrapper data={products} />
    </Container>
  );
}
