import { getBestSellers } from "@/client/products";
import MainWrapper from "@/components/bestSellers/mainWrapper";
import { Container } from "@mui/material";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { ThumbUpOffAlt } from "@mui/icons-material";

export const dynamic = "force-dynamic";

const getData = async (subdomain: string ) => {
  console.log("get data");
  try {
    const [bestSellersData] = await Promise.all([
      getBestSellers(subdomain, 0, 6),
    ]);
    return {
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
export default async function BestSellers({ params }: { params: Promise<any> }) {
  const { subdomain } = await params;
  const data = await getData(subdomain);
  return (
    <Container sx={{ marginY: 6 }}>
      <Breadcrumb 
        items={[
          { label: 'Más Vendidos', icon: <ThumbUpOffAlt sx={{ fontSize: 16 }} /> }
        ]} 
      />
      <MainWrapper data={data.bestSellers.products} totalPages={data.bestSellers.totalPages} />
    </Container>
  );
}
