'use client';

import React from "react";
import { Drawer, List, Box } from "@mui/material";
import SidebarLinkButton from "../sidebarLinkButton";
import SidebarDropdown from "../sidebarDropdown";

const drawerWidth = 240;

const Sidebar = () => {
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
          <SidebarLinkButton label="Inicio" href="/super-admin" />
        </List>
        <SidebarDropdown />
      </Box>
    </Drawer>
  );
};

export default Sidebar; 