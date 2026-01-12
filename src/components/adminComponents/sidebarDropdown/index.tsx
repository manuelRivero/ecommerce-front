'use client';

import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import SidebarLinkButton from "../sidebarLinkButton";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SidebarRouteItem } from '@/config/super-admin-routes';

interface SidebarDropdownProps {
  title: string;
  items: SidebarRouteItem[];
}

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({ title, items }) => {
  return (
    <Accordion sx={{ boxShadow: 'none', background: 'none', my: 1 }}>
      <AccordionSummary
        expandIcon={<ChevronRightIcon />}
        aria-controls={`sidebar-dropdown-content-${title}`}
        id={`sidebar-dropdown-header-${title}`}
        sx={{ px: 0 }}
      >
        <Typography sx={{ fontWeight: 500, color: 'primary.main' }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0, py: 0 }}>
        {items.map((item) => (
          <SidebarLinkButton key={item.href} label={item.label} href={item.href} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default SidebarDropdown;
