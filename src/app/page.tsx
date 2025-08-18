'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ShoppingCart,
  Payment,
  Analytics,
  Security,
  Speed,
  Support,
  TrendingUp,
  Store,
  Smartphone,
  Cloud,
  CheckCircle,
  ArrowForward,
} from '@mui/icons-material';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Benefits from './components/Benefits';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

export default function LandingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header />
      
      <Hero />
      
      <Features />
      
      <Benefits />
      
      <Pricing />
      
      <Footer />
    </Box>
  );
} 