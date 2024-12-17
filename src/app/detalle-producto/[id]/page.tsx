import Detail from "@/components/productDetail/detail";
import Gallery from "@/components/productDetail/gallery";
import { Box, Container, Grid, Paper } from "@mui/material";
import React from "react";

export default function ProductDetail() {
  return (
    <Container>
      <Paper>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 4 }}>
              <Gallery />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 4 }}>
              <Detail />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
