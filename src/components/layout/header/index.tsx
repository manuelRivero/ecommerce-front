"use client";
import { AppBar, Toolbar, Stack, Box } from "@mui/material";

import Link from "next/link";
import Cart from "../cart";
import { useITheme } from "@/components/themeProvider";

export default function Header() {
const {state} = useITheme()
  console.log('config', state.config.metadata.logo) 
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
                    <Box sx={{width: 45, }}>
                    <img src={state.config.metadata.logo} alt="Logo" style={{maxWidth: '100%', borderRadius: 9999, overflow: 'hideen'}} />

                    </Box>
                  </Stack>
                </Link>
              </Box>
            </Stack>

            <Stack
                direction="row"
                spacing={4}
                >
              <Cart />
              {/* <Stack
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
              </Stack> */}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}
