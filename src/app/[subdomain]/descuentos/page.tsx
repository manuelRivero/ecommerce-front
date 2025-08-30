import { getHotSales } from "@/client/products";
import MainWrapper from "@/components/bestSellers/mainWrapper";
import { Container } from "@mui/material";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Discount } from "@mui/icons-material";

export const dynamic = "force-dynamic";

const getData = async (subdomain: string ) => {
  console.log("get data");
  try {
    const [hotSales] = await Promise.all([
      getHotSales(subdomain, 0, 6),
    ]);
    return {
      hotSales: {
        products: hotSales.data.products,
        totalPages: hotSales.data.totalPages,
      },
    };
  } catch (error: any) {
    console.log("error", error);
    throw "error";
  }
};
export default async function HotSales({ params }: { params: Promise<any> }) {
  const { subdomain } = await params;
  const data = await getData(subdomain);
  return (
    <Container sx={{ marginY: 6 }}>
      <Breadcrumb 
        items={[
          { label: 'Descuentos', icon: <Discount sx={{ fontSize: 16 }} /> }
        ]} 
      />
      <MainWrapper data={data.hotSales.products} totalPages={data.hotSales.totalPages} />
    </Container>
  );
}
