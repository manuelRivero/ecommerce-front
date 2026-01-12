'use client';

import React from "react";
import { Drawer, List, Box, Button, Typography, Divider } from "@mui/material";
import { Logout } from "@mui/icons-material";
import SidebarLinkButton from "../sidebarLinkButton";
import SidebarDropdown from "../sidebarDropdown";
import { useSuperAdminAuth } from "@/context/super-admin-auth";
import { useRouter } from "next/navigation";
import { sidebarRoutes } from '@/config/super-admin-routes';

const drawerWidth = 240;

const Sidebar = () => {
  const { user, logout, isClient } = useSuperAdminAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/super-admin/auth');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <List>
          {sidebarRoutes.map((route, index) => {
            // Si tiene href, es un enlace simple
            if (route.href) {
              return (
                <SidebarLinkButton 
                  key={route.href || index} 
                  label={route.label} 
                  href={route.href} 
                />
              );
            }
            // Si tiene items, es un dropdown
            if (route.items && route.items.length > 0) {
              return (
                <SidebarDropdown 
                  key={route.label} 
                  title={route.label} 
                  items={route.items} 
                />
              );
            }
            return null;
          })}
        </List>
        
        {/* User info and logout */}
        <Box sx={{ p: 2, mt: 'auto' }}>
          <Divider sx={{ mb: 2 }} />
          {isClient && user && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Usuario
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {user.name} {user.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          )}
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            onClick={handleLogout}
            size="small"
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 