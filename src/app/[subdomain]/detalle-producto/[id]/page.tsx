import { getProductDetail, getRelatedProducts } from "@/client/products";
import Detail from "@/components/productDetail/detail";
import Gallery from "@/components/productDetail/gallery";
import RelatedProducts from "@/components/productDetail/relatedProducts";
import BackButton from "@/components/shared/BackButton";
import { Box, Container, Grid, Paper } from "@mui/material";
import React from "react";

export async function generateMetadata({ params }: any) {
  try {
    const {id} = await params;
    const { data } = await getProductDetail(id);
    console.log("generateMetadata data", data);
   const metadataBase = new URL(data.product.images[0].url.split('com')[0]+ 'com');
   console.log("metadataBase", metadataBase);
    return {
      metadataBase: metadataBase.origin,
      title: data.product.name,
      description: data.product.description,
      openGraph: {
        title: data.product.name,
        description: data.product.description,
        type: "article",
        images: [
          {
            url: data.product.images[0].url,
            width: 1200,
            height: 630,
            alt: data.product.name,
          },
        ],
      },
    };
  } catch (error: any) {
    console.error("Error generating metadata:", error);
    return null;
  }
}

const getData = async (id: string, tenant: string) => {
  try {
    const { data } = await getProductDetail(id);
    console.log("data", data);
    const {data: relatedProductsData }= await getRelatedProducts(tenant, data.product.category, 0, id)
    return { detail: data.product, related: relatedProductsData.relatedProducts };
  } catch (error) {
    throw error;
  }
};

export default async function ProductDetail({ params }: any) {
  const { id, subdomain } = await params;
  const { detail, related } = await getData(id, subdomain);
  const images = detail.images.map((image: any) => image.url);
  console.log('related', related)
  return (
    <Container sx={{marginTop: 4, marginBottom: 4}}>
      <BackButton />
      <Paper>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 4 }}>
              <Gallery images={images} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 4 }}>
              <Detail data={detail} />
            </Box>
          </Grid>
          <Grid item xs={12} >
            <Box sx={{ padding: 4 }}>
              <RelatedProducts products={related[0].data} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
