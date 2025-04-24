import { getBestSellers, getHotSales, getProducts } from "@/client/products";
import MainWrapper from "@/components/home/mainWrapper";
import { Box, Container } from "@mui/material";
import BannerSwiper from "@/components/home/bannerSwiper";
import { getOffers } from "@/client/offers";
import { getCategories } from "@/client/categories";

export const dynamic = "force-dynamic";

const getData = async (subdomain: string,) => {
  console.log("get data");
  try {
    const [ hotSalesData, bestSellersData, offersData, categoriesData] = await Promise.all([
      getHotSales(subdomain, 0, 6),
      getBestSellers(subdomain, 0, 6),
      getOffers(subdomain, 0, 4),
      getCategories(subdomain, 0, 100),
    ]);
    console.log("categoriesData", categoriesData.data.categories);
    return {
    
      hotSales: {
        products: hotSalesData.data.products,
        totalPages: hotSalesData.data.totalPages,
      },
      bestSellers: {
        products: bestSellersData.data.products,
        totalPages: bestSellersData.data.totalPages,
      },
      offers:{
        offers: offersData.data.offers,
        totalPages: offersData.data.totalPages
      },
      categories:categoriesData.data.categories,
    };
  } catch (error: any) {
    console.log("error", error);
    throw "error";
  }
};
export default async function Home({
  params,
}: {
  params: Promise<any>;
}) {
  const { subdomain } = await params;
  const products = await getData(
    subdomain,
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
