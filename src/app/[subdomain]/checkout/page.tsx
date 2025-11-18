"use client";
import CheckoutCart from "@/components/checkout/cart";
import Form from "@/components/checkout/form";
import { Box, Container, Grid, Paper } from "@mui/material";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { ShoppingCart } from "@mui/icons-material";
import { useState } from "react";

export default function Checkout() {
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
    type: string;
    name: string;
    value?: number;
    maximumDiscount?: number;
    minimumAmount?: number;
  } | null>(null);

  return (
    <Container sx={{ marginY: 4 }}>
      <Breadcrumb 
        items={[
          { label: 'Checkout', icon: <ShoppingCart sx={{ fontSize: 16 }} /> }
        ]} 
      />
      <Box>
        <Grid
          container
          sx={{ gap: { sx: 4, md: 0 } }}
          spacing={{md:4}}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: { xs: 2, md: 4 }, marginBottom:{xs: 2} }}>
              <Form appliedCoupon={appliedCoupon} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sx={{ position: "relative" }}>
            <Paper
              sx={{ padding: { xs: 2, md: 4 }, position: "sticky", top: 20 }}
            >
              <CheckoutCart 
                appliedCoupon={appliedCoupon}
                onCouponApplied={setAppliedCoupon}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
