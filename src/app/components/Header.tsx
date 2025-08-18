'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Características', href: '#features' },
    { text: 'Beneficios', href: '#benefits' },
    { text: 'Precios', href: '#pricing' },
    { text: 'Contacto', href: '#contact' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Ecommerce Platform
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component="a" href={item.href}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          boxShadow: scrolled ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'all 0.3s ease-in-out',
        }}
        elevation={0}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                color: scrolled ? 'text.primary' : 'white',
                textShadow: scrolled ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              Ecommerce Platform
            </Typography>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: scrolled ? 'text.primary' : 'white',
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component="a"
                    href={item.href}
                    sx={{
                      color: scrolled ? 'text.primary' : 'white',
                      textShadow: scrolled ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.3)',
                      '&:hover': {
                        backgroundColor: scrolled ? 'rgba(37, 99, 235, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
                <Button
                  variant="contained"
                  sx={{
                    ml: 2,
                    backgroundColor: scrolled ? 'primary.main' : 'white',
                    color: scrolled ? 'white' : 'primary.main',
                    '&:hover': {
                      backgroundColor: scrolled ? 'primary.dark' : 'grey.100',
                    },
                  }}
                >
                  Comenzar
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header; 