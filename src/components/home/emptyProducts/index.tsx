import React from "react";
import empty from "@/assets/images/no-results.png";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function EmptyProducts() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ padding: 2 }}
    >
      <Image width={100} height={100} src={empty.src} alt="no products" />
      <Typography variant="h3" sx={{ marginY: 4 }}>
        No encontramos ningún producto
      </Typography>
    </Stack>
  );
}
