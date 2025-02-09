import { getProductDetail, getRelatedProducts } from "@/client/products";
import Detail from "@/components/productDetail/detail";
import Gallery from "@/components/productDetail/gallery";
import RelatedProducts from "@/components/productDetail/relatedProducts";
import BackButton from "@/components/shared/BackButton";
import { Box, Container, Grid, Paper } from "@mui/material";
import React from "react";

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
    <Container>
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
