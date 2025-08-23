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
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import logo from '@/assets/images/logo-white-medium.svg';
import logoAlt from '@/assets/images/logo-blue-medium.svg';
import EmailIcon from '@mui/icons-material/Email';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ExtensionIcon from '@mui/icons-material/Extension';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

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
    { text: 'Características', href: '#features', icon: <ExtensionIcon /> },
    { text: 'Beneficios', href: '#benefits', icon: <TipsAndUpdatesIcon /> },
    { text: 'Precios', href: '#pricing', icon: <LocalOfferIcon /> },
    { text: 'Contacto', href: '#contact', icon: <EmailIcon /> },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      {scrolled ? <img src={logoAlt.src} alt="logo" /> : <img src={logo.src} alt="logo" />}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component="a" href={item.href}>
            <ListItemText primary={item.text} />
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
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
            <img src={scrolled ? logoAlt.src : logo.src} style={{ width: '60px' }} alt="logo" />


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
                    startIcon={item.icon}
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
                <Tooltip title="Comenzar" arrow PopperProps={{ style: { marginTop: -12 } }} 
                >
                  <Box>
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
                      <RocketLaunchIcon />
                    </Button>

                  </Box>
                </Tooltip>
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