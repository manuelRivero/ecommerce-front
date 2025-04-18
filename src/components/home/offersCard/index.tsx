import { Offer } from "@/interfaces/offers";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
interface Props {
  data: Offer;
}
export default function OffersCard({ data }: Props) {
  return (
    <Paper sx={{ width: "100%", padding: 2 }}>
      <Box>
        <Typography variant="h6" mb={1} textAlign="center">
          {data.name}
        </Typography>
        {data.discount && (
          <>
            <Typography variant="h2" mb={1} textAlign="center">
              {data.discount}% de descuento
            </Typography>
            <Typography variant="body1" mb={2} textAlign="center">
              En productos seleccionados
            </Typography>
          </>
        )}

        <Stack direction="row" justifyContent="center">
          <Button variant="contained" component={Link} href={"/descuentos"}>
            Ver productos
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
