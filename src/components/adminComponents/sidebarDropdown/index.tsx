'use client';

import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import SidebarLinkButton from "../sidebarLinkButton";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const dropdownOptions = [
  { label: "Tenants", href: "/super-admin/tenants" },
  { label: "Planes", href: "/super-admin/plans" },
  { label: "Crear Plan", href: "/super-admin/create-plan" },
  { label: "Características", href: "/super-admin/features" },
  { label: "Crear Característica", href: "/super-admin/create-feature" },
  { label: "Opción 1", href: "/super-admin/opcion1" },
  { label: "Opción 2", href: "/super-admin/opcion2" },
  { label: "Opción 3", href: "/super-admin/opcion3" },
];

const SidebarDropdown = () => {
  return (
    <Accordion sx={{ boxShadow: 'none', background: 'none', my: 1 }}>
      <AccordionSummary
        expandIcon={<ChevronRightIcon />}
        aria-controls="sidebar-dropdown-content"
        id="sidebar-dropdown-header"
        sx={{ px: 0 }}
      >
        <Typography sx={{ fontWeight: 500, color: 'primary.main' }}>Más opciones</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0, py: 0 }}>
        {dropdownOptions.map(option => (
          <SidebarLinkButton key={option.href} label={option.label} href={option.href} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default SidebarDropdown; 