"use client";
import {
  AppBar,
  Toolbar,
  Stack,
  Box,
  IconButton,
  MenuList,
  MenuItem,
  Paper,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
} from "@mui/material";

import Link from "next/link";
import Cart from "../cart";
import { useITheme } from "@/components/themeProvider";
import { useState } from "react";
import { Menu } from "@mui/icons-material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CategoryIcon from "@mui/icons-material/Category";
import ArticleIcon from "@mui/icons-material/Article";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { state } = useITheme();
  const [open, setOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
  };
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
                    <Box sx={{ width: 45 }}>
                      <img
                        src={state.config.metadata.logo}
                        alt="Logo"
                        style={{
                          maxWidth: "100%",
                          borderRadius: 9999,
                          overflow: "hideen",
                        }}
                      />
                    </Box>
                  </Stack>
                </Link>
              </Box>
            </Stack>

            <Stack direction="row" spacing={4} sx={{ position: "relative" }}>
              <Cart />
              <IconButton
                sx={(theme) => ({ color: theme.palette.primary.contrastText })}
                onClick={() => setOpen(!open)}
              >
                <Menu />
              </IconButton>
              {open && (
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                  <Paper
                    sx={{
                      width: 200,
                      position: "absolute",
                      top: 60,
                      right: 0,
                      margin: 0,
                    }}
                  >
                    <MenuList>
                      <MenuItem
                        onClick={() => handleNavigation("/productos")}
                      >
                        <ListItemIcon>
                          <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText>Productos</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => handleNavigation("/descuentos")}>
                        <ListItemIcon>
                          <LocalOfferIcon />
                        </ListItemIcon>
                        <ListItemText>Descuentos</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleNavigation("/mas-vendidos")}
                      >
                        <ListItemIcon>
                          <ThumbUpOffAltIcon />
                        </ListItemIcon>
                        <ListItemText>Más vendidos</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleNavigation("/blogs")}
                      >
                        <ListItemIcon>
                          <ArticleIcon />
                        </ListItemIcon>
                        <ListItemText>Recursos y Guías</ListItemText>
                      </MenuItem>
                    </MenuList>
                  </Paper>
                </ClickAwayListener>
              )}

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
