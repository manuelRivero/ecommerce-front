import React from "react";
import { Box, Stack } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
export default function PageLoader() {
  return (
    <Box sx={{ position: 'fixed', background: '#fff', width: "100%", height: "100vh" }}>
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{height: '100%'}}>
        <CachedIcon />
      </Stack>
    </Box>
  );
}
