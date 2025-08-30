import { getOffers } from "@/client/offers";
import MainWrapper from "@/components/offers/mainWrapper";
import { Container } from "@mui/material";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { LocalOffer } from "@mui/icons-material";

export const dynamic = "force-dynamic";

const getData = async (subdomain: string ) => {
  try {
    const [offers] = await Promise.all([
      getOffers(subdomain, 0, 4)
    ]);
    return {
      offers: {
        products: offers.data.offers[0].products,
        detail: offers.data.offers[0]
      },
    };
  } catch (error: any) {
    console.log("error", error);
    throw "error";
  }
};
export default async function Offers({ params }: { params: Promise<any> }) {
  const { subdomain } = await params;
  const data = await getData(subdomain);
  console.log('data', data.offers.products)
  return (
    <Container sx={{ marginY: 6 }}>
      <Breadcrumb 
        items={[
          { label: 'Ofertas', icon: <LocalOffer sx={{ fontSize: 16 }} /> }
        ]} 
      />
      <MainWrapper data={data.offers.products} detail={data.offers.detail} />
    </Container>
  );
}
