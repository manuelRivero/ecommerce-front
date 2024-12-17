"use client";
import { AppBar, Toolbar, Stack, Box, Switch } from "@mui/material";

import Link from "next/link";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useColorScheme } from "@mui/material/styles";
import Cart from "../cart";

export default function Header() {
  const { mode, setMode } = useColorScheme();

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          height: 60,
          borderBottom: "solid 1px #fff",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <Toolbar variant="dense" sx={{ width: "100%" }}>
          <Stack
            direction="row"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Box>
                <Link href={"/"} style={{ textDecoration: "none" }}>
                  <Stack direction="row" alignItems="center">
                    logo
                  </Stack>
                </Link>
              </Box>
            </Stack>

            <Stack
                direction="row"
                spacing={4}
                >
              <Cart />
              <Stack
                direction="row"
                spacing={{ xs: 0, md: 4 }}
                sx={{ alignItems: "center" }}
              >
                <Stack direction="row" alignItems="center">
                  <WbSunnyIcon sx={{ fontSize: 14 }} />
                  <Switch
                    checked={Boolean(mode === "dark")}
                    onChange={(_, checked) =>
                      setMode(checked ? "dark" : "light")
                    }
                    size="small"
                  />
                  <DarkModeIcon sx={{ fontSize: 12 }} />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}
