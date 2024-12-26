import { getProductDetail } from "@/client/products";
import Detail from "@/components/productDetail/detail";
import Gallery from "@/components/productDetail/gallery";
import { Box, Container, Grid, Paper } from "@mui/material";
import React from "react";

const getData = async (id: string) => {
  try {
    const { data } = await getProductDetail(id);
    console.log("data", data);
    return { detail: data.product };
  } catch (error) {
    throw error;
  }
};

export default async function ProductDetail({ params }: any) {
  const { id } = await params;
  const { detail } = await getData(id);
  const images = detail.images.map((image: any) => image.url);
  return (
    <Container>
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
        </Grid>
      </Paper>
    </Container>
  );
}
