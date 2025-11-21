import { getBestSellers, getHotSales, getProducts } from "@/client/products";
import MainWrapper from "@/components/home/mainWrapper";
import { Box, Container } from "@mui/material";
import BannerSwiper from "@/components/home/bannerSwiper";
import { getOffers } from "@/client/offers";
import { getCategories } from "@/client/categories";
import HomeCTA from "@/components/home/homeCTA";

export const dynamic = "force-dynamic";

const getData = async (subdomain: string,) => {
  console.log("get data");
  try {
    const [ hotSalesData, bestSellersData, offersData, categoriesData, moreRecentsData] = await Promise.all([
      getHotSales(subdomain, 0, 12),
      getBestSellers(subdomain, 0, 12),
      getOffers(subdomain, 0, 8),
      getCategories(subdomain, 0, 100),
      getProducts(subdomain, 0, 12),
    ]);
    console.log("offersData", offersData.data);
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
      moreRecents:{
        products: moreRecentsData.data.products,
        totalPages: moreRecentsData.data.totalPages,
      } 
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
    <>
    <Container sx={{ marginY: 6 }}>
      <Box
        sx={{
          maxWidth: "100%",
          marginBottom: 2,
          overflow: "hidden",
        }}
      >
        <BannerSwiper section="HOME-HERO"/>
      </Box>
      <MainWrapper data={products} />
      <Box
        sx={{
          maxWidth: "100%",
          marginBottom: 2,
          overflow: "hidden",
        }}
      >
        <BannerSwiper section="HOME-FOOTER" />
      </Box>
    </Container>
    </>
  );
}
