"use client";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function HomeCTA() {
  return (
    <Box sx={(theme) => ({ backgroundColor: theme.palette.primary.main, pt: 4, pb: 4, borderBottom: `1px solid ${theme.palette.primary.contrastText}` })}>
      <Typography
        variant="h2"
        sx={(theme) => ({
          textAlign: "center",
          mb: 2,
          color: theme.palette.primary.contrastText,
        })}
      >
        Sigue descubriendo
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Button
          variant="contained"
          color="inherit"
          href={"/productos"} target="_blank"
          sx={(theme) => ({ backgroundColor: theme.palette.primary.contrastText, color: theme.palette.primary.main, marginBottom: 3 })}
        >
          Ver todos los productos
        </Button>
      </Box>
    </Box>
  );
}
