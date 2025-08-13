'use client';

import React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";

interface SidebarLinkButtonProps {
  label: string;
  href: string;
}

const SidebarLinkButton: React.FC<SidebarLinkButtonProps> = ({ label, href }) => {
  return (
    <Button
      component={Link}
      href={href}
      fullWidth
      sx={{ justifyContent: 'flex-start', my: 1 }}
      variant="text"
      color="primary"
    >
      {label}
    </Button>
  );
};

export default SidebarLinkButton; 