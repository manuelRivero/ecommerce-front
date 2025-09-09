"use client";
import React, { useState } from "react";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Link from "next/link";
import Cart from "../cart";
import { useITheme } from "../../themeProvider";
import { Menu } from "@mui/icons-material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArticleIcon from "@mui/icons-material/Article";
import { useRouter } from "next/navigation";
import SmartSearchBar from "../../shared/SmartSearchBar/index";
import MobileSearchBar from "./MobileSearchBar";
import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
  const router = useRouter();
  const { state } = useITheme();
  const [open, setOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const handleSearch = (query: string) => {
    // TODO: Implementar navegación a página de búsqueda
    console.log('Búsqueda realizada:', query);
    router.push(`/productos?search=${encodeURIComponent(query)}`);
    setShowMobileSearch(false);
  };

  const handleSuggestionSelect = (suggestion: any) => {
    // Navegación según el tipo de sugerencia
    if (suggestion.type === 'product') {
      router.push(`/detalle-producto/${suggestion.metadata?.productId}`);
    } else if (suggestion.type === 'category') {
      router.push(`/productos/${suggestion.metadata?.categoryId}`);
    }
    setShowMobileSearch(false);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    if (open) setOpen(false);
  };

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          height: 60,
          borderBottom: "solid 1px #fff",
          justifyContent: "center",
          zIndex: theme.zIndex.appBar,
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
            {/* Logo */}
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

            {/* Barra de búsqueda - Solo visible en desktop y tablet */}
            {!isSmallMobile && !showMobileSearch && (
              <Box sx={{ 
                flex: 1, 
                mx: { xs: 2, md: 4 },
                maxWidth: { xs: '300px', md: '500px', lg: '600px' }
              }}>
                <SmartSearchBar
                  tenant={state.subdomain}
                  placeholder="Buscar productos..."
                  onSearch={handleSearch}
                  onSuggestionSelect={handleSuggestionSelect}
                  size="small"
                />
              </Box>
            )}

            {/* Barra de búsqueda móvil expandida */}
            {showMobileSearch && (
              <Box sx={{ 
                flex: 1, 
                mx: 2,
                position: 'relative',
                zIndex: theme.zIndex.appBar + 1,
              }}>
                <MobileSearchBar
                  tenant={state.subdomain}
                  onSearch={handleSearch}
                  onSuggestionSelect={handleSuggestionSelect}
                  onClose={() => setShowMobileSearch(false)}
                />
              </Box>
            )}

            {/* Acciones del lado derecho */}
            <Stack direction="row" spacing={isMobile ? 1 : 2} sx={{ position: "relative" }}>
              {/* Botón de búsqueda móvil */}
              {isSmallMobile && !showMobileSearch && (
                <IconButton
                  sx={{ color: 'white' }}
                  onClick={toggleMobileSearch}
                  aria-label="Buscar"
                >
                  <SearchIcon />
                </IconButton>
              )}
              
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
                      zIndex: theme.zIndex.modal,
                    }}
                  >
                    <MenuList>
                      <MenuItem
                        onClick={() => handleNavigation("/productos")}
                      >
                        <ListItemIcon>
                          <ShoppingBagIcon />
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
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}
