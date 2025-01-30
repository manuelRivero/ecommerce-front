"use client";
import BackButton from "@/components/shared/BackButton";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export default function PrivacyPolicies() {
  // const [, dispatch] = useCart();

  // useEffect(() => {
  //   cleanCart(dispatch);
  // }, []);
  console.log("ruta", window.open)
  window.open('http://maryjostyle.localhost:3000/politicas', '_blank')
  return (
    <Container>
      <BackButton />
      <Paper sx={{ padding: 4, marginY: 4 }}>
        <Typography variant="h2" sx={{ marginBottom: 2 }}>
          Pagina en construcción
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Box
            sx={{
              height: 4,
              width: 130,
              background:
                "no-repeat linear-gradient(#6100ee 0 0), no-repeat linear-gradient(#6100ee 0 0), #d7b8fc",
              backgroundSize: "60% 100%",
              animation: "progressAnimation 3s infinite",
              "@keyframes progressAnimation": {
                "0%": {
                  backgroundPosition: "-150% 0, -150% 0",
                },
                "66%": {
                  backgroundPosition: "250% 0, -150% 0",
                },
                "100%": {
                  backgroundPosition: "250% 0, 250% 0",
                },
              },
            }}
          ></Box>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Button
            variant="contained"
            component={Link}
            href="/"
            sx={{ marginTop: 2 }}
          >
            Ir al inicio
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
