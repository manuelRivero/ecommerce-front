import { getOfferDetail, getOffers } from "@/client/offers";
import MainWrapper from "@/components/offers/mainWrapper";
import { Container } from "@mui/material";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { LocalOffer } from "@mui/icons-material";

export const dynamic = "force-dynamic";

const getData = async (subdomain: string, offerId: string, page = '1') => {
  try {
    const [offerResponse] = await Promise.all([
      getOfferDetail(offerId, subdomain, Number(page) - 1, 6)
    ]);
    return {
      offers: {
        products: offerResponse.data.offer?.products || [],
        detail: offerResponse.data.offer,
        totalPages: offerResponse.data.offer?.totalPages || 1
      },
    };
  } catch (error: any) {
    console.log("error", error);
    throw "error";
  }
};
export default async function Offers({ 
  params, 
  searchParams 
}: { 
  params: Promise<any>;
  searchParams: { [key: string]: string | string[] };
}) {
  const { subdomain } = await params;
  const parseParams = await searchParams;
  const page = (parseParams.page as string) || '1';
  const offerId = (parseParams.offerId as string) || '';
  const data = await getData(subdomain, offerId, page);
  return (
    <Container sx={{ marginY: 6 }}>
      <Breadcrumb 
        items={[
          { label: 'Ofertas', icon: <LocalOffer sx={{ fontSize: 16 }} /> }
        ]} 
      />
      {data.offers.detail && (
        <MainWrapper 
          data={data.offers.products} 
          detail={data.offers.detail} 
          totalPages={data.offers.totalPages}
        />
      )}
    </Container>
  );
}
