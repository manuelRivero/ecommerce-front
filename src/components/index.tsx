import React from "react";
import { Box, Stack } from "@mui/material";

interface Props {
  position: "fixed" | "absolute" | "relative";
  background?: string;
}
const PageLoader = ({ position, background }: Props) => {
  return (
    <Box
      sx={{
        position: position,
        background: background ?? "#fff",
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
      }}
    >
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
    </Box>
  );
};
export default PageLoader;
